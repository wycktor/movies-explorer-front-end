import { useState, useEffect } from 'react';

import * as mainApi from '../../utils/MainApi';
import { getAllMovies } from '../../utils/MoviesApi';
import { onFilterMoviesDuration, onShortMovies, onFilterMovies } from '../../utils/constants';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [foundShortMovies, setFoundShortMovies] = useState([]);
  const [filterName, setfilterName] = useState('');

  useEffect(() => {
    if (localStorage.getItem('moviesList')) {
      const movies = JSON.parse(localStorage.getItem('moviesList'));
      setInitialMovies(movies);
      localStorage.getItem('shortMoviesCheckbox') === 'true'
        ? setFoundShortMovies(onFilterMoviesDuration(movies))
        : setFoundShortMovies(movies);
    }
  }, []);

  useEffect(() => {
    localStorage.getItem('movieSearch')
      ? foundShortMovies.length === 0
        ? setIsNotFound(true)
        : setIsNotFound(false)
      : setIsNotFound(false);
  }, [foundShortMovies]);

  useEffect(() => {
    localStorage.getItem('shortMoviesCheckbox') === 'true'
      ? setIsShortMovies(true)
      : setIsShortMovies(false);
  }, []);

  function handleGetMovies(search) {
    getAllMovies()
      .then(data => {
        handleSearchSubmit(data, search, isShortMovies);
        setIsError(false);
      })
      .catch(err => props.handleInfoTooltipOpen(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then(item => {
        props.setSavedMovies([item, ...props.savedMovies]);
      })
      .catch(err => props.handleInfoTooltipOpen(err.message));
  }

  function handleSearchSubmit(movies, searchName, isShort) {
    const moviesList = onFilterMovies(movies, searchName);

    moviesList.length === 0 ? setIsNotFound(true) : setIsNotFound(false);

    setfilterName(searchName);
    setInitialMovies(moviesList);
    setFoundShortMovies(isShort ? onFilterMoviesDuration(moviesList) : moviesList);

    localStorage.setItem('movies', JSON.stringify(movies));
    localStorage.setItem('moviesList', JSON.stringify(moviesList));
  }

  function handleSearchMovies(search) {
    localStorage.setItem('movieSearch', search);
    localStorage.setItem('shortMoviesCheckbox', isShortMovies);

    if (localStorage.getItem('movies')) {
      handleSearchSubmit(JSON.parse(localStorage.getItem('movies')), search, isShortMovies);
    } else {
      setIsLoading(true);
      handleGetMovies(search);
    }
  }

  function handleShortMovies() {
    onShortMovies(initialMovies, isShortMovies, setIsShortMovies, setFoundShortMovies);
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm
          isShortMovies={isShortMovies}
          handleSearchMovies={handleSearchMovies}
          handleShortMovies={handleShortMovies}
        />
        <MoviesCardList
          cards={foundShortMovies}
          filterName={filterName}
          savedMovies={props.savedMovies}
          isSavedMovies={false}
          isLoading={isLoading}
          isError={isError}
          isNotFound={isNotFound}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={props.handleDeleteMovie}
          buttonAddCards={true}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
