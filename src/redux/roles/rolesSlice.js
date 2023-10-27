import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    SET_CLIENT_BCKGR: (state, action) => {
      return {
        ...state,
        Client: { bckgr: action.payload, pmt: state.Client.pmt },
      };
    },
    SET_RENTER_BCKGR: (state, action) => {
      return {
        ...state,
        Renter: { bckgr: action.payload, pmt: state.Renter.pmt },
      };
    },
    setRole: (state, action) => {return {...state, ...action.payload.roles}},
    modifyRole: (state, action) => {
      const data = action.payload;
      if (data?.client_background_verified === true && state?.ClientOnly)
        SET_CLIENT_BCKGR(true);
      if (data?.background_verified === true && state?.Renter)
        SET_RENTER_BCKGR(true);
    },
    LOGOUT: (state) => initialState,
  }
});

export const getRoles = (state) => state.roles;

export const {
  CLIENT_ONLY,
  RENTER,
  SET_CLIENT_BCKGR,
  SET_RENTER_BCKGR,
  LOGOUT,
  setRole,
  modifyRole
} = rolesSlice.actions;

export default rolesSlice.reducer;
