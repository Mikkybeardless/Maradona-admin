import { getCurrentYearDateRange } from "../../helper/helperFunctions";
import apiClient from "../apiClient";

// Get start of current year
const { start_date, end_date } = getCurrentYearDateRange();
const all_time_query = `start_date=${start_date}&end_date=${end_date}`;
const statsService = {
  getMonthlyReport: (query?: string) =>
    apiClient.get(
      `/admin/stats/monthly-revenue${
        query ? `?${query}` : `?${all_time_query}`
      }`
    ),
  getTotalOrders: (query?: string) =>
    apiClient.get(
      `/admin/stats/total-orders${query ? `?${query}` : `?${all_time_query}`}`
    ),
  getTotalRevenue: (query?: string) =>
    apiClient.get(
      `/admin/stats/total-revenue${query ? `?${query}` : `?${all_time_query}`}`
    ),
  getTotalUsers: (query?: string) =>
    apiClient.get(
      `/admin/stats/total-users-registered${
        query ? `?${query}` : `?${all_time_query}`
      }`
    ),
  getBestSellingProducts: (query?: string) =>
    apiClient.get(
      `/admin/stats/best-selling-products${
        query ? `?${query}` : `?${all_time_query}`
      }`
    ),
  getBestSellingTypes: (query?: string) =>
    apiClient.get(
      `/admin/stats/revenue-by-product-type${
        query ? `?${query}` : `?${all_time_query}`
      }`
    ),
  getBestSellingLocations: (query?: string) =>
    apiClient.get(
      `/admin/stats/top-selling-locations${
        query ? `?${query}` : `?${all_time_query}`
      }`
    ),
  getTotalSales: (query?: string) =>
    apiClient.get(
      `/admin/stats/total-sales${query ? `?${query}` : `?${all_time_query}`}`
    ),
  getPlatformConversionRates: (query?: string) =>
    apiClient.get(
      `/admin/stats/platform-conversion-rates${query ? `?${query}` : ""}`
    ),
};

export default statsService;
