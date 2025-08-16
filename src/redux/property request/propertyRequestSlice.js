import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Helper: Set token dynamically
const setAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Helper: For file upload
const setMultipartHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

// CREATE property request (with file upload)
export const createPropertyRequest = createAsyncThunk(
  "propertyRequest/create",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/property-request",
        formData,
        setMultipartHeader()
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

// GET all property requests
export const fetchAllPropertyRequests = createAsyncThunk(
  "propertyRequest/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/property-request", setAuthHeader());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// GET property request by ID
export const fetchPropertyRequestById = createAsyncThunk(
  "propertyRequest/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/property-request/${id}`, setAuthHeader());
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch by ID failed"
      );
    }
  }
);

// DELETE property request
export const deletePropertyRequest = createAsyncThunk(
  "propertyRequest/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/property-request/${id}`, setAuthHeader());
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// PATCH by Admin
export const updatePropertyRequestByAdmin = createAsyncThunk(
  "propertyRequest/updateByAdmin",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `/property-request/admin/${id}`,
        updateData,
        setAuthHeader()
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update by Admin failed"
      );
    }
  }
);

const initialState = {
  propertyRequests: [],
  selectedRequest: null,
  loading: false,
  error: null,
  deleteLoading: false,
  deleteError: null,
  updateLoading: false,
  updateError: null,
  rejectLoading: false,
  rejectError: null,
};

const propertyRequestSlice = createSlice({
  name: "propertyRequest",
  initialState,
  reducers: {
    resetPropertyRequestState: (state) => {
      state.selectedRequest = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPropertyRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPropertyRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyRequests.push(action.payload);
      })
      .addCase(createPropertyRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllPropertyRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPropertyRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyRequests = action.payload;
      })
      .addCase(fetchAllPropertyRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPropertyRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRequest = action.payload;
      })
      .addCase(fetchPropertyRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletePropertyRequest.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deletePropertyRequest.fulfilled, (state, action) => {
        state.propertyRequests = state.propertyRequests.filter(
          (req) => req.id !== action.payload
        );
        state.deleteLoading = false;
      })
      .addCase(deletePropertyRequest.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload;
      })

      .addCase(updatePropertyRequestByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePropertyRequestByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        // const index = state.propertyRequests.findIndex(
        //   (r) => r.id === action.payload.id
        // );
        // if (index !== -1) state.propertyRequests[index] = action.payload;
      })
      .addCase(updatePropertyRequestByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPropertyRequestState } = propertyRequestSlice.actions;

export default propertyRequestSlice.reducer;
