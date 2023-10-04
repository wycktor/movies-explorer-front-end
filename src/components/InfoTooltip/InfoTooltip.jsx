function InfoTooltip(props) {
  return (
    <div className="info-tooltip">
      <div className="info-tooltip__container">
        <p
          className={`info-tooltip__message ${
            props.isSuccess ? 'info-tooltip__message_successed' : ''
          }`}
        >
          {props.infoMessage}
        </p>
        <button className="info-tooltip__close-button" onClick={props.onClick}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
