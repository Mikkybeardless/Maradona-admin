import { useRef, useState } from "react";
import DefaultAgent from "../../assets/default-Profile.png";
import { usePaginatedData } from "../../hooks/usePaginatedData";
import UserService from "../../api/services/userMgt.service";
import { useDebounce } from "../../hooks/useDebounce";
import { TableSearchInput } from "../common/TableSearchInput";
import { useClickAway } from "react-use";
import { toast } from "react-toastify";

interface AssignAgentModalProps {
  assignAgentModal: boolean;
  closeAssignAgentModal: () => void;
  onSubmit: (agentId: number) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export default function AssignAgentModal({
  assignAgentModal,
  closeAssignAgentModal,
  onSubmit,
}: AssignAgentModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const assignAgentModalRef = useRef(null);
  const [assigning, setAssigning] = useState(false);
  const debouncedAgentSearchQuery = useDebounce(searchQuery, 600);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [agentData] = usePaginatedData(UserService.getAllAgents, {
    initialPage: 1,
    initialPageSize: 10,
    filters: { search: debouncedAgentSearchQuery },
    dataName: "field Agents",
  });

  useClickAway(assignAgentModalRef, () => {
    closeAssignAgentModal();
  });

  const handleAssignAgent = async () => {
    setAssigning(true);
    if (selectedAgentId === null) {
      toast.error("Please select an agent");
      return;
    }
    const result = await onSubmit(selectedAgentId);
    if (result.success) {
      toast.success(result.message);
      setAssigning(false);
      closeAssignAgentModal();
      setSelectedAgentId(null);
      return;
    } else {
      toast.error(result.message);
      setAssigning(false);
    }
  };

  return (
    assignAgentModal && (
      <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
        <div
          ref={assignAgentModalRef}
          className=" w-[90%] md:w-[35%] h-[70%] rounded-[24px] flex flex-col p-8 bg-white"
        >
          {agentData.loading ? (
            <div className="p-4 text-center my-[160px] text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-defaultOrange mx-auto"></div>
              <p className="mt-2 text-sm">Searching...</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Available Agents</h2>
              <div className="w-full flex flex-col flex-1 gap-y-4 mt-4 overflow-y-auto custom-scrollbar-low-opacity">
                {agentData.rows.length === 0 && (
                  <div className="p-4 text-center my-20 text-gray-500">
                    <p className="">No agents found</p>
                  </div>
                )}
                {(agentData.rows as ApiAgent[]).map((agent) => (
                  <div key={agent.id} className="flex items-center gap-x-3">
                    <input
                      className="size-[18px]"
                      type="radio"
                      checked={selectedAgentId === agent.id}
                      onChange={() => setSelectedAgentId(agent.id)}
                      name="agent"
                      id={String(agent.id)}
                    />

                    <label
                      htmlFor={String(agent.id)}
                      className="flex items-center gap-x-3"
                    >
                      <img
                        src={DefaultAgent}
                        alt="Profile"
                        className="size-[40px] object-fill rounded-full bg-gray-300"
                      />
                      <span>{agent.name}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-10">
                <TableSearchInput
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  placeholder="Search agents"
                />
              </div>

              <div className="mt-5 flex items-center justify-end gap-x-3 text-sm">
                <button
                  onClick={closeAssignAgentModal}
                  className="rounded-lg hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignAgent}
                  className="px-5 py-3 rounded-lg text-white bg-defaultOrange"
                >
                  {assigning ? "Assigning..." : "Assign"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
}
