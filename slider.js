// Script para el slider de la página principal, en el elemento main del body
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    const totalSlides = slides.length - 1; 

    function nextSlide() {
        currentIndex++;
        updateSlider(true);
    }

    function updateSlider(isNext = false) {
        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Si llegamos a la imagen duplicada (última)
        if (currentIndex === totalSlides) {
            // Esperamos a que termine la transición
            setTimeout(() => {
                // Quitamos la transición
                slider.style.transition = 'none';
                // Volvemos instantáneamente al inicio
                currentIndex = 0;
                slider.style.transform = `translateX(0)`;
            }, 500); // Este tiempo debe coincidir con la duración de la transición en CSS
        }
    }

    // Cambiar slide cada 4 segundos
    setInterval(nextSlide, 4000);
});
