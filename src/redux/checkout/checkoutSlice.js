import { createSlice } from "@reduxjs/toolkit";
//stores property_id, user_id, zipCode, address, start, end time
const initialState = {};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    inputUserInfo: (state, action) => {return {...state, ...action.payload}},
    resetCheckoutCache: (state) => {return initialState}
  }
});

export const getCheckoutState = (state) => state?.info

export const { inputUserInfo, resetCheckoutCache } = checkoutSlice.actions;

export default checkoutSlice.reducer;