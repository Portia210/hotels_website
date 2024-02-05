import { useEffect, useState } from "react";
import { defaultFilter } from "../useFilterBar";
import { PriceFilter } from "@/constants/searchFilter";

const usePriceFilter = (hotels, setFilterHotels) => {
  const [active, setActive] = useState(false);
  const [priceFilter, setPriceFilter] = useState(defaultFilter.priceFilter);

  const filterHotelByPrice = () => {
    if (priceFilter === PriceFilter.HTL) {
      hotels.sort((a, b) => b.travelorPrice - a.travelorPrice);
    } else {
      hotels.sort((a, b) => a.travelorPrice - b.travelorPrice);
    }
    setFilterHotels(hotels);
  };

  useEffect(() => {
    console.log("priceFilter -->", priceFilter);
    filterHotelByPrice();
  }, [priceFilter]);

  return {
    active,
    setActive,
    setActive,
    setPriceFilter,
    filterHotelByPrice,
  };
};

export default usePriceFilter;
