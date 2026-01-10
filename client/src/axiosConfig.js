import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const axiosBase = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Custom hook to attach interceptors
export function useAxios() {
  const { token, refreshToken, logout } = useContext(AuthContext);

  // Attach token to every request
  axiosBase.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Handle expired token
  axiosBase.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      // If token expired
      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const newToken = await refreshToken();
        if (!newToken) {
          logout();
          return Promise.reject(err);
        }

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosBase(originalRequest);
      }

      return Promise.reject(err);
    }
  );

  return axiosBase;
}

export default axiosBase;
