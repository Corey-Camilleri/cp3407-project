document.addEventListener('DOMContentLoaded', () => {
    const orderItemsEl = document.getElementById('orderItems');
    const subtotalEl = document.getElementById('subtotal');
    const deliveryFeeEl = document.getElementById('deliveryFee');
    const totalEl = document.getElementById('total');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const checkoutMessage = document.getElementById('checkoutMessage');

    const nameInput = document.getElementById('customerName');
    const addressInput = document.getElementById('customerAddress');
    const phoneInput = document.getElementById('customerPhone');

    const DELIVERY_FEE = 5.00;

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

    function renderCart() {
        const cart = loadCart();
        orderItemsEl.innerHTML = '';

        if (!cart || cart.length === 0) {
            checkoutMessage.textContent = 'Your cart is empty. Add items before placing an order.';
            placeOrderBtn.disabled = true;
            subtotalEl.textContent = formatCurrency(0);
            deliveryFeeEl.textContent = formatCurrency(0);
            totalEl.textContent = formatCurrency(0);
            return;
        }

        checkoutMessage.textContent = '';
        placeOrderBtn.disabled = false;

        let subtotal = 0;

        cart.forEach(item => {
            const lineTotal = (item.price || 0) * (item.qty || 1);
            subtotal += lineTotal;

            const card = document.createElement('div');
            card.className = 'restaurant-card';

            const top = document.createElement('div');
            top.className = 'card-topline';

            const title = document.createElement('h3');
            title.textContent = item.name || 'Unnamed item';
            top.appendChild(title);

            const qty = document.createElement('div');
            qty.className = 'restaurant-id';
            qty.textContent = `x${item.qty || 1}`;
            top.appendChild(qty);

            const desc = document.createElement('p');
            desc.className = 'description';
            desc.textContent = `${formatCurrency(item.price || 0)} each — ${formatCurrency(lineTotal)}`;

            card.appendChild(top);
            card.appendChild(desc);

            orderItemsEl.appendChild(card);
        });

        subtotalEl.textContent = formatCurrency(subtotal);
        deliveryFeeEl.textContent = formatCurrency(DELIVERY_FEE);
        totalEl.textContent = formatCurrency(subtotal + DELIVERY_FEE);
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
        const subtotal = cart.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);
        const total = subtotal + DELIVERY_FEE;
        const ref = generateOrderRef();

        const order = {
            ref,
            items: cart,
            subtotal,
            deliveryFee: DELIVERY_FEE,
            total,
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
