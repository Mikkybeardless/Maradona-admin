import apiClient from "../apiClient";
type UpdateTag = Partial<Tag>;
const tagService = {
  getAllTags: (query?: string) => apiClient.get(`/admin/tags?${query}`),
  getTag: (id: number) => apiClient.get(`/admin/tags/${id}`),
  addTag: (data: Tag) => apiClient.post(`/admin/tags`, data),
  updateTag: (id: number, data: UpdateTag) =>
    apiClient.post(`/admin/tags/${id}/edit`, data),
  deleteTag: (id: number) => apiClient.delete(`/admin/tags/${id}`),
};

export default tagService;
