import { useEffect, useState } from "react";
import { defaultFilter } from ".";

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
    const results = hotels.filter((hotel) => hotel.stars >= starFilter);
    setFilterHotels(results);
  };

  useEffect(() => {
    filterHotelByStar();
  }, [starFilter]);

  return {
    active,
    starFilter,
    setActive,
    setStarFilter,
    filterHotelByStar,
    handleStarFilterChange,
  };
};

export default useStarFilter;
