document.addEventListener('DOMContentLoaded', () => {
    const hoursForm = document.getElementById('hoursForm');
    const dayInput = document.getElementById('day');
    const openTimeInput = document.getElementById('openTime');
    const closeTimeInput = document.getElementById('closeTime');
    const hoursListEl = document.getElementById('hoursList');

    function loadHours() {
        return JSON.parse(localStorage.getItem('openingHours')) || [];
    }

    function saveHours(hours) {
        localStorage.setItem('openingHours', JSON.stringify(hours));
    }

    function renderHours() {
        const hours = loadHours();
        hoursListEl.innerHTML = '';

        if (hours.length === 0) {
            hoursListEl.textContent = 'No opening hours set.';
            return;
        }

        hours.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'hours-item';

            div.textContent = `${item.day}: ${item.open} - ${item.close}`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                hours.splice(index, 1);
                saveHours(hours);
                renderHours();
            });

            div.appendChild(removeBtn);
            hoursListEl.appendChild(div);
        });
    }

    hoursForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const day = dayInput.value.trim();
        const open = openTimeInput.value;
        const close = closeTimeInput.value;

        if (!day || !open || !close) {
            alert('Please fill in all fields.');
            return;
        }

        let hours = loadHours();

        // If day already exists, update it
        const existing = hours.find(h => h.day.toLowerCase() === day.toLowerCase());
        if (existing) {
            existing.open = open;
            existing.close = close;
        } else {
            hours.push({ day, open, close });
        }

        saveHours(hours);
        renderHours();
        hoursForm.reset();
    });

    // Initial render
    renderHours();

    // Optional: live update in other tabs
    window.addEventListener('storage', (event) => {
        if (event.key === 'openingHours') renderHours();
    });
});