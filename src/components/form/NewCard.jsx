
export default function NewCard() {
  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
    >
      <label className="popup__field">
        <input
          type="text"
          id="title"
          name="title"
          className="popup__input popup__input_type_card-name"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
          autoComplete="off"
        />
        <span className="popup__error" id="title-error"></span>
      </label>

      <label className="popup__field">
        <input
          type="url"
          id="image"
          name="image"
          className="popup__input popup__input_type_url"
          placeholder="Enlace a la imagen"
          required
          autoComplete="url"
        />
        <span className="popup__error" id="image-error"></span>
      </label>

      <button
        type="submit"
        className="popup__submit-button"
      >
        Crear
      </button>
    </form>
  );
}
