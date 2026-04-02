          
export function getProductsById(category, id){
    let html = "";
    const container = document.getElementById("flies");
    fetch(`/api/${category.toLowerCase()}${id}`)
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            html += `
                <div class="container mx-0 w-100">
                    <div class="row g-5 bg-body-tertiary p-4 rounded shadow">

                    <div class="col-md-6">
                        <img
                        src="${item.imagePath}"
                        class="img-fluid rounded border border-secondary"
                        alt="Product"
                        />
                    </div>

                    <div class="col-md-6">
                        <h1 class="mb-3">${item.title}</h1>
                        <h3 class="text-success mb-3">${item.price}$</h3>

                        <p>
                            ${item.description}
                        </p>

                        <div class="mb-4">
                        <label class="form-label">Quantity</label>
                        <input
                            type="number"
                            class="form-control bg-dark text-light border-secondary w-25"
                            value="1"
                            min="1"
                        />
                        </div>

                        <!-- Buttons -->
                        <div class="d-flex gap-2 mb-4">
                        <button onclick="addToCart(${item.idProduct})"class="btn btn-primary btn-lg">Add to Cart</button>
                        <button class="btn btn-outline-light btn-lg">Buy Now</button>
                        </div>

                        <hr class="border-secondary">

                        <!-- Specs -->
                        <h5>Specifications</h5>
                        <table class="table table-dark table-bordered border-secondary">
                        <tbody>
                            <tr>
                            <th>Size</th>
                            <td>${item.size}</td>
                            </tr>
                            <tr>
                            <th>Type</th>
                            <td>${item.type}</td>
                            </tr>
                        </tbody>
                        </table>

                    </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    });
}