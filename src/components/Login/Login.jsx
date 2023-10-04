import useFormAndValidation from '../../hooks/useFormAndValidation';
import { REGEXP_EMAIL } from '../../utils/constants';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';

function Login(props) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: '',
    password: ''
  });

  const handleSubmit = evt => {
    evt.preventDefault();
    if (isValid) {
      props.onSubmit(values.email, values.password);
    }
  };

  return (
    <AuthForm
      name={'login'}
      title="Рады видеть!"
      textButton="Войти"
      question="Ещё не зарегистрированы?"
      link="Регистрация"
      isValid={isValid}
      path="/signup"
      onSubmit={handleSubmit}
    >
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

export default Login;
