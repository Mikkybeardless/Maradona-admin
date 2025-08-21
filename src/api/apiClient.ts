import axios from "axios";
import Cookies from "js-cookie";
const API_BASE_URL = import.meta.env.VITE_API_URL;
const systemKey = import.meta.env.VITE_SYSTEM_KEY;
const apiClient = axios.create({
  headers: {
    "System-Key": systemKey,
  },
  baseURL: API_BASE_URL,
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
