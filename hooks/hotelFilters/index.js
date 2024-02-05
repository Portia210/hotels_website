import { PriceFilter } from "@/constants/searchFilter";

export const hotelPerPage = 24;
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
