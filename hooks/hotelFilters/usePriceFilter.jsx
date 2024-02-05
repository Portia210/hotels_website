import { useEffect, useState } from "react";
import { defaultFilter } from ".";
import { PriceFilter } from "@/constants/searchFilter";

const usePriceFilter = (hotels, setFilterHotels) => {
  const [priceFilter, setPriceFilter] = useState(defaultFilter.priceFilter);

  const filterHotelByPrice = () => {
    let results = [];
    if (priceFilter === PriceFilter.HTL) {
      results = hotels.sort((a, b) => b.travelorPrice - a.travelorPrice);
    } else {
      results = hotels.sort((a, b) => a.travelorPrice - b.travelorPrice);
    }
    setFilterHotels(results);
  };

  useEffect(() => {
    filterHotelByPrice();
  }, [priceFilter]);

  return {
    priceFilter,
    setPriceFilter,
    filterHotelByPrice,
  };
};

export default usePriceFilter;
