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

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired or unauthorized request.");
      // Optional: window.location.href = "/login" if we want to force login
    }
    return Promise.reject(error);
  }
);

export default api;
