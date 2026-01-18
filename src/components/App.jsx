import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function App() {
  // Keep currentUser as an object for predictable context shape
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([user, cardsFromApi]) => {
        setCurrentUser(user);
        setCards(cardsFromApi);
      })
      .catch((err) => {
        console.error("Inicialización fallida:", err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdateUser = ({ name, about }) => {
    return api
      .setUserInfo({ name, about })
      .then((updated) => setCurrentUser(updated));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    return api.updateAvatar({ avatar }).then((updated) => setCurrentUser(updated));
  };

  const handleAddCard = ({ name, link }) => {
    return api.addCard({ name, link }).then((newCard) => {
      setCards((prev) => [newCard, ...prev]);
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
