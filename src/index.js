import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ProductPage from './pages/ProductPage'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import 'antd/dist/antd.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProductPage />
    </Provider>
  </React.StrictMode>
)
