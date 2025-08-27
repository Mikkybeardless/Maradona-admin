import { GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "../../helper/helperFunctions";
import { TbAward } from "react-icons/tb";
import { Link } from "react-router-dom";
import { formatIsoString } from "../../helper/formatIIsoString";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popper } from "@mui/material";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { GoDotFill, GoTrash } from "react-icons/go";
import purchaseEnquiriesService from "../../api/services/purchaseEnquiries.service";
import { toast } from "react-toastify";
import { BiEditAlt } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa6";

// buyer columns
export const BuyerColumns: GridColDef[] = [
  { field: "name", headerName: "Customer name", flex: 1 },
  { field: "id", headerName: "ID", flex: 0.2, sortable: false },

  { field: "email", headerName: "Email", flex: 1, sortable: false },
  {
    field: "created_at",
    headerName: "Created At",
    renderCell: ({ row }) => formatIsoString(row.created_at).formattedDate,
    flex: 1,
    sortable: false,
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    renderCell: ({ row }) => formatIsoString(row.updated_at).formattedDate,
    flex: 1,
    sortable: false,
  },

  {
    field: "email_verified_at",
    headerName: "Verification Status",
    renderCell: ({ row }) => (
      <span
        className={`text-sm ${
          row.email_verified_at !== null ? "text-green-600" : "text-red-600"
        }`}
      >
        {row.email_verified_at !== null
          ? formatIsoString(row.email_verified_at).formattedDate
          : "Not Verified"}
      </span>
    ),
    sortable: false,
  },
];
// sellers
export const sellerColumns: GridColDef[] = [
  { field: "name", headerName: "Customer name", flex: 1 },
  { field: "id", headerName: "ID", flex: 0.2, sortable: false },

  { field: "email", headerName: "Email", flex: 1, sortable: false },
  {
    field: "created_at",
    headerName: "Created At",
    renderCell: ({ row }) => formatIsoString(row.created_at).formattedDate,
    flex: 1,
    sortable: false,
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    renderCell: ({ row }) => formatIsoString(row.updated_at).formattedDate,
    flex: 1,
    sortable: false,
  },

  {
    field: "email_verified_at",
    headerName: "Verification Status",
    renderCell: ({ row }) => (
      <span
        className={`text-sm ${
          row.email_verified_at !== null ? "text-green-600" : "text-red-600"
        }`}
      >
        {row.email_verified_at !== null
          ? formatIsoString(row.email_verified_at).formattedDate
          : "Not Verified"}
      </span>
    ),
    sortable: false,
  },
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
  {
    field: "created_at",
    headerName: "Created At",
    renderCell: ({ row }) => formatIsoString(row.created_at).formattedDate,
    flex: 1,
    sortable: false,
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    renderCell: ({ row }) => formatIsoString(row.updated_at).formattedDate,
    flex: 1,
    sortable: false,
  },
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
  {
    field: "price",
    headerName: "Price(₦)",
    renderCell: ({ row }) => formatPrice(row.price),
    flex: 0.7,
  },
  // { field: "stock", headerName: "Stock", flex: 0.5, type: "number" },
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
          <button className="text-sm text-green-600">Approve</button>
          <button className="text-sm text-red-500">Reject</button>
        </div>
      );
    },
    flex: 0.5,
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
          <button className="text-sm text-green-800">Approve</button>
          <button className="text-sm text-red-500">Reject</button>
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
    flex: 2,
  },
  { field: "type", headerName: "Category" },
  {
    field: "price",
    headerName: "Price(₦)",
    renderCell: ({ row }) => formatPrice(row.price),
    type: "number",
    flex: 1,
  },
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
    flex: 0.5,
  },
  {
    field: "Action",
    flex: 0.5,
    renderCell: ({ row }) => {
      return <ProductActionCellComponent row={row} />;
    },
  },
];

const ProductActionCellComponent = ({ row }: { row: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? `popper-${row.id}` : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div className="h-full w-full relative z-10 flex justify-center items-center overflow-visible">
      <button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        className="cursor-pointer bg-transparent border-none p-2 m-0 rounded-full hover:bg-gray-100"
        style={{ lineHeight: 0 }}
      >
        <BsThreeDotsVertical size={16} />
      </button>
      <Popper
        ref={dotsPopupRef}
        className="p-3 text-sm z-10 flex gap-x-4 items-center rounded-lg border border-primaryBorder bg-white"
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        style={{ zIndex: 1300 }}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
              padding: 8,
            },
          },
        ]}
      >
        <Link to={`/admin/products/product/${row.id}`}>
          <FaRegEye size={18} />
        </Link>
        <Link to={`/admin/products/edit-product/${row.id}`}>
          <BiEditAlt size={18} />
        </Link>

        {/* <button onClick={() => handleDelete(row.id)}>
          <GoTrash size={18} />
        </button> */}
      </Popper>
    </div>
  );
};

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
    headerName: "Seller",
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

// active auctions/bids
export const BidsColumns: GridColDef[] = [
  {
    field: "buyer_name",
    headerName: "Bidders",
    renderCell: ({ row }) => {
      return <span>{row.buyer.name}</span>;
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

export const purchaseEnqColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "Enquiry ID",
    flex: 0.5,
  },
  {
    field: "buyer",
    headerName: "Buyer",
    renderCell: ({ value }) => {
      return (
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{value?.id}</span>
          <span className=" text-sm font-medium">{value?.name}</span>
          <span className="text-xs text-gray-500">{value?.email}</span>
        </div>
      );
    },
    flex: 0.5,
  },

  {
    field: "product",
    headerName: "Product",
    renderCell: ({ value }) => {
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium truncate">{value?.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{value?.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">
              N{formatPrice(Number(value?.price))}
            </span>
          </div>
        </div>
      );
    },
    flex: 1,
    sortable: false,
  },
  {
    field: "agent",
    headerName: "Agent",
    renderCell: ({ value }) => {
      return (
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{value?.id}</span>
          <span className="text-sm font-medium">{value?.name}</span>
          <span className="text-xs text-gray-500">{value?.email}</span>
        </div>
      );
    },
    flex: 0.5,
  },
  {
    field: "message",
    headerName: "Message",
    flex: 1,
    renderCell: ({ value }) => (
      <span className="font-medium  truncate">{value}</span>
    ),
  },
  {
    field: "inspection_request",
    headerName: "Inspection Request",
    renderCell: ({ value }) => {
      return (
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">
            {formatIsoString(value?.scheduled_at).formattedDate} at{" "}
            {formatIsoString(value?.scheduled_at).formattedTime}
          </span>
          <span className="text-xs text-gray-500">
            {formatIsoString(value?.completed_at).formattedDate} at{" "}
            {formatIsoString(value?.completed_at).formattedTime}
          </span>
          <span className="text-xs text-gray-500">{value?.notes}</span>
        </div>
      );
    },
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    renderCell: ({ value }) => {
      return (
        <span
          className={`flex gap-x-1 items-center justify-start w-[120px] px-2 py-1 rounded-full font-medium text-sm
              ${getStatusClassPurchaseEnquiry(value)}`}
        >
          <GoDotFill size={20} /> {value}
        </span>
      );
    },
  },
  {
    field: "Action",
    flex: 0.5,
    renderCell: ({ row }) => {
      return <PurchaseActionCellComponent rowId={row.id} />;
    },
  },
];

export const PurchaseActionCellComponent = ({ rowId }: { rowId: number }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [closing, setClosing] = useState(false);
  const dotsPopupRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? `popper-${rowId}` : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClosedEnquiry = async () => {
    try {
      setClosing(true);
      const response = await purchaseEnquiriesService.closeEnquiry(rowId);
      if (response.status === 200) {
        // Handle successful closure
        toast.success("Enquiry closed successfully");
      }
    } catch (error) {
      toast.error("Error closing enquiry, pls try again later");
      console.error("Error closing enquiry:", error);
    } finally {
      setAnchorEl(null);
      setClosing(false);
    }
  };

  return (
    <div className="h-full w-full relative z-10 flex justify-center items-center overflow-visible">
      <button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        className="cursor-pointer bg-transparent border-none p-2 m-0 rounded-full hover:bg-gray-100"
        style={{ lineHeight: 0 }}
      >
        <BsThreeDotsVertical size={16} />
      </button>
      <Popper
        ref={dotsPopupRef}
        className="p-3 px-4 text-sm z-10 flex flex-col gap-3 items-center rounded-lg border border-primaryBorder bg-white"
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        style={{ zIndex: 1300 }}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
              padding: 8,
            },
          },
        ]}
      >
        <Link
          to={`/admin/purchase-enquiries/enquiry/${rowId}`}
          className="text-xs hover:underline hover:text-green-600"
        >
          View Details
        </Link>
        <button
          onClick={handleClosedEnquiry}
          className="text-xs hover:underline hover:text-red-600"
        >
          {closing ? "Closing..." : "Close Enquiry"}
        </button>
      </Popper>
    </div>
  );
};
const getStatusClassPurchaseEnquiry = (status: string) => {
  switch (status) {
    case "closed":
      return "text-red-500 bg-red-100";
    case "open":
      return "text-yellow-500 bg-yellow-100";
    case "sold":
      return "text-green-500 bg-green-100";
    case "assigned":
      return "text-[#9F1AB1] bg-[#FBE8FF]";
    default:
      return "";
  }
};
