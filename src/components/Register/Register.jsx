import useFormAndValidation from '../../hooks/useFormAndValidation';
import { onChangeName, REGEXP_EMAIL } from '../../utils/constants';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';

function Register(props) {
  const { values, handleChange, errors, setErrors, isValid } = useFormAndValidation({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = evt => {
    evt.preventDefault();
    if (isValid) {
      props.onSubmit(values.name, values.email, values.password);
    }
  };

  function handleChangeName(evt) {
    onChangeName(evt, handleChange, errors, setErrors);
  }

  return (
    // <>
    <AuthForm
      name={'register'}
      title="Добро пожаловать!"
      textButton="Зарегистрироваться"
      question="Уже зарегистрированы?"
      link="Войти"
      isValid={isValid}
      path="/signin"
      onSubmit={handleSubmit}
    >
      <AuthInput
        name="name"
        id="name"
        type="text"
        // minLength="2"
        // maxLength="30"
        // pattern={REGEXP_NAME}
        label="Имя"
        placeholder="Имя"
        value={values.name || ''}
        errorMessage={errors.name}
        onChange={handleChangeName}
      />
      <AuthInput
        name="email"
        id="email"
        type="email"
        label="Email"
        placeholder="Email"
        pattern={REGEXP_EMAIL}
        value={values.email || ''}
        errorMessage={errors.email}
        onChange={handleChange}
      />
      <AuthInput
        name="password"
        id="password"
        type="password"
        minLength="4"
        label="Пароль"
        placeholder="Пароль"
        value={values.password || ''}
        errorMessage={errors.password}
        onChange={handleChange}
      />
    </AuthForm>
  );
}

export default Register;
