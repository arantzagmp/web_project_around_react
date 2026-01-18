import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([user, cardsFromApi]) => {
        setCurrentUser(user);
        setCards(cardsFromApi);
      })
      .catch((err) => {
        console.error("Inicialización fallida:", err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleOpenPopup = (popupConfig) => setPopup(popupConfig);
  const handleClosePopup = () => setPopup(null);

  const handleUpdateUser = ({ name, about }) => {
    return api
      .setUserInfo({ name, about })
      .then((updated) => {
        setCurrentUser(updated);
        handleClosePopup();
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    return api.setUserAvatar({ avatar }).then((updated) => {
      setCurrentUser(updated);
      handleClosePopup();
    });
  };

  const handleAddCard = ({ name, link }) => {
    return api.addCard({ name, link }).then((newCard) => {
      setCards((prev) => [newCard, ...prev]);
      handleClosePopup();
    });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes?.some((u) => u._id === currentUser?._id);
    return api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((updatedCard) => {
        setCards((prev) => prev.map((c) => (c._id === card._id ? updatedCard : c)));
      });
  };

  const handleCardDelete = (card) => {
    return api.deleteCard(card._id).then(() => {
      setCards((prev) => prev.filter((c) => c._id !== card._id));
    });
  };

  const ctx = {
    currentUser,
    handleUpdateUser,
    handleUpdateAvatar,
    handleAddCard,
  };

  return (
    <CurrentUserContext.Provider value={ctx}>
      <div className="page">
        <Header />
        <Main
          isLoading={isLoading}
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
