import { useEffect, useState } from "react";
import { defaultFilter } from "../useFilterBar";

const useStarFilter = (hotels, setFilterHotels) => {
  const [active, setActive] = useState(false);
  const [starFilter, setStarFilter] = useState(defaultFilter.starFilter);

  const handleStarFilterChange = (value) => {
    setStarFilter((prev) => {
      if (prev === value) {
        return 0;
      }
      return value;
    });
  };

  const filterHotelByStar = () => {
    hotels.filter((hotel) => hotel.stars >= starFilter);
    setFilterHotels(hotels);
  };

  useEffect(() => {
    filterHotelByStar();
  }, [starFilter]);

  return {
    active,
    setActive,
    setStarFilter,
    filterHotelByStar,
    handleStarFilterChange,
  };
};

export default useStarFilter;
