import { create } from "zustand";

const useSearchStore = create((set) => ({
  session: null,
  searchInput: {},
  searchInputValidation: {
    destination: true,
  },
  setSearchInput: (searchInput) => set(() => ({ searchInput })),
  setSearchInputValidation: (searchInputValidation) =>
    set(() => ({ searchInputValidation })),
  setSession: (session) => set(() => ({ session })),
}));

export default useSearchStore;
