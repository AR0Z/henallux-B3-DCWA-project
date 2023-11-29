import api from "./api";

export const usersApi = {
	async getAll() {
		const response = await api.get("/users");
		return response;
	},
	async get(id: string) {
		const response = await api.get(`/users/${id}`);
		return response;
	},
	async create(data: any) {
		const response = await api.post("/users", data);
		return response;
	},
	async update(id: string, data: any) {
		const response = await api.put(`/users/${id}`, data);
		return response;
	},
	async delete(id: string) {
		const response = await api.delete(`/users/${id}`);
		return response;
	},
};
