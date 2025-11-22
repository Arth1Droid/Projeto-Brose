from brose_app.backend.models.database import db

class Produto(db.Model):
    __tablename__ = 'produto' 

    id_produto = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False)
    quantidade = db.Column(db.Integer)
    descricao = db.Column(db.String(100))

    registros = db.relationship('Registra', backref='produto', lazy=True)

    def to_json(self):
        return {
            "id": self.id_produto,
            "nome": self.nome,
            "quantidade": self.quantidade,
            "descricao": self.descricao,
            "registos": self.registros
        }
