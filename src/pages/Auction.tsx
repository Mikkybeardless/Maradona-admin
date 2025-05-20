import { FaPlus, FaStar } from "react-icons/fa6";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { CiSearch } from "react-icons/ci";
import MuiTableComponent from "../components/TableComponent";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Car2 from "../assets/Dashboard-listing-car.png";
import { generateRandomNumber } from "../helper/helperFunctions";
import { HiSortDescending } from "react-icons/hi";
import { useState } from "react";
import { DateSelect } from "../components/common/dateSelect";

type BidTableType = {
  id: number;
  bidder: any;
  product: string;
  price: string;
  status: string;
  date: Date | string;
};

const rows = (): BidTableType[] => {
  return Array.from({ length: 15 }, (_, i) => {
    const num = i + 1;
    const randomNum = generateRandomNumber(4, 1);

    return {
      id: num, // Required by MUI
      bidder: randomNum === 2 ? "No Bid" : `#E${num}HH`,
      product: "Toyota Camery LE (2024)",
      price: "N5,500,000",
      status:
        randomNum === 1
          ? "Pending"
          : randomNum === 2
          ? "Closed"
          : randomNum === 3
          ? "Sold"
          : "Active",
      date: new Date().toUTCString(),
    };
  });
};

const columns: GridColDef[] = [
  {
    field: "bidder",
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
    field: "product",
    headerName: "Product",
    renderCell: ({ value }) => {
      return (
        <div className="flex gap-x-2 items-center">
          <img className="w-[40px] h-[40px]" src={Car2} alt="product" />
          <p className="text-sm font-medium text-darkBlue">{value}</p>
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
            value === "Active"
              ? "bg-[#FE8E49] text-white"
              : value === "Sold"
              ? "bg-[#E8F8E8] text-[#0C560B]"
              : value === "Pending"
              ? "bg-[#FEF3B8] text-[#0C560B]"
              : "bg-[#DC1313] text-white"
          }`}
        >
          {value}
        </span>
      );
    },
  },

  { field: "date", headerName: "Time", flex: 1 },
];

export default function Auction() {
  const navigate = useNavigate();
  const [selects, setSelects] = useState({
    category: "",
    date: null,
    status: "",
  });

  // const handleRowClick = (row: BidTableType) => {
  //     navigate(`/auctions/${row.id}`);
  // };

  const handleRowClick = (params: GridRowParams) => {
    console.log("Row clicked:", params.row);
    navigate(`/auctions/auction/${params.row.id}`);
  };

  const handleSelectChange = (event: {
    target: { name: string; value: string };
  }) => {
    setSelects((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar py-20 bg-[#F5F5F5]">
      <div className="w-full py-5 px-5 md:px-10 fixed z-10 left-2 top-0 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
        <div className="flex justify-between items-center mt-1">
          <h1 className="text-3xl font-bold flex items-start">Auction</h1>

          <Link
            to="/auctions/add-auction"
            className="rounded-lg flex items-center gap-x-2 px-5 py-2.5 text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
          >
            <FaPlus size={18} />
            New Auction
          </Link>
        </div>

        <div className="flex justify-between flex-wrap gap-y-1 items-end my-5 w-full">
          <div className="flex gap-x-3 md:gap-x-5 items-center">
            <div className="px-2.5 rounded-lg  border border-primaryBorder bg-white">
              <select className="py-2.5 text-sm outline-none">
                <option>Category</option>
                <option>2</option>
              </select>
            </div>
            <DateSelect value={selects.date} />
            <div className="flex flex-col gap-y-1">
              <div className=" px-2 md:px-2.5 relative flex items-center gap-x-[2px] md:gap-x-1 rounded-lg border border-primaryBorder bg-white">
                <HiSortDescending />
                <select
                  id="selectSort"
                  value={selects.status}
                  name="status"
                  onChange={handleSelectChange}
                  className="text-sm outline-none h-full py-2.5"
                >
                  <option value="">status</option>
                  <option value="published">Published</option>
                  <option value="pending">Pending</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-x-2 px-3 basis-[25%] rounded-lg border bg-white border-primaryBorder">
            <CiSearch className="h-fit w-fit my-auto" size={24} />
            <input
              className="flex-1 py-2.5 outline-none border-none text-sm bg-transparent"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>

        {/* table */}
        <div className="mt-0 min-h-[500px] flex flex-1 w-full overflow-hidden">
          <MuiTableComponent
            columns={columns}
            showCheckbox={false}
            rows={rows()}
            paginationActive={true}
            rowHeight={60}
            pageSize={10}
            onRowClick={handleRowClick}
            headerStyle={{
              backgroundColor: "#f3f4f6",
              fontWeight: "bold",
            }}
          />
        </div>
      </div>
    </div>
  );
}
