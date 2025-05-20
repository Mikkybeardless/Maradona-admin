import { FaChevronRight, FaCircleCheck } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { BsEnvelopeOpenFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { useState } from "react";
import MuiTableComponent from "../components/TableComponent";
import { CiSearch } from "react-icons/ci";
import { HiSortDescending } from "react-icons/hi";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";

const rows = (): any[] => {
  const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const returnArray: any[] = [];
  loopArray.forEach((num) => {
    returnArray.push({
      id: num,
      name: "Rosemary Sunday",
      ticketId: "DSFA" + num,
      date: "July 1st, 2024  |  2pm",
      subject: "Refund not received",
      status: num % 2 === 0 ? "Active" : "Inactive",
    });
  });
  return returnArray;
};

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "User name",
    flex: 0.5,
    sortable: false,
  },
  { field: "ticketId", headerName: "Ticket ID", flex: 0.4, sortable: false },
  {
    field: "date",
    headerName: "Date Created",
    flex: 0.5,
    sortable: false,
  },
  { field: "subject", headerName: "Subject", flex: 1, sortable: false },
  {
    field: "status",
    headerName: "Status",
    renderCell: ({ value }) => {
      return (
        <span
          className={`${
            value === "Active" ? "text-[#0C560B]" : "text-[#DC1313]"
          }`}
        >
          {value}
        </span>
      );
    },
    flex: 0.5,
    sortable: false,
  },
];

export default function CustomerCare() {
  const [requestType, setRequestType] = useState<
    "refund" | "return" | "others"
  >("refund");

  const navigate = useNavigate();

  const handleRowClick = (params: GridRowParams) => {
    console.log("Row clicked:", params.row);
    navigate(`/customer-care/ticket/${params.row.id}`);
  };

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar py-20 bg-[#F5F5F5]">
      <div className="w-full py-5 px-5 md:pl-[250px] md:pr-[100px] fixed z-10 left-10 top-0 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className=" px-5 md:px-10 w-full mt-4 flex flex-col gap-y-5">
        <div className="flex gap-x-4 items-center">
          <Link to={`/`} className="text-sm opacity-60">
            Dashboard
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Customer Care</span>
        </div>

        <h1 className="text-3xl  flex font-bold">
          Customer Care Center{" "}
          <span className="text-defaultOrange font-light text-sm">100</span>
        </h1>

        <div className="w-full md:h-[7rem] grid grid-col-1 md:grid-cols-3 gap-y-5 gap-x-10 mt-8">
          <div className="w-full h-full bg-[#E9C50533] p-5 pl-7 space-y-3  text-sm rounded-2xl border border-primaryBorder">
            <div className="flex items-center gap-x-3">
              <div className="text-white p-2 rounded-full  bg-[#D7B813]">
                <BsEnvelopeOpenFill size={24} />
              </div>

              <span className="text-2xl font-bold">10</span>
            </div>
            <p className="font-medium  text-[#425166]">Open Tickets</p>
          </div>

          <div className="w-full h-full bg-[#00800033]  p-5 pl-7 space-y-3  text-sm rounded-2xl border border-primaryBorder">
            <div className="flex items-center gap-x-3">
              <div className="text-white p-2 rounded-full bg-[#008000]">
                <FaCircleCheck size={24} />
              </div>

              <span className="text-2xl font-bold">5</span>
            </div>
            <p className="font-medium  text-[#425166]">Resolved Tickets</p>
          </div>

          <div className="w-full h-full bg-[#FF000033] p-5 pl-7 space-y-3  text-sm rounded-2xl border border-primaryBorder">
            <div className="flex items-center gap-x-3">
              <div className="text-white p-2 rounded-full bg-[#FF0000]">
                <RiErrorWarningFill size={24} />
              </div>

              <span className="text-2xl font-bold">4</span>
            </div>
            <p className="font-medium  text-[#150A13]">Top Issue Category</p>
          </div>
        </div>

        <div className=" w-full md:w-fit flex gap-x-6 items-center mt-3 text-sm border-b border-b-primaryBorder">
          <button
            className={`${
              requestType === "refund"
                ? "border-b-[3px] border-b-defaultOrange"
                : "text-[#585858]"
            } py-3`}
            onClick={() =>
              requestType !== "refund" ? setRequestType("refund") : null
            }
          >
            Refunds <span className="text-xs text-defaultOrange">10</span>
          </button>
          <button
            className={`${
              requestType === "return"
                ? "border-b-[3px] border-b-defaultOrange"
                : "text-[#585858]"
            } py-3`}
            onClick={() =>
              requestType !== "return" ? setRequestType("return") : null
            }
          >
            Return Requests{" "}
            <span className="text-xs text-defaultOrange">23</span>
          </button>

          <button
            className={`${
              requestType === "others"
                ? "border-b-[3px] border-b-defaultOrange"
                : "text-[#585858]"
            } py-3`}
            onClick={() => requestType !== "others" && setRequestType("others")}
          >
            Others <span className="text-xs text-defaultOrange">10</span>
          </button>
        </div>

        {requestType === "refund" ? (
          // Refunds
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-wrap gap-2 justify-between items-end mt-5 w-full">
              <div className="flex gap-x-5 items-center">
                <div className="flex flex-col gap-y-1">
                  <div className="px-2.5 relative flex items-center gap-x-1 rounded-lg border border-primaryBorder bg-white">
                    <HiSortDescending />
                    <select
                      id="selectSort"
                      // value={selects.status}
                      name="status"
                      // onChange={handleSelectChange}
                      className="text-sm outline-none h-full py-2.5"
                    >
                      <option value="">Sort by Status</option>
                    </select>
                  </div>
                </div>
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

            <div className="mt-3 flex flex-1 w-full min-h-[400px] bg-white">
              <MuiTableComponent
                showCheckbox={true}
                columns={columns}
                onRowClick={handleRowClick}
                rows={rows()}
                paginationActive={true}
                rowHeight={60}
                pageSize={10}
              />
            </div>
          </div>
        ) : requestType === "return" ? (
          // Return Requests
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-wrap gap-2 justify-between items-end mt-5 w-full">
              <div className="flex gap-x-5 items-center">
                <div className="flex flex-col gap-y-1">
                  <div className="px-2.5 relative flex items-center gap-x-1 rounded-lg border border-primaryBorder bg-white">
                    <HiSortDescending />
                    <select
                      id="selectSort"
                      // value={selects.status}
                      name="status"
                      // onChange={handleSelectChange}
                      className="text-sm outline-none h-full py-2.5"
                    >
                      <option value="">Sort by Status</option>
                    </select>
                  </div>
                </div>
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

            <div className="mt-3 flex flex-1 w-full min-h-[400px] bg-white">
              <MuiTableComponent
                showCheckbox={true}
                columns={columns}
                // onRowClick={handleRowClick}
                rows={rows()}
                paginationActive={true}
                rowHeight={60}
                pageSize={10}
              />
            </div>
          </div>
        ) : (
          // others
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-wrap gap-2 justify-between items-end mt-5 w-full">
              <div className="flex gap-x-5 items-center">
                <div className="flex flex-col gap-y-1">
                  <div className="px-2.5 relative flex items-center gap-x-1 rounded-lg border border-primaryBorder bg-white">
                    <HiSortDescending />
                    <select
                      id="selectSort"
                      // value={selects.status}
                      name="status"
                      // onChange={handleSelectChange}
                      className="text-sm outline-none h-full py-2.5"
                    >
                      <option value="">Sort by Status</option>
                    </select>
                  </div>
                </div>
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

            <div className="mt-3 flex  flex-1 w-full min-h-[400px] bg-white">
              <MuiTableComponent
                showCheckbox={true}
                columns={columns}
                // onRowClick={handleRowClick}
                rows={rows()}
                paginationActive={true}
                rowHeight={60}
                pageSize={10}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
