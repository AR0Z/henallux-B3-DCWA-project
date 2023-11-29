import api from "./api";

export const vehiclesApi = {
	async getAll() {
		const response = await api.get("/vehicles");
		return response;
	},
	async get(id: string) {
		const response = await api.get(`/vehicles/${id}`);
		return response;
	},
	async create(data: any) {
		const response = await api.post("/vehicles", data);
		return response;
	},
	async update(id: string, data: any) {
		const response = await api.put(`/vehicles/${id}`, data);
		return response;
	},
	async delete(id: string) {
		const response = await api.delete(`/vehicles/${id}`);
		return response;
	},
};
