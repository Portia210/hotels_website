import { create } from "zustand";

const useHotelTabStore = create((set) => ({
  activeStore: 'matchedHotels',
  setActiveStore: (activeStore) => set(() => ({ activeStore })),
}));
export default useHotelTabStore;
