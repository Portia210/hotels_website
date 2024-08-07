import { EVENT_TYPES } from '@/constants/events';
import { defaultFilter } from '@/hooks/hotelFilters';
import useTrans from '@/hooks/useTrans';
import useSearchStore from '@/store/useSearchStore';
import eventEmitter from '@/utils/eventEmitter';
import { useEffect } from 'react';

export default function DistanceFilter({
  distanceFilter,
  setDistanceFilter,
}) {
  const { t, isReverse } = useTrans();
  const { isReady } = useSearchStore();

  const handleDistanceChange = event => {
    const value = event.target.value;
    eventEmitter.emit(EVENT_TYPES.DISTANCE_FILTER_CHANGE, value);
    setDistanceFilter(value);
  };

  const handleMouseUp = () => {};

  const subscribe = () => {
    const token = eventEmitter.addListener(EVENT_TYPES.RESET_FILTER, () => {
      setDistanceFilter(defaultFilter.distanceFilter);
    });
    return token;
  };

  useEffect(() => {
    const token = subscribe();
    return () => token.remove();
  }, []);

  return (
    <div>
          <label
            htmlFor="distanceRange"
            className="form-label"
            dir={`${isReverse && 'rtl'}`}
          >
            {t('Hotel.distanceFromLocation')} {distanceFilter} {t('Hotel.distanceSymbol')}
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
  );
}
