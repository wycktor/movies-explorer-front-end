import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

function Header(props) {
  const location = useLocation();

  return (
    <header className={`header ${location.pathname === '/' ? 'header__main' : ''}`}>
      <div className="header__container">
        <div className="header__body">
          <Link className="header__link" to="/">
            <img className="header__logo" src={logo} alt="Логотип" />
          </Link>
          {(location.pathname === '/' ||
            location.pathname === '/movies' ||
            location.pathname === '/saved-movies' ||
            location.pathname === '/profile') &&
          props.loggedIn ? (
            <Navigation />
          ) : (
            <nav className="header__nav">
              <Link className="header__title" to="/signup">
                Регистрация
              </Link>
              <Link className="header__title header__title_active" to="/signin">
                Войти
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
