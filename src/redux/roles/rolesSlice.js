import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRole: (state, action) => {return {...state, ...action.payload.roles}},
    LOGOUT: (state) => initialState,
  }
});

export const getRoles = (state) => state.roles;

export const {
  LOGOUT,
  setRole
} = rolesSlice.actions;

export default rolesSlice.reducer;
