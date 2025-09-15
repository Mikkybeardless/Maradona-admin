import React, { useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Button,
  Badge,
  CircularProgress,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  fetchUnreadNotifications,
  optimisticMarkRead,
  markNotificationRead,
  optimisticDelete,
  deleteNotification,
  clearError,
} from "../../redux/slices/notificationsSlice";
import NotificationModal from "./NotificationModal";

const POLL_MS = 2 * 60 * 1000; // 2 minutes

export default function NotificationsDropdown() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<any | null>(null);
  const mounted = useRef(true);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { unreadNotifications, loading, error } = useSelector(
    (state: RootState) => state.notifications
  );

  const [snack, setSnack] = React.useState<{
    open: boolean;
    msg: string;
    severity?: "error" | "success";
  }>({ open: false, msg: "" });

  useEffect(() => {
    mounted.current = true;
    dispatch(fetchUnreadNotifications());
    const id = setInterval(() => {
      if (mounted.current) {
        dispatch(fetchUnreadNotifications());
      }
    }, POLL_MS);
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, [dispatch]);

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

  const unreadCount = unreadNotifications.length;

  async function openNotification(n: NotificationData) {
    // Optimistic update
    dispatch(optimisticMarkRead(n.id));
    setActive(n);

    // API call
    try {
      await dispatch(markNotificationRead(n.id)).unwrap();
    } catch (error) {
      // Error handling is managed by Redux
    }
  }

  async function handleDelete(id: string | number) {
    // Optimistic update
    dispatch(optimisticDelete(id));
    setActive(null);

    try {
      await dispatch(deleteNotification(id)).unwrap();
      setSnack({
        open: true,
        msg: "Notification deleted",
        severity: "success",
      });
    } catch (error) {
      // Error handling is managed by Redux
    }
  }

  function handleRefresh() {
    dispatch(fetchUnreadNotifications());
  }

  function handleKeyToggle(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      setOpen((v) => !v);
    }
  }

  return (
    <Box className="relative">
      <IconButton
        ref={(el) => (anchorRef.current = el)}
        aria-label={`Notifications (${unreadCount} unread)`}
        aria-haspopup="true"
        aria-expanded={open}
        onKeyDown={handleKeyToggle}
        onClick={() => setOpen((v) => !v)}
      >
        <Badge badgeContent={unreadCount} color="error">
          <FiBell />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ style: { width: 360 } }}
      >
        <Box
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">Unread Notifications</Typography>
          <Button
            size="small"
            onClick={handleRefresh}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={14} /> : null}
          >
            Refresh
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : unreadNotifications.length === 0 ? (
          <MenuItem disabled>No unread notifications</MenuItem>
        ) : (
          unreadNotifications.map((n) => (
            <MenuItem
              key={n.id}
              onClick={() => {
                openNotification(n);
                setOpen(false);
              }}
              sx={{
                marginBottom: 1,
                alignItems: "flex-start",
                bgcolor: "#dbeafe",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" fontWeight={600}>
                  {n.data?.title || n.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ maxWidth: 280 }}
                >
                  {n.data?.message || n.message}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  {new Date(n.created_at).toLocaleString()}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}

        <MenuItem
          onClick={() => {
            setOpen(false);
            navigate("/seller/notifications");
          }}
        >
          See all notifications
        </MenuItem>
      </Menu>

      <NotificationModal
        open={!!active}
        onClose={() => setActive(null)}
        notification={active}
        onDelete={handleDelete}
      />

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
    </Box>
  );
}
