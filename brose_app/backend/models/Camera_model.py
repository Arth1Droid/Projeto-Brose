from backend.models.database import db

#potencialmente desnecessário

class Camera(db.Model):
    id_camera = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(10), nullable=False)

registros = db.relationship('Registra', backref='camera')

def to_json(self):
        return {
            "id": self.id_camera,
            "status": self.status
        }