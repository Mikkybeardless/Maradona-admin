import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaPlus, FaRegEye } from "react-icons/fa6";
import { HiSortDescending } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import MuiTableComponent from "../components/TableComponent";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { formatPrice } from "../helper/helperFunctions";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import SelectInputCom from "../components/common/muiSelect";
import { SelectChangeEvent } from "@mui/material";

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

export default function Sellers() {
  const location = useLocation();
  const { pathname } = location;
  const [exportModal, setExportModal] = useState(false);
  const exportModalRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();

  const handleIdChange = (
    event: SelectChangeEvent<string | string[]>,
    _child: React.ReactNode
  ) => {
    const value = event.target.value;
    setSelectedId(Array.isArray(value) ? value[0] : value);
  };

  const handleStatusChange = (
    event: SelectChangeEvent<string | string[]>,
    _child: React.ReactNode
  ) => {
    const value = event.target.value;
    setSelectedStatus(Array.isArray(value) ? value[0] : value);
  };
  const idOptions = [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
    { label: "Option C", value: "C" },
  ];

  const statusOptions = [
    { label: "Option A", value: "Active" },
    { label: "Option B", value: "Inactive" },
    { label: "Option C", value: "Busy" },
  ];

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
    navigate(`/sellers/seller`);
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
      <div className="w-full py-5 px-5 md:px-10 border-b border-b-primaryBorder">
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
              to={`/sellers/add-seller`}
              className="flex gap-x-3 items-center rounded-lg px-5 py-3 text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
            >
              <FaPlus size={20} />
              Add seller
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-y-1 justify-between items-end mt-5 w-full">
          <div className="flex gap-x-5 items-center">
            <SelectInputCom
              options={idOptions}
              label="ID"
              value={selectedId}
              onChange={handleIdChange}
            />

            <SelectInputCom
              options={statusOptions}
              label="Status"
              value={selectedStatus}
              onChange={handleStatusChange}
            />
          </div>

          <div className="flex gap-x-2 px-3 basis-[25%] rounded-lg border border-primaryBorder">
            <CiSearch className="h-fit w-fit my-auto" size={24} />
            <input
              className="flex-1 py-2.5 outline-none border-none text-sm bg-transparent"
              placeholder="Search"
              type="text"
            />
          </div>
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
