import api from "./api";

import { Vehicle } from "../model/Vehicle";
import { User } from "../model/User";
import { Travel } from "../model/Travel";
import { Reservation } from "../model/Reservation";
import { Payment } from "../model/Payment";
import { Location } from "model/Location";

export default function CRUDApi(URL: string) {
	return {
		async getAll() {
			const response = await api.get(URL);
			return response;
		},
		async get(id: string) {
			const response = await api.get(`${URL}/${id}`);
			return response;
		},
		async create(data: Vehicle | User | Travel | Reservation | Payment | Location) {
			const response = await api.post(URL, data);
			return response;
		},
		async update(id: string, data: Vehicle | User | Travel | Reservation | Payment | Location) {
			const response = await api.put(`${URL}/${id}`, data);
			return response;
		},
		async delete(id: string) {
			const response = await api.delete(`${URL}/${id}`);
			return response;
		},
	};
}
