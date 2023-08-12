export default function Popup({ isOpen, onClose, name, btnPosition, children }) {


    return (
        <div className={`popup ${name}-popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className={`${name}-popup__close-btn popup__close-btn ${btnPosition ? btnPosition : ""}`} type="button" onClick={onClose} />
                {children}
            </div>
        </div>
    )
}