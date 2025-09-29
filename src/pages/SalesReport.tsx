import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { DateRangeProvider, useDateRange } from "../hooks/DateRangeContex";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { ReportTab } from "../components/common/ReportTab";
import reportService from "../api/services/report.service";

interface ISalesReportData {
  current_page: number;
  data: {
    id: number;
    date: string;
    customer_name: string;
    product_name: string;
    product_type: string;
    quantity: number;
    sale_price: string;
    total_sale_amount: string;
    status: string;
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

function SaleReport() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 0.8, type: "date" },
    { field: "customer_name", headerName: "Customer Name", flex: 1 },
    { field: "product_name", headerName: "Product Name", flex: 0.7 },
    { field: "product_type", headerName: "Type", flex: 0.7 },
    { field: "quantity", headerName: "Quantity", flex: 0.3 },
    { field: "sale_price", headerName: "Sale Price", flex: 1 },
    { field: "total_sale", headerName: "Total Sale Amount", flex: 1 },
    { field: "status", headerName: "Status", flex: 0.3 },
  ];

  return (
    <DateRangeProvider>
      <div className="h-screen overflow-auto">
        {/* Header & Search Bar */}
        <div className="w-full py-3.5 px-6 md:px-12 lg:px-24 border-b border-b-primaryBorder">
          <DashboardSearchBar />
        </div>

        {/* Page Content */}
        <div className="w-[95%] md:w-[90%] mx-auto mb-20 pt-12">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-3 md:gap-x-7 items-center mb-8 md:mb-12">
            <Link
              to="/admin/reports"
              className="text-lg font-semibold text-[#14199C]"
            >
              Reports
            </Link>
            <FaChevronRight size={14} color="#14199C" />
            <span className="text-lg md:text-xl font-semibold bg-[#14199C] px-3 py-2 rounded-md text-white">
              Sales Report
            </span>
          </div>

          {/* Filters & Actions */}
          <ReportTab />

          {/* Table Title */}
          <p className="font-semibold text-base md:text-lg text-[#1E1A1C] mt-6 mb-4">
            Sales Report Table
          </p>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <SalesTable columns={columns} />
          </div>
        </div>
      </div>
    </DateRangeProvider>
  );
}

export default SaleReport;

const SalesTable = ({ columns }: { columns: GridColDef[] }) => {
  const [salesReportData, setSalesReportData] = useState<ISalesReportData>();

  const { debouncedRange } = useDateRange();

  useEffect(() => {
    let mounted = true;
    Promise.all([
      reportService.getSalesReport({
        start_date: debouncedRange.startDate,
        end_date: debouncedRange.endDate,
      }),
    ])
      .then(([overviewRes]) => {
        if (!mounted) return;
        setSalesReportData(overviewRes.data ?? null);
      })
      .catch(() => {})
      .finally(() => {});

    return () => {
      mounted = false;
    };
  }, [debouncedRange.startDate, debouncedRange.endDate]);
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
          {salesReportData?.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell
                sx={{
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {row.id}
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {row.date}
              </TableCell>

              <TableCell
                sx={{
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {row.customer_name}
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {row.product_name}
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {row.product_type}
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {row.quantity}
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {row.sale_price}
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {row.total_sale_amount}
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
