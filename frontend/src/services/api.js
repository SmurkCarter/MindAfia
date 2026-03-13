import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("access") ||
      sessionStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;