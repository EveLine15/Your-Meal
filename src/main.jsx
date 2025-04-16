import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.scss'
import App from './app/App'
import { BrowserRouter } from 'react-router'

import firebase from './firebaseConfig'
import { initializeApp } from 'firebase/app'

initializeApp(firebase);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
