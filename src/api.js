export async function fetchCrypto() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': import.meta.env.VITE_API_KEY,
        }
    };

    try {
        const response = await fetch('https://openapiv1.coinstats.app/coins', options);
        const crypto = response.json();
        return crypto;
    }
    catch (error) {
        console.error('Fetch data error:', error);
    }
}

export async function fetchAssets() {
    try {
        const response = await fetch('https://crypto-app-db.onrender.com/assets');
        const assets = await response.json();

        const cryptoAssets = assets.map(asset => ({
            id: asset.id,
            amount: parseFloat(asset.amount),
            price: parseFloat(asset.price),
            date: new Date()
        }));

        return cryptoAssets;
    } catch (error) {
        console.error('Fetch data error:', error);
    }
}