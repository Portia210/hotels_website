import { EVENT_TYPES } from '@/constants/events';
import { FILTER_TYPE } from '@/hooks/hotelFilters';
import eventEmitter from '@/utils/eventEmitter';
import { useEffect, useState } from 'react';
import { defaultFilter } from '@/hooks/hotelFilters';

const useDistanceFilter = hotelFilterStore => {
  const [distanceFilter, setDistanceFilter] = useState(defaultFilter.distanceFilter);
  const [distanceSortOrder, setDistanceSortOrder] = useState('');

  const { setCondition } = hotelFilterStore;

  const subscribe = () => {
    const token = eventEmitter.addListener(
      EVENT_TYPES.DISTANCE_FILTER_CHANGE,
      value => {
        setDistanceFilter(value);
        setCondition(FILTER_TYPE.DISTANCE, value);
      },
    );
    const token2 = eventEmitter.addListener(
      EVENT_TYPES.DISTANCE_SORT_FILTER_CHANGE,
      value => {
        setDistanceSortOrder(value);
        setCondition(FILTER_TYPE.DISTANCE_ORDER, value);
      },
    );
    return { token, token2 };
  };

  useEffect(() => {
    const { token, token2 } = subscribe();
    return () => {
      token.remove();
      token2.remove();
    };
  }, []);

  return {
    distanceFilter,
    distanceSortOrder,
    setDistanceFilter,
    setDistanceSortOrder,
  };
};

export default useDistanceFilter;
