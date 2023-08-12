import React from 'react';
import Form from './Form';
import InfoToolTip from './InfoToolTip';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {

    const [details, setDetails] = React.useState({ email: '', password: '' });

    function handleChange(e) {
        const { name, value } = e.target;
        setDetails({ ...details,
            [name]: value,
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = details;
        onRegister(email, password)
    };

    return (
        <div className="register" >
            <h1 className="register__title">Sign up</h1>
            <Form name="register"
                buttonText="Sign up"
                onSubmit={handleSubmit}
                formClass="register__form form"
                submitButtonClass="register__form-submit form__submit">
                <input onChange={handleChange} value={details.email} required id="register__form-email" type="email" name="email"
                    className="register__form-input register__form-email" placeholder="Email" />
                <span className="popup__input-error email-input-error">.</span>
                <input onChange={handleChange} value={details.password} required id="register__form-password" type="password" name="password"
                    className="register__form-input register__form-password" placeholder="Password" />
                <span className="popup__input-error email-input-error">.</span>
            </Form>
            <Link to="/signin" className="login__signup-link">Already a member? Log in here!</Link>
            <InfoToolTip />
        </div>
    )
}
