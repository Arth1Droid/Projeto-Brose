from ..models.database import db
from ..models.Produto_model import Produto


def cadastrar_produto(dados: dict):
    """Função responsável por cadastrar um novo produto no banco."""
    nome = dados.get('nome')
    quantidade = dados.get('quantidade', 0)
    descricao = dados.get('descricao', '')

    novo_produto = Produto(
        nome=nome,
        quantidade=quantidade,
        descricao=descricao
    )

    db.session.add(novo_produto)
    db.session.commit()

    return novo_produto


def editar_quantidade(dados: dict):
    """Função responsável por editar quantidades no banco de dados"""
