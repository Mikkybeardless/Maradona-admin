import axios from "axios";
import Cookies from "js-cookie";
const API_BASE_URL = "/api";
const apiClient = axios.create({
  headers: {
    "System-Key": "1234",
    "Content-Type": "application/json",
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

// Response interceptor for handling errors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle common errors (401, 403, etc.)
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       // Redirect to login or refresh token
//       // Cookies.remove("token");
//       localStorage.removeItem("token");
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
