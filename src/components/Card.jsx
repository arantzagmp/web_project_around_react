export default function Card({ card, handleOpenPopup, onDelete, onLike }) {
  if (!card) return null;

  const imageComponent = { id: card._id, name: card.name, image: card.link };

  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={() => handleOpenPopup(imageComponent)}
      />

      <button className="icon__trash" type="button" aria-label="Eliminar" onClick={onDelete}>
        <img src="/images/Trash.svg" alt="Eliminar" />
      </button>

      <div className="element__footer">
        <p className="element__name">{card.name}</p>
        <button className="element__like" type="button" aria-label="Me gusta" onClick={onLike}>
          <img src="/images/heart.svg" alt="corazón" />
        </button>
      </div>
    </div>
  );
}

