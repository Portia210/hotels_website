import { PriceFilter } from "@/constants/searchFilter";
import { cloneDeep } from "lodash";
import { useEffect, useMemo, useState } from "react";

const defaultFilter = {
  priceFilter: PriceFilter.HTL,
  ratingFilter: 6,
  starFilter: [3],
  pagination: {
    page: 1,
    limit: 36,
    totalPages: 1,
    totalResults: 1,
    offset: 0,
  },
};

const useFilterBar = (hotels) => {
  const [data, setData] = useState(hotels.slice(0, 36));
  const [priceFilter, setPriceFilter] = useState(defaultFilter.priceFilter);
  const [ratingFilter, setRatingFilter] = useState(defaultFilter.ratingFilter);
  const [starFilter, setStarFilter] = useState(defaultFilter.starFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(defaultFilter.pagination);
  const memoizedHotels = useMemo(() => cloneDeep(hotels), [hotels]);

  const calcPagination = () => {
    const totalPages = Math.ceil(hotels.length / pagination.limit);
    const totalResults = hotels.length;
    setPagination((prev) => ({ ...prev, totalPages, totalResults }));
  };

  const calcHotelData = (hotelData) => {
    let data = [];
    if (!hotelData) {
      data = memoizedHotels.slice(
        pagination.offset,
        pagination.offset + pagination.limit
      );
    } else {
      data = hotelData.slice(
        pagination.offset,
        pagination.offset + pagination.limit
      );
    }
    setData(data);
  };

  const handleStarFilterChange = (value) => {
    setStarFilter((prev) => {
      if (prev.includes(value)) {
        return prev.filter((star) => star !== value);
      }
      return [...prev, value];
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
    const filterHotels = cloneHotels.filter((hotel) => {
      if (starFilter.length === 0) return true;
      return starFilter.includes(hotel.stars);
    });
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
    calcPagination();
    setData(hotels);
  }, [hotels]);

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
    data,
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
