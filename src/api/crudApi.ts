import api from "./api";

import { Vehicle } from "../model/Vehicle";
import { User } from "../model/User";
import { Travel } from "../model/Travel";
import { Reservation } from "../model/Reservation";
import { Payment } from "../model/Payment";
import { Location } from "model/Location";
import { AxiosResponse } from "axios";

export interface CRUDApi {
	getAll: () => Promise<AxiosResponse<CRUDApiType>>;
	get: (id: string) => Promise<AxiosResponse<CRUDApiType>>;
	create: (data: CRUDApiType) => Promise<AxiosResponse<CRUDApiType>>;
	update: (
		id: string,
		data: CRUDApiType
	) => Promise<AxiosResponse<CRUDApiType>>;
	delete: (id: string) => Promise<AxiosResponse<CRUDApiType>>;
}

export type CRUDApiType =
	| Vehicle
	| User
	| Travel
	| Reservation
	| Payment
	| Location;

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
		async create(data: CRUDApiType) {
			const response = await api.post(URL, data);
			return response;
		},
		async update(id: string, data: CRUDApiType) {
			const response = await api.put(`${URL}/${id}`, data);
			return response;
		},
		async delete(id: string) {
			const response = await api.delete(`${URL}/${id}`);
			return response;
		},
	};
}
