export default function Popup({ onClose, title, children, isOpen = false }) {
  return (
    <div
      className={`popup ${isOpen ? "popup__opened" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <img src="/images/close-icon.svg" alt="Cerrar" className="popup__close-icon" />
        </button>

        <h3 id="popup-title" className="popup__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}