import { create } from "zustand";

const useCurrencyStore = create((set) => ({
  currency: null,
  setCurrency: (currency) => set(() => ({ currency })),
  currencies: [],
  setCurrencies: (currencies) => set(() => ({ currencies })),
}));
export default useCurrencyStore;
