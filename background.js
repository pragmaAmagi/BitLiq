chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchCryptoData") {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
            .then(response => response.json())
            .then(data => {
                sendResponse({ success: true, data: data });
            })
            .catch(error => {
                sendResponse({ success: false, error: error.message });
            });
        return true;  // Indicates that the response is sent asynchronously
    }
});