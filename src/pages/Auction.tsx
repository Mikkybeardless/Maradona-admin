import { FaPlus, FaStar } from "react-icons/fa6";
import DashboardSearchBar from "../components/DashboardSearchBar";
import MuiTableComponent from "../components/table/TableComponent";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Car2 from "../assets/Dashboard-listing-car.png";
import { generateRandomNumber } from "../helper/helperFunctions";
import { HiSortDescending } from "react-icons/hi";
import { useState } from "react";
import { DateSelect } from "../components/common/dateSelect";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { FilterGroup } from "../components/common/FilterGroup";
import { Dayjs } from "dayjs";
import { useDebounce } from "../hooks/useDebounce";
import { StatusSelect } from "../components/common/statusSelect";
import { set } from "js-cookie";
import formatDayJs from "../helper/formatDateJs";
import { usePaginatedData } from "../hooks/usePaginatedData";
import auctionService from "../api/services/auction.service";
import { AuctionColumns } from "../components/table/columns";

type BidTableType = {
  id: number;
  bidder: any;
  product: string;
  price: string;
  status: string;
  date: Date | string;
};
type IFilter = {
  category: string;
  status: string;
  date: Dayjs | null;
};

// const rows = (): BidTableType[] => {
//   return Array.from({ length: 15 }, (_, i) => {
//     const num = i + 1;
//     const randomNum = generateRandomNumber(4, 1);

//     return {
//       id: num, // Required by MUI
//       bidder: randomNum === 2 ? "No Bid" : `#E${num}HH`,
//       product: "Toyota Camery LE (2024)",
//       price: "N5,500,000",
//       status:
//         randomNum === 1
//           ? "Pending"
//           : randomNum === 2
//           ? "Closed"
//           : randomNum === 3
//           ? "Sold"
//           : "Active",
//       date: new Date().toUTCString(),
//     };
//   });
// };

// const columns: GridColDef[] = [
//   {
//     field: "bidder",
//     headerName: "Bidders",
//     renderCell: ({ value }) => {
//       return (
//         <span className={`${value === "No Bid" && "text-[#DC1313]"}`}>
//           {value}
//         </span>
//       );
//     },
//     flex: 0.7,
//   },
//   {
//     field: "product",
//     headerName: "Product",
//     renderCell: ({ value }) => {
//       return (
//         <div className="flex gap-x-2 items-center">
//           <img className="w-[40px] h-[40px]" src={Car2} alt="product" />
//           <p className="text-sm font-medium text-darkBlue">{value}</p>
//         </div>
//       );
//     },
//     flex: 1,
//   },
//   { field: "price", headerName: "Price", flex: 0.7 },
//   {
//     field: "status",
//     headerName: "Status",
//     flex: 0.7,
//     renderCell: ({ value }) => {
//       return (
//         <span
//           className={`px-3 py-1 rounded-full font-medium text-sm
//           ${
//             value === "Active"
//               ? "bg-[#FE8E49] text-white"
//               : value === "Sold"
//               ? "bg-[#E8F8E8] text-[#0C560B]"
//               : value === "Pending"
//               ? "bg-[#FEF3B8] "
//               : "bg-[#DC1313] text-white"
//           }`}
//         >
//           {value}
//         </span>
//       );
//     },
//   },

//   { field: "date", headerName: "Time", flex: 1 },
// ];

export default function Auction() {
  const navigate = useNavigate();
  // const [selects, setSelects] = useState({
  //   category: "",
  //   date: null,
  //   status: "",
  // });
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [filters, setFilters] = useState<IFilter>({
    category: "",
    status: "",
    date: null,
  });

  const formatedDate = formatDayJs(filters.date);
  const [auctionData, setAuctionData] = usePaginatedData(
    auctionService.getAllAuctions,
    {
      initialPage: 1,
      initialPageSize: 10,
      filters: {
        status: filters.status,
        type: filters.category,
        created_at: formatedDate,
        search: debouncedSearchQuery,
      },
      dataName: "Auctions",
    }
  );
  const handleRowClick = (params: GridRowParams) => {
    console.log("Row clicked:", params.row);
    navigate(`/admin/auctions/auction/${params.row.id}`);
  };

  // const handleSelectChange = (event: {
  //   target: { name: string; value: string };
  // }) => {
  //   setSelects((prev) => ({
  //     ...prev,
  //     [event.target.name]: event.target.value,
  //   }));
  // };
  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar py-20 bg-[#F5F5F5]">
      <div className="w-full py-5 px-5 md:px-10 fixed z-10 left-2 top-0 bg-white border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <main className="px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
        <div className="flex justify-between items-center mt-1">
          <h1 className="text-3xl font-bold flex items-start">Auction</h1>

          <Link
            to="/admin/auctions/add-auction"
            className="rounded-lg flex items-center gap-x-2 px-5 py-2.5 text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
          >
            <FaPlus size={18} />
            New Auction
          </Link>
        </div>

        {/* Filters & Search Bar */}
        <div className="">
          <FilterGroup
            filters={filters}
            onChange={(updated) => {
              setFilters((prev) => ({ ...prev, ...updated }));
            }}
            selects={[
              {
                name: "category",
                placeholder: "Category",
                options: [
                  { label: "House", value: "HOUSE" },
                  { label: "Car", value: "CAR" },
                  { label: "Land", value: "LAND" },
                ],
              },
            ]}
            extraFilters={
              <>
                <StatusSelect
                  options={[
                    { label: "Published", value: "published" },
                    { label: "Sold", value: "sold" },
                    { label: "Draft", value: "draft" },
                  ]}
                  onChange={(value) => {
                    setFilters((prev) => ({ ...prev, status: value }));
                  }}
                  value={filters.status}
                />
                <DateSelect
                  onChange={(date) => {
                    setFilters((prev) => ({ ...prev, date }));
                  }}
                  value={filters.date}
                />
              </>
            }
            searchNode={
              <TableSearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search orders"
              />
            }
          />
        </div>

        {/* table */}
        <section
          id="auctions-table"
          className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
        >
          <div className="min-w-[900px]">
            <MuiTableComponent
              columns={AuctionColumns}
              showCheckbox={false}
              rows={auctionData.rows}
              rowHeight={60}
              loading={auctionData.loading}
              currentPage={auctionData.pagination.page}
              pageSize={auctionData.pagination.pageSize}
              onPageChange={(model) => {
                setAuctionData((prev) => ({
                  ...prev,
                  pagination: {
                    page: model.page,
                    pageSize: model.pageSize,
                  },
                }));
              }}
              onRowClick={handleRowClick}
              headerStyle={{
                backgroundColor: "#f3f4f6",
                fontWeight: "bold",
              }}
              totalRowCount={auctionData.totalRowCount}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
