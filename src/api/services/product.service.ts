import apiClient from "../apiClient";

type ButtonType = "unpublished" | "published" | "draft";
type ShippingType = "free" | "flat_rate";
interface Product {
  name: string;
  category_ids: number[];
  category_id: number;
  unit: number;
  min_qty: number;
  unit_price: number;
  current_stock: number;
  sku: string;
  tags: string[];
  button: ButtonType;
  thumbnail_img: File;
  photos: File[];
  shipping_type: ShippingType;
  flat_shipping_cost: number;
  description: string;
}

type ProductUpdate = Partial<Product>;

const productService = {
  getAllProducts: () => apiClient.get("/admin/products/all"),
  getProduct: (id: number) => apiClient.get(`/admin/products/${id}/show`),
  addProduct: (data: Product) => apiClient.post("/admin/products/add", data),
  updateProduct: (id: number, data: ProductUpdate) =>
    apiClient.put(`/admin/products/update/${id}`, data),
  deleteProduct: (id: number) => apiClient.delete(`/admin/products/${id}`),

  productSearch: (query: string) =>
    apiClient.get(`/seller/products/search?search_key=${query}&show_all=true`),
};

export default productService;
export type { Product, ProductUpdate };
