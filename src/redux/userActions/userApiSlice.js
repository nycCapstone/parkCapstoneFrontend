import { apiSlice } from "../../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserInfo: builder.query({
            query: () => '/user/profile',
            keepUnusedDataFor: 300,
            onSuccess: (response, api) => {
                const userData = response.data; // Access the user data from the response
            }
        }),
        getInfo: builder.query({
            query: () => '/user/profile',
            // Define revalidation options (e.g., refetch every 60 seconds)
            provides: ['auth'],
            refetchInterval: 180 * 1000 // 60 seconds
          }),
    })
})
export const { useGetUserInfoQuery, useGetInfoQuery  } = userApiSlice;