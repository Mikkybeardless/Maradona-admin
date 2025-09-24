import { FaChevronRight, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { PiCoinVerticalDuotone } from "react-icons/pi";
import MuiTableComponent from "../components/table/TableComponent";
import { Link, useNavigate } from "react-router-dom";
import {
  formatAmountToNaira,
  generateRandomNumber,
} from "../helper/helperFunctions";
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
import { ExportModal } from "../components/modals/export-modal";
import { usePaginatedData } from "../hooks/usePaginatedData";
import formatDayJs from "../helper/formatDateJs";
import purchaseEnquiriesService from "../api/services/purchaseEnquiries.service";
import { purchaseEnqColumns } from "../components/table/columns";
import statsService from "../api/services/stats.service";
type UserTableType = {
  id: any;
  name: string;
  type: string;
  details: string;
  date: Date | string;
  status: string;
};

// const rows = (): UserTableType[] => {
//   const statuses = ["Pending", "Processed", "Returned", "Cancelled"];
//   const data: UserTableType[] = Array.from({ length: 15 }, (_, i) => ({
//     id: "100" + (i + 1),
//     name: "Rosemary Sunday",
//     type: "House",
//     details: "3-bedroom house in Ikeja",
//     date: new Date().toUTCString(),
//     status: statuses[i % 4], // Randomly assign status
//   }));
//   return data;
// };

// const chartData = () => {
//   const monthArray = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const returnArray = monthArray.map((item) => {
//     return { name: item, earnings: generateRandomNumber(900000, 100000) };
//   });

//   return returnArray;
// };

export type IFilter = {
  type: string;
  status: string;
  date: Dayjs | null;
  modified: Dayjs | null;
};

export default function Orders() {
  const [exportModal, setExportModal] = useState(false);
  const [selectedData, setSelectedData] = useState<UserTableType[]>([]);
  const [revenueData, setRevenueData] = useState<TotalRevenue | null>(null);
  const [filters, setFilters] = useState<IFilter>({
    type: "",
    status: "",
    date: null,
    modified: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const navigate = useNavigate();
  const formatedDate = formatDayJs(filters.date);
  const [purchaseEnquiries, setPurchaseEnquiries] = usePaginatedData(
    purchaseEnquiriesService.getPurchaseEnquiries,
    {
      initialPage: 1,
      initialPageSize: 10,
      filters: {
        status: filters.status,
        type: filters.type,
        created_at: formatedDate,
        search: debouncedSearchQuery,
      },
      dataName: "purchase Enquiries",
    }
  );
  const handleTableSelectionChange = (newSelection: UserTableType[]) => {
    setSelectedData(newSelection);
  };

  function openExportModal() {
    setExportModal(true);
  }

  function closeExportModal() {
    setExportModal(false);
  }
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await statsService.getTotalRevenue();
        setRevenueData(response.data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <div className="w-full h-full bg-white overflow-y-auto flex flex-col custom-scrollbar py-20">
      <ExportModal
        isOpen={exportModal}
        onClose={closeExportModal}
        allData={purchaseEnquiries.rows}
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
          <span className="text-sm">Purchase Enquiries</span>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="md:text-3xl font-bold flex items-start">
            Purchase Enquiries
            <span className="text-xs text-defaultOrange">
              {purchaseEnquiries.rows.length}
            </span>
          </h1>

          <div className="flex items-center gap-x-5">
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
              <span className="text-xl md:text-3xl text-defaultOrange font-semibold">
                {formatAmountToNaira(revenueData?.total_revenue || 0)}
              </span>
              <span className="text-xs text-[#686677]">
                {revenueData?.period.description}
              </span>
            </div>
          </div>
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
                {/* <DateSelect
                  onChange={(date) => {
                    setFilters((prev) => ({ ...prev, date }));
                  }}
                  value={filters.date}
                /> */}
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

        <section
          id="orders-table"
          className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
        >
          <div className="min-w-[900px]">
            <MuiTableComponent
              columns={purchaseEnqColumns}
              showCheckbox={true}
              rows={purchaseEnquiries.rows}
              onRowClick={(row) => {
                navigate(`/admin/purchase-enquiries/enquiry/${row.id}`);
              }}
              onPageChange={(model) => {
                setPurchaseEnquiries((prev) => ({
                  ...prev,
                  pagination: {
                    page: model.page,
                    pageSize: model.pageSize,
                  },
                }));
              }}
              loading={purchaseEnquiries.loading}
              totalRowCount={purchaseEnquiries.totalRowCount}
              currentPage={purchaseEnquiries.pagination.page}
              onSelect={handleTableSelectionChange}
              rowHeight={60}
              pageSize={purchaseEnquiries.pagination.pageSize}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
