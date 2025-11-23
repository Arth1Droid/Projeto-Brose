from brose_app.backend.app import app  # seu app Flask já configurado
from brose_app.backend.services.yolo_service import YoloService

# --- Usa o contexto do Flask para acessar o banco existente ---
with app.app_context():
    # Instancia o serviço do YOLO
    yolo_service = YoloService()

    # Inicia contagem na câmera
    yolo_service.iniciar_contagem()  # ou iniciar_contagem_thread() se quiser rodar em background
