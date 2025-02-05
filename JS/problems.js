document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchInput = document.querySelector('.search-bar input');
    const difficultyFilter = document.getElementById('difficulty');
    const categoryFilter = document.getElementById('category');
    const problemsTable = document.querySelector('.problems-table tbody');
    const pagination = document.querySelector('.pagination');

    // State Management
    let currentPage = 1;
    let problemsPerPage = 10;
    let problems = [
        {
            id: 1,
            title: 'Two Sum',
            difficulty: 'easy',
            acceptance: '75%',
            tags: ['Arrays', 'Hash Table'],
            solved: true,
            category: 'arrays'
        },
        // Add more problem objects here
    ];

    // Filter Problems
    function filterProblems() {
        let filtered = [...problems];
        
        // Search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(problem => 
                problem.title.toLowerCase().includes(searchTerm)
            );
        }

        // Difficulty filter
        const difficulty = difficultyFilter.value;
        if (difficulty) {
            filtered = filtered.filter(problem => 
                problem.difficulty === difficulty
            );
        }

        // Category filter
        const category = categoryFilter.value;
        if (category) {
            filtered = filtered.filter(problem => 
                problem.category === category
            );
        }

        return filtered;
    }

    // Render Problems Table
    function renderProblems(problemsList) {
        const start = (currentPage - 1) * problemsPerPage;
        const end = start + problemsPerPage;
        const paginatedProblems = problemsList.slice(start, end);

        problemsTable.innerHTML = paginatedProblems.map(problem => `
            <tr>
                <td>
                    <i class="fas ${problem.solved ? 'fa-check-circle solved' : 'fa-circle'}"></i>
                </td>
                <td><a href="problem.html?id=${problem.id}">${problem.title}</a></td>
                <td>
                    <span class="difficulty ${problem.difficulty}">${
                        problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)
                    }</span>
                </td>
                <td>${problem.acceptance}</td>
                <td>${problem.tags.map(tag => 
                    `<span class="tag">${tag}</span>`
                ).join('')}</td>
            </tr>
        `).join('');

        renderPagination(problemsList.length);
    }

    // Render Pagination
    function renderPagination(totalProblems) {
        const totalPages = Math.ceil(totalProblems / problemsPerPage);
        const pageNumbers = document.querySelector('.page-numbers');
        
        let paginationHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                paginationHTML += `<a href="#" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                paginationHTML += '<span>...</span>';
            }
        }
        
        pageNumbers.innerHTML = paginationHTML;
    }

    // Event Listeners
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        renderProblems(filterProblems());
    });

    difficultyFilter.addEventListener('change', () => {
        currentPage = 1;
        renderProblems(filterProblems());
    });

    categoryFilter.addEventListener('change', () => {
        currentPage = 1;
        renderProblems(filterProblems());
    });

    pagination.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            currentPage = parseInt(e.target.textContent);
            renderProblems(filterProblems());
        }
    });

    // Initial render
    renderProblems(problems);
});