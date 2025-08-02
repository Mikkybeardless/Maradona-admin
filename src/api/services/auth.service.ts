import apiClient from "../apiClient";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  type: string;
}

interface ReqPasswordData {
  email: string;
}

interface DoPassReset {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}
const authService = {
  login: (loginData: LoginData) => apiClient.post("/login", loginData),
  register: (registerData: RegisterData) =>
    apiClient.post("/register", registerData),
  logout: () => apiClient.get("/logout"),
  reqPasswordReset: (reqPasswordData: ReqPasswordData) =>
    apiClient.post("/forget_request", reqPasswordData),
  doPassReset: (data: DoPassReset) => apiClient.post("/reset-password", data),
};

export type { LoginData, ReqPasswordData, DoPassReset };
export default authService;
