import { FILTER_TYPE } from '@/hooks/hotelFilters';
import eventEmitter from '@/utils/eventEmitter';
import { useState, useEffect } from 'react';
import { defaultFilter } from '.';

export const ratingFilterChangeEvent = 'ratingFilterChange';

const useRatingFilter = hotelFilterStore => {
  const [ratingFilter, setRatingFilter] = useState(defaultFilter.ratingFilter);
  const { setCondition } = hotelFilterStore;

  const handleRatingFilterChange = value => {
    eventEmitter.emit(ratingFilterChangeEvent, value);
  };

  const subscribe = () => {
    const token = eventEmitter.addListener(ratingFilterChangeEvent, value => {
      setRatingFilter(prev => {
        if (prev === value) return 0;
        return value;
      });
      setCondition(FILTER_TYPE.RATING, value);
    });
    return token;
  };

  useEffect(() => {
    const token = subscribe();
    return () => token.remove();
  }, []);

  return {
    ratingFilter,
    setRatingFilter,
    handleRatingFilterChange,
  };
};

export default useRatingFilter;
