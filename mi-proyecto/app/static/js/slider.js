document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("sliderWrapper");
    const slides = document.querySelectorAll(".slider-item");
    const prevBtn = document.getElementById("prevSlideBtn");
    const nextBtn = document.getElementById("nextSlideBtn");
    const dots = document.querySelectorAll(".dot-btn");
    const sliderContainer = document.getElementById("custom-slider");

    if (!wrapper || slides.length === 0) {
        console.error("No se encontraron los elementos del slider.");
        return;
    }

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval = null;

    // Función para cambiar de imagen e indicador activo
    function updateSlider(index) {
        currentIndex = index;
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add("active-dot");
            } else {
                dot.classList.remove("active-dot");
            }
        });
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % totalSlides;
        updateSlider(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider(newIndex);
    }

    // Eventos para los botones izquierda / derecha
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetTimer();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetTimer();
        });
    }

    // Eventos para los puntos indicadores
    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            if (!isNaN(index)) {
                updateSlider(index);
                resetTimer();
            }
        });
    });

    // Avance automático cada 4.5 segundos
    function startTimer() {
        autoSlideInterval = setInterval(nextSlide, 4500);
    }

    function resetTimer() {
        clearInterval(autoSlideInterval);
        startTimer();
    }

    // Pausar al pasar el mouse por encima
    if (sliderContainer) {
        sliderContainer.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
        sliderContainer.addEventListener("mouseleave", () => startTimer());
    }

    // Inicialización
    updateSlider(0);
    startTimer();
});