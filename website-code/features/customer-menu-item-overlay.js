(function () {
    let backdrop;
    let panel;
    let imageEl;
    let nameEl;
    let descEl;
    let priceEl;

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

        body.appendChild(nameEl);
        body.appendChild(descEl);
        body.appendChild(priceEl);

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

        panel.addEventListener('click', (event) => {
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

    function open(item) {
        ensureOverlay();

        const safeName = item && item.name ? item.name : 'Menu item';
        const safeDescription = item && item.description ? item.description : 'No description provided.';
        const safeImage = item && item.imageUrl ? item.imageUrl : 'https://via.placeholder.com/900x520?text=Menu+Item';

        nameEl.textContent = safeName;
        descEl.textContent = safeDescription;
        priceEl.textContent = formatPrice(item && item.price);
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

        backdrop.hidden = true;
        panel.hidden = true;
        document.body.classList.remove('customer-item-overlay-open');
    }

    window.CustomerMenuItemOverlay = {
        open,
        close
    };
})();
