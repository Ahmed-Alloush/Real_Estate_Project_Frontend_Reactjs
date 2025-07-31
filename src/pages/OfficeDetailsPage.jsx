// // // src/pages/OfficePage.jsx

// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useParams } from "react-router-dom";
// // import { getOfficeById, clearOfficeState } from "../redux/office/officeSlice";
// // import {
// //   Box,
// //   Typography,
// //   CircularProgress,
// //   Paper,
// //   Avatar,
// //   Grid,
// // } from "@mui/material";
// // import { FaPhone, FaStar } from "react-icons/fa";
// // import PropertyList from "../components/propertyList";
// // import { fetchPropertiesByOfficeId } from "../redux/property/propertySlice";

// // const OfficePage = () => {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const { selectedOffice, loading, error } = useSelector(
// //     (state) => state.office
// //   );

// //   const { currentOfficeProperties, currentOfficeLoading } = useSelector(
// //     (state) => state.property
// //   );

// //   useEffect(() => {
// //     dispatch(getOfficeById(id));

// //     return () => {
// //       dispatch(clearOfficeState());
// //     };
// //   }, [dispatch, id]);

// //   useEffect(() => {
// //     if (selectedOffice?.id) {
// //       // dispatch(getOfficeBlogs(selectedOffice.id));
// //       dispatch(fetchPropertiesByOfficeId(selectedOffice.id));
// //     }
// //   }, [selectedOffice, dispatch]);

// //   if (loading) {
// //     return (
// //       <Box display="flex" justifyContent="center" mt={4}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Box textAlign="center" mt={4}>
// //         <Typography color="error">{error}</Typography>
// //       </Box>
// //     );
// //   }

// //   if (!selectedOffice) {
// //     return null;
// //   }

// //   return (
// //     <Box p={4}>
// //       <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
// //         <Box
// //           component="img"
// //           src={selectedOffice.office_photo?.url || "/office-placeholder.png"}
// //           alt={selectedOffice.name}
// //           sx={{ width: "100%", height: 300, objectFit: "cover" }}
// //         />
// //         <Box p={3}>
// //           <Typography variant="h4" gutterBottom>
// //             {selectedOffice.name}
// //           </Typography>

// //           <Grid container spacing={2} alignItems="center">
// //             <Grid item>
// //               <FaPhone size={18} />
// //             </Grid>
// //             <Grid item>
// //               <Typography variant="body1">
// //                 {selectedOffice.office_phone}
// //               </Typography>
// //             </Grid>
// //           </Grid>

// //           <Box display="flex" alignItems="center" mt={2}>
// //             {[...Array(5)].map((_, idx) => (
// //               <FaStar
// //                 key={idx}
// //                 size={20}
// //                 color={
// //                   idx < selectedOffice.ratingsCount ? "#FFD700" : "#CCCCCC"
// //                 }
// //               />
// //             ))}
// //             <Typography ml={1}>({selectedOffice.ratingsCount})</Typography>
// //           </Box>

// //           <Box mt={4}>
// //             <Typography variant="h6">Blogs</Typography>
// //             {selectedOffice.blogs && selectedOffice.blogs.length > 0 ? (
// //               selectedOffice.blogs.map((blog) => (
// //                 <Paper
// //                   key={blog.id}
// //                   sx={{ p: 2, my: 1, borderLeft: "4px solid #1976d2" }}
// //                 >
// //                   <Typography variant="subtitle1" fontWeight="bold">
// //                     {blog.title}
// //                   </Typography>
// //                   <Typography variant="body2">{blog.content}</Typography>
// //                 </Paper>
// //               ))
// //             ) : (
// //               <Typography variant="body2" color="text.secondary">
// //                 No blogs yet.
// //               </Typography>
// //             )}
// //           </Box>
// //           {/* Properties Section */}
// //           <Box mt={4}>
// //             <Typography variant="h6">Properties</Typography>
// //             <PropertyList properties={currentOfficeProperties} />

// //             {currentOfficeProperties?.length == 0 && (
// //               <Typography variant="body2" color="text.secondary">
// //                 No porperties yet.
// //               </Typography>
// //             )}
// //           </Box>
// //         </Box>
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default OfficePage;



// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getOfficeById, clearOfficeState } from "../redux/office/officeSlice";
// import { fetchPropertiesByOfficeId, setPage } from "../redux/property/propertySlice";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Paper,
//   Avatar,
//   Grid,
//   Pagination,
// } from "@mui/material";
// import { FaPhone, FaStar } from "react-icons/fa";
// import PropertyList from "../components/propertyList";

// const OfficeDetailsPage = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
  
//   const { selectedOffice, loading, error } = useSelector((state) => state.office);
//   const { currentOfficeProperties, currentOfficeLoading, currentOfficePagination, currentOfficePropertiesError } = useSelector((state) => state.property);
  
//   // Current page from the Redux store
//   const page = currentOfficePagination.page;
//   const pageCount = currentOfficePagination.pageCount;
// console.log("currentOfficePagination",currentOfficePagination);

//   useEffect(() => {
//     dispatch(getOfficeById(id));

//     return () => {
//       dispatch(clearOfficeState());
//     };
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (selectedOffice?.id) {
//       dispatch(fetchPropertiesByOfficeId({ officeId: selectedOffice.id, page }));
//     }
//   }, [selectedOffice, dispatch, page]);

//   const handlePageChange = (event, value) => {
//     // Update the current page using setPage
//     dispatch(setPage({ page: value, limit: currentOfficePagination.limit }));
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   if (!selectedOffice) {
//     return null;
//   }

//   return (
//     <Box p={4}>
//       <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
//         <Box
//           component="img"
//           src={selectedOffice.office_photo?.url || "/office-placeholder.png"}
//           alt={selectedOffice.name}
//           sx={{ width: "100%", height: 300, objectFit: "cover" }}
//         />
//         <Box p={3}>
//           <Typography variant="h4" gutterBottom>
//             {selectedOffice.name}
//           </Typography>

//           <Grid container spacing={2} alignItems="center">
//             <Grid item>
//               <FaPhone size={18} />
//             </Grid>
//             <Grid item>
//               <Typography variant="body1">
//                 {selectedOffice.office_phone}
//               </Typography>
//             </Grid>
//           </Grid>

//           <Box display="flex" alignItems="center" mt={2}>
//             {[...Array(5)].map((_, idx) => (
//               <FaStar
//                 key={idx}
//                 size={20}
//                 color={
//                   idx < selectedOffice.ratingsCount ? "#FFD700" : "#CCCCCC"
//                 }
//               />
//             ))}
//             <Typography ml={1}>({selectedOffice.ratingsCount})</Typography>
//           </Box>

//           <Box mt={4}>
//             <Typography variant="h6">Blogs</Typography>
//             {selectedOffice.blogs && selectedOffice.blogs.length > 0 ? (
//               selectedOffice.blogs.map((blog) => (
//                 <Paper
//                   key={blog.id}
//                   sx={{ p: 2, my: 1, borderLeft: "4px solid #1976d2" }}
//                 >
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {blog.title}
//                   </Typography>
//                   <Typography variant="body2">{blog.content}</Typography>
//                 </Paper>
//               ))
//             ) : (
//               <Typography variant="body2" color="text.secondary">
//                 No blogs yet.
//               </Typography>
//             )}
//           </Box>

//           {/* Properties Section */}
//           <Box mt={4}>
//             <Typography variant="h6">Properties</Typography>
//             <PropertyList properties={currentOfficeProperties} />

//             {currentOfficeProperties?.length === 0 && (
//               <Typography variant="body2" color="text.secondary">
//                 No properties yet.
//               </Typography>
//             )}

//             {currentOfficeLoading && (
//               <Box display="flex" justifyContent="center" mt={2}>
//                 <CircularProgress />
//               </Box>
//             )}

//             {currentOfficePropertiesError && (
//               <Box textAlign="center" mt={4}>
//                 <Typography color="error">{currentOfficePropertiesError}</Typography>
//               </Box>
//             )}

//             {/* Pagination */}
//             {pageCount > 1 && (
//               <Box display="flex" justifyContent="center" mt={4}>
//                 <Pagination
//                   count={pageCount}
//                   page={page}
//                   onChange={handlePageChange}
//                   color="primary"
//                 />
//               </Box>
//             )}
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default OfficeDetailsPage;




import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOfficeById,
  clearOfficeState,
  fetchFavoriteOffices,
  createFavoriteOffice,
  deleteFavoriteOffice,
} from "../redux/office/officeSlice";
import {
  fetchPropertiesByOfficeId,
  setPage,
} from "../redux/property/propertySlice";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
  Grid,
  Pagination,
  Button,
} from "@mui/material";
import { FaPhone, FaStar } from "react-icons/fa";
import PropertyList from "../components/propertyList";

const OfficeDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    selectedOffice,
    loading,
    error,
    favoriteOffices,
    favoriteOfficesLoading,
  } = useSelector((state) => state.office);
  const {
    currentOfficeProperties,
    currentOfficeLoading,
    currentOfficePagination,
    currentOfficePropertiesError,
  } = useSelector((state) => state.property);

  // Current page from the Redux store
  const page = currentOfficePagination.page;
  const pageCount = currentOfficePagination.pageCount;
  console.log("currentOfficePagination", currentOfficePagination);

  // Check if the current office is in the user's favorites
  const isFavorite = favoriteOffices.some(
    (fav) => fav.office.id === selectedOffice?.id
  );

  useEffect(() => {
    dispatch(getOfficeById(id));
    dispatch(fetchFavoriteOffices());

    return () => {
      dispatch(clearOfficeState());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedOffice?.id) {
      dispatch(fetchPropertiesByOfficeId({ officeId: selectedOffice.id, page }));
    }
  }, [selectedOffice, dispatch, page]);

  const handlePageChange = (event, value) => {
    // Update the current page using setPage
    dispatch(setPage({ page: value, limit: currentOfficePagination.limit }));
  };

  const handleToggleFavorite = () => {
    if (!selectedOffice || favoriteOfficesLoading) return;

    if (isFavorite) {
      dispatch(deleteFavoriteOffice(selectedOffice.id));
    } else {
      dispatch(createFavoriteOffice(selectedOffice.id));
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!selectedOffice) {
    return null;
  }

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Box
          component="img"
          src={selectedOffice.office_photo?.url || "/office-placeholder.png"}
          alt={selectedOffice.name}
          sx={{ width: "100%", height: 300, objectFit: "cover" }}
        />
        <Box p={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h4" gutterBottom>
              {selectedOffice.name}
            </Typography>
            <Button
              variant="contained"
              color={isFavorite ? "error" : "success"}
              onClick={handleToggleFavorite}
              disabled={favoriteOfficesLoading}
              sx={{ minWidth: 180 }}
            >
              {favoriteOfficesLoading
                ? "Updating..."
                : isFavorite
                ? "Remove from Favorite"
                : "Add to Favorite"}
            </Button>
          </Box>

          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <FaPhone size={18} />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {selectedOffice.office_phone}
              </Typography>
            </Grid>
          </Grid>

          <Box display="flex" alignItems="center" mt={2}>
            {[...Array(5)].map((_, idx) => (
              <FaStar
                key={idx}
                size={20}
                color={
                  idx < selectedOffice.ratingsCount ? "#FFD700" : "#CCCCCC"
                }
              />
            ))}
            <Typography ml={1}>({selectedOffice.ratingsCount})</Typography>
          </Box>

          <Box mt={4}>
            
            <Typography variant="h6">Blogs</Typography>
            {selectedOffice.blogs && selectedOffice.blogs.length > 0 ? (
              selectedOffice.blogs.map((blog) => (
                <Paper
                  key={blog.id}
                  sx={{ p: 2, my: 1, borderLeft: "4px solid #1976d2" }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2">{blog.content}</Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No blogs yet.
              </Typography>
            )}
          </Box>

          {/* Properties Section */}
          <Box mt={4}>
            <Typography variant="h6">Properties</Typography>
            <PropertyList properties={currentOfficeProperties} />

            {currentOfficeProperties?.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No properties yet.
              </Typography>
            )}

            {currentOfficeLoading && (
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            )}

            {currentOfficePropertiesError && (
              <Box textAlign="center" mt={4}>
                <Typography color="error">
                  {currentOfficePropertiesError}
                </Typography>
              </Box>
            )}

            {/* Pagination */}
            {pageCount > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default OfficeDetailsPage;