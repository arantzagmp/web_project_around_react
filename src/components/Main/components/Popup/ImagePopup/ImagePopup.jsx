export default function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div
      className={`popupImage ${isOpen ? "popupImage__opened" : ""}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="popupImage__container">
        <div className="popupImage__frame">
          {card && (
            <img
              className="popupImage__image"
              src={card.link}
              alt={card.name || "Imagen"}
            />
          )}

          <button
            className="popupImage__close-button"
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
          >
            <img src="/images/close-icon.svg" alt="" />
          </button>
        </div>
        <p className="popupImage__caption">{card?.name || ""}</p>
      </div>
    </div>
  );
}