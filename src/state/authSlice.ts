// authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { login, getMe } from "../api/authApi";
import { AxiosError, AxiosResponse } from "axios";
import { RootState } from "./store";

const cookies = new Cookies();

type AuthState = {
	token: string | null;
	refreshToken?: string | null;
	isLoggedIn: boolean;
	errorMsg?: string;
};

const initialState: AuthState = {
	token: cookies.get("token") || null,
	refreshToken: cookies.get("refreshToken") || null,
	isLoggedIn: cookies.get("token") ? true : false,
	errorMsg: "",
};

export const userLogin = createAsyncThunk(
	"auth/login",
	async (
		loginData: { email: string; password: string },
		{ rejectWithValue, dispatch }
	) => {
		try {
			const loginResponse = await login(loginData);
			const token = loginResponse.data.token;
			const refreshToken = loginResponse.data.refreshToken;

			if (!token || !refreshToken) {
				return {
					token: null,
					refreshToken: null,
					isAdmin: false,
					errorMsg: "Invalid credentials",
				};
			}

			const meResponse = await getMe(token);
			const isAdmin = meResponse.data.isAdmin;

			if (!isAdmin) {
				return {
					token: null,
					refreshToken: null,
					isAdmin: false,
					errorMsg: "You are not an admin",
				};
			}

			cookies.set("token", token, { path: "/" });
			cookies.set("refreshToken", refreshToken, { path: "/" });

			return {
				token,
				refreshToken,
				isAdmin: true,
				errorMsg: "",
			};
		} catch (error: any) {
			return rejectWithValue(error.response.data.message);
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
		builder.addCase(userLogin.fulfilled, (state, action) => {
			state.token = action.payload.token;
			state.refreshToken = action.payload.refreshToken;
			state.isLoggedIn = true;
			state.errorMsg = action.payload.errorMsg;
		});
		builder.addCase(userLogin.rejected, (state, _) => {
			state.token = null;
			state.refreshToken = null;
			state.isLoggedIn = false;
			state.errorMsg = "Invalid login infos";
		});
	},
});

export const { userLogout } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectErrorMessages = (state: RootState) => state.auth.errorMsg;

export default authSlice;
