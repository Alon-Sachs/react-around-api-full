import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function DeletePlacePopup({ isOpen, onClose, onDeletePlace , buttonText}) {

    function handleSubmit(e) {
        e.preventDefault();

        onDeletePlace();
    }

    return (
        <PopupWithForm name="delete" title="Are you sure?" buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
    )
}