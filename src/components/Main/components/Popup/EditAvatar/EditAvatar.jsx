import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatarForm() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const avatar = avatarRef.current?.value || "";

    handleUpdateAvatar({ avatar })
      .then(() => {
        if (avatarRef.current) avatarRef.current.value = "";
      })
      .catch((err) => console.error("Error actualizando avatar:", err));
  }

  return (
    <form className="popup__form" id="edit-avatar-form" noValidate onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          type="url"
          id="avatar"
          name="avatar"
          className="popup__input"
          placeholder="Enlace al avatar"
          required
          ref={avatarRef}
        />
        <span className="popup__error" id="avatar-error"></span>
      </label>

      <button className="popup__submit-button" type="submit">
        <span className="popup__submit-button-text">Guardar</span>
      </button>
    </form>
  );
}
