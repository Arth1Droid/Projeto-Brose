from flask import Blueprint, jsonify, request
from backend.controllers.Produto import cadastrar_produto


produto_bp = Blueprint('produto_bp', __name__)

@produto_bp.route('/produtos', methods=['POST'])
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
