document.addEventListener('DOMContentLoaded', () => {
    const orderItemsEl = document.getElementById('orderItems');
    const subtotalEl = document.getElementById('subtotal');
    const deliveryFeeEl = document.getElementById('deliveryFee');
    const extraDeliveryFeeEl = document.getElementById('extraDeliveryFee');
    const extraDeliveryRow = document.getElementById('extraDeliveryRow');
    const restaurantMixNote = document.getElementById('restaurantMixNote');
    const totalEl = document.getElementById('total');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const checkoutMessage = document.getElementById('checkoutMessage');

    const nameInput = document.getElementById('customerName');
    const addressInput = document.getElementById('customerAddress');
    const phoneInput = document.getElementById('customerPhone');

    const BASE_DELIVERY_FEE = 5.00;
    const EXTRA_DELIVERY_STEP = 2.50;

    function formatCurrency(v) {
        return '$' + v.toFixed(2);
    }

    function loadCart() {
        try {
            const raw = localStorage.getItem('cart');
            if (!raw) return [];
            return JSON.parse(raw);
        } catch (e) {
            return [];
        }
    }

    function getUniqueRestaurantCount(cart) {
        const restaurantKeys = new Set();

        (Array.isArray(cart) ? cart : []).forEach((item) => {
            const restaurantId = Number(item && item.restaurantId ? item.restaurantId : 0);
            if (Number.isFinite(restaurantId) && restaurantId > 0) {
                restaurantKeys.add(`id:${restaurantId}`);
                return;
            }

            const restaurantName = String(item && item.restaurantName ? item.restaurantName : '').trim();
            if (restaurantName) {
                restaurantKeys.add(`name:${restaurantName.toLowerCase()}`);
            }
        });

        return restaurantKeys.size;
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
            return `Restaurant #${restaurantId}`;
        }

        return 'Restaurant';
    }

    function groupCartItemsByRestaurant(cart) {
        const groups = new Map();

        (Array.isArray(cart) ? cart : []).forEach((item) => {
            const key = getRestaurantGroupKey(item);

            if (!groups.has(key)) {
                groups.set(key, {
                    label: getRestaurantGroupLabel(item),
                    items: []
                });
            }

            groups.get(key).items.push(item);
        });

        return Array.from(groups.values());
    }

    function calculateOrderTotals(cart) {
        const safeCart = Array.isArray(cart) ? cart : [];
        const subtotal = safeCart.reduce((sum, item) => sum + Number(item && item.price ? item.price : 0) * Number(item && item.qty ? item.qty : 1), 0);
        const uniqueRestaurants = getUniqueRestaurantCount(safeCart);
        const additionalRestaurants = Math.max(0, uniqueRestaurants - 1);
        const extraMultiRestaurantFee = EXTRA_DELIVERY_STEP * (additionalRestaurants * (additionalRestaurants + 1) / 2);
        const deliveryFee = BASE_DELIVERY_FEE;
        const total = subtotal + deliveryFee + extraMultiRestaurantFee;

        return {
            subtotal,
            deliveryFee,
            extraMultiRestaurantFee,
            total,
            uniqueRestaurants,
            additionalRestaurants
        };
    }

    function renderCart() {
        const cart = loadCart();
        orderItemsEl.innerHTML = '';

        if (!cart || cart.length === 0) {
            checkoutMessage.textContent = 'Your cart is empty. Add items before placing an order.';
            placeOrderBtn.disabled = true;
            subtotalEl.textContent = formatCurrency(0);
            deliveryFeeEl.textContent = formatCurrency(0);
            if (extraDeliveryFeeEl) {
                extraDeliveryFeeEl.textContent = formatCurrency(0);
            }
            if (extraDeliveryRow) {
                extraDeliveryRow.hidden = true;
            }
            if (restaurantMixNote) {
                restaurantMixNote.textContent = '';
            }
            totalEl.textContent = formatCurrency(0);
            return;
        }

        checkoutMessage.textContent = '';
        placeOrderBtn.disabled = false;

        const groupedItems = groupCartItemsByRestaurant(cart);

        groupedItems.forEach((group) => {
            const section = document.createElement('section');
            section.className = 'checkout-restaurant-group';

            const heading = document.createElement('h3');
            heading.className = 'checkout-restaurant-heading';
            heading.textContent = group.label;
            section.appendChild(heading);

            group.items.forEach((item) => {
                const lineTotal = (item.price || 0) * (item.qty || 1);

                const card = document.createElement('div');
                card.className = 'checkout-item-card';

                const top = document.createElement('div');
                top.className = 'checkout-item-topline';

                const title = document.createElement('h4');
                title.textContent = item.name || 'Unnamed item';
                top.appendChild(title);

                const qty = document.createElement('div');
                qty.className = 'checkout-item-qty';
                qty.textContent = `x${item.qty || 1}`;
                top.appendChild(qty);

                const desc = document.createElement('p');
                desc.className = 'checkout-item-description';
                desc.textContent = `${formatCurrency(item.price || 0)} each — ${formatCurrency(lineTotal)}`;

                card.appendChild(top);
                card.appendChild(desc);
                section.appendChild(card);
            });

            orderItemsEl.appendChild(section);
        });

        const totals = calculateOrderTotals(cart);

        subtotalEl.textContent = formatCurrency(totals.subtotal);
        deliveryFeeEl.textContent = formatCurrency(totals.deliveryFee);
        if (extraDeliveryFeeEl) {
            extraDeliveryFeeEl.textContent = formatCurrency(totals.extraMultiRestaurantFee);
        }
        if (extraDeliveryRow) {
            extraDeliveryRow.hidden = totals.additionalRestaurants === 0;
        }
        if (restaurantMixNote) {
            restaurantMixNote.textContent = totals.additionalRestaurants > 0
                ? `Extra multi-restaurant fee scales with each added restaurant (${totals.additionalRestaurants} additional).`
                : 'Ordering from one restaurant only, so no extra multi-restaurant fee applies.';
        }
        totalEl.textContent = formatCurrency(totals.total);
    }

    function generateOrderRef() {
        const t = Date.now().toString(36).toUpperCase();
        const r = Math.floor(Math.random() * 900 + 100).toString();
        return `ORD-${t}-${r}`;
    }

    placeOrderBtn.addEventListener('click', () => {
        const cart = loadCart();
        if (!cart || cart.length === 0) {
            checkoutMessage.textContent = 'Cannot place order: cart is empty.';
            return;
        }

        const name = nameInput.value.trim();
        const address = addressInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!name || !address || !phone) {
            checkoutMessage.textContent = 'Please fill name, address and contact phone.';
            return;
        }

        placeOrderBtn.disabled = true;
        placeOrderBtn.textContent = 'Placing order...';

        // Create order object (mock save to localStorage)
        const totals = calculateOrderTotals(cart);
        const ref = generateOrderRef();

        const order = {
            ref,
            items: cart,
            subtotal: totals.subtotal,
            deliveryFee: totals.deliveryFee,
            extraMultiRestaurantFee: totals.extraMultiRestaurantFee,
            total: totals.total,
            delivery: { name, address, phone },
            createdAt: new Date().toISOString()
        };

        try {
            const raw = localStorage.getItem('orders');
            const orders = raw ? JSON.parse(raw) : [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            localStorage.removeItem('cart');
            localStorage.setItem('lastOrderRef', ref);
            localStorage.setItem('lastOrder', JSON.stringify(order));

            // Redirect to success page
            window.location.href = 'place_order_success.html';
        } catch (e) {
            checkoutMessage.textContent = 'Failed to save order locally.';
            placeOrderBtn.disabled = false;
            placeOrderBtn.textContent = 'Place order';
        }
    });

    renderCart();
});
