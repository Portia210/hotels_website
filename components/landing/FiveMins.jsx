export default function FiveMins() {
  return (
    <section id="5-minutes" className="px-2 px-sm-4 pt-5 w-100 h-100">
      <div className="container col-xl-8">
        <h2 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 text-center mb-3 pb-3 border-bottom">
          5 minutes per day
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
            <p className="lead text-dark">
              Your time is valuable, which is why our website is designed to
              help you achieve more in less time.
            </p>
            <h4 className="mb-3">
              Here is what you can do in 5 minutes per day:
            </h4>
            <ul className="list-group mb-2 list-inline">
              <li className="list-group-item opacity-2 list-group-item-success">
                1. Select a Location
              </li>
              <li className="list-group-item opacity-1">
                2. Explore popular tourist attractions
              </li>
              <li className="list-group-item opacity-2 list-group-item-success">
                3. Search for cheap hotels in this location
              </li>
              <li className="list-group-item opacity-1">
                4. Find hotels with the biggest advantage for Travelor
              </li>
              <li className="list-group-item opacity-2 list-group-item-success">
                5. Create a custom short link for each one of the hotels
              </li>
              <li className="list-group-item opacity-1">
                6. Copy the Hotel Details, with the link, in ONE CLICK
              </li>
              <li className="list-group-item opacity-2 list-group-item-success">
                7. Share 10 hotels with the best prices on social media
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
