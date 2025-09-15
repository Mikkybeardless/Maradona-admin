import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import notificationServices from "../../api/services/notification.service";

const initialState: NotificationsState = {
  notifications: [],
  unreadNotifications: [],
  stats: null,
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
    total_pages: 0,
  },
  loading: false,
  statsLoading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async ({ page = 1, per_page = 15 }: { page?: number; per_page?: number }) => {
    const response = await notificationServices.getNotifications(
      page,
      per_page
    );
    return response.data;
  }
);

export const fetchUnreadNotifications = createAsyncThunk(
  "notifications/fetchUnreadNotifications",
  async () => {
    const response = await notificationServices.getUnread();
    return response.data;
  }
);

export const fetchNotificationStats = createAsyncThunk(
  "notifications/fetchNotificationStats",
  async () => {
    const response = await notificationServices.getStats();
    return response.data;
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markNotificationRead",
  async (id: string | number, { rejectWithValue }) => {
    try {
      await notificationServices.markRead(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to mark notification as read");
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAllNotificationsRead",
  async (_, { rejectWithValue }) => {
    try {
      await notificationServices.markAllRead();
      return null;
    } catch (error) {
      return rejectWithValue("Failed to mark all notifications as read");
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (id: string | number, { rejectWithValue }) => {
    try {
      await notificationServices.deleteNotification(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete notification");
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // Optimistic updates
    optimisticMarkRead: (state, action: PayloadAction<string | number>) => {
      const id = action.payload;
      const now = new Date().toISOString();

      // Update main notifications list
      state.notifications = state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read_at: now }
          : notification
      );

      // Remove from unread list
      state.unreadNotifications = state.unreadNotifications.filter(
        (notification) => notification.id !== id
      );

      // Update stats
      if (state.stats) {
        state.stats.unread = Math.max(0, state.stats.unread - 1);
        state.stats.read += 1;
      }
    },

    optimisticMarkAllRead: (state) => {
      const now = new Date().toISOString();

      // Mark all notifications as read
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        read_at: notification.read_at || now,
      }));

      // Clear unread list
      state.unreadNotifications = [];

      // Update stats
      if (state.stats) {
        state.stats.read = state.stats.total;
        state.stats.unread = 0;
      }
    },

    optimisticDelete: (state, action: PayloadAction<string | number>) => {
      const id = action.payload;
      const notification = state.notifications.find((n) => n.id === id);

      // Remove from main list
      state.notifications = state.notifications.filter((n) => n.id !== id);

      // Remove from unread list
      state.unreadNotifications = state.unreadNotifications.filter(
        (n) => n.id !== id
      );

      // Update stats
      if (state.stats && notification) {
        state.stats.total -= 1;
        if (!notification.read_at) {
          state.stats.unread -= 1;
        } else {
          state.stats.read -= 1;
        }
      }

      // Update pagination
      state.pagination.total -= 1;
      state.pagination.total_pages = Math.ceil(
        state.pagination.total / state.pagination.per_page
      );
    },

    revertOptimisticUpdate: (
      state,
      action: PayloadAction<NotificationData[]>
    ) => {
      // Revert to previous state on API error
      state.notifications = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.data || [];
        state.pagination = {
          current_page: parseInt(action.payload.current_page) || 1,
          per_page: action.payload.per_page || 15,
          total: action.payload.total || 0,
          total_pages: Math.ceil(
            (action.payload.total || 0) / (action.payload.per_page || 15)
          ),
        };
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notifications";
      })

      // Fetch unread notifications
      .addCase(fetchUnreadNotifications.fulfilled, (state, action) => {
        state.unreadNotifications = action.payload.data || [];
      })

      // Fetch stats
      .addCase(fetchNotificationStats.pending, (state) => {
        state.statsLoading = true;
      })
      .addCase(fetchNotificationStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchNotificationStats.rejected, (state) => {
        state.statsLoading = false;
      })

      // Handle API confirmation for mark read
      .addCase(markNotificationRead.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Handle API confirmation for mark all read
      .addCase(markAllNotificationsRead.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Handle API confirmation for delete
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  optimisticMarkRead,
  optimisticMarkAllRead,
  optimisticDelete,
  revertOptimisticUpdate,
  clearError,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
