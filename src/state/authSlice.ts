// authSlice.js
import {createSlice} from "@reduxjs/toolkit";

type AuthState = {
    token: string | null;
    refreshToken?: string | null;
};

const initialState: AuthState = {
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoaded: (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            if (action.payload.refreshToken) {
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem("refreshToken", action.payload.refreshToken);
            }
        },
        userLogout: (state) => {
            state.token = null;
            localStorage.removeItem("token");
            state.refreshToken = null;
            localStorage.removeItem("refreshToken");
        },
        logState: (state) => {
            console.log(state.token);
            console.log(state.refreshToken);
        }
    },
});

export const {userLoaded, userLogout, logState} = authSlice.actions;

export default authSlice;
