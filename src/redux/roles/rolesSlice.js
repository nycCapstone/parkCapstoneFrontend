import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Client: { bckgr: false, pmt: false },
  Renter: { bckgr: false, pmt: false },
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    CLIENT_ONLY: (state) => {
      return {
        Client: { bckgr: state.Client.bckgr, pmt: state.Client.pmt },
        ClientOnly: true,
      };
    },
    RENTER: (state) => {
      return {
        Client: { bckgr: state.Client.bckgr, pmt: state.Client.pmt },
        Renter: { bckgr: state.Renter.bckgr, pmt: state.Renter.pmt },
      };
    },
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
    setRole: (state, action) => {
      const data = action.payload;
      if (data.roles.includes(2)) {
        return {
          Client: {
            bckgr: state?.Client.bckgr ?? false,
            pmt: state?.Client.pmt ?? false,
          },
          Renter: {
            bckgr: state?.Renter.bckgr ?? false,
            pmt: state?.Renter.pmt ?? false,
          },
        };
      } else
        return {
          Client: {
            bckgr: state?.Client.bckgr ?? false,
            pmt: state?.Client.pmt ?? false,
          },
          ClientOnly: true,
        };
    },
    modifyRole: (state, action) => {
      const data = action.payload;
      if (data?.client_background_verified === true && state?.ClientOnly)
        SET_CLIENT_BCKGR(true);
      if (data?.background_verified === true && state?.Renter)
        SET_RENTER_BCKGR(true);
    },
    LOGOUT: () => {},
  },
});

export const getRoles = (state) => state.roles;

export const {
  CLIENT_ONLY,
  RENTER,
  SET_CLIENT_BCKGR,
  SET_RENTER_BCKGR,
  LOGOUT,
  setRole,
  modifyRole,
} = rolesSlice.actions;

export default rolesSlice.reducer;
