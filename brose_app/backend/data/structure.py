from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import text

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///brose.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Produto(db.Model):
    __tablename__ = 'produto'
    id_produto = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False)
    descricao = db.Column(db.String(200))
    quantidade = db.Column(db.Integer, default=0)
    registros = db.relationship('Registra', backref='produto', lazy=True)

    def to_json(self):
        return {
            "id_produto": self.id_produto,
            "nome": self.nome,
            "descricao": self.descricao,
            "quantidade": self.quantidade
        }

class Registra(db.Model):
    __tablename__ = 'registra'
    id_registro = db.Column(db.Integer, primary_key=True)
    id_produto_fk = db.Column(db.Integer, db.ForeignKey('produto.id_produto'), nullable=False)
    quantidade = db.Column(db.Integer)
    data_registro = db.Column(db.DateTime, default=datetime.utcnow)

    def to_json(self):
        return {
            "id_registro": self.id_registro,
            "id_produto": self.id_produto_fk,
            "quantidade": self.quantidade,
            "data_registro": self.data_registro
        }

with app.app_context():
    db.create_all()
    print("✓ Banco de dados criado com sucesso!")
    create_trigger_sql = text("""
        CREATE TRIGGER IF NOT EXISTS trg_registro_quantidade
        AFTER UPDATE OF quantidade ON produto
        FOR EACH ROW
        WHEN NEW.quantidade != OLD.quantidade
        BEGIN
            INSERT INTO registra (id_produto_fk, quantidade, data_registro)
            VALUES (NEW.id_produto, NEW.quantidade, datetime('now', 'localtime'));
        END;
    """)
