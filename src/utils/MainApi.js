import { BASE_URL, MOVIES_API_BASE_URL, INFO_MESSAGES } from './constants';

// Запрос к серверу
const getResponse = res => {
  if (!res.ok) {
    if (res.status === 400) {
      res.message = INFO_MESSAGES.STATUS_400;
    } else if (res.status === 401) {
      res.message = INFO_MESSAGES.STATUS_401;
    } else if (res.status === 404) {
      res.message = INFO_MESSAGES.ERROR_NOT_FOUND;
    } else if (res.status === 409) {
      res.message = INFO_MESSAGES.STATUS_409;
    }
    return Promise.reject(res);
  }

  return res.json();
};

// Универсальный метод запроса с проверкой ответа
async function request(url, options) {
  const response = await fetch(`${BASE_URL}/${url}`, options);

  return getResponse(response);
}

export const register = (name, email, password) => {
  return request('signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
};

export const login = (email, password) => {
  return request('signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });
};

export const logout = () => {
  return request('signout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
};

export const getUserInfo = () => {
  return request('users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
};

export const updateUserInfo = (name, email) => {
  return request('users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email
    }),
    credentials: 'include'
  });
};

export const getSavedMovies = () => {
  return request('movies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
};

export const saveMovie = movie => {
  return request('movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: MOVIES_API_BASE_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: MOVIES_API_BASE_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    }),
    credentials: 'include'
  });
};

export const deleteSavedMovie = movieId => {
  return request(`movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
};
