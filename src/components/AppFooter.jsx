import React from 'react'
import { Layout } from 'antd'
const { Footer } = Layout

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 100,
    backgroundColor: '#4096ff',
}

export default function AppFooter() {
    return (
        <Footer style={footerStyle}>Footer</Footer>
    )
}
