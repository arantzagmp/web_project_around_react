export default function EditProfileForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(Object.fromEntries(new FormData(e.currentTarget)));
  };

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <div className="popup__field">
        <input
          type="text"
          id="name"
          name="name"
          className="popup__input"
          placeholder="Nombre"
          minLength={2}
          maxLength={40}
          required
          autoComplete="name"
        />
        <span className="popup__error name-error"></span>
        <div className="popup__input-line"></div>
      </div>

      <div className="popup__field">
        <input
          type="text"
          id="about"
          name="about"
          className="popup__input"
          placeholder="Acerca de mí"
          minLength={2}
          maxLength={200}
          required
          autoComplete="off"
        />
        <span className="popup__error about-error"></span>
        <div className="popup__input-line"></div>
      </div>

      <button type="submit" className="popup__submit-button">
        <span className="popup__submit-button-text">Guardar</span>
      </button>
    </form>
  );
}