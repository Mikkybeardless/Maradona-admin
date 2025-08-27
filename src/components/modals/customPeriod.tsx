import { useState } from "react";
import CustomDateInput from "../common/dateInput";
import formatDateToYYYYMMDD from "../../helper/formatDate";
import { toast } from "react-toastify";

interface CustomPeriodModalProps {
  Modal: boolean;
  setModal: (value: boolean) => void;
  onApply: (customDate: { start_date: string; end_date: string }) => void;
}

export default function CustomPeriodModal({
  Modal,
  setModal,
  onApply,
}: CustomPeriodModalProps) {
  const [customDate, setCustomDate] = useState<{
    start_date: Date | null;
    end_date: Date | null;
  }>({
    start_date: null,
    end_date: null,
  });

  const handleApply = () => {
    if (!customDate.start_date || !customDate.end_date) {
      toast.error("Please select both start and end dates.");
      return;
    }
    if (customDate.end_date < customDate.start_date) {
      toast.error("End date cannot be earlier than start date.");
      return;
    }
    const formated = {
      start_date: formatDateToYYYYMMDD(customDate.start_date),
      end_date: formatDateToYYYYMMDD(customDate.end_date),
    };
    onApply(formated);
    setModal(false);
  };

  const handleCancel = () => {
    onApply({ start_date: "", end_date: "" });
    setCustomDate({
      start_date: null,
      end_date: null,
    });
    setModal(false);
  };

  return (
    Modal && (
      <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
        <div className="md:w-[50%]  rounded-[24px] flex flex-col p-8 bg-white">
          <h2 className="text-2xl font-bold">Choose Custom Period</h2>
          <div className="w-full flex flex-col flex-1 gap-y-3.5 mt-2 overflow-y-auto custom-scrollbar-low-opacity">
            <div className="flex flex-col gap-y-1.5 flex-1 w-full">
              <CustomDateInput
                label="Start Date:"
                onChange={(newDate) => {
                  setCustomDate((prevDate) => ({
                    ...prevDate,
                    start_date: newDate,
                  }));
                }}
                iconColor="text-defaultOrange"
                value={customDate.start_date}
              />
            </div>

            <div className="flex flex-col gap-y-1.5 flex-1 w-full">
              <CustomDateInput
                label="End Date:"
                onChange={(newDate) => {
                  setCustomDate((prevDate) => ({
                    ...prevDate,
                    end_date: newDate,
                  }));
                }}
                iconColor="text-defaultOrange"
                value={customDate.end_date}
              />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-end gap-x-3 text-sm">
            <button
              onClick={handleCancel}
              className="rounded-lg hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-3 rounded-lg text-white bg-defaultOrange"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  );
}
