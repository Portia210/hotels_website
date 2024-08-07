import { useEffect } from 'react';
import useTravelorHotelFilterStore from '../store/useTravelorHotelFilterStore';
import { defaultFilter } from './hotelFilters';
import useHotelPagination from './hotelFilters/useHotelPagination';
import usePriceFilter from './hotelFilters/usePriceFilter';
import useRatingFilter from './hotelFilters/useRatingFilter';
import useStarFilter from './hotelFilters/useStarFilter';
import useDistanceFilter from './hotelFilters/useDistanceFilter';
import eventEmitter from '@/utils/eventEmitter';
import { EVENT_TYPES } from '@/constants/events';

// TODO: optimize this hook, reduce the number of re-renders
const useTravelorFilterBar = hotels => {
  const travelorHotelFilterStore = useTravelorHotelFilterStore();
  const {
    setGapActive,
    filterHotels,
    setFilterHotels,
    onFilterHotel,
    setHotels,
    resetCondition,
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

  const {
    distanceFilter,
    setDistanceFilter,
    distanceSortOrder,
    setDistanceSortOrder,
  } = useDistanceFilter(travelorHotelFilterStore);
  const { ratingFilter, setRatingFilter, handleRatingFilterChange } =
    useRatingFilter(travelorHotelFilterStore);
  const { starFilter, setStarFilter, handleStarFilterChange } = useStarFilter(
    travelorHotelFilterStore,
  );

  const { priceFilter, setPriceFilter } = usePriceFilter(
    travelorHotelFilterStore,
  );

  const resetFilter = () => {
    resetCondition();
    setPriceFilter(defaultFilter.priceFilter);
    setRatingFilter(defaultFilter.ratingFilter);
    setStarFilter(defaultFilter.starFilter);
    setFilterHotels(hotels);
    setHotels(hotels);
    setGapActive(false);
    setPagination(defaultFilter.pagination);
    setCurrentPage(1);
    eventEmitter.emit(EVENT_TYPES.RESET_FILTER);
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
    distanceFilter,
    distanceSortOrder,
    setDistanceFilter,
    setDistanceSortOrder,
    setPriceFilter,
    setCurrentPage,
    handleRatingFilterChange,
    handleStarFilterChange,
    resetFilter,
  };
};

export default useTravelorFilterBar;
