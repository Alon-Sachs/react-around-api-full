import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.owner === currentUser._id;
    const cardDeleteButtonClassName = `card__icon-bin ${isOwn ? 'card__icon-bin_visible' : 'card__icon-bin_hidden'}`;

    const isLiked = props.likes.some(user => user._id === currentUser._id);
    const cardLikeButtonClassName = `card__icon ${isLiked ? 'card__icon_active' : ''}`;
    function handleClick() {
        props.onCardClick(props.name, props.link);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card._id);
    }

    return (
        <div className="card" >
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <img className="card__img" src={props.link} onClick={handleClick} alt={props.name} />
            <div className="card__infobar">
                <h2 className="card__title">{props.name}</h2>
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                <span className="card__likes-counter">{props.likes.length}</span>
            </div>
        </div>
    )
}