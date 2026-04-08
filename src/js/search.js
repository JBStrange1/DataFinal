import { addToCart } from './addToCart.js'

const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const container = document.getElementById("flies")

export function search(input = ""){
    let html = "";
    fetch(`/api/products`)
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
                if(item.title.toLowerCase().includes(input.toLowerCase())) {
                    html += `
                    <div class="card p-0 mx-3" style="width: 18rem;">
                        <img src="${item.imagePath}" class="card-img-top" style="width: 100%; height: 100%;" alt="${item.title}">
                        <div class="card-body">
                            <a class="btn" href="#${item.category}/${item.idProduct}">
                                <h5 class="card-title">${item.title}</h5>
                            </a>
                            <p class="card-text">$${item.price}</p>
                            <a href="#" data-id="${item.idProduct}" class="btn btn-primary add-to-cart">Add to cart</a>
                        </div>
                    </div>
                    `;
                }
            })
            container.innerHTML = html
            document.querySelectorAll(".add-to-cart").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.preventDefault();

                    const id = btn.dataset.id;
                    const item = data.find(p => p.idProduct == id);

                    addToCart(item);
                });
            });
        })
}
searchBtn.addEventListener("click", (e) =>{
        const searchVal = searchInput.value;
        e.preventDefault();
        search(searchVal);
    })