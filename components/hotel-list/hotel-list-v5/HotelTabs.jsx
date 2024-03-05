export default function HotelTabs() {
  return (
    <>
      <ul className="nav nav-tabs mb-30">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="matchedHotels-tab"
            data-bs-toggle="tab"
            href="#matchedHotels"
          >
            Matches
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="restResults-tab"
            data-bs-toggle="tab"
            href="#restResults"
          >
            Rest of the results
          </a>
        </li>
      </ul>
    </>
  );
}
