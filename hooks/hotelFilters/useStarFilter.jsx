import { useEffect, useState } from "react";
import { defaultFilter } from ".";

const useStarFilter = (originHotels, hotels, setFilterHotels) => {
  const [starFilter, setStarFilter] = useState(defaultFilter.starFilter);

  const handleStarFilterChange = (value) => {
    setStarFilter((prev) => {
      if (prev === value) return prev;
      filterHotelByStar(originHotels, value);
      return value;
    });
  };

  const filterHotelByStar = (hotels, starFilter) => {
    const results = hotels.filter((hotel) => hotel.stars >= starFilter);
    setFilterHotels(results);
  };

  useEffect(() => {
    filterHotelByStar(hotels, starFilter);
  }, [starFilter, hotels.length]);

  return {
    starFilter,
    setStarFilter,
    filterHotelByStar,
    handleStarFilterChange,
  };
};

export default useStarFilter;
