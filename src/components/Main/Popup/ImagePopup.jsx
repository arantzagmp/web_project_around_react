export default function ImagePopup({ card, isOpen, onClose }) {
  const opened = Boolean(isOpen && card);
  if (!opened) return null;
  const { image, name } = card;
  return (
    <div
      className={`popupImage popupImage__opened`}
      role="dialog"
      aria-modal="true"
      aria-label={name}
      onMouseDown={onOverlayDown}
    >
      <div className="popupImage__container">
        <button
          className="popupImage__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <img src="/images/close-icon.svg" alt="Cerrar" />
        </button>

        <div className="popupImage__frame">
          <img className="popupImage__image" src={image} alt={name} />
          <p className="popupImage__caption">{name}</p>
        </div>
      </div>
    </div>
  );
}
