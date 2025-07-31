import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ------------------- CREATE OFFICE SUBSCRIPTION
export const createOfficeSubscription = createAsyncThunk(
  "officeSubscription/createOfficeSubscription",
  async ( data , thunkAPI) => {
    try {
      console.log("data",data);
      
      const token = localStorage.getItem("accessToken");
      const response = await api.post(`/office-subscription`, data, {
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

const officeSubscriptionSlice = createSlice({
  name: "officeSubscription",
  initialState: {
    loading: false,
    error: null,
    success: false,
    officeSubscription: null,
  },
  reducers: {
    resetOfficeSubscriptionState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // create
      .addCase(createOfficeSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOfficeSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.officeSubscription = action.payload;
      })
      .addCase(createOfficeSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const { resetOfficeSubscriptionState } = officeSubscriptionSlice.actions;
export default officeSubscriptionSlice.reducer;
