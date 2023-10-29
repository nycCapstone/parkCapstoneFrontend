import { apiSlice } from "../../api/apiSlice";
import { LOGOUT, setRole } from "../roles/rolesSlice";
import { logOut } from "../auth/authSlice";

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
        url: "/logout"
      }),
      invalidatesTags: ["userData"],
      onSuccess: (_, api) => {
        api.dispatch(logOut());
        api.dispatch(LOGOUT());
      }
    }),
  }),
});
export const { useGetUserInfoQuery, useLogoutMutation } = userApiSlice;
