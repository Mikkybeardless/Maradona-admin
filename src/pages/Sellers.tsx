import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaPlus } from "react-icons/fa6";
import MuiTableComponent from "../components/table/TableComponent";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { formatPrice } from "../helper/helperFunctions";
import { useState } from "react";
// import { useClickAway } from "react-use";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { DateSelect } from "../components/common/dateSelect";
import { FilterGroup } from "../components/common/FilterGroup";
import { useDebounce } from "../hooks/useDebounce";
import { Dayjs } from "dayjs";
import { ExportModal } from "../components/modals/export-modal";
// import { toast } from "react-toastify";
import formatDayJs from "../helper/formatDateJs";
import UserService from "../api/services/userMgt.service";
import { usePaginatedData } from "../hooks/usePaginatedData";
import { sellerColumns } from "../components/table/columns";

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

export default function Sellers() {
  const location = useLocation();
  const { pathname } = location;
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
  const [sellersData, setSellersData] = usePaginatedData(
    UserService.getAllSellers,
    {
      initialPage: 1,
      initialPageSize: 10,
      filters: {
        status: filters.status,
        date: formatedDate,
        created_at: formatedDate,
        search: debouncedSearchQuery,
      },
      dataName: "sellers",
    }
  );

  const handleRowClick = (params: GridRowParams) => {
    console.log("Row clicked:", params.row);
    navigate(`/admin/sellers/seller/${params.row.id}`);
  };

  // const columns: GridColDef[] = [
  //   { field: "name", headerName: "Customer name", flex: 1 },
  //   { field: "id", headerName: "ID", flex: 0.2, sortable: false },
  //   { field: "phone", headerName: "Phone", flex: 1, sortable: false },
  //   { field: "email", headerName: "Email", flex: 1, sortable: false },
  //   { field: "location", headerName: "Location", flex: 1, sortable: false },
  //   { field: "orders", headerName: "Order(s)" },
  //   {
  //     field: "totalSpent",
  //     headerName: "Total Spent",
  //     flex: 0.8,
  //     renderCell: ({ row }) => (
  //       <span className="">₦{formatPrice(row.totalSpent)}</span>
  //     ),
  //   },
  //   { field: "status", headerName: "Status", sortable: false },
  // ];
  const handleTableSelectionChange = (newSelection: UserTableType[]) => {
    setSelectedData(newSelection);
  };

  return (
    <div className="w-full h-full  overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
      <ExportModal
        isOpen={exportModal}
        onClose={() => setExportModal(false)}
        allData={sellersData.rows}
        // currentPageData={currentPageData}
        selectedData={selectedData}
        filename="sellers-data"
      />
      <div className="w-full py-5 px-5 md:px-10 border-b bg-white border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <main className="px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
        <div className="flex justify-between items-center mt-1">
          <h1 className="text-3xl font-bold flex items-start">
            Sellers
            <span className="text-xs text-defaultOrange">
              {sellersData.totalRowCount}
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
              to={`/admin/sellers/add-seller`}
              className="flex gap-x-1 md:gap-x-3 items-center rounded-lg px-3 md:px-5 py-1.5 md:py-3  text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
            >
              <FaPlus size={20} />
              Add seller
            </Link>
          </div>
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
                placeholder="Search sellers"
              />
            }
          />
        </div>

        <section
          id="sellers-table"
          className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
        >
          <div className="min-w-[900px]">
            <MuiTableComponent
              columns={sellerColumns}
              rows={sellersData.rows}
              onRowClick={handleRowClick}
              showCheckbox={true}
              onSelect={handleTableSelectionChange}
              rowHeight={60}
              loading={sellersData.loading}
              currentPage={sellersData.pagination.page}
              totalRowCount={sellersData.totalRowCount}
              onPageChange={(model) => {
                setSellersData((prev) => ({
                  ...prev,
                  pagination: {
                    page: model.page,
                    pageSize: model.pageSize,
                  },
                }));
              }}
              pageSize={sellersData.pagination.pageSize}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
