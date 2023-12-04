import axios from "axios";
import store from "../state/store";
import { userLoaded } from "../state/authSlice";

const api = axios.create({
	baseURL: "https://smartcities.aroz.be/api/",
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = store.dispatch((state) => state.auth.refreshToken);
				const response = await axios.post("/api/login", {
					refreshToken,
				});
				const { token } = response.data;
				store.dispatch(userLoaded({ token }));
				originalRequest.headers.Authorization = `Bearer ${token}`;
				console.log(token)
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
		data = await api.post("auth/login", {
			email: email,
			password: password,
		});
	} catch (error) {
		return Promise.reject(error);
	}
	console.log(data);
	return data;
}

export async function logout() {
	try {
		await api.post("auth/logout", {
			token: store.dispatch((state) => state.auth.token),
		});
	} catch (error) {
		return Promise.reject(error);
	}
}
