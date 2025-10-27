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
import { useNavigate } from "react-router-dom";
import { isISOString } from "../../helper/helperFunctions";
import { formatIsoString } from "../../helper/formatIIsoString";

type Props = {
  open: boolean;
  onClose: () => void;
  inspection: Inspection | null;
  onAssignAgent?: () => void;
};

export default function InspectionModal({
  open,
  onClose,
  inspection,
  onAssignAgent,
}: Props) {
  const navigate = useNavigate();
  if (!inspection) return null;

  const handleViewProduct = () => {
    navigate(`/admin/products/product/${inspection.product?.id}`);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Inspection Details</DialogTitle>
      <DialogContent dividers>
        <div className="text-sm text-gray-700">
          <Typography variant="body2" gutterBottom>
            <strong>Product:</strong>{" "}
            {inspection.product
              ? inspection.product.name
              : "Product details not available"}
          </Typography>

          {
            <Table size="small">
              <TableBody>
                {Object.entries(inspection).map(([k, v]) => (
                  <TableRow key={k}>
                    {typeof v === "object" ? (
                      <>
                        {Object.entries(v ?? {}).map(([key, value]) => {
                          return (
                            <div key={key}>
                              <TableCell sx={{ fontWeight: 600, width: "35%" }}>
                                {key}
                              </TableCell>
                              {/* <strong>{key}:</strong> {String(value)} */}
                              <TableCell>
                                {isISOString(String(value))
                                  ? (() => {
                                      const res = formatIsoString(
                                        String(value)
                                      );
                                      return typeof res === "string"
                                        ? res
                                        : `${res.formattedDate} ${res.formattedTime}`;
                                    })()
                                  : String(value)}
                              </TableCell>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <TableCell sx={{ fontWeight: 600, width: "35%" }}>
                          {k}
                        </TableCell>
                        <TableCell>
                          {" "}
                          {isISOString(String(v))
                            ? (() => {
                                const res = formatIsoString(String(v));
                                return typeof res === "string"
                                  ? res
                                  : `${res.formattedDate} ${res.formattedTime}`;
                              })()
                            : String(v)}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          }
        </div>
      </DialogContent>
      <DialogActions>
        {onAssignAgent && (
          <Button
            onClick={() => {
              onAssignAgent();
              onClose();
            }}
          >
            Assign Agent
          </Button>
        )}
        <Button color="secondary" onClick={handleViewProduct}>
          View Product
        </Button>
        <Button color="error" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
