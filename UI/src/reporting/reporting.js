import Chart from 'chart.js/auto';

let salesChart = null;
let productSalesChart = null;
let stockChart = null;

export function initializeReports(){
    createSalesReportCanvas();
    createProductSalesQuarterCanvas();
    createStockCanvas();
    loadSalesReport();
    loadProductSalesQuarter();
    loadStock();
}

function createSalesReportCanvas() {
    const chartContainer = document.getElementById("adminContainer");
    chartContainer.innerHTML += `
        <div class="w-50">
            <canvas id="salesReporting"></canvas>
        </div>
    `;
}

function createProductSalesQuarterCanvas() {
    const chartContainer = document.getElementById("adminContainer");
    chartContainer.innerHTML += `
        <div id="productSalesContainer" class="w-50">    
            <canvas id="productSales"></canvas>
        </div>
    `;
}

function createStockCanvas() {
    const chartContainer = document.getElementById("adminContainer");
    chartContainer.innerHTML += `
        <div class="w-50">
            <canvas id="productStock"></canvas>
        </div>
    `;
}

export function loadSalesReport() {
    fetch('/api/salesReports')
        .then(res => res.json())
        .then(data => {
            const rows = data[0];
            const ctx = document.getElementById("salesReporting");
            const labels = rows.map(row => row.day.split("T")[0]);
            const sales = rows.map(row => row.totalSales);

            if (salesChart) {
                salesChart.destroy();
            }

            salesChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sales',
                        data: sales,
                        borderWidth: 2,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true
                }
            });
        })
        .catch(err => console.error(err));
}

export function loadStock(){
    fetch('/api/stock')
        .then(res => res.json())
        .then(data => {
            const rows = data;
            const ctx  = document.getElementById("productStock");
            const labels = rows.map(row => row.title);
            const sales = rows.map(row => row.stock);

            if (stockChart) {
                stockChart.destroy();
            }

            stockChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Stock',
                        data: sales,
                        borderWidth: 2,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true
                }
            });
        })
        .catch(err => console.error(err));
}

export function loadProductSalesQuarter(){
    fetch('/api/productSalesQuarter')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const rows = data[0];
            const ctx  = document.getElementById("productSales");
            const labels = rows.map(row => row.title);
            const sales = rows.map(row => row.total);

            if (productSalesChart) {
                productSalesChart.destroy();
            }

            productSalesChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sales',
                        data: sales,
                        borderWidth: 2,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true
                }
            });
        })
        .catch(err => console.error(err));
}