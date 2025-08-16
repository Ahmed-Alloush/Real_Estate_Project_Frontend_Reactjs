import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// CREATE Office rating
export const createOfficeRating = createAsyncThunk(
  "officeRate/createOfficeRating",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/office/rate", data, {
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
const officeRating = createSlice({
  name: "officeRating",
  initialState: {
    loading: false,
    error: null,
    message: null,
    success: false,
   
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createOfficeRating.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOfficeRating.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message;
      })
      .addCase(createOfficeRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

     
  },
});


export default officeRating.reducer;
