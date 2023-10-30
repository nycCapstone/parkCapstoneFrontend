import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: null,
  data: {
  URL: null,
  ClientOnly: true,
  isFormEnabled: true,
}
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    resetForm: (state) => initialState
  },
});

export const getFormData = (state) => state.forms;

export const { resetForm } = formsSlice.actions;

export default formsSlice.reducer;
