document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#crypto-table tbody');
    const errorMessage = document.getElementById('error-message');

    chrome.runtime.sendMessage({ action: "fetchCryptoData" }, response => {
        if (response.success) {
            const data = response.data;
            console.log('API Response:', data);
            if (data.length === 0) {
                throw new Error('No data received from API');
            }
            tableBody.innerHTML = '';
            data.forEach(coin => {
                const priceChange = coin.price_change_percentage_24h;
                const heatmapColor = getHeatmapColor(priceChange);
                const row = `
                    <tr>
                        <td>${coin.name}</td>
                        <td>$${coin.current_price.toFixed(2)}</td>
                        <td class="heatmap-cell" style="background-color: ${heatmapColor}">
                            ${priceChange.toFixed(2)}%
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } else {
            console.error('Error:', response.error);
            errorMessage.textContent = 'Failed to fetch cryptocurrency data. Please try again later.';
        }
    });
});

function getHeatmapColor(percentage) {
    const normalizedPercentage = Math.max(-10, Math.min(10, percentage)) / 10;
    if (normalizedPercentage < 0) {
        const red = Math.round(255 * (-normalizedPercentage));
        return `rgb(${red}, 0, 0)`;
    } else {
        const green = Math.round(255 * normalizedPercentage);
        return `rgb(0, ${green}, 0)`;
    }
}