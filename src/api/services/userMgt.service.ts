import apiClient from "../apiClient";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

const UserService = {
  // admins
  getAllAdmins: (query?: string) =>
    apiClient.get(`/admin/users/admin?${query}`),
  getAdmin: (userId: string) => apiClient.get(`/admin/users/admin/${userId}`),
  updateAdmin: (userId: string, userData: any) =>
    apiClient.post(`/admin/users/admin/${userId}/edit`, userData),
  deleteAdmin: (userId: string) =>
    apiClient.delete(`/admin/users/admin/${userId}`),

  // buyers
  createBuyer: (userData: CreateUserDTO) =>
    apiClient.post("/admin/users/buyer", userData),
  getAllBuyers: (query?: string) =>
    apiClient.get(`/admin/users/buyer?${query}`),
  getBuyer: (userId: number) => apiClient.get(`/admin/users/buyer/${userId}`),
  updateBuyer: (userId: number, userData: any) =>
    apiClient.post(`/admin/users/buyer/${userId}/edit`, userData),
  deleteBuyer: (userId: number) =>
    apiClient.delete(`/admin/users/buyer/${userId}`),

  //   sellers
  createSeller: (userData: CreateUserDTO) =>
    apiClient.post("/admin/users/seller", userData),
  getAllSellers: (query?: string) =>
    apiClient.get(`/admin/users/seller?${query}`),
  getSeller: (userId: number) => apiClient.get(`/admin/users/seller/${userId}`),
  updateSeller: (userId: number, userData: any) =>
    apiClient.post(`/admin/users/seller/${userId}/edit`, userData),
  deleteSeller: (userId: number) =>
    apiClient.delete(`/admin/users/seller/${userId}`),

  //   agents
  createAgent: (userData: FormData) =>
    apiClient.post("/admin/users/agent", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getAllAgents: (query?: string) =>
    apiClient.get(`/admin/users/agent?${query}`),
  getAgent: (userId: number) => apiClient.get(`/admin/users/agent/${userId}`),
  updateAgent: (userId: number, userData: any) =>
    apiClient.post(`/admin/users/agent/${userId}/edit`, userData),
  deleteAgent: (userId: number) =>
    apiClient.delete(`/admin/users/agent/${userId}`),
};

export default UserService;
