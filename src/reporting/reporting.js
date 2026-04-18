import Chart from 'chart.js/auto';

export function initializeReports(){
    loadSalesReport();
    loadProductSalesQuarter();
    loadStock();
}

function loadSalesReport() {
    const chartContainer = document.getElementById("adminContainer");
    chartContainer.innerHTML += `
        <div class="w-50">
            <canvas id="salesReporting"></canvas>
        </div>
    `;
    fetch('/api/salesReports')
        .then(res => res.json())
        .then(data => {
            const rows = data[0];
            const ctx = document.getElementById("salesReporting");
            const labels = rows.map(row => row.day.split("T")[0]);
            const sales = rows.map(row => row.totalSales);

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sales',
                        data:sales,
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
function loadStock(){
    let chartContainer = document.getElementById("adminContainer");
    chartContainer.innerHTML += `
        <div class="w-50">
            <canvas id="productStock"></canvas>
        </div>
            `;
    fetch('/api/stock')
        .then(res => res.json())
        .then(data => {
            const rows = data;
            const ctx  = document.getElementById("productStock");
            const labels = rows.map(row => row.title);
            const sales = rows.map(row => row.stock);

            new Chart(ctx, {
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
            })
        })
        .catch(err => console.error(err));
}
function loadProductSalesQuarter(){
    let chartContainer = document.getElementById("adminContainer");
    chartContainer.innerHTML += `
        <div class="w-50">    
            <canvas id="productSales"></canvas>
        </div>
    `;
    fetch('/api/productSalesQuarter')
        .then(res => res.json())
        .then(data => {
            const rows = data[0];
            const ctx  = document.getElementById("productSales");
            const labels = rows.map(row => row.title);
            const sales = rows.map(row => row.total);

            new Chart(ctx, {
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
            })
        })
        .catch(err => console.error(err));
}
