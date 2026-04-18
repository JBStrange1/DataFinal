export function initializeDataTools(){
    const adminContainer = document.getElementById("adminContainer");
    adminContainer.innerHTML += `<div id="dataTools" class="w-50"></div>`
    checkStock();
    computeOrdertotals();
    refreshSales();
}
function computeOrdertotals(){

}
function refreshSales(){

}

function checkStock(){
    const dataTools = document.getElementById("dataTools");
    dataTools.innerHTML += `<div id="lowStock" class="alert alert-danger d-none w-100 p-2" role="alert"></div>`
    let html = "";
    fetch('/api/checkMinStock')
        .then(res => res.json())
        .then(data => {
            const lowStockLbl = document.getElementById("lowStock")
            console.log(data);
            if(data.length > 0){
                lowStockLbl.classList.remove("d-none");
                lowStockLbl.innerHTML = `<p class="mb-1 small">Some items require ordering:</p>`
                data.forEach(element => {
                    html += `
                        <p class="mb-1 small">${element.title} -> Amount: ${element.stock}</p>
                    `
                });
                lowStockLbl.innerHTML += html;
            }
    })
}