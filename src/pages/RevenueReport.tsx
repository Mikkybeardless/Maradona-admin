import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { DateRangeProvider, useDateRange } from "../hooks/DateRangeContex";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { ReportTab } from "../components/common/ReportTab";
import reportService from "../api/services/report.service";
import { formatPrice } from "../helper/helperFunctions";

interface IRevenueTrackingData {
  current_page: number;
  data: {
    order_id: number;
    date: string;
    product_name: string;
    revenue: string;
    expenses: number;
    net_revenue: number;
  }[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: (
    | {
        url: null;
        label: string;
        active: boolean;
      }
    | {
        url: string;
        label: string;
        active: boolean;
      }
  )[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

function RevenueReport() {
  return (
    <DateRangeProvider>
      <div className="h-screen overflow-auto">
        {/* Header & Search Bar */}
        <div className="w-full py-3.5 px-6 md:px-24 border-b border-b-primaryBorder">
          <DashboardSearchBar />
        </div>

        {/* Page Content */}
        <div className="w-[95%] md:w-[90%] mx-auto mb-10 pt-8">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap gap-x-4 items-center mb-6">
            <Link
              to="/admin/reports"
              className="text-base md:text-lg font-semibold text-[#14199C]"
            >
              Reports
            </Link>
            <FaChevronRight size={14} color="#14199C" />
            <span className="text-sm md:text-lg font-semibold bg-[#14199C] px-3 py-2 rounded-md text-white">
              Revenue Tracking
            </span>
          </div>

          {/* Filter & Actions Section */}
          <ReportTab />

          {/* Table Header */}
          <p className="font-semibold text-sm md:text-base text-[#1E1A1C] mt-6 mb-4">
            Revenue Report Table
          </p>

          {/* Table Wrapper for Scrollability */}
          <div className="overflow-x-auto">
            <RevenueTrackingTable />
          </div>
        </div>
      </div>
    </DateRangeProvider>
  );
}

export default RevenueReport;

const RevenueTrackingTable = () => {
  const [revenueTrackingData, setRevenueTrackingData] =
    useState<IRevenueTrackingData>();

  const { debouncedRange } = useDateRange();

  useEffect(() => {
    let mounted = true;
    Promise.all([
      reportService.getRevenueTracking({
        start_date: debouncedRange.startDate,
        end_date: debouncedRange.endDate,
      }),
    ])
      .then(([overviewRes]) => {
        if (!mounted) return;
        setRevenueTrackingData(overviewRes.data ?? null);
      })
      .catch(() => {})
      .finally(() => {});

    return () => {
      mounted = false;
    };
  }, [debouncedRange.startDate, debouncedRange.endDate]);

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 0.8, type: "date" },
    { field: "orderId", headerName: "Order ID", flex: 0.5 },
    { field: "product", headerName: "Product", flex: 0.7 },
    { field: "revenue", headerName: "Revenue", flex: 0.5 },
    { field: "expenses", headerName: "Expenses", flex: 1 },
    { field: "netRevenue", headerName: "Net Revenue", flex: 1 },
  ];
  return (
    <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
      <Table sx={{ borderCollapse: "separate", borderSpacing: "0" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F0F0F0" }}>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                sx={{
                  color: "#111111",
                  fontWeight: "bold",
                  border: "none",
                  fontSize: "12px", // Smaller text for mobile
                }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {revenueTrackingData?.data.map((row) => (
            <TableRow key={row.order_id}>
              <TableCell sx={{ border: "none" }}>{row.order_id}</TableCell>
              <TableCell sx={{ border: "none" }}>{row.date}</TableCell>
              <TableCell sx={{ border: "none" }}>{row.product_name}</TableCell>
              <TableCell sx={{ border: "none" }}>
                {formatPrice(Number(row.revenue))}
              </TableCell>
              <TableCell sx={{ border: "none" }}>
                {formatPrice(row.expenses)}
              </TableCell>
              <TableCell sx={{ border: "none" }}>
                {formatPrice(row.net_revenue)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
