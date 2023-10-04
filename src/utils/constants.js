// export const BASE_URL = 'http://localhost:5000';
export const BASE_URL = 'https://api.wycktor.nomoredomainsrocks.ru';
export const MOVIES_API_BASE_URL = 'https://api.nomoreparties.co';

export const REGEXP_EMAIL = '[A-Za-z0-9_.]+@[A-Za-z0-9_]+\\.[a-z]{2,}';

const REGEXP_NAME = /^[A-Za-zА-Яа-я\s-]+$/;
const SHORT_MOVIE_DURATION = 40;

export const MOVIES_PAGE_SIZE = {
  DESKTOP_BIG: 1280,
  DESKTOP: 1024,
  TABLET: 768
};

export const MOVIES_PER_PAGE_SIZE = {
  SIZE_DESKTOP_BIG: 16,
  SIZE_DESKTOP: 12,
  SIZE_TABLET: 8,
  SIZE_MOBILE: 5
};

export const MOVIES_TO_ADD = {
  CARDS_SIZES_DESKTOP: 4,
  CARDS_SIZES_TABLET: 3,
  CARDS_SIZES_MOBILE: 2
};

export const INFO_MESSAGES = {
  ERROR_NOT_FOUND: 'Ничего не найдено',
  ERROR_QUERY: 'Нужно ввести ключевое слово',
  ERROR_UPDATE_PROFILE: 'Ошибка обновления профиля',
  STATUS_400: 'Ошибка регистрации',
  STATUS_401: 'Неверный логин и/или пароль',
  STATUS_409: 'Пользователь с таким email уже существует',
  SUCCESS_UDATE_PROFILE: 'Данные профиля обновлены',
  ERROR_DEFAULT:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
};

export const onChangeName = (evt, handleChange, errors, setErrors) => {
  handleChange(evt);
  const { name, value } = evt.target;

  if (name === 'name') {
    if (value.length < 2 || value.length > 30) {
      setErrors({ ...errors, [name]: 'Поле должно содержать от 2 до 30 символов.' });
    } else if (!REGEXP_NAME.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Поле должно содержать только латиницу, кириллицу, пробел или дефис.'
      });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  }
};

export const onFilterMoviesDuration = movies => {
  return movies.filter(movie => movie.duration <= SHORT_MOVIE_DURATION);
};

export const onShortMovies = (
  initialMovies,
  isShortMovies,
  setIsShortMovies,
  setFoundShortMovies
) => {
  setIsShortMovies(!isShortMovies);

  localStorage.setItem('shortMoviesCheckbox', !isShortMovies);

  !isShortMovies
    ? onFilterMoviesDuration(initialMovies).length === 0
      ? setFoundShortMovies(onFilterMoviesDuration(initialMovies))
      : setFoundShortMovies(onFilterMoviesDuration(initialMovies))
    : setFoundShortMovies(initialMovies);
};

export const onFilterMovies = (movies, searchName) => {
  const search = searchName.toUpperCase().trim();
  const result = movies.filter(movie => {
    const movieNameRU = String(movie.nameRU).toUpperCase().trim();
    const movieNameEN = String(movie.nameEN).toUpperCase().trim();
    return movieNameRU.includes(search) || movieNameEN.includes(search);
  });
  return result;
};
