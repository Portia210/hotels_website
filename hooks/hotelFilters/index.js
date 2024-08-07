import { PriceFilter } from "@/constants/searchFilter";

export const hotelPerPage = 24;
export const defaultFilter = {
  priceFilter: PriceFilter.HTL,
  ratingFilter: 6,
  starFilter: 0,
  distanceSortOrder: '',
  distanceFilter: 10000,
  pagination: {
    page: 1,
    limit: hotelPerPage,
    totalPages: 1,
    totalResults: 1,
    offset: 0,
  },
};

export const FILTER_TYPE = {
  RATING: "RATING",
  STARS: "STARS",
  PRICE_ORDER: "PRICE_ORDER",
  PRICE_GAP: "PRICE_GAP",
  DISTANCE: "DISTANCE",
  DISTANCE_ORDER: "DISTANCE_ORDER",
};
