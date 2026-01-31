import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [popup, setPopup] = useState(null);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([user, cardsFromApi]) => {
        setCurrentUser(user);
        setCards(cardsFromApi);
      })
      .catch((err) => console.error("Inicialización fallida:", err));
  }, []);

  const handleOpenPopup = (popupData) => setPopup(popupData);
  const handleClosePopup = () => setPopup(null);

const handleUpdateUser = ({ name, about }) => {
  return api
    .updateUserInfo({ name, about })
    .then((updated) => {
      setCurrentUser(updated);
      handleClosePopup();
      return updated;
    })
    .catch(console.error);
};

 const handleUpdateAvatar = ({ avatar }) => {
  return api
  .updateAvatar({ avatar })
  .then((updatedUser) => {
    setCurrentUser(updatedUser);
    handleClosePopup();
    return updatedUser;
  })
  .catch(console.error);
};

  const handleAddCard = ({ name, link }) => {
    return api.addCard({ name, link }).then((newCard) => {
      setCards((prev) => [newCard, ...prev]);
      handleClosePopup();
      return newCard;
    })
    .catch(console.error);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes?.some((u) => u._id === currentUser?._id);
    return api.changeLikeCardStatus(card._id, !isLiked).then((updatedCard) => {
      setCards((prev) => prev.map((c) => (c._id === card._id ? updatedCard : c)));
      return updatedCard;
    })
    .catch(console.error);
  };

  const handleCardDelete = (card) => {
    return api.deleteCard(card._id).then(() => {
      setCards((prev) => prev.filter((c) => c._id !== card._id));
    })
    .catch(console.error);
};

  return (
    <CurrentUserContext.Provider
  value={{
    currentUser,
    handleUpdateUser,
    handleUpdateAvatar,
    handleAddCard
  }}
>
      <div className="page">
        <Header />
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
