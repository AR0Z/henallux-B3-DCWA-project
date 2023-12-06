import api from "./api";

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
		async create(data: any) {
			const response = await api.post(URL, data);
			return response;
		},
		async update(id: string, data: any) {
			if (data.nb_seats) {
				data.nbSeats = data.nb_seats;
				delete data.nb_seats;
			}
			const response = await api.put(`${URL}/${id}`, data);
			return response;
		},
		async delete(id: string) {
			const response = await api.delete(`${URL}/${id}`);
			return response;
		},
	};
}
