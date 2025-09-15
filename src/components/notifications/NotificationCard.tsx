import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";

const NotificationCard = ({
  n,
  openNotif,
}: {
  n: NotificationData;
  openNotif: (n: NotificationData) => Promise<void>;
}) => {
  return (
    <Card
      key={n.id}
      variant="outlined"
      className={`cursor-pointer transition-all hover:shadow-md ${
        !n.read_at
          ? "bg-blue-50 border-l-4 border-l-orange-500 font-medium"
          : "hover:bg-gray-50"
      }`}
      onClick={() => openNotif(n)}
    >
      <CardContent className="py-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Typography
                variant="subtitle1"
                className={!n.read_at ? "font-semibold" : ""}
              >
                {n.data?.title || n.title || "Notification"}
              </Typography>
              {!n.read_at && (
                <Chip
                  size="small"
                  label="New"
                  className="!bg-defaultOrange !text-white"
                  variant="filled"
                />
              )}
            </div>
            <Typography variant="body2" color="textSecondary" className="mb-2">
              {n.data?.message || n.message || "No message"}
            </Typography>
            <Typography variant="caption" color="textDisabled">
              {new Date(n.created_at).toLocaleString()}
            </Typography>
          </div>
          <Box className="flex items-center gap-1 ml-4">
            {n.read_at ? (
              <FiEye className="text-green-500" />
            ) : (
              <FiEyeOff className="text-orange-500" />
            )}
          </Box>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
