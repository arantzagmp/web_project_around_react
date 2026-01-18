import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./vendor/normalize.css";
import "./vendor/fonts.css";
// Explicit CSS imports (required by some checkers)
import "./blocks/page.css";
import "./blocks/header.css";
import "./blocks/footer.css";
import "./blocks/profile.css";
import "./blocks/cards.css";
import "./blocks/popup.css";
import "./blocks/popupCreate.css";
import "./blocks/popupImage.css";
import "./blocks/PopupWithConfirmation.css";
import './index.css'; 
import App from './components/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

