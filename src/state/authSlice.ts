// authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { login, getMe } from "../api/authApi";
import api from "../api/api";

const cookies = new Cookies();

type AuthState = {
	token: string | null;
	refreshToken?: string | null;
	isLoggedIn: boolean;
	error?: string;
};

const initialState: AuthState = {
	token: cookies.get("token") || null,
	refreshToken: cookies.get("refreshToken") || null,
	isLoggedIn: cookies.get("token") ? true : false,
	error: undefined,
};

export const userLogin = createAsyncThunk(
	"auth/login",
	async (loginData: { email: string; password: string }) => {
		try {
			const loginResponse = await login(loginData); // Assuming login is an async function returning a promise
			const token = loginResponse.data.token;
			const refreshToken = loginResponse.data.refreshToken;

			const meResponse = await getMe(token); // Assuming getMe is an async function returning a promise

			if (!meResponse.data.isAdmin) {
				return { token, refreshToken, isAdmin: false };
			}

			cookies.set("token", token, { path: "/" });
			cookies.set("refreshToken", refreshToken, { path: "/" });
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

			return { token, refreshToken, isAdmin: true };
		} catch (error: any) {
			return {
				token: null,
				refreshToken: null,
				isAdmin: false,
				error: error.message,
			};
		}
	}
);
export const loginWithToken = createAsyncThunk(
	"auth/loginWithToken",
	async () => {
		try {
			let token = cookies.get("token");
			let refreshToken = cookies.get("refreshToken");
			if (!token || !refreshToken) {
				return {
					token: null,
					refreshToken: null,
					isAdmin: false,
				};
			}
			await getMe(token).then((res) => {
				const { isAdmin } = res.data;
				if (!isAdmin) {
					return {
						token: null,
						refreshToken: null,
						isAdmin: false,
					};
				}
				return {
					token: token,
					refreshToken: refreshToken,
					isAdmin: true,
				};
			});
		} catch (error: any) {
			return {
				token: null,
				refreshToken: null,
				isAdmin: false,
				error: error.message,
			};
		}
	}
);
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLogout: (state) => {
			state.token = null;
			cookies.remove("token", { path: "/" });
			state.refreshToken = null;
			cookies.remove("refreshToken", { path: "/" });
			state.isLoggedIn = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(userLogin.fulfilled, (state, action: any) => {
			if (action.payload.isAdmin) {
				state.token = action.payload.token;
				state.refreshToken = action.payload.refreshToken;
				state.isLoggedIn = true;
			} else {
				state.token = null;
				state.refreshToken = null;
				state.isLoggedIn = false;
			}
		});
		builder.addCase(userLogin.rejected, (state, action) => {
			state.token = null;
			state.refreshToken = null;
			state.isLoggedIn = false;
			state.error = action.error.message;
		});
	},
});

export const { userLogout } = authSlice.actions;

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;

export default authSlice;
