import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar({ onClose }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    })
      .then(() => {
        avatarRef.current.value = "";
        onClose?.();
      })
      .catch(console.error);
  }

  return (
    <form
      className="popup__form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          ref={avatarRef}
          type="url"
          className="popup__input"
          placeholder="Enlace del avatar"
          required
        />
        <div className="popup__input-line" />
        <span className="popup__error"></span>
      </label>

      <button className="popup__submit-button" type="submit">
        <span className="popup__submit-button-text">Guardar</span>
      </button>
    </form>
  );
}
