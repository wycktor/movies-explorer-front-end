import imageStudent from '../../images/student.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__info">
          <div className="about-me__block">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и
              дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года
              работал в компании «СКБ Контур». После того, как прошёл курс по веб-&nbsp;разработке,
              начал заниматься фриланс-&nbsp;заказами и ушёл с постоянной работы.
            </p>
            <a
              className="about-me__link"
              href="https://github.com/wycktor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
          <img className="about-me__image" src={imageStudent} alt="Фото студента ЯП" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
