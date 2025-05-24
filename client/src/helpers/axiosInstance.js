// src/utils/axiosInstance.js
import axios from "axios";

// Create instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // 🌐 Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
