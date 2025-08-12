import apiClient from "../apiClient";

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
  createBuyer: (userData: any) =>
    apiClient.post("/admin/users/buyer", userData),
  getAllBuyers: (query?: string) =>
    apiClient.get(`/admin/users/buyer?${query}`),
  getBuyer: (userId: string) => apiClient.get(`/admin/users/buyer/${userId}`),
  updateBuyer: (userId: string, userData: any) =>
    apiClient.post(`/admin/users/buyer/${userId}/edit`, userData),
  deleteBuyer: (userId: string) =>
    apiClient.delete(`/admin/users/buyer/${userId}`),

  //   sellers
  createSeller: (userData: any) =>
    apiClient.post("/admin/users/seller", userData),
  getAllSellers: (query?: string) =>
    apiClient.get(`/admin/users/seller?${query}`),
  getSeller: (userId: string) => apiClient.get(`/admin/users/seller/${userId}`),
  updateSeller: (userId: string, userData: any) =>
    apiClient.post(`/admin/users/seller/${userId}/edit`, userData),
  deleteSeller: (userId: string) =>
    apiClient.delete(`/admin/users/seller/${userId}`),

  //   agents
  createAgent: (userData: any) =>
    apiClient.post("/admin/users/agent", userData),
  getAllAgents: (query?: string) =>
    apiClient.get(`/admin/users/agent?${query}`),
  getAgent: (userId: string) => apiClient.get(`/admin/users/agent/${userId}`),
  updateAgent: (userId: string, userData: any) =>
    apiClient.post(`/admin/users/agent/${userId}/edit`, userData),
  deleteAgent: (userId: string) =>
    apiClient.delete(`/admin/users/agent/${userId}`),
};

export default UserService;
