import React from 'react'
import { Table } from 'antd';
import { useCrypto } from '../context/crypto-context';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Total, $',
        dataIndex: 'total',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
];

export default function AssetsTable() {
    const { assets } = useCrypto()

    const data = assets.map((a) => ({
        key: a.id,
        name: a.name,
        amount: a.amount,
        price: a.price,
        total: a.totalAmount.toFixed(2),
    }))

    return (
        <Table
            style={{ marginBottom: 20 }}
            pagination={false}
            columns={columns}
            dataSource={data}
            bordered
        />
    )
}
