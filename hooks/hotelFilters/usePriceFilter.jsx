import { useEffect, useState } from "react";
import { defaultFilter } from ".";
import { PriceFilter } from "@/constants/searchFilter";
import { toast } from "react-toastify";

const usePriceFilter = (hotels, setFilterHotels, isActive) => {
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
    if (!isActive) {
      toast.warn("Please disable Gap filter to use this", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      setPriceFilter(val);
    }
  };

  useEffect(() => {
    if (!isActive) return;
    filterHotelByPrice();
  }, [priceFilter, hotels.length]);

  return {
    priceFilter,
    setPriceFilter: handleChangePriceFilter,
    filterHotelByPrice,
  };
};

export default usePriceFilter;
