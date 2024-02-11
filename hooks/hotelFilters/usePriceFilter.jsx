import useHotelFilterStore from "@/store/useHotelFilterStore";
import { useState } from "react";
import { FILTER_TYPE, defaultFilter } from ".";

const usePriceFilter = () => {
  const { gapActive, setGapActive, setCondition } = useHotelFilterStore();
  const [priceFilter, setPriceFilter] = useState(defaultFilter.priceFilter);

  const handleChangePriceFilter = (val) => {
    if (gapActive) setGapActive(false);
    setPriceFilter(val);
    setCondition(FILTER_TYPE.PRICE_ORDER, val);
  };

  return {
    priceFilter,
    setPriceFilter: handleChangePriceFilter,
  };
};

export default usePriceFilter;
