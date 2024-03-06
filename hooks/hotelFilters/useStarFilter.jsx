import { FILTER_TYPE } from '@/hooks/hotelFilters';
import eventEmitter from '@/utils/eventEmitter';
import { useEffect, useState } from 'react';
import { defaultFilter } from '.';

export const starFilterChangeEvent = 'starFilterChange';

const useStarFilter = hotelFilterStore => {
  const [starFilter, setStarFilter] = useState(defaultFilter.starFilter);
  const { setCondition } = hotelFilterStore;

  const handleStarFilterChange = value => {
    eventEmitter.emit(starFilterChangeEvent, value);
  };

  const subscribe = () => {
    const token = eventEmitter.addListener(starFilterChangeEvent, value => {
      setStarFilter(prev => {
        if (prev === value) return 0;
        return value;
      });
      setCondition(FILTER_TYPE.STARS, value);
    });
    return token;
  };

  useEffect(() => {
    const token = subscribe();
    return () => token.remove();
  }, []);

  return {
    starFilter,
    setStarFilter,
    handleStarFilterChange,
  };
};

export default useStarFilter;
