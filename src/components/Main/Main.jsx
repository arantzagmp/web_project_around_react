import { useState, useContext } from "react";
import "../../index.css";
import Popup from "../Popup/Popup";
import ImagePopup from "../Popup/ImagePopup";
import Card from "../Card";

import NewCardForm from "../Popup/NewCard";
import EditProfileForm from "../Popup/EditProfileForm";
import EditAvatarForm from "../Popup/EditAvatarForm";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export function Main({ popup, onOpenPopup, onClosePopup, cards, onCardLike, onCardDelete }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCardForm /> };
  const editProfilePopup = { title: "Editar perfil", children: <EditProfileForm /> };
  const editAvatarPopup = { title: "Cambiar foto de perfil", children: <EditAvatarForm /> };

  function handleOpenImage(card) {
    const imageObj = card.image ? card : { name: card.name, image: card.link, id: card._id };
    setSelectedCard(imageObj);
    setIsImageOpen(true);
  }
  function handleCloseImage() {
    setIsImageOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <div className="profile__segment">
        <div className="profile__avatar-wrap">
          <img
            src={currentUser?.avatar || "/images/Avatar.svg"}
            alt="avatar"
            className="profile__avatar"
          />
          <button
            className="profile__avatar-edit-button"
            type="button"
            aria-label="Editar avatar"
            onClick={() => onOpenPopup(editAvatarPopup)}
          >
            <img src="/images/edit__button.svg" alt="Editar avatar" />
          </button>
        </div>

        <div className="profile__info">
          <h3 className="profile__name">{currentUser?.name || "..."}</h3>
          <button
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          >
            <img src="/images/edit__button.svg" alt="edit button" className="profile__edit-icon" />
          </button>
          <p className="profile__subtitle">{currentUser?.about || "..."}</p>
        </div>
      </div>

      <button
        className="profile__add-button"
        style={{ background: "none" }}
        type="button"
        onClick={() => onOpenPopup(newCardPopup)}
      >
        <img src="/images/add__button.svg" alt="botón para agregar" />
      </button>

      <ul className="elements">
        {cards.map((c) => {
          const isLiked = c.likes?.some((u) => u._id === currentUser?._id) || false;
          const cardWithIsLiked = { ...c, isLiked }; 
          return (
            <Card
              key={c._id}
              card={cardWithIsLiked}
              isLiked={isLiked}
              handleOpenPopup={handleOpenImage}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </ul>

      <Popup onClose={onClosePopup} title={popup?.title} isOpen={Boolean(popup)}>
        {popup?.children}
      </Popup>

      <ImagePopup card={selectedCard} isOpen={isImageOpen} onClose={handleCloseImage} />
    </>
  );
}

