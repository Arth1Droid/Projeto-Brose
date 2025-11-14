from brose_app.backend.models.database import db

class Registra(db.Model):
    __tablename__ = 'registra'

    id_registro = db.Column(db.Integer, primary_key=True)
    id_produto_fk = db.Column(db.Integer, db.ForeignKey('produto.id_produto'), nullable=False)
    data_registro = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_json(self):
        return {
            "id": self.id_registro,
            "produto_id": self.id_produto_fk,
            "data_registro": self.data_registro
        }

#sem id_câmera porque é irrelevante pra função de contagem.