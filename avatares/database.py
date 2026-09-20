from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def init_db(app):
    db.init_app(app)
    with app.app_context():
        from .models.avatar import Avatar  # noqa: F401
        db.create_all()
