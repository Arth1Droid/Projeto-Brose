from flask import request, jsonify
from brose_app.backend.services.produto_cadastro_service import cadastrar_produto

def register_routes(app):

    @app.route('/produtos', methods=['POST'])
    def rota_cadastrar_produto():
        try:
            dados = request.get_json()
            novo = cadastrar_produto(dados)
            return jsonify(novo.to_json()), 201
        except ValueError as e:
            return jsonify({'erro': str(e)}), 400
        except Exception as e:
            print(f"Erro inesperado: {e}")
            return jsonify({'erro': 'Erro interno no servidor.'}), 500

    # Rota simples para testar se está funcionando
    @app.route('/health', methods=['GET'])
    def health():
        return jsonify({"status": "ok"}), 200
