import { apiSlice } from "../../api/apiSlice";

export const searchApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAvailSpots: builder.query({
            query: (data) => ({
                url: `/book/search?zip=${data[0]}&addr=${data[1]}&start=${data[2]}&end=${data[3]}`,
                providesTags: ['clientSearches'],
                method: 'GET'
            })
        }),
        getOneSpot: builder.query({
            query: (data) => ({
                url: `/parking-spots/${data}`,
                providesTags: ["spotDetails"]
            })
        })
    })
})
export const { useGetAvailSpotsQuery, useGetOneSpotQuery } = searchApiSlice;