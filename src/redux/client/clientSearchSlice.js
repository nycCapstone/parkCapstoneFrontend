import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const clientSearchSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    searchBookings: (state, action) => {return action.payload}
  }
});

export const { searchBookings } = clientSearchSlice.actions;

export default clientSearchSlice.reducer;
