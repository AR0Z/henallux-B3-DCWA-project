import api from "./api";

export const reservationsApi = {
	async getAll() {
		const response = await api.get("/reservations");
		return response;
	},
	async get(id: string) {
		const response = await api.get(`/reservations/${id}`);
		return response;
	},
	async create(data: any) {
		const response = await api.post("/reservations", data);
		return response;
	},
	async update(id: string, data: any) {
		const response = await api.put(`/reservations/${id}`, data);
		return response;
	},
	async delete(id: string) {
		const response = await api.delete(`/reservations/${id}`);
		return response;
	},
};
