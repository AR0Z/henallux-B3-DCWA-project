import axios from "axios";
const api = axios.create({
	baseURL: "https://smartcities.aroz.be/api/",
});

api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
	"token"
)}`;

export default api;
