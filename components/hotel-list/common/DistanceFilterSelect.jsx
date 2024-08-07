import { EVENT_TYPES } from '@/constants/events';
import useTrans from '@/hooks/useTrans';
import useSearchStore from '@/store/useSearchStore';
import eventEmitter from '@/utils/eventEmitter';
import { useEffect } from 'react';

export default function DistanceFilterSelect({
  distanceSortOrder,
  setDistanceSortOrder,
}) {
  const { t, isReverse } = useTrans();
  const { isReady } = useSearchStore();

  const handleSortOrderChange = event => {
    const value = event.target.value;
    eventEmitter.emit(EVENT_TYPES.DISTANCE_SORT_FILTER_CHANGE, value);
    setDistanceSortOrder(value);
  };

  const handleMouseUp = () => {};

  const subscribe = () => {
    const token = eventEmitter.addListener(EVENT_TYPES.RESET_FILTER, () => {
      setDistanceSortOrder('');
    });
    return token;
  };

  useEffect(() => {
    const token = subscribe();
    return () => token.remove();
  }, []);

  return (
    <div className="col-4">
      <select
        id="sortOrder"
        className="form-select rounded-pill"
        value={distanceSortOrder}
        disabled={!isReady}
        onChange={handleSortOrderChange}
        onBlur={handleMouseUp}
      >
        <option value="" disabled>
          {t('Hotel.sortOrderDefault')}
        </option>
        <option value="asc">{t('Hotel.sortOrderLth')}</option>
        <option value="desc">{t('Hotel.sortOrderHtl')}</option>
      </select>
    </div>
  );
}
