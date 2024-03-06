import useHotelTabStore from '@/store/useHotelTabStore';

export default function HotelTabs() {
  const { activeStore, setActiveStore } = useHotelTabStore();
  return (
    <ul className="nav nav-tabs mb-30">
      <li className="nav-item">
        <a
          onClick={() => setActiveStore('matchedHotels')}
          className={`nav-link ${
            activeStore === 'matchedHotels' ? 'active text-primary' : 'text-secondary'
          }`}
          id="matchedHotels-tab"
          data-bs-toggle="tab"
          href="#matchedHotels"
        >
          Matches
        </a>
      </li>
      <li className="nav-item">
        <a
          onClick={() => setActiveStore('restResults')}
          className={`nav-link ${
            activeStore === 'restResults' ? 'active text-primary' : 'text-secondary'
          }`}
          id="restResults-tab"
          data-bs-toggle="tab"
          href="#restResults"
        >
          Rest of the results
        </a>
      </li>
    </ul>
  );
}
