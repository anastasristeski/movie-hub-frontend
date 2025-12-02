import axios from "axios";
import { getAccessToken, setAccessToken } from "./auth";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await api.post("/api/auth/refresh");
        const newToken = refreshResponse.data.token;
        setAccessToken(newToken);
        originalRequest.header.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh failed -> user must login again");
      }
    }
    return Promise.reject(error);
  }
);
export default api;
