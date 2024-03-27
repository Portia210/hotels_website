export default function CreateAccount({ t }) {
  return (
    <section id="create-account" className="demo-wrap w-100 h-100">
      <img
        className="demo-bg"
        src="/img/landing/bg/bg-3.png"
        alt=""
        style={{ opacity: 0.1 }}
      />
      <div className="px-2 py-5 my-5 text-center">
        <h2 className="display-5 fw-bold text-body-emphasis">
          {t('Landing.Hero.createAnAccount')}
        </h2>
        <div className="col-lg-9 mx-auto">
          <p className="lead mb-4 text-dark fs-5">
            {t('Landing.Hero.createAccountDescription')}
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-20">
            <button
              type="button"
              className="btn btn-primary btn-lg mr-3 mb-2 rounded-1"
            >
              {t('Landing.Hero.createAnAccountFree')}
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-lg mr-3 mb-2 rounded-1"
            >
              {t('Landing.Hero.readGuide')}
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-lg mb-2 rounded-1"
            >
              {t('Landing.Hero.seePricing')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
