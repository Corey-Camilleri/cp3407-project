(function () {
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
                <strong class="cart-overlay-total">Total: $0.00</strong>
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
            total: panel.querySelector('.cart-overlay-total')
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

        cart.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'cart-overlay-item';

            const name = item && item.name ? item.name : `Item ${index + 1}`;
            const qty = Number(item && item.qty ? item.qty : 1);
            const price = Number(item && item.price ? item.price : 0);

            row.innerHTML = `
                <div class="cart-overlay-item-main">
                    <strong>${name}</strong>
                    <span>$${price.toFixed(2)} each</span>
                </div>
                <div class="cart-overlay-item-actions">
                    <button type="button" data-action="decrease" data-index="${index}">−</button>
                    <span>${qty}</span>
                    <button type="button" data-action="increase" data-index="${index}">+</button>
                    <button type="button" data-action="remove" data-index="${index}">✕</button>
                </div>
            `;

            state.list.appendChild(row);
        });

        state.total.textContent = `Total: $${totalPrice(cart).toFixed(2)}`;
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
