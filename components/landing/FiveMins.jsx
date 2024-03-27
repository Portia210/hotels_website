export default function FiveMin({ t }) {
  return (
    <section id="5-minutes" className="px-2 px-sm-4 pt-5 w-100 h-100">
      <div className="container col-xl-8">
        <h2 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 text-center mb-3 pb-3 border-bottom">
          {t('FiveMin.title')}
        </h2>
        <div className="row flex-lg-row-reverse align-items-center g-5">
          <div className="col-12 col-lg-6 mb-3 d-flex justify-content-center">
            <img
              src="/img/landing/5-min.jpg"
              className="d-block mx-lg-auto img-fluid rounded"
              alt="Bootstrap Themes"
              width="500"
              height="350"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6 text-dark fs-6 fw-normal">
            <p className="lead text-dark">{t('FiveMin.description1')}</p>
            <h4 className="mb-3">{t('FiveMin.description2')}</h4>
            <ul className="list-group mb-2 list-inline">
              <li className="list-group-item opacity-2 list-group-item-success">
                {t('FiveMin.task1')}
              </li>
              <li className="list-group-item opacity-1">
                {t('FiveMin.task2')}
              </li>
              <li className="list-group-item opacity-2 list-group-item-success">
                {t('FiveMin.task3')}
              </li>
              <li className="list-group-item opacity-1">
                {t('FiveMin.task4')}
              </li>
              <li className="list-group-item opacity-2 list-group-item-success">
                {t('FiveMin.task5')}
              </li>
              <li className="list-group-item opacity-1">
                {t('FiveMin.task6')}
              </li>
              <li className="list-group-item opacity-2 list-group-item-success">
                {t('FiveMin.task7')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
