// // src/redux/superAdmin/managePropertySlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";

// // GET ALL PENDING PROPERTIES
// export const getAllPendingProperties = createAsyncThunk(
//   "superAdmin/getAllPendingProperties",
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.get(
//         "/property/get-all-properties-which-are-still-not-accepted", // Adjust API endpoint
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // GET ALL PROPERTIES (Optional, for showing all properties regardless of status)
// export const getAllProperties = createAsyncThunk(
//   "superAdmin/getAllProperties",
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.get(
//         "/property/get-all-properties", // Adjust API endpoint for all properties
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );


// // UPDATE PROPERTY STATUS (ACCEPT/REJECT)
// export const updatePropertyStatus = createAsyncThunk(
//   "superAdmin/updatePropertyStatus",
//   async ({ propertyId, status }, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.put(
//         `/property/status/${propertyId}`, // Adjust API endpoint
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data; // Return the updated property data
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // DELETE PROPERTY
// export const deleteProperty = createAsyncThunk(
//   "superAdmin/deleteProperty",
//   async (propertyId, thunkAPI) => { // Takes propertyId directly
//     try {
//       const token = localStorage.getItem("accessToken");
//       await api.delete(
//         `/property/delete/${propertyId}`, // Adjust API endpoint
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return propertyId; // Return the ID of the deleted property for state update
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const managePropertySlice = createSlice({
//   name: "manageProperty",
//   initialState: {
//     loading: false, // For initial fetch of properties
//     statusUpdateLoading: false, // For approve/reject operations
//     deleteLoading: false, // For delete operation
//     error: null,
//     properties: [], // Changed from 'offices' to 'properties'
//     success: false,
//   },
//   reducers: {
//     resetStatus(state) {
//       state.loading = false;
//       state.statusUpdateLoading = false;
//       state.deleteLoading = false;
//       state.error = null;
//       state.success = false;
//     },
//     // Optional: add a specific reducer to update a property's status in the list
//     // This can be useful if you're not refetching the entire list
//     updatePropertyInList(state, action) {
//       const { propertyId, newStatus } = action.payload;
//       const index = state.properties.findIndex(p => p.id === propertyId);
//       if (index !== -1) {
//         state.properties[index].status = newStatus;
//       }
//     }
//   },
//   extraReducers: (builder) => {
//     // GET ALL PENDING PROPERTIES
//     builder
//       .addCase(getAllPendingProperties.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllPendingProperties.fulfilled, (state, action) => {
//         state.loading = false;
//         state.properties = action.payload; // Store properties
//         state.error = null;
//       })
//       .addCase(getAllPendingProperties.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.properties = [];
//       })
//       // GET ALL PROPERTIES (if you implement this)
//       .addCase(getAllProperties.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllProperties.fulfilled, (state, action) => {
//         state.loading = false;
//         state.properties = action.payload;
//         state.error = null;
//       })
//       .addCase(getAllProperties.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.properties = [];
//       })
//       // UPDATE PROPERTY STATUS
//       .addCase(updatePropertyStatus.pending, (state) => {
//         state.statusUpdateLoading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updatePropertyStatus.fulfilled, (state, action) => {
//         state.statusUpdateLoading = false;
//         state.success = true;
//         // Remove the property from the list if it's no longer 'pending'
//         // If you're showing all properties, you might just update the status
//         state.properties = state.properties.filter(
//           (property) => property.id !== action.meta.arg.propertyId
//         );
//         state.error = null;
//       })
//       .addCase(updatePropertyStatus.rejected, (state, action) => {
//         state.statusUpdateLoading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       // DELETE PROPERTY
//       .addCase(deleteProperty.pending, (state) => {
//         state.deleteLoading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(deleteProperty.fulfilled, (state, action) => {
//         state.deleteLoading = false;
//         state.success = true;
//         // Remove the deleted property from the state
//         state.properties = state.properties.filter(
//           (property) => property.id !== action.payload // action.payload is the propertyId returned
//         );
//         state.error = null;
//       })
//       .addCase(deleteProperty.rejected, (state, action) => {
//         state.deleteLoading = false;
//         state.error = action.payload;
//         state.success = false;
//       });
//   },
// });

// export const { resetStatus, updatePropertyInList } = managePropertySlice.actions; // Exporting updatePropertyInList

// export default managePropertySlice.reducer;





import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// GET ALL PENDING PROPERTIES WITH PAGINATION
export const getAllPendingProperties = createAsyncThunk(
  "superAdmin/getAllPendingProperties",
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(
        `/property/get-all-properties-which-are-still-not-accepted?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Should include: items, pagination metadata (page, totalPages, etc.)
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET ALL PROPERTIES WITH PAGINATION
export const getAllProperties = createAsyncThunk(
  "superAdmin/getAllProperties",
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(
        `/property/get-all-properties?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE PROPERTY STATUS (ACCEPT/REJECT)
export const updatePropertyStatus = createAsyncThunk(
  "superAdmin/updatePropertyStatus",
  async ({ propertyId, status }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.put(
        `/property/status/${propertyId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// DELETE PROPERTY
export const deleteProperty = createAsyncThunk(
  "superAdmin/deleteProperty",
  async (propertyId, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.delete(`/property/delete/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return propertyId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const managePropertySlice = createSlice({
  name: "manageProperty",
  initialState: {
    loading: false,
    statusUpdateLoading: false,
    deleteLoading: false,
    error: null,
    properties: [],
    success: false,

    // Pagination states
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pageCount: 1,
    },
  },
  reducers: {
    resetStatus(state) {
      state.loading = false;
      state.statusUpdateLoading = false;
      state.deleteLoading = false;
      state.error = null;
      state.success = false;
    },
    updatePropertyInList(state, action) {
      const { propertyId, newStatus } = action.payload;
      const index = state.properties.findIndex(p => p.id === propertyId);
      if (index !== -1) {
        state.properties[index].status = newStatus;
      }
    },
    setPage(state, action) {
      const { page, limit } = action.payload;
      state.pagination.page = page;
      if (limit) state.pagination.limit = limit;
    },
  },
  extraReducers: (builder) => {
    // GET ALL PENDING PROPERTIES
    builder
      .addCase(getAllPendingProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPendingProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          pageCount: action.payload.pageCount,
        };
        state.error = null;
      })
      .addCase(getAllPendingProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.properties = [];
      })
      // GET ALL PROPERTIES
      .addCase(getAllProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          pageCount: action.payload.pageCount,
        };
        state.error = null;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.properties = [];
      })
      // UPDATE PROPERTY STATUS
      .addCase(updatePropertyStatus.pending, (state) => {
        state.statusUpdateLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePropertyStatus.fulfilled, (state, action) => {
        state.statusUpdateLoading = false;
        state.success = true;
        state.properties = state.properties.filter(
          (property) => property.id !== action.meta.arg.propertyId
        );
        state.error = null;
      })
      .addCase(updatePropertyStatus.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // DELETE PROPERTY
      .addCase(deleteProperty.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.success = true;
        state.properties = state.properties.filter(
          (property) => property.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetStatus, updatePropertyInList, setPage } = managePropertySlice.actions;

export default managePropertySlice.reducer;
