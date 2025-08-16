import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ======================================
// ✅ Thunks
// ======================================

// Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await api.post("/user/login", { email, password });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// Get current user
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/user/get-current", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to fetch user."
    );
  }
});

// Get user by national number
export const getUserByNationalNumber = createAsyncThunk(
  "auth/getUserByNationalNumber",
  async (nationalNumber, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(
        `/user/get-user-national-number/${nationalNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch user."
      );
    }
  }
);

// Get user by ID
export const getUserById = createAsyncThunk(
  "auth/getUserById",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(
        `/user/${id}`, // Assuming this is your API endpoint
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch user by ID."
      );
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ formData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.put("/user/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Start register as user
export const startRegisterByEmailPhoneAsUser = createAsyncThunk(
  "auth/startRegisterAsUser",
  async ({ email, phone }, thunkAPI) => {
    try {
      const response = await api.post("/user/start-register", { email, phone });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Verify code
export const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async (code, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const response = await api.post(
        "/user/verify-code",
        { verify_code: code },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Complete register
export const completeRegister = createAsyncThunk(
  "auth/completeRegister",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/user/complete-register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ======================================
// ✅ Slice
// ======================================

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    role: null,
    user: null,
    userByNationalNumber: null,
    userByNationalNumberLoading: false,
    userByNationalNumberError: null,
    userById: null,
    userByIdLoading: false,
    userByIdError: null,
    loading: false,
    success: false,
    error: null,
    verifySuccess: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.user = null;
      state.userByNationalNumber = null;
      state.success = false;
      state.verifySuccess = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.userByNationalNumber = null;
    },
    resetUserState: (state, action) => {
      state.user = null;
      state.userByNationalNumber = null;
      state.error = null;
      state.loading = false;
      state.success = false;
      state.verifySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get user
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get user by national number
      .addCase(getUserByNationalNumber.pending, (state) => {
        state.userByNationalNumberLoading = true;
        state.userByNationalNumberError = null;
      })
      .addCase(getUserByNationalNumber.fulfilled, (state, action) => {
        state.userByNationalNumberLoading = false;
        state.userByNationalNumber = action.payload;
      })
      .addCase(getUserByNationalNumber.rejected, (state, action) => {
        state.userByNationalNumberLoading = false;
        state.userByNationalNumberError = action.payload;
      })

      // Get user by id

      .addCase(getUserById.pending, (state) => {
        state.userByIdLoading = true;
        state.userByIdError = null;
        state.userById = null; // Clear the user when fetching
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userByIdLoading = false;
        state.userById = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.userByIdLoading = false;
        state.userByIdError = action.payload;
        state.userById = null;
      })

      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Start register as user
      .addCase(startRegisterByEmailPhoneAsUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(startRegisterByEmailPhoneAsUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.success = true;
        state.loading = false;
      })
      .addCase(startRegisterByEmailPhoneAsUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Verify Code
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.verifySuccess = false;
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.loading = false;
        state.verifySuccess = true;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Complete Register
      .addCase(completeRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeRegister.fulfilled, (state, action) => {
        state.success = true;
        state.role = action.payload.role;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.loading = false;
      })
      .addCase(completeRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearUser, resetUserState } = authSlice.actions;
export default authSlice.reducer;
