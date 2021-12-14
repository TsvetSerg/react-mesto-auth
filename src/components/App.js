// import logo from '../logo.svg';
import '../index.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer';
import React from "react";
import ImagePopup from './ImagePopup'
import apiClass from './utils/Api'
import CurrentUserContext from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Register from './Register';
import { Route, Switch, Redirect, useHistory, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as Auth from './utils/Auth';
import InfoTooltip from './InfoTooltip';

function App() {


  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCard, setCurrentCard] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoUser, setInfoUser] = React.useState('')
  const [confirmation, setConfirmation] = React.useState(false)
  const [error, setError] = React.useState(false)
  const history = useHistory();

  React.useEffect(() => {
    handelTokenCheck();
    Promise.all([apiClass.getInfoUser(), apiClass.getInitialCards()])
      .then(([info, cards]) => {
        setCurrentUser(info)
        setCurrentCard(cards)
      })
      .catch((err) => {
        console.log(err);
      })
    }, [])



  function handelConfirmation() {
    setConfirmation(true)
  }

  function handelTokenCheck() {         // Проверяем и сохроняем токен
    const token = localStorage.getItem('token');
    if (token) {
      Auth.getToken(token)
      .then((getInfo) => {
        setLoggedIn(true);
        history.push('/')
        return setInfoUser(getInfo)
      })
    }
  }

  function handelTokenRemove() {        // Функция выхода из аккаунта
    localStorage.removeItem('token');
    setLoggedIn(false)
    history.push('/')
  }

  function handelLogin() {
    setLoggedIn(true)
  }


  function handleCardLike(card) {                 // Функуция поосстановки лайков
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      apiClass.putLikeCard(card._id)
    .then((newCard) => {
      setCurrentCard((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
    } else {
      apiClass.deleteLikeCard(card._id)
      .then((newCard) => {
        setCurrentCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  function handleCardDelete(card) {             // Функция удаления карточки
    apiClass.deleteCard(card._id)
    .then(() => {
      setCurrentCard((state) => state.filter((c) => c._id !== card._id ))
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateUser(data) {
    apiClass.patchInfoUser(data)
    .then((info) => {
      setCurrentUser(info)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }


  function handleUpdateAvatar(data) {
    Promise.resolve(apiClass.patchNewAvatar(data))
    .then((info) => {
      setCurrentUser(info)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlaceSubmit(data) {
    apiClass.postNewCard(data)
    .then((card) => {
      setCurrentCard([card, ...currentCard])
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function openAddPopup() {
    setIsAddPlacePopupOpen(true)
  }
  function openProfilePopup() {
    setIsEditProfilePopupOpen(true)
  }
  function openAvatarPopup() {
    setIsEditAvatarPopupOpen(true)
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({name: '', link: ''})
    setConfirmation(false)
    // setError({image: '', title: ''})
  }

  function handleCardClick(item) {
    setSelectedCard(item)
  }

  function handelErroe() {
    setError(true)
  }

  return (

  <div className="page">

  <Header
    handelTokenRemove = {handelTokenRemove}
    email = {infoUser.email}
    loggedIn = {loggedIn}
  />

  <InfoTooltip
    isOpen = {confirmation}
    onClose = {closeAllPopups}
    errorMassage = {error}
  />

  <Switch>

  <ProtectedRoute
      exact path = "/"
      loggedIn = {loggedIn}
      Component = {(
      <CurrentUserContext.Provider value={currentUser}>



      <Main
        onAddPlace  = {openAddPopup}
        onEditProfile = {openProfilePopup}
        onEditAvatar = {openAvatarPopup}
        onCardClick = {handleCardClick}
        card = {currentCard}
        onCardLike = {handleCardLike}
        onCardDelete = {handleCardDelete}
      />
      <ImagePopup
        card = {selectedCard}
        onClose = {closeAllPopups}
      />
      <AddPlacePopup
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onUpdateCard = {handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar = {handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser = {handleUpdateUser}
      />

      <Footer />

      </CurrentUserContext.Provider>
    )}/>

    <Route path="/sign-in">
      <Login
      handelLogin = {handelLogin}
      handelTokenCheck = {handelTokenCheck}
      />
    </Route>

    <Route path="/sign-up">
      <Register
        handelConfirmation = {handelConfirmation}
        handelErroe = {handelErroe}
      />.
    </Route>


  </Switch>

  </div>
  );
}

export default App;
