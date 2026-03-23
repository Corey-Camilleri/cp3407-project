(function () {
    let restaurantLabelById = new Map();

    function loadCart() {
        try {
            const raw = localStorage.getItem('cart');
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function totalItems(cart) {
        return cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
    }

    function totalPrice(cart) {
        return cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
    }

    function uniqueRestaurantCount(cart) {
        const ids = new Set();
        cart.forEach((item) => {
            const restaurantId = Number(item && item.restaurantId ? item.restaurantId : 0);
            if (Number.isFinite(restaurantId) && restaurantId > 0) {
                ids.add(restaurantId);
            }
        });

        return ids.size;
    }

    function getRestaurantGroupKey(item) {
        const restaurantId = Number(item && item.restaurantId ? item.restaurantId : 0);
        const restaurantName = String(item && item.restaurantName ? item.restaurantName : '').trim();

        if (restaurantId > 0) {
            return `id:${restaurantId}`;
        }

        if (restaurantName) {
            return `name:${restaurantName.toLowerCase()}`;
        }

        return 'unknown';
    }

    function getRestaurantGroupLabel(item) {
        const restaurantName = String(item && item.restaurantName ? item.restaurantName : '').trim();
        if (restaurantName) {
            return restaurantName;
        }

        const restaurantId = Number(item && item.restaurantId ? item.restaurantId : 0);
        if (restaurantId > 0) {
            return restaurantLabelById.get(restaurantId) || `Restaurant #${restaurantId}`;
        }

        return 'Restaurant';
    }

    function groupCartItems(cart) {
        const grouped = new Map();

        cart.forEach((item, index) => {
            const key = getRestaurantGroupKey(item);
            if (!grouped.has(key)) {
                grouped.set(key, {
                    label: getRestaurantGroupLabel(item),
                    rows: []
                });
            }

            grouped.get(key).rows.push({ item, index });
        });

        return Array.from(grouped.values());
    }

    async function loadRestaurantLabels() {
        try {
            const response = await fetch('/api/restaurants');
            if (!response.ok) {
                return;
            }

            const restaurants = await response.json();
            if (!Array.isArray(restaurants)) {
                return;
            }

            const nameCounts = new Map();
            restaurants.forEach((restaurant) => {
                const name = String(restaurant && restaurant.name ? restaurant.name : '').trim();
                if (!name) {
                    return;
                }

                const key = name.toLowerCase();
                nameCounts.set(key, Number(nameCounts.get(key) || 0) + 1);
            });

            const nextMap = new Map();
            restaurants.forEach((restaurant) => {
                const id = Number(restaurant && restaurant.id ? restaurant.id : 0);
                if (id <= 0) {
                    return;
                }

                const name = String(restaurant && restaurant.name ? restaurant.name : '').trim() || `Restaurant #${id}`;
                const duplicateCount = Number(nameCounts.get(name.toLowerCase()) || 0);
                const location = String(
                    restaurant.location
                    || restaurant.address
                    || restaurant.suburb
                    || restaurant.city
                    || ''
                ).trim();

                if (duplicateCount > 1) {
                    nextMap.set(id, `${name} — ${location || `Branch #${id}`}`);
                } else {
                    nextMap.set(id, name);
                }
            });

            restaurantLabelById = nextMap;
        } catch (error) {
            restaurantLabelById = new Map();
        }
    }

    function ensureNav() {
        let nav = document.querySelector('.topnav');

        if (nav) {
            return nav;
        }

        const shell = document.querySelector('.page-shell') || document.body;
        const topbar = document.createElement('header');
        topbar.className = 'topbar cart-auto-topbar';

        const navWrap = document.createElement('nav');
        navWrap.className = 'topnav cart-auto-nav';
        navWrap.setAttribute('aria-label', 'Primary navigation');

        const homeLink = document.createElement('a');
        homeLink.href = '/index.html';
        homeLink.textContent = 'Home';
        navWrap.appendChild(homeLink);

        topbar.appendChild(navWrap);

        if (shell.firstChild) {
            shell.insertBefore(topbar, shell.firstChild);
        } else {
            shell.appendChild(topbar);
        }

        return navWrap;
    }

    function buildOverlay() {
        const backdrop = document.createElement('div');
        backdrop.className = 'cart-overlay-backdrop';
        backdrop.setAttribute('hidden', 'hidden');

        const panel = document.createElement('aside');
        panel.className = 'cart-overlay-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        panel.setAttribute('aria-label', 'Shopping cart');

        panel.innerHTML = `
            <div class="cart-overlay-header">
                <h2>Your Cart</h2>
                <button type="button" class="cart-overlay-close" aria-label="Close cart">✕</button>
            </div>
            <div class="cart-overlay-body">
                <p class="cart-overlay-empty">Your cart is empty.</p>
                <div class="cart-overlay-list"></div>
            </div>
            <div class="cart-overlay-footer">
                <div class="cart-overlay-summary">
                    <strong class="cart-overlay-total">Total: $0.00</strong>
                    <p class="cart-overlay-meta"></p>
                </div>
                <a href="/place_order.html" class="cart-overlay-checkout">Checkout</a>
            </div>
        `;

        document.body.appendChild(backdrop);
        document.body.appendChild(panel);

        return {
            backdrop,
            panel,
            closeButton: panel.querySelector('.cart-overlay-close'),
            emptyMessage: panel.querySelector('.cart-overlay-empty'),
            list: panel.querySelector('.cart-overlay-list'),
            total: panel.querySelector('.cart-overlay-total'),
            meta: panel.querySelector('.cart-overlay-meta')
        };
    }

    function renderOverlay(state) {
        const cart = loadCart();
        state.list.innerHTML = '';

        if (cart.length === 0) {
            state.emptyMessage.style.display = 'block';
        } else {
            state.emptyMessage.style.display = 'none';
        }

        const groups = groupCartItems(cart);

        groups.forEach((group) => {
            const section = document.createElement('section');
            section.className = 'cart-overlay-group';

            const heading = document.createElement('h3');
            heading.className = 'cart-overlay-group-title';
            heading.textContent = group.label;
            section.appendChild(heading);

            const groupedList = document.createElement('div');
            groupedList.className = 'cart-overlay-group-list';

            group.rows.forEach((rowEntry) => {
                const row = document.createElement('div');
                row.className = 'cart-overlay-item';

                const item = rowEntry.item;
                const index = rowEntry.index;
                const name = item && item.name ? item.name : `Item ${index + 1}`;
                const qty = Number(item && item.qty ? item.qty : 1);
                const price = Number(item && item.price ? item.price : 0);
                const lineTotal = price * qty;

                row.innerHTML = `
                    <div class="cart-overlay-item-main">
                        <strong class="cart-overlay-item-name">${name}</strong>
                        <span class="cart-overlay-item-unit">$${price.toFixed(2)} each</span>
                    </div>
                    <div class="cart-overlay-item-side">
                        <strong class="cart-overlay-line-total">$${lineTotal.toFixed(2)}</strong>
                        <div class="cart-overlay-item-actions">
                            <button type="button" data-action="decrease" data-index="${index}" aria-label="Decrease quantity">−</button>
                            <span class="cart-overlay-qty">${qty}</span>
                            <button type="button" data-action="increase" data-index="${index}" aria-label="Increase quantity">+</button>
                            <button type="button" data-action="remove" data-index="${index}" aria-label="Remove item">✕</button>
                        </div>
                    </div>
                `;

                groupedList.appendChild(row);
            });

            section.appendChild(groupedList);
            state.list.appendChild(section);
        });

        const itemCount = totalItems(cart);
        const restaurantCount = uniqueRestaurantCount(cart);

        state.total.textContent = `Total: $${totalPrice(cart).toFixed(2)}`;
        state.meta.textContent = itemCount > 0
            ? `${itemCount} item${itemCount === 1 ? '' : 's'}${restaurantCount > 0 ? ` • ${restaurantCount} restaurant${restaurantCount === 1 ? '' : 's'}` : ''}`
            : '';
    }

    function updateBadge(button) {
        const badge = button.querySelector('.cart-badge');
        if (!badge) {
            return;
        }

        const count = totalItems(loadCart());
        badge.textContent = String(count);
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    function setOverlayOpen(state, isOpen) {
        if (isOpen) {
            state.backdrop.removeAttribute('hidden');
            state.panel.classList.add('is-open');
            renderOverlay(state);
            document.body.classList.add('cart-overlay-open');
            return;
        }

        state.backdrop.setAttribute('hidden', 'hidden');
        state.panel.classList.remove('is-open');
        document.body.classList.remove('cart-overlay-open');
    }

    function boot() {
        const nav = ensureNav();
        const iconButton = document.createElement('button');
        iconButton.type = 'button';
        iconButton.className = 'cart-icon-button';
        iconButton.setAttribute('aria-label', 'Open cart');
        iconButton.innerHTML = '<span class="cart-icon-glyph">🛒</span><span class="cart-icon-label">Cart</span><span class="cart-badge">0</span>';
        nav.appendChild(iconButton);

        const state = buildOverlay();
        updateBadge(iconButton);

        loadRestaurantLabels().then(() => {
            if (state.panel.classList.contains('is-open')) {
                renderOverlay(state);
            }
        });

        iconButton.addEventListener('click', () => {
            const open = !state.panel.classList.contains('is-open');
            setOverlayOpen(state, open);
        });

        state.closeButton.addEventListener('click', () => setOverlayOpen(state, false));
        state.backdrop.addEventListener('click', () => setOverlayOpen(state, false));

        state.list.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-action]');
            if (!button) {
                return;
            }

            const index = Number(button.dataset.index);
            const action = button.dataset.action;
            const cart = loadCart();

            if (!Number.isInteger(index) || !cart[index]) {
                return;
            }

            if (action === 'increase') {
                cart[index].qty = Number(cart[index].qty || 0) + 1;
            }

            if (action === 'decrease') {
                cart[index].qty = Number(cart[index].qty || 0) - 1;
                if (cart[index].qty <= 0) {
                    cart.splice(index, 1);
                }
            }

            if (action === 'remove') {
                cart.splice(index, 1);
            }

            saveCart(cart);
            renderOverlay(state);
            updateBadge(iconButton);
        });

        window.addEventListener('storage', () => {
            updateBadge(iconButton);
            if (state.panel.classList.contains('is-open')) {
                renderOverlay(state);
            }
        });

        window.addEventListener('focus', () => {
            updateBadge(iconButton);
            if (state.panel.classList.contains('is-open')) {
                renderOverlay(state);
            }
        });

        window.addEventListener('cart:updated', () => {
            updateBadge(iconButton);
            if (state.panel.classList.contains('is-open')) {
                renderOverlay(state);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
