// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";

// // Async thunk to fetch all property types
// export const fetchPropertyTypes = createAsyncThunk(
//   "propertyType/fetchPropertyTypes",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/property-type");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Async thunk to fetch all attributes
// export const fetchAttributes = createAsyncThunk(
//   "attribute/fetchAttributes",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/attribute");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const initialState = {
//   propertyTypes: [],
//   attributes: [],
//   loading: false,
//   error: null,
// };

// const propertyTypeSlice = createSlice({
//   name: "propertyType",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Property Types
//       .addCase(fetchPropertyTypes.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPropertyTypes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.propertyTypes = action.payload;
//       })
//       .addCase(fetchPropertyTypes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch Attributes
//       .addCase(fetchAttributes.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAttributes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.attributes = action.payload;
//       })
//       .addCase(fetchAttributes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default propertyTypeSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// === ASYNC THUNKS FOR PROPERTY TYPES ===

// Fetch all property types
export const fetchPropertyTypes = createAsyncThunk(
  "propertyType/fetchPropertyTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/property-type");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a property type
export const createPropertyType = createAsyncThunk(
  "propertyType/createPropertyType",
  async (newPropertyType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/property-type", newPropertyType, {
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

// Update a property type
export const updatePropertyType = createAsyncThunk(
  "propertyType/updatePropertyType",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.put(`/property-type/${id}`, updatedData, {
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

// Delete a property type
export const deletePropertyType = createAsyncThunk(
  "propertyType/deletePropertyType",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      await api.delete(`/property-type/${id}`, {
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
  propertyTypes: [],
  attributes: [],
  loading: false,
  error: null,
};

const propertyTypeSlice = createSlice({
  name: "propertyType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Property Types
      .addCase(fetchPropertyTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyTypes = action.payload;
      })
      .addCase(fetchPropertyTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Property Type
      .addCase(createPropertyType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPropertyType.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyTypes.push(action.payload);
      })
      .addCase(createPropertyType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Property Type
      .addCase(updatePropertyType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePropertyType.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.propertyTypes.findIndex(
          (pt) => pt.id === action.payload.id
        );
        if (index !== -1) {
          state.propertyTypes[index] = action.payload;
        }
      })
      .addCase(updatePropertyType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Property Type
      .addCase(deletePropertyType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePropertyType.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyTypes = state.propertyTypes.filter(
          (pt) => pt.id !== action.payload
        );
      })
      .addCase(deletePropertyType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === ATTRIBUTE REDUCERS ===
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
      });
  },
});

export default propertyTypeSlice.reducer;
