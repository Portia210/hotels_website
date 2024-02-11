import useHotelFilterStore from "@/store/useHotelFilterStore";
import { useEffect } from "react";
import { defaultFilter } from "./hotelFilters";
import useHotelGapFilter from "./hotelFilters/useHotelGapFilter";
import useHotelPagination from "./hotelFilters/useHotelPagination";
import usePriceFilter from "./hotelFilters/usePriceFilter";
import useRatingFilter from "./hotelFilters/useRatingFilter";
import useStarFilter from "./hotelFilters/useStarFilter";

const useFilterBar = (hotels) => {
  const { setGapActive, filterHotels, setFilterHotels } =
    useHotelFilterStore();

  const {
    currentPage,
    pagination,
    setPagination,
    setCurrentPage,
    calcPagination,
  } = useHotelPagination();

  const getData = () => {
    console.log("filterHotels", filterHotels);
    if (Array.isArray(filterHotels)) {
      return filterHotels.slice(
        pagination.offset,
        pagination.offset + pagination.limit
      );
    }
    return [];
  };

  const { ratingFilter, setRatingFilter, handleRatingFilterChange } =
    useRatingFilter();
  const { starFilter, setStarFilter, handleStarFilterChange } = useStarFilter();
  useHotelGapFilter();

  const { priceFilter, setPriceFilter } = usePriceFilter();

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
    data: getData(),
    totalFilter: filterHotels.length,
    priceFilter,
    ratingFilter,
    starFilter,
    currentPage,
    pagination,
    setPriceFilter,
    setCurrentPage,
    handleRatingFilterChange,
    handleStarFilterChange,
    resetFilter,
  };
};

export default useFilterBar;
