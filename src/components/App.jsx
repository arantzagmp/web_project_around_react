
import { useState, useEffect } from "react";
import { Header } from "./Header/Header.jsx";
import { Main } from "./Main/Main.jsx";
import { Footer } from "./Footer/Footer.jsx";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error("Error al cargar el usuario:", err));

    api.getCards() 
      .then((cardsData) => setCards(cardsData))
      .catch((err) => console.error("Error cargando tarjetas:", err));
  }, []);

  const handleOpenPopup = (cfg) => setPopup(cfg);
  const handleClosePopup = () => setPopup(null);

  const handleUpdateUser = async (data) => {
    try {
      const newData = await api.updateUserInfo(data);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (err) {
      console.error("Error al actualizar el usuario:", err);
    }
  };

  const handleUpdateAvatar = async ({ avatar }) => {
    try {
      const newData = await api.updateAvatar({ avatar });
      setCurrentUser(newData);
      handleClosePopup();
    } catch (err) {
      console.error("Error al actualizar avatar:", err);
    }
  };

  const handleCardLike = async (card) => {
    const isLiked =
      card?.isLiked ??
      card?.likes?.some((u) => u._id === currentUser?._id) ??
      false;

    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error("Error al cambiar like:", error);
    }
  };

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error("Error al eliminar tarjeta:", error);
    }
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
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

export default App;
