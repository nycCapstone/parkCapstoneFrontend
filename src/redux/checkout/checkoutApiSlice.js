import { apiSlice } from "../../api/apiSlice";

export const checkoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => ({
        url: "/book/mybookings",
        method: "GET",
        providesTags: ["clientBookings"],
      }),
    }),
    insertBooking: builder.mutation({
      query: (data) => ({
        url: "/book/insert-one",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["clientBookings"],
    }),
    newClientPmt: builder.mutation({
      query: (data) => ({
        url: "/checkout/new-clientpmt",
        method: "POST",
        body: { ...data },
      }),
    }),
    newCheckoutSession: builder.mutation({
      query: (data) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { ...data },
      }),
    }),
    getClientTransactions: builder.query({
      query: (args) => ({
        url: `/checkout/payment-activity/${args || ""}`,
        method: "GET",
        providesTags: ["myPayments"],
      }),
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useInsertBookingMutation,
  useNewClientPmtMutation,
  useGetClientTransactionsQuery,
  useNewCheckoutSessionMutation,
} = checkoutApiSlice;

