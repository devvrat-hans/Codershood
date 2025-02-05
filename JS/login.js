import { auth } from '../firebase/config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { handleFirebaseError } from '../firebase/error-service.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Store auth state
            localStorage.setItem('isLoggedIn', 'true');
            // Redirect to homepage
            window.location.href = 'index.html';
        } catch (error) {
            errorMessage.textContent = handleFirebaseError(error);
            loginForm.insertBefore(errorMessage, loginForm.firstChild);
        }
    });

    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });
});