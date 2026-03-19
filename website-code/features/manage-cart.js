let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartForm = document.getElementById("cartForm");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");
const emptyCartMessage = document.getElementById("emptyCartMessage");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    cartList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
        cartTotal.textContent = "Total: $0.00";
        return;
    }

    emptyCartMessage.style.display = "none";

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <span>
                ${item.name} - $${item.price.toFixed(2)}
            </span>

            <div class="qty-controls">
                <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                <button class="remove-btn" onclick="removeItem(${index})">x</button>
            </div>
        `;

        cartList.appendChild(div);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function changeQty(index, change) {
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

cartForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("itemName").value;
    const price = parseFloat(document.getElementById("itemPrice").value);
    const qty = parseInt(document.getElementById("itemQty").value);

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }

    saveCart();
    renderCart();
    cartForm.reset();
});

// PLACE ORDER SYNC
document.getElementById("placeOrderBtn").addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const order = {
        id: Date.now(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
        date: new Date().toLocaleString()
    };

    localStorage.setItem("currentOrder", JSON.stringify(order));

    cart = [];
    saveCart();
    renderCart();

    window.location.href = "place_order.html";
});

renderCart();