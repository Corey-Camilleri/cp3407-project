document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('reviewForm');
    const reviewList = document.getElementById('reviewList');

    // Load reviews from localStorage
    function loadReviews() {
        return JSON.parse(localStorage.getItem('reviews')) || [];
    }

    // Save reviews
    function saveReviews(reviews) {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // Render reviews to page
    function renderReviews() {
        const reviews = loadReviews();

        reviewList.innerHTML = '';

        if (reviews.length === 0) {
            reviewList.innerHTML = "<p>No reviews yet.</p>";
            return;
        }

        reviews.forEach((review) => {
            const card = document.createElement('div');
            card.style.border = "1px solid #ccc";
            card.style.padding = "10px";
            card.style.marginTop = "10px";
            card.style.borderRadius = "6px";

            const name = document.createElement('h3');
            name.textContent = review.name;

            const rating = document.createElement('p');
            rating.textContent = "Rating: " + review.rating + "/5";

            const comment = document.createElement('p');
            comment.textContent = review.comment;

            card.appendChild(name);
            card.appendChild(rating);
            card.appendChild(comment);

            reviewList.appendChild(card);
        });
    }

    // Submit review
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('restaurantName').value.trim();
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value.trim();

        const reviews = loadReviews();

        reviews.push({
            name,
            rating,
            comment
        });

        saveReviews(reviews);

        form.reset();

        renderReviews(); // refresh UI immediately
    });

    // Initial render on page load
    renderReviews();
});