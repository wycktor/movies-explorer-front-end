import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchLogo from '../../images/search.svg';

function SearchForm(props) {
  const { pathname } = useLocation();
  const [search, setSearch] = useState('');
  const [isDisable, setisDisable] = useState(false);

  useEffect(() => {
    if (pathname === '/movies') {
      setSearch(localStorage.getItem('movieSearch'));
    }
  }, [pathname]);

  useEffect(() => {
    if (search === null || search === '') {
      setisDisable(true);
    } else {
      setisDisable(false);
    }
  }, [search]);

  function handleChangeInput(evt) {
    setSearch(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (search === '') {
      props.handleSearchMovies(search);
    } else {
      props.handleSearchMovies(search);
    }
  }

  return (
    <section className="search-form">
      <form
        className="search-form__container"
        name="search-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className="search-form__input"
          type="text"
          name="movie"
          value={search || ''}
          onChange={handleChangeInput}
          placeholder="Фильм"
          autoComplete="off"
          required
        />
        <button className="search-form__submit" type="submit" disabled={isDisable}>
          <img className="search-form__logo" src={searchLogo} alt="Логотип поиска" />
        </button>
      </form>
      <div className="search-form__switch">
        <FilterCheckbox
          handleShortMovies={props.handleShortMovies}
          isShortMovies={props.isShortMovies}
        />
        <p className="search-form__short-films">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
