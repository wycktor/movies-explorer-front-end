import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';

function AuthForm(props) {
  const { pathname } = useLocation();

  return (
    <>
      <main className="auth">
        <form className="auth__form" name={props.name} onSubmit={props.onSubmit} noValidate>
          <Link to="/" className="auth__form-link">
            <img className="auth__logo" src={logo} alt="Логотип" />
          </Link>
          <h1 className="auth__form-title">{props.title}</h1>

          {props.children}

          <button
            // className={`auth__button ${pathname === '/signin' && 'auth__button-login'}`}
            className={`auth__button ${pathname === '/signin' && 'auth__button-login'} ${
              props.isValid ? '' : 'auth__button-login_disabled'
            }`}
            type="submit"
          >
            {props.textButton}
          </button>

          <div className="auth__sign">
            <p className="auth__sign-title">
              {props.question}
              <Link className="auth__sign-link" to={props.path}>
                &nbsp;{props.link}
              </Link>
            </p>
          </div>
        </form>
      </main>
    </>
  );
}

export default AuthForm;
