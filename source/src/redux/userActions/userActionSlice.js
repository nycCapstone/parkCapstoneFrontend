import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userActionSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    confirmAddress: {
      reducer(state, action) {
        
        return [...action.payload];
      },
      prepare (roles) {

        let stack = [];

        if (roles?.ClientOnly && !roles.Client.bckgr) stack.unshift("confirm_client_email");
        if (roles?.Renter && !roles.Client.bckgr) stack.unshift("confirm_primary_email");
        if (roles?.Renter && !roles.Renter.bckgr) stack.unshift("confirm_renter_email");
        return { payload: stack};

      }
    },
    noActions: () => initialState
  }
});

export const getAction = (state) => state.actions;

export const { confirmAddress, noActions } = userActionSlice.actions;

export default userActionSlice.reducer;
