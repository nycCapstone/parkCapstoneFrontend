import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../redux/auth/authSlice";
import rolesReducer from "../redux/roles/rolesSlice";
import formsReducer from "../redux/forms/formsSlice";
import actionsReducer from "../redux/userActions/userActionSlice";
import searchReducer from "../redux/search/searchResultsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    roles: rolesReducer,
    forms: formsReducer,
    actions: actionsReducer,
    auth: authReducer,
    searchResults: searchReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
