"""
Lógica de negocio del módulo avatares: recorta la imagen a un cuadrado
centrado, la redimensiona y le aplica una máscara circular con transparencia.
"""

import os
import uuid

from flask import current_app
from PIL import Image, ImageDraw, ImageOps
from werkzeug.utils import secure_filename


def extension_permitida(nombre_archivo: str, extensiones_permitidas: set) -> bool:
    return (
        "." in nombre_archivo
        and nombre_archivo.rsplit(".", 1)[1].lower() in extensiones_permitidas
    )


def _recortar_cuadrado(img: Image.Image) -> Image.Image:
    """Recorta la imagen al cuadrado más grande posible, centrado."""
    ancho, alto = img.size
    lado = min(ancho, alto)
    izquierda = (ancho - lado) // 2
    arriba = (alto - lado) // 2
    return img.crop((izquierda, arriba, izquierda + lado, arriba + lado))


def _aplicar_mascara_circular(img: Image.Image) -> Image.Image:
    """Aplica una máscara circular, dejando transparente todo lo que quede fuera del círculo."""
    mascara = Image.new("L", img.size, 0)
    dibujo = ImageDraw.Draw(mascara)
    dibujo.ellipse((0, 0, img.size[0], img.size[1]), fill=255)

    resultado = Image.new("RGBA", img.size, (0, 0, 0, 0))
    resultado.paste(img, (0, 0), mascara)
    return resultado


def _generar_imagen_avatar(ruta_entrada: str, ruta_salida: str, tamano: int):
    """
    Procesa la imagen con Pillow:
    1. Corrige la orientación según los metadatos EXIF (fotos de celular).
    2. Recorta al cuadrado más grande posible, centrado.
    3. Redimensiona al tamaño final del avatar.
    4. Aplica una máscara circular (transparencia fuera del círculo).
    5. Guarda como PNG para conservar la transparencia.
    """
    with Image.open(ruta_entrada) as img:
        img = ImageOps.exif_transpose(img)  # corrige fotos rotadas por EXIF
        img = img.convert("RGBA")

        img = _recortar_cuadrado(img)
        img = img.resize((tamano, tamano), Image.LANCZOS)
        img = _aplicar_mascara_circular(img)

        img.save(ruta_salida, "PNG", optimize=True)


def generar_avatar(archivo) -> dict:
    """Guarda el archivo original y genera la versión de avatar circular."""
    upload_folder = current_app.config["UPLOAD_FOLDER"]
    processed_folder = current_app.config["PROCESSED_FOLDER"]
    tamano = current_app.config["TAMANO_AVATAR"]

    nombre_seguro = secure_filename(archivo.filename)
    identificador = uuid.uuid4().hex[:8]

    nombre_original = f"{identificador}_{nombre_seguro}"
    ruta_original = os.path.join(upload_folder, nombre_original)
    archivo.save(ruta_original)

    nombre_procesado = f"{identificador}_avatar.png"
    ruta_procesada = os.path.join(processed_folder, nombre_procesado)
    _generar_imagen_avatar(ruta_original, ruta_procesada, tamano)

    return {
        "archivo_original": nombre_original,
        "archivo_procesado": nombre_procesado,
    }
