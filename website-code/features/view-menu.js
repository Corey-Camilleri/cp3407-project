document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menuContainer');

    function loadMenu() {
        try {
            const raw = localStorage.getItem('menuItems');
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function renderMenu() {
        const menu = loadMenu();
        menuContainer.innerHTML = '';

        if (!menu || menu.length === 0) {
            const msg = document.createElement('p');
            msg.textContent = 'No menu items available yet.';
            menuContainer.appendChild(msg);
            return;
        }

        menu.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card';

            const left = document.createElement('div');
            left.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            // Optional: remove button (for admin view)
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                menu.splice(index, 1);
                localStorage.setItem('menuItems', JSON.stringify(menu));
                renderMenu();
            });

            card.appendChild(left);
            card.appendChild(removeBtn);

            menuContainer.appendChild(card);
        });
    }

    // Initial render
    renderMenu();

    // Optional: Listen to storage events (if user updates menu in another tab)
    window.addEventListener('storage', renderMenu);
});