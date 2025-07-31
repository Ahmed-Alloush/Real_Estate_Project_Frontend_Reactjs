import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../api/axios";

// Async Thunk for making a reservation
export const makeReservation = createAsyncThunk(
  'reservation/makeReservation',
  async ({ propertyId, paymentData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/reservation/${propertyId}`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Use rejectWithValue to return a meaningful error to the extraReducers
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservation: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    // Action to clear reservation state, useful after a successful reservation
    clearReservationStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.reservation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(makeReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload;
        state.success = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(makeReservation.rejected, (state, action) => {
        state.loading = false;
        state.reservation = null;
        state.error = action.payload || 'Failed to make reservation';
        state.success = false;
      });
  },
});

export const { clearReservationStatus } = reservationSlice.actions;

export default reservationSlice.reducer;