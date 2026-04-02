export function getAllProducts(category, id){
    const container = document.getElementById("flies");
    container.innerHTML = "";
    let html = "";
    fetch(`/api/${category.toLowerCase()}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
                html += `
                    <div class="card mx-3" style="width: 18rem;">
                        <img src="${item.imagePath}" class="card-img-top" style="width: 100%, height="100%"" alt="...">
                        <div class="card-body">
                            <a class="btn " href="#${item.category}/${item.idProduct}"><h5 class="card-title">${item.title}</h5></a>
                            <p class="card-text">$${item.price}</p>
                            <a href="#" class="btn btn-primary">Add to cart</a>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        });
}