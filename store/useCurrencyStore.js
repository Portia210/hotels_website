import { create } from "zustand";

const useCurrencyStore = create((set) => ({
  currency: null,
  setCurrency: (currency) => set(() => ({ currency })),
}));
export default useCurrencyStore;
