import apiClient from "../apiClient";

interface MarkSold {
  qty_sold: number;
  sold_price: number;
}
const purchaseEnquiriesService = {
  getPurchaseEnquiries: (params?: string) =>
    apiClient.get(`/admin/purchase-enquiries${params ? `?${params}` : ""}`),
  assignAgent: (id: string | number, agentId: string | number) =>
    apiClient.post(`/admin/purchase-enquiries/${id}/assign-agent`, { agentId }),
  closeEnquiry: (id: string | number) =>
    apiClient.post(`/admin/purchase-enquiries/${id}/close`),
  markAsSold: (id: number, data: MarkSold) =>
    apiClient.put(`/admin/purchase-enquiries/${id}/mark-sold`, data),
  deletePurchaseEnquiry: (id: string | number) =>
    apiClient.delete(`/admin/purchase-enquiries/${id}`),
};

export type { MarkSold };
export default purchaseEnquiriesService;
