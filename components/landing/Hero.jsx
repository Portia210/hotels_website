import Link from 'next/link';

export default function Hero({ t }) {
  return (
    <section
      className="shadow-lg w-100 h-100"
      style={{ backgroundColor: '#051036' }}
    >
      <img className="demo-bg" src="/img/landing/bg/bg-2.png" alt="" />
      <div className="demo-content">
        <div className="container col-xl-8 px-28 py-70">
          <div className="row flex-lg-row-reverse align-items-center justify-content-center">
            <div className="col-12 col-sm-12 col-md-8 col-lg-6 d-flex justify-content-center align-items-center pb-4 pb-lg-0">
              <img
                src="/img/landing/favic-00.svg"
                className="d-block mx-lg-auto img-fluid"
                alt=""
                width="350"
              />
            </div>
            <div className="col-lg-6 lh-base">
              <h2 className="landing-font display-6 fw-bold text-light lh-1 mb-3">
                {t('Landing.Hero.heading')}
              </h2>

              <p className="landing-font lead text-light fw-normal">
                {t('Landing.Hero.heading2')}
              </p>
              <br />
              <p className="landing-font lead text-light fw-normal">
                {t('Landing.Hero.heading3')}
              </p>
              <br />
              <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-20 mr-3 mb-3 rounded-1 text-20"
                >
                  <Link href="/signup">
                    {t('Landing.Hero.createAnAccount')}
                  </Link>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-lg px-20 mb-3 rounded-1 text-20"
                >
                  <Link
                    href="https://docs.agent-space.com/user-guide"
                    target="_blank"
                  >
                    {t('Landing.Hero.readGuide')}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
