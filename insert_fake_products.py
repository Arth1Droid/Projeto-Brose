import os
from brose_app.backend.app import create_app
from brose_app.backend.models.database import db
from brose_app.backend.models.Produto_model import Produto

app = create_app()

with app.app_context():
    produtos_fake = [
        Produto(nome='Alicate', descricao='alicate', quantidade=0),
        Produto(nome='Colher', descricao='colher', quantidade=0),
        Produto(nome='Chave combinada', descricao='chave combinada', quantidade=0),

    ]

    db.session.add_all(produtos_fake)
    db.session.commit()

    print("✓ Produtos inseridos com sucesso!")
