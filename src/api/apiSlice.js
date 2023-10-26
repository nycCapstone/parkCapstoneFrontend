import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setAuth } from '../redux/auth/authSlice';
const BASE_URL = process.env.REACT_APP_ENV === 'development' ? 'http://localhost:3001' : process.env.REACT_APP_BACKEND_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth?.accessToken
        headers.set('Content-Type', 'application/json');
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const email = api.getState().auth?.email
            const id = api.getState().auth?.id
            // store the new token 
            api.dispatch(setAuth({...refreshResult.data, email, id,}))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})