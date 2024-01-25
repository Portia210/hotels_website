import { PriceFilter } from "@/constants/searchFilter";
import { cloneDeep } from "lodash";
import { useEffect, useMemo, useState } from "react";

const hotelPerPage = 24;
const defaultFilter = {
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
  const [priceFilter, setPriceFilter] = useState(defaultFilter.priceFilter);
  const [ratingFilter, setRatingFilter] = useState(defaultFilter.ratingFilter);
  const [starFilter, setStarFilter] = useState(defaultFilter.starFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(defaultFilter.pagination);
  const memoizedHotels = useMemo(() => cloneDeep(hotels), [hotels]);

  const calcPagination = (hotelLength) => {
    const totalPages = Math.ceil(hotelLength / pagination.limit);
    const totalResults = hotelLength;
    if (totalResults < hotelPerPage) {
      setPagination(() => ({ ...defaultFilter.pagination }));
    } else {
      setPagination((prev) => ({ ...prev, totalPages, totalResults }));
    }
  };

  const calcHotelData = (hotelData) => {
    if (!hotelData) return;
    setFilterHotels(hotelData);
  };

  const handleStarFilterChange = (value) => {
    setStarFilter((prev) => {
      if (prev === value) {
        return 0;
      }
      return value;
    });
  };

  const filterHotelByPrice = () => {
    const cloneHotels = [...memoizedHotels];
    if (priceFilter === PriceFilter.HTL) {
      cloneHotels.sort((a, b) => b.travelorPrice - a.travelorPrice);
    } else {
      cloneHotels.sort((a, b) => a.travelorPrice - b.travelorPrice);
    }
    calcHotelData(cloneHotels);
  };

  const filterHotelByRating = () => {
    const cloneHotels = [...memoizedHotels];
    const filterHotels = cloneHotels.filter(
      (hotel) => hotel.rate >= ratingFilter
    );
    calcHotelData(filterHotels);
  };

  const filterHotelByStar = () => {
    const cloneHotels = [...memoizedHotels];
    const filterHotels = cloneHotels.filter(
      (hotel) => hotel.stars >= starFilter
    );
    calcHotelData(filterHotels);
  };

  const filterByBiggestPriceGap = () => {
    const cloneHotels = [...memoizedHotels];
    cloneHotels.sort((a, b) => b.price_difference - a.price_difference);
    calcHotelData(cloneHotels);
  };

  const resetFilter = () => {
    setPriceFilter(defaultFilter.priceFilter);
    setRatingFilter(defaultFilter.ratingFilter);
    setStarFilter(defaultFilter.starFilter);
    setPagination(defaultFilter.pagination);
    calcHotelData();
  };

  useEffect(() => {
    const offset = (currentPage - 1) * pagination.limit;
    setPagination((prev) => ({ ...prev, page: currentPage, offset }));
  }, [currentPage]);

  useEffect(() => {
    calcHotelData();
    setFilterHotels(hotels);
  }, [hotels.length]);

  useEffect(() => {
    calcPagination(filterHotels.length);
    calcHotelData();
  }, [filterHotels]);

  useEffect(() => {
    calcHotelData();
  }, [pagination]);

  useEffect(() => {
    filterHotelByPrice();
  }, [priceFilter]);

  useEffect(() => {
    filterHotelByRating();
  }, [ratingFilter]);

  useEffect(() => {
    filterHotelByStar();
  }, [starFilter]);

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
