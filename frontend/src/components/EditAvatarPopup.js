import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar , buttonText}) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });

        avatarRef.current.value = "";
    }

    return (
        <PopupWithForm name="avatar" title="Change profile picture" isOpen={isOpen} onClose={onClose} buttonText={buttonText} onSubmit={handleSubmit}>
            <input required id="avatar-input" type="url" name="avatar" ref={avatarRef}
                className="form__input popup__form-url" placeholder="Avatar Link" />
            <span className="popup__input-error avatar-input-error">.</span>
        </PopupWithForm>
    )
}