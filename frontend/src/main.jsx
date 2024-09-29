import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import {Apis} from './services/api/api.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ApiProvider api={Apis}>
      <App />
    </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
