let cart = [];
export function updateCartCount() {
    const counter = document.getElementById("counter");
    let currentCart = JSON.parse(sessionStorage.getItem("currentCart"));
    let total = 0;
    if(currentCart) total = currentCart.reduce((sum, item) => sum + item.qty, 0);
    counter.textContent = total;
    if (total === 0) {
        counter.style.display = "none";
    } else {
        counter.style.display = "block";
    }
}

export function addToCart(item, quantity = 1) {
    let curCart = getCart();
    if(curCart) cart = curCart;
    const existing = cart.find(p => p.idProduct === item.idProduct);

    if (existing) {
        existing.qty += quantity;
    } else {
        cart.push({ ...item, qty: quantity });
    }
    updateCartCount();
    sessionStorage.setItem("currentCart",JSON.stringify(cart));
}
export function getCart(){
    let curCart = JSON.parse(sessionStorage.getItem("currentCart"));
    return curCart;
}