import { addToCart, getCart, removeFromCart, resetCart } from "./cart";
import { customerCheckoutVW } from "../order/customerCheckoutVW";

export function loadCart(){
    const container = document.getElementById("flies");
    const cart  = getCart() || [];
    let prevVal = 0;
    let cartItemsHTML = "";
    let subtotal = 0;
    cart.forEach(element => {
        const itemTotal = element.price * element.qty;
        subtotal += itemTotal;
        prevVal = element.qty;
        cartItemsHTML += `
            <div class="card mb-3 bg-body-tertiary border-secondary">
                <div class="row g-0 align-items-center p-3">
                    <div class="col-md-3">
                        <img src="${element.imagePath || '#'}" class="img-fluid rounded-start" alt="${element.title}">
                    </div>

                    <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text text-secondary">$${element.price}</p>
                            <p data-stock="${element.stock}"class="card-text text-secondary stock">Stock: ${element.stock}</p>
                            <input
                                type="number"
                                data-item-id="${element.idProduct}"                 
                                class="form-control bg-dark text-light border-secondary w-50 quantityInc"
                                value="${element.qty}"
                                min="1"
                            >
                        </div>
                    </div>

                    <div class="col-md-3 text-end pe-4">
                        <h5>$${itemTotal.toFixed(2)}</h5>
                        <button data-id="${element.idProduct}" class="btn btn-sm btn-outline-danger remove-from-cart mt-2">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    const shipping =cart.length > 0 ? 5.00 : 0;
    const total = subtotal + shipping || 0;

    const html = `
        <div class="container mx-0 p-0 w-100">
            <h1 class="mb-4">Your Cart</h1>

            <div class="row">
                <div class="col-lg-8">
                    ${cartItemsHTML || "<p>Your cart is empty.</p>"}
                </div>

                <div class="col-lg-4">
                    <div class="card bg-body-tertiary border-secondary p-4">
                        <h4 class="mb-3">Summary</h4>

                        <div class="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>$${subtotal.toFixed(2)}</span>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <span>Shipping</span>
                            <span>$${shipping.toFixed(2)}</span>
                        </div>

                        <hr class="border-secondary">

                        <div class="d-flex justify-content-between mb-3">
                            <strong>Total</strong>
                            <strong>$${total.toFixed(2)}</strong>
                        </div>

                        <button href="#checkout" class="btn btn-primary checkout w-100">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;
    document.querySelectorAll(".remove-from-cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const id = btn.dataset.id;
            removeFromCart(id);
            window.location.reload(true);
        });
    });
    let chkoutBtn = document.querySelector(".checkout");
    chkoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if(cart.length > 0){
            customerCheckoutVW();
        }
    });
    const numberInputs = document.querySelectorAll(".quantityInc");
    if(numberInputs){
        numberInputs.forEach(input => {
            input.addEventListener("change", (e) => {
                const itemId = Number(input.dataset.itemId);
                if(input.value > prevVal){
                    addToCart(cart.find(item => item.idProduct == itemId), 1);
                }else{ 
                    if(prevVal <= 0){
                        console.error("hey man stop it");
                    }else{
                        addToCart(cart.find(item => item.idProduct == itemId), -1);
                    }
                }
                loadCart();
            });
        })
    }
    const stockTxt = document.querySelectorAll(".stock")
    stockTxt.forEach(element => {
        if(element.dataset.stock <= 10){
            element.classList.remove('text-secondary');
             element.classList.add('text-danger');
        }
    });
}