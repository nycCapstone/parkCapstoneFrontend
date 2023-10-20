
import { useReducer } from "react";
import { SITEROLES } from "../helper/helper";

const actionTypes = {
  CLIENT_ONLY: "CLIENT_ONLY",
  RENTER: "RENTER",
  FLIP_BCKGR: "FLIP_BCKGR",
  FLIP_PMT: "FLIP_PMT",
  LOGOUT: "LOGOUT"
};

function rolesReducer(state, action) {
  switch (action.type) {
    case actionTypes.CLIENT_ONLY:
      return {
        Client: { ...state.Client }
      };
    case actionTypes.RENTER:
      return {
        Client: { ...state.Client },
        Renter: { ...state.Renter }
      };
    case actionTypes.FLIP_BCKGR:
      return {
        ...state,
        Client: { ...state.Client, 1: { ...state.Client[1], bckgr: true } },
        Renter: { ...state.Renter, 2: { ...state.Renter[2], bckgr: true } },
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