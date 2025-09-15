import { useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import MuiTableComponent from "../components/table/TableComponent";
import { GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { DateSelect } from "../components/common/dateSelect";
import { FilterGroup } from "../components/common/FilterGroup";
import { useDebounce } from "../hooks/useDebounce";
import { Dayjs } from "dayjs";
import { ExportModal } from "../components/modals/export-modal";
import formatDayJs from "../helper/formatDateJs";
import UserService from "../api/services/userMgt.service";
import { usePaginatedData } from "../hooks/usePaginatedData";
import { BuyerColumns } from "../components/table/columns";
// import formatDateToYYYYMMDD from "../helper/formatDate";
import { formatIsoString } from "../helper/formatIIsoString";

type IFilter = {
  status: string;
  date: Dayjs | null;
};
type SelectedBuyerData = {
  "Buyer Id": number;
  "Buyer Name": string;
  Email: string;
  created_at: string;
  updated_at: string;
};

export default function Buyers() {
  const navigate = useNavigate();
  const [exportModal, setExportModal] = useState(false);
  const [selectedData, setSelectedData] = useState<SelectedBuyerData[]>([]);
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
    navigate(`/admin/buyers/buyer/${params.row.id}`);
  };
  const handleTableSelectionChange = (newSelection: ApiUser[]) => {
    const formatedData = newSelection.map((item) => ({
      ["Buyer Id"]: item.id,
      ["Buyer Name"]: item.name,
      ["Email"]: item.email,
      created_at: formatIsoString(item.created_at).formattedDate,
      updated_at: formatIsoString(item.updated_at).formattedDate,
    }));
    setSelectedData(formatedData);
  };

  return (
    <section className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
      <ExportModal
        isOpen={exportModal}
        onClose={() => setExportModal(false)}
        allData={(buyersData.rows as ApiUser[]).map((item) => ({
          ["Buyer Id"]: item.id,
          ["Buyer Name"]: item.name,
          ["Email"]: item.email,
          ["created At"]: formatIsoString(item.created_at).formattedDate,
          ["updated At"]: formatIsoString(item.updated_at).formattedDate,
        }))}
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
              className="flex gap-x-1 md:gap-x-3 items-center rounded-lg px-3 md:px-5 py-1.5 md:py-3  text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
            >
              Export
            </button>
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
