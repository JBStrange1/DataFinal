import Chart from 'chart.js/auto';

export function loadSalesReport() {
    let container = document.getElementById("flies");

    container.innerHTML = `
        <div style="width: 800px;">
            <canvas id="acquisitions"></canvas>
        </div>
    `;

    fetch('/api/salesReports')
        .then(res => res.json())
        .then(data => {
            console.log(data);

            const rows = data[0];
            const ctx = document.getElementById("acquisitions");

            const labels = rows.map(row => row.day.split("T")[0]);
            const sales = rows.map(row => row.totalSales);

            new Chart(ctx, {
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