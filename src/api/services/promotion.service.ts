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
};

export default promotionService;
export type { SetCostData };
