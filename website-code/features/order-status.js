document.addEventListener('DOMContentLoaded', () => {
    const searchRef = document.getElementById('searchRef');
    const lookupBtn = document.getElementById('lookupBtn');
    const statusMessage = document.getElementById('statusMessage');
    const orderCard = document.getElementById('orderCard');
    const orderRefEl = document.getElementById('orderRef');
    const orderRestaurant = document.getElementById('orderRestaurant');
    const orderTotal = document.getElementById('orderTotal');
    const orderItemsList = document.getElementById('orderItemsList');
    const timeline = document.getElementById('timeline');
    const advanceBtn = document.getElementById('advanceBtn');
    const simulateBtn = document.getElementById('simulateBtn');

    const STATUS_STEPS = ['Placed', 'Preparing', 'Ready', 'Out for delivery', 'Delivered'];
    let currentOrder = null;
    let simulateTimer = null;

    function loadOrders() {
        try {
            const raw = localStorage.getItem('orders');
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function saveOrders(orders) {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    function findOrderByRef(ref) {
        const orders = loadOrders();
        return orders.find(o => o.ref === ref) || null;
    }

    function renderOrder(order) {
        if (!order) {
            orderCard.style.display = 'none';
            statusMessage.textContent = 'Order not found.';
            return;
        }

        currentOrder = order;
        orderCard.style.display = '';
        statusMessage.textContent = '';

        orderRefEl.textContent = order.ref;
        orderRestaurant.textContent = order.delivery && order.delivery.name ? `Delivery for ${order.delivery.name}` : 'Order';
        orderTotal.textContent = '$' + (order.total || 0).toFixed(2);

        // items
        orderItemsList.innerHTML = '';
        (order.items || []).forEach(it => {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.justifyContent = 'space-between';
            row.style.paddingTop = '10px';
            row.innerHTML = `<dt>${it.name} x${it.qty}</dt><dd>${'$' + ((it.price||0)* (it.qty||1)).toFixed(2)}</dd>`;
            orderItemsList.appendChild(row);
        });

        renderTimeline(order);
    }

    function renderTimeline(order) {
        timeline.innerHTML = '';
        const history = order.history || [{ status: 'Placed', when: order.createdAt }];
        const latest = history[history.length - 1].status;

        STATUS_STEPS.forEach(step => {
            const el = document.createElement('div');
            el.className = 'status-step' + (step === latest ? ' active' : '');
            el.innerHTML = `<strong>${step}</strong>`;
            const found = history.find(h => h.status === step);
            const when = found ? new Date(found.when).toLocaleString() : '';
            if (when) el.innerHTML += `<span class="when">${when}</span>`;
            timeline.appendChild(el);
        });
    }

    function updateOrderStatus(order, newStatus) {
        const orders = loadOrders();
        const idx = orders.findIndex(o => o.ref === order.ref);
        if (idx === -1) return;

        const now = new Date().toISOString();
        orders[idx].history = orders[idx].history || [];
        orders[idx].history.push({ status: newStatus, when: now });
        orders[idx].currentStatus = newStatus;
        // keep lastOrder in sync
        localStorage.setItem('lastOrder', JSON.stringify(orders[idx]));
        localStorage.setItem('lastOrderRef', orders[idx].ref);

        saveOrders(orders);
        renderOrder(orders[idx]);
    }

    lookupBtn.addEventListener('click', () => {
        const ref = searchRef.value.trim() || localStorage.getItem('lastOrderRef');
        if (!ref) {
            statusMessage.textContent = 'Enter an order reference or have a recent order.';
            return;
        }

        const order = findOrderByRef(ref);
        if (!order) {
            statusMessage.textContent = `Order ${ref} not found.`;
            orderCard.style.display = 'none';
            return;
        }

        renderOrder(order);
    });

    advanceBtn.addEventListener('click', () => {
        if (!currentOrder) return;
        const history = currentOrder.history || [{ status: 'Placed', when: currentOrder.createdAt }];
        const latest = history[history.length - 1].status;
        const idx = STATUS_STEPS.indexOf(latest);
        const next = STATUS_STEPS[Math.min(idx + 1, STATUS_STEPS.length - 1)];
        if (next === latest) return;
        updateOrderStatus(currentOrder, next);
    });

    simulateBtn.addEventListener('click', () => {
        if (!currentOrder) return;
        if (simulateTimer) {
            clearInterval(simulateTimer);
            simulateTimer = null;
            simulateBtn.textContent = 'Simulate auto-updates';
            return;
        }

        simulateBtn.textContent = 'Stop simulation';
        simulateTimer = setInterval(() => {
            const history = currentOrder.history || [{ status: 'Placed', when: currentOrder.createdAt }];
            const latest = history[history.length - 1].status;
            const idx = STATUS_STEPS.indexOf(latest);
            if (idx >= STATUS_STEPS.length - 1) {
                clearInterval(simulateTimer);
                simulateTimer = null;
                simulateBtn.textContent = 'Simulate auto-updates';
                return;
            }
            const next = STATUS_STEPS[idx + 1];
            updateOrderStatus(currentOrder, next);
        }, 2200);
    });

    // Auto-load last order if present
    const lastRef = localStorage.getItem('lastOrderRef');
    if (lastRef) {
        searchRef.value = lastRef;
        const lastOrder = findOrderByRef(lastRef) || JSON.parse(localStorage.getItem('lastOrder') || 'null');
        if (lastOrder) renderOrder(lastOrder);
    }
});
