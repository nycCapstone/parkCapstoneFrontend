import { apiSlice } from "../../api/apiSlice";

export const renterApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProperties: builder.query({
            query: () => ({
                url: `/renters/get-yourinfo`,
                providesTags: ['renterData']
            })
        }),
        submitProperty: builder.mutation({
            query: data => ({
                url: '/renters/create-property',
                method: 'POST',
                body: { ...data }
            })
        }),
    })
})

export const {
    useGetPropertiesQuery, useSubmitPropertyMutation
} = renterApiSlice