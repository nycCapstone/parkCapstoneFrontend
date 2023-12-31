import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../redux/auth/authSlice";
import rolesReducer from "../redux/roles/rolesSlice";
import formsReducer from "../redux/forms/formsSlice";
import searchReducer from "../redux/search/searchResultsSlice";
import landingSearchReducer from "../redux/landing/landingSearchSlice";
import checkoutReducer from "../redux/checkout/checkoutSlice";
import clientSearchReducer from "../redux/client/clientSearchSlice";
import reservationReducer from "../redux/checkout/reservationSlice";
import changeTimeReducer from "../redux/landing/changeTimeSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    roles: rolesReducer,
    forms: formsReducer,
    auth: authReducer,
    searchResults: searchReducer,
    landing: landingSearchReducer,
    checkout: checkoutReducer,
    reservation: reservationReducer,
    client: clientSearchReducer,
    changeTime: changeTimeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});
