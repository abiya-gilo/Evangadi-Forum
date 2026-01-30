import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://amazon-api-deploy-2nd.onrender.com/api",
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
