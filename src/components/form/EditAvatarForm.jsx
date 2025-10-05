import { useRef, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditAvatarForm() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({
      avatar: avatarRef.current?.value || ""
    });
  }

  return (
    <form className="popup__form" name="avatar-form" id="avatar-form" noValidate onSubmit={handleSubmit}>
      <h3 className="popup__title">Cambiar foto de perfil</h3>

      <input
        type="url"
        id="avatar"
        name="avatar"
        className="popup__input"
        placeholder="Enlace a la nueva foto"
        required
        autoComplete="url"
        ref={avatarRef}
      />
      <span className="popup__error" id="avatar-error"></span>

      <button className="popup__submit-button" type="submit">
        <span className="popup__submit-button-text">Guardar</span>
      </button>
    </form>
  );
}
