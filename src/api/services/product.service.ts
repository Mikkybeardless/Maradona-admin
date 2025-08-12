import apiClient from "../apiClient";

type GenProduct<T extends keyof ProductPayloadMap> = ProductPayloadMap[T];

type ProductUpdate<T extends keyof ProductPayloadMap> = Partial<GenProduct<T>>;

const productService = {
  getAllProducts: (query?: string) => apiClient.get(`/admin/products?${query}`),
  getProduct: (id: number) => apiClient.get(`/products/${id}`),
  addProduct: (data: FormData) =>
    apiClient.post("/admin/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  approveOrRejectProduct: (id: number, action: "approve" | "reject") =>
    apiClient.post(`/admin/products/${id}/toggle-approval?action=${action}`),
  updateProduct: <T extends keyof ProductPayloadMap>(
    id: number,
    data: ProductUpdate<T> | FormData
  ) => apiClient.post(`/admin/products/${id}/edit`, data),
  deleteProduct: (id: number) => apiClient.delete(`/admin/products/${id}`),

  productSearch: (query: string) =>
    apiClient.get(`/seller/products/search?search_key=${query}&show_all=true`),
};

export default productService;
export type { ProductUpdate };
