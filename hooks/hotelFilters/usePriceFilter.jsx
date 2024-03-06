import { useState, useEffect } from 'react';
import { FILTER_TYPE, defaultFilter } from '.';
import eventEmitter from '@/utils/eventEmitter';

export const priceFilterChangeEvent = 'priceFilterChange';

const usePriceFilter = hotelFilterStore => {
  const { gapActive, setGapActive, setCondition } = hotelFilterStore;
  const [priceFilter, setPriceFilter] = useState(defaultFilter.priceFilter);

  const handleChangePriceFilter = value => {
    eventEmitter.emit(priceFilterChangeEvent, value);
  };

  const subscribe = () => {
    const token = eventEmitter.addListener(priceFilterChangeEvent, value => {
      if (gapActive) setGapActive(false);
      setPriceFilter(value);
      setCondition(FILTER_TYPE.PRICE_ORDER, value);
    });
    return token;
  };

  useEffect(() => {
    const token = subscribe();
    return () => token.remove();
  }, []);

  return {
    priceFilter,
    setPriceFilter: handleChangePriceFilter,
  };
};

export default usePriceFilter;
