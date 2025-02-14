import { auth, db } from './firebase/config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const googleBtn = document.querySelector('.google-btn');

    // Email Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                console.log('Attempting login with:', email); // Debug

                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                await updateUserLastLogin(userCredential.user.uid);
                handleAuthSuccess(userCredential.user);
            } catch (error) {
                console.error('Login error:', error);
                showError(getErrorMessage(error));
            }
        });
    }

    // Email Signup
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const username = document.getElementById('username').value;
                const terms = document.getElementById('terms').checked;

                // Validation
                if (!validateSignup(email, password, confirmPassword, username, terms)) return;

                console.log('Attempting signup with:', email); // Debug

                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await createUserProfile(userCredential.user, { username });
                handleAuthSuccess(userCredential.user);
            } catch (error) {
                console.error('Signup error:', error);
                showError(getErrorMessage(error));
            }
        });
    }

    // Google Auth
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            try {
                console.log('Starting Google auth...'); // Debug
                const provider = new GoogleAuthProvider();
                
                // Add required scopes
                provider.addScope('profile');
                provider.addScope('email');
                
                // Force account selection
                provider.setCustomParameters({
                    prompt: 'select_account'
                });
                
                const result = await signInWithPopup(auth, provider);
                console.log('Google auth result:', result); // Debug
                
                // Create/update user profile
                await createUserProfile(result.user);
                
                // Handle successful login
                handleAuthSuccess(result.user);
            } catch (error) {
                console.error('Google auth error:', error);
                showError(getErrorMessage(error));
            }
        });
}

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
});

async function createUserProfile(user, additionalData = {}) {
    try {
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            username: additionalData.username || user.displayName || user.email.split('@')[0],
            photoURL: user.photoURL || null,
            createdAt: new Date(),
            lastLogin: new Date()
        }, { merge: true });
    } catch (error) {
        console.error('Error creating profile:', error);
        throw error;
    }
}

async function updateUserLastLogin(uid) {
    try {
        await setDoc(doc(db, 'users', uid), {
            lastLogin: new Date()
        }, { merge: true });
    } catch (error) {
        console.error('Error updating last login:', error);
    }
}

function handleAuthSuccess(user) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        username: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL
    }));
    window.location.href = 'index.html';
}

function validateSignup(email, password, confirmPassword, username, terms) {
    if (!username) {
        showError('Username is required');
        return false;
    }
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return false;
    }
    if (!terms) {
        showError('Please accept the terms and conditions');
        return false;
    }
    return true;
}

function showError(message) {
    const errorDiv = document.querySelector('.error-message') || createErrorElement();
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function createErrorElement() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    const form = document.querySelector('form');
    form.insertBefore(errorDiv, form.firstChild);
    return errorDiv;
}

function getErrorMessage(error) {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'Email already registered';
        case 'auth/invalid-email':
            return 'Invalid email format';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters';
        case 'auth/user-not-found':
            return 'User not found';
        case 'auth/wrong-password':
            return 'Invalid password';
        case 'auth/popup-closed-by-user':
            return 'Login cancelled. Please try again.';
        case 'auth/popup-blocked':
            return 'Popup blocked. Please allow popups for this site.';
        case 'auth/unauthorized-domain':
            return 'This domain is not authorized for Google login.';
        default:
            return error.message;
    }
}