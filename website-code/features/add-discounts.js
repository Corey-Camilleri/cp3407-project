document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('discountForm');
    const nameInput = document.getElementById('discountName');
    const percentInput = document.getElementById('discountPercent');
    const listEl = document.getElementById('discountList');

    function loadDiscounts() {
        return JSON.parse(localStorage.getItem('discounts') || '[]');
    }

    function saveDiscounts(discounts) {
        localStorage.setItem('discounts', JSON.stringify(discounts));
    }

    function renderDiscounts() {
        const discounts = loadDiscounts();
        listEl.innerHTML = '';
        if (!discounts.length) {
            listEl.textContent = 'No discounts yet. Add one above.';
            return;
        }

        discounts.forEach((d, i) => {
            const div = document.createElement('div');
            div.className = 'discount-item';
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';

            const span = document.createElement('span');
            span.textContent = `${d.name}: ${d.percent}%`;

            const btn = document.createElement('button');
            btn.textContent = 'Remove';
            btn.addEventListener('click', () => {
                const newList = loadDiscounts().filter((_, idx) => idx !== i);
                saveDiscounts(newList);
                renderDiscounts();
            });

            div.appendChild(span);
            div.appendChild(btn);
            listEl.appendChild(div);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const percent = parseFloat(percentInput.value);
        if (!name || isNaN(percent)) return;

        const discounts = loadDiscounts();
        discounts.push({ name, percent });
        saveDiscounts(discounts);
        renderDiscounts();
        form.reset();
    });

    renderDiscounts();
});