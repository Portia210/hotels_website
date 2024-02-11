import { FILTER_TYPE } from "@/hooks/hotelFilters";
import useHotelFilterStore from "@/store/useHotelFilterStore";
import { useEffect } from "react";

const useHotelGapFilter = () => {
  const { gapActive, setCondition } = useHotelFilterStore();

  useEffect(() => {
    setCondition(FILTER_TYPE.PRICE_GAP, gapActive);
  }, [gapActive]);
};

export default useHotelGapFilter;
