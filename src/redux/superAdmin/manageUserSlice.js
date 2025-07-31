import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// GET ALL USERS
export const getAllUsers = createAsyncThunk(
  "superAdmin/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/user/get-all-users", {
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

// ADD NEW ADMIN
export const addAdmin = createAsyncThunk(
  "superAdmin/addAdmin",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/user/add-admin", formData, {
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

// BAN USER
export const banUser = createAsyncThunk(
  "superAdmin/banUser",
  async ({ userId, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post(`/user/ban-user/${userId}`, data, {
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

// WARN USER
export const warnUser = createAsyncThunk(
  "superAdmin/warnUser",
  async ({ userId, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post(`/user/warn-user/${userId}`, data, {
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

const manageUserSlice = createSlice({
  name: "superAdmin",
  initialState: {
    loading: false,
    banLoading: false,
    warnLoading: false,
    error: null,
    success: false,
    users: [],
  },
  reducers: {
    resetStatus(state) {
      state.loading = false;
      state.banLoading = false;
      state.warnLoading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL USERS
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        // state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ADD ADMIN
    builder
      .addCase(addAdmin.pending, (state) => {
        state.loading = true;
        // state.error = null;
        // state.success = false;
      })
      .addCase(addAdmin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // BAN USER
    builder
      .addCase(banUser.pending, (state) => {
        state.banLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(banUser.fulfilled, (state) => {
        state.banLoading = false;
        state.success = true;
      })
      .addCase(banUser.rejected, (state, action) => {
        state.banLoading = false;
        state.error = action.payload;
      });

    // WARN USER
    builder
      .addCase(warnUser.pending, (state) => {
        state.warnLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(warnUser.fulfilled, (state) => {
        state.warnLoading = false;
        state.success = true;
      })
      .addCase(warnUser.rejected, (state, action) => {
        state.warnLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = manageUserSlice.actions;

export default manageUserSlice.reducer;
