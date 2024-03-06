import { create } from "zustand";

const useFilterStore = create((set) => ({
  currency: null,
  setCurrency: (currency) => set(() => ({ currency })),
}));
export default useFilterStore;
