import { apiSlice } from "../../api/apiSlice";
import { setRole } from "../roles/rolesSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['userData'],
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => "/user/profile",
      providesTags: ["userData"],
      onSuccess: (response, api) => {
        api.dispatch(setRole(response.data));
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout"
      }),
      invalidatesTags: ["userData"]
    }),
  }),
});
export const { useGetUserInfoQuery, useLogoutMutation } = userApiSlice;
