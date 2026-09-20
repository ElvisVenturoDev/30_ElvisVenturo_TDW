from datetime import datetime

from ..database import db


class Avatar(db.Model):
    __tablename__ = "avatares"

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    comentario = db.Column(db.String(255))

    archivo_original = db.Column(db.String(255), nullable=False)
    archivo_procesado = db.Column(db.String(255), nullable=False)

    fecha = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Avatar {self.id} - {self.nombre}>"
