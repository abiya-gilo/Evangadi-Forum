import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
axiosBase.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosBase;
