import useHotelFilterStore from '@/store/useHotelFilterStore';
import { useEffect } from 'react';
import { defaultFilter } from './hotelFilters';
import useHotelGapFilter from './hotelFilters/useHotelGapFilter';
import useHotelPagination from './hotelFilters/useHotelPagination';
import usePriceFilter from './hotelFilters/usePriceFilter';
import useRatingFilter from './hotelFilters/useRatingFilter';
import useStarFilter from './hotelFilters/useStarFilter';

// TODO: optimize this hook, reduce the number of re-renders
const useFilterBar = hotels => {
  const hotelFilterStore = useHotelFilterStore();
  const {
    setGapActive,
    filterHotels,
    setFilterHotels,
    onFilterHotel,
    setHotels,
  } = hotelFilterStore;

  const {
    currentPage,
    pagination,
    setPagination,
    setCurrentPage,
    calcPagination,
  } = useHotelPagination();

  const getData = () => {
    if (Array.isArray(filterHotels)) {
      return filterHotels.slice(
        pagination.offset,
        pagination.offset + pagination.limit,
      );
    }
    return [];
  };

  const { ratingFilter, setRatingFilter, handleRatingFilterChange } =
    useRatingFilter(hotelFilterStore);
  const { starFilter, setStarFilter, handleStarFilterChange } = useStarFilter(hotelFilterStore);
  useHotelGapFilter(hotelFilterStore);

  const { priceFilter, setPriceFilter } = usePriceFilter(hotelFilterStore);

  const resetFilter = () => {
    setPriceFilter(defaultFilter.priceFilter);
    setRatingFilter(defaultFilter.ratingFilter);
    setStarFilter(defaultFilter.starFilter);
    setFilterHotels(hotels);
    setHotels(hotels);
    setGapActive(false);
    setPagination(defaultFilter.pagination);
    setCurrentPage(1);
  };

  useEffect(() => {
    setFilterHotels(hotels);
    onFilterHotel();
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
