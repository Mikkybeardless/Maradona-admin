import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { DateRangeProvider, useDateRange } from "../hooks/DateRangeContex";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { ReportTab } from "../components/common/ReportTab";
import reportService from "../api/services/report.service";
import { formatPrice } from "../helper/helperFunctions";

interface IFinancialTrackingData {
  current_page: number;
  data: {
    order_id: number;
    date: string;
    product_name: string;
    product_id: string;
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

function FinancialTracking() {
  return (
    <DateRangeProvider>
      <div className="h-screen overflow-auto">
        <div className="w-full py-3.5 px-4 md:px-8 lg:px-24 border-b border-b-primaryBorder">
          <DashboardSearchBar />
        </div>

        <main className="w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 mb-20 pt-12">
          <div className="flex flex-wrap gap-3 md:gap-x-7 items-center mb-6">
            <Link
              to="/admin/reports"
              className="text-[16px] md:text-[20px] font-semibold text-[#14199C]"
            >
              Reports
            </Link>
            <FaChevronRight size={14} color="#14199C" />
            <span className="text-sm md:text-xl font-semibold bg-[#14199C] p-2 rounded-lg text-[#FFFFFF]">
              Financial Tracking
            </span>
          </div>

          <ReportTab />

          {/* Table Component */}
          <p className="font-semibold text-base text-[#1E1A1C] mt-6 mb-4">
            Financial Tracking Table
          </p>

          <div className="w-full overflow-x-auto">
            <FinancialTrackingTable />
          </div>
        </main>
      </div>
    </DateRangeProvider>
  );
}

export default FinancialTracking;

const FinancialTrackingTable = () => {
  const [financialTrackingData, setFinancialTrackingData] =
    useState<IFinancialTrackingData>();

  const { debouncedRange } = useDateRange();

  useEffect(() => {
    let mounted = true;
    Promise.all([
      reportService.getFinancialTracking({
        start_date: debouncedRange.startDate,
        end_date: debouncedRange.endDate,
      }),
    ])
      .then(([overviewRes]) => {
        if (!mounted) return;
        setFinancialTrackingData(overviewRes.data ?? null);
      })
      .catch(() => {})
      .finally(() => {});

    return () => {
      mounted = false;
    };
  }, [debouncedRange.startDate, debouncedRange.endDate]);

  const columns = [
    { field: "order_id", headerName: "ID", minWidth: 100 },
    { field: "date", headerName: "Date", minWidth: 100 },
    { field: "product_id", headerName: "Product ID", minWidth: 100 },
    { field: "product_name", headerName: "Product Name", minWidth: 150 },
    { field: "revenue", headerName: "Revenue", minWidth: 120 },
    { field: "expenses", headerName: "Expenses", minWidth: 120 },
    { field: "net_revenue", headerName: "Net Revenue", minWidth: 120 },
  ];

  return (
    <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
      <Table
        sx={{
          borderCollapse: "separate",
          borderSpacing: "0",
          minWidth: 600,
        }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F0F0F0" }}>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                sx={{
                  color: "#111111",
                  fontWeight: "bold",
                  border: "none",
                }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {financialTrackingData?.data.map((row) => (
            <TableRow key={row.order_id}>
              <TableCell sx={{ border: "none" }}>{row.order_id}</TableCell>
              <TableCell sx={{ border: "none" }}>
                {new Date(row.date).toDateString()}
              </TableCell>
              <TableCell sx={{ border: "none" }}>{row.product_id}</TableCell>
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
