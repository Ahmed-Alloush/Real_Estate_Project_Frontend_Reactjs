import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/**
 * @typedef {object} DailyStats
 * @property {string} date
 * @property {number} totalAmount
 * @property {number} transactionCount
 */

/**
 * @typedef {object} WeeklyStats
 * @property {number} week
 * @property {number} year
 * @property {number} totalAmount
 * @property {number} transactionCount
 */

/**
 * @typedef {object} MonthlyStats
 * @property {string} month
 * @property {number} totalAmount
 * @property {number} transactionCount
 */

/**
 * @typedef {object} YearlyStats
 * @property {number} year
 * @property {number} totalAmount
 * @property {number} transactionCount
 */

/**
 * @typedef {object} OperationStats
 * @property {string} operationType
 * @property {number} totalAmount
 * @property {number} transactionCount
 */

/**
 * @typedef {object} CombinedStats
 * @property {DailyStats[]} dailyStats
 * @property {WeeklyStats[]} weeklyStats
 * @property {MonthlyStats[]} monthlyStats
 * @property {YearlyStats[]} yearlyStats
 * @property {OperationStats[]} operationTypeStats
 */

const initialState = {
  generalStats: null,
  subscriptionStats: null,
  propertyStats: null,
  loading: "idle",
  error: null,
};

// Async thunks for each API endpoint

export const fetchGeneralStats = createAsyncThunk(
  "statistics/fetchGeneralStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/statistics/general");
      return response.data;
    } catch (error) {
      // It's good practice to access the error's response object if it exists
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSubscriptionStats = createAsyncThunk(
  "statistics/fetchSubscriptionStats",
  async (_, { rejectWithValue }) => {
    try {
      
      const response = await api.get("/statistics/subscription");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPropertyStats = createAsyncThunk(
  "statistics/fetchPropertyStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/statistics/property");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPropertyTimeStats = createAsyncThunk(
  "statistics/fetchPropertyTimeStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/statistics/property-time");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPropertyOperationTypeStats = createAsyncThunk(
  "statistics/fetchPropertyOperationTypeStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/statistics/property-operation-type");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // General Stats
      .addCase(fetchGeneralStats.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchGeneralStats.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.generalStats = action.payload;
        state.error = null;
      })
      .addCase(fetchGeneralStats.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      // Subscription Stats
      .addCase(fetchSubscriptionStats.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchSubscriptionStats.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.subscriptionStats = action.payload;
        state.error = null;
      })
      .addCase(fetchSubscriptionStats.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      // Property Stats
      .addCase(fetchPropertyStats.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchPropertyStats.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.propertyStats = action.payload;
        state.error = null;
      })
      .addCase(fetchPropertyStats.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export default statisticsSlice.reducer;