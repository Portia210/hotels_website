import { FILTER_TYPE } from '@/hooks/hotelFilters';
import { useState } from 'react';
import { defaultFilter } from '.';

const useRatingFilter = (hotelFilterStore) => {
  const [ratingFilter, setRatingFilter] = useState(defaultFilter.ratingFilter);
  const { setCondition } = hotelFilterStore;

  const handleRatingFilterChange = value => {
    setRatingFilter(prev => {
      if (prev === value) {
        return 0;
      }
      return value;
    });
    setCondition(FILTER_TYPE.RATING, value);
  };

  return {
    ratingFilter,
    setRatingFilter,
    handleRatingFilterChange,
  };
};

export default useRatingFilter;
