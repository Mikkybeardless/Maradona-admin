import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiBell, FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "../components/notifications/NotificationCard";
import NotificationModal from "../components/notifications/NotificationModal";
import { AppDispatch, RootState } from "../redux/store";
import {
  clearError,
  deleteNotification,
  fetchNotifications,
  fetchNotificationStats,
  markAllNotificationsRead,
  markNotificationRead,
  optimisticDelete,
  optimisticMarkAllRead,
  optimisticMarkRead,
} from "../redux/slices/notificationsSlice";

const POLL_MS = 2 * 60 * 1000;

export default function NotificationsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, stats, pagination, loading, error } = useSelector(
    (state: RootState) => state.notifications
  );

  const [active, setActive] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [snack, setSnack] = useState<{
    open: boolean;
    msg: string;
    severity?: "error" | "success";
  }>({ open: false, msg: "" });

  useEffect(() => {
    dispatch(fetchNotifications({ page: currentPage, per_page: perPage }));
    dispatch(fetchNotificationStats());

    const id = setInterval(() => {
      dispatch(fetchNotifications({ page: currentPage, per_page: perPage }));
      dispatch(fetchNotificationStats());
    }, POLL_MS);

    return () => {
      if (id) clearInterval(id);
    };
  }, [dispatch, currentPage, perPage]);

  useEffect(() => {
    if (error) {
      setSnack({
        open: true,
        msg: error,
        severity: "error",
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handlePerPageChange = (event: any) => {
    const newPerPage = event.target.value;
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    dispatch(fetchNotifications({ page: currentPage, per_page: perPage }));
    dispatch(fetchNotificationStats());
  };

  async function openNotif(n: NotificationData) {
    setActive(n);

    // Only mark as read if it's not already read
    if (!n.read_at) {
      dispatch(optimisticMarkRead(n.id));
      try {
        await dispatch(markNotificationRead(n.id)).unwrap();
      } catch (error) {}
    }
  }

  async function handleMarkAllRead() {
    dispatch(optimisticMarkAllRead());
    try {
      await dispatch(markAllNotificationsRead()).unwrap();
      setSnack({
        open: true,
        msg: "All notifications marked as read",
        severity: "success",
      });
    } catch (error) {}
  }

  async function handleDelete(id: string | number) {
    dispatch(optimisticDelete(id));
    setActive(null);
    try {
      await dispatch(deleteNotification(id)).unwrap();
      setSnack({
        open: true,
        msg: "Notification deleted",
        severity: "success",
      });
    } catch (error) {}
  }

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  const humanizedStats = [
    {
      title: "Total Notifications",
      data: stats?.total,
      icon: FiBell,
    },
    {
      title: "Read",
      data: stats?.read,
      icon: FiEye,
    },
    {
      title: "Unread",
      data: stats?.unread,
      icon: FiEyeOff,
    },
  ];

  return (
    <main className="p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <Badge badgeContent={unreadCount} color="error" />
        </div>
        <div className="flex gap-3">
          <Button
            variant="outlined"
            className="!text-defaultOrange !border-defaultOrange border "
            onClick={handleRefresh}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress className="!text-defaultOrange" size={16} />
              ) : null
            }
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            className="!text-white !bg-defaultOrange hover:!bg-defaultOrangeHover"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
          >
            Mark all read
          </Button>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-row-reverse justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              minWidth: 120,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "orange" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "orange",
              },
              "& .MuiSelect-select": { color: "#e65800" },
              "& .MuiSvgIcon-root": { color: "#e65800" },
              "& .MuiInputLabel-root": { color: "#e65800" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#e65800" },
            }}
          >
            <InputLabel>Per Page</InputLabel>
            <Select
              value={perPage}
              label="Per Page"
              onChange={handlePerPageChange}
            >
              {[10, 15, 20, 25, 30, 40, 50].map((opt) => (
                <MenuItem key={opt} value={opt} sx={{ color: "#e65800" }}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="body2" color="textSecondary">
            Showing {notifications.length} of {pagination.total} notifications
          </Typography>
        </div>

        {pagination.total_pages > 1 && (
          <Pagination
            count={pagination.total_pages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="small"
          />
        )}

        {/* Stats Section */}
        {stats && (
          <div className="flex justify-end flex-wrap gap-4 mb-4">
            {humanizedStats.map((stat, index) => (
              <div
                key={index}
                className="flex gap-3 items-center justify-center"
              >
                |<span className="font-medium">{stat.data}</span>
                <span>{stat.title}</span>
                <stat.icon className="size-4 opacity-80" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notifications List */}
      <Card>
        <CardContent>
          {loading && notifications.length === 0 ? (
            <Box className="flex justify-center items-center py-8">
              <CircularProgress className="!text-defaultOrange" />
              <Typography className="ml-3">Loading notifications...</Typography>
            </Box>
          ) : notifications.length === 0 ? (
            <Box className="text-center py-8">
              <FiBell className="text-4xl text-gray-400 mx-auto mb-4" />
              <Typography variant="h6" color="textSecondary">
                No notifications found
              </Typography>
            </Box>
          ) : (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {notifications.map((n) => (
                <NotificationCard n={n} openNotif={openNotif} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination Footer */}
      {pagination.total_pages > 1 && (
        <Box className="flex justify-center mt-6">
          <Pagination
            count={pagination.total_pages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Notification Modal */}
      <NotificationModal
        open={!!active}
        onClose={() => setActive(null)}
        notification={active}
        onDelete={handleDelete}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ open: false, msg: "" })}
      >
        <Alert
          severity={snack.severity ?? "success"}
          onClose={() => setSnack({ open: false, msg: "" })}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </main>
  );
}
