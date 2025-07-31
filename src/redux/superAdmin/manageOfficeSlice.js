// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import api from "../../api/axios";

// // // GET ALL OFFICES
// // export const getAllOfficesWhichAreStillNotAcceptedYet = createAsyncThunk(
// //   "superAdmin/getAllOffices",
// //   async (_, thunkAPI) => {
// //     try {
// //       const token = localStorage.getItem("accessToken");
// //       const response = await api.get(
// //         "/office/get-all-offices-which-are-still-not-accepted",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       return response.data;
// //     } catch (err) {
// //       return thunkAPI.rejectWithValue(err.response?.data || err.message);
// //     }
// //   }
// // );


// // // UPDATE STATUS
// // export const  updateStatus = createAsyncThunk(
// //   "superAdmin/updateUser",
// //   async ({ id, data }, thunkAPI) => {
// //     try {
// //       const token = localStorage.getItem("accessToken");
// //       const response = await api.put(`/office/status/${id}`, data, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       return response.data;
// //     } catch (err) {
// //       return thunkAPI.rejectWithValue(err.response?.data || err.message);
// //     }
// //   }
// // );





// // const manageOfficeSlice = createSlice({
// //   name: "manageUser",
// //   initialState: {
// //     loading: false,
// //     error: null,
// //     offices: [],
// //   },
// //   reducers: {
// //     resetStatus(state) {
// //       state.loading = false;
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     // GET ALL OFFICES
// //     builder
// //       .addCase(getAllOfficesWhichAreStillNotAcceptedYet.pending, (state) => {
// //         state.loading = true;
// //         // state.error = null;
// //       })
// //       .addCase(
// //         getAllOfficesWhichAreStillNotAcceptedYet.fulfilled,
// //         (state, action) => {
// //           state.loading = false;
// //           state.offices = action.payload;
// //         }
// //       )
// //       .addCase(
// //         getAllOfficesWhichAreStillNotAcceptedYet.rejected,
// //         (state, action) => {
// //           state.loading = false;
// //           state.error = action.payload;
// //         }
// //       );

  
// //   },
// // });

// // // export const { resetStatus } = manageOfficeSlice.actions;

// // export default manageOfficeSlice.reducer;





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";

// // GET ALL OFFICES WHICH ARE STILL NOT ACCEPTED YET
// export const getAllOfficesWhichAreStillNotAcceptedYet = createAsyncThunk(
//   "superAdmin/getAllOfficesWhichAreStillNotAcceptedYet", // Renamed for clarity in thunk type
//   async (_, thunkAPI) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.get(
//         "/office/get-all-offices-which-are-still-not-accepted",
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

// // UPDATE OFFICE STATUS (ACCEPT/REJECT)
// export const updateOfficeStatus = createAsyncThunk( // Renamed to be more specific
//   "superAdmin/updateOfficeStatus",
//   async ({ officeId, status }, thunkAPI) => { // Destructure officeId and status
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.put(
//         `/office/status/${officeId}`, // Use officeId here
//         { status }, // Send the status in the request body
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json", // Explicitly set content type for JSON body
//           },
//         }
//       );
//       return response.data; // Return the updated office data (or a success message)
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const manageOfficeSlice = createSlice({
//   name: "manageOffice", // Changed from "manageUser" for consistency with store.js
//   initialState: {
//     loading: false,
//     statusUpdateLoading: false, // New loading state for status updates
//     error: null,
//     offices: [],
//     success: false, // Optional: for showing success messages after actions
//   },
//   reducers: {
//     resetStatus(state) {
//       state.loading = false;
//       state.statusUpdateLoading = false;
//       state.error = null;
//       state.success = false;
//     },
//     // You might want a reducer to remove an office from the list after approval/rejection
//     removeOfficeFromList(state, action) {
//       state.offices = state.offices.filter(office => office.id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     // GET ALL OFFICES Which Are Still Not Accepted Yet
//     builder
//       .addCase(getAllOfficesWhichAreStillNotAcceptedYet.pending, (state) => {
//         state.loading = true;
//         state.error = null; // Clear previous errors
//       })
//       .addCase(getAllOfficesWhichAreStillNotAcceptedYet.fulfilled, (state, action) => {
//         state.loading = false;
//         state.offices = action.payload; // Assuming payload is the array of offices
//         state.error = null;
//       })
//       .addCase(getAllOfficesWhichAreStillNotAcceptedYet.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.offices = []; // Clear offices on error
//       });

//     // UPDATE OFFICE STATUS
//     builder
//       .addCase(updateOfficeStatus.pending, (state) => {
//         state.statusUpdateLoading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updateOfficeStatus.fulfilled, (state, action) => {
//         state.statusUpdateLoading = false;
//         state.success = true;
//         // Optional: Update the specific office in the state or remove it if accepted/rejected
//         // If you're showing *only* pending offices, you'll remove it from the list
//         // `action.meta.arg.officeId` holds the ID passed to the thunk
//         state.offices = state.offices.filter(
//           (office) => office.id !== action.meta.arg.officeId
//         );
//         state.error = null;
//         // You might want to display a success message here
//       })
//       .addCase(updateOfficeStatus.rejected, (state, action) => {
//         state.statusUpdateLoading = false;
//         state.error = action.payload;
//         state.success = false;
//       });

//     // You would typically also add cases for deleteOffice if it modifies this slice's state
//     // but since it's from officeSlice, it might handle its own state updates.
//     // If deleteOffice needs to remove an item from this `offices` array, you'd add:
//     // builder.addCase(deleteOffice.fulfilled, (state, action) => {
//     //   state.offices = state.offices.filter(office => office.id !== action.meta.arg);
//     // });
//   },
// });

// export const { resetStatus, removeOfficeFromList } = manageOfficeSlice.actions;

// export default manageOfficeSlice.reducer;









import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// GET ALL OFFICES WHICH ARE STILL NOT ACCEPTED YET (WITH PAGINATION)
export const getAllOfficesWhichAreStillNotAcceptedYet = createAsyncThunk(
  "superAdmin/getAllOfficesWhichAreStillNotAcceptedYet", // Renamed for clarity in thunk type
  async ({ page, limit }, thunkAPI) => { // Accept pagination parameters
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(
        "/office/get-all-offices-which-are-still-not-accepted",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page, // Send the page number to the backend
            limit, // Send the limit per page
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE OFFICE STATUS (ACCEPT/REJECT)
export const updateOfficeStatus = createAsyncThunk( // Renamed to be more specific
  "superAdmin/updateOfficeStatus",
  async ({ officeId, status }, thunkAPI) => { // Destructure officeId and status
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.put(
        `/office/status/${officeId}`, // Use officeId here
        { status }, // Send the status in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Explicitly set content type for JSON body
          },
        }
      );
      return response.data; // Return the updated office data (or a success message)
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const manageOfficeSlice = createSlice({
  name: "manageOffice", // Changed from "manageUser" for consistency with store.js
  initialState: {
    loading: false,
    statusUpdateLoading: false, // New loading state for status updates
    error: null,
    offices: [],
    success: false, // Optional: for showing success messages after actions
    pagination: {
      page: 1, // Current page
      limit: 10, // Number of offices per page
      total: 0, // Total number of offices
      pageCount: 1, // Total number of pages
    },
  },
  reducers: {
    resetStatus(state) {
      state.loading = false;
      state.statusUpdateLoading = false;
      state.error = null;
      state.success = false;
    },
    // You might want a reducer to remove an office from the list after approval/rejection
    removeOfficeFromList(state, action) {
      state.offices = state.offices.filter(office => office.id !== action.payload);
    },
    // Action to set pagination info
    setPage: (state, action) => {
      const { page, limit } = action.payload;
      state.pagination.page = page;
    },
  },
  extraReducers: (builder) => {
    // GET ALL OFFICES Which Are Still Not Accepted Yet
    builder
      .addCase(getAllOfficesWhichAreStillNotAcceptedYet.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(getAllOfficesWhichAreStillNotAcceptedYet.fulfilled, (state, action) => {
        state.loading = false;
        state.offices = action.payload.data; // Assuming payload is the array of offices
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          pageCount: action.payload.pageCount,
        };
        state.error = null;
      })
      .addCase(getAllOfficesWhichAreStillNotAcceptedYet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.offices = []; // Clear offices on error
      });

    // UPDATE OFFICE STATUS
    builder
      .addCase(updateOfficeStatus.pending, (state) => {
        state.statusUpdateLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateOfficeStatus.fulfilled, (state, action) => {
        state.statusUpdateLoading = false;
        state.success = true;
        // Optional: Update the specific office in the state or remove it if accepted/rejected
        state.offices = state.offices.filter(
          (office) => office.id !== action.meta.arg.officeId
        );
        state.error = null;
      })
      .addCase(updateOfficeStatus.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetStatus, removeOfficeFromList, setPage } = manageOfficeSlice.actions;

export default manageOfficeSlice.reducer;
