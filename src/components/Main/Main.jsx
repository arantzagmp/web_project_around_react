import { useState } from "react";
import Popup from "./Popup/Popup";          
import ImagePopup from "./Popup/ImagePopup"; 
import Card from "../Card";
import NewCardForm from "../form/NewCard";
import EditAvatar from "../form/EditAvatar";
import EditProfile from "../form/EditProfile";

const cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];

console.log(cards);

export function Main() {
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCardForm /> };
  const editProfilePopup = { title: "Editar perfil", children: <EditProfile /> };
  const editAvatarPopup = { title: "Cambiar foto de perfil", children: <EditAvatar /> };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

function handleOpenImage(card) {
    setSelectedCard({ name: card.name, image: card.link, id: card._id });
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
          <img src="/images/Avatar.svg" alt="avatar" className="profile__avatar" />
          <button
            className="profile__avatar-edit-button"
            type="button"
            aria-label="Editar avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img src="/images/edit__button.svg" alt="Editar avatar" />
          </button>
        </div>

        <div className="profile__info">
          <h3 className="profile__name">Jacques Cousteau</h3>
          <button
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          >
            <img src="/images/edit__button.svg" alt="edit button" className="profile__edit-icon" />
          </button>
          <p className="profile__subtitle">Explorador</p>
        </div>
      </div>

      <button
        className="profile__add-button"
        style={{ background: "none" }}
        type="button"
        onClick={() => handleOpenPopup(newCardPopup)}
      >
        <img src="/images/add__button.svg" alt="botón para agregar" />
      </button>

      <ul className="elements">
  {cards.map((c) => (
    <Card
      key={c._id}
      card={c}
      handleOpenPopup={(img) => handleOpenImage(img)}
      onDelete={() => {}}
      onLike={() => {}}
    />
  ))}
</ul>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      <ImagePopup card={selectedCard} isOpen={isImageOpen} onClose={handleCloseImage} />
    </>
  );
}