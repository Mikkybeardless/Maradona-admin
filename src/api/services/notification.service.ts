import apiClient from "../apiClient";

export const notificationServices = {
  getNotifications: (page: number = 1, per_page: number = 15) =>
    apiClient.get(`/notifications?page=${page}&per_page=${per_page}`),
  getUnread: () => apiClient.get(`/notifications/unread`),
  getStats: () => apiClient.get(`/notifications/stats`),
  markAllRead: () => apiClient.post(`/notifications/mark-all-read`),
  markRead: (id: string | number) =>
    apiClient.post(`/notifications/${id}/read`),
  deleteNotification: (id: string | number) =>
    apiClient.delete(`/notifications/${id}`),
};

export default notificationServices;
