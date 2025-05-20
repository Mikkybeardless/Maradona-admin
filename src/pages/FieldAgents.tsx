import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { CiSearch } from "react-icons/ci";
import MuiTableComponent from "../components/TableComponent";
import { FaPlus } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbAward } from "react-icons/tb";
import { generateRandomNumber } from "../helper/helperFunctions";
import { IoCloudUploadOutline } from "react-icons/io5";
import { HiSortDescending } from "react-icons/hi";

const rows = (): any[] => {
  const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const returnArray: any[] = [];
  loopArray.forEach((num) => {
    returnArray.push({
      id: "DSFA" + num,
      name: "Rosemary Sunday",
      email: "rosemarys@gmail.com",
      phone: "07071234323",
      status: num % 2 === 0 ? "Active" : "Inactive",
      verifiedListings: 10,
    });
  });
  return returnArray;
};

const rows2 = (): any[] => {
  const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const returnArray: any[] = [];
  loopArray.forEach((num) => {
    returnArray.push({
      id: num,
      product: "Toyota Camry LE",
      category: "Car",
      price: `₦${generateRandomNumber(5000000, 1000000)}`,
      stock: 2,
    });
  });
  return returnArray;
};

export default function FieldAgents() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, state } = location;
  const locationAgentType: string = state?.fieldAgent;
  const [newAgentModal, setNewAgentModal] = useState(false);
  const [agentType, setAgentType] = useState(locationAgentType || "agent");
  const newAgentModalRef = useRef(null);

  useClickAway(newAgentModalRef, () => {
    setNewAgentModal(false);
  });

  function openNewAgentModal() {
    setNewAgentModal(true);
  }

  function closeNewAgentModal() {
    setNewAgentModal(false);
  }

  const handleRowClick = (params: GridRowParams) => {
    console.log("Row clicked:", params.row);
    navigate(`/agents/agent`);
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "Agent ID", flex: 0.4, sortable: false },
    {
      field: "name",
      headerName: "Customer name",
      flex: 1,
      sortable: false,
    },
    { field: "email", headerName: "Email", flex: 1, sortable: false },
    { field: "phone", headerName: "Phone", flex: 1, sortable: false },
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
    {
      field: "verifiedListings",
      headerName: "Verified Listings",
      flex: 0.5,
      sortable: false,
      renderCell: () => {
        return (
          <div className="h-full w-full relative flex justify-center items-center gap-x-0.5">
            <TbAward size={18} className="flex-shrink-0" />
            <span className="text-xs text-defaultOrange">10</span>
          </div>
        );
      },
    },
  ];

  const columns2: GridColDef[] = [
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      sortable: false,
    },
    { field: "category", headerName: "Category", flex: 1, sortable: false },
    { field: "price", headerName: "Price(₦)", flex: 1 },
    { field: "stock", headerName: "Stock", flex: 0.4, type: "number" },
    {
      field: "Action",
      headerName: "Action",
      renderCell: () => {
        return (
          <div className="h-full w-full relative flex justify-center items-center gap-x-4">
            <Link
              to="/agents/request"
              state={{ fieldAgent: true }}
              className="text-sm text-[#C38D00] hover:underline"
            >
              View
            </Link>
            <span className="text-sm text-green-600">Approve</span>
            <span className="text-sm text-red-500">Reject</span>
          </div>
        );
      },
      flex: 0.7,
      sortable: false,
    },
  ];

  const columns3: GridColDef[] = [
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      sortable: false,
    },
    { field: "category", headerName: "Category", flex: 1, sortable: false },
    { field: "price", headerName: "Price(₦)", flex: 1 },
    { field: "stock", headerName: "Stock", flex: 0.5, type: "number" },
    {
      field: "Action",
      headerName: "Action",
      renderCell: () => {
        return (
          <div className="h-full w-full relative flex justify-center items-center gap-x-4">
            <Link
              to="/agents/request"
              state={{ fieldAgent: true }}
              className="text-sm text-[#C38D00] hover:underline"
            >
              View
            </Link>
            <span className="text-sm text-green-800">Approve</span>
            <span className="text-sm text-red-500">Reject</span>
          </div>
        );
      },
      flex: 1,
      sortable: false,
    },
  ];
  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
      {newAgentModal ? (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
          <div
            ref={newAgentModalRef}
            className="w-[50%] h-[90%] rounded-[24px] flex flex-col p-8 bg-white"
          >
            <h2 className="text-2xl font-bold">Add New Agent</h2>
            <div className="w-full flex flex-col flex-1 gap-y-3.5 mt-2 overflow-y-auto custom-scrollbar-low-opacity">
              <div className="flex flex-col gap-y-2 text-sm">
                <label className="">Full Name:</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                  placeholder="Type"
                />
              </div>
              <div className="flex flex-col gap-y-2 text-sm">
                <label className="">Email:</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                  placeholder="Type"
                />
              </div>
              <div className="flex flex-col gap-y-2 text-sm">
                <label className="">Passowrd:</label>
                <input
                  type="password"
                  className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                  placeholder="Type"
                />
              </div>
              <div className="flex flex-col gap-y-2 text-sm">
                <label className="">Confirm Password:</label>
                <input
                  type="password"
                  className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                  placeholder="Type"
                />
              </div>
              <div className="flex flex-col gap-y-2 text-sm">
                <label className="">Phone Number:</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                  placeholder="Type"
                />
              </div>
              <div className="flex flex-col">
                <h6 className="text-sm">Identification Upload:</h6>
                <div className="w-full grid grid-cols-2 gap-x-4 mt-2">
                  <div className="w-full flex flex-col gap-y-2">
                    <p className="text-sm text-[#A3A3B3]">Upload Front</p>
                    <button className="w-full py-3.5 flex justify-center items-center gap-x-3 rounded-lg bg-[#F4F1F3] border border-primaryBorder border-dashed">
                      <IoCloudUploadOutline size={24} color="#e65800" />
                      <span className="text-sm">Upload File</span>
                    </button>
                  </div>
                  <div className="w-full flex flex-col gap-y-2">
                    <p className="text-sm text-[#A3A3B3]">Upload Back</p>
                    <button className="w-full py-3.5 flex justify-center items-center gap-x-3 rounded-lg bg-[#F4F1F3] border border-primaryBorder border-dashed">
                      <IoCloudUploadOutline size={24} color="#e65800" />
                      <span className="text-sm">Upload File</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-end gap-x-3 text-sm">
              <button
                onClick={closeNewAgentModal}
                className="rounded-lg hover:underline"
              >
                Cancel
              </button>
              <button className="px-5 py-3 rounded-lg text-white bg-defaultOrange">
                Add Agent
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-full py-5 px-5 md:px-10 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className=" px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
        <div className="flex flex-wrap-reverse gap-y-3 justify-between items-center mt-1">
          <div className=" w-full md:w-fit flex gap-x-6 items-center mt-3 text-sm border-b border-b-primaryBorder">
            <button
              className={`${
                agentType === "agent"
                  ? "border-b-[3px] border-b-defaultOrange"
                  : "text-[#585858]"
              } py-3`}
              onClick={() =>
                agentType !== "agent" ? setAgentType("agent") : null
              }
            >
              Agents <span className="text-xs text-defaultOrange">10</span>
            </button>
            <button
              className={`${
                agentType === "request"
                  ? "border-b-[3px] border-b-defaultOrange"
                  : "text-[#585858]"
              } py-3`}
              onClick={() =>
                agentType !== "request" ? setAgentType("request") : null
              }
            >
              Requests <span className="text-xs text-defaultOrange">23</span>
            </button>

            <button
              className={`${
                agentType === "inspection"
                  ? "border-b-[3px] border-b-defaultOrange"
                  : "text-[#585858]"
              } py-3`}
              onClick={() =>
                agentType !== "inspection" ? setAgentType("inspection") : null
              }
            >
              Inspection <span className="text-xs text-defaultOrange">10</span>
            </button>
          </div>

          <button
            onClick={openNewAgentModal}
            className="rounded-lg flex items-center md:gap-x-2 md:px-5 px-2 py-1.5 md:py-2.5 text-white text-xs md:text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
          >
            <FaPlus size={18} />
            New Agent
          </button>
        </div>
        <h1 className="text-3xl font-bold my-6">Field Agents</h1>

        {agentType === "agent" ? (
          <>
            <div className="flex flex-wrap gap-2 justify-between items-end mt-3 w-full">
              <div className="flex  flex-wrap gap-x-5 gap-y-3 items-center">
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
                      <option value="">Sort by status</option>
                      <option value="published">Published</option>
                      <option value="pending">Pending</option>
                      <option value="canceled">Canceled</option>
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

            <div className="mt-3 flex flex-1 w-full overflow-hidden bg-white">
              <MuiTableComponent
                showCheckbox={false}
                columns={columns}
                onRowClick={handleRowClick}
                rows={rows()}
                paginationActive={true}
                rowHeight={60}
                pageSize={10}
              />
            </div>
          </>
        ) : agentType === "request" ? (
          <>
            <div className="flex flex-wrap gap-2 justify-between items-end mt-5 w-full">
              <div className="flex gap-x-5 items-center">
                <div className=" gap-y-1">
                  <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                    <option>Category</option>
                    <option>2</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-x-2 px-3 basis-[25%] rounded-lg border bg-white border-primaryBorder">
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
                columns={columns2}
                rows={rows2()}
                paginationActive={true}
                rowHeight={60}
                pageSize={10}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 justify-between items-end mt-5 w-full">
              <div className="flex gap-x-5 items-center">
                <div className=" gap-y-1">
                  <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
                    <option>Category</option>
                    <option>2</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-x-2 px-3 basis-[25%] rounded-lg border bg-white border-primaryBorder">
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
                columns={columns3}
                rows={rows2()}
                paginationActive={true}
                rowHeight={60}
                pageSize={10}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
