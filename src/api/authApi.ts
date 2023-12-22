import axios from "axios";
import { Cookies } from "react-cookie";
import axiosRetry from "axios-retry";

const cookies = new Cookies();

const loginApi = axios.create({
	baseURL: "https://smartcities.aroz.be/api/v1/",
});

axiosRetry(loginApi, {
	retries: 3,
	retryCondition: (error) => {
		switch (error.response?.status) {
			case 500:
				return true;
			default:
				return false;
		}
	},
});

export async function login({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
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
		await loginApi.delete("auth/logout", {
			data: {
				token: cookies.get("token"),
			},
		});
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function getMe(token: string) {
	let data;
	try {
		data = await loginApi.get("users/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		return Promise.reject(error);
	}
	return data;
}
