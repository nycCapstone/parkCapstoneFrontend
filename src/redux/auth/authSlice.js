import { createSlice } from "@reduxjs/toolkit";

const initialState = { accessToken: null, persist: true };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPersist: (state, action) => {
      return { ...state, persist: action.payload };
    },
    setAuth: (state, action) => ({ ...state, ...action.payload }),
    logOut: (state) => initialState,
  },
});

export const { logOut, setPersist, setAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.accessToken;

export const getAuth = (state) => state.auth;
