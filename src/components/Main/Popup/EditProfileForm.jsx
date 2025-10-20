import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function EditProfileForm() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name ?? "");
      setDescription(currentUser.about ?? "");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form className="popup__form" name="profile-form" id="edit-profile-form" noValidate onSubmit={handleSubmit}>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="owner-name"
          maxLength="40"
          minLength="2"
          name="userName"
          placeholder="Name"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>

      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="About me"
          required
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Save
      </button>
    </form>
  );
}
