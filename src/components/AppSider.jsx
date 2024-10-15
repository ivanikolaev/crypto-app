import React from 'react'
import { Layout, Card, Statistic, List, Typography, Tag, Flex, Button } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons'
import { capitalize } from '../utils'
import { useCrypto } from '../context/crypto-context'

const { Sider } = Layout

const siderStyle = {
    padding: '1rem',

}

export default function AppSider() {
    const { assets, deleteAsset } = useCrypto()

    return (
        <Sider width="25%" style={siderStyle}>
            {assets.map((asset) => (
                <Card key={asset.id} style={{ marginBottom: '1rem' }}>
                    <Statistic
                        title={
                            <Flex justify='space-between'>
                                {capitalize(asset.id)}
                                <Button danger style={{ width: 10 }} onClick={() => deleteAsset(asset)}>
                                    <DeleteOutlined style={{
                                        color: 'red',
                                        padding: 4,
                                        cursor: 'pointer',
                                    }} />
                                </Button>
                            </Flex>
                        }
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="$"
                    />
                    <List
                        size='small'
                        dataSource={[
                            { title: 'Total profit', value: asset.totalProfit, isTag: true },
                            { title: 'Asset amount', value: asset.amount, isPlain: true },
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                    {item.isTag && (
                                        <Tag color={asset.grow ? 'green' : 'red'}>
                                            {asset.growPercent}%
                                        </Tag>
                                    )}
                                    {item.isPlain && item.value}
                                    {!item.isPlain && (
                                        <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                            {item.value.toFixed(2)}$
                                        </Typography.Text>
                                    )}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Sider>
    )
}
