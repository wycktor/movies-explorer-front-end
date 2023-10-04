import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleRegister(name, email, password) {
    navigate('/signin', { replace: true });
  }

  function handleLogin(email, password) {
    setLoggedIn(true);
    navigate('/movies', { replace: true });
  }

  function handleSignOut() {
    setLoggedIn(false);
    navigate('/signin', { replace: true });
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Register onSubmit={handleRegister} />}></Route>
        <Route path="/signin" element={<Login onSubmit={handleLogin} />}></Route>
        <Route path="/movies" element={<Movies loggedIn={loggedIn} />} />
        <Route path="/saved-movies" element={<SavedMovies loggedIn={loggedIn} />} />
        <Route
          path="/profile"
          element={<Profile loggedIn={loggedIn} onSignOut={handleSignOut} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
