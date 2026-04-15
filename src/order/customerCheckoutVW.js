import { conformationPage } from "./conformationVW.js"; 
import { getCart, resetCart } from "../cart/cart.js";

export function customerCheckoutVW(){
    let cart = getCart(); 
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
                                Submit
                            </input >
                        </form>

                    </div>
                </div>
    `
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
            commitOrder();
            resetCart();
            conformationPage();   
        }
    })
}

async function commitOrder(){
        let cart = getCart();
        let orderId = 0;
        await fetch("/api/order", { method: "POST" })
            .then((res) => {
                res.json();
            })
            .then((json) => console.log(json))
        await fetch("/api/lastId") 
            .then(res => res.json())
            .then(data => {
                orderId = data[0].orderId
        })
        await cart.forEach(async item => {
            let insertVals = await [item.idProduct, item.price, orderId];
            console.log(item.qty);
            for(let i = 0; i < item.qty; i++){
                await fetch("/api/orderitem", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(insertVals)
                })
                    .then(async res =>  await res.json())
                    .then(async data => {
                        if(await data.affecteddRows == 0){
                            await console.error("Could not process order");
                        }
                    })
                
            }
        });
}
