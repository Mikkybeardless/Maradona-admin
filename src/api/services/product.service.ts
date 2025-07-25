import apiClient from "../apiClient";

interface Product {
  name: string;
  category_id: number;
  price: number;
  inventory: string;
  type: "HOUSE" | "CAR" | "LAND" | "OTHER";
  sku: string;
  tags: number[];
  documents: File[];
  media: File[];
  description: string;
}

type House = {
  house_beds: number;
  house_size: number;
  house_condition: string;
  house_furnished: string;
  accessibility: string;
};

type Car = {
  body_type: string;
  gear_type: string;
  engine_type: string;
  mileage: string;
};

type Land = {
  land_size: number;
  land_type: string;
  topography: string;
  fencing: string;
  accessibility: string;
};

type GenProduct = Product & (House | Car | Land);

type ProductUpdate = Partial<GenProduct>;

const productService = {
  getAllProducts: () => apiClient.get("/admin/products/all"),
  getProduct: (id: number) => apiClient.get(`/admin/products/${id}/show`),
  addProduct: (data: GenProduct) => apiClient.post("/admin/products", data),
  approveOrRejectProduct: (id: number, action: "approve" | "reject") =>
    apiClient.post(`/admin/products/${id}/toggle-approval?action=${action}`),
  updateProduct: (id: number, data: ProductUpdate) =>
    apiClient.post(`/admin/products/${id}/edit`, data),
  deleteProduct: (id: number) => apiClient.delete(`/admin/products/${id}`),

  productSearch: (query: string) =>
    apiClient.get(`/seller/products/search?search_key=${query}&show_all=true`),
};

export default productService;
export type { Product, ProductUpdate };
