import { useState } from "react";

const useHotelGapFilter = (hotels, setFilterHotels) => {
  const [active, setActive] = useState(false);

  const filterByBiggestPriceGap = () => {
    const results = hotels.sort(
      (a, b) => b.price_difference - a.price_difference
    );
    setFilterHotels(results);
  };

  return {
    active,
    setActive,
    filterByBiggestPriceGap,
  };
};

export default useHotelGapFilter;
