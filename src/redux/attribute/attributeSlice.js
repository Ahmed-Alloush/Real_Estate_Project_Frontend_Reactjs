import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// === ASYNC THUNKS FOR ATTRIBUTES ===

// Fetch all attributes
export const fetchAttributes = createAsyncThunk(
  "attribute/fetchAttributes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/attribute");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create an attribute
export const createAttribute = createAsyncThunk(
  "attribute/createAttribute",
  async (newAttribute, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/attribute", newAttribute, {
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

// Link Attributes to a Property Type
export const linkAttributesToPropertyType = createAsyncThunk(
  "attribute/linkAttributesToPropertyType",
  async ({ data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/attribute/link-attributes-to-propertyType", data, {
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

// Update an attribute
export const updateAttribute = createAsyncThunk(
  "attribute/updateAttribute",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.put(`/attribute/${id}`, updatedData, {
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

// Delete an attribute
export const deleteAttribute = createAsyncThunk(
  "attribute/deleteAttribute",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.delete(`/attribute/${id}`, {
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

// === INITIAL STATE AND SLICE ===

const initialState = {
  attributes: [],
  loading: false,
  error: null,
};

const attributeSlice = createSlice({
  name: "attribute",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Attributes
      .addCase(fetchAttributes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttributes.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = action.payload;
      })
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Attribute
      .addCase(createAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes.push(action.payload);
      })
      .addCase(createAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Attribute
      .addCase(updateAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttribute.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.attributes.findIndex(
          (attr) => attr.id === action.payload.id
        );
        if (index !== -1) {
          state.attributes[index] = action.payload;
        }
      })
      .addCase(updateAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Attribute
      .addCase(deleteAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = state.attributes.filter(
          (attr) => attr.id !== action.payload
        );
      })
      .addCase(deleteAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Link Attributes to Property Type
      .addCase(linkAttributesToPropertyType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(linkAttributesToPropertyType.fulfilled, (state, action) => {
        state.loading = false;
        // The action payload here is the response from the link operation.
        // You might want to update the relevant property type in your propertyTypeSlice,
        // but for this slice, we just know the operation was successful.
      })
      .addCase(linkAttributesToPropertyType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attributeSlice.reducer;