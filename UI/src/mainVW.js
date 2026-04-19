
import { getProductsById } from './products/productDescVW.js'
import { loadCart } from './cart/cartVW.js';
import { getAllProducts } from './products/getAllProducts.js'
import { updateCartCount } from './cart/cart.js'
import { initializeAdmin } from './reporting/admin.js';


function loadCategory(category, id) {
    if(category == "cart") loadCart();
    else if(category == "Admin") initializeAdmin();
    else if(id)getProductsById(category, id);
    else getAllProducts(category, id); 
}
function handleRoute() {
    updateCartCount();
    let hash = window.location.hash.replace("#", "");
    let id = 0;
    let hasNumber = /\d/;
    if(hasNumber.test(hash)) {
        let stIdx = hash.search(hasNumber) + 1;
        id = hash.slice( stIdx -1 , hash.length);
        hash = hash.replace(hash.slice( stIdx - 1, hash.length), "");
    }
    if (!hash) {
        hash = "Products"; 
    }
    loadCategory(hash,id);
}

window.addEventListener("load", handleRoute);
window.addEventListener("hashchange", handleRoute);