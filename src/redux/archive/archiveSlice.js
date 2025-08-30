import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';


const initialState = {
  archives: [],
  selectedArchive: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch all archives
export const fetchArchives = createAsyncThunk(
  'archive/fetchArchives',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.get('/archive', {
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

// Async thunk to fetch a single archive with its records
export const fetchOneArchiveWithRecords = createAsyncThunk(
  'archive/fetchOneArchiveWithRecords',
  async (archiveId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.get(`archive/${archiveId}`, {
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

const archiveSlice = createSlice({
  name: 'archive',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArchives.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArchives.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.archives = action.payload;
      })
      .addCase(fetchArchives.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchOneArchiveWithRecords.pending, (state) => {
        state.status = 'loading';
        state.selectedArchive = null;
      })
      .addCase(fetchOneArchiveWithRecords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedArchive = action.payload;
      })
      .addCase(fetchOneArchiveWithRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default archiveSlice.reducer;