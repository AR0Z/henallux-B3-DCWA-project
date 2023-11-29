import api from "./api";

export const travelsApi = {
	async getAll() {
		const response = await api.get("/travels");
		return response;
	},
	async get(id: string) {
		const response = await api.get(`/travels/${id}`);
		return response;
	},
	async create(data: any) {
		const response = await api.post("/travels", data);
		return response;
	},
	async update(id: string, data: any) {
		const response = await api.put(`/travels/${id}`, data);
		return response;
	},
	async delete(id: string) {
		const response = await api.delete(`/travels/${id}`);
		return response;
	},
};
