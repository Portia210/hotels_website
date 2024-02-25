import { create } from 'zustand';

const useHotelNameFilterStore = create(set => ({
  hotels: [],
  setHotels: hotels => set({ hotels }),
}));

export default useHotelNameFilterStore;
