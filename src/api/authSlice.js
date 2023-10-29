// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/helper/helper";
// Define an initial state for your slice
const initialState = {
  accessToken: null,
  roles: null
};

export const refreshAuth = createAsyncThunk('auth/refresh', async () => {
  const response = await axios.get(`${BASE_URL}/refresh`, { withCredentials: true });
  return response.data; // Assuming the response contains the authentication data
});

export const confirmAcc = createAsyncThunk(
  'auth/confirm',
  async (queryParamValue) => {
    // You can access the dynamic value here and use it in the query
    const response = await axios.put(`${BASE_URL}/auth/create-user/auth?k=${queryParamValue}`);
    return response.data; // Assuming the response contains the authentication data
  }
);

const authSlice = createSlice({
  name: "testauth",
  initialState,
  reducers: {
    setAuth: (state, action) => ({...state, ...action.payload}),
    logOut: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(refreshAuth.fulfilled, (state, action) => {
        //state.loading = "fulfilled";
        state.accessToken = action.payload.accessToken;
        state.roles = action.payload.roles;
      });
  },
});

export const getCurrentToken = (state) => state.accessToken;

export const getCurrentRoles = (state) => state.roles;

export const { setAuth, logOut } = authSlice.actions;


export default authSlice.reducer;