import apiClient from "../apiClient";

const statsService = {
  getMonthlyReport: (query?: string) =>
    apiClient.get(
      `/admin/stats/monthly-revenue${query ? `?${query}` : "?all_time=1"}`
    ),
  getTotalOrders: (query?: string) =>
    apiClient.get(`/admin/stats/total-orders${query ? `?${query}` : ""}`),
  getTotalRevenue: (query?: string) =>
    apiClient.get(
      `/admin/stats/total-revenue${query ? `?${query}` : "?all_time=1"}`
    ),
  getTotalUsers: (query?: string) =>
    apiClient.get(
      `/admin/stats/total-users-registered${
        query ? `?${query}` : "?all_time=1"
      }`
    ),
  getBestSellingProducts: (query?: string) =>
    apiClient.get(
      `/admin/stats/best-selling-products${query ? `?${query}` : "?all_time=1"}`
    ),
  getBestSellingTypes: (query?: string) =>
    apiClient.get(
      `/admin/stats/revenue-by-product-type${
        query ? `?${query}` : "?all_time=1"
      }`
    ),
  getBestSellingLocations: (query?: string) =>
    apiClient.get(
      `/admin/stats/top-selling-locations${query ? `?${query}` : "?all_time=1"}`
    ),
  getTotalSales: (query?: string) =>
    apiClient.get(
      `/admin/stats/total-sales${query ? `?${query}` : "?all_time=1"}`
    ),
  getPlatformConversionRates: (query?: string) =>
    apiClient.get(
      `/admin/stats/platform-conversion-rates${query ? `?${query}` : ""}`
    ),
};

export default statsService;
