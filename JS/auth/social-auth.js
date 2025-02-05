import { auth } from '../firebase/config.js';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { dbService } from '../firebase/db-service.js';

export async function handleSocialAuth(provider) {
    const authProvider = provider === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
    
    try {
        const result = await signInWithPopup(auth, authProvider);
        await handleSocialSignup(result.user);
    } catch (error) {
        showError(error.message);
    }
}

async function handleSocialSignup(user) {
    await dbService.createUser(user.uid, {
        username: user.displayName || user.email.split('@')[0],
        email: user.email,
        createdAt: new Date(),
        lastLogin: new Date(),
        photoURL: user.photoURL
    });

    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'index.html';
}

function showError(message) {
    const errorDiv = document.querySelector('.error-message') || createErrorElement();
    errorDiv.textContent = message;
}

function createErrorElement() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    document.querySelector('#signupForm').insertBefore(errorDiv, signupForm.firstChild);
    return errorDiv;
}