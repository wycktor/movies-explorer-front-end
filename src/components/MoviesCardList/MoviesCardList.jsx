import React, { useState, useEffect } from 'react';
import {
  INFO_MESSAGES,
  MOVIES_PAGE_SIZE,
  MOVIES_PER_PAGE_SIZE,
  MOVIES_TO_ADD
} from '../../utils/constants';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const [shownMovies, setShownMovies] = useState(0);

  useEffect(() => {
    handleResizeDesktop();
  }, []);

  useEffect(() => {
    handleResizeDesktop();
  }, [props.filterName]);

  function handleResizeDesktop() {
    if (window.innerWidth >= MOVIES_PAGE_SIZE.DESKTOP_BIG) {
      setShownMovies(MOVIES_PER_PAGE_SIZE.SIZE_DESKTOP_BIG);
    } else if (
      window.innerWidth < MOVIES_PAGE_SIZE.DESKTOP_BIG &&
      window.innerWidth >= MOVIES_PAGE_SIZE.DESKTOP
    ) {
      setShownMovies(MOVIES_PER_PAGE_SIZE.SIZE_DESKTOP);
    } else if (
      window.innerWidth < MOVIES_PAGE_SIZE.DESKTOP &&
      window.innerWidth >= MOVIES_PAGE_SIZE.TABLET
    ) {
      setShownMovies(MOVIES_PER_PAGE_SIZE.SIZE_TABLET);
    } else {
      setShownMovies(MOVIES_PER_PAGE_SIZE.SIZE_MOBILE);
    }
  }

  function handleShowMoreCards() {
    if (window.innerWidth >= MOVIES_PAGE_SIZE.DESKTOP_BIG) {
      setShownMovies(shownMovies + MOVIES_TO_ADD.CARDS_SIZES_DESKTOP);
    } else if (
      window.innerWidth < MOVIES_PAGE_SIZE.DESKTOP_BIG &&
      window.innerWidth >= MOVIES_PAGE_SIZE.DESKTOP
    ) {
      setShownMovies(shownMovies + MOVIES_TO_ADD.CARDS_SIZES_TABLET);
    } else {
      setShownMovies(shownMovies + MOVIES_TO_ADD.CARDS_SIZES_MOBILE);
    }
  }

  function handleSavedStatus(savedMovies, card) {
    return savedMovies.find(savedMovies => savedMovies.movieId === (card.id || card.movieId));
  }

  return (
    <section className="movies">
      {props.isLoading && props.cards.length === 0 && <Preloader />}
      {!props.isLoading && props.isNotFound && (
        <p className="movies__search-error">{INFO_MESSAGES.ERROR_NOT_FOUND}</p>
      )}
      {!props.isLoading && props.isError && (
        <p className="movies__search-error">{INFO_MESSAGES.ERROR_DEFAULT}</p>
      )}
      {!props.isLoading && !props.isError && !props.isNotFound && (
        <>
          <ul className="movies__list">
            {props.cards.slice(0, shownMovies).map(card => (
              <MoviesCard
                card={card}
                key={card.id || card.movieId}
                isSavedMovies={props.isSavedMovies}
                savedMovies={props.savedMovies}
                isSaved={handleSavedStatus(props.savedMovies, card)}
                handleSaveMovie={props.handleSaveMovie}
                handleDeleteMovie={props.handleDeleteMovie}
              />
            ))}
          </ul>
          {props.cards.length > shownMovies && (
            <div className="movies__button-container">
              {props.buttonAddCards && (
                <button
                  className="movies__button"
                  type="button"
                  name="button-more"
                  onClick={handleShowMoreCards}
                >
                  Ещё
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
