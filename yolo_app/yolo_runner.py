import cv2
from ultralytics import YOLO
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from brose_app.backend.models.Produto_model import Produto
import threading

class YoloRunner:
    def __init__(self):
        # Modelo YOLO
        self.trained_model_path = "./yolo_app/yolo_models/best.pt"
        self.model = YOLO(self.trained_model_path)
        print("Modelo YOLO carregado!")

        # Conexão com o MESMO banco do backend
        engine = create_engine("sqlite:///../brose_app/backend/data/instance/brose.db", echo=False)
        Session = sessionmaker(bind=engine, expire_on_commit=False)
        self.session = Session()

        # Variáveis internas
        self.object_counts = {}
        self.previous_positions = {}
        self.ids_contados = set()

    def iniciar(self, video=0):
        cap = cv2.VideoCapture(video)
        if not cap.isOpened():
            print("Erro: não foi possível abrir câmera/vídeo")
            return

        print("Contagem iniciada...")
        cv2.namedWindow("YOLO", cv2.WINDOW_NORMAL)
        cv2.resizeWindow("YOLO", 1000, 600)

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            altura, largura = frame.shape[:2]
            line_x = largura - 400

            results = self.model.track(frame, conf=0.45, persist=True)
            annotated_frame = results[0].plot()

            cv2.line(annotated_frame, (line_x, 0), (line_x, altura), (0, 255, 0), 2)

            if results[0].boxes:
                for box in results[0].boxes:
                    cls = int(box.cls[0])
                    nome_classe = self.model.names[cls]
                    track_id = int(box.id[0]) if box.id is not None else None

                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    centro_x = (x1 + x2) // 2
                    centro_y = (y1 + y2) // 2

                    previous_x = self.previous_positions.get(track_id)
                    self.previous_positions[track_id] = centro_x

                    # CRUZAMENTO
                    if (
                        track_id is not None and
                        track_id not in self.ids_contados and
                        previous_x is not None and
                        previous_x < line_x <= centro_x
                    ):
                        self.ids_contados.add(track_id)
                        self.object_counts[nome_classe] = self.object_counts.get(nome_classe, 0) + 1
                        self.salvar_no_banco(nome_classe)

                    cv2.circle(annotated_frame, (centro_x, centro_y), 4, (0, 0, 255), -1)

            # Exibe tela
            cv2.imshow("YOLO", annotated_frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

    def salvar_no_banco(self, nome):
        produto = self.session.query(Produto).filter_by(nome=nome).first()
        if produto:
            produto.quantidade = (produto.quantidade or 0) + 1
            self.session.commit()
            print(f"Atualizado: {nome} → {produto.quantidade}")
        else:
            print(f"Produto {nome} não encontrado.")

if __name__ == "__main__":
    y = YoloRunner()
    y.iniciar()
