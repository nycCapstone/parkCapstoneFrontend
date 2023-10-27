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
    formValue: {
        reducer(state, action) {
            return { ...state, ...action.payload}
        },
        prepare (userData, roles, err) {
            const co = roles?.ClientOnly && !userData?.client_background_verified && "client";
            const ro = roles?.Renter && !userData?.client_background_verified && "client";
            const ra = roles?.Renter && userData?.client_background_verified && !userData?.background_verified && "renter";
            let stack = [co, ro, ra];
            let next = stack.find(item => typeof item === 'string');
            return {
                payload: {
                    mode: next || null,
                    data: {
                        URL: next === "client" ? '/user/update-address' : next === "renter" ? '/renters/update-address' : null,
                        ClientOnly: roles?.hasOwnProperty('ClientOnly'),
                        isFormEnabled: !(err || (roles?.Renter && !userData?.background_verified)) ?? true
                    }
                }
            }
        }
    },
    resetForm: (state) => initialState
  },
});

export const getFormData = (state) => state.forms;

export const { formValue, resetForm } = formsSlice.actions;

export default formsSlice.reducer;
