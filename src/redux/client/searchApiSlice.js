import { apiSlice } from "../../api/apiSlice";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailSpots: builder.query({
      query: (data) => ({
        url: `/book/search?zip=${data[0]}&addr=${data[1]}&start=${data[2]}&end=${data[3]}`,
        providesTags: ["clientSearches"],
        method: "GET",
      }),
    }),
    getAvailLandingSpots: builder.query({
      query: (data) => ({
        url: `/get-spaces/location-and-time?lat=${data[0]}&lng=${data[1]}&start=${data[2]}&end=${data[3]}`,
        providesTags: ["landingSearches"],
        method: "GET",
      }),
    }),
    getByPidAndTime: builder.query({
      query: (data) => ({
        url: `/get-spaces/checkout/a?pid=${data[0]}&starts=${data[1]}&ends=${data[2]}`,
        providesTags: ["checkoutData"],
        method: "GET",
      }),
    }),
    getOneSpot: builder.query({
      query: (data) => ({
        url: `/parking-spots/${data}`,
        providesTags: ["spotDetails"],
      }),
    }),
    getOneSpotDetails: builder.query({
      query: (data) => ({
        url: `/spot-details/${data}`,
        providesTags: ["spotDetails"],
      }),
    }),
  }),
});

export const {
  useGetAvailSpotsQuery,
  useGetOneSpotQuery,
  useGetOneSpotDetailsQuery,
  useGetAvailLandingSpotsQuery,
  useGetByPidAndTimeQuery,
} = searchApiSlice;
