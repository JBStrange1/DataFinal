let cart = [];
export function updateCartCount() {
    const counter = document.getElementById("counter");

    const total = cart.reduce((sum, item) => sum + item.qty, 0);

    counter.textContent = total;

    if (total === 0) {
        counter.style.display = "none";
    } else {
        counter.style.display = "block";
    }
}

export function addToCart(item, quantity = 1) {
    const existing = cart.find(p => p.idProduct === item.idProduct);

    if (existing) {
        existing.qty += quantity;
    } else {
        cart.push({ ...item, qty: quantity });
    }

    updateCartCount();
    console.log("cart:", cart);
}