import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ["userData"],
        }),
        validateAddr: builder.mutation({
            query: address => ({
                url: '/maps/verify-addr',
                method: 'POST',
                body: { ...address }
            })
        })
    })
})

export const {
    useLoginMutation,
    useValidateAddrMutation
} = authApiSlice