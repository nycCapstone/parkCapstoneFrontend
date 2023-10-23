import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  URL: "",
  clientOnly: true,
  isFormEnabled: false,
  mode: "",
};

const formsSlice = createSlice({
  name: "form",
  initialState,
  reducers: {},
});

export const getFormData = (state) => state.form;

export const {} = formsSlice.actions;

export default formsSlice.reducer;
