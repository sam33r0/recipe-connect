import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    accessToken: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.user;
            state.accessToken= action.payload.accessToken;
        },
        logout: (state,action) => {
            state.status = false;
            state.userData = null;
            state.accessToken= null;
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;