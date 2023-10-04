import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { INFO_MESSAGES } from '../../utils/constants';
import * as mainApi from '../../utils/MainApi';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isEditUser, setIsEditUser] = useState(false);
  const [isUpdatedUser, setisUpdatedUser] = useState(false);
  const [isSuccessMessage, setSuccessMessage] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();

  let isLoggedIn = false;
  
  if (loggedIn) {
    localStorage.setItem('jwt', loggedIn);
  }

  if (localStorage.getItem('jwt')) {
    isLoggedIn = true;
  }

  useEffect(() => {
    mainApi
      .getUserInfo()
      .then(user => {
        setCurrentUser(user);
        setLoggedIn(true);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getSavedMovies()
        .then(savedMovies => {
          setSavedMovies(savedMovies.reverse());
        })
        .catch(err => handleInfoTooltipOpen(err.message));
    }
  }, [isLoggedIn]);

  function handleInfoTooltipOpen(message, isSuccessMessage = false) {
    setSuccessMessage(isSuccessMessage);
    setInfoMessage(message);
    setInfoTooltipOpen(true);
  }

  function handleInfoTooltipClose() {
    setInfoTooltipOpen(false);
  }

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch(err => handleInfoTooltipOpen(err.message));
  }

  function handleLogin(email, password) {
    mainApi
      .login(email, password)
      .then(data => {
        setCurrentUser(data.user);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch(err => handleInfoTooltipOpen(err.message));
  }

  function handleSignOut() {
    mainApi
      .logout()
      .then(res => {
        if (res.message === 'Выход из аккаунта прошел успешно') {
          setCurrentUser({});
          setLoggedIn(false);
          navigate('/', { replace: true });
          localStorage.clear();
        }
      })
      .catch(err => handleInfoTooltipOpen(err.message));
  }

  function handleUpdateUser(name, email) {
    mainApi
      .updateUserInfo(name, email)
      .then(data => {
        setCurrentUser(data);

        setisUpdatedUser(true);
        setIsEditUser(false);

        handleInfoTooltipOpen(INFO_MESSAGES.SUCCESS_UDATE_PROFILE, true);
      })
      .catch(err => handleInfoTooltipOpen(err.message));
  }

  function handleDeleteMovie(movie) {
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        setSavedMovies(movies => movies.filter(item => item._id !== movie._id));
      })
      .catch(err => handleInfoTooltipOpen(err.message));
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, loggedIn }}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={isLoggedIn} />} />
          <Route path="/signup" element={<Register onSubmit={handleRegister} />}></Route>
          <Route path="/signin" element={<Login onSubmit={handleLogin} />}></Route>
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                handleInfoTooltipOpen={handleInfoTooltipOpen}
                handleDeleteMovie={handleDeleteMovie}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                handleDeleteMovie={handleDeleteMovie}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={isLoggedIn}
                isEditUser={isEditUser}
                setIsEditUser={setIsEditUser}
                isUpdatedUser={isUpdatedUser}
                setisUpdatedUser={setisUpdatedUser}
                infoTooltipClose={handleInfoTooltipClose}
                onUpdate={handleUpdateUser}
                onSignOut={handleSignOut}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {isInfoTooltipOpen && (
          <InfoTooltip
            infoMessage={infoMessage}
            isSuccess={isSuccessMessage}
            onClick={handleInfoTooltipClose}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
