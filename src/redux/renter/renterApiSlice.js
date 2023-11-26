import { apiSlice } from "../../api/apiSlice";

export const renterApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProperties: builder.query({
            query: () => ({
                url: `/renters/get-yourinfo`,
                providesTags: ['renterData'],
            })
        }),
        getPropAndSpaceInfo: builder.query({
            query: (pid) => ({
                url: `/renters/get-property-with-spaceinfo?pid=${pid}`,
                providesTags: ['spacesData']
            })
        }),
        getSoldSpaces: builder.query({
            query: () => ({
                url: `/renters/get-soldbookings`,
                providesTags: ['soldSpaces']
            })
        }),
        getActiveByOwnerId: builder.query({
            query: () => ({
                url: `/renters/get-bookingactivity`,
                providesTags: ['activeSpaces']
            })
        }),
        getEarningsByOwnerId: builder.query({
            query: () => ({
                url: `/renters/get-totalearnings`
            })
        }),
        updateSingleSpace: builder.mutation({
            query: (body) => ({
                url: `/renters/update-singlespace-info`,
                body: {...body},
                method: 'PUT',
            })
        }),
        updateSingleBookingStatus: builder.mutation({
            query: (body) => ({
                url: `/renters/update-singlebooking-status`,
                body: {...body},
                method: 'PUT',
            })
        }),
        postNewSpaces: builder.mutation({
            query: (body) => ({
                url: `/renters/enter-newspaces`,
                body: {...body},
                method: 'POST',
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
    useGetPropertiesQuery, useSubmitPropertyMutation, useGetPropAndSpaceInfoQuery, useUpdateSingleSpaceMutation,
    usePostNewSpacesMutation, useGetSoldSpacesQuery, useGetActiveByOwnerIdQuery, useUpdateSingleBookingStatusMutation,
    useGetEarningsByOwnerIdQuery
} = renterApiSlice