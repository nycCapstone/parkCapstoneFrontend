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
                const userData = response.data; // Access the user data from the response
                api.dispatch(setRole(userData));
                api.dispatch(setAuth(userData));
                api.dispatch(confirmAddress(userData.roles));
                api.dispatch(formValue(userData, userData.roles, false));
            }
        }),
        getInfo: builder.query({
            query: () => '/user/profile',
            // Define revalidation options (e.g., refetch every 60 seconds)
            provides: ['auth'],
            refetchInterval: 180 * 1000 // 60 seconds
          }),
        logout: builder.query({
            query: () => '/logout',
            onSuccess: (response, api) => {
                api.dispatch(logOut());
                api.dispatch(LOGOUT());
                api.dispatch(noActions());
                localStorage.removeItem("persist");
            }
          }),
    })
})
export const { useGetUserInfoQuery, useGetInfoQuery, useLogoutQuery } = userApiSlice;