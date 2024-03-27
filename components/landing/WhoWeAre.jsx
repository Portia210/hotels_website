export default function WhoWeAre({ t }) {
  return (
    <section id="about" className="demo-wrap w-100 h-100 py-90">
      <img
        className="demo-bg"
        src="/img/landing/bg/bg-1.png"
        alt=""
        style={{ opacity: 0.09 }}
      />
      <div className="demo-content">
        <div className="container col-xl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3" >
                {t('WhoWeAre.title')}
              </h1>
              <p className="lead text-dark">
                {t('WhoWeAre.paragraph1')}
                <br />
                {t('WhoWeAre.paragraph2')}
                <br />
                {t('WhoWeAre.paragraph3')}
              </p>
            </div>
            <div className="col-lg-6 d-flex justify-content-center">
              <img
                src="/img/landing/about.png"
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="500"
                height="355"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
