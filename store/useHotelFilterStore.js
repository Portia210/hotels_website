import { create } from "zustand";

const useHotelFilterStore = create((set) => ({
  gapActive: false,
  setGapActive: (gapActive) => set(() => ({ gapActive })),
}));

export default useHotelFilterStore;
