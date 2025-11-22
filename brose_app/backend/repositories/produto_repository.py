# models/produto_repository.py

from ..models.database import db
from ..models.Produto_model import Produto
from typing import List, Optional

class ProdutoRepository:

    def get_by_id(self, id_produto: int) -> Optional[Produto]:
        return db.session.get(Produto, id_produto)

    def get_all(self) -> List[Produto]:
        return db.session.execute(db.select(Produto)).scalars().all()

    def add(self, produto: Produto) -> Produto:
        try:
            db.session.add(produto)
            db.session.commit()
            return produto
        except Exception as e:
            db.session.rollback()
            print(f"Erro ao adicionar produto: {e}")
            raise

    def update(self, produto: Produto) -> Produto:
        try:
            db.session.commit()
            return produto
        except Exception as e:
            db.session.rollback()
            print(f"Erro ao atualizar produto: {e}")
            raise

    def delete(self, id_produto: int) -> bool:
        produto_a_deletar = db.session.get(Produto, id_produto)
        if produto_a_deletar:
            try:
                db.session.delete(produto_a_deletar)
                db.session.commit()
                return True
            except Exception as e:
                db.session.rollback()
                print(f"Erro ao deletar produto: {e}")
                raise
        return False

    def find_by_name(self, nome: str) -> List[Produto]:
        return db.session.execute(
            db.select(Produto).filter(Produto.nome.ilike(f'%{nome}%'))
        ).scalars().all()