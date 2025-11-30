from brose_app.backend.models.database import db
import datetime 
import pytz

FUSO_UTC = pytz.utc

class Registra(db.Model):
    __tablename__ = 'registra'

    id_registro = db.Column(db.Integer, primary_key=True)
    id_produto_fk = db.Column(db.Integer, db.ForeignKey('produto.id_produto', ondelete='CASCADE'), nullable=False)
    data_registro = db.Column(db.DateTime, default=lambda: datetime.datetime.now(FUSO_UTC))

    def to_json(self):
        return {
            "id": self.id_registro,
            "produto_id": self.id_produto_fk,
            "data_registro": self.data_registro.isoformat()
        }

#sem id_câmera porque é irrelevante pra função de contagem.