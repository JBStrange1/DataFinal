const container = document.getElementById("flies");

function loadCategory(category, id = 0) {
    container.innerHTML = "";
    let html = "";
    if(id){
          fetch(`/api/${category.toLowerCase()}${id}`)
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    html += `
                    <div class="container bootdey">
                        <div class="col-md-12">
                        <section class="panel">
                            <div class="panel-body">
                                <div class="col-md-6">
                                    <div class="pro-img-details">
                                        <img src="https://www.bootdey.com/image/550x380/FFB6C1/000000" alt="">
                                    </div>
                                    <div class="pro-img-list">
                                        <a href="#">
                                            <img src="https://www.bootdey.com/image/115x100/87CEFA/000000" alt="">
                                        </a>
                                        <a href="#">
                                            <img src="https://www.bootdey.com/image/115x100/FF7F50/000000" alt="">
                                        </a>
                                        <a href="#">
                                            <img src="https://www.bootdey.com/image/115x100/20B2AA/000000" alt="">
                                        </a>
                                        <a href="#">
                                            <img src="https://www.bootdey.com/image/120x100/20B2AA/000000" alt="">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h4 class="pro-d-title">
                                        <a href="#" class="">
                                            ${item.title}
                                        </a>
                                    </h4>
                                    <p>
                                        Praesent ac condimentum felis. Nulla at nisl orci, at dignissim dolor, The best product descriptions address your ideal buyer directly and personally. The best product descriptions address your ideal buyer directly and personally.
                                    </p>
                                    <div class="product_meta">
                                        <span class="posted_in"> <strong>Categories:</strong> <a rel="tag" href="#">Jackets</a>, <a rel="tag" href="#">Men</a>, <a rel="tag" href="#">Shirts</a>, <a rel="tag" href="#">T-shirt</a>.</span>
                                        <span class="tagged_as"><strong>Tags:</strong> <a rel="tag" href="#">mens</a>, <a rel="tag" href="#">womens</a>.</span>
                                    </div>
                                    <div class="m-bot15"> <strong>Price : </strong> <span class="amount-old">$544</span>  <span class="pro-price"> ${item.price}</span></div>
                                    <div class="form-group">
                                        <label>Quantity</label>
                                        <input type="quantiy" placeholder="1" class="form-control quantity">
                                    </div>
                                    <p>
                                        <button class="btn btn-round btn-danger" type="button"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                                    </p>
                                </div>
                            </div>
                        </section>
                        </div>
                        </div>
                    `;
                });
                container.innerHTML = html;
            });
    }else{
        fetch(`/api/${category.toLowerCase()}`)
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    html += `
                        <div class="card mx-3" style="width: 18rem;">
                            <img src="${item.imagePath}" class="card-img-top" style="width: 100%, height="100%"" alt="...">
                            <div class="card-body">
                                <a class="btn " href="#${category}/${item.idProduct}"><h5 class="card-title">${item.title}</h5></a>
                                <p class="card-text">$${item.price}</p>
                                <a href="#" class="btn btn-primary">Add to cart</a>
                            </div>
                        </div>
                    `;
                });

                container.innerHTML = html;
            });
    }
}
function handleRoute() {
    let hash = window.location.hash.replace("#", "");
    let id = 0;
    if(hash.includes(":")) {
        let stIdx = hash.search(":") + 1;
        id = hash.slice( stIdx, hash.length);
        hash = hash.replace(hash.slice( stIdx- 1, hash.length), "");
    }
    if (!hash) {
        hash = "Products"; 
    }

    loadCategory(hash,id);
}

window.addEventListener("load", handleRoute);
window.addEventListener("hashchange", handleRoute);