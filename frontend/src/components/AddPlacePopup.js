import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameInput(e) {
        setName(e.target.value);
    }

    function handleLinkInput(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link
        });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm name="card" title="New Place" isOpen={isOpen} onClose={onClose} buttonText="Create" onSubmit={handleSubmit}>
            <input id="title-input" type="text" name="title" value={name} className="card-popup__form-title form__input"
                placeholder="Title" required minLength="1" maxLength="30" onChange={handleNameInput} />
            <span className="popup__input-error title-input-error">.</span>
            <input id="url-input" type="url" name="link" value={link} className="card-popup__form-link form__input"
                placeholder="Image URL" required onChange={handleLinkInput} />
            <span className="popup__input-error url-input-error">.</span>
        </PopupWithForm>
    )
}