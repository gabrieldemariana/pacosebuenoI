import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Función para el registro
async function handleSignUp(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nombre = document.getElementById('nombre').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    // ... obtener resto de campos del formulario

    try {
        // Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Guardar datos adicionales en Firestore
        await addDoc(collection(db, "usuarios"), {
            uid: userCredential.user.uid,
            nombre: nombre,
            email: email,
            fechaNacimiento: fechaNacimiento,
            fechaRegistro: serverTimestamp()
            // ... resto de campos
        });

        alert('¡Registro exitoso!');
        window.location.href = 'signin.html';
    } catch (error) {
        alert('Error en el registro: ' + error.message);
    }
}

// Función para el login
async function handleSignIn(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Autenticar usuario
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Registrar fecha y hora de inicio de sesión
        await addDoc(collection(db, "sesiones"), {
            uid: userCredential.user.uid,
            fechaLogin: serverTimestamp()
        });

        alert('¡Inicio de sesión exitoso!');
        window.location.href = 'index.html';
    } catch (error) {
        alert('Error en el inicio de sesión: ' + error.message);
    }
}

// Función para validar el formulario de registro
function validateSignUp(event) {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    
    // Validar edad mínima (18 años)
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 18) {
        alert('Debes ser mayor de 18 años para registrarte');
        return false;
    }
    
    // Validar contraseña fuerte
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial');
        return false;
    }
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return false;
    }
    
    // Validar formato de email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, introduce un email válido');
        return false;
    }
    
    // Si todo está correcto, mostrar mensaje de éxito
    alert('¡Registro exitoso!');
    window.location.href = 'signin.html';
    return true;
}

// Las funciones togglePassword y mostrarLOPD se mantienen igual que antes

// Función para alternar la visibilidad de la contraseña
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = passwordInput.nextElementSibling.querySelector('.toggle-password');
    
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

function mostrarLOPD() {
    document.getElementById('lopdModal').style.display = 'block';
}

function cerrarLOPD() {
    document.getElementById('lopdModal').style.display = 'none';
}

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function(event) {
    let modal = document.getElementById('lopdModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}