import { useLocation } from 'react-router-dom';
import { MOVIES_API_BASE_URL } from '../../utils/constants';

function MoviesCard(props) {
  const location = useLocation();

  function getDurationMovie(duration) {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
  }

  function handleSaveMovie() {
    if (props.isSaved) {
      props.handleDeleteMovie(
        props.savedMovies.find(
          movie => movie.movieId === props.card.id || movie.movieId === props.card.movieId
        )
      );
    } else {
      props.handleSaveMovie(props.card);
    }
  }

  function handleDeleteMovie() {
    props.handleDeleteMovie(props.card);
  }

  return (
    <li className="card">
      <a href={props.card.trailerLink} target="_blank" rel="noreferrer">
        <img
          src={
            props.isSavedMovies
              ? props.card.image
              : `${MOVIES_API_BASE_URL}/${props.card.image.url}`
          }
          alt={props.card.nameRU}
          className="card__image"
        />
      </a>
      <div className="card__container">
        <div className="card__element">
          <h2 className="card__title">{props.card.nameRU || props.card.nameEN}</h2>
          <div className="card__button">
            {location.pathname === '/saved-movies' ? (
              <button
                className="card__saved-button card__saved-button_delete"
                type="button"
                onClick={handleDeleteMovie}
              />
            ) : (
              <button
                className={`card__saved-button card__saved-button${
                  props.isSaved ? '_active' : '_inactive'
                }`}
                type="button"
                onClick={handleSaveMovie}
              />
            )}
          </div>
        </div>
        <p className="card__duration">{getDurationMovie(props.card.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
