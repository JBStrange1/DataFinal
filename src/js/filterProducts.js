const container =  document.getElementById("flies")
const nymphsLink = document.getElementById("Nymphs");
const streamersLink = document.getElementById("Streamers");
const midgesLink = document.getElementById("Midges");
const dryLink = document.getElementById("Dry");
const materialsLink = document.getElementById("Materials");
const equipmentLink = document.getElementById("Equipment");

let html = ''
equipmentLink.onclick = function(){
    container.innerHTML = html
    fetch('/api/equipment')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(fly => {
                html +=  `
                    <div class="card mx-3" style="width: 18rem;">
                        <img src="..." class="card-img-top placeholder" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${fly.title}</h5>
                            <h7 class="card-text">${fly.price}</h7>
                            <a href="#" class="btn btn-primary">Add to cart</a>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        });
}
