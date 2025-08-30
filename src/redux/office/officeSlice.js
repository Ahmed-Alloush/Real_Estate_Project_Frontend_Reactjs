import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// CREATE Office
export const createOffice = createAsyncThunk(
  "office/createOffice",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/office/create-office", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch all offices (with pagination)
export const getAllOffices = createAsyncThunk(
  "office/getAllOffices",
  async (paginationData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/office", {
        params: {
          page: paginationData.page || 1,
          limit: paginationData.limit || 10,
        },
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

// Fetch Favorite Offices
export const fetchFavoriteOffices = createAsyncThunk(
  "office/fetchFavoriteOffices",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(`/favorite-office`, {
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

// CREATE Favorite Office
export const createFavoriteOffice = createAsyncThunk(
  "office/createFavoriteOffice",
  async (officeId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post(
        `/favorite-office`,
        { officeId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // The backend should return the newly created favorite office object
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a favorite office by ID
export const deleteFavoriteOffice = createAsyncThunk(
  "office/deleteFavoriteOffice",
  async (officeId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.delete(`/favorite-office/${officeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Return the officeId to update the state correctly
      return officeId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete all favorite offices
export const deleteAllFavoriteOffices = createAsyncThunk(
  "office/deleteAllFavoriteOffices",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.delete(`/favorite-office/allOffices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Return a signal to clear all favorite offices from the state
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// GET ONE Office
export const getOfficeById = createAsyncThunk(
  "office/getOne",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/office/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE Office
export const updateOffice = createAsyncThunk(
  "office/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.put(`/office/${id}`, data, {
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

// DELETE Office
export const deleteOffice = createAsyncThunk(
  "office/delete",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.delete(`/office/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET the office assigned to the logged-in user
export const getUserOffice = createAsyncThunk(
  "office/getUserOffice",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/office/user-office", {
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

// SLICE
const officeSlice = createSlice({
  name: "office",
  initialState: {
    loading: false,
    error: null,
    message: null,
    success: false,
    offices: [],
    favoriteOffices: [],
    favoriteOfficesLoading: false,
    favoriteOfficesError: null,
    selectedOffice: null,
    UserOffice: null,
    officePagination: {
      page: 1,
      limit: 10,
      total: 0,
      pageCount: 1,
    },
  },
  reducers: {
    clearOfficeState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.selectedOffice = null;
      state.UserOffice = null;
    },
    setPage: (state, action) => {
      state.officePagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createOffice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOffice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message;
      })
      .addCase(createOffice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Get all offices with pagination
      .addCase(getAllOffices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOffices.fulfilled, (state, action) => {
        state.loading = false;
        state.offices = action.payload.data;
        console.log("this is from the getAllOffices.fulfilled : ",action.payload);
        
        state.officePagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          pageCount: action.payload.pageCount,
        };
      })
      .addCase(getAllOffices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Favorite Offices
      .addCase(fetchFavoriteOffices.pending, (state) => {
        state.favoriteOfficesLoading = true;
        state.favoriteOfficesError = null;
      })
      .addCase(fetchFavoriteOffices.fulfilled, (state, action) => {
        state.favoriteOfficesLoading = false;
        state.favoriteOffices = action.payload;
      })
      .addCase(fetchFavoriteOffices.rejected, (state, action) => {
        state.favoriteOfficesLoading = false;
        state.favoriteOfficesError = action.payload;
      })

      // CREATE Favorite Office
      .addCase(createFavoriteOffice.pending, (state) => {
        state.favoriteOfficesLoading = true;
        state.favoriteOfficesError = null;
      })
      .addCase(createFavoriteOffice.fulfilled, (state, action) => {
        state.favoriteOfficesLoading = false;
        // The backend should return the full favorite object
        state.favoriteOffices.push(action.payload);
      })
      .addCase(createFavoriteOffice.rejected, (state, action) => {
        state.favoriteOfficesLoading = false;
        state.favoriteOfficesError = action.payload;
      })

      // Delete Favorite Office By OfficeId
      .addCase(deleteFavoriteOffice.pending, (state) => {
        state.favoriteOfficesLoading = true;
        state.favoriteOfficesError = null;
      })
      .addCase(deleteFavoriteOffice.fulfilled, (state, action) => {
        state.favoriteOfficesLoading = false;
        const deletedOfficeId = action.payload;
        state.favoriteOffices = state.favoriteOffices.filter(
          (fav) => fav.office.id !== deletedOfficeId
        );
      })
      .addCase(deleteFavoriteOffice.rejected, (state, action) => {
        state.favoriteOfficesLoading = false;
        state.favoriteOfficesError = action.payload;
      })

      // Delete All Favorite Offices
      .addCase(deleteAllFavoriteOffices.pending, (state) => {
        state.favoriteOfficesLoading = true;
        state.favoriteOfficesError = null;
      })
      .addCase(deleteAllFavoriteOffices.fulfilled, (state) => {
        state.favoriteOfficesLoading = false;
        state.favoriteOffices = []; // Clear the array
      })
      .addCase(deleteAllFavoriteOffices.rejected, (state, action) => {
        state.favoriteOfficesLoading = false;
        state.favoriteOfficesError = action.payload;
      })

      // Get One
      .addCase(getOfficeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOfficeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOffice = action.payload;
      })
      .addCase(getOfficeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateOffice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOffice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.offices = state.offices.map((office) =>
        //   office.id === action.payload.id ? action.payload : office
        // );
        state.message = action.payload?.message;
      })
      .addCase(updateOffice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get user office
      .addCase(getUserOffice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOffice.fulfilled, (state, action) => {
        state.loading = false;
        state.UserOffice = action.payload;
      })
      .addCase(getUserOffice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteOffice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOffice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.offices = state.offices.filter(
          (office) => office.id !== action.payload
        );
      })
      .addCase(deleteOffice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOfficeState, setPage } = officeSlice.actions;

export default officeSlice.reducer;
