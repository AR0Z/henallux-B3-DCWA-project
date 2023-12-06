import axios from "axios";
import store from "../state/store";
import { userLoaded } from "../state/authSlice";
import api from "../api/api";

const loginApi = axios.create({
	baseURL: "https://smartcities.aroz.be/api/",
});

loginApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = store.dispatch(
					(state: any) => state.auth.refreshToken
				);
				const response = await axios.post("/api/login", {
					refreshToken,
				});
				const { token } = response.data;
				store.dispatch(userLoaded({ token }));
				originalRequest.headers.Authorization = `Bearer ${token}`;
				return axios(originalRequest);
			} catch (error) {
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	}
);

export async function login(email: string, password: string) {
	let data;
	try {
		data = await loginApi.post("auth/login", {
			email: email,
			password: password,
		});
	} catch (error) {
		return Promise.reject(error);
	}
	return data;
}

export async function logout() {
	try {
		await api.post("auth/logout", {
			token: localStorage.getItem("token"),
		});
	} catch (error) {
		return Promise.reject(error);
	}
}
