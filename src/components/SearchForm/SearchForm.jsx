import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchLogo from '../../images/search.svg';

function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          autoComplete="off"
          required
        />
        <button className="search-form__submit" type="submit">
          <img className="search-form__logo" src={searchLogo} alt="Логотип поиска" />
        </button>
      </div>
      <div className="search-form__switch">
        <FilterCheckbox />
        <p className="search-form__short-films">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
