export default function Intergration({ t }) {
  return (
    <section id="integration" className="demo-wrap w-100 h-100 mb-60">
      <img
        className="demo-bg"
        src="/img/landing/bg/bg-2.png"
        alt=""
        style={{ opacity: 0.2 }}
      />
      <div className="demo-content">
        <div className="px-4 py-5 text-center">
          <div className="d-flex justify-content-center mb-4">
            <div className="bg-light rounded-circle p-2 border border-info">
              <img
                className="rounded-circle"
                src="/img/landing/integration.png"
                alt=""
                width="250"
                height="250"
              />
            </div>
          </div>
          <div className="col-md-9 col-lg-8 mx-auto">
            <h1 className="display-5 fw-bold">{t('Integration.title')}</h1>
            <p className="lead mb-4 text-dark fs-5 fw-normal text-center">
              {t('Integration.description1')}
              <br />
              {t('Integration.description2')}
              <br />
              {t('Integration.description3')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
