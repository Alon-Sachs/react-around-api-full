import Form from './Form';
import Popup from './Popup';

export default function PopupWithForm({ isOpen, onClose, name, title, buttonText, onSubmit, children }) {


    return (
        <Popup isOpen={isOpen} onClose={onClose} name={name} title={title}>
            <h4 className="popup__title">{title}</h4>
            <Form buttonText={buttonText} name={name} onSubmit={onSubmit} formClass="popup__form form" submitButtonClass="popup__field-submit form__submit">{children}</Form>
        </Popup>
    )
}