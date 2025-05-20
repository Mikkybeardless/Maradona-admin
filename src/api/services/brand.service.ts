import apiClient from "../apiClient";

interface CreateBrand {
  name: string;
  logo: File;
}

type BrandUpdate = Partial<CreateBrand>;

const brandService = {
  getAllBrands: () => apiClient.get("/admin/brands"),
  getBrand: (id: number) => apiClient.get(`/admin/brands/${id}`),
  addBrand: (data: CreateBrand) => apiClient.post("/admin/brands", data),
  updateBrand: (id: number, data: BrandUpdate) =>
    apiClient.put(`/admin/brands/${id}/update`, data),
  deleteBrand: (id: number) => apiClient.delete(`/admin/brands/${id}`),
};

export default brandService;
export type { CreateBrand, BrandUpdate };
