from flask import Flask

app = Flask(__name__)
CORS(app)

init_routes(app)
CORS(app, resources={
    r"/*": {
        "origins":  ["http://127.0.0.1:5500", "http://localhost:5500"]
    }
})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)