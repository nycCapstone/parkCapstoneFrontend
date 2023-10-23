import { configureStore } from "@reduxjs/toolkit";
import rolesReducer from '../redux/roles/rolesSlice';
//import formsReducer from '../redux/forms/formsSlice';

export const store = configureStore({
    reducer: {
        roles: rolesReducer,
        //forms: formsReducer
    }
})