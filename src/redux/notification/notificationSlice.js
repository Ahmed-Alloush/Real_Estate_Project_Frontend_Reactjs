import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("accessToken");

// 📥 Get current user's notifications
export const getMyNotifications = createAsyncThunk(
  "notification/getMyNotifications",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/notification/user/me", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch notifications"
      );
    }
  }
);

// 🔴 Get unread count for badge
export const getUnreadCount = createAsyncThunk(
  "notification/getUnreadCount",
  async (userId, thunkAPI) => {
    try {
      const res = await api.get(`/notification/unread-count/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data.count;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch unread count"
      );
    }
  }
);

// ✅ Mark a single notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notification/markNotificationAsRead",
  async (notificationId, thunkAPI) => {
    try {
      const res = await api.patch(
        `/notification/read/${notificationId}`,
        {},
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to mark as read"
      );
    }
  }
);

// ✅ Mark all notifications as read
export const markAllNotificationsAsRead = createAsyncThunk(
  "notification/markAllNotificationsAsRead",
  async (userId, thunkAPI) => {
    try {
      const res = await api.patch(
        `/notification/read-all/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to mark all as read"
      );
    }
  }
);

// 🗑️ Delete a notification
export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (notificationId, thunkAPI) => {
    try {
      await api.delete(`/notification/${notificationId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return notificationId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to delete notification"
      );
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearNotificationState: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
      state.loading = false;
      state.error = null;
    },
    increaseUnReadCount: (state) => {
      state.unreadCount = state.unreadCount + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
        state.unreadCount = action.payload.filter((n) => !n.isRead).length;
      })
      .addCase(getMyNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })

      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const updated = state.notifications.find(
          (n) => n.id === action.payload.id
        );
        if (updated) updated.isRead = true;
        state.unreadCount -= 1;
      })

      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.notifications.forEach((n) => (n.isRead = true));
        state.unreadCount = 0;
      })

      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(
          (n) => n.id !== action.payload
        );
      });
  },
});

export const { clearNotificationState,increaseUnReadCount } = notificationSlice.actions;

export default notificationSlice.reducer;
