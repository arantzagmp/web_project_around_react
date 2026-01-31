import { useState, useContext } from "react";
import Popup from "./components/Popup/Popup";
import ImagePopup from "./components/Popup/ImagePopup/ImagePopup";
import Card from "./components/Card/Card";

import NewCardForm from "./components/Popup/NewCard/NewCard";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import EditAvatarForm from "./components/Popup/EditAvatar/EditAvatar";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({ popup, onOpenPopup, onClosePopup, cards, onCardLike, onCardDelete }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);

const { currentUser } = useContext(CurrentUserContext);

const newCardPopup = { title: "Nuevo lugar", children: <NewCardForm onClose={onClosePopup} /> };
const editProfilePopup = { title: "Editar perfil", children: <EditProfile /> };
const editAvatarPopup = { title: "Cambiar foto de perfil", children: <EditAvatarForm onClose={onClosePopup} /> };

  function handleOpenImage(card) {
    setSelectedCard(card);
    setIsImageOpen(true);
  }
  function handleCloseImage() {
    setIsImageOpen(false);
    setSelectedCard(null);
  }

  return (
    <main className="page__content">
      <section className="profile">
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
              <img
                src="/images/edit__button.svg"
                alt="edit button"
                className="profile__edit-button-icon"
              />
            </button>
            <p className="profile__subtitle">{currentUser?.about || "..."}</p>
          </div>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
          style={{ background: "none" }}
        >
          <img src="/images/add__button.svg" alt="botón para agregar" />
        </button>
      </section>

      <ul className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            handleOpenPopup={handleOpenImage}
          />
        ))}
      </ul>

      <Popup onClose={onClosePopup} title={popup?.title} isOpen={Boolean(popup)}>
        {popup?.children}
      </Popup>

      <ImagePopup card={selectedCard} isOpen={isImageOpen} onClose={handleCloseImage} />
    </main>
  );
}

