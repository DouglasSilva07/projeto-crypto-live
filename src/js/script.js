// //API DAS CRYPTOS https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1


async function crypto() {
    // const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"

    const response = await fetch(url);
    return await response.json();
}


function getCryptoData() {
    crypto().then(cryptoData => {
        console.log(cryptoData);

        cryptoData.sort((a,b) => b.current_price - a.current_price);

        let tableHTML = `
        <table class="crypto-table">
            <thead>
                <tr>
                    <th>Logo</th>
                    <th>Nome</th>
                    <th>Preço USD</th>
                    <th>Variação 24h</th>
                </tr>
            </thead>
            <tbody>
        `;

        cryptoData.slice(0, 10).forEach(coin => {
            tableHTML += `
                <tr>
                    <td><img src="${coin.image}" alt="${coin.name}" width="32"></td>
                    <td>${coin.name}</td>
                    <td>$${coin.current_price}</td>
                    <td class="${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}">
                        ${coin.price_change_percentage_24h}%
                    </td>
                </tr>
            `;
        });

        tableHTML += `
            </tbody>
        </table>
        `;

        document.body.innerHTML += tableHTML;
    });
}

getCryptoData();



