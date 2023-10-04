function AboutProject() {
  return (
    <section className="about-project" id="project">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__info">
        <li className="about-project__info-item">
          <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__info-description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и&nbsp;финальные доработки.
          </p>
        </li>
        <li className="about-project__info-item">
          <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__info-description">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__time">
        <li className="about-project__time-item">
          <p className="about-project__time-weeks about-project__time-weeks_green">1 неделя</p>
          <p className="about-project__time-description">Back-end</p>
        </li>
        <li className="about-project__time-item">
          <p className="about-project__time-weeks">4 недели</p>
          <p className="about-project__time-description">Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;
