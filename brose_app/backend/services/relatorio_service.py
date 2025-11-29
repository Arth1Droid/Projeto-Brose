from ..repositories.produto_repository import ProdutoRepository
import csv
import io

class RelatorioService:
    def __init__(self):
        self.produto_repository = ProdutoRepository()

    def gerar_relatorio_produtos(self):
        """Gera um relatório CSV com todos os produtos."""
        
        produtos = self.produto_repository.get_all()

        buffer = io.StringIO()
        writer = csv.writer(buffer)

        # Cabeçalho do CSV
        writer.writerow(["ID", "Nome", "Descrição", "Quantidade"])

        # Dados
        for p in produtos:
            writer.writerow([
                p.id_produto,
                p.nome,
                p.descricao,
                p.quantidade
            ])

        csv_data = buffer.getvalue()
        buffer.close()

        return csv_data
