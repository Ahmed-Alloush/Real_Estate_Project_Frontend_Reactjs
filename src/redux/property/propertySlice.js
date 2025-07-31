// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";

// // Fetch all properties (no pagination)
// export const fetchProperties = createAsyncThunk(
//   "property/fetchProperties",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/property");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Fetch Favorite Properties
// export const fetchFavoriteProperties = createAsyncThunk(
//   "property/fetchFavoriteProperties",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.get(`/favorite-property`, {
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

// // Filtered properties with pagination
// export const fetchPropertiesAndFilterThem = createAsyncThunk(
//   "property/fetchPropertiesAndFilterThem",
//   async (filterData, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.post("/property/filter", filterData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: {
//           page: filterData.page || 1,
//           limit: filterData.limit || 1,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Fetch Reserved properties with pagination
// export const fetchReservedProperties = createAsyncThunk(
//   "property/fetchReservedProperties",
//   async ({ page = 1, limit = 9 }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await api.get(`/property/reserved`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: { page, limit },
//       });

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Fetch properties by office ID with pagination
// export const fetchPropertiesByOfficeId = createAsyncThunk(
//   "property/fetchPropertiesByOfficeId",
//   async ({ officeId, page = 1, limit = 1 }, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/property/office/${officeId}`, {
//         params: { page, limit },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Fetch a single property
// export const fetchPropertyById = createAsyncThunk(
//   "property/fetchPropertyById",
//   async (propertyId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/property/${propertyId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Create a property
// export const createProperty = createAsyncThunk(
//   "property/createProperty",
//   async (propertyData, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const formData = new FormData();
//       formData.append("propertyNumber", propertyData.propertyNumber);
//       formData.append("propertyType", propertyData.propertyType);
//       formData.append("licenseNumber", propertyData.licenseNumber);
//       formData.append("licenseType", propertyData.licenseType);
//       formData.append("space", propertyData.space);
//       formData.append("price", propertyData.price);
//       formData.append("description", propertyData.description);
//       formData.append("ownerId", propertyData.ownerId);
//       formData.append("location", JSON.stringify(propertyData.location));

//       const formattedAttributes = propertyData.attributes.map((attr) => ({
//         name: attr.attributeName,
//         value: Number(attr.value),
//       }));
//       formData.append("attributes", JSON.stringify(formattedAttributes));

//       Array.from(propertyData.property_photos).forEach((photo) => {
//         formData.append("property_photos", photo);
//       });

//       const response = await api.post("/property", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Update property
// export const updateProperty = createAsyncThunk(
//   "property/updateProperty",
//   async ({ id, updatedData }, { rejectWithValue }) => {
//     try {
//       const response = await api.put(`/property/${id}`, updatedData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Delete property
// export const deleteProperty = createAsyncThunk(
//   "property/deleteProperty",
//   async (id, { rejectWithValue }) => {
//     try {
//       await api.delete(`/property/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Slice
// const propertySlice = createSlice({
//   name: "property",
//   initialState: {
//     properties: [],
//     property: null,
//     loading: false,
//     error: null,

//     favoriteProperties: [],
//     favoritePropertiesLoading: false,
//     favoritePropertiesError: null,

//     // Filtered properties
//     propertiesWithFiltering: [],
//     propertiesWithFilteringLoading: false,
//     propertiesWithFilteringError: null,
//     propertiesFilteringPagination: {
//       page: 1,
//       limit: 6,
//       total: 0,
//       pageCount: 1,
//     },

//     // Reserved properties
//     reservedProperties: [],
//     reservedPropertiesLoading: false,
//     reservedPropertiesError: null,
//     reservedPropertiesPagination: {
//       page: 1,
//       limit: 6,
//       total: 0,
//       pageCount: 1,
//     },

//     // Office-specific properties
//     currentOfficeProperties: [],
//     currentOfficeLoading: false,
//     currentOfficePropertiesError: null,
//     currentOfficePagination: {
//       page: 1,
//       limit: 6,
//       total: 0,
//       pageCount: 1,
//     },
//   },
//   reducers: {
//     // New action for changing page
//     setPage: (state, action) => {
//       const { page, limit } = action.payload;
//       state.propertiesFilteringPagination.page = page;
//       state.currentOfficePagination.page = page;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // Fetch all properties
//       .addCase(fetchProperties.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProperties.fulfilled, (state, action) => {
//         state.loading = false;
//         state.properties = action.payload;
//       })
//       .addCase(fetchProperties.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch Favorite Properties
//       .addCase(fetchFavoriteProperties.pending, (state) => {
//         state.favoritePropertiesLoading = true;
//         state.favoritePropertiesError = null;
//       })
//       .addCase(fetchFavoriteProperties.fulfilled, (state, action) => {
//         state.favoritePropertiesLoading = false;
//         state.favoriteProperties = action.payload;
//       })
//       .addCase(fetchFavoriteProperties.rejected, (state, action) => {
//         state.favoritePropertiesLoading = false;
//         state.favoritePropertiesError = action.payload;
//       })

//       // Filtered properties with pagination
//       .addCase(fetchPropertiesAndFilterThem.pending, (state) => {
//         state.propertiesWithFilteringLoading = true;
//         state.propertiesWithFilteringError = null;
//       })
//       .addCase(fetchPropertiesAndFilterThem.fulfilled, (state, action) => {
//         state.propertiesWithFilteringLoading = false;
//         state.propertiesWithFiltering = action.payload.data;
//         state.propertiesFilteringPagination = {
//           page: action.payload.page,
//           limit: action.payload.limit,
//           total: action.payload.total,
//           pageCount: action.payload.pageCount,
//         };
//       })
//       .addCase(fetchPropertiesAndFilterThem.rejected, (state, action) => {
//         state.propertiesWithFilteringLoading = false;
//         state.propertiesWithFilteringError = action.payload;
//       })
//       // Reserved properties with pagination
//       .addCase(fetchReservedProperties.pending, (state) => {
//         state.reservedPropertiesLoading = true;
//         state.reservedPropertiesError = null;
//       })
//       .addCase(fetchReservedProperties.fulfilled, (state, action) => {
//         state.reservedPropertiesLoading = false;
//         state.reservedProperties = action.payload.data;
//         state.reservedPropertiesPagination = {
//           page: action.payload.page,
//           limit: action.payload.limit,
//           total: action.payload.total,
//           pageCount: action.payload.pageCount,
//         };
//       })
//       .addCase(fetchReservedProperties.rejected, (state, action) => {
//         state.reservedPropertiesLoading = false;
//         state.reservedPropertiesError = action.payload;
//       })

//       // Office-specific properties with pagination
//       .addCase(fetchPropertiesByOfficeId.pending, (state) => {
//         state.currentOfficeLoading = true;
//         state.currentOfficePropertiesError = null;
//       })
//       .addCase(fetchPropertiesByOfficeId.fulfilled, (state, action) => {
//         state.currentOfficeLoading = false;
//         state.currentOfficeProperties = action.payload.data;
//         state.currentOfficePagination = {
//           page: action.payload.page,
//           limit: action.payload.limit,
//           total: action.payload.total,
//           pageCount: action.payload.pageCount,
//         };
//       })
//       .addCase(fetchPropertiesByOfficeId.rejected, (state, action) => {
//         state.currentOfficeLoading = false;
//         state.currentOfficePropertiesError = action.payload;
//       })

//       // Fetch single property
//       .addCase(fetchPropertyById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPropertyById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.property = action.payload;
//       })
//       .addCase(fetchPropertyById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Create property
//       .addCase(createProperty.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createProperty.fulfilled, (state, action) => {
//         state.loading = false;
//         state.properties.push(action.payload);
//         state.currentOfficeProperties.push(action.payload);
//       })
//       .addCase(createProperty.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Update property
//       .addCase(updateProperty.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateProperty.fulfilled, (state, action) => {
//         state.loading = false;
//         const updated = action.payload;
//         const index = state.properties.findIndex((p) => p.id === updated.id);
//         if (index !== -1) state.properties[index] = updated;
//       })
//       .addCase(updateProperty.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Delete property
//       .addCase(deleteProperty.pending, (state) => {
//         state.currentOfficeLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteProperty.fulfilled, (state, action) => {
//         const id = action.payload;
//         state.currentOfficeLoading = false;
//         state.properties = state.properties.filter((p) => p.id !== id);
//         state.currentOfficeProperties = state.currentOfficeProperties.filter(
//           (p) => p.id !== id
//         );
//       })
//       .addCase(deleteProperty.rejected, (state, action) => {
//         state.currentOfficeLoading = false;
//         state.error = action.payload;
//       });
//   },
// });
// export const { setPage } = propertySlice.actions;

// export default propertySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Fetch all properties (no pagination)
export const fetchProperties = createAsyncThunk(
  "property/fetchProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/property");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Favorite Properties
export const fetchFavoriteProperties = createAsyncThunk(
  "property/fetchFavoriteProperties",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(`/favorite-property`, {
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

// Filtered properties with pagination
export const fetchPropertiesAndFilterThem = createAsyncThunk(
  "property/fetchPropertiesAndFilterThem",
  async (filterData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/property/filter", filterData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: filterData.page || 1,
          limit: filterData.limit || 1,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Reserved properties with pagination
export const fetchReservedProperties = createAsyncThunk(
  "property/fetchReservedProperties",
  async ({ page = 1, limit = 9 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(`/property/reserved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, limit },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch properties by office ID with pagination
export const fetchPropertiesByOfficeId = createAsyncThunk(
  "property/fetchPropertiesByOfficeId",
  async ({ officeId, page = 1, limit = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/property/office/${officeId}`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch a single property
export const fetchPropertyById = createAsyncThunk(
  "property/fetchPropertyById",
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/property/${propertyId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a property
export const createProperty = createAsyncThunk(
  "property/createProperty",
  async (propertyData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("propertyNumber", propertyData.propertyNumber);
      formData.append("propertyType", propertyData.propertyType);
      formData.append("licenseNumber", propertyData.licenseNumber);
      formData.append("licenseType", propertyData.licenseType);
      formData.append("space", propertyData.space);
      formData.append("price", propertyData.price);
      formData.append("description", propertyData.description);
      formData.append("ownerId", propertyData.ownerId);
      formData.append("location", JSON.stringify(propertyData.location));

      const formattedAttributes = propertyData.attributes.map((attr) => ({
        name: attr.attributeName,
        value: Number(attr.value),
      }));
      formData.append("attributes", JSON.stringify(formattedAttributes));

      Array.from(propertyData.property_photos).forEach((photo) => {
        formData.append("property_photos", photo);
      });

      const response = await api.post("/property", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update property
export const updateProperty = createAsyncThunk(
  "property/updateProperty",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/property/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete property
export const deleteProperty = createAsyncThunk(
  "property/deleteProperty",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/property/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a favorite property
export const createFavoriteProperty = createAsyncThunk(
  "property/createFavoriteProperty",
  async (propertyId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post(
        `/favorite-property`,
        { propertyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a favorite property by ID
export const deleteFavoriteProperty = createAsyncThunk(
  "property/deleteFavoriteProperty",
  async (propertyId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.delete(`/favorite-property/${propertyId}`, {
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

// Delete all favorite properties
export const deleteAllFavoriteProperties = createAsyncThunk(
  "property/deleteAllFavoriteProperties",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.delete(`/favorite-property/allProperties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
    property: null,
    loading: false,
    error: null,

    favoriteProperties: [],
    favoritePropertiesLoading: false,
    favoritePropertiesError: null,
    favoriteActionLoading: false,
    favoriteActionError: null,

    // Filtered properties
    propertiesWithFiltering: [],
    propertiesWithFilteringLoading: false,
    propertiesWithFilteringError: null,
    propertiesFilteringPagination: {
      page: 1,
      limit: 6,
      total: 0,
      pageCount: 1,
    },

    // Reserved properties
    reservedProperties: [],
    reservedPropertiesLoading: false,
    reservedPropertiesError: null,
    reservedPropertiesPagination: {
      page: 1,
      limit: 6,
      total: 0,
      pageCount: 1,
    },

    // Office-specific properties
    currentOfficeProperties: [],
    currentOfficeLoading: false,
    currentOfficePropertiesError: null,
    currentOfficePagination: {
      page: 1,
      limit: 6,
      total: 0,
      pageCount: 1,
    },
  },
  reducers: {
    // New action for changing page
    setPage: (state, action) => {
      const { page, limit } = action.payload;
      state.propertiesFilteringPagination.page = page;
      state.currentOfficePagination.page = page;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch all properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Favorite Properties
      .addCase(fetchFavoriteProperties.pending, (state) => {
        state.favoritePropertiesLoading = true;
        state.favoritePropertiesError = null;
      })
      .addCase(fetchFavoriteProperties.fulfilled, (state, action) => {
        state.favoritePropertiesLoading = false;
        state.favoriteProperties = action.payload;
      })
      .addCase(fetchFavoriteProperties.rejected, (state, action) => {
        state.favoritePropertiesLoading = false;
        state.favoritePropertiesError = action.payload;
      })

      // Create Favorite Property
      .addCase(createFavoriteProperty.pending, (state) => {
        state.favoriteActionLoading = true;
        state.favoriteActionError = null;
      })
      .addCase(createFavoriteProperty.fulfilled, (state, action) => {
        state.favoriteActionLoading = false;
        state.favoriteProperties.push(action.payload);
      })
      .addCase(createFavoriteProperty.rejected, (state, action) => {
        state.favoriteActionLoading = false;
        state.favoriteActionError = action.payload;
      })

      // Delete Favorite Property By PropertyId
      .addCase(deleteFavoriteProperty.pending, (state) => {
        state.favoriteActionLoading = true;
        state.favoriteActionError = null;
      })
      .addCase(deleteFavoriteProperty.fulfilled, (state, action) => {
        state.favoriteActionLoading = false;
        state.favoriteProperties = state.favoriteProperties.filter(
          (fav) => fav?.property.id !== action.payload
        );
      })
      .addCase(deleteFavoriteProperty.rejected, (state, action) => {
        state.favoriteActionLoading = false;
        state.favoriteActionError = action.payload;
      })

      // Delete All Favorite Properties
      .addCase(deleteAllFavoriteProperties.pending, (state) => {
        state.favoriteActionLoading = true;
        state.favoriteActionError = null;
      })
      .addCase(deleteAllFavoriteProperties.fulfilled, (state) => {
        state.favoriteActionLoading = false;
        state.favoriteProperties = [];
      })
      .addCase(deleteAllFavoriteProperties.rejected, (state, action) => {
        state.favoriteActionLoading = false;
        state.favoriteActionError = action.payload;
      })

      // Filtered properties with pagination
      .addCase(fetchPropertiesAndFilterThem.pending, (state) => {
        state.propertiesWithFilteringLoading = true;
        state.propertiesWithFilteringError = null;
      })
      .addCase(fetchPropertiesAndFilterThem.fulfilled, (state, action) => {
        state.propertiesWithFilteringLoading = false;
        state.propertiesWithFiltering = action.payload.data;
        state.propertiesFilteringPagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          pageCount: action.payload.pageCount,
        };
      })
      .addCase(fetchPropertiesAndFilterThem.rejected, (state, action) => {
        state.propertiesWithFilteringLoading = false;
        state.propertiesWithFilteringError = action.payload;
      })
      // Reserved properties with pagination
      .addCase(fetchReservedProperties.pending, (state) => {
        state.reservedPropertiesLoading = true;
        state.reservedPropertiesError = null;
      })
      .addCase(fetchReservedProperties.fulfilled, (state, action) => {
        state.reservedPropertiesLoading = false;
        state.reservedProperties = action.payload.data;
        state.reservedPropertiesPagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          pageCount: action.payload.pageCount,
        };
      })
      .addCase(fetchReservedProperties.rejected, (state, action) => {
        state.reservedPropertiesLoading = false;
        state.reservedPropertiesError = action.payload;
      })

      // Office-specific properties with pagination
      .addCase(fetchPropertiesByOfficeId.pending, (state) => {
        state.currentOfficeLoading = true;
        state.currentOfficePropertiesError = null;
      })
      .addCase(fetchPropertiesByOfficeId.fulfilled, (state, action) => {
        state.currentOfficeLoading = false;
        state.currentOfficeProperties = action.payload.data;
        state.currentOfficePagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          pageCount: action.payload.pageCount,
        };
      })
      .addCase(fetchPropertiesByOfficeId.rejected, (state, action) => {
        state.currentOfficeLoading = false;
        state.currentOfficePropertiesError = action.payload;
      })

      // Fetch single property
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create property
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update property
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.properties.findIndex((p) => p.id === updated.id);
        if (index !== -1) state.properties[index] = updated;
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete property
      .addCase(deleteProperty.pending, (state) => {
        state.currentOfficeLoading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        const id = action.payload;
        state.currentOfficeLoading = false;
        state.properties = state.properties.filter((p) => p.id !== id);
        state.currentOfficeProperties = state.currentOfficeProperties.filter(
          (p) => p.id !== id
        );
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.currentOfficeLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setPage } = propertySlice.actions;

export default propertySlice.reducer;
