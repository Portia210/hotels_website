import { useEffect, useState } from "react";
import { defaultFilter } from "./hotelFilters";
import useHotelGapFilter from "./hotelFilters/useHotelGapFilter";
import useHotelPagination from "./hotelFilters/useHotelPagination";
import usePriceFilter from "./hotelFilters/usePriceFilter";
import useRatingFilter from "./hotelFilters/useRatingFilter";
import useStarFilter from "./hotelFilters/useStarFilter";
import useHotelFilterStore from "@/store/useHotelFilterStore";

const useFilterBar = (hotels) => {
  const { setGapActive } = useHotelFilterStore();
  const [filterHotels, setFilterHotels] = useState(hotels);
  const {
    currentPage,
    pagination,
    setPagination,
    setCurrentPage,
    calcPagination,
  } = useHotelPagination();
  const { filterByBiggestPriceGap } = useHotelGapFilter(
    [...filterHotels],
    setFilterHotels
  );
  const { priceFilter, setPriceFilter } = usePriceFilter(
    [...filterHotels],
    setFilterHotels
  );
  const { ratingFilter, setRatingFilter } = useRatingFilter(
    [...filterHotels],
    setFilterHotels
  );
  const { starFilter, setStarFilter, handleStarFilterChange } = useStarFilter(
    [...filterHotels],
    setFilterHotels
  );

  const resetFilter = () => {
    setPriceFilter(defaultFilter.priceFilter);
    setRatingFilter(defaultFilter.ratingFilter);
    setStarFilter(defaultFilter.starFilter);
    setPagination(defaultFilter.pagination);
    setFilterHotels(hotels);
    setGapActive(false);
  };

  useEffect(() => {
    setFilterHotels(hotels);
  }, [hotels.length]);

  useEffect(() => {
    calcPagination(filterHotels.length);
  }, [filterHotels]);

  return {
    data: filterHotels.slice(
      pagination.offset,
      pagination.offset + pagination.limit
    ),
    totalFilter: filterHotels.length,
    priceFilter,
    ratingFilter,
    starFilter,
    currentPage,
    pagination,
    setPriceFilter,
    setRatingFilter,
    setCurrentPage,
    filterByBiggestPriceGap,
    handleStarFilterChange,
    resetFilter,
  };
};

export default useFilterBar;
