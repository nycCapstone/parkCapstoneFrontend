import { apiSlice } from "../../api/apiSlice";
import { setRole } from "../roles/rolesSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserInfo: builder.query({
            query: () => '/user/profile',
            keepUnusedDataFor: 300,
            onSuccess: (response, api) => {
                const userData = response.data; // Access the user data from the response
                api.dispatch(setRole(userData))
            }
        }), 
    })
})
export const { useGetUserInfoQuery } = userApiSlice;