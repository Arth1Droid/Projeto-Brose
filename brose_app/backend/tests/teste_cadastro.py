import pytest
import sys
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Adicionar a pasta brose_app ao path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from backend.controllers.Produto import cadastrar_produto
from backend.models.database import db as db_instance
from backend.models.Produto_model import Produto


@pytest.fixture
def app():
    """Create and configure a test Flask app."""
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['TESTING'] = True
    return app


@pytest.fixture
def db(app):
    """Create test database."""
    db_instance.init_app(app)
    
    with app.app_context():
        db_instance.create_all()
        yield db_instance
        db_instance.session.remove()
        db_instance.drop_all()


@pytest.fixture
def client(app, db):
    """Create test client with app context."""
    with app.app_context():
        yield app, db


def test_cadastrar_produto_com_todos_campos(client):
    """Test product registration with all fields."""
    app, db = client
    with app.app_context():
        dados = {
            'nome': 'Produto Teste',
            'quantidade': 10,
            'descricao': 'Descrição do produto teste'
        }
        resultado = cadastrar_produto(dados)
        
        assert resultado.nome == 'Produto Teste'
        assert resultado.quantidade == 10
        assert resultado.descricao == 'Descrição do produto teste'


def test_cadastrar_produto_com_valores_padrao(client):
    """Test product registration with default values."""
    app, db = client
    with app.app_context():
        dados = {'nome': 'Produto Simples'}
        resultado = cadastrar_produto(dados)
        
        assert resultado.nome == 'Produto Simples'
        assert resultado.quantidade == 0
        assert resultado.descricao == ''


def test_cadastrar_produto_persistencia(client):
    """Test that product is persisted in database."""
    app, db = client
    with app.app_context():
        dados = {'nome': 'Persistência', 'quantidade': 5}
        produto = cadastrar_produto(dados)
        produto_id = produto.id_produto
        
        db.session.expunge_all()
        
        assert produto_id is not None
