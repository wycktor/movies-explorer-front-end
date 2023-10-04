import useFormAndValidation from '../../hooks/useFormAndValidation';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';

function Register(props) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({
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

  return (
    // <>
    <AuthForm
      name={'register'}
      title="Добро пожаловать!"
      textButton="Зарегистрироваться"
      question="Уже зарегистрированы?"
      link="Войти"
      path="/signin"
      onSubmit={handleSubmit}
    >
      <AuthInput
        name="name"
        id="name"
        type="text"
        minLength="2"
        maxLength="30"
        label="Имя"
        placeholder="Имя"
        value={values.name || ''}
        errorMessage={errors.name}
        onChange={handleChange}
      />
      <AuthInput
        name="email"
        id="email"
        type="email"
        label="Email"
        placeholder="Email"
        value={values.email || ''}
        errorMessage={errors.email}
        onChange={handleChange}
      />
      <AuthInput
        name="password"
        id="password"
        type="password"
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
