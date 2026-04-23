import { loadProductSalesQuarter, loadSalesReport } from "./reporting";

export function initializeDataTools(){
    const adminContainer = document.getElementById("adminContainer");
    adminContainer.innerHTML += `
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <h1>Data Tools</h1>
                    <div id="dataTools" class="p-3"></div>
                </div>
            </div>
        </div>
    `;
    checkStock();
    computeOrdertotals();
    refreshSales();
    loadQuartlyTotal();
    attachButtonEvents();
}

function computeOrdertotals(){
    const dataTools = document.getElementById("buttonRow");
    dataTools.innerHTML += `
        <div class="col-12 col-md-6">
            <button id="recalcTotals" class="btn btn-primary w-100">Recalculate Totals</button>
        </div>
    `;
}
function refreshSales(){
    const dataTools = document.getElementById("buttonRow");
    dataTools.innerHTML += `
        <div class="col-12 col-md-6">
            <button id="refreshSalesBtn" class="btn btn-primary w-100">Refresh Sales</button>
        </div>
    `;
}
function loadQuartlyTotal(){
    const dataTools = document.getElementById("buttonRow");
    dataTools.innerHTML += `
        <div class="col-12 col-md-6">
            <button id="quarterSales" class="btn btn-primary w-100">Quarterly Sales</button>
        </div>
    `;
}

function attachButtonEvents(){
    document.getElementById("recalcTotals").addEventListener("click", () => {
        recalcTotals();
    });
    document.getElementById("refreshSalesBtn").addEventListener("click", () => {
        loadSalesReport();
    });
    document.getElementById("quarterSales").addEventListener("click", () => {
        calcQuartlySales();
    })
}
function calcQuartlySales(){
    fetch('/api/calcQuarterTotal')
        .then(res => res.json())
        .then(data => {
            let totalSales = data[0][0];
            const oldAlert = document.getElementById("successAlert");
            if (oldAlert) oldAlert.remove();
            if(data){
                document.body.insertAdjacentHTML("beforeend", `
                    <div id="successAlert"
                        class="alert alert-success position-fixed top-50 start-50 translate-middle alert-dismissible fade show"
                        role="alert"
                        style="z-index: 2000;">
                            Total Sales For the last Quarter: $${data[0][0].total}.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `);
            }else{
                   document.body.insertAdjacentHTML("beforeend", `
                    <div id="successAlert"
                        class="alert alert-danger position-fixed top-50 start-50 translate-middle alert-dismissible fade show"
                        role="alert"
                        style="z-index: 2000;">
                            Could not retrieve total.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `);
            }
            const alert = document.getElementById("successAlert");
                setTimeout(() => {
                if (alert) {
                    alert.remove();
                }
            }, 6000);
        })
}
function recalcTotals(){
    fetch('/api/recalcOrderTotals')
        .then(res => {
            if (!res.ok) {
                throw new Error("Request failed");
            }
            return res.json();
        })
        .then(data => {
            const oldAlert = document.getElementById("successAlert");
            if (oldAlert) oldAlert.remove();

            document.body.insertAdjacentHTML("beforeend", `
                <div id="successAlert"
                     class="alert alert-success position-fixed top-50 start-50 translate-middle alert-dismissible fade show"
                     role="alert"
                     style="z-index: 2000;">
                    Order totals recalculated successfully!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `);
            const alert = document.getElementById("successAlert");
            setTimeout(() => {
                if (alert) {
                    alert.remove();
                }
            }, 2000);
        })
        .catch(err => {
            console.log("Could Not Calculate orders", err);
        });
}


function checkStock(){
    const dataTools = document.getElementById("dataTools");
    dataTools.innerHTML += `
        <div id="lowStock" class="alert alert-danger d-none mb-3" role="alert"></div>
        <div id="buttonRow" class="row g-2"></div>
    `;
    let html = "";
    fetch('/api/checkMinStock')
        .then(res => res.json())
        .then(data => {
            const lowStockLbl = document.getElementById("lowStock");
            if(data.length > 0){
                lowStockLbl.classList.remove("d-none");
                lowStockLbl.innerHTML = `<div class="fw-semibold mb-1">Some items require ordering:</div>`;
                data.forEach(element => {
                    html += `
                        <div class="small">${element.title} → Amount: ${element.stock}</div>
                    `;
                });
                lowStockLbl.innerHTML += html;
            }
        });
}