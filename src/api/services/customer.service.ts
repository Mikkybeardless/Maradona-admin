import apiClient from "../apiClient";

const customerService = {
  getAllCustomers: (query?: string) =>
    apiClient.get(`/admin/customers${query ? `?${query}` : ""}`),
  getOneCustomer: (id: string) => apiClient.get(`/admin/customers/${id}`),
  getOneCustomerOrder: (id: string) =>
    apiClient.get(`/admin/customers/${id}/orders`),
  getAnalytics: (query?: string) =>
    apiClient.get(`/admin/customers/analytics${query ? `?${query}` : ""}`),
};

export default customerService;
