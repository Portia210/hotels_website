export default function Hero() {
  return (
    <section
      className="shadow-lg w-100 h-100"
      style={{ backgroundColor: '#051036' }}
    >
      <div className="container">
        <img className="demo-bg" src="/img/landing/bg/bg-2.png" alt="" />
        <div className="demo-content">
          <div className="container col-xl-10 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-4">
              <div className="col-12 col-sm-12 col-md-8 col-lg-6 d-flex justify-content-center align-items-center pb-4 pb-lg-0">
                <img
                  src="/img/landing/favic-00.svg"
                  className="d-block mx-lg-auto img-fluid"
                  alt=""
                  width="350"
                />
              </div>
              <div className="col-lg-6">
                <h2 className="display-6 fw-bold text-light lh-1 mb-3">
                  Meet Agent-Space
                </h2>

                <p className="lead text-light">
                  Agent Space allows Travlor agents to discover price gaps
                  between Travelor and Booking, earning high commissions.
                </p>
                <p className="lead text-light">
                  With our new tools, gain in unprecedented ways.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg px-4 mr-3 mb-3"
                  >
                    Create An Account
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-light btn-lg px-4 mb-3"
                  >
                    Read The Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
