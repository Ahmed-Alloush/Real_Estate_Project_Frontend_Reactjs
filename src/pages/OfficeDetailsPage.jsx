// // // // import { useEffect, useState } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { useParams } from "react-router-dom";
// // // // import {
// // // //   getOfficeById,
// // // //   clearOfficeState,
// // // //   fetchFavoriteOffices,
// // // //   createFavoriteOffice,
// // // //   deleteFavoriteOffice,
// // // // } from "../redux/office/officeSlice";
// // // // import {
// // // //   fetchPropertiesByOfficeId,
// // // //   setPage,
// // // // } from "../redux/property/propertySlice";
// // // // import { createOfficeRating } from "../redux/office rating/officeRatingSlice";
// // // // import {
// // // //   Box,
// // // //   Typography,
// // // //   CircularProgress,
// // // //   Paper,
// // // //   Grid,
// // // //   Pagination,
// // // //   Button,
// // // //   Dialog,
// // // //   DialogTitle,
// // // //   DialogContent,
// // // //   DialogActions,
// // // //   Rating,
// // // // } from "@mui/material";
// // // // import { FaPhone, FaStar } from "react-icons/fa";
// // // // import PropertyList from "../components/propertyList";

// // // // const OfficeDetailsPage = () => {
// // // //   const { id } = useParams();
// // // //   const dispatch = useDispatch();

// // // //   const {
// // // //     selectedOffice,
// // // //     loading,
// // // //     error,
// // // //     favoriteOffices,
// // // //     favoriteOfficesLoading,
// // // //   } = useSelector((state) => state.office);
// // // //   const {
// // // //     currentOfficeProperties,
// // // //     currentOfficeLoading,
// // // //     currentOfficePagination,
// // // //     currentOfficePropertiesError,
// // // //   } = useSelector((state) => state.property);

// // // //   const [openRateDialog, setOpenRateDialog] = useState(false);
// // // //   const [userRating, setUserRating] = useState(0);

// // // //   const page = currentOfficePagination.page;
// // // //   const pageCount = currentOfficePagination.pageCount;

// // // //   const isFavorite = favoriteOffices.some(
// // // //     (fav) => fav.office.id === selectedOffice?.id
// // // //   );

// // // //   useEffect(() => {
// // // //     dispatch(getOfficeById(id));
// // // //     dispatch(fetchFavoriteOffices());

// // // //     return () => {
// // // //       dispatch(clearOfficeState());
// // // //     };
// // // //   }, [dispatch, id]);

// // // //   useEffect(() => {
// // // //     if (selectedOffice?.id) {
// // // //       dispatch(fetchPropertiesByOfficeId({ officeId: selectedOffice.id, page }));
// // // //     }
// // // //   }, [selectedOffice, dispatch, page]);

// // // //   const handlePageChange = (event, value) => {
// // // //     dispatch(setPage({ page: value, limit: currentOfficePagination.limit }));
// // // //   };

// // // //   const handleToggleFavorite = () => {
// // // //     if (!selectedOffice || favoriteOfficesLoading) return;

// // // //     if (isFavorite) {
// // // //       dispatch(deleteFavoriteOffice(selectedOffice.id));
// // // //     } else {
// // // //       dispatch(createFavoriteOffice(selectedOffice.id));
// // // //     }
// // // //   };

// // // //   const handleOpenDialog = () => setOpenRateDialog(true);
// // // //   const handleCloseDialog = () => {
// // // //     setOpenRateDialog(false);
// // // //     setUserRating(0);
// // // //   };

// // // //   const handleSaveRating = () => {
// // // //     if (selectedOffice && userRating > 0) {
// // // //       dispatch(
// // // //         createOfficeRating({
// // // //           officeId: selectedOffice.id,
// // // //           numberOfStars: userRating,
// // // //         })
// // // //       );
// // // //       handleCloseDialog();
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <Box display="flex" justifyContent="center" mt={4}>
// // // //         <CircularProgress />
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <Box textAlign="center" mt={4}>
// // // //         <Typography color="error">{error}</Typography>
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   if (!selectedOffice) {
// // // //     return null;
// // // //   }

// // // //   return (
// // // //     <Box p={4}>
// // // //       <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
// // // //         <Box
// // // //           component="img"
// // // //           src={selectedOffice.office_photo?.url || "/office-placeholder.png"}
// // // //           alt={selectedOffice.name}
// // // //           sx={{ width: "100%", height: 300, objectFit: "cover" }}
// // // //         />
// // // //         <Box p={3}>
// // // //           <Box
// // // //             sx={{
// // // //               display: "flex",
// // // //               justifyContent: "space-between",
// // // //               alignItems: "center",
// // // //               flexWrap: "wrap",
// // // //             }}
// // // //           >
// // // //             <Typography variant="h4" gutterBottom>
// // // //               {selectedOffice.name}
// // // //             </Typography>
// // // //             <Button
// // // //               variant="contained"
// // // //               color={isFavorite ? "error" : "success"}
// // // //               onClick={handleToggleFavorite}
// // // //               disabled={favoriteOfficesLoading}
// // // //               sx={{ minWidth: 180 }}
// // // //             >
// // // //               {favoriteOfficesLoading
// // // //                 ? "Updating..."
// // // //                 : isFavorite
// // // //                 ? "Remove from Favorite"
// // // //                 : "Add to Favorite"}
// // // //             </Button>
// // // //           </Box>

// // // //           <Grid container spacing={2} alignItems="center">
// // // //             <Grid item>
// // // //               <FaPhone size={18} />
// // // //             </Grid>
// // // //             <Grid item>
// // // //               <Typography variant="body1">
// // // //                 {selectedOffice.office_phone}
// // // //               </Typography>
// // // //             </Grid>
// // // //           </Grid>

// // // //           <Box display="flex" alignItems="center" mt={2}>
// // // //             {[...Array(5)].map((_, idx) => (
// // // //               <FaStar
// // // //                 key={idx}
// // // //                 size={20}
// // // //                 color={
// // // //                   idx < selectedOffice.ratingsCount ? "#FFD700" : "#CCCCCC"
// // // //                 }
// // // //               />
// // // //             ))}
// // // //             <Typography ml={1}>({selectedOffice.ratingsCount})</Typography>
// // // //             <Button
// // // //               variant="outlined"
// // // //               color="primary"
// // // //               sx={{ ml: 2 }}
// // // //               onClick={handleOpenDialog}
// // // //             >
// // // //               Rate Office
// // // //             </Button>
// // // //           </Box>

// // // //           <Box mt={4}>
// // // //             <Typography variant="h6">Blogs</Typography>
// // // //             {selectedOffice.blogs && selectedOffice.blogs.length > 0 ? (
// // // //               selectedOffice.blogs.map((blog) => (
// // // //                 <Paper
// // // //                   key={blog.id}
// // // //                   sx={{ p: 2, my: 1, borderLeft: "4px solid #1976d2" }}
// // // //                 >
// // // //                   <Typography variant="subtitle1" fontWeight="bold">
// // // //                     {blog.title}
// // // //                   </Typography>
// // // //                   <Typography variant="body2">{blog.content}</Typography>
// // // //                 </Paper>
// // // //               ))
// // // //             ) : (
// // // //               <Typography variant="body2" color="text.secondary">
// // // //                 No blogs yet.
// // // //               </Typography>
// // // //             )}
// // // //           </Box>

// // // //           <Box mt={4}>
// // // //             <Typography variant="h6">Properties</Typography>
// // // //             <PropertyList properties={currentOfficeProperties} />

// // // //             {currentOfficeProperties?.length === 0 && (
// // // //               <Typography variant="body2" color="text.secondary">
// // // //                 No properties yet.
// // // //               </Typography>
// // // //             )}

// // // //             {currentOfficeLoading && (
// // // //               <Box display="flex" justifyContent="center" mt={2}>
// // // //                 <CircularProgress />
// // // //               </Box>
// // // //             )}

// // // //             {currentOfficePropertiesError && (
// // // //               <Box textAlign="center" mt={4}>
// // // //                 <Typography color="error">
// // // //                   {currentOfficePropertiesError}
// // // //                 </Typography>
// // // //               </Box>
// // // //             )}

// // // //             {pageCount > 1 && (
// // // //               <Box display="flex" justifyContent="center" mt={4}>
// // // //                 <Pagination
// // // //                   count={pageCount}
// // // //                   page={page}
// // // //                   onChange={handlePageChange}
// // // //                   color="primary"
// // // //                 />
// // // //               </Box>
// // // //             )}
// // // //           </Box>
// // // //         </Box>
// // // //       </Paper>
// // // //       {/* Rate Office Dialog */}
// // // //       <Dialog open={openRateDialog} onClose={handleCloseDialog}>
// // // //         <DialogTitle>Rate this Office</DialogTitle>
// // // //         <DialogContent>
// // // //           <Box
// // // //             display="flex"
// // // //             flexDirection="column"
// // // //             alignItems="center"
// // // //             justifyContent="center"
// // // //             p={2}
// // // //           >
// // // //             <Rating
// // // //               name="office-rating"
// // // //               value={userRating}
// // // //               onChange={(event, newValue) => {
// // // //                 setUserRating(newValue);
// // // //               }}
// // // //               size="large"
// // // //             />
// // // //             <Typography variant="body2" color="textSecondary" mt={1}>
// // // //               Select your rating out of 5 stars.
// // // //             </Typography>
// // // //           </Box>
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={handleCloseDialog} color="secondary">
// // // //             Cancel
// // // //           </Button>
// // // //           <Button
// // // //             onClick={handleSaveRating}
// // // //             color="primary"
// // // //             disabled={userRating === 0}
// // // //           >
// // // //             Save
// // // //           </Button>
// // // //         </DialogActions>
// // // //       </Dialog>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default OfficeDetailsPage;

// // // import React, { useEffect, useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { useParams } from "react-router-dom";
// // // import {
// // //   Box,
// // //   Typography,
// // //   CircularProgress,
// // //   Paper,
// // //   Grid,
// // //   Pagination,
// // //   Button,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   Rating,
// // //   Avatar,
// // //   TextField,
// // // } from "@mui/material";
// // // import { FaPhone, FaStar } from "react-icons/fa";

// // // // Redux Slices
// // // import {
// // //   getOfficeById,
// // //   clearOfficeState,
// // //   fetchFavoriteOffices,
// // //   createFavoriteOffice,
// // //   deleteFavoriteOffice,
// // // } from "../redux/office/officeSlice";
// // // import {
// // //   fetchPropertiesByOfficeId,
// // //   setPage,
// // // } from "../redux/property/propertySlice";
// // // import { createOfficeRating } from "../redux/office rating/officeRatingSlice";
// // // import {
// // //   fetchOfficeCommentsByOfficeId,
// // //   createOfficeComment,
// // // } from "../redux/office comment/officeCommentSlice";

// // // // Components
// // // import PropertyList from "../components/propertyList";

// // // const OfficeDetailsPage = () => {
// // //   const { id } = useParams();
// // //   const dispatch = useDispatch();

// // //   // Selectors from Redux store
// // //   const {
// // //     selectedOffice,
// // //     loading,
// // //     error,
// // //     favoriteOffices,
// // //     favoriteOfficesLoading,
// // //   } = useSelector((state) => state.office);
// // //   const {
// // //     currentOfficeProperties,
// // //     currentOfficeLoading,
// // //     currentOfficePagination,
// // //     currentOfficePropertiesError,
// // //   } = useSelector((state) => state.property);
// // //   const {
// // //     comments,
// // //     loading: commentsLoading,
// // //     error: commentsError,
// // //   } = useSelector((state) => state.officeComment);

// // //   // Local state for dialogs and inputs
// // //   const [openRateDialog, setOpenRateDialog] = useState(false);
// // //   const [userRating, setUserRating] = useState(0);
// // //   const [openCommentDialog, setOpenCommentDialog] = useState(false);
// // //   const [newCommentContent, setNewCommentContent] = useState("");

// // //   const page = currentOfficePagination.page;
// // //   const pageCount = currentOfficePagination.pageCount;
// // //   const isFavorite = favoriteOffices.some(
// // //     (fav) => fav.office.id === selectedOffice?.id
// // //   );

// // //   // Effect to fetch initial data on component mount
// // //   useEffect(() => {
// // //     dispatch(getOfficeById(id));
// // //     dispatch(fetchFavoriteOffices());

// // //     return () => {
// // //       dispatch(clearOfficeState());
// // //     };
// // //   }, [dispatch, id]);

// // //   // Effect to fetch properties whenever selected office or page changes
// // //   useEffect(() => {
// // //     if (selectedOffice?.id) {
// // //       dispatch(fetchPropertiesByOfficeId({ officeId: selectedOffice.id, page }));
// // //     }
// // //   }, [selectedOffice, dispatch, page]);

// // //   // Handlers for property pagination
// // //   const handlePropertyPageChange = (event, value) => {
// // //     dispatch(setPage({ page: value, limit: currentOfficePagination.limit }));
// // //   };

// // //   // Handlers for favoriting
// // //   const handleToggleFavorite = () => {
// // //     if (!selectedOffice || favoriteOfficesLoading) return;

// // //     if (isFavorite) {
// // //       dispatch(deleteFavoriteOffice(selectedOffice.id));
// // //     } else {
// // //       dispatch(createFavoriteOffice(selectedOffice.id));
// // //     }
// // //   };

// // //   // Handlers for rating dialog
// // //   const handleOpenRateDialog = () => setOpenRateDialog(true);
// // //   const handleCloseRateDialog = () => {
// // //     setOpenRateDialog(false);
// // //     setUserRating(0);
// // //   };
// // //   const handleSaveRating = () => {
// // //     if (selectedOffice && userRating > 0) {
// // //       dispatch(
// // //         createOfficeRating({
// // //           officeId: selectedOffice.id,
// // //           numberOfStars: userRating,
// // //         })
// // //       );
// // //       handleCloseRateDialog();
// // //     }
// // //   };

// // //   // Handlers for comment dialog
// // //   const handleOpenCommentDialog = () => setOpenCommentDialog(true);
// // //   const handleCloseCommentDialog = () => {
// // //     setOpenCommentDialog(false);
// // //     setNewCommentContent("");
// // //   };
// // //   const handleCreateComment = () => {
// // //     if (newCommentContent.trim() && selectedOffice) {
// // //       dispatch(
// // //         createOfficeComment({
// // //           officeId: selectedOffice.id,
// // //           content: newCommentContent,
// // //         })
// // //       );
// // //       handleCloseCommentDialog();
// // //     }
// // //   };

// // //   // Handler to load comments from the API
// // //   const handleLoadComments = () => {
// // //     dispatch(
// // //       fetchOfficeCommentsByOfficeId({
// // //         officeId: selectedOffice.id,
// // //         paginationDto: {
// // //           page: 1, // Always load the first page of comments on button click
// // //           limit: 10,
// // //         },
// // //       })
// // //     );
// // //   };

// // //   // Loading and error state checks
// // //   if (loading) {
// // //     return (
// // //       <Box display="flex" justifyContent="center" mt={4}>
// // //         <CircularProgress />
// // //       </Box>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <Box textAlign="center" mt={4}>
// // //         <Typography color="error">{error}</Typography>
// // //       </Box>
// // //     );
// // //   }

// // //   if (!selectedOffice) {
// // //     return null;
// // //   }

// // //   return (
// // //     <Box p={4}>
// // //       <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
// // //         <Box
// // //           component="img"
// // //           src={selectedOffice.office_photo?.url || "/office-placeholder.png"}
// // //           alt={selectedOffice.name}
// // //           sx={{ width: "100%", height: 300, objectFit: "cover" }}
// // //         />
// // //         <Box p={3}>
// // //           {/* Office Details and Favorite Button */}
// // //           <Box
// // //             sx={{
// // //               display: "flex",
// // //               justifyContent: "space-between",
// // //               alignItems: "center",
// // //               flexWrap: "wrap",
// // //             }}
// // //           >
// // //             <Typography variant="h4" gutterBottom>
// // //               {selectedOffice.name}
// // //             </Typography>
// // //             <Button
// // //               variant="contained"
// // //               color={isFavorite ? "error" : "success"}
// // //               onClick={handleToggleFavorite}
// // //               disabled={favoriteOfficesLoading}
// // //               sx={{ minWidth: 180 }}
// // //             >
// // //               {favoriteOfficesLoading
// // //                 ? "Updating..."
// // //                 : isFavorite
// // //                 ? "Remove from Favorite"
// // //                 : "Add to Favorite"}
// // //             </Button>
// // //           </Box>

// // //           <Grid container spacing={2} alignItems="center">
// // //             <Grid item>
// // //               <FaPhone size={18} />
// // //             </Grid>
// // //             <Grid item>
// // //               <Typography variant="body1">
// // //                 {selectedOffice.office_phone}
// // //               </Typography>
// // //             </Grid>
// // //           </Grid>

// // //           {/* Rating Section */}
// // //           <Box display="flex" alignItems="center" mt={2}>
// // //             {[...Array(5)].map((_, idx) => (
// // //               <FaStar
// // //                 key={idx}
// // //                 size={20}
// // //                 color={idx < selectedOffice.ratingsCount ? "#FFD700" : "#CCCCCC"}
// // //               />
// // //             ))}
// // //             <Typography ml={1}>({selectedOffice.ratingsCount})</Typography>
// // //             <Button
// // //               variant="outlined"
// // //               color="primary"
// // //               sx={{ ml: 2 }}
// // //               onClick={handleOpenRateDialog}
// // //             >
// // //               Rate Office
// // //             </Button>
// // //           </Box>

// // //           {/* Blogs Section */}
// // //           <Box mt={4}>
// // //             <Typography variant="h6">Blogs</Typography>
// // //             {selectedOffice.blogs && selectedOffice.blogs.length > 0 ? (
// // //               selectedOffice.blogs.map((blog) => (
// // //                 <Paper
// // //                   key={blog.id}
// // //                   sx={{ p: 2, my: 1, borderLeft: "4px solid #1976d2" }}
// // //                 >
// // //                   <Typography variant="subtitle1" fontWeight="bold">
// // //                     {blog.title}
// // //                   </Typography>
// // //                   <Typography variant="body2">{blog.content}</Typography>
// // //                 </Paper>
// // //               ))
// // //             ) : (
// // //               <Typography variant="body2" color="text.secondary">
// // //                 No blogs yet.
// // //               </Typography>
// // //             )}
// // //           </Box>

// // //           {/* Properties Section */}
// // //           <Box mt={4}>
// // //             <Typography variant="h6">Properties</Typography>
// // //             <PropertyList properties={currentOfficeProperties} />

// // //             {currentOfficeProperties?.length === 0 && (
// // //               <Typography variant="body2" color="text.secondary">
// // //                 No properties yet.
// // //               </Typography>
// // //             )}

// // //             {currentOfficeLoading && (
// // //               <Box display="flex" justifyContent="center" mt={2}>
// // //                 <CircularProgress />
// // //               </Box>
// // //             )}

// // //             {currentOfficePropertiesError && (
// // //               <Box textAlign="center" mt={4}>
// // //                 <Typography color="error">
// // //                   {currentOfficePropertiesError}
// // //                 </Typography>
// // //               </Box>
// // //             )}

// // //             {pageCount > 1 && (
// // //               <Box display="flex" justifyContent="center" mt={4}>
// // //                 <Pagination
// // //                   count={pageCount}
// // //                   page={page}
// // //                   onChange={handlePropertyPageChange}
// // //                   color="primary"
// // //                 />
// // //               </Box>
// // //             )}
// // //           </Box>

// // //           {/* Comments Section */}
// // //           <Box mt={4}>
// // //             <Typography variant="h6">Comments</Typography>
// // //             <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
// // //               <Button
// // //                 variant="contained"
// // //                 onClick={handleLoadComments}
// // //                 disabled={commentsLoading}
// // //               >
// // //                 {commentsLoading ? "Loading..." : "Load Comments"}
// // //               </Button>
// // //               <Button
// // //                 variant="outlined"
// // //                 onClick={handleOpenCommentDialog}
// // //                 disabled={!selectedOffice}
// // //               >
// // //                 Add a Comment
// // //               </Button>
// // //             </Box>

// // //             {commentsLoading && (
// // //               <Box display="flex" justifyContent="center" mt={2}>
// // //                 <CircularProgress />
// // //               </Box>
// // //             )}

// // //             {commentsError && (
// // //               <Typography color="error" mt={2}>
// // //                 {commentsError}
// // //               </Typography>
// // //             )}

// // //             {comments.length > 0 ? (
// // //               <Box mt={2}>
// // //                 {comments.map((comment) => (
// // //                   <Paper key={comment.id} sx={{ p: 2, my: 2 }}>
// // //                     <Box display="flex" alignItems="center" mb={1}>
// // //                       <Avatar
// // //                         src={
// // //                           comment.user?.profile_photo?.url || "/default-avatar.png"
// // //                         }
// // //                         sx={{ width: 40, height: 40, mr: 2 }}
// // //                       />
// // //                       <Typography variant="body1">{comment.content}</Typography>
// // //                     </Box>
// // //                   </Paper>
// // //                 ))}
// // //               </Box>
// // //             ) : (
// // //               !commentsLoading && (
// // //                 <Typography variant="body2" color="text.secondary" mt={2}>
// // //                   No comments yet. Be the first to add one!
// // //                 </Typography>
// // //               )
// // //             )}
// // //           </Box>
// // //         </Box>
// // //       </Paper>

// // //       {/* Rate Office Dialog */}
// // //       <Dialog open={openRateDialog} onClose={handleCloseRateDialog}>
// // //         <DialogTitle>Rate this Office</DialogTitle>
// // //         <DialogContent>
// // //           <Box
// // //             display="flex"
// // //             flexDirection="column"
// // //             alignItems="center"
// // //             justifyContent="center"
// // //             p={2}
// // //           >
// // //             <Rating
// // //               name="office-rating"
// // //               value={userRating}
// // //               onChange={(event, newValue) => {
// // //                 setUserRating(newValue);
// // //               }}
// // //               size="large"
// // //             />
// // //             <Typography variant="body2" color="textSecondary" mt={1}>
// // //               Select your rating out of 5 stars.
// // //             </Typography>
// // //           </Box>
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={handleCloseRateDialog} color="secondary">
// // //             Cancel
// // //           </Button>
// // //           <Button
// // //             onClick={handleSaveRating}
// // //             color="primary"
// // //             disabled={userRating === 0}
// // //           >
// // //             Save
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>

// // //       {/* Comment Creation Dialog */}
// // //       <Dialog open={openCommentDialog} onClose={handleCloseCommentDialog}>
// // //         <DialogTitle>Add a Comment</DialogTitle>
// // //         <DialogContent>
// // //           <TextField
// // //             autoFocus
// // //             margin="dense"
// // //             id="comment-content"
// // //             label="Your Comment"
// // //             type="text"
// // //             fullWidth
// // //             variant="outlined"
// // //             multiline
// // //             rows={4}
// // //             value={newCommentContent}
// // //             onChange={(e) => setNewCommentContent(e.target.value)}
// // //           />
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={handleCloseCommentDialog} color="secondary">
// // //             Cancel
// // //           </Button>
// // //           <Button
// // //             onClick={handleCreateComment}
// // //             color="primary"
// // //             disabled={!newCommentContent.trim()}
// // //           >
// // //             Post
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </Box>
// // //   );
// // // };

// // // export default OfficeDetailsPage;

// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useParams } from "react-router-dom";
// // import {
// //   Box,
// //   Typography,
// //   CircularProgress,
// //   Paper,
// //   Grid,
// //   Pagination,
// //   Button,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Rating,
// //   Avatar,
// //   TextField,
// // } from "@mui/material";
// // import { FaPhone, FaStar } from "react-icons/fa";

// // // Redux Slices
// // import {
// //   getOfficeById,
// //   clearOfficeState,
// //   fetchFavoriteOffices,
// //   createFavoriteOffice,
// //   deleteFavoriteOffice,
// // } from "../redux/office/officeSlice";
// // import {
// //   fetchPropertiesByOfficeId,
// //   setPage,
// // } from "../redux/property/propertySlice";
// // import { createOfficeRating } from "../redux/office rating/officeRatingSlice";
// // import {
// //   fetchOfficeCommentsByOfficeId,
// //   createOfficeComment,
// // } from "../redux/office comment/officeCommentSlice";

// // // Components
// // import PropertyList from "../components/propertyList";

// // const OfficeDetailsPage = () => {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();

// //   // Selectors from Redux store
// //   const {
// //     selectedOffice,
// //     loading,
// //     error,
// //     favoriteOffices,
// //     favoriteOfficesLoading,
// //   } = useSelector((state) => state.office);
// //   const {
// //     currentOfficeProperties,
// //     currentOfficeLoading,
// //     currentOfficePagination,
// //     currentOfficePropertiesError,
// //   } = useSelector((state) => state.property);
// //   const {
// //     comments,
// //     loading: commentsLoading,
// //     error: commentsError,
// //   } = useSelector((state) => state.officeComment);

// //   // Local state for dialogs and inputs
// //   const [openRateDialog, setOpenRateDialog] = useState(false);
// //   const [userRating, setUserRating] = useState(0);
// //   const [openCommentDialog, setOpenCommentDialog] = useState(false);
// //   const [newCommentContent, setNewCommentContent] = useState("");

// //   const page = currentOfficePagination.page;
// //   const pageCount = currentOfficePagination.pageCount;
// //   const isFavorite = favoriteOffices.some(
// //     (fav) => fav.office.id === selectedOffice?.id
// //   );

// //   // Effect to fetch initial data on component mount
// //   useEffect(() => {
// //     dispatch(getOfficeById(id));
// //     dispatch(fetchFavoriteOffices());

// //     return () => {
// //       dispatch(clearOfficeState());
// //     };
// //   }, [dispatch, id]);

// //   // Effect to fetch properties whenever selected office or page changes
// //   useEffect(() => {
// //     if (selectedOffice?.id) {
// //       dispatch(fetchPropertiesByOfficeId({ officeId: selectedOffice.id, page }));
// //     }
// //   }, [selectedOffice, dispatch, page]);

// //   // Handlers for property pagination
// //   const handlePropertyPageChange = (event, value) => {
// //     dispatch(setPage({ page: value, limit: currentOfficePagination.limit }));
// //   };

// //   // Handlers for favoriting
// //   const handleToggleFavorite = () => {
// //     if (!selectedOffice || favoriteOfficesLoading) return;

// //     if (isFavorite) {
// //       dispatch(deleteFavoriteOffice(selectedOffice.id));
// //     } else {
// //       dispatch(createFavoriteOffice(selectedOffice.id));
// //     }
// //   };

// //   // Handlers for rating dialog
// //   const handleOpenRateDialog = () => setOpenRateDialog(true);
// //   const handleCloseRateDialog = () => {
// //     setOpenRateDialog(false);
// //     setUserRating(0);
// //   };
// //   const handleSaveRating = () => {
// //     if (selectedOffice && userRating > 0) {
// //       dispatch(
// //         createOfficeRating({
// //           officeId: selectedOffice.id,
// //           numberOfStars: userRating,
// //         })
// //       );
// //       handleCloseRateDialog();
// //     }
// //   };

// //   // Handlers for comment dialog
// //   const handleOpenCommentDialog = () => setOpenCommentDialog(true);
// //   const handleCloseCommentDialog = () => {
// //     setOpenCommentDialog(false);
// //     setNewCommentContent("");
// //   };
// //   const handleCreateComment = () => {
// //     if (newCommentContent.trim() && selectedOffice) {
// //       dispatch(
// //         createOfficeComment({
// //           officeId: selectedOffice.id,
// //           content: newCommentContent,
// //         })
// //       );
// //       handleCloseCommentDialog();
// //     }
// //   };

// //   // Handler to load comments from the API
// //   const handleLoadComments = () => {
// //     dispatch(
// //       fetchOfficeCommentsByOfficeId({
// //         officeId: selectedOffice.id,
// //         paginationDto: {
// //           page: 1, // Always load the first page of comments on button click
// //           limit: 10,
// //         },
// //       })
// //     );
// //   };

// //   // Helper function to format the date
// //   const formatDate = (dateString) => {
// //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
// //     return new Date(dateString).toLocaleDateString(undefined, options);
// //   };

// //   // Loading and error state checks
// //   if (loading) {
// //     return (
// //       <Box display="flex" justifyContent="center" mt={4}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //     }

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
// //           {/* Office Details and Favorite Button */}
// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               flexWrap: "wrap",
// //             }}
// //           >
// //             <Typography variant="h4" gutterBottom>
// //               {selectedOffice.name}
// //             </Typography>
// //             <Button
// //               variant="contained"
// //               color={isFavorite ? "error" : "success"}
// //               onClick={handleToggleFavorite}
// //               disabled={favoriteOfficesLoading}
// //               sx={{ minWidth: 180 }}
// //             >
// //               {favoriteOfficesLoading
// //                 ? "Updating..."
// //                 : isFavorite
// //                 ? "Remove from Favorite"
// //                 : "Add to Favorite"}
// //             </Button>
// //           </Box>

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

// //           {/* Rating Section */}
// //           <Box display="flex" alignItems="center" mt={2}>
// //             {[...Array(5)].map((_, idx) => (
// //               <FaStar
// //                 key={idx}
// //                 size={20}
// //                 color={idx < selectedOffice.ratingsCount ? "#FFD700" : "#CCCCCC"}
// //               />
// //             ))}
// //             <Typography ml={1}>({selectedOffice.ratingsCount})</Typography>
// //             <Button
// //               variant="outlined"
// //               color="primary"
// //               sx={{ ml: 2 }}
// //               onClick={handleOpenRateDialog}
// //             >
// //               Rate Office
// //             </Button>
// //           </Box>

// //           {/* Blogs Section */}
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

// //             {currentOfficeProperties?.length === 0 && (
// //               <Typography variant="body2" color="text.secondary">
// //                 No properties yet.
// //               </Typography>
// //             )}

// //             {currentOfficeLoading && (
// //               <Box display="flex" justifyContent="center" mt={2}>
// //                 <CircularProgress />
// //               </Box>
// //             )}

// //             {currentOfficePropertiesError && (
// //               <Box textAlign="center" mt={4}>
// //                 <Typography color="error">
// //                   {currentOfficePropertiesError}
// //                 </Typography>
// //               </Box>
// //             )}

// //             {pageCount > 1 && (
// //               <Box display="flex" justifyContent="center" mt={4}>
// //                 <Pagination
// //                   count={pageCount}
// //                   page={page}
// //                   onChange={handlePropertyPageChange}
// //                   color="primary"
// //                 />
// //               </Box>
// //             )}
// //           </Box>

// //           {/* Comments Section */}
// //           <Box mt={4}>
// //             <Typography variant="h6">Comments</Typography>
// //             <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
// //               <Button
// //                 variant="contained"
// //                 onClick={handleLoadComments}
// //                 disabled={commentsLoading}
// //               >
// //                 {commentsLoading ? "Loading..." : "Load Comments"}
// //               </Button>
// //               <Button
// //                 variant="outlined"
// //                 onClick={handleOpenCommentDialog}
// //                 disabled={!selectedOffice}
// //               >
// //                 Add a Comment
// //               </Button>
// //             </Box>

// //             {commentsLoading && (
// //               <Box display="flex" justifyContent="center" mt={2}>
// //                 <CircularProgress />
// //               </Box>
// //             )}

// //             {commentsError && (
// //               <Typography color="error" mt={2}>
// //                 {commentsError}
// //               </Typography>
// //             )}

// //             {comments.length > 0 ? (
// //               <Box mt={2}>
// //                 {comments.map((comment) => (
// //                   <Paper key={comment.id} sx={{ p: 2, my: 2 }}>
// //                     <Box display="flex" alignItems="center" mb={1}>
// //                       <Avatar
// //                         src={
// //                           comment.user?.profile_photo?.url || "/default-avatar.png"
// //                         }
// //                         sx={{ width: 40, height: 40, mr: 2 }}
// //                       />
// //                       <Box>
// //                         <Typography variant="body1">{comment.content}</Typography>
// //                         <Typography variant="caption" color="text.secondary">
// //                           {formatDate(comment.createAt)}
// //                         </Typography>
// //                       </Box>
// //                     </Box>
// //                   </Paper>
// //                 ))}
// //               </Box>
// //             ) : (
// //               !commentsLoading && (
// //                 <Typography variant="body2" color="text.secondary" mt={2}>
// //                   No comments yet. Be the first to add one!
// //                 </Typography>
// //               )
// //             )}
// //           </Box>
// //         </Box>
// //       </Paper>

// //       {/* Rate Office Dialog */}
// //       <Dialog open={openRateDialog} onClose={handleCloseRateDialog}>
// //         <DialogTitle>Rate this Office</DialogTitle>
// //         <DialogContent>
// //           <Box
// //             display="flex"
// //             flexDirection="column"
// //             alignItems="center"
// //             justifyContent="center"
// //             p={2}
// //           >
// //             <Rating
// //               name="office-rating"
// //               value={userRating}
// //               onChange={(event, newValue) => {
// //                 setUserRating(newValue);
// //               }}
// //               size="large"
// //             />
// //             <Typography variant="body2" color="textSecondary" mt={1}>
// //               Select your rating out of 5 stars.
// //             </Typography>
// //           </Box>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleCloseRateDialog} color="secondary">
// //             Cancel
// //           </Button>
// //           <Button
// //             onClick={handleSaveRating}
// //             color="primary"
// //             disabled={userRating === 0}
// //           >
// //             Save
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Comment Creation Dialog */}
// //       <Dialog open={openCommentDialog} onClose={handleCloseCommentDialog}>
// //         <DialogTitle>Add a Comment</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             autoFocus
// //             margin="dense"
// //             id="comment-content"
// //             label="Your Comment"
// //             type="text"
// //             fullWidth
// //             variant="outlined"
// //             multiline
// //             rows={4}
// //             value={newCommentContent}
// //             onChange={(e) => setNewCommentContent(e.target.value)}
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleCloseCommentDialog} color="secondary">
// //             Cancel
// //           </Button>
// //           <Button
// //             onClick={handleCreateComment}
// //             color="primary"
// //             disabled={!newCommentContent.trim()}
// //           >
// //             Post
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default OfficeDetailsPage;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Paper,
//   Grid,
//   Pagination,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Rating,
//   Avatar,
//   TextField,
// } from "@mui/material";
// import { FaPhone, FaStar } from "react-icons/fa";

// // Redux Slices
// import {
//   getOfficeById,
//   clearOfficeState,
//   fetchFavoriteOffices,
//   createFavoriteOffice,
//   deleteFavoriteOffice,
// } from "../redux/office/officeSlice";
// import {
//   fetchPropertiesByOfficeId,
//   setPage,
// } from "../redux/property/propertySlice";
// import { createOfficeRating } from "../redux/office rating/officeRatingSlice";
// import {
//   fetchOfficeCommentsByOfficeId,
//   createOfficeComment,
// } from "../redux/office comment/officeCommentSlice";

// // Components
// import PropertyList from "../components/propertyList";

// const OfficeDetailsPage = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   // Selectors from Redux store
//   const {
//     selectedOffice,
//     loading,
//     error,
//     favoriteOffices,
//     favoriteOfficesLoading,
//   } = useSelector((state) => state.office);
//   const {
//     currentOfficeProperties,
//     currentOfficeLoading,
//     currentOfficePagination,
//     currentOfficePropertiesError,
//   } = useSelector((state) => state.property);
//   const {
//     comments,
//     loading: commentsLoading,
//     error: commentsError,
//   } = useSelector((state) => state.officeComment);

//   // Local state for dialogs and inputs
//   const [openRateDialog, setOpenRateDialog] = useState(false);
//   const [userRating, setUserRating] = useState(0);
//   const [openCommentDialog, setOpenCommentDialog] = useState(false);
//   const [newCommentContent, setNewCommentContent] = useState("");

//   const page = currentOfficePagination.page;
//   const pageCount = currentOfficePagination.pageCount;
//   const isFavorite = favoriteOffices.some(
//     (fav) => fav.office.id === selectedOffice?.id
//   );

//   // Effect to fetch initial data on component mount
//   useEffect(() => {
//     dispatch(getOfficeById(id));
//     dispatch(fetchFavoriteOffices());

//     return () => {
//       dispatch(clearOfficeState());
//     };
//   }, [dispatch, id]);

//   // Effect to fetch properties whenever selected office or page changes
//   useEffect(() => {
//     if (selectedOffice?.id) {
//       dispatch(fetchPropertiesByOfficeId({ officeId: selectedOffice.id, page }));
//     }
//   }, [selectedOffice, dispatch, page]);

//   // Handlers for property pagination
//   const handlePropertyPageChange = (event, value) => {
//     dispatch(setPage({ page: value, limit: currentOfficePagination.limit }));
//   };

//   // Handlers for favoriting
//   const handleToggleFavorite = () => {
//     if (!selectedOffice || favoriteOfficesLoading) return;

//     if (isFavorite) {
//       dispatch(deleteFavoriteOffice(selectedOffice.id));
//     } else {
//       dispatch(createFavoriteOffice(selectedOffice.id));
//     }
//   };

//   // Handlers for rating dialog
//   const handleOpenRateDialog = () => setOpenRateDialog(true);
//   const handleCloseRateDialog = () => {
//     setOpenRateDialog(false);
//     setUserRating(0);
//   };
//   const handleSaveRating = () => {
//     if (selectedOffice && userRating > 0) {
//       dispatch(
//         createOfficeRating({
//           officeId: selectedOffice.id,
//           numberOfStars: userRating,
//         })
//       );
//       handleCloseRateDialog();
//     }
//   };

//   // Handlers for comment dialog
//   const handleOpenCommentDialog = () => setOpenCommentDialog(true);
//   const handleCloseCommentDialog = () => {
//     setOpenCommentDialog(false);
//     setNewCommentContent("");
//   };
//   const handleCreateComment = () => {
//     if (newCommentContent.trim() && selectedOffice) {
//       dispatch(
//         createOfficeComment({
//           officeId: selectedOffice.id,
//           content: newCommentContent,
//         })
//       );
//       handleCloseCommentDialog();
//     }
//   };

//   // Handler to load comments from the API
//   const handleLoadComments = () => {
//     dispatch(
//       fetchOfficeCommentsByOfficeId({
//         officeId: selectedOffice.id,
//         paginationDto: {
//           page: 1, // Always load the first page of comments on button click
//           limit: 10,
//         },
//       })
//     );
//   };

//   // Helper function to format the date
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Loading and error state checks
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
//           {/* Office Details and Favorite Button */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//             }}
//           >
//             <Typography variant="h4" gutterBottom>
//               {selectedOffice.name}
//             </Typography>
//             <Button
//               variant="contained"
//               color={isFavorite ? "error" : "success"}
//               onClick={handleToggleFavorite}
//               disabled={favoriteOfficesLoading}
//               sx={{ minWidth: 180 }}
//             >
//               {favoriteOfficesLoading
//                 ? "Updating..."
//                 : isFavorite
//                 ? "Remove from Favorite"
//                 : "Add to Favorite"}
//             </Button>
//           </Box>

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

//           {/* Rating Section */}
//           <Box display="flex" alignItems="center" mt={2}>
//             {[...Array(5)].map((_, idx) => (
//               <FaStar
//                 key={idx}
//                 size={20}
//                 color={idx < selectedOffice.ratingsCount ? "#FFD700" : "#CCCCCC"}
//               />
//             ))}
//             <Typography ml={1}>({selectedOffice.ratingsCount})</Typography>
//             <Button
//               variant="outlined"
//               color="primary"
//               sx={{ ml: 2 }}
//               onClick={handleOpenRateDialog}
//             >
//               Rate Office
//             </Button>
//           </Box>

//           {/* Blogs Section */}
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
//                 <Typography color="error">
//                   {currentOfficePropertiesError}
//                 </Typography>
//               </Box>
//             )}

//             {pageCount > 1 && (
//               <Box display="flex" justifyContent="center" mt={4}>
//                 <Pagination
//                   count={pageCount}
//                   page={page}
//                   onChange={handlePropertyPageChange}
//                   color="primary"
//                 />
//               </Box>
//             )}
//           </Box>

//           {/* Comments Section */}
//           <Box mt={4}>
//             <Typography variant="h6">Comments</Typography>
//             <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//               <Button
//                 variant="contained"
//                 onClick={handleLoadComments}
//                 disabled={commentsLoading}
//               >
//                 {commentsLoading ? "Loading..." : "Load Comments"}
//               </Button>
//               <Button
//                 variant="outlined"
//                 onClick={handleOpenCommentDialog}
//                 disabled={!selectedOffice}
//               >
//                 Add a Comment
//               </Button>
//             </Box>

//             {commentsLoading && (
//               <Box display="flex" justifyContent="center" mt={2}>
//                 <CircularProgress />
//               </Box>
//             )}

//             {commentsError && (
//               <Typography color="error" mt={2}>
//                 {commentsError}
//               </Typography>
//             )}

//             {comments.length > 0 ? (
//               <Box mt={2}>
//                 {comments.map((comment) => (
//                   <Paper key={comment.id} sx={{ p: 2, my: 2 }}>
//                     <Box display="flex" alignItems="flex-start" mb={1}>
//                       <Avatar
//                         src={
//                           comment.user?.profile_photo?.url || "/default-avatar.png"
//                         }
//                         sx={{ width: 40, height: 40, mr: 2 }}
//                       />
//                       <Box flexGrow={1}>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <Typography variant="subtitle2" component="span" fontWeight="bold" mr={1}>
//                                 {comment.user?.first_name} {comment.user?.last_name}
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                                 {formatDate(comment.createAt)}
//                             </Typography>
//                         </Box>
//                         <Typography variant="body1">{comment.content}</Typography>
//                       </Box>
//                     </Box>
//                   </Paper>
//                 ))}
//               </Box>
//             ) : (
//               !commentsLoading && (
//                 <Typography variant="body2" color="text.secondary" mt={2}>
//                   No comments yet. Be the first to add one!
//                 </Typography>
//               )
//             )}
//           </Box>
//         </Box>
//       </Paper>

//       {/* Rate Office Dialog */}
//       <Dialog open={openRateDialog} onClose={handleCloseRateDialog}>
//         <DialogTitle>Rate this Office</DialogTitle>
//         <DialogContent>
//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             p={2}
//           >
//             <Rating
//               name="office-rating"
//               value={userRating}
//               onChange={(event, newValue) => {
//                 setUserRating(newValue);
//               }}
//               size="large"
//             />
//             <Typography variant="body2" color="textSecondary" mt={1}>
//               Select your rating out of 5 stars.
//             </Typography>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseRateDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSaveRating}
//             color="primary"
//             disabled={userRating === 0}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Comment Creation Dialog */}
//       <Dialog open={openCommentDialog} onClose={handleCloseCommentDialog}>
//         <DialogTitle>Add a Comment</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="comment-content"
//             label="Your Comment"
//             type="text"
//             fullWidth
//             variant="outlined"
//             multiline
//             rows={4}
//             value={newCommentContent}
//             onChange={(e) => setNewCommentContent(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseCommentDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleCreateComment}
//             color="primary"
//             disabled={!newCommentContent.trim()}
//           >
//             Post
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default OfficeDetailsPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Pagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Avatar,
  TextField,
} from "@mui/material";
import { FaPhone, FaStar } from "react-icons/fa";

// Redux Slices
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
import { createOfficeRating } from "../redux/office rating/officeRatingSlice";
import {
  fetchOfficeCommentsByOfficeId,
  createOfficeComment,
} from "../redux/office comment/officeCommentSlice";

// Components
import PropertyList from "../components/propertyList";

const OfficeDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Selectors from Redux store
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
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
  } = useSelector((state) => state.officeComment);

  // Local state for dialogs and inputs
  const [openRateDialog, setOpenRateDialog] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");

  const page = currentOfficePagination.page;
  const pageCount = currentOfficePagination.pageCount;
  const isFavorite = favoriteOffices.some(
    (fav) => fav.office.id === selectedOffice?.id
  );

  // Effect to fetch initial data on component mount
  useEffect(() => {
    dispatch(getOfficeById(id));
    dispatch(fetchFavoriteOffices());

    return () => {
      dispatch(clearOfficeState());
    };
  }, [dispatch, id]);

  // Effect to fetch properties whenever selected office or page changes
  useEffect(() => {
    if (selectedOffice?.id) {
      dispatch(
        fetchPropertiesByOfficeId({ officeId: selectedOffice.id, page })
      );
    }
  }, [selectedOffice, dispatch, page]);

  // Handlers for property pagination
  const handlePropertyPageChange = (event, value) => {
    dispatch(setPage({ page: value, limit: currentOfficePagination.limit }));
  };

  // Handlers for favoriting
  const handleToggleFavorite = () => {
    if (!selectedOffice || favoriteOfficesLoading) return;

    if (isFavorite) {
      dispatch(deleteFavoriteOffice(selectedOffice.id));
    } else {
      dispatch(createFavoriteOffice(selectedOffice.id));
    }
  };

  // Handlers for rating dialog
  const handleOpenRateDialog = () => setOpenRateDialog(true);
  const handleCloseRateDialog = () => {
    setOpenRateDialog(false);
    setUserRating(0);
  };
  const handleSaveRating = () => {
    if (selectedOffice && userRating > 0) {
      dispatch(
        createOfficeRating({
          officeId: selectedOffice.id,
          numberOfStars: userRating,
        })
      );
      handleCloseRateDialog();
    }
  };

  // Handlers for comment dialog
  const handleOpenCommentDialog = () => setOpenCommentDialog(true);
  const handleCloseCommentDialog = () => {
    setOpenCommentDialog(false);
    setNewCommentContent("");
  };
  const handleCreateComment = () => {
    if (newCommentContent.trim() && selectedOffice) {
      dispatch(
        createOfficeComment({
          officeId: selectedOffice.id,
          content: newCommentContent,
        })
      );
      handleCloseCommentDialog();
    }
  };

  // Handler to load comments from the API
  const handleLoadComments = () => {
    dispatch(
      fetchOfficeCommentsByOfficeId({
        officeId: selectedOffice.id,
        paginationDto: {
          page: 1, // Always load the first page of comments on button click
          limit: 10,
        },
      })
    );
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Loading and error state checks
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
          {/* Office Details and Favorite Button */}
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

          {/* Rating Section */}
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
            <Button
              variant="outlined"
              color="primary"
              sx={{ ml: 2 }}
              onClick={handleOpenRateDialog}
            >
              Rate Office
            </Button>
          </Box>

          {/* Blogs Section */}
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

            {pageCount > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePropertyPageChange}
                  color="primary"
                />
              </Box>
            )}
          </Box>

          {/* Comments Section */}
          <Box mt={4}>
            <Typography variant="h6">Comments</Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleLoadComments}
                disabled={commentsLoading}
              >
                {commentsLoading ? "Loading..." : "Load Comments"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleOpenCommentDialog}
                disabled={!selectedOffice}
              >
                Add a Comment
              </Button>
            </Box>

            {commentsLoading && (
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            )}

            {commentsError && (
              <Typography color="error" mt={2}>
                {commentsError}
              </Typography>
            )}

            {comments.length > 0 ? (
              <Box mt={2}>
                {comments.map((comment) => (
                  <Paper key={comment.id} sx={{ p: 2, my: 2 }}>
                    <Box display="flex" alignItems="flex-start" mb={1}>
                      <Avatar
                        src={
                          comment.user?.profile_photo?.url ||
                          "/default-avatar.png"
                        }
                        sx={{ width: 40, height: 40, mr: 2 }}
                      />
                      <Box flexGrow={1}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="subtitle2"
                            component="span"
                            fontWeight="bold"
                            mr={1}
                          >
                            {comment.user?.first_name} {comment.user?.last_name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(comment.createAt)}
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          {comment.content}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              !commentsLoading && (
                <Typography variant="body2" color="text.secondary" mt={2}>
                  No comments yet. Be the first to add one!
                </Typography>
              )
            )}
          </Box>
        </Box>
      </Paper>

      {/* Rate Office Dialog */}
      <Dialog open={openRateDialog} onClose={handleCloseRateDialog}>
        <DialogTitle>Rate this Office</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={2}
          >
            <Rating
              name="office-rating"
              value={userRating}
              onChange={(event, newValue) => {
                setUserRating(newValue);
              }}
              size="large"
            />
            <Typography variant="body2" color="textSecondary" mt={1}>
              Select your rating out of 5 stars.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRateDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveRating}
            color="primary"
            disabled={userRating === 0}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comment Creation Dialog */}
      <Dialog open={openCommentDialog} onClose={handleCloseCommentDialog}>
        <DialogTitle>Add a Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="comment-content"
            label="Your Comment"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCommentDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateComment}
            color="primary"
            disabled={!newCommentContent.trim()}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OfficeDetailsPage;
