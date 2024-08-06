import { FILTER_TYPE, defaultFilter } from '@/hooks/hotelFilters';
import {
  filterHotel,
  filterHotelByPrice,
} from '@/utils/hotelFilter';
import { create } from 'zustand';

const useHotelFilterStore = create((set, get) => ({
  gapActive: false,
  setGapActive: gapActive => set(() => ({ gapActive })),
  hotels: [],
  setHotels: hotels => set(() => ({ hotels })),
  filterHotels: [],
  setFilterHotels: filterHotels => set(() => ({ filterHotels })),
  condition: {
    ...defaultFilter,
  },
  onFilterHotel: () => {
    const condition = useHotelFilterStore.getState().condition;
    if (condition?.lastAction) {
      const { type, condition: actionCondition } = condition.lastAction;
      get().setCondition(type, actionCondition);
    }
  },
  setCondition: (type, condition) =>
    set(state => {
      let filterHotels = [];
      filterHotels = handleFilterHotels(state, type, condition);
      state.condition.lastAction = {
        type,
        condition,
      };
      return { filterHotels, condition: state.condition };
    }),
}));

const handleFilterHotels = (state, type, condition) => {
  let filterHotels = [];

  switch (type) {
    case FILTER_TYPE.RATING:
      state.condition.ratingFilter = condition;
      break;
    case FILTER_TYPE.STARS:
      state.condition.starFilter = condition;
      break;
    case FILTER_TYPE.PRICE_ORDER:
      state.condition.priceFilter = condition;
      state.condition.priceGapFilter = false;
      break;
    case FILTER_TYPE.PRICE_GAP:
      state.condition.priceGapFilter = condition;
      const filteredHotelPriceOrder = filterHotelByPrice(
        state.condition.priceFilter,
        state.hotels,
      );
      filterHotels = filterHotel(state.condition, filteredHotelPriceOrder);
      return filterHotels; // Return early as we already filtered by price order
    case FILTER_TYPE.DISTANCE_ORDER:
      state.condition.distanceSortOrder = condition;
      state.condition.priceGapFilter = false;
      break;
    case FILTER_TYPE.DISTANCE:
      state.condition.distanceFilter = condition;
      break;
    default:
      return state.hotels; // Return original hotels if type is not recognized
  }

  filterHotels = filterHotel(state.condition, state.hotels);
  return filterHotels;
};
export default useHotelFilterStore;
