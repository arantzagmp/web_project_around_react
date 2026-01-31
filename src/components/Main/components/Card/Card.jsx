import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card({ card, onCardLike, onCardDelete, handleOpenPopup }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = card.likes?.some((u) => u._id === currentUser?._id);

  const ownerId = typeof card.owner === "string" ? card.owner : card.owner?._id;
  const isOwn = ownerId === currentUser?._id;

  const likeButtonClassName = `element__like ${isLiked ? "element__like_active" : ""}`;
  const deleteButtonClassName = `element__trash ${isOwn ? "" : "element__trash_hidden"}`;

  return (
    <li className="element">
      <button
        className={deleteButtonClassName}
        type="button"
        aria-label="Delete"
        onClick={() => onCardDelete(card)}
      />

      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={() => handleOpenPopup(card)}
      />

      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>

        <button
          className={likeButtonClassName}
          type="button"
          aria-label="Like"
          onClick={() => onCardLike(card)}
        />
      </div>
    </li>
  );
}
