import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { UsersProvider } from './contexts/user.context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersProvider>
          <App />
      </UsersProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
