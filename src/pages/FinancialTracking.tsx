import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaChevronRight, FaRegSquare, FaSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { ReportTab } from "../components/common/ReportTab";

function FinancialTracking() {
  const rows = (): any[] => {
    return Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      date: new Date(),
      orderId: "BF2023",
      product: "Toyota Camry",
      revenue: "₦2,000,000",
      expenses: "₦2,000,000",
      netRevenue: "₦2,000,000",
      status: "Completed",
    }));
  };

  const columns = [
    { field: "date", headerName: "Date", minWidth: 120 },
    { field: "orderId", headerName: "Order ID", minWidth: 100 },
    { field: "product", headerName: "Product", minWidth: 150 },
    { field: "revenue", headerName: "Revenue", minWidth: 120 },
    { field: "expenses", headerName: "Expenses", minWidth: 120 },
    { field: "netRevenue", headerName: "Net Revenue", minWidth: 120 },
  ];

  return (
    <div className="h-screen overflow-auto">
      {/* Header & Search Bar */}
      <div className="w-full py-3.5 px-4 md:px-8 lg:px-24 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      {/* Page Content */}
      <main className="w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 mb-20 pt-12">
        <div className="flex flex-wrap gap-3 md:gap-x-7 items-center mb-6">
          <Link
            to="/seller/reports"
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
                {rows().map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ border: "none" }}>
                      {row.date.toDateString()}
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>{row.orderId}</TableCell>
                    <TableCell sx={{ border: "none" }}>{row.product}</TableCell>
                    <TableCell sx={{ border: "none" }}>{row.revenue}</TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {row.expenses}
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {row.netRevenue}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
    </div>
  );
}

export default FinancialTracking;
