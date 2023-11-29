import api from "./api";

export const locationsApi = {
	async getAll() {
		const response = await api.get("/location_travel");
		return response;
	},
	async get(id: string) {
		const response = await api.get(`/location_travel/${id}`);
		return response;
	},
	async create(data: any) {
		const response = await api.post("/location_travel", data);
		return response;
	},
	async update(id: string, data: any) {
		const response = await api.put(`/location_travel/${id}`, data);
		return response;
	},
	async delete(id: string) {
		const response = await api.delete(`/location_travel/${id}`);
		return response;
	},
};
