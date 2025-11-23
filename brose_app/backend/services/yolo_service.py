import cv2
from ultralytics import YOLO
from brose_app.backend.repositories.produto_repository import ProdutoRepository
import threading

class YoloService:
    def __init__(self):
        # Caminho relativo para o modelo
        self.trained_model_path = "./brose_app/backend/yolo/best.pt"
        self.model = YOLO(self.trained_model_path)
        print("Modelo carregado com sucesso!")

        self.produto_repo = ProdutoRepository()
        self.object_counts = {}
        self.previous_positions = {}
        self.ids_contados = set()

    def iniciar_contagem(self, camera_index=0):
        cap = cv2.VideoCapture(camera_index)
        if not cap.isOpened():
            print("Erro: não foi possível abrir a câmera.")
            return "Erro ao abrir a câmera"

        print("Contagem iniciada! Pressione 'q' para sair.")
        cv2.namedWindow("Contagem YOLO", cv2.WINDOW_NORMAL)
        cv2.resizeWindow("Contagem YOLO", 1000, 600)

        while True:
            ret, frame = cap.read()
            if not ret:
                print("Erro ao capturar frame da câmera")
                break

            altura, largura = frame.shape[:2]
            line_x = largura - 400

            results = self.model.track(source=frame, conf=0.45, persist=True)
            annotated_frame = results[0].plot()

            # Linha vertical
            cv2.line(annotated_frame, (line_x, 0), (line_x, altura), (0, 255, 0), 2)

            if results[0].boxes is None:
                cv2.imshow("Contagem YOLO", annotated_frame)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
                continue

            # Processa detecções
            for box in results[0].boxes:
                cls = int(box.cls[0])
                track_id = int(box.id[0]) if box.id is not None else None
                nome_classe = self.model.names[cls]

                x1, y1, x2, y2 = map(int, box.xyxy[0])
                centro_x = int((x1 + x2) / 2)
                centro_y = int((y1 + y2) / 2)

                previous_x = self.previous_positions.get(track_id, None)
                self.previous_positions[track_id] = centro_x

                if (
                    track_id is not None
                    and track_id not in self.ids_contados
                    and previous_x is not None
                    and previous_x < line_x <= centro_x
                ):
                    self.object_counts[nome_classe] = self.object_counts.get(nome_classe, 0) + 1
                    self.ids_contados.add(track_id)

                    # Atualiza banco
                    produtos = self.produto_repo.find_by_name(nome_classe)
                    for produto in produtos:
                        produto.quantidade = (produto.quantidade or 0) + 1
                        self.produto_repo.update(produto)

                # Desenha centro e ID
                cv2.circle(annotated_frame, (centro_x, centro_y), 4, (0, 0, 255), -1)
                cv2.putText(
                    annotated_frame,
                    f"{nome_classe} ID:{track_id}",
                    (x1, y1 - 5),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.5,
                    (255, 255, 255),
                    2
                )

            # Mostra contagens na tela
            y_offset = 30
            for nome, qtd in self.object_counts.items():
                cv2.putText(
                    annotated_frame,
                    f"{nome}: {qtd}",
                    (10, y_offset),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.7,
                    (255, 255, 255),
                    2
                )
                y_offset += 30

            cv2.imshow("Contagem YOLO", annotated_frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()
        print("Execução finalizada com sucesso!")

    def iniciar_contagem_thread(self):
        thread = threading.Thread(target=self.iniciar_contagem, daemon=True)
        thread.start()
        return "YOLO iniciado em thread"
