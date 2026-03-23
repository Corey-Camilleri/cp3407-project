(function () {
    let backdrop;
    let panel;
    let imageEl;
    let nameEl;
    let descEl;
    let priceEl;
    let addToCartButton;
    let addToCartStatus;
    let currentItem = null;

    function ensureOverlay() {
        if (backdrop && panel) {
            return;
        }

        backdrop = document.createElement('div');
        backdrop.className = 'customer-item-overlay-backdrop';
        backdrop.hidden = true;

        panel = document.createElement('section');
        panel.className = 'customer-item-overlay';
        panel.hidden = true;
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        panel.setAttribute('aria-label', 'Menu item details');

        const card = document.createElement('article');
        card.className = 'customer-item-overlay-card';

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'customer-item-overlay-close';
        closeButton.setAttribute('aria-label', 'Close item details');
        closeButton.textContent = '✕';

        imageEl = document.createElement('img');
        imageEl.className = 'customer-item-overlay-image';
        imageEl.alt = 'Menu item image';

        const body = document.createElement('div');
        body.className = 'customer-item-overlay-body';

        nameEl = document.createElement('h2');
        nameEl.className = 'customer-item-overlay-name';

        descEl = document.createElement('p');
        descEl.className = 'customer-item-overlay-description';

        priceEl = document.createElement('p');
        priceEl.className = 'customer-item-overlay-price';

        addToCartButton = document.createElement('button');
        addToCartButton.type = 'button';
        addToCartButton.className = 'customer-item-overlay-add';
        addToCartButton.textContent = 'Add to cart';

        addToCartStatus = document.createElement('p');
        addToCartStatus.className = 'customer-item-overlay-status';
        addToCartStatus.setAttribute('aria-live', 'polite');

        body.appendChild(nameEl);
        body.appendChild(descEl);
        body.appendChild(priceEl);
        body.appendChild(addToCartButton);
        body.appendChild(addToCartStatus);

        card.appendChild(closeButton);
        card.appendChild(imageEl);
        card.appendChild(body);

        panel.appendChild(card);
        document.body.appendChild(backdrop);
        document.body.appendChild(panel);

        closeButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            close();
        });

        addToCartButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (!currentItem) {
                return;
            }

            const cart = loadCart();
            const itemId = Number(currentItem.id || 0);
            const safeName = currentItem.name ? String(currentItem.name) : 'Menu item';
            const safePrice = Number(currentItem.price || 0);
            const existingIndex = cart.findIndex((entry) => {
                const sameId = itemId > 0 && Number(entry && entry.id ? entry.id : 0) === itemId;
                const sameFallback = String(entry && entry.name ? entry.name : '') === safeName
                    && Number(entry && entry.price ? entry.price : 0) === safePrice;
                return sameId || sameFallback;
            });

            if (existingIndex >= 0) {
                const currentQty = Number(cart[existingIndex].qty || 0);
                cart[existingIndex].qty = currentQty > 0 ? currentQty + 1 : 1;
            } else {
                cart.push({
                    id: itemId > 0 ? itemId : undefined,
                    name: safeName,
                    price: safePrice,
                    qty: 1
                });
            }

            saveCart(cart);
            window.dispatchEvent(new CustomEvent('cart:updated'));
            addToCartStatus.textContent = 'Added to cart.';
        });

        panel.addEventListener('click', (event) => {
            if (event.target === panel) {
                close();
                return;
            }

            event.stopPropagation();
        });

        backdrop.addEventListener('click', (event) => {
            if (event.target !== backdrop) {
                return;
            }
            close();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') {
                return;
            }

            if (panel && !panel.hidden) {
                close();
            }
        });
    }

    function formatPrice(value) {
        const numeric = Number(value);
        return Number.isFinite(numeric) ? `$${numeric.toFixed(2)}` : '$0.00';
    }

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

    function open(item) {
        ensureOverlay();
        currentItem = item || null;

        const safeName = item && item.name ? item.name : 'Menu item';
        const safeDescription = item && item.description ? item.description : 'No description provided.';
        const safeImage = item && item.imageUrl ? item.imageUrl : 'https://via.placeholder.com/900x520?text=Menu+Item';

        nameEl.textContent = safeName;
        descEl.textContent = safeDescription;
        priceEl.textContent = formatPrice(item && item.price);
        addToCartStatus.textContent = '';
        imageEl.src = safeImage;
        imageEl.alt = `${safeName} image`;

        backdrop.hidden = false;
        panel.hidden = false;
        document.body.classList.add('customer-item-overlay-open');
    }

    function close() {
        if (!backdrop || !panel) {
            return;
        }

        currentItem = null;

        backdrop.hidden = true;
        panel.hidden = true;
        document.body.classList.remove('customer-item-overlay-open');
    }

    window.CustomerMenuItemOverlay = {
        open,
        close
    };
})();
