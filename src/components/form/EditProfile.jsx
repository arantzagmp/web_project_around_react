export default function EditProfile({ onClose, title }) {
  return (
    <div className="popup" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title">
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <img
            src="/images/close-icon.svg"
            alt="Cerrar"
            className="popup__close-icon"
          />
        </button>

        <form
          className="popup__form"
          name="edit-profile-form"
          id="edit-profile-form"
          noValidate
        >
          <h3 id="edit-profile-title" className="popup__title">
            {title}
          </h3>

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
      </div>
    </div>
  );
}
