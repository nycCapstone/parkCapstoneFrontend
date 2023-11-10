import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userActionSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    stepOne: (state) => { state = state.concat(1) },
    stepTwo: (state) => { state = state.concat(2) },
    stepThree: (state) => { state = state.concat(3) },
    noActions: (state) => initialState
  }
});

export const getAction = (state) => state.actions;

export const { noActions, stepOne, stepTwo, stepThree } = userActionSlice.actions;

export default userActionSlice.reducer;
