import React from "react";

export default function ImagePopup({ isOpen, card, onClose }) {
  if (!isOpen || !card) return null;
  return (
    <div className={`popupImage ${isOpen ? "popupImage_opened" : ""}`} role="dialog" aria-modal="true">
      <div className="popupImage__container">
        <img className="popupImage__image" src={card.link} alt={card.name || "Imagen"} />
        <p className="popupImage__caption">{card.name}</p>
        <button
          className="popupImage__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        />
      </div>
    </div>
  );
}