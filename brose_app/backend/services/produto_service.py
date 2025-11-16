from repositories.produto_repository import ProdutoRepository
from ..models.database import db
from ..models.Produto_model import Produto

class ProdutoService:
    def __init__(self):
        self.repository = ProdutoRepository()
        
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
        # Chama o repositório para salvar no banco
        return self.repository.add(produto=novo_produto)

    def deletar_produto(self, id_produto: int) -> bool:
        """Remove um produto do banco de dados."""
        # Verifica antes se existe
        produto = self.repository.get_by_id(id_produto)

        if not produto:
            raise ValueError("Produto não encontrado.")

        return self.repository.delete(id_produto)

    def atualizar_produto(self, id_produto: int, dados: dict):
        """Atualiza parcialmente um produto no banco de dados. Por hora só nome e descrição."""
        
        produto = self.repository.get_by_id(id_produto)

        if not produto:
            raise ValueError("Produto não encontrado.")

        # Atualização parcial
        if 'nome' in dados and dados['nome'] is not None:
            produto.nome = dados['nome']

        if 'descricao' in dados and dados['descricao'] is not None:
            produto.descricao = dados['descricao']

        # Salva no banco usando o repository
        return self.repository.update(produto)
    
    def listar_produtos(self):
        """Função para Retornar todos os produtos cadastrados."""
        return self.repository.get_all()

    def editar_quantidade(dados: dict):
        """Função responsável por editar quantidades no banco de dados"""
