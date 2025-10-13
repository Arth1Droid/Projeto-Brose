from brose_app import create_app, db

app = create_app()

# Cria o banco de dados (se ainda não existir)
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
