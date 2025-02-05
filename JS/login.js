import { auth } from '../firebase/config.js';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { dbService } from '../firebase/db-service.js';
import { handleFirebaseError } from '../firebase/error-service.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const googleBtn = document.getElementById('googleSignup');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    
    // Regular signup
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const username = document.getElementById('username').value;
        const terms = document.getElementById('terms').checked;

        // Validation
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        if (!terms) {
            showError('Please accept the terms and conditions');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Create user profile
            await dbService.createUser(userCredential.user.uid, {
                username,
                email,
                createdAt: new Date(),
                lastLogin: new Date()
            });

            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Signup error:', error);
            showError(handleFirebaseError(error));
        }
    });

    // Google signup
    googleBtn.addEventListener('click', async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            // Create/Update user profile
            await dbService.createUser(result.user.uid, {
                username: result.user.displayName || result.user.email.split('@')[0],
                email: result.user.email,
                photoURL: result.user.photoURL,
                createdAt: new Date(),
                lastLogin: new Date()
            });

            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Google sign-up error:', error);
            showError(handleFirebaseError(error));
        }
    });

    // Password visibility toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            button.classList.toggle('fa-eye');
            button.classList.toggle('fa-eye-slash');
        });
    });

    function showError(message) {
        errorMessage.textContent = message;
        signupForm.insertBefore(errorMessage, signupForm.firstChild);
    }
});