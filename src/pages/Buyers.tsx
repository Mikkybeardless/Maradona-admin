import { Link, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import MuiTableComponent from "../components/table/TableComponent";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { formatPrice } from "../helper/helperFunctions";
import { useState } from "react";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { DateSelect } from "../components/common/dateSelect";
import { FilterGroup } from "../components/common/FilterGroup";
import { useDebounce } from "../hooks/useDebounce";
import { Dayjs } from "dayjs";
import { ExportModal } from "../components/modals/export-modal";
import { FaPlus } from "react-icons/fa6";
import formatDayJs from "../helper/formatDateJs";
import UserService from "../api/services/userMgt.service";
import { usePaginatedData } from "../hooks/usePaginatedData";
import { BuyerColumns } from "../components/table/columns";

type UserTableType = {
  id: any;
  name: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: number;
  status: string;
};

// const rows = (): UserTableType[] => {
//   const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
//   const returnArray: UserTableType[] = [];
//   loopArray.forEach((num) => {
//     returnArray.push({
//       id: num,
//       name: "Rosemary Sunday",
//       phone: "07071234323",
//       location: "Lugbe Abuja",
//       orders: 22,
//       totalSpent: 100000,
//       status: "Active",
//     });
//   });
//   return returnArray;
// };

type IFilter = {
  status: string;
  date: Dayjs | null;
};

export default function Buyers() {
  const navigate = useNavigate();
  const [exportModal, setExportModal] = useState(false);
  const [selectedData, setSelectedData] = useState<UserTableType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [filters, setFilters] = useState<IFilter>({
    status: "",
    date: null,
  });

  const formatedDate = formatDayJs(filters.date);
  const [buyersData, setBuyersData] = usePaginatedData(
    UserService.getAllBuyers,
    {
      initialPage: 1,
      initialPageSize: 10,
      filters: {
        status: filters.status,
        date: formatedDate,
        created_at: formatedDate,
        search: debouncedSearchQuery,
      },
      dataName: "buyers",
    }
  );

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/admin/buyers/buyer/:${params.row.id}`);
  };
  const handleTableSelectionChange = (newSelection: UserTableType[]) => {
    setSelectedData(newSelection);
  };

  return (
    <section className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
      <ExportModal
        isOpen={exportModal}
        onClose={() => setExportModal(false)}
        allData={buyersData.rows}
        // currentPageData={currentPageData}
        selectedData={selectedData}
        filename="buyers-data"
      />
      <div className="w-full py-5  px-5 md:px-10 border-b bg-white border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
        <div className="flex justify-between items-center mt-1">
          <h1 className="text-3xl font-bold flex items-start">
            Buyers
            <span className="text-xs text-defaultOrange">
              {buyersData.totalRowCount}
            </span>
          </h1>

          <div className="flex items-center gap-x-5">
            <button
              onClick={() => setExportModal(true)}
              className="text-sm hover:underline text-defaultOrange"
            >
              Export
            </button>
            <Link
              to={`/admin/buyers/add-buyer`}
              className="flex gap-x-1 md:gap-x-3 items-center rounded-lg px-3 md:px-5 py-1.5 md:py-3  text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
            >
              <FaPlus size={20} /> Add buyer
            </Link>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <section id="buyers-filters" className="">
          <FilterGroup
            filters={filters}
            onChange={(updated) => {
              setFilters((prev) => ({ ...prev, ...updated }));
            }}
            selects={[
              {
                name: "status",
                placeholder: "Status",
                options: [
                  { label: "Pending", value: "pending" },
                  { label: "Processed", value: "processed" },
                  { label: "Cancelled", value: "cancelled" },
                  { label: "Returned", value: "returned" },
                ],
              },
            ]}
            extraFilters={
              <>
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
        </section>

        <section
          id="buyers-table"
          className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
        >
          <div className="min-w-[900px]">
            <MuiTableComponent
              columns={BuyerColumns}
              rows={buyersData.rows}
              onRowClick={handleRowClick}
              showCheckbox={true}
              onSelect={handleTableSelectionChange}
              rowHeight={60}
              loading={buyersData.loading}
              currentPage={buyersData.pagination.page}
              totalRowCount={buyersData.totalRowCount}
              onPageChange={(model) => {
                setBuyersData((prev) => ({
                  ...prev,
                  pagination: {
                    page: model.page,
                    pageSize: model.pageSize,
                  },
                }));
              }}
              pageSize={buyersData.pagination.pageSize}
            />
          </div>
        </section>
      </div>
    </section>
  );
}
