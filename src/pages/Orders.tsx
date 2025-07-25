import { FaChevronRight, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { PiCoinVerticalDuotone } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import MuiTableComponent from "../components/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { generateRandomNumber } from "../helper/helperFunctions";
import LineAreaChart from "../components/LineAreaChart";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { FaFileDownload } from "react-icons/fa";
import { Popper } from "@mui/material";
import { BsThreeDots } from "react-icons/bs";
import { DateSelect } from "../components/common/dateSelect";
import { FilterGroup } from "../components/common/FilterGroup";
import { Dayjs } from "dayjs";
import { useDebounce } from "../hooks/useDebounce";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { StatusSelect } from "../components/common/statusSelect";
import orderService from "../api/services/order.service";
import { ExportModal } from "../components/modals/export-modal";
type UserTableType = {
  id: any;
  name: string;
  type: string;
  details: string;
  date: Date | string;
  status: string;
};

const rows = (): UserTableType[] => {
  const statuses = ["Pending", "Processed", "Returned", "Cancelled"];
  const data: UserTableType[] = Array.from({ length: 15 }, (_, i) => ({
    id: "100" + (i + 1),
    name: "Rosemary Sunday",
    type: "House",
    details: "3-bedroom house in Ikeja",
    date: new Date().toUTCString(),
    status: statuses[i % 4], // Randomly assign status
  }));
  return data;
};

const chartData = () => {
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const returnArray = monthArray.map((item) => {
    return { name: item, earnings: generateRandomNumber(900000, 100000) };
  });

  return returnArray;
};

export type IFilter = {
  type: string;
  status: string;
  date: Dayjs | null;
  modified: Dayjs | null;
};

export default function Orders() {
  const [exportModal, setExportModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const [selectedData, setSelectedData] = useState<UserTableType[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);

  const [filters, setFilters] = useState<IFilter>({
    type: "",
    status: "",
    date: null,
    modified: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const handleTableSelectionChange = (newSelection: UserTableType[]) => {
    setSelectedData(newSelection);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation(); // Prevents bubbling
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  function openExportModal() {
    setExportModal(true);
  }

  function closeExportModal() {
    setExportModal(false);
  }

  const columns: GridColDef[] = [
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
        return (
          <div className="h-full w-full relative z-10 flex justify-center items-center overflow-visible">
            <button
              aria-describedby={id}
              type="button"
              onClick={(e) => handleClick(e)}
              className="cursor-pointer bg-transparent border-none p-0 m-0"
              style={{ lineHeight: 0 }}
            >
              <BsThreeDots size={16} />
            </button>
            <Popper
              ref={dotsPopupRef}
              className="p-3 text-sm z-10 flex gap-x-4 items-center rounded-lg border border-primaryBorder bg-white"
              id={id}
              open={open}
              anchorEl={anchorEl}
            >
              <Link
                className="text-xs text-[#C38D00] hover:underline"
                to={`/orders/order/${row.id}`}
                state={
                  row.status === "Processed" ? { isProcessed: true } : null
                }
              >
                View
              </Link>
              {row.status === "Pending" && (
                <>
                  <button className="text-xs p-1 px-1.5 rounded-lg bg-[#E5FFE5] text-[#008000] hover:underline">
                    Process
                  </button>
                  <button className="text-xs p-1 px-1.5 rounded-lg bg-[#FFB8B8] text-[#FF0000] hover:underline">
                    Cancel
                  </button>
                </>
              )}
              {row.status === "Returned" && (
                <button className="text-xs p-1 px-1.5 rounded-lg bg-[#FFB8B8] text-[#FF0000] hover:underline">
                  Cancel
                </button>
              )}
            </Popper>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await orderService.getAllOrderShipments();
      console.log("Orders:", response.data.data);
      // setRows(response.data.data);
    };
    fetchOrders();
  }, []);

  // useEffect(() => {
  //   const normalizedQuery = debouncedSearchQuery.toLowerCase();

  //   const filtered = allRows.filter((row) => {

  //     // Search filter (e.g., match against name or details)
  //     const searchMatch =
  //       row.name.toLowerCase().includes(normalizedQuery) ||
  //       row.details.toLowerCase().includes(normalizedQuery);

  //     // Custom filters
  //     const categoryMatch = filters.category ? row.category === filters.category : true;
  //     const statusMatch = filters.status ? row.status === filters.status : true;
  //     const dateMatch = filters.date
  //       ? row.date.startsWith(filters.date.toISOString().slice(0, 10))
  //       : true;

  //     // Combine
  //     return dateMatch && searchMatch && categoryMatch && statusMatch;
  //   });

  // }, [filters, debouncedSearchQuery]);

  return (
    <div className="w-full h-full bg-white overflow-y-auto flex flex-col custom-scrollbar py-20">
      <ExportModal
        isOpen={exportModal}
        onClose={closeExportModal}
        allData={rows()}
        selectedData={selectedData}
        filename="orders-data"
      />
      <div className="w-full py-3.5 px-5 md:px-10 fixed z-10 left-2 top-0 border-b bg-white  border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-5 md:px-10 w-full mt-3 flex flex-col flex-1">
        <div className="flex gap-x-4 mb-3 items-center">
          <Link to={`/`} className="text-sm opacity-60">
            Dashboard
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Orders</span>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-start">
            Orders{" "}
            <span className="text-xs text-defaultOrange">{rows().length}</span>
          </h1>

          <div className="flex items-center gap-x-5">
            <button
              onClick={() => setShowAnalytics((prev) => !prev)}
              className="text-sm hidden md:block rounded-lg p-2 md:px-4 md:py-2.5 bg-[#FFF4EE] text-defaultOrange"
            >
              {!showAnalytics ? (
                <div className="flex gap-x-2 items-center">
                  <FaRegEye color="#e65800" /> <span>Show Analytics</span>
                </div>
              ) : (
                <div className="flex gap-x-2 items-center">
                  <FaRegEyeSlash color="#e65800" />
                  <span>Hide Analytics</span>
                </div>
              )}
            </button>
            <button
              onClick={openExportModal}
              className="text-sm flex  gap-3 rounded-lg px-4 py-2.5 bg-defaultOrange hover:bg-defaultOrangeHover text-white"
            >
              <FaFileDownload size={18} /> Export
            </button>
          </div>
        </div>

        <div className="w-full flex justify-between items-end pb-3 mt-4 border-b border-b-primaryBorder">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2">
              <PiCoinVerticalDuotone size={22} color="#686677" />
              <span className="text-xs text-[#686677]">Total earnings</span>
            </div>
            <div className="flex items-baseline gap-x-2">
              <span className="text-3xl text-defaultOrange font-semibold">
                $450,000
              </span>
              <span className="text-xs text-[#686677]">+5,300 this week</span>
            </div>
          </div>

          {showAnalytics && <LineAreaChart width="45%" data={chartData()} />}
        </div>

        {/* Filters & Search Bar */}
        <div className="mb-4">
          <FilterGroup
            filters={filters}
            onChange={(updated) => {
              setFilters((prev) => ({ ...prev, ...updated }));
            }}
            selects={[
              {
                name: "type",
                placeholder: "Category",
                options: [
                  { label: "House", value: "house" },
                  { label: "Cars", value: "cars" },
                  { label: "Land", value: "land" },
                ],
              },
            ]}
            extraFilters={
              <>
                <StatusSelect
                  options={[
                    { label: "Published", value: "published" },
                    { label: "Pending", value: "pending" },
                    { label: "Cancelled", value: "cancelled" },
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

        <div className="mt-3 flex flex-1 w-full min-h-[500px] overflow-hidden">
          <MuiTableComponent
            columns={columns}
            showCheckbox={true}
            rows={rows()}
            onSelect={handleTableSelectionChange}
            paginationActive={true}
            rowHeight={60}
            pageSize={10}
          />
        </div>
      </div>
    </div>
  );
}
