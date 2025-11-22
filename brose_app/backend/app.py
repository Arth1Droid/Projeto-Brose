import os
from flask import Flask
from flask_cors import CORS
from brose_app.backend.models.database import db
from brose_app.backend.controllers.routes import register_routes
from brose_app.backend.services.produto_service import ProdutoService

def create_app():
    app = Flask(__name__)

    # Caminho absoluto do banco de dados
    base_dir = os.path.abspath(os.path.dirname(__file__))
    db_path = os.path.join(base_dir, 'data', 'instance', 'brose.db')

    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app, resources={r"/*": {"origins": "http://localhost:5500"}})

    db.init_app(app)

    produto_service = ProdutoService()
    register_routes(app, produto_service)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=5000, debug=True)
