import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaPlus } from "react-icons/fa6";
import MuiTableComponent from "../components/table/TableComponent";
import { GridRowParams } from "@mui/x-data-grid";
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
import { formatIsoString } from "../helper/formatIIsoString";

type IFilter = {
  status: string;
  // date: Dayjs | null;
};
type SelectedSellerData = {
  "Seller Id": number;
  "Seller Name": string;
  Email: string;
  created_at: string;
  updated_at: string;
};

export default function Sellers() {
  const navigate = useNavigate();
  const [exportModal, setExportModal] = useState(false);
  const [selectedData, setSelectedData] = useState<SelectedSellerData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [filters, setFilters] = useState<IFilter>({
    status: "",
  });

  // const formatedDate = formatDayJs(filters.date);
  const [sellersData, setSellersData] = usePaginatedData(
    UserService.getAllSellers,
    {
      initialPage: 1,
      initialPageSize: 10,
      filters: {
        status: filters.status,
        search: debouncedSearchQuery,
      },
      dataName: "sellers",
    }
  );

  const handleRowClick = (params: GridRowParams) => {
    console.log("Row clicked:", params.row);
    navigate(`/admin/sellers/seller/${params.row.id}`);
  };

  const handleTableSelectionChange = (newSelection: ApiUser[]) => {
    const formatedData = newSelection.map((item) => ({
      ["Seller Id"]: item.id,
      ["Seller Name"]: item.name,
      ["Email"]: item.email,
      created_at: formatIsoString(item.created_at).formattedDate,
      updated_at: formatIsoString(item.updated_at).formattedDate,
    }));
    setSelectedData(formatedData);
  };

  return (
    <div className="w-full h-full  overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
      <ExportModal
        isOpen={exportModal}
        onClose={() => setExportModal(false)}
        allData={(sellersData.rows as ApiUser[]).map((item) => ({
          ["Seller Id"]: item.id,
          ["Seller Name"]: item.name,
          ["Email"]: item.email,
          created_at: formatIsoString(item.created_at).formattedDate,
          updated_at: formatIsoString(item.updated_at).formattedDate,
        }))}
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
              className="flex gap-x-1 md:gap-x-3 items-center rounded-lg px-3 md:px-5 py-1.5 md:py-3  text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
            >
              Export
            </button>
            {/* <Link
              to={`/admin/sellers/add-seller`}
              className="flex gap-x-1 md:gap-x-3 items-center rounded-lg px-3 md:px-5 py-1.5 md:py-3  text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
            >
              <FaPlus size={20} />
              Add seller
            </Link> */}
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex justify-end mt-4 gap-x-3">
          {/* <FilterGroup
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
          /> */}
          <TableSearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search sellers"
          />
        </div>

        <section
          id="sellers-table"
          className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
        >
          <div className="min-w-[900px]">
            <MuiTableComponent
              columns={sellerColumns}
              showCheckbox={true}
              rows={sellersData.rows}
              onRowClick={handleRowClick}
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
