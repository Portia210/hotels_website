export default function Features({ t }) {
  return (
    <section className="features demo-wrap w-100 h-100">
      <div className="container px-4 pt-40">
        <h2 className="pb-2 border-bottom fw-600">{t('Features.title')}</h2>
        <div className="row g-4 pt-50 row-cols-1 row-cols-lg-3">
          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-search text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">
              {t('Features.comparePrices.title')}
            </h3>
            <p>{t('Features.comparePrices.description')}</p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-clipboard text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">
              {t('Features.copyHotelDetail.title')}
            </h3>
            <p>{t('Features.copyHotelDetail.description')}</p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-link-45deg text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">
              {t('Features.shortenLink.title')}
            </h3>
            <p>
              {t('Features.shortenLink.description')}
              <br />
            </p>
          </div>

          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-geo text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">
              {t('Features.findAttractions.title')}
            </h3>
            <p>{t('Features.findAttractions.description')}</p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-arrow-up-right-circle text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">
              {t('Features.searchProxy.title')}
            </h3>
            <p>{t('Features.searchProxy.description')}</p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-currency-dollar text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">
              {t('Features.sessionPrice.title')}
            </h3>
            <p>{t('Features.sessionPrice.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
