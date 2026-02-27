import { clearAccessToken, getAccessToken, setAccessToken } from "./auth";

import axios from "axios";

console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
const baseURL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8080/api";
const api = axios.create({
  baseURL,
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
        const refreshResponse = await api.post("/auth/refresh");
        const newToken = refreshResponse.data.token;
        setAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        console.log("Refresh failed -> user must login again");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
export default api;
