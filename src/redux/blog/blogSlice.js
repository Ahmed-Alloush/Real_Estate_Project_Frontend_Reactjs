import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ------------------- CREATE
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async ({ formData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      // const formData = new FormData();
      // formData.append("title", data.title);
      // formData.append("content", data.content);
      // if (file) {
      //   formData.append("blog_photo", file);
      // }
      const response = await api.post(`/blog`, formData, {
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

// ------------------- GET ALL BLOGS
export const getAllBlogs = createAsyncThunk(
  "blog/getAllBlogs",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/blog`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- GET OFFICE BLOGS
export const getOfficeBlogs = createAsyncThunk(
  "blog/getOfficeBlogs",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(`/blog/office`, {
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

// ------------------- GET BLOG BY ID
export const getBlogById = createAsyncThunk(
  "blog/getBlogById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/blog/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- UPDATE
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, formData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await api.put(`/blog/${id}`, formData, {
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

// ------------------- DELETE
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async ({ id }, thunkAPI) => {
    try {
      console.log("this is the blog id : ", id);

      const token = localStorage.getItem("accessToken");
      await api.delete(`/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // so you can remove from list
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    loading: false,
    deletingId: null, //
    error: null,
    success: false,
    blogs: [],
    officeBlogs: [],
    currentBlog: null,
    blogsPagination: {
      page: 1,
      limit: 6,
      total: 0,
      pageCount: 1,
    },
  },
  reducers: {
    resetBlogState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // create
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.officeBlogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getAllBlogs
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.blogsPagination.limit = action.payload.limit;
        state.blogsPagination.page = action.payload.page;
        state.blogsPagination.pageCount = action.payload.pageCount;
        state.blogsPagination.total = action.payload.total;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getOfficeBlogs
      .addCase(getOfficeBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOfficeBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.officeBlogs = action.payload;
      })
      .addCase(getOfficeBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getBlogById
      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateBlog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.officeBlogs = state.officeBlogs.map((blog) => {
          if (blog.id === action.payload.id) {
            return action.payload;
          } else {
            return blog;
          }
        });
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteBlog
      .addCase(deleteBlog.pending, (state, action) => {
        state.loading = true;
        state.deletingId = action.meta.arg.id;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.deletingId = null;
        state.blogs = state.blogs.filter((b) => b.id !== action.payload);
        state.officeBlogs = state.officeBlogs.filter(
          (b) => b.id !== action.payload
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        // Reset deletingId on failure
        state.deletingId = null;
        state.error = action.payload;
      });
  },
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;
