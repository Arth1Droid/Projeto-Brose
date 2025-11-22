from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///brose.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Produto(db.Model):
    __tablename__ = 'produto'
    id_produto = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False)
    descricao = db.Column(db.String(200))
    registros = db.relationship('RegistroContagem', backref='produto', lazy=True)

    def to_json(self):
        return {
            "id": self.id_produto,
            "nome": self.nome,
            "descricao": self.descricao
        }


class RegistroContagem(db.Model):
    __tablename__ = 'registro_contagem'
    id_registro = db.Column(db.Integer, primary_key=True)
    id_produto = db.Column(db.Integer, db.ForeignKey('produto.id_produto'), nullable=False)
    quantidade = db.Column(db.Integer)
    data_registro = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_json(self):
        return {
            "id": self.id_registro,
            "produto_id": self.id_produto,
            "quantidade": self.quantidade,
            "data_registro": self.data_registro
        }


with app.app_context():
    db.create_all()
    print("Banco de dados criado com sucesso!")


#pra criar o banco é só executar o arquivo: entra na pasta data e no terminal digita python structure.py

#ele vai criar o arquivo .db na pasta instance que é o banco em sqlite.