import os
from brose_app.backend.app import create_app
from brose_app.backend.models.database import db
from brose_app.backend.models.Produto_model import Produto

app = create_app()

with app.app_context():
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

    db.session.add_all(produtos_fake)
    db.session.commit()

    print("✓ Produtos inseridos com sucesso!")
