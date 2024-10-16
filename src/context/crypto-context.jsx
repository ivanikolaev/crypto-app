import { createContext, useEffect, useState, useContext } from 'react'
import { fetchCrypto, fetchAssets } from '../api'
import { percentDelta } from '../utils'

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    const mapAssets = (assets, result) => {
        return assets.map((asset) => {
            const coin = result.find(c => c.id === asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDelta(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * (coin.price - asset.price),
                name: coin.name,
                ...asset,
            }
        })
    }

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fetchCrypto()
            const assets = await fetchAssets()

            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

    const addAsset = async (newAsset) => {
        setAssets((prev) => mapAssets([...prev, newAsset], crypto))

        try {
            const response = await fetch('https://crypto-app-db.onrender.com/assets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAsset),
            });

            const addedAsset = await response.json();
            return addedAsset;
        } catch (error) {
            console.error('POST asset error:', error);
        }
    }

    const deleteAsset = async (asset) => {
        setAssets((prev) => [...prev.filter((c) => c.id !== asset.id)])

        try {
            const response = await fetch(`https://crypto-app-db.onrender.com/assets/${asset.id}`, {
                method: 'DELETE',
            });

        } catch (error) {
            console.error('DELETE asset error:', error);
        }
    }

    return <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, deleteAsset }}>
        {children}
    </CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}