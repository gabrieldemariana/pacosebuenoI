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
                    <nav>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="index.html#acerca">About us</a></li>
                            <li><a href="index.html#servicios">Products</a></li>
                            <li><a href="index.html#contacto">Contact Us</a></li>
                            <li><a href="signin.html" class="signin-btn">
                                <i class="fas fa-user"></i> Sign In</a></li>
                        </ul>
                    </nav>
                </div>
            </header>`;
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
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-twitter"></i></a>
                        <a href="https://www.instagram.com/fpsanantonio/" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-instagram"></i></a>
                        <a href="https://es.linkedin.com/school/universidad-catolica-san-antonio-de-murcia/" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </footer>`;
    }
});