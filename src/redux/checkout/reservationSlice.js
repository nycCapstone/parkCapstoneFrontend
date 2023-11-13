import { createSlice } from "@reduxjs/toolkit";
//stores property_id, user_id, zipCode, address, start, end time
const initialState = {};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setRInfo: (state, action) => {return {...state, ...action.payload}},
    resetRInfoCache: (state) => {return initialState}
  }
});

export const getReservationStatus = (state) => state?.data

export const { setRInfo, resetRInfoCache } = reservationSlice.actions;

export default reservationSlice.reducer;