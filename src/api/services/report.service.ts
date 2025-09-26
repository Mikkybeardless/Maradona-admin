// GET /seller/reports/dashboard-summary?start_date=2025-01-01&end_date=2025-12-31
// GET /seller/reports/category-performance?start_date=2025-01-01&end_date=2025-12-31
// GET /seller/reports/financial-summary?start_date=2025-01-01&end_date=2025-12-31
// GET /seller/reports/sales-performance-chart?start_date=2025-01-01&end_date=2025-12-31
// GET /seller/reports/monthly-revenue-chart?start_date=2025-01-01&end_date=2025-12-31
// GET /seller/reports/financial-tracking?start_date=2025-01-01&end_date=2025-12-31
// GET /seller/reports/expenses-report?start_date=2025-01-01&end_date=2025-12-31
// GET /seller/reports/revenue-tracking?start_date=2025-01-01&end_date=2025-12-31
// GET /seller/reports/sales-report?start_date=2025-01-01&end_date=2025-12-31

import apiClient from "../apiClient";

const reportService = {
  getDashboardSummary: (params?: Record<string, any>) =>
    apiClient.get(`/seller/reports/dashboard-summary`, { params }), //Query: ?start_date=2025-01-01&end_date=2025-12-31
  getCategoryPerformance: (params?: Record<string, any>) =>
    apiClient.get(`/seller/reports/category-performance`, { params }), //Query: ?start_date=2025-01-01&end_date=2025-12-31
  getFinancialSummary: (params?: Record<string, any>) =>
    apiClient.get(`/seller/reports/financial-summary`, { params }), //Query: ?start_date=2025-01-01&end_date=2025-12-31
  getSalesPerformanceChart: (params?: Record<string, any>) =>
    apiClient.get(`/seller/reports/sales-performance-chart`, { params }), //Query: ?start_date=2025-01-01&end_date=2025-12-31
  getMonthlyRevenueChart: (params?: Record<string, any>) =>
    apiClient.get(`/seller/reports/monthly-revenue-chart`, { params }), //Query: ?start_date=2025-01-01&end_date=2025-12-31
  getFinancialTracking: (params?: Record<string, any>) =>
    apiClient.get(`/seller/reports/financial-tracking`, { params }), //Query: ?start_date=2025-01-01&end_date=2025-12-31
  getExpensesReport: (params?: Record<string, any>) =>
    apiClient.get(`/seller/reports/expenses-report`, { params }), //Query: ?start_date=2025-01-01&end_date=2025-12-31
  getRevenueTracking: (params?: Record<string, any>) =>
    apiClient.get(`/seller/reports/revenue-tracking`, { params }), //Query: ?start_date=2025-01-01&end_date=2025-12-31
  getSalesReport: (params?: Record<string, any>) =>
    apiClient.get(`/seller/reports/sales-report`, { params }), //Query: ?start_date=2025-01-01&end_date=2025-12-31
};
export default reportService;
