import { FILTER_TYPE, defaultFilter } from '@/hooks/hotelFilters';
import {
  filterHotel,
  filterHotelByPrice
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
      if (type === FILTER_TYPE.RATING) {
        state.condition.ratingFilter = condition;
        filterHotels = filterHotel(state.condition, state.hotels);
      } else if (type === FILTER_TYPE.STARS) {
        state.condition.starFilter = condition;
        filterHotels = filterHotel(state.condition, state.hotels);
      } else if (type === FILTER_TYPE.PRICE_ORDER) {
        state.condition.priceFilter = condition;
        state.condition.priceGapFilter = false;
        filterHotels = filterHotel(state.condition, state.filterHotels);
      } else if (type === FILTER_TYPE.PRICE_GAP) {
        state.condition.priceGapFilter = condition;
        const filteredHotelPriceOrder = filterHotelByPrice(
          state.condition.priceFilter,
          state.filterHotels,
        );
        filterHotels = filterHotel(state.condition, filteredHotelPriceOrder);
      }
      state.condition.lastAction = {
        type,
        condition,
      };
      return { filterHotels, condition: state.condition };
    }),
}));
export default useHotelFilterStore;
