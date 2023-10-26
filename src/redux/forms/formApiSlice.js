import { apiSlice } from "../../api/apiSlice";

export const formApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        submitAddress: builder.mutation({
            query: (data) => ({
                url: data.url,
                method: 'POST',
                body: data.body
            })
        }),
    })
})
export const { useSubmitAddressMutation } = formApiSlice;