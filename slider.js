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
        slider.style.transition = 'transform 1s ease-in-out';
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
            }, 1000); // Aumentamos este tiempo para que coincida con la nueva duración de la transición
        }
    }

    // Aumentamos el intervalo de 4000ms (4s) a 6000ms (6s)
    setInterval(nextSlide, 6000);
});
