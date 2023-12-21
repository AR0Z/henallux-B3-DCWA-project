import axios from "axios";
import api from "../api/api";
import { Cookies } from "react-cookie";
import { usersApi } from "./usersApi";
import { User } from "model/User";

const cookies = new Cookies();

const loginApi = axios.create({
	baseURL: "https://smartcities.aroz.be/api/",
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
		await api.delete("auth/logout", {
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
		data = await api.get("users/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		return Promise.reject(error);
	}
	return data;
}

export function getUserEmailsID() {
	let usersOptions: { label: string; value?: string }[] = [];
	let usersEmails: string[] = [];
	let userIds: string[] = [];

	usersApi.getAll().then((res) => {
		const users: User[] = res.data;
		users.forEach((user) => {
			usersOptions.push({ label: user.email, value: user.id });
			usersEmails.push(user.email);
			if (user.id) userIds.push(user.id);
		});
	});
	return { usersOptions, usersEmails, userIds };
}



