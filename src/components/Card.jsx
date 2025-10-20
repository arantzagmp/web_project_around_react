import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, isLiked, handleOpenPopup, onCardDelete, onCardLike }) {
  if (!card) return null;

  const { currentUser } = useContext(CurrentUserContext);

  const imageComponent = { id: card._id, name: card.name, image: card.link };

 const cardLikeButtonClassName = `element__like ${
  isLiked ? "element__like_active" : ""
}`;

  const isOwn = currentUser?._id && card?.owner?._id === currentUser._id;

  function handleLikeClick() {
    onCardLike?.(card);
  }

  function handleDeleteClick() {
    onCardDelete?.(card);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={() => handleOpenPopup(imageComponent)}
      />

      {isOwn && (
  <button className="icon__trash" type="button" onClick={handleDeleteClick}>
    <img src="/images/Trash.svg" alt="Eliminar" />
  </button>
)}

      <div className="element__footer">
        <p className="element__name">{card.name}</p>
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Me gusta"
          aria-pressed={isLiked}
          onClick={handleLikeClick}
        >
          <img src="/images/heart.svg" alt="corazón" />
        </button>
        <span className="element__like-count">{card.likes?.length ?? 0}</span>
      </div>
    </div>
  );
}


