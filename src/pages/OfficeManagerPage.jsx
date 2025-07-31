// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getUserOffice, clearOfficeState } from "../redux/office/officeSlice";
// // import {
// //   createBlog,
// //   resetBlogState,
// //   deleteBlog,
// //   updateBlog,
// //   getOfficeBlogs,
// // } from "../redux/blog/blogSlice";
// // import {
// //   Box,
// //   Typography,
// //   CircularProgress,
// //   Paper,
// //   Grid,
// //   Button,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   TextField,
// //   Alert,
// // } from "@mui/material";
// // import { FaPhone, FaStar, FaPlus } from "react-icons/fa";
// // import BlogCard from "../components/BlogCard";
// // import { Link } from "react-router-dom";
// // import {
// //   deleteProperty,
// //   fetchPropertiesByOfficeId,
// // } from "../redux/property/propertySlice";
// // import Swal from "sweetalert2";
// // import PropertyList from "../components/propertyList";

// // const OfficeManagerPage = () => {
// //   const dispatch = useDispatch();

// //   const { UserOffice, loading, error } = useSelector((state) => state.office);
// //   const {
// //     currentOfficeProperties,
// //     currentOfficeLoading,
// //     currentOfficeError,
// //   } = useSelector((state) => state.property);
// //   const {
// //     loading: blogLoading,
// //     success: blogSuccess,
// //     error: blogError,
// //     officeBlogs,
// //   } = useSelector((state) => state.blog);

// //   const [open, setOpen] = useState(false);
// //   const [title, setTitle] = useState("");
// //   const [content, setContent] = useState("");
// //   const [photo, setPhoto] = useState(null);

// //   const [editMode, setEditMode] = useState(false);
// //   const [editBlogId, setEditBlogId] = useState(null);

// //   // local form loading
// //   const [formLoading, setFormLoading] = useState(false);

// //   // load user office on mount
// //   useEffect(() => {
// //     dispatch(getUserOffice());
// //     return () => {
// //       dispatch(clearOfficeState());
// //       dispatch(resetBlogState());
// //     };
// //   }, [dispatch]);

// //   // load blogs once UserOffice is fetched
// //   useEffect(() => {
// //     if (UserOffice?.id) {
// //       dispatch(getOfficeBlogs());
// //       dispatch(fetchPropertiesByOfficeId(UserOffice?.id));
// //     }
// //   }, [UserOffice, dispatch]);

// //   // refetch blogs after successful create/update
// //   useEffect(() => {
// //     if (blogSuccess) {
// //       dispatch(getOfficeBlogs()).then(() => {
// //         dispatch(resetBlogState());
// //         setFormLoading(false); // stop form loading
// //         setOpen(false);
// //         setTitle("");
// //         setContent("");
// //         setPhoto(null);
// //         setEditMode(false);
// //         setEditBlogId(null);
// //       });
// //     }
// //   }, [blogSuccess, dispatch]);

// //   const handleSubmit = () => {
// //     const formData = new FormData();
// //     formData.append("title", title);
// //     formData.append("content", content);
// //     if (photo) {
// //       formData.append("blog_photo", photo);
// //     }
// //     setFormLoading(true); // start form loading
// //     if (editMode) {
// //       dispatch(updateBlog({ id: editBlogId, formData }));
// //     } else {
// //       dispatch(createBlog({ formData }));
// //     }
// //   };

// //   const handleDeleteProperty = (id) => {
// //     dispatch(deleteProperty(id));
// //   };

// //   // const handleDeleteBlog = (id) => {
// //   //   if (window.confirm("Are you sure you want to delete this blog?")) {
// //   //     dispatch(deleteBlog(id));
// //   //     // delete handled by reducer
// //   //   }
// //   // };

// //   const handleDeleteBlog = (id) => {
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "This action will delete the blog!",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#d33",
// //       cancelButtonColor: "#3085d6",
// //       confirmButtonText: "Yes, delete it!",
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         console.log("result",result.isConfirmed);
// //         dispatch(deleteBlog(id));

// //       }
// //     });
// //   };

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

// //   if (!UserOffice) {
// //     return (
// //       <Box textAlign="center" mt={4}>
// //         <Typography>No office assigned yet.</Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box p={4}>
// //       <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
// //         <Box
// //           component="img"
// //           src={UserOffice.office_photo?.url || "/office-placeholder.png"}
// //           alt={UserOffice.name}
// //           sx={{ width: "100%", height: 300, objectFit: "cover" }}
// //         />
// //         <Box p={3}>
// //           <Typography variant="h4" gutterBottom>
// //             {UserOffice.name}
// //           </Typography>

// //           <Grid container spacing={2} alignItems="center">
// //             <Grid item>
// //               <FaPhone size={18} />
// //             </Grid>
// //             <Grid item>
// //               <Typography variant="body1">{UserOffice.office_phone}</Typography>
// //             </Grid>
// //           </Grid>

// //           <Box display="flex" alignItems="center" mt={2}>
// //             {[...Array(5)].map((_, idx) => (
// //               <FaStar
// //                 key={idx}
// //                 size={20}
// //                 color={idx < UserOffice.ratingsCount ? "#FFD700" : "#CCCCCC"}
// //               />
// //             ))}
// //             <Typography ml={1}>({UserOffice.ratingsCount})</Typography>
// //           </Box>

// //           {/* show blogs always, only block during fetching blogs */}
// //           <Box mt={4}>
// //             <Typography variant="h6" gutterBottom>
// //               Blogs
// //             </Typography>
// //             {blogLoading && !officeBlogs?.length ? (
// //               <Box display="flex" justifyContent="center" mt={4}>
// //                 <CircularProgress />
// //               </Box>
// //             ) : (
// //               <Grid container spacing={2}>
// //                 {officeBlogs && officeBlogs.length > 0 ? (
// //                   officeBlogs.map((blog) => (
// //                     <Grid item xs={12} sm={6} md={4} key={blog.id}>
// //                       <BlogCard
// //                         blog={blog}
// //                         onEdit={(blog) => {
// //                           setEditMode(true);
// //                           setEditBlogId(blog.id);
// //                           setTitle(blog.title);
// //                           setContent(blog.content);
// //                           setOpen(true);
// //                         }}
// //                         onDelete={handleDeleteBlog}
// //                       />
// //                     </Grid>
// //                   ))
// //                 ) : (
// //                   <Typography variant="body2" color="text.secondary">
// //                     No blogs yet.
// //                   </Typography>
// //                 )}
// //               </Grid>
// //             )}
// //           </Box>

// //           <Box mt={4}>
// //             <Button
// //               variant="contained"
// //               startIcon={<FaPlus />}
// //               onClick={() => {
// //                 setOpen(true);
// //                 setEditMode(false);
// //                 setTitle("");
// //                 setContent("");
// //                 setPhoto(null);
// //               }}
// //             >
// //               Add Blog
// //             </Button>
// //           </Box>

// //           {/* show properties always, only block during fetching properties */}
// //           <Box mt={4}>
// //             <Typography variant="h6" gutterBottom>
// //               Properties
// //             </Typography>
// //             {/* <PropertyList properties={CurrentOfficeProperties}/> */}
// //             <PropertyList
// //               properties={currentOfficeProperties}
// //               canDelete={true}
// //               onDelete={handleDeleteProperty}
// //               isDeleteLoading={currentOfficeLoading}
// //             />
// //           </Box>
// //         </Box>

// //         <Box m={4}>
// //           <Link to={"/property/new"}>
// //             <Button variant="contained" startIcon={<FaPlus />}>
// //               Add Property
// //             </Button>
// //           </Link>
// //         </Box>
// //       </Paper>

// //       <Dialog
// //         open={open}
// //         onClose={() => setOpen(false)}
// //         maxWidth="sm"
// //         fullWidth
// //       >
// //         <DialogTitle>{editMode ? "Edit Blog" : "Add New Blog"}</DialogTitle>
// //         <DialogContent>
// //           {blogError && (
// //             <Alert severity="error" sx={{ mb: 2 }}>
// //               {blogError}
// //             </Alert>
// //           )}
// //           <TextField
// //             fullWidth
// //             label="Title"
// //             sx={{ my: 2 }}
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             multiline
// //             rows={4}
// //             label="Content"
// //             value={content}
// //             onChange={(e) => setContent(e.target.value)}
// //           />
// //           <Button component="label" variant="outlined" sx={{ mt: 2 }}>
// //             {photo ? photo.name : "Choose Photo"}
// //             <input
// //               type="file"
// //               hidden
// //               accept="image/*"
// //               onChange={(e) => setPhoto(e.target.files[0])}
// //             />
// //           </Button>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setOpen(false)}>Cancel</Button>
// //           <Button
// //             onClick={handleSubmit}
// //             disabled={formLoading}
// //             variant="contained"
// //           >
// //             {formLoading ? <CircularProgress size={20} /> : "Submit"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default OfficeManagerPage;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserOffice, clearOfficeState } from "../redux/office/officeSlice";
// import {
//   createBlog,
//   deleteBlog,
//   updateBlog,
//   getOfficeBlogs,
//   resetBlogState,
// } from "../redux/blog/blogSlice";
// import {
//   fetchPropertiesByOfficeId,
//   deleteProperty,
// } from "../redux/property/propertySlice";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Paper,
//   Grid,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Alert,
// } from "@mui/material";
// import { FaPhone, FaStar, FaPlus } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { Link, useNavigate } from "react-router-dom";

// import BlogCard from "../components/BlogCard";
// import PropertyList from "../components/propertyList";

// const OfficeManagerPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     UserOffice,
//     loading: officeLoading,
//     error: officeError,
//   } = useSelector((state) => state.office);
//   const { currentOfficeProperties, currentOfficeLoading } = useSelector(
//     (state) => state.property
//   );
//   const {
//     officeBlogs,
//     blogError,
//     blogSuccess,
//     loading: blogLoading,
//   } = useSelector((state) => state.blog);

//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editBlogId, setEditBlogId] = useState(null);
//   const [formLoading, setFormLoading] = useState(false);

//   // Load office on mount
//   useEffect(() => {
//     dispatch(getUserOffice());

//     return () => {
//       //  dispatch(clearOfficeState());
//       dispatch(resetBlogState());
//     };
//   }, [dispatch]);

//   // Fetch blogs and properties when office is loaded
//   useEffect(() => {
//     if (UserOffice?.id) {
//       dispatch(getOfficeBlogs(UserOffice.id));
//       dispatch(fetchPropertiesByOfficeId(UserOffice.id));
//     }
//   }, [UserOffice, dispatch]);

//   // Handle blog create/update success
//   useEffect(() => {
//     if (blogSuccess) {
//       dispatch(getOfficeBlogs(UserOffice?.id)).then(() => {
//         dispatch(resetBlogState());
//         resetBlogForm();
//       });
//     }
//   }, [blogSuccess, dispatch, UserOffice]);

//   const resetBlogForm = () => {
//     setDialogOpen(false);
//     setFormLoading(false);
//     setTitle("");
//     setContent("");
//     setPhoto(null);
//     setEditMode(false);
//     setEditBlogId(null);
//   };

//   const handleBlogSubmit = () => {
//     if (!title.trim() || !content.trim()) {
//       return Swal.fire(
//         "Validation Error",
//         "Title and content are required",
//         "warning"
//       );
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     if (photo) formData.append("blog_photo", photo);

//     setFormLoading(true);
//     if (editMode) {
//       dispatch(updateBlog({ id: editBlogId, formData }));
//     } else {
//       dispatch(createBlog({ formData }));
//     }
//   };

//   const handleDeleteBlog = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete the blog.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteBlog({ id }));
//       }
//     });
//   };

//   const handleDeleteProperty = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete the property.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteProperty(id));
//       }
//     });
//   };

//   // Render loading and error
//   if (officeLoading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (officeError) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography color="error">{officeError}</Typography>
//       </Box>
//     );
//   }

//   if (!UserOffice?.id) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography>No office assigned yet.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={4}>
//       <Paper elevation={3} sx={{ borderRadius: 3 }}>
//         <Box
//           component="img"
//           src={UserOffice.office_photo?.url || "/office-placeholder.png"}
//           alt={UserOffice.name}
//           sx={{ width: "100%", height: 300, objectFit: "cover" }}
//         />
//         <Box p={3}>
//           <Typography variant="h4">{UserOffice.name}</Typography>

//           <Grid container spacing={1} alignItems="center" mt={1}>
//             <Grid item>
//               <FaPhone size={18} />
//             </Grid>
//             <Grid item>
//               <Typography variant="body1">{UserOffice.office_phone}</Typography>
//             </Grid>
//           </Grid>

//           <Box display="flex" alignItems="center" mt={2}>
//             {[...Array(5)].map((_, i) => (
//               <FaStar
//                 key={i}
//                 size={20}
//                 color={i < UserOffice.ratingsCount ? "#FFD700" : "#CCC"}
//               />
//             ))}
//             <Typography ml={1}>({UserOffice.ratingsCount})</Typography>
//           </Box>

//           {UserOffice?.officeSubscription && (
//             <Button
//               variant="contained"
//               sx={{
//                 mt: 3,
//                 px: 2,
//                 py: 1,
//                 backgroundColor: "#ff5722",
//                 color: "#fff",
//                 fontWeight: "bold",
//                 fontSize: "1rem",
//                 textTransform: "uppercase",
//                 boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
//                 borderRadius: "12px",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#e64a19",
//                   transform: "scale(1.05)",
//                   boxShadow: "0 6px 25px rgba(0, 0, 0, 0.3)",
//                 },
//               }}
//               onClick={() => navigate("/subscriptions")}
//             >
//               Do You Want to get More Services ?
//             </Button>
//           )}

//           <Box mt={4}>
//             <Box mb={2}>
//               <Link to="/subscriptions" style={{ textDecoration: "none" }}>
//                 <Button variant="outlined" color="primary">
//                   Do you want have more services?
//                 </Button>
//               </Link>
//             </Box>
//           </Box>

//           {/* Blogs Section */}
//           <Box mt={4}>
//             <Typography variant="h6">Blogs</Typography>
//             {blogLoading && !officeBlogs?.length ? (
//               <Box display="flex" justifyContent="center" mt={2}>
//                 <CircularProgress />
//               </Box>
//             ) : (
//               <Grid container spacing={2}>
//                 {officeBlogs?.length ? (
//                   officeBlogs.map((blog) => (
//                     <Grid item xs={12} sm={6} md={4} key={blog.id}>
//                       <BlogCard
//                         blog={blog}
//                         onEdit={() => {
//                           setEditMode(true);
//                           setEditBlogId(blog.id);
//                           setTitle(blog.title);
//                           setContent(blog.content);
//                           setDialogOpen(true);
//                         }}
//                         onDelete={handleDeleteBlog}
//                       />
//                     </Grid>
//                   ))
//                 ) : (
//                   <Typography color="text.secondary" sx={{ mt: 1 }}>
//                     No blogs available.
//                   </Typography>
//                 )}
//               </Grid>
//             )}

//             <Button
//               variant="contained"
//               startIcon={<FaPlus />}
//               sx={{ mt: 2 }}
//               onClick={() => {
//                 setEditMode(false);
//                 setTitle("");
//                 setContent("");
//                 setPhoto(null);
//                 setDialogOpen(true);
//               }}
//             >
//               Add Blog
//             </Button>
//           </Box>

//           {/* Properties Section */}
//           <Box mt={4}>
//             <Typography variant="h6">Properties</Typography>
//             <PropertyList
//               properties={currentOfficeProperties}
//               canDelete
//               onDelete={handleDeleteProperty}
//               isDeleteLoading={currentOfficeLoading}
//             />
//             {currentOfficeProperties?.length === 0 && (
//               <Typography color="text.secondary" sx={{ mt: 1 }}>
//                 No properties available.
//               </Typography>
//             )}
//             <Box mt={2}>
//               <Link to="/property/new">
//                 <Button variant="contained" startIcon={<FaPlus />}>
//                   Add Property
//                 </Button>
//               </Link>
//             </Box>
//           </Box>
//         </Box>
//       </Paper>

//       {/* Blog Form Dialog */}
//       <Dialog
//         open={dialogOpen}
//         onClose={() => setDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>{editMode ? "Edit Blog" : "Add New Blog"}</DialogTitle>
//         <DialogContent>
//           {blogError && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {blogError}
//             </Alert>
//           )}
//           <TextField
//             fullWidth
//             label="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             sx={{ my: 2 }}
//           />
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             label="Content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//           <Button component="label" variant="outlined" sx={{ mt: 2 }}>
//             {photo ? photo.name : "Choose Photo"}
//             <input
//               type="file"
//               hidden
//               accept="image/*"
//               onChange={(e) => setPhoto(e.target.files[0])}
//             />
//           </Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button
//             onClick={handleBlogSubmit}
//             disabled={formLoading}
//             variant="contained"
//           >
//             {formLoading ? <CircularProgress size={20} /> : "Submit"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default OfficeManagerPage;




import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOffice, clearOfficeState } from "../redux/office/officeSlice";
import {
  createBlog,
  deleteBlog,
  updateBlog,
  getOfficeBlogs,
  resetBlogState,
} from "../redux/blog/blogSlice";
import {
  fetchPropertiesByOfficeId,
  deleteProperty,
} from "../redux/property/propertySlice";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import { FaPhone, FaStar, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import BlogCard from "../components/BlogCard";
import PropertyList from "../components/propertyList";

const OfficeManagerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    UserOffice,
    loading: officeLoading,
    error: officeError,
  } = useSelector((state) => state.office);
  const {
    currentOfficeProperties,
    currentOfficeLoading,
    propertySuccess, // Assuming a 'success' state for property actions
  } = useSelector((state) => state.property);
  const {
    officeBlogs,
    blogError,
    blogSuccess,
    loading: blogLoading,
  } = useSelector((state) => state.blog);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Load office on mount
  useEffect(() => {
    dispatch(getUserOffice());

    return () => {
      // dispatch(clearOfficeState());
      dispatch(resetBlogState());
    };
  }, [dispatch]);

  // Fetch blogs and properties when office is loaded
  useEffect(() => {
    if (UserOffice?.id) {
      dispatch(getOfficeBlogs(UserOffice.id));
      dispatch(fetchPropertiesByOfficeId({ officeId: UserOffice.id }));
    }
  }, [UserOffice, dispatch]);

  // Handle blog create/update success
  useEffect(() => {
    if (blogSuccess) {
      dispatch(getOfficeBlogs(UserOffice?.id)).then(() => {
        dispatch(resetBlogState());
        resetBlogForm();
      });
    }
  }, [blogSuccess, dispatch, UserOffice]);

  // Handle property creation success and show alert
  useEffect(() => {
    if (propertySuccess) {
      Swal.fire({
        title: "Success!",
        text: "It will be reviewed and then accepted if it is legal.",
        icon: "success",
        confirmButtonText: "OK",
      });
      // You might want to reset the property state here as well
      // dispatch(resetPropertyState()); // assuming you have a reset action for the property slice
    }
  }, [propertySuccess, dispatch]);

  const resetBlogForm = () => {
    setDialogOpen(false);
    setFormLoading(false);
    setTitle("");
    setContent("");
    setPhoto(null);
    setEditMode(false);
    setEditBlogId(null);
  };

  const handleBlogSubmit = () => {
    if (!title.trim() || !content.trim()) {
      return Swal.fire(
        "Validation Error",
        "Title and content are required",
        "warning"
      );
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (photo) formData.append("blog_photo", photo);

    setFormLoading(true);
    if (editMode) {
      dispatch(updateBlog({ id: editBlogId, formData }));
    } else {
      dispatch(createBlog({ formData }));
    }
  };

  const handleDeleteBlog = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the blog.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBlog({ id }));
      }
    });
  };

  const handleDeleteProperty = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the property.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProperty(id));
      }
    });
  };

  // Render loading and error
  if (officeLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (officeError) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{officeError}</Typography>
      </Box>
    );
  }

  if (!UserOffice?.id) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography>No office assigned yet.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <Box
          component="img"
          src={UserOffice.office_photo?.url || "/office-placeholder.png"}
          alt={UserOffice.name}
          sx={{ width: "100%", height: 300, objectFit: "cover" }}
        />
        <Box p={3}>
          <Typography variant="h4">{UserOffice.name}</Typography>

          <Grid container spacing={1} alignItems="center" mt={1}>
            <Grid item>
              <FaPhone size={18} />
            </Grid>
            <Grid item>
              <Typography variant="body1">{UserOffice.office_phone}</Typography>
            </Grid>
          </Grid>

          <Box display="flex" alignItems="center" mt={2}>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={20}
                color={i < UserOffice.ratingsCount ? "#FFD700" : "#CCC"}
              />
            ))}
            <Typography ml={1}>({UserOffice.ratingsCount})</Typography>
          </Box>

          {/* {UserOffice?.officeSubscription && ( */}
            <Button
              variant="contained"
              sx={{
                mt: 3,
                px: 2,
                py: 1,
                backgroundColor: "#ff5722",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "uppercase",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#e64a19",
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 25px rgba(0, 0, 0, 0.3)",
                },
              }}
              onClick={() => navigate("/subscriptions")}
            >
              Do You Want to get More Services ?
            </Button>
          {/* )} */}



          {/* Blogs Section */}
          <Box mt={4}>
            <Typography variant="h6">Blogs</Typography>
            {blogLoading && !officeBlogs?.length ? (
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={2}>
                {officeBlogs?.length ? (
                  officeBlogs.map((blog) => (
                    <Grid item xs={12} sm={6} md={4} key={blog.id}>
                      <BlogCard
                        blog={blog}
                        onEdit={() => {
                          setEditMode(true);
                          setEditBlogId(blog.id);
                          setTitle(blog.title);
                          setContent(blog.content);
                          setDialogOpen(true);
                        }}
                        onDelete={handleDeleteBlog}
                      />
                    </Grid>
                  ))
                ) : (
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    No blogs available.
                  </Typography>
                )}
              </Grid>
            )}

            <Button
              variant="contained"
              startIcon={<FaPlus />}
              sx={{ mt: 2 }}
              onClick={() => {
                setEditMode(false);
                setTitle("");
                setContent("");
                setPhoto(null);
                setDialogOpen(true);
              }}
            >
              Add Blog
            </Button>
          </Box>

          {/* Properties Section */}
          <Box mt={4}>
            <Typography variant="h6">Properties</Typography>
            <PropertyList
              properties={currentOfficeProperties}
              canDelete
              onDelete={handleDeleteProperty}
              isDeleteLoading={currentOfficeLoading}
            />
            {currentOfficeProperties?.length === 0 && (
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                No properties available.
              </Typography>
            )}
            <Box mt={2}>
              <Link to="/property/new">
                <Button variant="contained" startIcon={<FaPlus />}>
                  Add Property
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Blog Form Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editMode ? "Edit Blog" : "Add New Blog"}</DialogTitle>
        <DialogContent>
          {blogError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {blogError}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button component="label" variant="outlined" sx={{ mt: 2 }}>
            {photo ? photo.name : "Choose Photo"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleBlogSubmit}
            disabled={formLoading}
            variant="contained"
          >
            {formLoading ? <CircularProgress size={20} /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OfficeManagerPage;