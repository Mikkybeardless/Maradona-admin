import apiClient from "../apiClient";

interface Category {
  name: string;
  picture: File;
  description: string;
}

type CategoryUpdate = Partial<Category>;

const categoryService = {
  getCategories: () => apiClient.get("/admin/categories"),
  addCategory: (data: Category) => apiClient.post("/admin/categories", data),
  updateCategory: (id: number, data: CategoryUpdate) =>
    apiClient.put(`/admin/categories/${id}/update`, data),
  deleteCategory: (id: number) => apiClient.delete(`/admin/categories/${id}`),

  getCategory: (id: string) => apiClient.get(`/admin/categories/${id}`),
};

export default categoryService;
export type { Category, CategoryUpdate };
