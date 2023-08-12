import logo from '../images/logo.svg';
import React from 'react';

export default function Header({children , loggedIn}) {

    const [mobileMenuOpen, setMobileMenu] = React.useState('false');

    const handleHamburgerClick = () => {
        setMobileMenu(!mobileMenuOpen);
    }

    return (
        <header className={`header ${ loggedIn ? 'header-mobile' : ''}`}>
            <img src={logo} alt="Around The U.S. logo" className="header__logo" />
            {loggedIn ? <button className={`header__menu-btn ${ mobileMenuOpen ? 'header__menu-btn_active' : ''}`} type="button" onClick={handleHamburgerClick}></button> : ''}
            <div className={`header__details ${ mobileMenuOpen ? 'header__details-mobile_active' : ''} ${ loggedIn ? 'header__details-mobile' : ''}`}>
            {children}
            </div>
        </header>
    )
}