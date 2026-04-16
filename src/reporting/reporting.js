import Chart from 'chart.js/auto';

let container = document.getElementById("flies");

export function initializeReports(){
    loadSalesReport();
    loadProductSalesQuarter();
}

function loadSalesReport() {
    container.innerHTML = `
        <div class="w-100">
            <canvas id="salesReporting"></canvas>
        </div>
    `;
    fetch('/api/salesReports')
        .then(res => res.json())
        .then(data => {
            console.log(data);
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

function loadProductSalesQuarter(){
    container.innerHTML += `
        <div class="w-100">
            <canvas id="productSales"></canvas>
        </div>
    `;
    fetch('/api/productSalesQuarter')
        .then(res => res.json())
        .then(data => {
            console.log(data);
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
