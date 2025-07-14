import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import MuiTableComponent from "../components/TableComponent";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { formatPrice } from "../helper/helperFunctions";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import SelectInputCom from "../components/common/muiSelect";
import { SelectChangeEvent } from "@mui/material";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { DateSelect } from "../components/common/dateSelect";
import { FilterGroup } from "../components/common/FilterGroup";
import { useDebounce } from "../hooks/useDebounce";
import { Dayjs } from "dayjs";

type UserTableType = {
  id: any;
  name: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: number;
  status: string;
};

const rows = (): UserTableType[] => {
  const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const returnArray: UserTableType[] = [];
  loopArray.forEach((num) => {
    returnArray.push({
      id: num,
      name: "Rosemary Sunday",
      phone: "07071234323",
      location: "Lugbe Abuja",
      orders: 22,
      totalSpent: 100000,
      status: "Active",
    });
  });
  return returnArray;
};

type IFilter = {
  status: string;
  date: Dayjs | null;
};

export default function Sellers() {
  const location = useLocation();
  const { pathname } = location;
  const [exportModal, setExportModal] = useState(false);
  const exportModalRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [filters, setFilters] = useState<IFilter>({
    status: "",
    date: null,
  });

  const navigate = useNavigate();

  useClickAway(exportModalRef, () => {
    setExportModal(false);
  });

  function openExportModal() {
    setExportModal(true);
  }

  function closeExportModal() {
    setExportModal(false);
  }

  const handleRowClick = (params: GridRowParams) => {
    console.log("Row clicked:", params.row);
    navigate(`/admin/sellers/seller`);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Customer name", flex: 1 },
    { field: "id", headerName: "ID", flex: 0.2, sortable: false },
    { field: "phone", headerName: "Phone", flex: 1, sortable: false },
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
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
      {exportModal ? (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
          <div
            ref={exportModalRef}
            className="w-[30%] rounded-[24px] flex flex-col p-8 bg-white"
          >
            <h2 className="text-2xl font-bold">Export Products</h2>
            <h6 className="font-medium mt-5">Export</h6>
            <div className="flex flex-col gap-y-2 mt-2">
              <div className="flex gap-x-3 items-center text-sm">
                <input type="radio" name="export-select" id="export-select1" />
                <label htmlFor="export-select1" className="opacity-70">
                  Current page
                </label>
              </div>
              <div className="flex gap-x-3 items-center text-sm">
                <input type="radio" name="export-select" id="export-select2" />
                <label htmlFor="export-select2" className="opacity-70">
                  All products
                </label>
              </div>
              <div className="flex gap-x-3 items-center text-sm">
                <input type="radio" name="export-select" id="export-select3" />
                <label htmlFor="export-select3" className="opacity-70">
                  Selection(0 products selected)
                </label>
              </div>
            </div>
            <h6 className="font-medium mt-5">Export As</h6>
            <div className="flex flex-col gap-y-2 mt-2">
              <div className="flex gap-x-3 items-center text-sm">
                <input type="radio" name="export-as" id="export-as1" />
                <label htmlFor="export-as1" className="opacity-70">
                  CSV
                </label>
              </div>
              <div className="flex gap-x-3 items-center text-sm">
                <input type="radio" name="export-as" id="export-as2" />
                <label htmlFor="export-as2" className="opacity-70">
                  PDF
                </label>
              </div>
              <div className="flex gap-x-3 items-center text-sm">
                <input type="radio" name="export-as" id="export-as3" />
                <label htmlFor="export-as3" className="opacity-70">
                  Plain Text
                </label>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-end gap-x-3 text-sm">
              <button
                onClick={closeExportModal}
                className="rounded-lg hover:underline"
              >
                Cancel
              </button>
              <button className="px-5 py-3 rounded-lg text-white bg-defaultOrange">
                Export
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-full py-5 px-5 md:px-10 border-b bg-white border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
        <div className="flex justify-between items-center mt-1">
          <h1 className="text-3xl font-bold flex items-start">
            Sellers
            <span className="text-xs text-defaultOrange">{rows().length}</span>
          </h1>

          <div className="flex items-center gap-x-5">
            <button
              onClick={openExportModal}
              className="text-sm hover:underline text-defaultOrange"
            >
              Export
            </button>
            <Link
              to={`/admin/sellers/add-seller`}
              className="flex gap-x-3 items-center rounded-lg px-5 py-3 text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
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

        <div className="mt-3 flex flex-1 w-full overflow-hidden bg-white">
          <MuiTableComponent
            columns={columns}
            rows={rows()}
            onRowClick={handleRowClick}
            paginationActive={true}
            rowHeight={60}
            pageSize={10}
          />
        </div>
      </div>
    </div>
  );
}
