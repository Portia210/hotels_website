import { useEffect, useState } from "react";
import { defaultFilter } from ".";

const useRatingFilter = (hotels, setFilterHotels) => {
  const [ratingFilter, setRatingFilter] = useState(defaultFilter.ratingFilter);

  const filterHotelByRating = () => {
    const results = hotels.filter((hotel) => hotel.rate >= ratingFilter);
    setFilterHotels(results);
  };

  useEffect(() => {
    filterHotelByRating();
  }, [ratingFilter, hotels.length]);

  return {
    ratingFilter,
    setRatingFilter,
    filterHotelByRating,
  };
};

export default useRatingFilter;
