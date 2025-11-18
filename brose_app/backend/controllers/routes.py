from flask import request, jsonify
from brose_app.backend.services.produto_service import ProdutoService

def register_routes(app, produto_service: ProdutoService):
    
    @app.route('/produtos', methods=['POST'])
    def rota_cadastrar_produto():
        try:
            dados = request.get_json()
            novo = produto_service.cadastrar_produto(dados)
            return jsonify(novo.to_json()), 201
        except ValueError as e:
            return jsonify({'erro': str(e)}), 400
        except Exception as e:
            print(f"Erro inesperado: {e}")
            return jsonify({'erro': 'Erro interno no servidor.'}), 500
        
    @app.route('/produtos', methods=['GET'])
    def rota_listar_produtos():
        try:
            produtos = produto_service.listar_produtos()
            return jsonify([p.to_json() for p in produtos]), 200
        except Exception as e:
            print(f"Erro inesperado: {e}")
            return jsonify({'erro': 'Erro interno no servidor.'}), 500
        
    @app.route('/produtos/<int:id_produto>', methods=['PUT'])
    def rota_atualizar_produto(id_produto):
        try:
            dados = request.get_json()
            atualizado = produto_service.atualizar_produto(id_produto, dados)
            return jsonify(atualizado.to_json()), 200
        except ValueError as e:
            return jsonify({'erro': str(e)}), 404
        except Exception as e:
            print(f"Erro inesperado: {e}")
            return jsonify({'erro': 'Erro interno no servidor.'}), 500

    @app.route('/produtos/<int:id_produto>', methods=['DELETE'])
    def rota_deletar_produto(id_produto):
        try:
            produto_service.deletar_produto(id_produto)
            return jsonify({"mensagem": "Produto deletado com sucesso."}), 200
        except ValueError as e:
            return jsonify({'erro': str(e)}), 404
        except Exception as e:
            print(f"Erro inesperado: {e}")
            return jsonify({'erro': 'Erro interno no servidor.'}), 500

    @app.route('/produtos/<int:id_produto>/incrementar', methods=['PATCH'])
    def rota_incrementar(id_produto):
        try:
            produto = produto_service.yolo_incrementar_quantidade_automaticamente(id_produto)
            return jsonify(produto.to_json()), 200
        except ValueError as e:
            return jsonify({'erro': str(e)}), 404
        except Exception as e:
            print(f"Erro inesperado: {e}")
            return jsonify({'erro': 'Erro interno no servidor.'}), 500

    # Rota simples para testar se está funcionando
    @app.route('/health', methods=['GET'])
    def health():
        return jsonify({"status": "ok"}), 200
