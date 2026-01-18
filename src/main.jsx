import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./components/App.jsx";

import "./blocks/page.css";
import "./blocks/header.css";
import "./blocks/profile.css";
import "./blocks/cards.css";
import "./blocks/footer.css";
import "./blocks/popup.css";
import "./blocks/popupCreate.css";
import "./blocks/popupImage.css";
import "./blocks/PopupWithConfirmation.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

