import promoLogo from '../../images/landing-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <img src={promoLogo} className="promo__logo" alt="Логотип Практикума" />
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
    </section>
  );
}

export default Promo;
