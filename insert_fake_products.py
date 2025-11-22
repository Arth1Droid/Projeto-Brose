import os
from flask import Flask
from brose_app.backend.models.database import db
from brose_app.backend.models.Produto_model import Produto

app = Flask(__name__)

# Caminho ABSOLUTO para a pasta 'instance'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # backend/
INSTANCE_DIR = os.path.join(BASE_DIR, "data", "instance")

# Garante que a pasta existe
os.makedirs(INSTANCE_DIR, exist_ok=True)

DB_PATH = os.path.join(INSTANCE_DIR, "brose.db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        produtos_fake = [
            Produto(nome='Pneu 185/65 R15', descricao='Pneu para carros populares', quantidade=15),
            Produto(nome='Correia Dentada', descricao='Correia de distribuição', quantidade=8),
            Produto(nome='Pastilha de Freio', descricao='Pastilha de freio dianteira', quantidade=25),
            Produto(nome='Amortecedor', descricao='Amortecedor dianteiro', quantidade=5),
            Produto(nome='Bateria 60Ah', descricao='Bateria automotiva', quantidade=12),
            Produto(nome='Filtro de Ar', descricao='Filtro de ar do motor', quantidade=30),
            Produto(nome='Óleo Sintético 5W30', descricao='Óleo de motor 5W30', quantidade=20),
            Produto(nome='Vela de Ignição', descricao='Vela de ignição padrão', quantidade=50),
            Produto(nome='Disco de Freio', descricao='Disco de freio dianteiro', quantidade=10),
            Produto(nome='Sensor de Oxigênio', descricao='Sonda lambda', quantidade=7),
        ]

        try:
            db.session.add_all(produtos_fake)
            db.session.commit()

            print(f"✓ {len(produtos_fake)} produtos inseridos com sucesso!")
            print(f"✓ Banco criado em: {DB_PATH}")

            todos = Produto.query.all()
            print("\nProdutos no banco:")
            for p in todos:
                print(f"  ID: {p.id_produto} | Nome: {p.nome} | Qtd: {p.quantidade}")

        except Exception as e:
            db.session.rollback()
            print(f"✗ Erro ao inserir produtos: {e}")
