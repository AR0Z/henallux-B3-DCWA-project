import axios from "axios";
import { Cookies } from "react-cookie";
import { usersApi } from "./usersApi";
import { User } from "model/User";

const cookies = new Cookies();

const api = axios.create({
	baseURL: "https://smartcities.aroz.be/api/",
});

api.defaults.headers.common["Authorization"] = `Bearer ${cookies.get("token")}`;

export async function getEmailFromId(id: string) {
	let email = "";
	await usersApi.get(id).then((res) => {
		email = res.data.email;
	});
	return email;
}

export async function getTotalCarshareDone() {
	let total = 0;
	await api.get("/travels/totalDone").then((res) => {
		total = res.data;
	});
	return total;
}

export async function getTotalKM() {
	let total;
	await api.get("/travels/totalKM").then((res) => {
		total = res.data;
	});
	return total;
}

export async function getTotalCanceled() {
	let total;
	await api.get("/travels/totalCanceled").then((res) => {
		total = res.data;
	});
	return total;
}

export async function getTop10() {
	let top10: any[] = [];
	await api.get("/users/top10").then((res) => {
		top10 = res.data;
	});
	return top10;
}

export async function toCheck() {
	let toCheck: any[] = [];
	await api.get("/users/toCheck").then((res) => {
		toCheck = res.data;
	});
	return toCheck;
}

export default api;
