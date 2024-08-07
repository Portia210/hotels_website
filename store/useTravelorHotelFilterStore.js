import { FILTER_TYPE, defaultFilter } from '@/hooks/hotelFilters';
import { filterHotelV2 } from '@/utils/hotelFilter';
import { create } from 'zustand';

const useTravelorHotelFilterStore = create((set, get) => ({
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
    const condition = useTravelorHotelFilterStore.getState().condition;
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
  resetCondition: () => {
    set(state => {
      state.condition = {
        ...defaultFilter,
      };
      return state;
    });
  },
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
      state.gapActive = false;
      break;
    case FILTER_TYPE.PRICE_GAP:
      state.condition.priceGapFilter = condition;
      break;
    case FILTER_TYPE.DISTANCE_ORDER:
      state.condition.distanceSortOrder = condition;
      state.condition.priceGapFilter = false;
      state.gapActive = false;
      break;
    case FILTER_TYPE.DISTANCE:
      state.condition.distanceFilter = condition;
      break;
    default:
      return state.hotels; // Return original hotels if type is not recognized
  }

  filterHotels = filterHotelV2(state.condition, state.hotels);
  return filterHotels;
};
export default useTravelorHotelFilterStore;
