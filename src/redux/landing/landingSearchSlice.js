import { createSlice } from "@reduxjs/toolkit";
//stores zipCode, address, start, end time
const initialState = [];

const landingSearchSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    searchLandingBookings: (state, action) => {
      return [...state, action.payload];
    },
    searchLandingMutate: (state, _) => {
      return state.length > 1 ? state.slice(0, -1) : state;
    },
    resetLandingCache: (state) => {
      return initialState;
    },
  },
});

export const getLanSearchStatus = (state) => state.landing.length === 0;

export const { searchLandingBookings, searchLandingMutate, resetLandingCache } =
  landingSearchSlice.actions;

export default landingSearchSlice.reducer;

