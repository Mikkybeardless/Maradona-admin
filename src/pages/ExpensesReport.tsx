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
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DateRangeProvider, useDateRange } from "../hooks/DateRangeContex";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { ReportTab } from "../components/common/ReportTab";
import reportService from "../api/services/report.service";
import { formatPrice } from "../helper/helperFunctions";

interface IExpensesReport {
  current_page: number;
  data: {
    id: number;
    date: string;
    product_name: string;
    promotion_income: string;
    sales_revenue: number;
    total_admin_revenue: number;
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

function ExpensesReport() {
  return (
    <DateRangeProvider>
      <div className="h-screen overflow-auto">
        {/* Header & Search Bar */}
        <div className="w-full py-3.5 px-6 sm:px-12 lg:px-24 border-b border-b-primaryBorder">
          <DashboardSearchBar />
        </div>

        {/* Page Content */}
        <div className="w-[95%] sm:w-[90%] mx-auto mb-20 pt-6 sm:pt-12">
          <div className="flex flex-wrap gap-3 sm:gap-x-7 items-center mb-6 sm:mb-12">
            <Link
              to="/admin/reports"
              className="text-[16px] sm:text-[20px] font-semibold text-[#14199C]"
            >
              Reports
            </Link>
            <FaChevronRight size={14} color="#14199C" />
            <span className="text-sm sm:text-xl font-semibold bg-[#14199C] px-4 py-2 rounded-lg text-white">
              Admin Revenue
            </span>
          </div>

          {/* Filter Section */}
          <ReportTab />

          {/* Table Component */}
          <h3 className="font-semibold text-base sm:text-lg text-[#1E1A1C] mt-6 sm:mt-[30px] mb-4 sm:mb-[25px]">
            Admin Revenue Report Table
          </h3>

          <div className="overflow-x-auto">
            <ExpensesReportTable />
          </div>
        </div>
      </div>
    </DateRangeProvider>
  );
}

export default ExpensesReport;

const ExpensesReportTable = () => {
  const [expensesReportData, setExpensesReportData] =
    useState<IExpensesReport>();

  const { debouncedRange } = useDateRange();

  useEffect(() => {
    let mounted = true;
    Promise.all([
      reportService.getExpensesReport({
        start_date: debouncedRange.startDate,
        end_date: debouncedRange.endDate,
      }),
    ])
      .then(([overviewRes]) => {
        if (!mounted) return;
        setExpensesReportData(overviewRes.data ?? null);
      })
      .catch(() => {})
      .finally(() => {});

    return () => {
      mounted = false;
    };
  }, [debouncedRange.startDate, debouncedRange.endDate]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", flex: 0.5, sortable: false },
    {
      field: "date",
      headerName: "Date",
      flex: 0.8,
      sortable: false,
      type: "date",
    },
    { field: "product_name", headerName: "Product Name", flex: 0.7 },
    {
      field: "promotion_income",
      headerName: "Promotion Income(₦)",
      flex: 1,
      sortable: false,
    },
    { field: "sales_revenue", headerName: "Sales Revenue(₦)", flex: 0.5 },
    {
      field: "total_admin_revenue",
      headerName: "Total Admin Revenue(₦)",
      flex: 1,
    },
  ];
  return (
    <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F0F0F0" }}>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                sx={{
                  color: "#111111",
                  fontWeight: "bold",
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {expensesReportData?.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ border: "none" }}>{row.id}</TableCell>
              <TableCell sx={{ border: "none" }}>{row.date}</TableCell>
              <TableCell sx={{ border: "none" }}>{row.product_name}</TableCell>
              <TableCell sx={{ border: "none" }}>
                {formatPrice(Number(row.promotion_income))}
              </TableCell>
              <TableCell sx={{ border: "none" }}>
                {formatPrice(row.sales_revenue)}
              </TableCell>
              <TableCell sx={{ border: "none" }}>
                {formatPrice(row.total_admin_revenue)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// const i = {
//   current_page: 1,
//   data: [
//     {
//       id: 4,
//       date: "2025-09-05 16:37:17",
//       product_name: "Detached House",
//       expenses: "5300.00",
//       revenue: 0,
//       net_revenue: -5300,
//     },
//     {
//       id: 3,
//       date: "2025-09-05 16:34:55",
//       product_name: "Toyota Camry LE (2024) by seller",
//       expenses: "10600.00",
//       revenue: 0,
//       net_revenue: -10600,
//     },
//     {
//       id: 2,
//       date: "2025-09-05 16:20:51",
//       product_name: "Detached House",
//       expenses: "5300.00",
//       revenue: 0,
//       net_revenue: -5300,
//     },
//     {
//       id: 1,
//       date: "2025-09-05 14:27:26",
//       product_name: "Toyota Camry LE (2024) by seller",
//       expenses: "150.00",
//       revenue: 0,
//       net_revenue: -150,
//     },
//   ],
//   first_page_url:
//     "http://localhost:8000/api/seller/reports/expenses-report?page=1",
//   from: 1,
//   last_page: 1,
//   last_page_url:
//     "http://localhost:8000/api/seller/reports/expenses-report?page=1",
//   links: [
//     {
//       url: null,
//       label: "&laquo; Previous",
//       active: false,
//     },
//     {
//       url: "http://localhost:8000/api/seller/reports/expenses-report?page=1",
//       label: "1",
//       active: true,
//     },
//     {
//       url: null,
//       label: "Next &raquo;",
//       active: false,
//     },
//   ],
//   next_page_url: null,
//   path: "http://localhost:8000/api/seller/reports/expenses-report",
//   per_page: 15,
//   prev_page_url: null,
//   to: 4,
//   total: 4,
// };
