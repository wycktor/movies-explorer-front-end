import { useEffect, useContext } from 'react';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { onChangeName, REGEXP_EMAIL } from '../../utils/constants';
import Header from '../Header/Header';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext).currentUser;

  const { values, setValues, errors, setErrors, isValid, handleChange } = useFormAndValidation({
    name: '',
    email: ''
  });

  const disabledButton =
    !isValid ||
    props.isUpdatedUser ||
    (values.name === currentUser.name && values.email === currentUser.email);

  const disabledInput = !props.isEditUser || props.isUpdatedUser;

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email
    });
  }, [setValues, currentUser]);

  function handleChangeName(evt) {
    onChangeName(evt, handleChange, errors, setErrors);
  }

  function handleEditMode() {
    props.setIsEditUser(true);
    props.setisUpdatedUser(false);
  }

  function handleUpdate(evt) {
    evt.preventDefault();
    if (isValid) {
      // отправляем запрос к API на обновление данных пользователя
      props.onUpdate(values.name, values.email);
    }
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="profile">
        <div className="profile__container">
          <h2 className="profile__title">{`Привет, ${values.name}!`}</h2>
          <form className="profile__form" name="profile" onSubmit={handleUpdate} noValidate>
            <div className="profile__field">
              <label className="profile__label" htmlFor="name">
                Имя
              </label>
              <input
                className={`
                profile__input
                ${errors.name ? `profile__input_type_error` : ''}
                input
              `}
                id="name"
                type="text"
                name="name"
                placeholder="Имя"
                // minLength="2"
                // maxLength="30"
                // pattern={REGEXP_NAME}
                value={values.name || ''}
                onChange={handleChangeName}
                autoComplete="off"
                disabled={disabledInput}
                required
              />
              <span className="profile__error-message">{errors.name}</span>
            </div>
            <div className="profile__field">
              <label className="profile__label" htmlFor="email">
                Email
              </label>
              <input
                className={`
                profile__input
                ${errors.email ? `profile__input_type_error` : ''}
                input
              `}
                id="email"
                type="email"
                name="email"
                placeholder="pochta@yandex.ru"
                pattern={REGEXP_EMAIL}
                value={values.email || ''}
                onChange={handleChange}
                autoComplete="off"
                disabled={disabledInput}
                required
              />
              <span className="profile__error-message">{errors.email}</span>
            </div>
            {!props.isEditUser ? (
              <div className="profile__button-container">
                <button className="profile__button-edit" type="button" onClick={handleEditMode}>
                  Редактировать
                </button>
                <button className="profile__button-logout" type="button" onClick={props.onSignOut}>
                  Выйти из аккаунта
                </button>
              </div>
            ) : (
              <div className="profile__button-container">
                <button className="profile__button-submit" type="submit" disabled={disabledButton}>
                  Сохранить
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}

export default Profile;
