import { createSlice } from "@reduxjs/toolkit"

const initialState = { email: null, accessToken: null, id: null, persist: true };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, id, email } = action.payload
            state.accessToken = accessToken;
            state.id = id;
            state.email = email;
        },
        setPersist: (state, action) => ({ persist: !state.persist, ...state}),
        setAuth: (state, action) => ({...state, ...action.payload}),
        logOut: () => initialState
    },
})

export const { setCredentials, logOut, setPersist, setAuth } = authSlice.actions

export default authSlice.reducer

export const selectCurrentId = (state) => state.auth.id
export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentToken = (state) => state.auth.accessToken

export const getAuth = (state) => state.auth;