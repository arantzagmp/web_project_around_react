import { useContext, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function NewCard({ onClose }) {
  const { handleAddCard } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    handleAddCard({ name, link })
      .then(() => {
        setName("");
        setLink("");
        onClose?.();
      })
      .catch(console.error);
  }

  return (
    <form className="popup__form" id="new-card-form" noValidate onSubmit={onSubmit}>
      <h2 className="popup__title">Nuevo lugar</h2>
      <label className="popup__field">
        <input
          type="text"
          className="popup__input"
          placeholder="Título"
          required
          minLength="1"
          maxLength="30"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="popup__input-line" />
      </label>

      <label className="popup__field">
        <input
          type="url"
          className="popup__input"
          placeholder="Enlace a la imagen"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="popup__input-line" />
      </label>

      <button className="popup__submit-button" type="submit">
        <span className="popup__submit-button-text">Crear</span>
      </button>
    </form>
  );
}