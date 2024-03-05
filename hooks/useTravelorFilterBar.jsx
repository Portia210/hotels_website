import useHotelFilterStore from '@/store/useHotelFilterStore';
import { useEffect } from 'react';
import { defaultFilter } from './hotelFilters';
import useHotelGapFilter from './hotelFilters/useHotelGapFilter';
import useHotelPagination from './hotelFilters/useHotelPagination';
import usePriceFilter from './hotelFilters/usePriceFilter';
import useRatingFilter from './hotelFilters/useRatingFilter';
import useStarFilter from './hotelFilters/useStarFilter';
import useTravelorHotelFilterStore from '../store/useTravelorHotelFilterStore';

// TODO: optimize this hook, reduce the number of re-renders
const useTravelorFilterBar = hotels => {
  const travelorHotelFilterStore = useTravelorHotelFilterStore();
  const {
    setGapActive,
    filterHotels,
    setFilterHotels,
    onFilterHotel,
    setHotels,
  } = travelorHotelFilterStore;

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
    useRatingFilter(travelorHotelFilterStore);
  const { starFilter, setStarFilter, handleStarFilterChange } = useStarFilter(
    travelorHotelFilterStore,
  );
  useHotelGapFilter(travelorHotelFilterStore);

  const { priceFilter, setPriceFilter } = usePriceFilter(
    travelorHotelFilterStore,
  );

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

export default useTravelorFilterBar;
