import apiClient from "../apiClient";

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

type CustomerUpdate = Partial<Customer>;

const buyersService = {
  getAllBuyers: () => apiClient.get("/admin/customers"),
  getBuyer: (id: number) => apiClient.get(`/admin/customers/${id}`),

  getBuyerOrders: (id: number) =>
    apiClient.get(`/admin/customers/${id}/orders`),
  getBuyersReviews: (id: number) =>
    apiClient.get(`/admin/customers/${id}/reviews`),
  getBuyersNotifications: (id: number) =>
    apiClient.get(`/admin/customers/${id}/notifications`),
  getBuyersAddresses: (id: number) =>
    apiClient.get(`/admin/customers/${id}/addresses`),
  getBuyerOrder: (id: number) => apiClient.get(`/admin/customers/orders/${id}`),

  createCustomer: (data: Customer) => apiClient.post("/admin/customers", data),
  updateCustomer: (id: number, data: CustomerUpdate) =>
    apiClient.put(`/admin/customers/${id}/update`, data),
};

export default buyersService;
export type { Customer, CustomerUpdate };
