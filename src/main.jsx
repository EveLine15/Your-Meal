import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.scss'
import App from './app/App'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/index.js'

import { initializeApp } from 'firebase/app'
import { getDatabase} from "firebase/database";
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
