import { convertRoomInfo } from "@/utils/convertRoomInfo";
import dayjs from "dayjs";
import { cloneDeep, } from "lodash";
import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchInput: {},
  searchInputValidation: {
    destination: true,
  },
  setSearchInput: (searchInput) => set(() => ({ searchInput })),
  setSearchInputValidation: (searchInputValidation) =>
    set(() => ({ searchInputValidation })),
  setSession: (session) => set(() => ({ session })),
  setDestination: (destination) =>
    set((state) => {
      state.searchInput.destination = destination;
      return state;
    }),
  setDateSearch: (dates) =>
    set((state) => {
      state.searchInput.checkInDate = dayjs(dates[0])?.format("YYYY-MM-DD");
      state.searchInput.checkOutDate = dayjs(dates[1])?.format("YYYY-MM-DD");
      return state;
    }),
  setGuestInfo: (rooms) =>
    set((state) => {
      const childrenAges = rooms
        .map((room) => room.childrens)
        .flat()
        .map((age) => Number(age));
      const guests = convertRoomInfo(rooms);
      let searchInput = state.searchInput;
      searchInput = {
        ...searchInput,
        rooms: rooms.length,
        adults: rooms.reduce((acc, room) => acc + room.adults, 0),
        childrens: rooms.reduce((acc, room) => acc + room.childrens.length, 0),
        childrenAges,
        guests,
      };
      state.searchInput = searchInput;
      return state;
    }),
}));

export default useSearchStore;
