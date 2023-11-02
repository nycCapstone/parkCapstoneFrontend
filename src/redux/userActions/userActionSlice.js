import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userActionSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    noActions: (state) => initialState
  }
});

export const getAction = (state) => state.actions;

export const { noActions } = userActionSlice.actions;

export default userActionSlice.reducer;
