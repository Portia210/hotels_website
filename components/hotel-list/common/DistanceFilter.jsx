import { EVENT_TYPES } from '@/constants/events';
import { defaultFilter } from '@/hooks/hotelFilters';
import useTrans from '@/hooks/useTrans';
import useSearchStore from '@/store/useSearchStore';
import eventEmitter from '@/utils/eventEmitter';
import { useEffect } from 'react';

export default function DistanceFilter({
  distanceFilter,
  distanceSortOrder,
  setDistanceFilter,
  setDistanceSortOrder,
}) {
  const { t, isReverse } = useTrans();
  const { isReady } = useSearchStore();

  const handleDistanceChange = event => {
    const value = event.target.value;
    eventEmitter.emit(EVENT_TYPES.DISTANCE_FILTER_CHANGE, value);
    setDistanceFilter(value);
  };

  const handleSortOrderChange = event => {
    const value = event.target.value;
    eventEmitter.emit(EVENT_TYPES.DISTANCE_SORT_FILTER_CHANGE, value);
    setDistanceSortOrder(value);
  };

  const renderText = () => {
    return t('Hotel.distanceFromLocation');
  };

  const handleMouseUp = () => {};

  const subscribe = () => {
    const token = eventEmitter.addListener(EVENT_TYPES.RESET_FILTER, () => {
      setDistanceFilter(defaultFilter.distanceFilter);
      setDistanceSortOrder('');
    });
    return token;
  };

  useEffect(() => {
    const token = subscribe();
    return () => token.remove();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <label
            htmlFor="distanceRange"
            className="form-label"
            dir={`${isReverse && 'rtl'}`}
          >
            {renderText()} {distanceFilter} m
          </label>
          <input
            type="range"
            className="form-range"
            id="distanceRange"
            min="0"
            max={defaultFilter.distanceFilter}
            step="1"
            value={distanceFilter}
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
            value={distanceSortOrder}
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
