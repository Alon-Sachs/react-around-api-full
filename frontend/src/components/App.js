import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProtectedRoute';
import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth.js';

function App() {

    const page = React.useRef();

    function handleSubmit(request) {
        setIsLoading(true);
        request()
            .then(closeAllPopups)
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }

    const handleEditAvatarClick = () => {
        setAvatarPopup(true);
        addClosePopupListeners();
    }

    const handleEditProfileClick = () => {
        setProfilePopup(true);
        addClosePopupListeners();
    }

    const handleAddPlaceClick = () => {
        setPlacePopup(true);
        addClosePopupListeners();
    }

    const handleDeleteIconClick = (card) => {
        setCurrentCard(card);
        setDeletePlacePopup(true);
        addClosePopupListeners();
    }

    const handleCardClick = (cardName, cardLink) => {
        setSelectedCard({
            name: cardName,
            link: cardLink,
            isOpen: true
        })
        addClosePopupListeners();
    }

    function handleUpdateUser({ name, about }) {
        function makeRequest() {
            return api.editUserInformation({ name, about }).then((res) => {
                console.log(res);
                setCurrentUser(res);
            });
        }
        handleSubmit(makeRequest);
    }

    function handleUpdateAvatar({ avatar }) {
        function makeRequest() {
            return api.editProfilePicture({ avatar }).then((res) => setCurrentUser(res));
        }
        handleSubmit(makeRequest);
    }

    function handleAddPlaceSubmit({ name, link }) {
        function makeRequest() {
            return api.addNewCard({ name, link }).then((res) => setCards([res, ...cards]));
        }
        handleSubmit(makeRequest);
    }

    function handleCardLike(card) {

        const isLiked = card.likes.some(user => user._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
            })
            .catch(err => console.log(err))
    }

    function handleCardDelete() {
        function makeRequest() {
            return api.deleteCard(currentCard).then((oldCard) => setCards((state) => state.filter((card) => card._id !== currentCard)));
        }
        handleSubmit(makeRequest);
    }

    function addClosePopupListeners() {
        page.current.addEventListener("mousedown", handleMouseClickClose);
        page.current.addEventListener("keydown", handleEscClose);
    }

    function handleMouseClickClose(e) {
        if (e.target.classList.contains("popup_opened"))
            closeAllPopups();
    }

    function handleEscClose(e) {
        if (e.key === "Escape")
            closeAllPopups();
    }

    function handleLogin(email, password) {
        auth.login(email, password)
            .then((res) => {
                setUserEmail(email);
                localStorage.setItem('jwt', res.token);
                setLoggedIn(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleRegister(email, password) {
        auth.register(email, password)
            .then((res) => {
                setTooltipType(true);
                setTooltipPopup(true);
            })
            .catch(err => {
                console.log(err);
                setTooltipType(false);
                setTooltipPopup(true);
            });
    }

    function handleSignout() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setJwt("");
        api.addJwtToHeaders("");
    }

    const closeAllPopups = () => {
        setPlacePopup(false);
        setProfilePopup(false);
        setAvatarPopup(false);
        setDeletePlacePopup(false);
        setTooltipPopup(false);
        setSelectedCard({
            name: "",
            link: "",
            isOpen: false,
        });
        page.current.removeEventListener("mousedown", handleMouseClickClose);
        page.current.removeEventListener("keydown", handleEscClose);
    }

    const [cards, setCards] = React.useState([]);
    const [isLoggedIn, setLoggedIn] = React.useState(false);
    const [currentCard, setCurrentCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [userEmail, setUserEmail] = React.useState('');
    const [isEditProfilePopupOpen, setProfilePopup] = React.useState(false);
    const [isAddPlacePopupOpen, setPlacePopup] = React.useState(false);
    const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
    const [isDeletePlacePopupOpen, setDeletePlacePopup] = React.useState(false);
    const [isTooltipPopupOpen, setTooltipPopup] = React.useState(false);
    const [tooltipType, setTooltipType] = React.useState(true);
    const [selectedCard, setSelectedCard] = React.useState({
        name: "",
        link: "",
        isOpen: false,
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [jwt, setJwt] = React.useState("");

    React.useEffect(() => {
        api.getUserInformation()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch(err => console.log(err));
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch(err => console.log(err));
    }, [])

    React.useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    setLoggedIn(true);
                    setUserEmail(res.data.email);
                    setJwt(token);
                    api.addJwtToHeaders(jwt);
                })
                .catch(err => console.log(err));
        }
    }, [jwt])

    return (
        <div className="page" ref={page}>
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <ProtectedRoute loggedIn={isLoggedIn} exact path="/">
                        <Header loggedIn={isLoggedIn}>
                            <a className='header__email'>{userEmail}</a>
                            <a onClick={handleSignout} className='header__button header__button-signout'>Log out</a>
                        </Header>
                        <Main
                            onEditProfileClick={handleEditProfileClick}
                            onAddPlaceClick={handleAddPlaceClick}
                            onEditAvatarClick={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleDeleteIconClick}
                        />
                        <Footer></Footer>
                        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} buttonText={isLoading ? 'Saving...' : 'Save'} />
                        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} buttonText={isLoading ? 'Saving...' : 'Save'} />
                        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} buttonText={isLoading ? 'Saving...' : 'Create'} />
                        <DeletePlacePopup isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} onDeletePlace={handleCardDelete} buttonText={isLoading ? 'Deleting...' : 'Yes'} />
                        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                    </ProtectedRoute>
                    <Route exact path="/signin">
                        <Header loggedIn={isLoggedIn}>
                            <Link to='/signup' className='header__button'>Sign up</Link>
                        </Header>
                        {isLoggedIn ? <Redirect to={"/"} /> : <Login onLogin={handleLogin} />}
                    </Route>
                    <Route exact path="/signup">
                        <Header loggedIn={isLoggedIn}>
                            <Link to='/signin' className='header__button'>Sign in</Link>
                        </Header>
                        {isLoggedIn ? (
                            <Redirect to="/" />
                        ) : (
                            <Register onRegister={handleRegister} />
                        )}
                        <InfoToolTip isOpen={isTooltipPopupOpen} onClose={closeAllPopups} type={tooltipType} />
                    </Route>
                    <Route path="/">
                        {isLoggedIn ? <Redirect to={"/"} /> : <Redirect to={"/signin"} />}
                    </Route>
                </Switch>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
