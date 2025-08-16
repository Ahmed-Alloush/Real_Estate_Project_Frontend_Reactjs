import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Async Thunks for CRUD Operations
// ----------------------------------------------------

/**
 * Fetches all license types from the API.
 * @returns An array of license type objects.
 */
export const fetchLicenseTypes = createAsyncThunk(
  "licenseType/fetchLicenseTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/license-types");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Creates a new license type.
 * @param {object} newLicenseType - The data for the new license type.
 * @returns The newly created license type object.
 */
export const createLicenseType = createAsyncThunk(
  "licenseType/createLicenseType",
  async (newLicenseType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/license-types", newLicenseType, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Updates an existing license type.
 * @param {string} id - The ID of the license type to update.
 * @param {object} updatedData - The new data for the license type.
 * @returns The updated license type object.
 */
export const updateLicenseType = createAsyncThunk(
  "licenseType/updateLicenseType",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.put(`/license-types/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Deletes a license type by its ID.
 * @param {string} id - The ID of the license type to delete.
 * @returns The ID of the deleted license type.
 */
export const deleteLicenseType = createAsyncThunk(
  "licenseType/deleteLicenseType",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.delete(`/license-types/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice Definition
// ----------------------------------------------------

const initialState = {
  licenseTypes: [],
  loading: false,
  error: null,
};

const licenseTypeSlice = createSlice({
  name: "licenseType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching all license types
      .addCase(fetchLicenseTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLicenseTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.licenseTypes = action.payload;
      })
      .addCase(fetchLicenseTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle creating a new license type
      .addCase(createLicenseType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLicenseType.fulfilled, (state, action) => {
        state.loading = false;
        state.licenseTypes.push(action.payload);
      })
      .addCase(createLicenseType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updating a license type
      .addCase(updateLicenseType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLicenseType.fulfilled, (state, action) => {
        state.loading = false;
        const updatedType = action.payload;
        const index = state.licenseTypes.findIndex(
          (type) => type.id === updatedType.id
        );
        if (index !== -1) {
          state.licenseTypes[index] = updatedType;
        }
      })
      .addCase(updateLicenseType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleting a license type
      .addCase(deleteLicenseType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLicenseType.fulfilled, (state, action) => {
        state.loading = false;
        state.licenseTypes = state.licenseTypes.filter(
          (type) => type.id !== action.payload
        );
      })
      .addCase(deleteLicenseType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default licenseTypeSlice.reducer;