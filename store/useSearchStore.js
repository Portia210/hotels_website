import { create } from "zustand";

const useSearchStore = create((set) => ({
  session: null,
  searchInput: {},
  setSearchInput: (searchInput) => set(() => ({ searchInput })),
  setSession: (session) => set(() => ({ session })),
}));

export default useSearchStore;
