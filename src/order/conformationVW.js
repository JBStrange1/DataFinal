import { getAllProducts } from "../products/getAllProducts";

export function conformationPage(){
    let html = "";
    let chkoutBtn = document.querySelector(".checkout");
    let container = document.getElementById("flies");
    html = `
        <div class="text-center mx-auto">
            <h1 class="mb-4">Thank you for your order!</h1>
            <p class="text-secondary mb-4">Your order has been successfully placed.</p>

            <button href="#" id="home" class="btn btn-primary">
                Continue Shopping
            </button>
        </div>
    `
    container.innerHTML = html
    let homeBtn = document.getElementById("home");
    homeBtn.addEventListener("click", (e) => {
        window.location.hash = "Products";
        getAllProducts("Products");

    });
}