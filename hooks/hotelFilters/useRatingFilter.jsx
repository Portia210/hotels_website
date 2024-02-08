import { useEffect, useState } from "react";
import { defaultFilter } from ".";

const useRatingFilter = (originHotels, hotels, setFilterHotels) => {
  const [ratingFilter, setRatingFilter] = useState(defaultFilter.ratingFilter);

  const handleRatingFilterChange = (value) => {
    setRatingFilter((prev) => {
      if (prev === value) {
        return 0;
      }
      filterHotelByRating(originHotels, value);
      return value;
    });
  };

  const filterHotelByRating = (hotels, ratingFilter) => {
    const results = hotels.filter((hotel) => hotel.rate >= ratingFilter);
    setFilterHotels(results);
  };

  useEffect(() => {
    filterHotelByRating(hotels, ratingFilter);
  }, [ratingFilter, hotels.length]);

  return {
    ratingFilter,
    setRatingFilter,
    filterHotelByRating,
    handleRatingFilterChange,
  };
};

export default useRatingFilter;
