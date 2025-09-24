import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./vendor/normalize.css";
import "./vendor/fonts.css";
import "./pages/index.css"; 
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

