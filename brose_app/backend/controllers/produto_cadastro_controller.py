from flask import Flask, request, jsonify
from backend.services.produto_cadastro_service import cadastrar_produto

def create_app():
    app = Flask(__name__)
    
    # Config DB no app
    from backend.models.database import db
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

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

    return app
