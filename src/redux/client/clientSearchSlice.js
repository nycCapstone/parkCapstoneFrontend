import { createSlice } from "@reduxjs/toolkit";

const initialState = { go: false };

const clientSearchSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    searchBookings: (state, action) => {state.go = true },
    resetBookings: (state, action) => {state.go = false }
  }
});

export const getCLSearchStatus = (state) => state?.go.client === true;

export const { searchBookings, resetBookings } = clientSearchSlice.actions;

export default clientSearchSlice.reducer;
