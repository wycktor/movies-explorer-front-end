import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <nav className="portfolio__nav">
          <ul className="portfolio__list">
            <li className="portfolio__item">
              <a
                className="portfolio__link"
                href="https://github.com/wycktor/how-to-learn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="portfolio__text">Статичный сайт</p>
                <img className="portfolio__arrow" src={arrow} alt="Диагональная стрелка"></img>
              </a>
            </li>
            <li className="portfolio__item">
              <a
                className="portfolio__link"
                href="https://github.com/wycktor/russian-travel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="portfolio__text">Адаптивный сайт</p>
                <img className="portfolio__arrow" src={arrow} alt="Диагональная стрелка"></img>
              </a>
            </li>
            <li className="portfolio__item">
              <a
                className="portfolio__link"
                href="https://github.com/wycktor/react-mesto-api-full-gha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="portfolio__text">Одностраничное приложение</p>
                <img className="portfolio__arrow" src={arrow} alt="Диагональная стрелка"></img>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Portfolio;
