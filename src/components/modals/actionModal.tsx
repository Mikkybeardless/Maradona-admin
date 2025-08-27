import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import purchaseEnquiriesService from "../../api/services/purchaseEnquiries.service";
import { toast } from "react-toastify";

interface ActionModalProps {
  showDropdown: boolean;
  closeDropdown: () => void;
  openAssignAgentModal: () => void;
  openMarkAsSoldModal?: () => void;
  itemId: number;
}

export default function ActionModal({
  showDropdown,
  closeDropdown,
  openAssignAgentModal,
  openMarkAsSoldModal,
  itemId,
}: ActionModalProps) {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  useClickAway(dropDownRef, () => {
    closeDropdown();
  });

  const handleClosedEnquiry = async () => {
    try {
      setClosing(true);
      const response = await purchaseEnquiriesService.closeEnquiry(itemId);
      if (response.status === 200) {
        // Handle successful closure
        toast.success("Enquiry closed successfully");
      }
    } catch (error) {
      toast.error("Error closing enquiry, pls try again later");
      console.error("Error closing enquiry:", error);
    } finally {
      setClosing(false);
      closeDropdown();
    }
  };
  return (
    showDropdown && (
      <div
        ref={dropDownRef}
        className="w-auto flex flex-col shadow-lg border border-primaryBorder absolute top-[120%] text-sm right-0 rounded-lg bg-white"
      >
        <button
          onClick={openAssignAgentModal}
          className="p-3 px-5 whitespace-nowrap hover:text-green-500  hover:underline rounded-t-lg"
        >
          Assign Agent
        </button>
        <button
          onClick={openMarkAsSoldModal}
          className="p-3 px-5 whitespace-nowrap hover:text-blue-500 hover:underline"
        >
          Mark as Sold
        </button>
        <button
          onClick={handleClosedEnquiry}
          className="p-3 px-5 whitespace-nowrap hover:text-red-500 hover:underline"
        >
          {closing ? "Closing..." : "Close Enquiry"}
        </button>
      </div>
    )
  );
}
