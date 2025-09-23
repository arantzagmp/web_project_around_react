export default function EditAvatar({ onClose, title, children }) {
  return (
    <div className="popup" role="dialog" aria-modal="true" aria-labelledby="edit-avatar-title">
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

        <h3 id="edit-avatar-title" className="popup__title">
          {title}
        </h3>

        {children}
      </div>
    </div>
  );
}