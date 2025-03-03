import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        cssVar: true,
        algorithm: [theme.darkAlgorithm],
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
