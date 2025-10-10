import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DashboardSearchBar from "../components/DashboardSearchBar";
import MuiTableComponent from "../components/table/TableComponent";
import { FaPlus } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbAward } from "react-icons/tb";
import { generateRandomNumber } from "../helper/helperFunctions";
import AddAgentModal from "../components/modals/addAgent-modal";
import InspectionModal from "../components/modals/inspection-modal";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { StatusSelect } from "../components/common/statusSelect";
import { useDebounce } from "../hooks/useDebounce";
import UserService from "../api/services/userMgt.service";
import InspectionService from "../api/services/inspection.service";
import { usePaginatedData } from "../hooks/usePaginatedData";
import {
  AgentColumns,
  InspectionColumns,
  RequestColumns,
} from "../components/table/columns";

export default function FieldAgents() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, state } = location;
  const locationAgentType: string = state?.fieldAgent;
  const [newAgentModal, setNewAgentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    agent: "",
    request: "",
    inspection: "",
  });
  const debouncedAgentSearchQuery = useDebounce(searchQuery.agent);
  const debouncedRequestSearchQuery = useDebounce(searchQuery.request);
  const debouncedInspectionSearchQuery = useDebounce(searchQuery.inspection);
  const [agentType, setAgentType] = useState(locationAgentType || "agent");
  const [inspectionModal, setInspectionModal] = useState(false);
  const [currentAgent, setCurrentAgent] = useState({
    id: 0,
    name: "James Bond",
    email: "",
    phone: "",
    status: "",
    verifiedListings: 0,
  });
  const [filters, setFilters] = useState({
    agent: "",
    request: "",
    inspection: "",
  });
  const [formattedData, setFormattedData] = useState({
    inspections: [] as Product[],
    requests: [] as Product[],
  });

  // function openNewAgentModal() {
  //   setNewAgentModal(true);
  // }

  // function openInspectionModal(id: number) {
  //   console.log("ID", id);
  //   const selectedAgent = rows().find((row) => row.id === id);
  //   if (selectedAgent) {
  //     setCurrentAgent(selectedAgent);
  //   }
  //   setInspectionModal(true);
  // }
  const handleRowClick = (params: GridRowParams) => {
    console.log("Row clicked:", params.row);
    navigate(`/admin/agents/agent/${params.row.id}`);
  };

  const [agentData, setAgentData] = usePaginatedData(UserService.getAllAgents, {
    initialPage: 1,
    initialPageSize: 10,
    filters: { status: filters.agent, search: debouncedAgentSearchQuery },
    dataName: "field Agents",
  });

  const [requestData, setRequestData] = usePaginatedData(
    InspectionService.getAllInspections,
    {
      initialPage: 1,
      initialPageSize: 10,
      filters: {
        category: filters.request,
        search: debouncedRequestSearchQuery,
      },
      dataName: "inspection requests",
    }
  );

  const [inspectionData, setInspectionData] = usePaginatedData(
    InspectionService.getAllInspections,
    {
      initialPage: 1,
      initialPageSize: 10,
      filters: {
        category: filters.request,
        search: debouncedInspectionSearchQuery,
      },
      dataName: "inspections",
    }
  );

  // reformats inspection data on data change
  useEffect(() => {
    const formattedInspectionData: Product[] = inspectionData.rows.map(
      (item) => (item as Inspection).product
    );
    setFormattedData((prev) => ({
      ...prev,
      inspections: formattedInspectionData,
    }));
  }, [inspectionData]);

  // reformats request data on data change
  useEffect(() => {
    const formattedRequestData: Product[] = requestData.rows.map(
      (item) => (item as Inspection).product
    );
    setFormattedData((prev) => ({ ...prev, requests: formattedRequestData }));
  }, [requestData]);

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
      <AddAgentModal
        newAgentModal={newAgentModal}
        setNewAgentModal={setNewAgentModal}
      />
      {/*
      <InspectionModal
        inspectionModal={inspectionModal}
        setInspectionModal={setInspectionModal}
        currentAgent={currentAgent}
      /> */}

      <div className="w-full py-5 px-5 md:pl-[250px] md:pr-[100px] bg-white fixed z-10 left-10 top-0 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <main className=" px-5 md:px-10 w-full mt-20 flex flex-col flex-1">
        <section
          id="agents-tab"
          className="flex flex-wrap-reverse gap-y-3 justify-between items-center mt-1"
        >
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
              Agents{" "}
              <span className="text-xs text-defaultOrange">
                {agentData.totalRowCount}
              </span>
            </button>
            {/* <button
              className={`${
                agentType === "request"
                  ? "border-b-[3px] border-b-defaultOrange"
                  : "text-[#585858]"
              } py-3`}
              onClick={() =>
                agentType !== "request" ? setAgentType("request") : null
              }
            >
              Requests <span className="text-xs text-defaultOrange">{requestData.totalRowCount}</span>
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
              Inspection <span className="text-xs text-defaultOrange">{inspectionData.totalRowCount}</span>
            </button> */}
          </div>

          <button
            onClick={() => setNewAgentModal(true)}
            className="rounded-lg flex items-center md:gap-x-2 md:px-5 px-2 py-1.5 md:py-2.5 text-white text-xs md:text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
          >
            <FaPlus size={18} />
            New Agent
          </button>
        </section>
        <h1 className="text-3xl font-bold my-6">Field Agents</h1>
        <>
          <div className="flex flex-wrap gap-2 justify-end items-end mt-3 w-full">
            {/* <StatusSelect
							options={[
								{ label: "All", value: "" },
								{ label: "Active", value: "active" },
								{ label: "Inactive", value: "inactive" },
							]}
							onChange={(value) => {
								setFilters((prev) => ({ ...prev, agent: value }));
							}}
							value={filters.agent}
						/> */}

            <TableSearchInput
              searchQuery={searchQuery.agent}
              setSearchQuery={(val) =>
                setSearchQuery((prev) => ({ ...prev, agent: val }))
              }
              placeholder="Search agents"
            />
          </div>

          <section
            id="table"
            className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
          >
            <div className="min-w-[900px]">
              <MuiTableComponent
                showCheckbox={false}
                columns={AgentColumns}
                onRowClick={handleRowClick}
                rows={agentData.rows}
                loading={agentData.loading}
                rowHeight={60}
                currentPage={agentData.pagination.page}
                onPageChange={(model) =>
                  setAgentData((prev) => ({
                    ...prev,
                    pagination: {
                      page: model.page,
                      pageSize: model.pageSize,
                    },
                  }))
                }
                pageSize={agentData.pagination.pageSize}
                totalRowCount={agentData.totalRowCount}
              />
            </div>
          </section>
        </>
        {/* {agentType === "agent" ? (
          <>
            <div className="flex flex-wrap gap-2 justify-between items-end mt-3 w-full">
              <StatusSelect
                options={[
                  { label: "All", value: "" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
                onChange={(value) => {
                  setFilters((prev) => ({ ...prev, agent: value }));
                }}
                value={filters.agent}
              />

              <TableSearchInput
                searchQuery={searchQuery.agent}
                setSearchQuery={(val) =>
                  setSearchQuery((prev) => ({ ...prev, agent: val }))
                }
                placeholder="Search agents"
              />
            </div>

            <section
              id="table"
              className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
            >
              <div className="min-w-[900px]">
                <MuiTableComponent
                  showCheckbox={false}
                  columns={AgentColumns}
                  onRowClick={handleRowClick}
                  rows={agentData.rows}
                  loading={agentData.loading}
                  rowHeight={60}
                  currentPage={agentData.pagination.page}
                  onPageChange={(model) =>
                    setAgentData((prev) => ({
                      ...prev,
                      pagination: {
                        page: model.page,
                        pageSize: model.pageSize,
                      },
                    }))
                  }
                  pageSize={agentData.pagination.pageSize}
                  totalRowCount={agentData.totalRowCount}
                />
              </div>
            </section>
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

              <TableSearchInput
                searchQuery={searchQuery.request}
                setSearchQuery={(val) =>
                  setSearchQuery((prev) => ({ ...prev, request: val }))
                }
                placeholder="Search requests"
              />
            </div>
            <section
              id="table"
              className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
            >
              <div className="min-w-[900px]">
                <MuiTableComponent
                  columns={RequestColumns}
                  rows={formattedData.requests}
                  rowHeight={60}
                  currentPage={requestData.pagination.page}
                  onPageChange={(model) =>
                    setRequestData((prev) => ({
                      ...prev,
                      pagination: {
                        page: model.page,
                        pageSize: model.pageSize,
                      },
                    }))
                  }
                  loading={requestData.loading}
                  totalRowCount={requestData.totalRowCount}
                  pageSize={requestData.pagination.pageSize}
                />
              </div>
            </section>
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

              <TableSearchInput
                searchQuery={searchQuery.inspection}
                setSearchQuery={(val) =>
                  setSearchQuery((prev) => ({ ...prev, inspection: val }))
                }
                placeholder="Search inspectionss"
              />
            </div>
            <section
              id="table"
              className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
            >
              <div className="min-w-[900px]">
                <MuiTableComponent
                  columns={InspectionColumns}
                  onRowClick={(params) => openInspectionModal(params.row.id)}
                  rows={formattedData.inspections || rows2()}
                  currentPage={inspectionData.pagination.page}
                  onPageChange={(model) =>
                    setInspectionData((prev) => ({
                      ...prev,
                      pagination: {
                        page: model.page,
                        pageSize: model.pageSize,
                      },
                    }))
                  }
                  totalRowCount={inspectionData.totalRowCount}
                  loading={inspectionData.loading}
                  rowHeight={60}
                  pageSize={inspectionData.pagination.pageSize}
                />
              </div>
            </section>
          </>
        )} */}
      </main>
    </div>
  );
}
