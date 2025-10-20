import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CustomDateInput from "../common/dateInput";

import { useState } from "react";

interface ReOpenPromotionProps {
  isReOpening: boolean;
  handleReOpen: (date: Date) => void;
  reOpenPromoModalOpen: boolean;
  setReOpenPromoModalOpen: (open: boolean) => void;
}

export const ReOpenPromotion = ({
  isReOpening,
  handleReOpen,
  reOpenPromoModalOpen,
  setReOpenPromoModalOpen,
}: ReOpenPromotionProps) => {
  const [newEndDate, setNewEndDate] = useState<Date | null>(null);
  //   const [newEndTime, setNewEndTime] = useState<Date | null>(null);
  return (
    <Dialog
      open={reOpenPromoModalOpen}
      onClose={() => setReOpenPromoModalOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Set New End Date</DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2">
        <CustomDateInput value={newEndDate} onChange={setNewEndDate} />
        {/* <TimeInput
          value={newEndTime}
          onChange={(event) => {
            const value = event.target.value;
            // Assuming value is a string in "HH:mm" format
            if (value) {
              const [hours, minutes] = value.split(":").map(Number);
              const date = new Date();
              date.setHours(hours);
              date.setMinutes(minutes);
              date.setSeconds(0);
              date.setMilliseconds(0);
              setNewEndTime(date);
            } else {
              setNewEndTime(null);
            }
          }}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button
          className="!text-black"
          onClick={() => {
            setNewEndDate(null);
            // setNewEndTime(null);
            setReOpenPromoModalOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (newEndDate) {
              handleReOpen(newEndDate);
            }
          }}
          variant="contained"
          className="!bg-defaultOrange !text-white"
          disabled={!newEndDate || isReOpening}
        >
          {isReOpening ? "Reopening..." : "Reopen"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
