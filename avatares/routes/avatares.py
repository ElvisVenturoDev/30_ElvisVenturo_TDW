from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app

from ..database import db
from ..models.avatar import Avatar
from ..services.avatar_service import extension_permitida, generar_avatar

avatares_bp = Blueprint("avatares", __name__)


@avatares_bp.route("/")
def index():
    """Muestra la galería de avatares ya generados."""
    avatares = Avatar.query.order_by(Avatar.fecha.desc()).all()
    return render_template("avatares/index.html", avatares=avatares)


@avatares_bp.route("/nuevo")
def nuevo():
    """Muestra el formulario para generar un nuevo avatar."""
    return render_template("avatares/form.html")


@avatares_bp.route("/procesar", methods=["POST"])
def procesar():
    """Recibe el formulario, valida en el servidor y genera el avatar circular."""
    nombre = request.form.get("nombre", "").strip()
    email = request.form.get("email", "").strip()
    comentario = request.form.get("comentario", "").strip()
    imagen = request.files.get("imagen")

    errores = []

    if not nombre or len(nombre) < 3:
        errores.append("El nombre debe tener al menos 3 caracteres.")

    if "@" not in email or "." not in email:
        errores.append("El correo electrónico no es válido.")

    if not imagen or imagen.filename == "":
        errores.append("Debe seleccionar una imagen.")
    elif not extension_permitida(imagen.filename, current_app.config["EXTENSIONES_PERMITIDAS"]):
        errores.append("Formato no permitido (use png, jpg, jpeg o webp).")

    if errores:
        for error in errores:
            flash(error, "error")
        return redirect(url_for("avatares.nuevo"))

    try:
        datos = generar_avatar(imagen)
    except Exception as exc:  # noqa: BLE001
        flash(f"Ocurrió un error al generar el avatar: {exc}", "error")
        return redirect(url_for("avatares.nuevo"))

    registro = Avatar(
        nombre=nombre,
        email=email,
        comentario=comentario,
        archivo_original=datos["archivo_original"],
        archivo_procesado=datos["archivo_procesado"],
    )
    db.session.add(registro)
    db.session.commit()

    flash("Avatar generado correctamente.", "exito")
    return redirect(url_for("avatares.index"))
