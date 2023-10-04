function AuthInput(props) {
  return (
    <div className="auth-input">
      <label className="auth-input__label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className="auth-input__field"
        name={props.name}
        id={props.id}
        type={props.type}
        minLength={props.minLength}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        pattern={props.pattern}
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
