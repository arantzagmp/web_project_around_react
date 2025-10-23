import React, { useContext, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar({ isOpen, onClose }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState("");

  if (!isOpen) return null;

  function onSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({ avatar })
      .then(() => {
        setAvatar("");
        onClose && onClose();
      })
      .catch((err) => console.error("Error actualizando avatar:", err));
  }

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} role="dialog" aria-modal="true">
      <div className="popup__container">
        <h3 className="popup__title">Actualizar avatar</h3>
        <form className="popup__form" id="edit-avatar-form" noValidate onSubmit={onSubmit}>
          <label className="popup__field">
            <input
              type="url"
              id="avatar"
              name="avatar"
              className="popup__input"
              placeholder="Enlace al avatar"
              required
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <span className="popup__error" id="avatar-error"></span>
          </label>

          <button className="popup__submit-button" type="submit">
            <span className="popup__submit-button-text">Guardar</span>
          </button>
        </form>

        <button className="popup__close" type="button" aria-label="Cerrar" onClick={onClose} />
      </div>
    </div>
  );
}
