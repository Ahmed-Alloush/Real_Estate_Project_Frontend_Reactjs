import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ----------------------
// ASYNC THUNKS
// ----------------------

// Fetch all comments for a specific office with pagination
export const fetchOfficeCommentsByOfficeId = createAsyncThunk(
  "officeComment/fetchOfficeCommentsByOfficeId",
  async ({ officeId, paginationDto }, thunkAPI) => {
    try {
      const { page, limit } = paginationDto;
      const response = await api.get(`/office-comment/office/${officeId}`, {
        params: { page, limit },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create a new comment
export const createOfficeComment = createAsyncThunk(
  "officeComment/createOfficeComment",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/office-comment", data, {
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

// Update an existing comment
export const updateOfficeComment = createAsyncThunk(
  "officeComment/updateOfficeComment",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.put(`/office-comment/${id}`, data, {
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

// Delete a comment
export const removeOfficeComment = createAsyncThunk(
  "officeComment/removeOfficeComment",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.delete(`/office-comment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the ID of the deleted comment
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ----------------------
// SLICE
// ----------------------

const initialState = {
  comments: [],
  loading: false,
  error: null,
  success: false,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pageCount: 0,
  },
};

const officeCommentSlice = createSlice({
  name: "officeComment",
  initialState,
  reducers: {
    // A reset function can be helpful for clearing state
    resetCommentState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Comments by Office ID
      .addCase(fetchOfficeCommentsByOfficeId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOfficeCommentsByOfficeId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          pageCount: action.payload.pageCount,
        };
      })
      .addCase(fetchOfficeCommentsByOfficeId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Comment
      .addCase(createOfficeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOfficeComment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.comments.unshift(action.payload); // Add new comment to the top
      })
      .addCase(createOfficeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Update Comment
      .addCase(updateOfficeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateOfficeComment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedComment = action.payload;
        const index = state.comments.findIndex(
          (comment) => comment.id === updatedComment.id
        );
        if (index !== -1) {
          state.comments[index] = updatedComment;
        }
      })
      .addCase(updateOfficeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Remove Comment
      .addCase(removeOfficeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(removeOfficeComment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(removeOfficeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetCommentState } = officeCommentSlice.actions;
export default officeCommentSlice.reducer;