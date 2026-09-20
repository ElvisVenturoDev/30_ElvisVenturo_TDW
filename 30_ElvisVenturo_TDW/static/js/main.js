// Función para agregar mensajes a la consola
function agregarOutput(mensaje) {
    const output = document.getElementById('output');
    const timestamp = new Date().toLocaleTimeString();
    const linea = document.createElement('p');
    linea.style.color = '#4ade80';
    linea.style.fontSize = '12px';
    linea.style.margin = '4px 0';
    linea.textContent = `[${timestamp}] ${mensaje}`;
    output.appendChild(linea);
    output.scrollTop = output.scrollHeight;
}

// Limpiar consola
function limpiarConsola() {
    const output = document.getElementById('output');
    output.innerHTML = '';
    const linea = document.createElement('p');
    linea.style.color = '#9ca3af';
    linea.style.fontSize = '12px';
    linea.textContent = '> Sistema listo...';
    output.appendChild(linea);
    setTimeout(() => agregarOutput('Consola limpiada ✨'), 100);
}

// Función 1: Mostrar Mensaje
function mostrarMensaje() {
    const mensaje = document.getElementById('mensaje');
    if (mensaje.style.display === 'none') {
        mensaje.style.display = 'block';
        agregarOutput('✅ Mensaje mostrado');
    } else {
        mensaje.style.display = 'none';
        agregarOutput('❌ Mensaje ocultado');
    }
}

// Función 2: Cambiar Contenido
let contadores = 0;
const contenidos = [
    'Tercer contenido 📝',
    'Contenido número 2 ✨',
    'Contenido número 3 🎉'
];

function agregarContenido() {
    const input = document.getElementById('inputContenido');
    const texto = input.value.trim();
    
    if (texto) {
        contenidos.push(texto);
        input.value = '';
        agregarOutput(`➕ Contenido agregado: "${texto}"`);
    } else {
        agregarOutput('⚠️ Campo vacío');
    }
}

function cambiarContenido() {
    const contenido = document.getElementById('contenido');
    contadores = (contadores + 1) % contenidos.length;
    const textoActual = contenidos[contadores];
    contenido.querySelector('p').textContent = textoActual;
    agregarOutput(`🔄 Contenido cambiado a: "${textoActual}"`);
}

// Función 3: Cambiar Estilo
let estiloActivo = 0;
const estilos = [
    {
        bg: '#dcfce7',
        border: '#22c55e',
        texto: 'Esta caja cambia de estilo'
    },
    {
        bg: '#dbeafe',
        border: '#3b82f6',
        texto: 'Ahora es azul ✨'
    },
    {
        bg: '#fee2e2',
        border: '#ef4444',
        texto: 'Ahora es rojo 🔴'
    },
    {
        bg: '#f3e8ff',
        border: '#a855f7',
        texto: 'Ahora es morado 💜'
    }
];

function cambiarEstilo() {
    const estilo = document.getElementById('estilo');
    
    // Cambiar a siguiente estilo
    estiloActivo = (estiloActivo + 1) % estilos.length;
    const estiloNuevo = estilos[estiloActivo];
    
    // Aplicar estilos directamente
    estilo.style.backgroundColor = estiloNuevo.bg;
    estilo.style.borderColor = estiloNuevo.border;
    estilo.querySelector('p').textContent = estiloNuevo.texto;
    agregarOutput(`🎨 Estilo cambiado a: ${estiloNuevo.texto}`);
}

// Mensaje inicial
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => agregarOutput('Sistema iniciado con éxito 🚀'), 100);
});
