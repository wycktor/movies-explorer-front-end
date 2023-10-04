import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = props => {
  const [savedMovie, setSaved] = useState(false);

  function handleSaved() {
    setSaved(!savedMovie);
  }

  const location = useLocation();

  return (
    <li className="card">
      <img className="card__image" src={props.card.image} alt={props.card.title} />
      <div className="card__container">
        <div className="card__element">
          <h2 className="card__title">{props.card.title}</h2>
          <div className="card__button">
            {location.pathname === '/saved-movies' ? (
              <button className="card__saved-button card__saved-button_delete" type="button" />
            ) : (
              <button
                className={`card__saved-button card__saved-button${
                  savedMovie ? '_active' : '_inactive'
                }`}
                type="button"
                onClick={handleSaved}
              />
            )}
          </div>
        </div>
        <p className="card__duration">{props.card.duration}</p>
      </div>
    </li>
  );
};

export default MoviesCard;
