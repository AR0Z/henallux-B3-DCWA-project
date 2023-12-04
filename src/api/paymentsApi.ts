import api from "./api";

export const paymentsApi = {
	async getAll() {
		const response = await api.get("/payments");
		return response;
	},
	async get(id: string) {
		const response = await api.get(`/payments/${id}`);
		return response;
	},
	async create(data: any) {
		const response = await api.post("/payments", data);
		return response;
	},
	async update(id: string, data: any) {
		const response = await api.put(`/payments/${id}`, data);
		return response;
	},
	async delete(id: string) {
		const response = await api.delete(`/payments/${id}`);
		return response;
	},
};
