import { apiSlice } from "../../api/apiSlice";

export const checkoutApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBookings: builder.query({
            query: () => ({
                url: '/book/mybookings',
                method: 'GET',
                providesTags: ["clientBookings"]
            })
        }),
        insertBooking: builder.mutation({
            query: data => ({
                url: '/book/insert-one',
                method: 'POST',
                body: { ...data }
            }),
            invalidatesTags: ["clientBookings"]
        })
    })
})

export const {
    useGetBookingsQuery,
    useInsertBookingMutation
} = checkoutApiSlice