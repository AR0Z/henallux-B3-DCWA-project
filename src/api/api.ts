import axios from "axios";
import { Cookies } from "react-cookie";
import { usersApi } from "./usersApi";
import { User } from "model/User";
import axiosRetry from "axios-retry";
import { BASE_URL } from "../../BASE_URL";

const cookies = new Cookies();

const api = axios.create({
	baseURL: BASE_URL,
});

axiosRetry(api, {
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

api.defaults.headers.common["Authorization"] = `Bearer ${cookies.get("token")}`;

export async function getEmailFromId(id: string) {
	return (await usersApi.get(id)).data.email;
}

export async function getTotalCarshareDone() {
	return (await api.get("/travels/totalDone")).data;
}

export async function getTotalKM() {
	return (await api.get("/travels/totalKM")).data;
}

export async function getTotalCanceled() {
	return (await api.get("/travels/totalCanceled")).data;
}

export async function getTop10() {
	return (await api.get("/users/top10")).data;
}

export async function toCheck() {
	return (await api.get("/users/toCheck")).data;
}

export async function getImg(token: string, img: string) {
	return (await api.get(`/uploads/${img}?token=${token}`)).data;
}

export function getUserEmailsID(isDriver?: boolean) {
	let usersOptions: { label: string; value?: string }[] = [];
	let usersEmails: string[] = [];
	let userIds: string[] = [];

	usersApi.getAll().then((res) => {
		const users: User[] = res.data;
		users.forEach((user) => {
			if (isDriver && !user.isDriver && !user.isAdmin) return;
			usersOptions.push({ label: user.email, value: user.id });
			usersEmails.push(user.email);
			if (user.id) userIds.push(user.id);
		});
	});
	return { usersOptions, usersEmails, userIds };
}

export default api;
