import { cryptoAssets, cryptoData } from './data'

export function FakeFetchCrypto() {
    return new Promise(resolve => (
        setTimeout(() => {
            resolve(cryptoData)
        }, 1)
    ))
}

export function FetchAssets() {
    return new Promise(resolve => (
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 1)
    ))
}