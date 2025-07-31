import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ------------------- CREATE SUBSCRIPTION
export const createSubscription = createAsyncThunk(
  "subscription/createSubscription",
  async ({ data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.post(`/subscription`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- GET ALL SUBSCRIPTIONS
export const getAllSubscriptions = createAsyncThunk(
  "subscription/getAllSubscription",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/subscription`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- UPDATE SUBSCRIPTION
export const updateSubscription = createAsyncThunk(
  "subscription/updateSubscription",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.put(`/subscription/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- DELETE SUBSCRIPTION
export const deleteBlog = createAsyncThunk(
  "subscription/deleteSubscription",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.delete(`/subscription/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // so you can remove from list
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    loading: false,
    error: null,
    success: false,
    subscriptions: [],
  },
  reducers: {
    resetSubscriptionState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // create
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions.push(action.payload);
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAllSubscriptions
      .addCase(getAllSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(getAllSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateSubscription
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.filter(
          (subscription) => subscription.id !== action.payload?.id
        );
        state.subscriptions.push(action.payload);
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteBlog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.filter(
          (subscription) => subscription.id !== action.payload
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
