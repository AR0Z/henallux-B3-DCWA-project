// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
	token: string | null;
	isAuthenticated: boolean | null;
	loading: boolean;
	user: any;
};

const initialState: AuthState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLoaded: (state, action) => {
			state.isAuthenticated = true;
			state.loading = false;
			state.user = action.payload;
		},
	},
});

export const { userLoaded } = authSlice.actions;

export default authSlice;
