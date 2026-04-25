import axios from "axios";

const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (isLocalhost ? "http://localhost:5000" : "https://tasya.onrender.com");

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

export default api;
