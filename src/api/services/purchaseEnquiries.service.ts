import apiClient from "../apiClient";

interface MarkSold {
  qty_sold: number;
  sold_price: number;
}
const purchaseEnquiriesService = {
  getPurchaseEnquiries: (params?: string) =>
    apiClient.get(`/admin/purchase-enquiries${params ? `?${params}` : ""}`),
  getEnquiry: (id: number) =>
    apiClient.get(`/admin/purchase-enquiries/${id}/show`),
  assignAgent: (id: number, agent_id: number) =>
    apiClient.post(`/admin/purchase-enquiries/${id}/assign-agent`, {
      agent_id,
    }),
  closeEnquiry: (id: number) =>
    apiClient.post(`/admin/purchase-enquiries/${id}/close`),
  markAsSold: (id: number, data: MarkSold) =>
    apiClient.post(`/admin/purchase-enquiries/${id}/mark-sold`, data),
  deletePurchaseEnquiry: (id: number) =>
    apiClient.delete(`/admin/purchase-enquiries/${id}`),
};

export type { MarkSold };
export default purchaseEnquiriesService;
