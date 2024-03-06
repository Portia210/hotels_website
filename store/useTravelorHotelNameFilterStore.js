import { create } from 'zustand';

const useTravelorHotelNameFilterStore = create(set => ({
  hotels: [],
  setHotels: hotels => set({ hotels }),
}));

export default useTravelorHotelNameFilterStore;
