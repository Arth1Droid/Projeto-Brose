from models.database import db

class Registra(db.Model):
    caminho_img = db.Column(db.Text)

    id_produto_fk = db.Column(db.Integer, db.ForeignKey('produto.id_produto'), primary_key=True)
    id_camera_fk = db.Column(db.Integer, db.ForeignKey('camera.id_camera', primary_key=True))
