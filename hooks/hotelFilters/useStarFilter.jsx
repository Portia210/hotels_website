import { useState } from "react";
import { defaultFilter } from ".";
import useHotelFilterStore from "@/store/useHotelFilterStore";
import { FILTER_TYPE } from "@/hooks/hotelFilters";

const useStarFilter = () => {
  const [starFilter, setStarFilter] = useState(defaultFilter.starFilter);
  const { setCondition } = useHotelFilterStore();

  const handleStarFilterChange = (value) => {
    setStarFilter((prev) => {
      if (prev === value) {
        return 0;
      }
      return value;
    });
    setCondition(FILTER_TYPE.STARS, value);
  };

  return {
    starFilter,
    setStarFilter,
    handleStarFilterChange,
  };
};

export default useStarFilter;
