document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-bar input');
    const blogCards = document.querySelectorAll('.blog-card');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            filterPosts(category);
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchPosts(e.target.value);
    });

    function filterPosts(category) {
        blogCards.forEach(card => {
            const postCategory = card.querySelector('.blog-category').textContent.toLowerCase();
            if (category === 'all' || postCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function searchPosts(term) {
        const searchTerm = term.toLowerCase();
        blogCards.forEach(card => {
            const title = card.querySelector('h2, h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});