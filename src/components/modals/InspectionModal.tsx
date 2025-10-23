import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { formatAmountToNaira } from "../../helper/helperFunctions";

type Props = {
  open: boolean;
  onClose: () => void;
  inspection: any | null;
  onDelete?: (id: string | number) => void;
};

export default function InspectionModal({
  open,
  onClose,
  inspection,
  onDelete,
}: Props) {
  if (!inspection) return null;

  const payload = inspection.data || inspection;
  const human = payload.humanized_data ?? inspection.humanized_data ?? null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{payload.title ?? "inspection"}</DialogTitle>
      <DialogContent dividers>
        <div className="text-sm text-gray-700">
          {payload.message && (
            <Typography variant="body2" gutterBottom>
              {payload.message}
            </Typography>
          )}

          {human && typeof human === "object" && !Array.isArray(human) ? (
            <Table size="small">
              <TableBody>
                {Object.entries(human).map(([k, v]) => (
                  <TableRow key={k}>
                    {k === "Winning Bid" ? (
                      <>
                        <TableCell sx={{ fontWeight: 600, width: "35%" }}>
                          {k.replace(/_/g, " ")}
                        </TableCell>
                        <TableCell>{formatAmountToNaira(Number(v))}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell sx={{ fontWeight: 600, width: "35%" }}>
                          {k.replace(/_/g, " ")}
                        </TableCell>
                        <TableCell>{String(v)}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <pre className="text-xs bg-gray-100 p-2 rounded">
              {JSON.stringify(payload.data ?? payload, null, 2)}
            </pre>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        {onDelete && (
          <Button color="error" onClick={() => onDelete(inspection.id)}>
            Delete
          </Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
