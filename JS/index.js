// Add this code
document.addEventListener('DOMContentLoaded', () => {
    loadUpcomingContests();
    loadTopPerformers();
    loadLatestPosts();
});

async function loadUpcomingContests() {
    const contestsContainer = document.querySelector('.contest-cards');
    // Fetch and display upcoming contests
    // Add loading animation while fetching
}

async function loadTopPerformers() {
    const performersContainer = document.querySelector('.performer-cards');
    // Fetch and display top performers
    // Add loading animation while fetching
}

async function loadLatestPosts() {
    try {
        const blogRef = collection(db, 'blogs');
        const q = query(blogRef, orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        
        const blogGrid = document.querySelector('.blog-grid');
        blogGrid.innerHTML = '';
        
        querySnapshot.forEach(doc => {
            const post = doc.data();
            const blogCard = createBlogCard(post);
            blogGrid.appendChild(blogCard);
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

function createBlogCard(post) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.innerHTML = `
        <div class="blog-image">
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-category">${post.category}</div>
        </div>
        <div class="blog-content">
            <h3><a href="blog/${post.slug}.html">${post.title}</a></h3>
            <p>${post.excerpt}</p>
            <div class="blog-meta">
                <span><i class="far fa-clock"></i> ${post.readTime} min read</span>
                <span><i class="far fa-calendar"></i> ${formatDate(post.createdAt)}</span>
            </div>
        </div>
    `;
    return article;
}