import { PriceFilter } from "@/constants/searchFilter";
import { FILTER_TYPE } from "@/hooks/hotelFilters";
import { create } from "zustand";

const filterHotelByPrice = (filterType, hotels) => {
  let results = [];
  if (filterType === PriceFilter.HTL) {
    results = hotels.sort((a, b) => b.travelorPrice - a.travelorPrice);
  } else {
    results = hotels.sort((a, b) => a.travelorPrice - b.travelorPrice);
  }
  return results;
};

const filterByBiggestPriceGap = (hotels) => {
  const results = hotels.sort(
    (a, b) => b.price_difference - a.price_difference
  );
  return results;
};

const filterHotelByRating = (hotels, ratingFilter) => {
  const results = hotels.filter((hotel) => hotel.rate >= ratingFilter);
  return results;
};

const filterHotelByStar = (hotels, starFilter) => {
  const results = hotels.filter((hotel) => hotel.stars >= starFilter);
  return results;
};

const filterHotel = (condition, hotels) => {
  let results = hotels;
  if (condition.ratingFilter) {
    results = filterHotelByRating(results, condition.ratingFilter);
  }
  if (condition.starFilter) {
    results = filterHotelByStar(results, condition.starFilter);
  }
  if (condition.priceFilter) {
    results = filterHotelByPrice(condition.priceFilter, results);
  }
  if (condition.priceGapFilter) {
    results = filterByBiggestPriceGap(results);
  }
  return results;
};

const useHotelFilterStore = create((set) => ({
  gapActive: false,
  setGapActive: (gapActive) => set(() => ({ gapActive })),
  filterHotels: [],
  setFilterHotels: (filterHotels) => set(() => ({ filterHotels })),
  condition: {},
  setCondition: (type, condition) =>
    set((state) => {
      if (type === FILTER_TYPE.RATING) {
        state.condition.ratingFilter = condition;
      } else if (type === FILTER_TYPE.STARS) {
        state.condition.starFilter = condition;
      } else if (type === FILTER_TYPE.PRICE_ORDER) {
        state.condition.priceFilter = condition;
        state.condition.priceGapFilter = false;
      } else if (type === FILTER_TYPE.PRICE_GAP) {
        state.condition.priceGapFilter = condition;
      }
      const filterHotels = filterHotel(state.condition, state.filterHotels);
      return { filterHotels, condition: state.condition };
    }),
}));

export default useHotelFilterStore;
