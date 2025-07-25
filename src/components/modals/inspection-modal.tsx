import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useClickAway } from "react-use";
import img1 from "../../assets/agent.jpg";
import { CiCalendar, CiClock2 } from "react-icons/ci";

interface InspectionModalProps {
  inspectionModal: boolean;
  setInspectionModal: (value: boolean) => void;
  currentAgent: {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    verifiedListings: number;
  };
}
export default function InspectionModal({
  inspectionModal,
  setInspectionModal,
  currentAgent,
}: InspectionModalProps) {
  const inspectionModalRef = useRef<HTMLDivElement>(null);
  useClickAway(inspectionModalRef, () => {
    setInspectionModal(false);
  });

  return (
    inspectionModal && (
      <div className="w-screen h-screen  flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
        <div
          ref={inspectionModalRef}
          className="md:w-[40%] md:h-[70%] rounded-[24px] flex flex-col px-8 py-2 bg-white"
        >
          <div className="mt-5 flex items-center justify-between gap-x-3 border-b pb-1 ">
            <h2 className="text-2xl font-bold">Request for Inspection</h2>
            <button
              onClick={() => setInspectionModal(false)}
              className="rounded-full bg-gray-200 p-3 hover:underline"
            >
              <FaTimes size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-y-1 mt-5">
            <div className=" flex flex-col justify-center mb-14 items-center text-[#585858] gap-y-3">
              <img
                src={img1}
                alt="agent profile picture"
                className="w-[97px] h-[97px] rounded-sm object-contain"
              />
              <p>
                Inspection with{" "}
                <span className="font-semibold mr-1 text-black">
                  {currentAgent.name}
                </span>
                (Buyer)
              </p>
              <p>
                Filed Agent Assigned : <span>{currentAgent.id}</span>{" "}
              </p>
              <p className="flex items-center gap-x-3">
                <span className="flex items-center gap-x-1">
                  <CiCalendar size={18} className="text-black" />
                  Thur, Nov 7
                </span>
                <span className="flex items-center gap-x-1">
                  <CiClock2 size={18} className="text-black" /> 5 pm EST
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <button className="bg-[#008000] rounded-lg py-2 w-full text-white">
                Approve
              </button>
              <button className="bg-[#EE1E1E] rounded-lg py-2 w-full text-white">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
