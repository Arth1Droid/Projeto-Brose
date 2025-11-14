import pytest
import sys
import os
from flask import Flask

# Adicionar brose_app ao path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from backend.models.database import db as db_instance
from backend.controllers import create_app  # sua app factory sem blueprint


@pytest.fixture
def app():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.app_context():
        db_instance.create_all()
        yield app
        db_instance.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


def test_endpoint_cadastrar_produto(client):
    dados = {
        "nome": "Produto Teste",
        "quantidade": 5,
        "descricao": "Teste de rota"
    }

    response = client.post('/produtos', json=dados)

    assert response.status_code == 201

    json_response = response.get_json()
    assert json_response["nome"] == "Produto Teste"
    assert json_response["quantidade"] == 5
    assert json_response["descricao"] == "Teste de rota"


def test_endpoint_valores_padrao(client):
    dados = {"nome": "Produto Padrão"}

    response = client.post('/produtos', json=dados)

    assert response.status_code == 201

    json_response = response.get_json()
    assert json_response["nome"] == "Produto Padrão"
    assert json_response["quantidade"] == 0
    assert json_response["descricao"] == ""
