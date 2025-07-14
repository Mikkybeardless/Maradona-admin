import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FaChevronRight, FaRegSquare, FaSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { ReportTab } from "../components/common/ReportTab";

function ExpensesReport() {
  const rows = (): any[] => {
    return Array.from({ length: 15 }, (_, num) => ({
      id: num + 1,
      date: new Date(),
      orderId: "BF2023",
      product: "Toyota Camry",
      revenue: "₦2,000,000",
      expenses: "₦2,000,000",
      netRevenue: "₦2,000,000",
      status: "Completed",
    }));
  };
  console.log("testing");

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 0.8,
      sortable: false,
      type: "date",
    },
    { field: "orderId", headerName: "Order ID", flex: 0.5, sortable: false },
    { field: "product", headerName: "Product", flex: 0.7 },
    { field: "revenue", headerName: "Revenue", flex: 0.5 },
    { field: "expenses", headerName: "Expenses", flex: 1, sortable: false },
    { field: "netRevenue", headerName: "Net Revenue", flex: 1 },
  ];

  return (
    <div className="h-screen overflow-auto">
      {/* Header & Search Bar */}
      <div className="w-full py-3.5 px-6 sm:px-12 lg:px-24 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      {/* Page Content */}
      <div className="w-[95%] sm:w-[90%] mx-auto mb-20 pt-6 sm:pt-12">
        <div className="flex flex-wrap gap-3 sm:gap-x-7 items-center mb-6 sm:mb-12">
          <Link
            to="/seller/reports"
            className="text-[16px] sm:text-[20px] font-semibold text-[#14199C]"
          >
            Reports
          </Link>
          <FaChevronRight size={14} color="#14199C" />
          <span className="text-sm sm:text-xl font-semibold bg-[#14199C] px-4 py-2 rounded-lg text-white">
            Expenses
          </span>
        </div>

        {/* Filter Section */}
        <ReportTab />

        {/* Table Component */}
        <h3 className="font-semibold text-base sm:text-lg text-[#1E1A1C] mt-6 sm:mt-[30px] mb-4 sm:mb-[25px]">
          Expenses Report Table
        </h3>

        <div className="overflow-x-auto">
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
      </div>
    </div>
  );
}

export default ExpensesReport;
