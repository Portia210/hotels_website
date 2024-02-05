import { useEffect, useState } from "react";
import { defaultFilter } from "../useFilterBar";

const useRatingFilter = (hotels, setFilterHotels) => {
  const [active, setActive] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(defaultFilter.ratingFilter);

  const filterHotelByRating = () => {
    const results = hotels.filter((hotel) => hotel.rate >= ratingFilter);
    setFilterHotels(results);
  };

  useEffect(() => {
    filterHotelByRating();
  }, [ratingFilter]);

  return {
    active,
    ratingFilter,
    setActive,
    setRatingFilter,
    filterHotelByRating,
  };
};

export default useRatingFilter;
