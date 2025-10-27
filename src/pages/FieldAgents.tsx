import { GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";
import DashboardSearchBar from "../components/DashboardSearchBar";
import MuiTableComponent from "../components/table/TableComponent";
import { FaPlus } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

import AddAgentModal from "../components/modals/addAgent-modal";

import { TableSearchInput } from "../components/common/TableSearchInput";
import { StatusSelect } from "../components/common/statusSelect";
import { useDebounce } from "../hooks/useDebounce";
import UserService from "../api/services/userMgt.service";
import InspectionService from "../api/services/inspection.service";
import { usePaginatedData } from "../hooks/usePaginatedData";
import { AgentColumns, InspectionColumns } from "../components/table/columns";
import AssignAgentModal from "../components/modals/assignAgent";
import InspectionModal from "../components/modals/InspectionModal";

export default function FieldAgents() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const locationAgentType: string = state?.fieldAgent;
  const [newAgentModal, setNewAgentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    agent: "",
    request: "",
    inspection: "",
  });
  const debouncedAgentSearchQuery = useDebounce(searchQuery.agent);
  const debouncedInspectionSearchQuery = useDebounce(searchQuery.inspection);
  const [agentType, setAgentType] = useState(locationAgentType || "agent");
  const [assignAgentModal, setAssignAgentModal] = useState(false);
  const [currentInspection, setCurrentInspection] = useState<Inspection | null>(
    null
  );
  const [currentInspectionId, setCurrentInspectionId] = useState<number | null>(
    null
  );
  // const [currentAgent, setCurrentAgent] = useState<FieldAgent | null>(null);
  const [filters, setFilters] = useState({
    agent: "",
    request: "",
    inspection: "",
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
    navigate(`/admin/agents/agent/${params.row.id}`);
  };
  const handleInspectionRowClick = (params: GridRowParams) => {
    setCurrentInspection(params.row);
    setCurrentInspectionId(params.row.id);
    // if (params.row.status === "pending") {
    //   setAssignAgentModal(true);
    // }
  };

  const [agentData, setAgentData] = usePaginatedData(UserService.getAllAgents, {
    initialPage: 1,
    initialPageSize: 10,
    filters: { status: filters.agent, search: debouncedAgentSearchQuery },
    dataName: "field Agents",
  });

  const [inspectionData, setInspectionData] = usePaginatedData(
    InspectionService.getAllInspections,
    {
      initialPage: 1,
      initialPageSize: 10,
      filters: {
        category: filters.inspection,
        search: debouncedInspectionSearchQuery,
      },
      dataName: "inspections",
    }
  );

  const handleAssignAgent = async (agentId: number) => {
    try {
      const response = await InspectionService.assignAgent(
        Number(currentInspectionId),
        agentId
      );
      if (response.status === 200) {
        return {
          success: true,
          message: "Agent successfully assigned",
        };
      }
      return {
        success: false,
        message: "Failed to assign agent, please try again",
      };
    } catch (error) {
      console.error("Error assigning agent:", error);
      return {
        success: false,
        message: "An error occurred while assigning the agent",
      };
    } finally {
      setCurrentInspectionId(null);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
      <AddAgentModal
        newAgentModal={newAgentModal}
        setNewAgentModal={setNewAgentModal}
      />
      <AssignAgentModal
        onSubmit={handleAssignAgent}
        assignAgentModal={assignAgentModal}
        closeAssignAgentModal={() => setAssignAgentModal(false)}
      />
      <InspectionModal
        open={Boolean(currentInspection)}
        onClose={() => setCurrentInspection(null)}
        inspection={currentInspection}
        onAssignAgent={() => setAssignAgentModal(true)}
      />

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
              Inspections
              <span className="text-xs text-defaultOrange">
                {inspectionData.totalRowCount}
              </span>
            </button>
          </div>

          <button
            onClick={() => setNewAgentModal(true)}
            className="rounded-lg flex items-center md:gap-x-2 md:px-5 px-2 py-1.5 md:py-2.5 text-white text-xs md:text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
          >
            <FaPlus size={18} />
            New Agent
          </button>
        </section>

        {agentType === "agent" ? (
          <>
            <h1 className="text-3xl font-bold my-6">Field Agents</h1>
            <div className="flex flex-wrap gap-2 justify-end items-end w-full">
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
        ) : (
          <>
            <h1 className="text-3xl font-bold my-6">Inspection Requests</h1>
            <div className="flex flex-wrap gap-2 justify-between items-end mt-5 w-full">
              <StatusSelect
                options={[
                  { label: "All", value: "" },
                  { label: "Pending", value: "pending" },
                  { label: "Passed", value: "passed" },
                  { label: "Assigned", value: "assigned" },
                  { label: "Scheduled", value: "scheduled" },
                  { label: "Failed", value: "failed" },
                ]}
                onChange={(value) => {
                  setFilters((prev) => ({ ...prev, inspection: value }));
                }}
                value={filters.inspection}
              />
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
                  rows={inspectionData.rows}
                  currentPage={inspectionData.pagination.page}
                  onRowClick={handleInspectionRowClick}
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
        )}
      </main>
    </div>
  );
}
