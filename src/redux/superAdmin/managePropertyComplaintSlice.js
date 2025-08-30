// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../api/axios'; // Assuming you have a configured axios instance

// // Define the initial state for the slice
// const initialState = {
//   propertyComplaints: [],
//   loading: 'idle',
//   error: null,
// };
// // 📝 Async Thunk for creating a property complaint
// export const createPropertyComplaint = createAsyncThunk(
//   "propertyComplaint/createPropertyComplaint",
//   async ({ formData }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.post("/property-complaint", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );




// // Async Thunk for getting all property complaints for the logged-in user
// export const getPropertyComplaintsForUser = createAsyncThunk(
//   "propertyComplaint/getPropertyComplaintsForUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.get("/property-complaint/user", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Async Thunk for deleting a specific property complaint
// export const deletePropertyComplaint = createAsyncThunk(
//   "propertyComplaint/deletePropertyComplaint",
//   async (id, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.delete(`/property-complaint/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Async Thunk for getting all property complaints (for admin/superadmin)
// export const getAllPropertyComplaints = createAsyncThunk(
//   "propertyComplaint/getAllPropertyComplaints",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.get("/property-complaint", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Async Thunk for getting all property complaints for an office manager
// export const getPropertyComplaintsForOffice = createAsyncThunk(
//   "propertyComplaint/getPropertyComplaintsForOffice",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.get("/property-complaint/office", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Define the property complaint slice
// const propertyComplaintSlice = createSlice({
//   name: "propertyComplaint",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Handle getPropertyComplaintsForUser
//       .addCase(getPropertyComplaintsForUser.pending, (state) => {
//         state.loading = "pending";
//       })
//       .addCase(getPropertyComplaintsForUser.fulfilled, (state, action) => {
//         state.loading = "idle";
//         state.propertyComplaints = action.payload;
//         state.error = null;
//       })
//       .addCase(getPropertyComplaintsForUser.rejected, (state, action) => {
//         state.loading = "idle";
//         state.error = action.payload || "Failed to fetch complaints.";
//       })

//       // Handle deletePropertyComplaint
//       .addCase(deletePropertyComplaint.pending, (state) => {
//         state.loading = "pending";
//       })
//       .addCase(deletePropertyComplaint.fulfilled, (state, action) => {
//         state.loading = "idle";
//         state.propertyComplaints = state.propertyComplaints.filter(
//           (complaint) => complaint.id !== action.meta.arg
//         );
//         state.error = null;
//       })
//       .addCase(deletePropertyComplaint.rejected, (state, action) => {
//         state.loading = "idle";
//         state.error = action.payload || "Failed to delete complaint.";
//       })
      
//       // Handle getAllPropertyComplaints (for admin)
//       .addCase(getAllPropertyComplaints.pending, (state) => {
//         state.loading = "pending";
//       })
//       .addCase(getAllPropertyComplaints.fulfilled, (state, action) => {
//         state.loading = "idle";
//         state.propertyComplaints = action.payload;
//         state.error = null;
//       })
//       .addCase(getAllPropertyComplaints.rejected, (state, action) => {
//         state.loading = "idle";
//         state.error = action.payload || "Failed to fetch all complaints.";
//       })

//       // Handle getPropertyComplaintsForOffice
//       .addCase(getPropertyComplaintsForOffice.pending, (state) => {
//         state.loading = "pending";
//       })
//       .addCase(getPropertyComplaintsForOffice.fulfilled, (state, action) => {
//         state.loading = "idle";
//         state.propertyComplaints = action.payload;
//         state.error = null;
//       })
//       .addCase(getPropertyComplaintsForOffice.rejected, (state, action) => {
//         state.loading = "idle";
//         state.error = action.payload || "Failed to fetch office complaints.";
//       });
//   },
// });

// export default propertyComplaintSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Define the initial state for the slice
const initialState = {
  propertyComplaints: [],
  loading: 'idle',
  error: null,
};

// 📝 Async Thunk for creating a property complaint
export const createPropertyComplaint = createAsyncThunk(
  "propertyComplaint/createPropertyComplaint",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/property-complaint", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      // The backend returns a success message, but we need the new complaint data to update the state.
      // Assuming the backend is updated to return the created complaint object.
      // If the backend only returns a message, you may need to refetch the complaints list.
      return response.data.newComplaint || response.data; // Return the new complaint object
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for getting all property complaints for the logged-in user
export const getPropertyComplaintsForUser = createAsyncThunk(
  "propertyComplaint/getPropertyComplaintsForUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/property-complaint/user", {
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

// Async Thunk for deleting a specific property complaint
export const deletePropertyComplaint = createAsyncThunk(
  "propertyComplaint/deletePropertyComplaint",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.delete(`/property-complaint/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the ID of the deleted complaint
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for getting all property complaints (for admin/superadmin)
export const getAllPropertyComplaints = createAsyncThunk(
  "propertyComplaint/getAllPropertyComplaints",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/property-complaint", {
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

// Async Thunk for getting all property complaints for an office manager
export const getPropertyComplaintsForOffice = createAsyncThunk(
  "propertyComplaint/getPropertyComplaintsForOffice",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/property-complaint/office", {
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

// Define the property complaint slice
const propertyComplaintSlice = createSlice({
  name: "propertyComplaint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createPropertyComplaint
      .addCase(createPropertyComplaint.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createPropertyComplaint.fulfilled, (state, action) => {
        state.loading = "idle";
        state.propertyComplaints.push(action.payload); // Add the new complaint to the state
        state.error = null;
      })
      .addCase(createPropertyComplaint.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "Failed to create complaint.";
      })

      // Handle getPropertyComplaintsForUser
      .addCase(getPropertyComplaintsForUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getPropertyComplaintsForUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.propertyComplaints = action.payload;
        state.error = null;
      })
      .addCase(getPropertyComplaintsForUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "Failed to fetch complaints.";
      })

      // Handle deletePropertyComplaint
      .addCase(deletePropertyComplaint.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deletePropertyComplaint.fulfilled, (state, action) => {
        state.loading = "idle";
        state.propertyComplaints = state.propertyComplaints.filter(
          (complaint) => complaint.id !== action.meta.arg
        );
        state.error = null;
      })
      .addCase(deletePropertyComplaint.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "Failed to delete complaint.";
      })
      
      // Handle getAllPropertyComplaints (for admin)
      .addCase(getAllPropertyComplaints.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllPropertyComplaints.fulfilled, (state, action) => {
        state.loading = "idle";
        state.propertyComplaints = action.payload;
        state.error = null;
      })
      .addCase(getAllPropertyComplaints.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "Failed to fetch all complaints.";
      })

      // Handle getPropertyComplaintsForOffice
      .addCase(getPropertyComplaintsForOffice.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getPropertyComplaintsForOffice.fulfilled, (state, action) => {
        state.loading = "idle";
        state.propertyComplaints = action.payload;
        state.error = null;
      })
      .addCase(getPropertyComplaintsForOffice.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "Failed to fetch office complaints.";
      });
  },
});

export default propertyComplaintSlice.reducer;