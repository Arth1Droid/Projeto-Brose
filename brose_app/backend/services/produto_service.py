from repositories.produto_repository import ProdutoRepository
from ..models.Produto_model import Produto

class ProdutoService:

    def __init__(self):
        self.repository = ProdutoRepository()

    def cadastrar_produto(self, dados: dict):
        """Função responsável por cadastrar um novo produto no banco."""
        nome = dados.get('nome')
        quantidade = dados.get('quantidade', 0)
        descricao = dados.get('descricao', '')

        novo_produto = Produto(
            nome=nome,
            quantidade=quantidade,
            descricao=descricao
        )

        # usa o repositório para salvar
        return self.repository.add(novo_produto)

    def editar_quantidade(self, dados: dict):
        """Função responsável por editar quantidades no banco de dados"""
        pass
