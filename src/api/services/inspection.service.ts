import apiClient from "../apiClient";

const InspectionService = {
  getAllInspections: (query?: string) =>
    apiClient.get(`/admin/inspection/requests?${query}`),
  getSpecificInspection: (id: number) =>
    apiClient.get(`/admin/inspection/requests/${id}`),
  assignAgent: (id: number) =>
    apiClient.post(`/admin/inspection/requests/${id}/assign-agent`),
};

export default InspectionService;
