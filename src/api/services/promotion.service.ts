import apiClient from "../apiClient";

type SetCostData = {
  product_type: ProductType;
  cost_per_day: number;
};
const promotionService = {
  getAllPromotions: (query?: string) =>
    apiClient.get("/promotions/admin", { params: { query } }),
  getPromotionById: (id: string) => apiClient.get(`/promotions/${id}`),
  setPromoCost: (data: FormData) =>
    apiClient.post(`/promotion-settings`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getPromotionCost: (type: ProductType) =>
    apiClient.get(`/promotion-settings/${type}`),
  close: (id: string, notes?: string) =>
    apiClient.post(`/promotions/${id}/close`, { notes }),
  reOpenPromotion: (id: string, new_end_date: string) =>
    apiClient.post(`/promotions/${id}/reopen`, { new_end_date }),
};

export default promotionService;
export type { SetCostData };
