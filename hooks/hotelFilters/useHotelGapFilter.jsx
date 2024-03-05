import { FILTER_TYPE } from "@/hooks/hotelFilters";
import { useEffect } from "react";

const useHotelGapFilter = (hotelFilterStore) => {
  const { gapActive, setCondition } = hotelFilterStore;

  useEffect(() => {
    setCondition(FILTER_TYPE.PRICE_GAP, gapActive);
  }, [gapActive]);
};

export default useHotelGapFilter;
