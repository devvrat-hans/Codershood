const checkAuth = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn;
};

const showAuthModal = () => {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn"><i class="fas fa-times"></i></button>
            <h2>Sign In Required</h2>
            <p>Please sign in to access this feature</p>
            <div class="modal-buttons">
                <a href="login.html" class="btn primary-btn">Sign In</a>
                <button class="btn secondary-btn return-home">Return to Home</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close button handler
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        window.location.href = 'index.html';
    });

    // Return home button handler
    const returnHomeBtn = modal.querySelector('.return-home');
    returnHomeBtn.addEventListener('click', () => {
        modal.remove();
        window.location.href = 'index.html';
    });
};

// Add to protected pages (problems.html, forums.html, etc.)
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) {
        showAuthModal();
    }
});