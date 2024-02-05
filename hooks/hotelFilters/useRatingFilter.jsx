import { useEffect, useState } from "react";
import { defaultFilter } from "../useFilterBar";

const useRatingFilter = (hotels, setFilterHotels) => {
  const [active, setActive] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(defaultFilter.ratingFilter);

  const filterHotelByRating = () => {
    hotels.filter((hotel) => hotel.rate >= ratingFilter);
    setFilterHotels(hotels);
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
