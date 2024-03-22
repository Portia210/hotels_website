export default function Intergration() {
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
            <h1 className="display-5 fw-bold">Full integration</h1>
            <p className="lead mb-4 text-dark fs-5 fw-normal">
              All the website features work together with full integration to
              allow each agent to be the most effective they can be. You no
              longer need to use external services to shorten your links or to
              copy the hotel details one by one. All our features work together
              to allow you to find deals and publish them in the most effective
              way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
