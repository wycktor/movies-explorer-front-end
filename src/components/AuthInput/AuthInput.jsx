function AuthInput(props) {
  return (
    <div className="auth-input__container">
      <label className="auth-input__label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className="auth-input"
        name={props.name}
        id={props.id}
        type={props.type}
        minLength={props.minLength}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        autoComplete="off"
        required
      />
      <span className="auth-input__error-message">{props.errorMessage}</span>
    </div>
  );
}

export default AuthInput;
