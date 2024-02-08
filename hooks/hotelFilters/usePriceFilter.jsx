import { useEffect, useState } from "react";
import { defaultFilter } from ".";
import { PriceFilter } from "@/constants/searchFilter";

const usePriceFilter = (hotels, setFilterHotels, isGapActive, setGapActive) => {
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

  const handleChangePriceFilter = (val) => {
    if (!isGapActive) setGapActive(false);
    setPriceFilter(val);
  };

  useEffect(() => {
    if (!isGapActive) return;
    filterHotelByPrice();
  }, [priceFilter, hotels.length]);

  return {
    priceFilter,
    setPriceFilter: handleChangePriceFilter,
    filterHotelByPrice,
  };
};

export default usePriceFilter;
