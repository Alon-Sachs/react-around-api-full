export default function ImagePopup(props) {

    return (
        <div className={`popup img-popup ${props.card.isOpen ? 'popup_opened' : ''}`}>
            <div className="img-popup__container">
                <button className="img-popup__close-btn popup__close-btn" type="button" onClick={props.onClose}></button>
                <img className="img-popup__img" src={props.card.link} alt={props.card.name} />
                <h4 className="img-popup__title">{props.card.name}</h4>
            </div>
        </div>
    )
}