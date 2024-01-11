import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  checkInDate: new Date(),
  checkOutDate: new Date(),
  guests: "",
  adults: 1,
  childrens: 0,
  rooms: 1,
};

const searchStore = createSlice({
  name: "searchStore",
  initialState,
  reducers: {
    changeDestination: (state, action) => {},
    changeCheckInOutDate: (state, action) => {},
    changeGuestInfo: (state, action) => {},
  },
});

export const { changeDestination, changeCheckInOutDate, changeGuestInfo } =
  searchStore.actions;

export default searchStore.reducer;
