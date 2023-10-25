import { apiSlice } from "../../api/apiSlice";

export const formApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        submitAddress: builder.mutation({
            query: () => ({
                method: 'POST',
            })
        }),
    })
})
export const { useSubmitAddressMutation } = formApiSlice;