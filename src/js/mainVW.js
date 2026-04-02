
import { getProductsById } from './productDescVW.js'
import { getAllProducts } from './getAllProducts.js'

function loadCategory(category, id) {
    if(id)getProductsById(category, id);
    else getAllProducts(category, id) ; 
}
function handleRoute() {
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