import apiClient from "../apiClient";

const InspectionService = {
  getAllInspections: (query?: string) =>
    apiClient.get(`/admin/inspection/requests?${query}`),
  getSpecificInspection: (id: number) =>
    apiClient.get(`/admin/inspection/requests/${id}`),
  assignAgent: (id: number, agent_id: number) =>
    apiClient.post(`/admin/inspection/requests/${id}/assign-agent`, {
      agent_id,
    }),
};

export default InspectionService;
