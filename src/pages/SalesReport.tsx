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
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ReportTab } from "../components/common/ReportTab";
import DashboardSearchBar from "../components/DashboardSearchBar";

function SaleReport() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const rows = (): any[] => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      date: new Date(),
      orderId: "BF2023",
      customerName: "Rosemary Sunday",
      product: "Toyota Camry",
      quantity: "1",
      salePrice: "₦2,000,000",
      totalSale: "₦2,000,000",
      status: "Completed",
    }));
  };

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 0.8, type: "date" },
    { field: "orderId", headerName: "Order ID", flex: 0.5 },
    { field: "customerName", headerName: "Customer Name", flex: 1 },
    { field: "product", headerName: "Product", flex: 0.7 },
    { field: "quantity", headerName: "Quantity", flex: 0.3 },
    { field: "salePrice", headerName: "Sale Price", flex: 1 },
    { field: "totalSale", headerName: "Total Price Amount", flex: 1 },
    { field: "status", headerName: "Status", flex: 0.3 },
  ];

  return (
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
            to="/seller/reports"
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
                {rows().map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ border: "none", whiteSpace: "nowrap" }}>
                      {row.date.toDateString()}
                    </TableCell>
                    <TableCell sx={{ border: "none", whiteSpace: "nowrap" }}>
                      {row.orderId}
                    </TableCell>
                    <TableCell sx={{ border: "none", whiteSpace: "nowrap" }}>
                      {row.customerName}
                    </TableCell>
                    <TableCell sx={{ border: "none", whiteSpace: "nowrap" }}>
                      {row.product}
                    </TableCell>
                    <TableCell sx={{ border: "none", whiteSpace: "nowrap" }}>
                      {row.quantity}
                    </TableCell>
                    <TableCell sx={{ border: "none", whiteSpace: "nowrap" }}>
                      {row.salePrice}
                    </TableCell>
                    <TableCell sx={{ border: "none", whiteSpace: "nowrap" }}>
                      {row.totalSale}
                    </TableCell>
                    <TableCell sx={{ border: "none", whiteSpace: "nowrap" }}>
                      {row.status}
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

export default SaleReport;
