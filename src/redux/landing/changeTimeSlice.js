import { createSlice } from "@reduxjs/toolkit";
//stores zipCode, address, start, end time
const initialState = { property_id: "", infoPrompt: "" };

const changeTimeSlice = createSlice({
  name: "changeTime",
  initialState,
  reducers: {
    updateInfoPrompt: (state, action) => ({ ...state, ...action.payload }),
    resetInfoPrompt: (state) => {
      return initialState;
    },
  },
});

export const { updateInfoPrompt, resetInfoPrompt } = changeTimeSlice.actions;

export default changeTimeSlice.reducer;
