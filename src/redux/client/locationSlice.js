import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const locationSlice = createSlice({
  name: "user_location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetLocation: (state) => initialState,
  },
});

export const getLocation = (state) => state.user_location;

export const { resetLocation, setLocation } = locationSlice.actions;

export default locationSlice.reducer;
