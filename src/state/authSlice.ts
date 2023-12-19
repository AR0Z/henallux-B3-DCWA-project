// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

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
			state.refreshToken = action.payload.refreshToken;
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("refreshToken", action.payload.refreshToken);
		},
		userLogout: (state) => {
			state.token = null;
			localStorage.removeItem("token");
			state.refreshToken = null;
			localStorage.removeItem("refreshToken");
		},
	},
});

export const { userLoaded, userLogout } = authSlice.actions;

export default authSlice;
