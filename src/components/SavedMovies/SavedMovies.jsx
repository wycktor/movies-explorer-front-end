import { useEffect, useState } from 'react';
import { onFilterMoviesDuration, onShortMovies, onFilterMovies } from '../../utils/constants';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  const [isSearch, setIsSearch] = useState('');
  const [foundShortMovies, setFoundShortMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    foundShortMovies.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
  }, [foundShortMovies]);

  useEffect(() => {
    const newMoviesList = onFilterMovies(props.savedMovies, isSearch);
    isShortMovies
      ? setFoundShortMovies(onFilterMoviesDuration(newMoviesList))
      : setFoundShortMovies(newMoviesList);
  }, [props.savedMovies, isShortMovies, isSearch]);

  function handleShortMovies() {
    onShortMovies(props.savedMovies, isShortMovies, setIsShortMovies, setFoundShortMovies);
  }

  function handleSearchMovies(search) {
    setIsSearch(search);
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="main">
        <SearchForm handleSearchMovies={handleSearchMovies} handleShortMovies={handleShortMovies} />
        <MoviesCardList
          savedMovies={props.savedMovies}
          cards={foundShortMovies}
          isSavedMovies={true}
          isNotFound={isNotFound}
          handleDeleteMovie={props.handleDeleteMovie}
          buttonAddCards={true}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
