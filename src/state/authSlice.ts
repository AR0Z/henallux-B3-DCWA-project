import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { login, getMe, logout as apiLogout } from "../api/authApi";
import { RootState } from "./store";

const cookies = new Cookies();

type AuthState = {
	token: string | null;
	refreshToken?: string | null;
	isLoggedIn: boolean;
	errorMsg?: string | undefined;
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
		{ rejectWithValue }
	) => {
		try {
			let token,
				refreshToken,
				errorMsg: string = "";
			await login(loginData)
				.then((res) => {
					token = res.data.token;
					refreshToken = res.data.refreshToken;
				})
				.catch((err: any) => {
					errorMsg = err.response.data.error;
				});
			if (errorMsg) {
				return {
					token: null,
					refreshToken: null,
					isAdmin: false,
					errorMsg: errorMsg,
				};
			}
			if (!token || !refreshToken) {
				return {
					token: null,
					refreshToken: null,
					isAdmin: false,
					errorMsg: "Invalid credentials",
				};
			}

			const { isAdmin } = (await getMe(token)).data;
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
			const { isAdmin } = (await getMe(token)).data;
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

export const logout = createAsyncThunk("auth/logout", async () => {
	try {
		apiLogout();
		cookies.remove("token", { path: "/" });
		cookies.remove("refreshToken", { path: "/" });
		return {
			token: null,
			refreshToken: null,
			isAdmin: false,
		};
	} catch (error: any) {
		cookies.remove("token", { path: "/" });
		cookies.remove("refreshToken", { path: "/" });
		return {
			token: null,
			refreshToken: null,
			isAdmin: false,
			error: error.message,
		};
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(userLogin.fulfilled, (state, action) => {
			state.token = action.payload.token;
			state.refreshToken = action.payload.refreshToken;
			state.isLoggedIn = action.payload.isAdmin;
			state.errorMsg = action.payload.errorMsg;
		});
		builder.addCase(userLogin.rejected, (state, _) => {
			state.token = null;
			state.refreshToken = null;
			state.isLoggedIn = false;
			state.errorMsg = "Invalid login infos";
		});
		builder.addCase(loginWithToken.fulfilled, (state, action) => {
			state.token = action.payload.token;
			state.refreshToken = action.payload.refreshToken;
			state.isLoggedIn = action.payload.isAdmin;
		});
		builder.addCase(loginWithToken.rejected, (state, _) => {
			state.token = null;
			state.refreshToken = null;
			state.isLoggedIn = false;
		});
		builder.addCase(logout.fulfilled, (state, _) => {
			state.token = null;
			state.refreshToken = null;
			state.isLoggedIn = false;
		});
		builder.addCase(logout.rejected, (state, _) => {
			state.token = null;
			state.refreshToken = null;
			state.isLoggedIn = false;
		});
	},
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectErrorMessages = (state: RootState) => state.auth.errorMsg;

export default authSlice;
