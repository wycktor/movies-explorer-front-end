import Header from '../Header/Header';
import useFormAndValidation from '../../hooks/useFormAndValidation';

function Profile(props) {
  // eslint-disable-next-line
  const { values, errors, isValid, handleChange } = useFormAndValidation({
    name: '',
    email: ''
  });

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, Виталий!</h2>
          <form className="profile__form" name="profile" onSubmit={handleSubmit} noValidate>
            <div className="profile__field">
              <label className="profile__label" htmlFor="name">
                Имя
              </label>
              <input
                className="profile__input"
                id="name"
                type="text"
                name="name"
                placeholder="Виталий"
                minLength="2"
                maxLength="30"
                value={values.name || ''}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <span className="profile__error-message">{errors.name}</span>
            </div>
            <div className="profile__field">
              <label className="profile__label" htmlFor="name">
                Email
              </label>
              <input
                className="profile__input"
                id="email"
                type="email"
                name="email"
                placeholder="pochta@yandex.ru"
                value={values.email || ''}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <span className="profile__error-message">{errors.name}</span>
            </div>
          </form>
          <div className="profile__button-container">
            <button className="profile__button-edit" type="button">
              Редактировать
            </button>
            <button className="profile__button-logout" type="button" onClick={props.onSignOut}>
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
