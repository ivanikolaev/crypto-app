import React from 'react'
import { Layout, Typography } from 'antd'
import { useCrypto } from '../context/crypto-context'
import PortfolioChart from './PortfolioChart'
import AssetsTable from './AssetsTable'
const { Content } = Layout

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem',
}

export default function AppContent() {
    const { assets, crypto } = useCrypto()

    const cryptoPriceMap = crypto.reduce((acc, coin) => {
        acc[coin.id] = coin.price
        return acc
    }, {})

    let balance = +(assets
        .map((asset) => asset.amount * cryptoPriceMap[asset.id])
        .reduce((acc, value) => (acc += value), 0)
        .toFixed(2))

    return (
        <Content style={contentStyle}>
            <Typography.Title level={3} style={{ textAlign: 'left', color: 'antiquewhite' }}>
                Balance: {balance}$
            </Typography.Title>
            {balance > 0 ? (
                <>
                    <PortfolioChart />
                    <AssetsTable />
                </>
            ) : (
                <Typography.Title level={3} style={{ textAlign: 'left', color: 'antiquewhite' }}>
                    Please add your assets!
                </Typography.Title>
            )}

        </Content>
    )
}
