import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const api = axios.create({
	baseURL: "https://smartcities.aroz.be/api/",
});

api.defaults.headers.common["Authorization"] = `Bearer ${cookies.get("token")}`;

export default api;
