const container = document.getElementById("flies");

function loadCategory(category) {
    container.innerHTML = "";
    let html = "";

    fetch(`/api/${category.toLowerCase()}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
                html += `
                    <div class="card mx-3" style="width: 18rem;">
                        <div hidden id="${item.idProduct}"></div>
                        <img src="${item.imagePath}" class="card-img-top" style="width: 100%, height="100%"" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">$${item.price}</p>
                            <a href="#" class="btn btn-primary">Add to cart</a>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        });
}
function handleRoute() {
    let hash = window.location.hash.replace("#", "");

    if (!hash) {
        hash = "Products"; 
    }

    loadCategory(hash);
}

window.addEventListener("load", handleRoute);
window.addEventListener("hashchange", handleRoute);