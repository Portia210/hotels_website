import { PriceFilter } from "@/constants/searchFilter";
import { useEffect, useState } from "react";
import useHotelGapFilter from "./hotelFilters/useHotelGapFilter";
import useHotelPagination from "./hotelFilters/useHotelPagination";
import usePriceFilter from "./hotelFilters/usePriceFilter";
import useRatingFilter from "./hotelFilters/useRatingFilter";
import useStarFilter from "./hotelFilters/useStarFilter";

const hotelPerPage = 24;
export const defaultFilter = {
  priceFilter: PriceFilter.HTL,
  ratingFilter: 6,
  starFilter: 0,
  pagination: {
    page: 1,
    limit: hotelPerPage,
    totalPages: 1,
    totalResults: 1,
    offset: 0,
  },
};

const useFilterBar = (hotels) => {
  const [filterHotels, setFilterHotels] = useState(hotels);

  const {
    currentPage,
    pagination,
    setPagination,
    setCurrentPage,
    calcPagination,
  } = useHotelPagination(hotelPerPage);
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
