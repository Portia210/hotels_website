import { EVENT_TYPES } from '@/constants/events';
import useTrans from '@/hooks/useTrans';
import useHotelFilterStore from '@/store/useHotelFilterStore';
import useSearchStore from '@/store/useSearchStore';
import eventEmitter from '@/utils/eventEmitter';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

export default function DistanceFilter() {
  const { t, isReverse } = useTrans();
  const { isReady } = useSearchStore();
  const {
    hotels: originHotels,
    filterHotels,
    setFilterHotels,
  } = useHotelFilterStore();

  const [distance, setDistance] = useState(5000);
  const [sortOrder, setSortOrder] = useState('');

  const handleDistanceChange = event => {
    setDistance(event.target.value);
  };

  const handleSortOrderChange = event => {
    setSortOrder(event.target.value);
  };

  const renderText = () => {
    return t('Hotel.distanceFromLocation');
  };

  const filterAndSortHotels = debounce((distance, sortOrder) => {
    if (!distance) return;
    let filteredDistanceHotels = filterHotels.filter(hotel => {
      const hotelDistance = hotel?.travelorDistance ?? 0;
      return hotelDistance * 1000 <= distance;
    });

    if (sortOrder === 'asc') {
      filteredDistanceHotels.sort(
        (a, b) => a.travelorDistance - b.travelorDistance,
      );
    } else if (sortOrder === 'desc') {
      filteredDistanceHotels.sort(
        (a, b) => b.travelorDistance - a.travelorDistance,
      );
    }
    setFilterHotels(filteredDistanceHotels);
  }, 300);

  const handleMouseUp = () => {
    filterAndSortHotels(distance, sortOrder);
  };

  const subscribe = () => {
    const token = eventEmitter.addListener(EVENT_TYPES.RESET_FILTER, () => {
      setDistance(5000);
      setSortOrder('');
    });
    return token;
  };

  useEffect(() => {
    const token = subscribe();
    return () => token.remove();
  }, []);

  useEffect(() => {
    handleMouseUp();
  }, [sortOrder]);

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <label
            htmlFor="distanceRange"
            className="form-label"
            dir={`${isReverse && 'rtl'}`}
          >
            {renderText()} {distance} m
          </label>
          <input
            type="range"
            className="form-range"
            id="distanceRange"
            min="0"
            max="10000"
            step="1"
            value={distance}
            disabled={!isReady}
            onChange={handleDistanceChange}
            onMouseUp={handleMouseUp}
          />
        </div>
        <div className="col-6">
          <label
            htmlFor="sortOrder"
            className="form-label"
            dir={`${isReverse && 'rtl'}`}
          >
            {t('Hotel.sortOrder')}
          </label>
          <select
            id="sortOrder"
            className="form-select"
            value={sortOrder}
            disabled={!isReady}
            onChange={handleSortOrderChange}
            onBlur={handleMouseUp}
          >
            <option value="" disabled>
              {t('Hotel.default')}
            </option>
            <option value="asc">{t('FilterBar.lth')}</option>
            <option value="desc">{t('FilterBar.htl')}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
