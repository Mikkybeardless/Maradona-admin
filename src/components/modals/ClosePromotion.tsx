import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface ClosePromotionProps {
  isClosing: boolean;
  handleClose: (notes: string) => void;
  closeModalOpen: boolean;
  setCloseModalOpen: (open: boolean) => void;
}

export const ClosePromotion = ({
  isClosing,
  handleClose,
  closeModalOpen,
  setCloseModalOpen,
}: ClosePromotionProps) => {
  const [notes, setNotes] = useState("");
  return (
    <Dialog
      open={closeModalOpen}
      onClose={() => setCloseModalOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Close Promotion</DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2">
        <p>Write a short note (Optional)</p>

        <TextField
          label="Additional Notes"
          placeholder="Enter any remarks about this item..."
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button
          className="!text-black"
          onClick={() => {
            setCloseModalOpen(false);
            setNotes("");
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleClose(notes)}
          variant="contained"
          className="!bg-defaultOrange !text-white"
        >
          {isClosing ? "Closing..." : "Close"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
