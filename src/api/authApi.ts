import axios from "axios";

const api = axios.create({
	baseURL: "https://smartcities.aroz.be/api/",
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				const response = await axios.post("/api/loigin", {
					refreshToken,
				});
				const { token } = response.data;

				localStorage.setItem("token", token);

				originalRequest.headers.Authorization = `Bearer ${token}`;
				return axios(originalRequest);
			} catch (error) {
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	}
);

export async function login(email: string, password: string) {
	let data;
	try {
		data = await api.post("auth/login", {
			email: email,
			password: password,
		});
	} catch (error) {
		return Promise.reject(error);
	}
	return data;
}
