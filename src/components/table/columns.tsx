import { GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "../../helper/helperFunctions";
import { TbAward } from "react-icons/tb";
import { Link } from "react-router-dom";
import { ProductActionCellComponent } from "../../pages/Products";
import { formatIsoString } from "../../helper/formatIIsoString";
import { OrderActionCellComponent } from "../../pages/Orders";

// buyer columns
export const BuyerColumns: GridColDef[] = [
  { field: "name", headerName: "Customer name", flex: 1 },
  { field: "id", headerName: "ID", flex: 0.2, sortable: false },
  { field: "phone", headerName: "Phone", flex: 1, sortable: false },
  { field: "email", headerName: "Email", flex: 1, sortable: false },
  { field: "location", headerName: "Location", flex: 1, sortable: false },
  { field: "orders", headerName: "Order(s)" },
  {
    field: "totalSpent",
    headerName: "Total Spent",
    flex: 0.8,
    renderCell: ({ row }) => (
      <span className="">₦{formatPrice(row.totalSpent)}</span>
    ),
  },
  { field: "status", headerName: "Status", sortable: false },
];
// sellers
export const sellerColumns: GridColDef[] = [
  { field: "name", headerName: "Customer name", flex: 1 },
  { field: "id", headerName: "ID", flex: 0.2, sortable: false },
  { field: "phone", headerName: "Phone", flex: 1, sortable: false },
  { field: "email", headerName: "Email", flex: 1, sortable: false },
  { field: "location", headerName: "Location", flex: 1, sortable: false },
  { field: "orders", headerName: "Order(s)" },
  {
    field: "totalSpent",
    headerName: "Total Spent",
    flex: 0.8,
    renderCell: ({ row }) => (
      <span className="">₦{formatPrice(row.totalSpent)}</span>
    ),
  },
  { field: "status", headerName: "Status", sortable: false },
];

//   field agents
export const AgentColumns: GridColDef[] = [
  { field: "id", headerName: "Agent ID", flex: 0.4, sortable: false },
  {
    field: "name",
    headerName: "Customer name",
    flex: 1,
    sortable: false,
  },
  { field: "email", headerName: "Email", flex: 1, sortable: false },
  // { field: "phone", headerName: "Phone", flex: 1, sortable: false },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   renderCell: ({ value }) => {
  //     return (
  //       <span
  //         className={`${
  //           value === "Active" ? "text-[#0C560B]" : "text-[#DC1313]"
  //         }`}
  //       >
  //         {value}
  //       </span>
  //     );
  //   },
  //   flex: 0.5,
  //   sortable: false,
  // },
  {
    field: "verifiedListings",
    headerName: "Verified Listings",
    flex: 0.5,
    sortable: false,
    renderCell: () => {
      return (
        <div className="h-full w-full relative flex justify-center items-center gap-x-0.5">
          <TbAward size={18} className="flex-shrink-0" />
          <span className="text-xs text-defaultOrange">10</span>
        </div>
      );
    },
  },
];
export const RequestColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Product",
    flex: 1,
    sortable: false,
  },
  { field: "type", headerName: "Category", flex: 0.5, sortable: false },
  { field: "price", headerName: "Price(₦)", flex: 0.7 },
  { field: "stock", headerName: "Stock", flex: 0.5, type: "number" },
  {
    field: "Action",
    headerName: "Action",
    renderCell: ({ row }) => {
      return (
        <div className="h-full w-full relative flex justify-center items-center gap-x-4">
          <Link
            to={`/admin/agents/request/${row.id}`}
            state={{ fieldAgent: true }}
            className="text-sm text-[#C38D00] hover:underline"
          >
            View
          </Link>
          <span className="text-sm text-green-600">Approve</span>
          <span className="text-sm text-red-500">Reject</span>
        </div>
      );
    },
    flex: 0.7,
    sortable: false,
  },
];
export const InspectionColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Product",
    flex: 1,
    sortable: false,
  },
  { field: "type", headerName: "Category", flex: 1, sortable: false },
  { field: "price", headerName: "Price(₦)", flex: 1 },
  { field: "stock", headerName: "Stock", flex: 0.5, type: "number" },
  {
    field: "Action",
    headerName: "Action",
    renderCell: ({ row }) => {
      return (
        <div className="h-full w-full relative flex justify-center items-center gap-x-4">
          <button
            // onClick={() => openInspectionModal(row.id)}
            className="text-sm text-[#C38D00] hover:underline"
          >
            View
          </button>
          <span className="text-sm text-green-800">Approve</span>
          <span className="text-sm text-red-500">Reject</span>
        </div>
      );
    },
    flex: 1,
    sortable: false,
  },
];

// product
export const ProductColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.1 },
  {
    field: "name",
    headerName: "Product",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div className="flex flex-1 h-full  items-center gap-x-2">
          <img
            className="w-20 h-auto rounded-lg object-contain bg-gray-100"
            src={row.media[0] || "/images/placeholder.png"}
            alt={`image-${row.name}`}
          />
          <span className="text-sm">{row.name}</span>
        </div>
      );
    },
    flex: 4,
  },
  { field: "type", headerName: "Category" },
  { field: "price", headerName: "Price(₦)", type: "number" },
  // { field: "current_stock", headerName: "Stock", type: "number", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    renderCell: ({ row }) => {
      return (
        <div className="w-full h-full items-center flex justify-center">
          <span
            className={`${renderStatusColor(
              row.status
            )} rounded-[100px] !text-xs px-2.5 py-1`}
          >
            {row.status}
          </span>
        </div>
      );
    },
    flex: 1,
  },
  {
    field: "Action",
    flex: 0.5,
    renderCell: ({ row }) => {
      return <ProductActionCellComponent row={row} />;
    },
  },
];
function renderStatusColor(status: string) {
  switch (status) {
    case "published":
      return "bg-[#E8F8E8] text-[#0C560B]";
    case "pending":
      return "bg-[#FEF3B8] text-[#897a28]";
    case "draft":
      return "bg-[#DAE9FB] text-[#0B283E]";
    default:
      return "";
  }
}

// auction
export const AuctionColumns: GridColDef[] = [
  {
    field: "seller_id",
    headerName: "Bidders",
    renderCell: ({ value }) => {
      return (
        <span className={`${value === "No Bid" && "text-[#DC1313]"}`}>
          {value}
        </span>
      );
    },
    flex: 0.7,
  },
  {
    field: "name",
    headerName: "Product",
    renderCell: ({ row }) => {
      return (
        <div className="flex gap-x-5 items-center">
          <img
            className="w-[40px] h-[40px]"
            src={row.media[0] || "/images/placeholder.png"}
            alt="product"
          />
          <p className="text-sm font-medium text-darkBlue">{row.name}</p>
        </div>
      );
    },
    flex: 1,
  },
  { field: "price", headerName: "Price", flex: 0.7 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.7,
    renderCell: ({ value }) => {
      return (
        <span
          className={`px-3 py-1 rounded-full font-medium text-sm
          ${
            value === "published"
              ? "bg-[#FE8E49] text-white"
              : value === "sold"
              ? "bg-[#E8F8E8] text-[#0C560B]"
              : value === "draft"
              ? "bg-[#FEF3B8] "
              : "bg-[#DC1313] text-white"
          }`}
        >
          {value}
        </span>
      );
    },
  },

  {
    field: "created_at",
    headerName: "Time",
    renderCell: ({ value }) => {
      const { formattedDate, formattedTime } = formatIsoString(value);
      return (
        <div className="flex">
          <div>{formattedDate}</div>
          <div>{formattedTime}</div>
        </div>
      );
    },
    flex: 0.9,
  },
];

// order
export const OrderColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.3 },
  { field: "name", headerName: "Customer", flex: 0.9 },
  { field: "type", headerName: "Item type", flex: 0.4 },
  { field: "details", headerName: "Item Details", flex: 1 },
  { field: "date", headerName: "Order Date", flex: 1 },
  { field: "status", headerName: "Status", flex: 0.5 },
  {
    field: "Action",
    flex: 0.5,
    renderCell: ({ row }) => {
      return <OrderActionCellComponent row={row} />;
    },
  },
];
