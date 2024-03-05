import { useState } from "react";
import { defaultFilter } from ".";
import { FILTER_TYPE } from "@/hooks/hotelFilters";

const useStarFilter = (hotelFilterStore) => {
  const [starFilter, setStarFilter] = useState(defaultFilter.starFilter);
  const { setCondition } = hotelFilterStore;

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
