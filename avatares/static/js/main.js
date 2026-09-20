document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const inputNombre = document.getElementById("nombre");
  const inputEmail = document.getElementById("email");
  const inputImagen = document.getElementById("imagen");

  const errorNombre = document.getElementById("error-nombre");
  const errorEmail = document.getElementById("error-email");
  const errorImagen = document.getElementById("error-imagen");

  const vistaPreviaContenedor = document.getElementById("vista-previa-contenedor");
  const vistaPrevia = document.getElementById("vista-previa");

  const EXTENSIONES_PERMITIDAS = ["png", "jpg", "jpeg", "webp"];
  const TAMANO_MAXIMO_MB = 5;
  const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function marcarError(input, spanError, mensaje) {
    input.classList.add("border-red-500");
    spanError.textContent = mensaje;
  }

  function limpiarError(input, spanError) {
    input.classList.remove("border-red-500");
    spanError.textContent = "";
  }

  function validarNombre() {
    const valido = inputNombre.value.trim().length >= 3;
    if (!valido) marcarError(inputNombre, errorNombre, "El nombre debe tener al menos 3 caracteres.");
    else limpiarError(inputNombre, errorNombre);
    return valido;
  }

  function validarEmail() {
    const valido = REGEX_EMAIL.test(inputEmail.value.trim());
    if (!valido) marcarError(inputEmail, errorEmail, "Ingrese un correo electrónico válido.");
    else limpiarError(inputEmail, errorEmail);
    return valido;
  }

  function obtenerExtension(nombreArchivo) {
    return nombreArchivo.split(".").pop().toLowerCase();
  }

  function validarImagen() {
    if (!inputImagen.files || inputImagen.files.length === 0) {
      marcarError(inputImagen, errorImagen, "Debe seleccionar una imagen.");
      vistaPreviaContenedor.style.display = "none";
      return false;
    }

    const archivo = inputImagen.files[0];
    const extension = obtenerExtension(archivo.name);
    const tamanoMB = archivo.size / (1024 * 1024);

    if (!EXTENSIONES_PERMITIDAS.includes(extension)) {
      marcarError(inputImagen, errorImagen, "Formato no permitido. Use: " + EXTENSIONES_PERMITIDAS.join(", ") + ".");
      vistaPreviaContenedor.style.display = "none";
      return false;
    }

    if (tamanoMB > TAMANO_MAXIMO_MB) {
      marcarError(inputImagen, errorImagen, "El archivo pesa " + tamanoMB.toFixed(2) + " MB. Máximo: " + TAMANO_MAXIMO_MB + " MB.");
      vistaPreviaContenedor.style.display = "none";
      return false;
    }

    limpiarError(inputImagen, errorImagen);

    const lector = new FileReader();
    lector.onload = function (evento) {
      vistaPrevia.src = evento.target.result;
      vistaPreviaContenedor.style.display = "block";
    };
    lector.readAsDataURL(archivo);

    return true;
  }

  inputNombre.addEventListener("blur", validarNombre);
  inputEmail.addEventListener("blur", validarEmail);
  inputImagen.addEventListener("change", validarImagen);

  formulario.addEventListener("submit", function (evento) {
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const imagenValida = validarImagen();

    if (!nombreValido || !emailValido || !imagenValida) {
      evento.preventDefault();
    }
  });
});
