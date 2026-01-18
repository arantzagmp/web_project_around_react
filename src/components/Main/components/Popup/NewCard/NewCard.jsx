import React, { useContext, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function NewCard({ isOpen, onClose }) {
  const { handleAddCard } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  if (!isOpen) return null;

  function onSubmit(e) {
    e.preventDefault();
    handleAddCard({ name, link })
      .then(() => {
        setName("");
        setLink("");
        onClose && onClose();
      })
      .catch((err) => console.error("Error creando tarjeta:", err));
  }

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} role="dialog" aria-modal="true">
      <div className="popup__container">
        <h3 className="popup__title">Nueva tarjeta</h3>

        <form className="popup__form" id="new-card-form" noValidate onSubmit={onSubmit}>
          <label className="popup__field">
            <input
              type="text"
              id="title"
              name="title"
              className="popup__input popup__input_type_card-name"
              placeholder="Título"
              required
              minLength="1"
              maxLength="30"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="popup__error" id="title-error"></span>
          </label>

          <label className="popup__field">
            <input
              type="url"
              id="image"
              name="image"
              className="popup__input"
              placeholder="Enlace a la imagen"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              autoComplete="url"
            />
            <span className="popup__error" id="image-error"></span>
          </label>

          <button type="submit" className="popup__submit-button">
            <span className="popup__submit-button-text">Crear</span>
          </button>
        </form>

        <button className="popup__close" type="button" aria-label="Cerrar" onClick={onClose} />
      </div>
    </div>
  );
}
