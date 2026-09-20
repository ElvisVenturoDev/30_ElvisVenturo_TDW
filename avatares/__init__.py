"""
Paquete principal de la aplicación.
create_app() construye la app Flask con su configuración, base de datos y blueprints.
"""

from flask import Flask

from .config import Config
from .database import init_db


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_db(app)

    from .routes.avatares import avatares_bp
    app.register_blueprint(avatares_bp)

    return app
