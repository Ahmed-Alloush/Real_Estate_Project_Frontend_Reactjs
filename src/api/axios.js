import axios from "axios";
import i18n from "../i18n";

const token = localStorage.getItem("accessToken");
const api = axios.create({
  baseURL: "http://localhost:3000/api", // adjust to your backend
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18n.language;
  return config;
});

export default api;
