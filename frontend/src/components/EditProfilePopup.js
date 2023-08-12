import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);


    function handleNameInput(e) {
        setName(e.target.value);
    }

    function handleDescriptionInput(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="profile" title="Edit Profile" isOpen={isOpen} onClose={onClose} buttonText={buttonText} onSubmit={handleSubmit}>
            <input required id="name-input" type="text" name="name" value={name || ''}
                className="form__input popup__form-name" minLength="2" maxLength="40" placeholder="Name" onChange={handleNameInput} />
            <span className="popup__input-error name-input-error">.</span>
            <input required id="job-input" type="text" name="job" value={description  || ''} className="form__input popup__form-job"
                minLength="2" maxLength="200" placeholder="About" onChange={handleDescriptionInput} />
            <span className="popup__input-error job-input-error">.</span>
        </PopupWithForm>
    )
}