document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <header>
                <div class="container">
                    <div class="logo-container">
                        <a href="index.html">
                            <img src="Images/logo.gif" alt="Happy Hump Logo" class="header-logo">
                        </a>
                    </div>
                    <button class="menu-toggle" id="menuToggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <nav class="main-nav">
                        <ul class="nav-list">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="index.html#acerca">About us</a></li>
                            <li><a href="index.html#servicios">Products</a></li>
                            <li><a href="statistics.html">Statistics</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                            <li><a href="signin.html">
                                <i class="fas fa-user"></i> Sign In</a></li>
                        </ul>
                    </nav>
                </div>
            </header>`;

        // Agregar la funcionalidad del menú móvil
        const menuToggle = document.getElementById('menuToggle');
        const navList = document.querySelector('.nav-list');

        if (menuToggle && navList) {
            menuToggle.addEventListener('click', function() {
                navList.classList.toggle('active');
            });
        }
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer>
                <div class="container">
                    <p>&copy; 2024 All rights reserved.</p>
                    <div class="social-icons">
                        <a href="https://www.facebook.com/ucamuniversidad/?locale=es_ES" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-facebook"></i></a>
                        <a href="https://x.com/ucam_deportes?lang=en" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-twitter"></i></a>
                        <a href="https://www.instagram.com/fpsanantonio/" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-instagram"></i></a>
                        <a href="https://es.linkedin.com/school/universidad-catolica-san-antonio-de-murcia/" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </footer>`;
    }

    // Función unificada para alternar la visibilidad de la contraseña
    function togglePasswordVisibility(inputId) {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.querySelector(`[data-toggle="${inputId}"]`);
        
        if (passwordInput && toggleIcon) {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        }
    }

    // Event listeners para los botones de toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetInput = this.getAttribute('data-toggle');
            togglePasswordVisibility(targetInput);
        });
    });
});