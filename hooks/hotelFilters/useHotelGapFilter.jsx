import useHotelFilterStore from "@/store/useHotelFilterStore";
import { useEffect, useState } from "react";

const useHotelGapFilter = (hotels, setFilterHotels) => {
  const [originHotels, setOriginHotels] = useState([]);
  const gapActive = useHotelFilterStore((state) => state.gapActive);

  const filterByBiggestPriceGap = () => {
    const results = hotels.sort(
      (a, b) => b.price_difference - a.price_difference
    );
    setFilterHotels((prev) => {
      setOriginHotels(prev);
      return results;
    });
  };

  useEffect(() => {
    if (gapActive) {
      filterByBiggestPriceGap();
    } else {
      setFilterHotels(originHotels);
    }
  }, [gapActive, hotels.length]);

  return {
    filterByBiggestPriceGap,
  };
};

export default useHotelGapFilter;
