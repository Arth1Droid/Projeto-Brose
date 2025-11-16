from repositories.produto_repository import ProdutoRepository
from ..models.database import db
from ..models.Produto_model import Produto

class ProdutoService:
    def __init__(self):
        self.repository = ProdutoRepository()
        
    def cadastrar_produto(self, dados):
        nome = dados["nome"].strip()
        #  Verifica se já existe um produto com o mesmo nome para evitar produto duplicados
        existente = self.repository.find_by_name(nome)
        if existente:
            raise ValueError("Já existe um produto com esse nome.")

        produto = Produto(
            nome=nome,
            descricao=dados.get("descricao", "").strip(),
            quantidade=0
        )
        return self.repository.add(produto)

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

    def buscar_produto_por_id(self, id_produto):
        """Função para buscar um produto por id."""
        produto = self.repository.get_by_id(id_produto)
        if not produto:
            raise ValueError("Produto não encontrado.")
        return produto

    def buscar_por_nome(self, nome):
        """Função para buscar produtos por nome."""
        return self.repository.find_by_name(nome)

    def yolo_incrementar_quantidade_automaticamente(self, id_produto: int):
        """Função que o slgotiymo do Yolo vai chamar para adicionar +1 no campo quantidade na tabela Produto."""
        produto = self.repository.get_by_id(id_produto)
        if not produto:
            raise ValueError("Produto não encontrado")

        produto.quantidade += 1
        self.repository.update(produto)

        return produto  # retorna objeto com o campo quantidade atualizado


    def editar_quantidade(dados: dict):
        """Função responsável por editar quantidades no banco de dados"""
