document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.getElementById("slides");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("dotsContainer");
    const dots = document.querySelectorAll(".dot-btn");

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval = null;

    // Actualizar movimiento e indicadores
    function updateSlider(index) {
        currentIndex = index;
        const offset = -currentIndex * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;

        // Actualizar estados de puntos
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

    // Eventos de botones
    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetTimer();
    });

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetTimer();
    });

    // Eventos para puntos indicadores
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            updateSlider(index);
            resetTimer();
        });
    });

    // Reproducción automática y pausa al pasar el cursor (Hover)
    function startTimer() {
        autoSlideInterval = setInterval(nextSlide, 4500);
    }

    function resetTimer() {
        clearInterval(autoSlideInterval);
        startTimer();
    }

    slidesContainer.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
    slidesContainer.addEventListener("mouseleave", () => startTimer());

    // Inicializar
    updateSlider(0);
    startTimer();
});