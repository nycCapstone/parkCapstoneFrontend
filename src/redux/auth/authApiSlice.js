import { apiSlice } from "../../api/apiSlice";
import { setAuth } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),
               // Define the onSuccess callback to store the data in the 'auth' slice
      onSuccess: (response, credentials, api) => {
        // Dispatch the 'setAuth' action from your 'authSlice' to update the 'auth' state
        api.dispatch(setAuth(response.data));
      },
        }),
    })
})

export const {
    useLoginMutation
} = authApiSlice