export default function Features() {
  return (
    <section className="features demo-wrap w-100 h-100">
      <div className="container px-4 pt-40">
        <h2 className="pb-2 border-bottom fw-600">Special Features</h2>
        <div className="row g-4 pt-50 row-cols-1 row-cols-lg-3">
          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-search text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Compare Prices</h3>
            <p>
              Compare prices between Booking and Travelor, anywhere, anytime.
            </p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-clipboard text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Copy Hotel Details</h3>
            <p>
              Copy the desired hotel details in one click and share them on
              social media.
            </p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-link-45deg text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Shorten Hotel Links</h3>
            <p>
              Shorten the link in one click with our built-in system and copy it
              with the hotel details.
              <br />
            </p>
          </div>

          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-geo text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Find Attractions</h3>
            <p>
              Find the most popular tourist destinations in a city in just one
              click.
            </p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-arrow-up-right-circle text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Search Proxy</h3>
            <p>
              Search for deals through different locations in the world and
              lower the price.
            </p>
          </div>
          <div className="feature col-12 col-sm-6 col-lg-4 mb-2 mb-md-4">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-1">
              <i className="bi bi-currency-dollar text-white bg-primary rounded p-2 bi-lg"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Session Price Lowering</h3>
            <p>
              Lower the price on the Travlor website by using our tool to opt
              for Travelor in a new session.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
