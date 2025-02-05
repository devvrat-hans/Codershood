document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const timeframeSelect = document.getElementById('timeframe');
    const categorySelect = document.getElementById('category');

    // Event listeners for filters
    searchInput.addEventListener('input', filterLeaderboard);
    timeframeSelect.addEventListener('change', filterLeaderboard);
    categorySelect.addEventListener('change', filterLeaderboard);

    function filterLeaderboard() {
        // Implement filtering logic
        const searchTerm = searchInput.value.toLowerCase();
        const timeframe = timeframeSelect.value;
        const category = categorySelect.value;

        // Filter users based on criteria
        // Update table with filtered results
    }

    // Sort table columns
    document.querySelectorAll('th').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.cellIndex;
            sortTable(column);
        });
    });

    function sortTable(column) {
        // Implement sorting logic
    }

    // Pagination
    const pageButtons = document.querySelectorAll('.page-numbers a');
    pageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Update active page
            pageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Load data for selected page
        });
    });
});