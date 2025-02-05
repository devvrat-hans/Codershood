import { auth } from '../firebase/config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { dbService } from '../firebase/db-service.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted'); // Debug log

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;

        try {
            console.log('Attempting to create user'); // Debug log
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created:', userCredential); // Debug log

            // Create user profile in Firestore
            await dbService.createUser(userCredential.user.uid, {
                username,
                email,
                createdAt: new Date()
            });

            // Store auth state
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirect to homepage
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Signup error:', error); // Debug log
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = error.message;
            signupForm.insertBefore(errorMessage, signupForm.firstChild);
        }
    });
});