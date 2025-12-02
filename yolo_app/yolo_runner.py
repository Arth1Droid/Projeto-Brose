import sys
import os

# Caminho absoluto até a pasta RAIZ do projeto:
ROOT_PATH = r"C:/Users/Beatriz/Desktop/Brose Projeto/Projeto-Brose"

# Garante que o Python consiga importar brose_app
if ROOT_PATH not in sys.path:
    sys.path.append(ROOT_PATH)

print("🔵 PythonPath configurado:", sys.path)


from ultralytics import YOLO
import cv2

# -------------------------------
# 🔵 BANCO DE DADOS (APENAS ADIÇÃO — SEM ALTERAR NADA DO SEU CÓDIGO)
# -------------------------------
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from brose_app.backend.models.Produto_model import Produto

# Caminho REAL do banco usado pelo backend
engine = create_engine(
    r"sqlite:///C:/Users/Beatriz/Desktop/Brose Projeto/Projeto-Brose/brose_app/backend/data/instance/brose.db"
)
Session = sessionmaker(bind=engine, expire_on_commit=False)
session = Session()
print("Conectado ao banco de dados!\n")

# -------------------------------
# YOLO (SEU CÓDIGO ORIGINAL)
# -------------------------------

trained_model_path = r"yolo_app/yolo_models/best.pt"

model = YOLO(trained_model_path)
print("Modelo carregado com sucesso!")

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Erro: não foi possível abrir a câmera.")
    exit()

object_counts = {}
previous_positions = {}
ids_contados = set()

print("Contagem iniciada! Pressione 'q' para sair.")

cv2.namedWindow("Contagem YOLO", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Contagem YOLO", 1000, 600)

while True:
    ret, frame = cap.read()
    if not ret:
        print("Erro ao capturar frame da câmera")
        break

    altura = frame.shape[0]
    largura = frame.shape[1]

    line_x = largura - 400

    try:
        results = model.track(source=frame, conf=0.45, persist=True)
    except Exception as e:
        print("Erro no YOLO:", e)
        continue

    annotated_frame = results[0].plot()

    cv2.line(
        annotated_frame,
        (line_x, 0),
        (line_x, altura),
        (0, 255, 0),
        2
    )

    if results[0].boxes is None:
        cv2.imshow("Contagem YOLO", annotated_frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        continue

    for box in results[0].boxes:
        cls = int(box.cls[0])
        track_id = int(box.id[0]) if box.id is not None else None
        nome_classe = model.names[cls]

        x1, y1, x2, y2 = map(int, box.xyxy[0])
        centro_x = int((x1 + x2) / 2)
        centro_y = int((y1 + y2) / 2)

        previous_x = previous_positions.get(track_id, None)
        previous_positions[track_id] = centro_x

        # -------------------------------
        # 🔵 SE CRUZAR A LINHA → SALVAR NO BANCO
        # -------------------------------
        if (
            track_id is not None
            and track_id not in ids_contados
            and previous_x is not None
            and previous_x < line_x <= centro_x
        ):
            object_counts[nome_classe] = object_counts.get(nome_classe, 0) + 1
            ids_contados.add(track_id)

            # 🔵 SALVAR NO BANCO
            produto = session.query(Produto).filter_by(nome=nome_classe).first()
            if produto:
                produto.quantidade = (produto.quantidade or 0) + 1
                session.commit()
                print(f"✓ Banco atualizado: {nome_classe} → {produto.quantidade}")
            else:
                print(f"⚠ Produto '{nome_classe}' não encontrado no banco.")

        # Desenho na tela
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

    y_offset = 30
    for nome, qtd in object_counts.items():
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