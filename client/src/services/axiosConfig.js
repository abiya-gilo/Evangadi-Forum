import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://evangadi-forum-deploy-0io8.onrender.com/api",
});

axiosBase.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosBase;
