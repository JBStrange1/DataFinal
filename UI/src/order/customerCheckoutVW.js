import { conformationPage } from "./conformationVW.js"; 
import { getCart, resetCart } from "../cart/cart.js";

export function customerCheckoutVW(){
    let container = document.getElementById('flies');
    let html = "";
    html = `
                <div class="card bg-secondary text-light border-0 shadow-lg mx-auto w-50">
                    <div class="card-body">
                        <h3 class="mb-4 text-center">Customer Information</h3>

                        <form>
                            <div class="mb-3">
                                <label class="form-label">First Name</label>
                                <input required  id="firstName" type="text" class="form-control bg-dark text-light border-secondary" placeholder="First Name">
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Last Name</label>
                                <input required type="text" id="lastName" class="form-control bg-dark text-light border-secondary" placeholder="Last Name">
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Address</label>
                                <input required type="text" id="address" class="form-control bg-dark text-light border-secondary" placeholder="Address">
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Phone Number</label>
                                <input required type="tel" id="phoneNumber" class="form-control bg-dark text-light border-secondary" placeholder="Phone Number">
                            </div>
                            <input  id="confirmBtn" type="submit" class="btn btn-primary w-100">
                            </input >
                        </form>

                    </div>
                </div>
    `;
    container.innerHTML = html;
    confirmOrder();
}

export function confirmOrder(){
    let confirmBtn = document.getElementById("confirmBtn");
    confirmBtn.addEventListener("click",async (e) => {
        let firstName = document.getElementById("firstName");
        let lastName= document.getElementById("lastName");
        let address = document.getElementById("address");
        let phoneNumber = document.getElementById("phoneNumber");
        if(firstName.value && lastName.value && address.value && phoneNumber.value){
            e.preventDefault();
            let checkedOut = await checkout();
            if(checkedOut){
                resetCart();
                conformationPage();   
            }else{
                const oldAlert = document.getElementById("successAlert");
                if (oldAlert) oldAlert.remove();

                document.body.insertAdjacentHTML("beforeend", `
                    <div id="successAlert" class="alert alert-danger position-fixed top-50 start-50 translate-middle alert-dismissible fade show" role="alert" style="z-index: 2000;">
                        Could not process order!?!?
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `);
                const alert = document.getElementById("successAlert");
                setTimeout(() => {
                    if (alert) {
                        alert.remove();
                    }
                }, 2000);
            }
        }
    })
}
async function checkout() {
    let cart = getCart()
    try {
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cart)
        });
        const data = await res.json();
        if (!res.ok) {
            console.error(data.error);
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}