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

    // Google Sign In
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            try {
                const provider = new GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                const result = await signInWithPopup(auth, provider);
                
                // Create/Update user profile
                await createUserProfile(result.user);
                
                // Redirect after success
                window.location.href = '/index.html';
            } catch (error) {
                console.error('Google auth error:', error);
                showError(error.message);
            }
        });
    }

    // Regular Email Sign In
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const result = await signInWithEmailAndPassword(auth, email, password);
                await updateUserLastLogin(result.user.uid);
                window.location.href = '/index.html';
            } catch (error) {
                showError(error.message);
            }
        });
    }
});

async function createUserProfile(user) {
    await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date(),
        createdAt: new Date()
    }, { merge: true });
}

function showError(message) {
    const errorDiv = document.querySelector('.error-message') || createErrorElement();
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function createErrorElement() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    document.querySelector('form').prepend(errorDiv);
    return errorDiv;
}