import { PriceFilter } from "@/constants/searchFilter";
import { cloneDeep } from "lodash";
import { useEffect, useMemo, useState } from "react";
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
  const memoizedHotels = useMemo(() => cloneDeep(filterHotels), [hotels]);

  const {
    currentPage,
    pagination,
    setPagination,
    setCurrentPage,
    calcPagination,
  } = useHotelPagination(hotelPerPage);
  const { filterByBiggestPriceGap } = useHotelGapFilter(
    memoizedHotels,
    setFilterHotels
  );
  const { priceFilter, setPriceFilter } = usePriceFilter(
    memoizedHotels,
    setFilterHotels
  );
  const { ratingFilter, setRatingFilter } =
    useRatingFilter(memoizedHotels, setFilterHotels);
  const {
    starFilter,
    setStarFilter,
    handleStarFilterChange,
  } = useStarFilter(memoizedHotels, setFilterHotels);

  const calcHotelData = (hotelData) => {
    console.log("calcHotelData");
    if (!hotelData) return setFilterHotels(hotels);
    setFilterHotels(hotelData);
  };

  const resetFilter = () => {
    setPriceFilter(defaultFilter.priceFilter);
    setRatingFilter(defaultFilter.ratingFilter);
    setStarFilter(defaultFilter.starFilter);
    setPagination(defaultFilter.pagination);
    setFilterHotels(hotels);
  };

  useEffect(() => {
    // calcHotelData();
    setFilterHotels(hotels);
  }, [hotels.length]);

  useEffect(() => {
    calcPagination(filterHotels.length);
    // calcHotelData();
  }, [filterHotels]);

  useEffect(() => {
    // calcHotelData();
  }, [pagination]);

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
