import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// 📝 Initial state should be specific to complaints
const initialState = {
  complaints: [],
  loading: "idle",
  error: null,
};

// 📝 Thunk for creating a new complaint
export const createOfficeComplaint = createAsyncThunk(
  "manageOfficeComplaint/createOfficeComplaint",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/office-complaint", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 📝 Thunk for getting all complaints
export const getAllOfficeComplaints = createAsyncThunk(
  "manageOfficeComplaint/getAllOfficeComplaints",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/office-complaint", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 📝 Thunk for getting a single complaint for a specific office
export const getOfficeComplaintForOffice = createAsyncThunk(
  "manageOfficeComplaint/getOfficeComplaintForOffice",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/office-complaint/office", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 📝 Thunk for getting a single complaint for a specific user
export const getOfficeComplaintForUser = createAsyncThunk(
  "manageOfficeComplaint/getOfficeComplaintForUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/office-complaint/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ⚠️ FIXED: Changed method from `api.get` to `api.delete` and corrected the URL to include the ID.
export const deleteOfficeComplaint = createAsyncThunk(
  "manageOfficeComplaint/deleteOfficeComplaint",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.delete(`/office-complaint/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 📝 Added extra reducers to handle the state changes based on thunk actions.
const manageOfficeComplaintSlice = createSlice({
  name: "manageOfficeComplaint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getAllOfficeComplaints
      .addCase(getAllOfficeComplaints.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllOfficeComplaints.fulfilled, (state, action) => {
        state.loading = "idle";
        state.complaints = action.payload; // Assuming the payload is an array of complaints
        state.error = null;
      })
      .addCase(getAllOfficeComplaints.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "Failed to fetch complaints.";
      })

      // Handle createOfficeComplaint
      .addCase(createOfficeComplaint.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createOfficeComplaint.fulfilled, (state, action) => {
        state.loading = "idle";
        state.complaints.push(action.payload); // Add the new complaint to the array
        state.error = null;
      })
      .addCase(createOfficeComplaint.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "Failed to create complaint.";
      })

      // Handle deleteOfficeComplaint
      .addCase(deleteOfficeComplaint.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteOfficeComplaint.fulfilled, (state, action) => {
        state.loading = "idle";
        // Filter out the deleted complaint from the array
        state.complaints = state.complaints.filter(
          (complaint) => complaint.id !== action.meta.arg // The ID is in meta.arg
        );
        state.error = null;
      })
      .addCase(deleteOfficeComplaint.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "Failed to delete complaint.";
      })

      // Handle getOfficeComplaintForOffice
      .addCase(getOfficeComplaintForOffice.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getOfficeComplaintForOffice.fulfilled, (state, action) => {
        state.loading = "idle";
        state.complaints = action.payload;
        state.error = null;
      })
      .addCase(getOfficeComplaintForOffice.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "Failed to fetch complaints for office.";
      })

      // Handle getOfficeComplaintForUser
      .addCase(getOfficeComplaintForUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getOfficeComplaintForUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.complaints = action.payload;
        state.error = null;
      })
      .addCase(getOfficeComplaintForUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "Failed to fetch complaints for user.";
      });
  },
});

export default manageOfficeComplaintSlice.reducer;