document.addEventListener('DOMContentLoaded', () => {
    const menuListEl = document.getElementById('menuList');
    const menuForm = document.getElementById('menuForm');
    const itemNameInput = document.getElementById('itemName');
    const itemPriceInput = document.getElementById('itemPrice');

    // Load existing menu from localStorage
    function loadMenu() {
        try {
            const raw = localStorage.getItem('menuItems');
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    // Render the menu list
    function renderMenu() {
        const menu = loadMenu();
        menuListEl.innerHTML = '';

        if (!menu || menu.length === 0) {
            const msg = document.createElement('p');
            msg.textContent = 'No menu items yet. Add one above.';
            menuListEl.appendChild(msg);
            return;
        }

        menu.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.style.border = '1px solid #ccc';
            card.style.borderRadius = '6px';
            card.style.padding = '8px';
            card.style.marginBottom = '6px';
            card.style.display = 'flex';
            card.style.justifyContent = 'space-between';
            card.style.alignItems = 'center';

            const left = document.createElement('div');
            left.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            // Optional: remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.style.background = '#c33';
            removeBtn.style.color = '#fff';
            removeBtn.style.border = 'none';
            removeBtn.style.borderRadius = '4px';
            removeBtn.style.padding = '2px 6px';
            removeBtn.style.cursor = 'pointer';
            removeBtn.addEventListener('click', () => {
                menu.splice(index, 1);
                localStorage.setItem('menuItems', JSON.stringify(menu));
                renderMenu();
            });

            card.appendChild(left);
            card.appendChild(removeBtn);

            menuListEl.appendChild(card);
        });
    }

    // Handle form submission
    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = itemNameInput.value.trim();
        const price = parseFloat(itemPriceInput.value);

        if (!name || !price) {
            alert('Please fill in all fields with valid values.');
            return;
        }

        const menu = loadMenu();
        menu.push({ name, price });
        localStorage.setItem('menuItems', JSON.stringify(menu));

        // Update list immediately
        renderMenu();

        menuForm.reset();
    });

    // Initial render
    renderMenu();
});