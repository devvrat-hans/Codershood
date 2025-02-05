import { auth } from '../firebase/config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { dbService } from '../firebase/db-service.js';
import { handleSocialAuth } from './social-auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const googleBtn = document.getElementById('googleSignup');
    const githubBtn = document.getElementById('githubSignup');

    signupForm.addEventListener('submit', handleSignup);
    googleBtn.addEventListener('click', () => handleSocialAuth('google'));
    githubBtn.addEventListener('click', () => handleSocialAuth('github'));
    setupPasswordToggles();
});

async function handleSignup(e) {
    e.preventDefault();
    const formData = getFormData();
    
    if (!validateForm(formData)) return;

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth, 
            formData.email, 
            formData.password
        );
        
        await createUserProfile(userCredential.user, formData.username);
        handleSuccessfulSignup();
    } catch (error) {
        showError(error.message);
    }
}

function getFormData() {
    return {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        terms: document.getElementById('terms').checked
    };
}

function validateForm(data) {
    if (data.password !== data.confirmPassword) {
        showError('Passwords do not match');
        return false;
    }
    if (!data.terms) {
        showError('Please accept the terms and conditions');
        return false;
    }
    return true;
}

async function createUserProfile(user, username) {
    await dbService.createUser(user.uid, {
        username,
        email: user.email,
        createdAt: new Date(),
        lastLogin: new Date()
    });
}

function handleSuccessfulSignup() {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'index.html';
}

function setupPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            button.classList.toggle('fa-eye');
            button.classList.toggle('fa-eye-slash');
        });
    });
}

function showError(message) {
    const errorDiv = document.querySelector('.error-message') || createErrorElement();
    errorDiv.textContent = message;
}

function createErrorElement() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    signupForm.insertBefore(errorDiv, signupForm.firstChild);
    return errorDiv;
}