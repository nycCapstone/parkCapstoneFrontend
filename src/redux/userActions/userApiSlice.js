import { apiSlice } from "../../api/apiSlice";
import { LOGOUT, setRole } from "../roles/rolesSlice";
import { logOut, setAuth } from "../auth/authSlice";
import { confirmAddress, noActions } from "./userActionSlice";
import { formValue } from "../forms/formsSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserInfo: builder.query({
            query: () => '/user/profile',
            onSuccess: (response, api) => {
                api.dispatch(setAuth(response.data));
                api.dispatch(setRole(response.data));
                api.dispatch(confirmAddress(response.data.roles));
                api.dispatch(formValue(response.data, response.data.roles, false));  
            }
        }),
        getInfo: builder.query({
            query: () => '/user/profile',
            // Define revalidation options (e.g., refetch every 60 seconds)
            provides: ['auth'],
            refetchInterval: 180 * 1000 // 60 seconds
          })
    })
})
export const { useGetUserInfoQuery, useGetInfoQuery } = userApiSlice;