import React from 'react';
import AvatarHover from '../images/profile/profile__image-hover.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



export default function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__img-container" onClick={props.onEditAvatarClick}>
                    <img alt="Profile picture" className="profile__img" src={currentUser.avatar} />
                    <div className="profile__img-overlay">
                        <img src={AvatarHover} alt="edit Image"
                            className="profile__img-icon" />
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__info-name">{currentUser.name}</h1>
                    <button className="profile__info-btn" type="button" onClick={props.onEditProfileClick}></button>
                    <p className="profile__info-job">{currentUser.about}</p>
                </div>
                <button className="profile__add-btn" type="button" onClick={props.onAddPlaceClick}></button>
            </section>
            <section className="cards">
                {props.cards.length > 0 && props.cards.map(card => (
                    <Card
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        onCardClick={props.onCardClick}
                        key={card._id}
                        owner={card.owner._id}
                        onCardLike={props.onCardLike}
                        card={card}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    )
}