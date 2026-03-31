import flies from '../../DB/testData.json'

const container = document.getElementById('flies');
let html = '';
flies.forEach(fly => {
    html +=  `
        <div class="card mx-3" style="width: 18rem;">
            <img src="..." class="card-img-top placeholder" alt="...">
            <div class="card-body">
                <h5 class="card-title">${fly.name}</h5>
                <h7 class="card-text">${fly.price}</h7>
                <a href="#" class="btn btn-primary">Add to cart</a>
            </div>
        </div>
  `;
});

container.innerHTML = html;