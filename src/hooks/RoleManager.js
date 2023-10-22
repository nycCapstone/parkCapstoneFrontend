
import { useReducer } from "react";
import { SITEROLES } from "../constants/helper/helper";

const actionTypes = {
  CLIENT_ONLY: "CLIENT_ONLY",
  RENTER: "RENTER",
  FLIP_CLIENT_BCKGR: "FLIP_CLIENT_BCKGR",
  FLIP_RENTER_BCKGR: "FLIP_RENTER_BCKGR",
  FLIP_CLIENT_PMT: "FLIP_CLIENT_PMT",
  FLIP_PMT: "FLIP_PMT",
  LOGOUT: "LOGOUT"
};

function rolesReducer(state, action) {
  switch (action.type) {
    case actionTypes.CLIENT_ONLY:
      return {
        Client: { ...state.Client },
        ClientOnly: true
      };
    case actionTypes.RENTER:
      return {
        Client: { ...state.Client },
        Renter: { ...state.Renter },
        RenterClient: true
      };
    case actionTypes.FLIP_CLIENT_BCKGR:
      return {
        ...state,
        Client: { ...state.Client, 1: { ...state.Client[1], bckgr: true } }
      };
    case actionTypes.FLIP_RENTER_BCKGR:
      return {
        ...state,
        Client: { ...state.Client, 1: { ...state.Client[1], bckgr: true } },
        Renter: { ...state.Renter, 2: { ...state.Renter[2], bckgr: true } },
      };
    case actionTypes.FLIP_CLIENT_PMT:
      return {
        ...state,
        Client: { ...state.Client, 1: { ...state.Client[1], pmt: true } }
      };
    case actionTypes.FLIP_PMT:
      return {
        ...state,
        Client: { ...state.Client, 1: { ...state.Client[1], pmt: true } },
        Renter: { ...state.Renter, 2: { ...state.Renter[2], pmt: true } },
      };
    case actionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
}

export function useRolesReducer() {
  return useReducer(rolesReducer, SITEROLES);
}