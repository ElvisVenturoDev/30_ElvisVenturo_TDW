import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "avatares", "static")


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "clave-de-desarrollo")

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", f"sqlite:///{os.path.join(BASE_DIR, 'avatares.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    UPLOAD_FOLDER = os.path.join(STATIC_DIR, "img", "uploads")
    PROCESSED_FOLDER = os.path.join(STATIC_DIR, "img", "processed")

    EXTENSIONES_PERMITIDAS = {"png", "jpg", "jpeg", "webp"}
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024  # 5 MB

    TAMANO_AVATAR = 400  # ancho y alto final del avatar, en píxeles
