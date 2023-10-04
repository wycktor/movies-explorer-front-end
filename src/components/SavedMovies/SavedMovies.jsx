import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import cards from '../../utils/constants';

function SavedMovies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="main">
        <SearchForm />
        <MoviesCardList cards={cards} buttonAddCards={true} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
