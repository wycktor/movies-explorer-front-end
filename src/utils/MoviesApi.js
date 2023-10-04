import { MOVIES_API_BASE_URL } from './constants';

function resStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(resStatus);
}

export const getAllMovies = () => {
  return request(`${MOVIES_API_BASE_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
