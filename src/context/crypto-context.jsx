import { createContext, useEffect, useState, useContext } from 'react'
import { FakeFetchCrypto, FetchAssets } from '../api'
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
            const { result } = await FakeFetchCrypto()
            const assets = await FetchAssets()

            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

    const addAsset = (newAsset) => {
        setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    }

    const deleteAsset = (asset) => {
        setAssets((prev) => [...prev.filter((c) => c.id !== asset.id)])
    }

    return <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, deleteAsset }}>
        {children}
    </CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}