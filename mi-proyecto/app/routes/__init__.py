from flask import Blueprint, render_template

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return render_template("base.html")

@main.route("/carrusel")
def carrusel():
    return render_template("carrusel_slider/carrusel.html")

@main.route("/slider")
def slider():
    imagenes = [
        {"url": "img/imagen01.jpg", "titulo": "Diseño Innovador", "desc": "Explora nuevas perspectivas en desarrollo web."},
        {"url": "img/imagen02.jpg", "titulo": "Interfaces Modernas", "desc": "Potenciado con Flask y Tailwind CSS v4."},
        {"url": "img/imagen03.jpg", "titulo": "Experiencia Fluida", "desc": "Transiciones suaves e interactivas."},
        {"url": "img/imagen04.jpg", "titulo": "Totalmente Responsive", "desc": "Adaptado a cualquier tipo de pantalla."}
    ]
    return render_template("carrusel_slider/slider.html", imagenes=imagenes)