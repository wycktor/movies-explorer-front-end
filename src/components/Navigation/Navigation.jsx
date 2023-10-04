import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation(props) {
  const location = useLocation();
  const [isBurger, setBurger] = useState(false);

  const handleBurger = () => {
    setBurger(!isBurger);
  };

  return (
    <div className="navigation">
      <button
        className={`navigation__burger-open ${
          location.pathname === '/'
            ? 'navigation__burger-open_white'
            : 'navigation__burger-open_black'
        }`}
        type="button"
        onClick={handleBurger}
      />
      <aside className={`${isBurger ? 'navigation__menu_active-overlay' : ''}`}>
        <nav className={isBurger ? 'navigation__menu_active' : 'navigation__menu'}>
          <button className="navigation__burger-close" type="button" onClick={handleBurger} />
          <ul className="navigation__list">
            <li className="navigation__item">
              <Link className="navigation__link navigation__link_main" to="/">
                Главная
              </Link>
              <Link
                className={
                  location.pathname === '/movies' ? 'navigation__link_active' : 'navigation__link'
                }
                to="/movies"
              >
                Фильмы
              </Link>
              <Link
                className={
                  location.pathname === '/saved-movies'
                    ? 'navigation__link_active'
                    : 'navigation__link'
                }
                to="/saved-movies"
              >
                Сохранённые фильмы
              </Link>
            </li>
            <li className="navigation__item">
              <Link className="navigation__profile" to="/profile">
                Аккаунт
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Navigation;
