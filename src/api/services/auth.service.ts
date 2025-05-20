import apiClient from "../apiClient";

interface LoginData {
  email: string;
  password: string;
  login_by: string;
  user_type: string;
}

interface ReqPasswordData {
  email: string;
  send_code_by: string;
}

interface DoPassReset {
  verification_code: string;
  password: string;
}
const authService = {
  login: (loginData: LoginData) => apiClient.post("/auth/login", loginData),
  logout: () => apiClient.get("/auth/logout"),
  reqPasswordReset: (reqPasswordData: ReqPasswordData) =>
    apiClient.post("/auth/password/forget_request", reqPasswordData),
  doPassReset: (data: DoPassReset) =>
    apiClient.post("/auth/password/confirm_reset", data),
};

export type { LoginData, ReqPasswordData, DoPassReset };
export default authService;
