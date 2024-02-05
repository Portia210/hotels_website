import useHotelFilterStore from "@/store/useHotelFilterStore";
import { useEffect } from "react";

const useHotelGapFilter = (hotels, setFilterHotels) => {
  const gapActive = useHotelFilterStore((state) => state.gapActive);

  const filterByBiggestPriceGap = () => {
    const results = hotels.sort(
      (a, b) => b.price_difference - a.price_difference
    );
    setFilterHotels(results);
  };

  useEffect(() => {
    if (gapActive) filterByBiggestPriceGap();
  }, [hotels.length]);

  return {
    filterByBiggestPriceGap,
  };
};

export default useHotelGapFilter;
