import { apiSlice } from "../../api/apiSlice";
import { setRole } from "../roles/rolesSlice";

export const userApiSlice = apiSlice.injectEndpoints({
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
        url: "/logout",
      }),
    }),
  }),
});
export const { useGetUserInfoQuery, useLogoutMutation } = userApiSlice;
