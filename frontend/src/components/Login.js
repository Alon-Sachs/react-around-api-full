import React from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {

    const [details, setDetails] = React.useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value,
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = details;
        onLogin(email, password);
    };

    return (
        <div className="login" >
            <h1 className="login__title">Log in</h1>
            <Form name="login"
                buttonText="Log in"
                onSubmit={handleSubmit}
                formClass="login__form form"
                submitButtonClass="login__form-submit form__submit">
                <input onChange={handleChange} required id="login__form-email" type="email" name="email"
                    className="login__form-input login__form-email" placeholder="Email" value={details.email}/>
                <span className="popup__input-error email-input-error">.</span>
                <input onChange={handleChange} required id="login__form-password" type="password" name="password"
                    className="login__form-input login__form-password" placeholder="Password" value={details.password}/>
                <span className="popup__input-error email-input-error">.</span>
            </Form>
            <Link to="/signup" className="login__signup-link">Not a member yet? Sign up here!</Link>
        </div>
    )
}
