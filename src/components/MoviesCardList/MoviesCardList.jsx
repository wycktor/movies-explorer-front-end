import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = props => {
  const [isLoading, setLoading] = useState(false);

  function handleAddCards() {
    setLoading(true);
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        {props.cards.map(card => (
          <MoviesCard key={card.id} card={card} />
        ))}
      </ul>

      {isLoading ? (
        <Preloader />
      ) : (
        <div className="movies__button-container">
          {props.buttonAddCards && (
            <button className="movies__button" type="button" name="button" onClick={handleAddCards}>
              Ещё
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;
