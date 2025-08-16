// // // // // import React, { useEffect, useState } from "react";
// // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // import {
// // // // //   fetchAllPropertyRequests,
// // // // //   updatePropertyRequestByAdmin,
// // // // //   deletePropertyRequest,
// // // // // } from "../../redux/property request/propertyRequestSlice";
// // // // // import {
// // // // //   Container,
// // // // //   Typography,
// // // // //   CircularProgress,
// // // // //   Box,
// // // // //   Paper,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   TablePagination,
// // // // //   Button,
// // // // //   IconButton,
// // // // //   Tooltip,
// // // // //   Modal,
// // // // //   TextField,
// // // // //   FormControl,
// // // // //   InputLabel,
// // // // //   Select,
// // // // //   MenuItem,
// // // // //   Grid,
// // // // // } from "@mui/material";
// // // // // import {
// // // // //   CheckCircleOutline,
// // // // //   HighlightOff,
// // // // //   Visibility,
// // // // //   DeleteOutline,
// // // // // } from "@mui/icons-material";
// // // // // import { styled } from "@mui/material/styles";
// // // // // import { format } from "date-fns";
// // // // // import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// // // // // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// // // // // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// // // // // const StyledTableRow = styled(TableRow)(({ theme }) => ({
// // // // //   "&:nth-of-type(odd)": {
// // // // //     backgroundColor: theme.palette.action.hover,
// // // // //   },
// // // // //   "&:last-child td, &:last-child th": {
// // // // //     border: 0,
// // // // //   },
// // // // // }));

// // // // // const StyledModalPaper = styled(Paper)(({ theme }) => ({
// // // // //   position: "absolute",
// // // // //   top: "50%",
// // // // //   left: "50%",
// // // // //   transform: "translate(-50%, -50%)",
// // // // //   width: 500,
// // // // //   padding: theme.spacing(4),
// // // // //   outline: "none",
// // // // //   textAlign: "center",
// // // // // }));

// // // // // const PropertyRequestsPage = () => {
// // // // //   const dispatch = useDispatch();
// // // // //   const { propertyRequests, loading, error,deleteLoading ,deletError} = useSelector(
// // // // //     (state) => state.propertyRequest
// // // // //   );

// // // // //   const [page, setPage] = useState(0);
// // // // //   const [rowsPerPage, setRowsPerPage] = useState(10);
// // // // //   const [openModal, setOpenModal] = useState(false);
// // // // //   const [selectedRequest, setSelectedRequest] = useState(null);
// // // // //   const [action, setAction] = useState("");
// // // // //   const [filterType, setFilterType] = useState("All");
// // // // //   const [adminFormData, setAdminFormData] = useState({
// // // // //     propertyNumber: "",
// // // // //     expireDate: null,
// // // // //     status: "",
// // // // //   });

// // // // //   useEffect(() => {
// // // // //     dispatch(fetchAllPropertyRequests());
// // // // //   }, [dispatch]);

// // // // //   const handleChangePage = (event, newPage) => {
// // // // //     setPage(newPage);
// // // // //   };

// // // // //   const handleChangeRowsPerPage = (event) => {
// // // // //     setRowsPerPage(parseInt(event.target.value, 10));
// // // // //     setPage(0);
// // // // //   };

// // // // //   const handleOpenModal = (request, actionType) => {
// // // // //     setSelectedRequest(request);
// // // // //     setAction(actionType);
// // // // //     setAdminFormData({
// // // // //       propertyNumber: request.propertyNumber || "",
// // // // //       expireDate: null,
// // // // //       status: actionType === "accept" ? "Accepted" : "Rejected",
// // // // //     });
// // // // //     setOpenModal(true);
// // // // //   };

// // // // //   const handleCloseModal = () => {
// // // // //     setOpenModal(false);
// // // // //     setSelectedRequest(null);
// // // // //     setAction("");
// // // // //   };

// // // // //   const handleAdminFormChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setAdminFormData({ ...adminFormData, [name]: value });
// // // // //   };

// // // // //   const handleDateChange = (newDate) => {
// // // // //     setAdminFormData({ ...adminFormData, expireDate: newDate });
// // // // //   };

// // // // //   const handleAdminAction = () => {
// // // // //     if (action === "accept" || action === "reject") {
// // // // //       const updateData = {
// // // // //         id: selectedRequest.id,
// // // // //         updateData: {
// // // // //           status: action === "accept" ? "Accepted" : "Rejected",
// // // // //           propertyNumber: adminFormData.propertyNumber,
// // // // //           expireDate:
// // // // //             selectedRequest.typeOperation === "Renting"
// // // // //               ? adminFormData.expireDate
// // // // //               : null,
// // // // //         },
// // // // //       };
// // // // //       dispatch(updatePropertyRequestByAdmin(updateData)).then(() => {
// // // // //         dispatch(fetchAllPropertyRequests());
// // // // //         handleCloseModal();
// // // // //       });
// // // // //     } else if (action === "delete") {
// // // // //       dispatch(deletePropertyRequest(selectedRequest.id)).then(() => {
// // // // //         dispatch(fetchAllPropertyRequests());
// // // // //         handleCloseModal();
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const filteredRequests = propertyRequests.filter((request) => {
// // // // //     if (filterType === "All") return true;
// // // // //     return request.typeOperation === filterType;
// // // // //   });

// // // // //   const paginatedRequests = filteredRequests.slice(
// // // // //     page * rowsPerPage,
// // // // //     page * rowsPerPage + rowsPerPage
// // // // //   );

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <Box
// // // // //         display="flex"
// // // // //         justifyContent="center"
// // // // //         alignItems="center"
// // // // //         minHeight="100vh"
// // // // //       >
// // // // //         <CircularProgress />
// // // // //       </Box>
// // // // //     );
// // // // //   }

// // // // //   if (error) {
// // // // //     return (
// // // // //       <Container>
// // // // //         <Typography color="error" variant="h6" sx={{ mt: 4 }}>
// // // // //           Error: {error}
// // // // //         </Typography>
// // // // //       </Container>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // // //       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
// // // // //         <Grid container spacing={2} alignItems="center" mb={4}>
// // // // //           <Grid item xs={12} sm={6}>
// // // // //             <Typography variant="h4" component="div">
// // // // //               Property Requests Management
// // // // //             </Typography>
// // // // //           </Grid>
// // // // //           <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
// // // // //             <FormControl sx={{ m: 1, minWidth: 150 }}>
// // // // //               <InputLabel>Operation Type</InputLabel>
// // // // //               <Select
// // // // //                 value={filterType}
// // // // //                 label="Operation Type"
// // // // //                 onChange={(e) => setFilterType(e.target.value)}
// // // // //               >
// // // // //                 <MenuItem value="All">All</MenuItem>
// // // // //                 <MenuItem value="Selling">Selling</MenuItem>
// // // // //                 <MenuItem value="Renting">Renting</MenuItem>
// // // // //               </Select>
// // // // //             </FormControl>
// // // // //           </Grid>
// // // // //         </Grid>

// // // // //         <Paper sx={{ width: "100%", overflow: "hidden" }}>
// // // // //           <TableContainer sx={{ maxHeight: 600 }}>
// // // // //             <Table stickyHeader aria-label="sticky table">
// // // // //               <TableHead>
// // // // //                 <TableRow>
// // // // //                   <TableCell>ID</TableCell>
// // // // //                   <TableCell>Property Number</TableCell>
// // // // //                   <TableCell>Operation Type</TableCell>
// // // // //                   <TableCell>Status</TableCell>
// // // // //                   <TableCell>Created At</TableCell>
// // // // //                   <TableCell align="center">Actions</TableCell>
// // // // //                 </TableRow>
// // // // //               </TableHead>
// // // // //               <TableBody>
// // // // //                 {paginatedRequests.map((request) => {
// // // // //                   // console.log(request)

// // // // //                   return (
// // // // //                     <>
// // // // //                       <StyledTableRow key={request.id}>
// // // // //                         <TableCell>{request.id}</TableCell>
// // // // //                         <TableCell>{request.propertyNumber}</TableCell>
// // // // //                         <TableCell>{request.typeOperation}</TableCell>
// // // // //                         <TableCell>{request.status}</TableCell>
// // // // //                         <TableCell>
// // // // //                           {request.createdAt
// // // // //                             ? format(new Date(request.createdAt), "PP")
// // // // //                             : "N/A"}{" "}
// // // // //                         </TableCell>
// // // // //                         <TableCell align="center">
// // // // //                           <Tooltip title="View Details">
// // // // //                             <IconButton
// // // // //                               color="info"
// // // // //                               onClick={() =>
// // // // //                                 alert(
// // // // //                                   "View Details functionality to be implemented"
// // // // //                                 )
// // // // //                               }
// // // // //                             >
// // // // //                               <Visibility />
// // // // //                             </IconButton>
// // // // //                           </Tooltip>
// // // // //                           <Tooltip title="Accept Request">
// // // // //                             <IconButton
// // // // //                               color="success"
// // // // //                               onClick={() => handleOpenModal(request, "accept")}
// // // // //                             >
// // // // //                               <CheckCircleOutline />
// // // // //                             </IconButton>
// // // // //                           </Tooltip>
// // // // //                           <Tooltip title="Reject Request">
// // // // //                             <IconButton
// // // // //                               color="error"
// // // // //                               onClick={() => handleOpenModal(request, "reject")}
// // // // //                             >
// // // // //                               <HighlightOff />
// // // // //                             </IconButton>
// // // // //                           </Tooltip>
// // // // //                           <Tooltip title="Delete Request">
// // // // //                             <IconButton
// // // // //                               color="secondary"
// // // // //                               onClick={() => handleOpenModal(request, "delete")}
// // // // //                             >
// // // // //                               <DeleteOutline />
// // // // //                             </IconButton>
// // // // //                           </Tooltip>
// // // // //                         </TableCell>
// // // // //                       </StyledTableRow>
// // // // //                     </>
// // // // //                   );
// // // // //                 })}

// // // // //                 {!paginatedRequests.length && (
// // // // //                   <TableRow>
// // // // //                     <TableCell colSpan={6} align="center">
// // // // //                       No property requests found.
// // // // //                     </TableCell>
// // // // //                   </TableRow>
// // // // //                 )}
// // // // //               </TableBody>
// // // // //             </Table>
// // // // //           </TableContainer>
// // // // //           <TablePagination
// // // // //             rowsPerPageOptions={[10, 25, 100]}
// // // // //             component="div"
// // // // //             count={filteredRequests.length}
// // // // //             rowsPerPage={rowsPerPage}
// // // // //             page={page}
// // // // //             onPageChange={handleChangePage}
// // // // //             onRowsPerPageChange={handleChangeRowsPerPage}
// // // // //           />
// // // // //         </Paper>

// // // // //         {/* Modal for Admin Actions */}
// // // // //         <Modal open={openModal} onClose={handleCloseModal}>
// // // // //           <StyledModalPaper>
// // // // //             <Typography variant="h6" gutterBottom>
// // // // //               {action === "accept"
// // // // //                 ? "Accept Property Request"
// // // // //                 : action === "reject"
// // // // //                 ? "Reject Property Request"
// // // // //                 : "Delete Property Request"}
// // // // //             </Typography>
// // // // //             <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
// // // // //               {`Are you sure you want to ${action} the request for property number ${selectedRequest?.propertyNumber}?`}
// // // // //             </Typography>

// // // // //             {action === "accept" &&
// // // // //               selectedRequest?.typeOperation === "Renting" && (
// // // // //                 <Box component="form" noValidate sx={{ mt: 2 }}>
// // // // //                   <DatePicker
// // // // //                     label="Expiration Date"
// // // // //                     value={adminFormData.expireDate}
// // // // //                     onChange={handleDateChange}
// // // // //                     renderInput={(params) => (
// // // // //                       <TextField {...params} fullWidth margin="normal" />
// // // // //                     )}
// // // // //                   />
// // // // //                 </Box>
// // // // //               )}

// // // // //             <Box
// // // // //               sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
// // // // //             >
// // // // //               <Button
// // // // //                 variant="contained"
// // // // //                 color={
// // // // //                   action === "accept"
// // // // //                     ? "success"
// // // // //                     : action === "reject"
// // // // //                     ? "error"
// // // // //                     : "secondary"
// // // // //                 }
// // // // //                 onClick={handleAdminAction}
// // // // //               >
// // // // //                 {action === "accept" ? (
// // // // //                   loading ? (

// // // // //                     <CircularProgress size={20} color="secondary" />
// // // // //                   ) : (
// // // // //                     "Confirm Acceptance"
// // // // //                   )
// // // // //                 ) : action === "reject" ? (
// // // // //                   loading ? (
// // // // //                     <CircularProgress size={20} />
// // // // //                   ) : (
// // // // //                     "Confirm Rejection"
// // // // //                   )
// // // // //                 ) : deleteLoading ? (
// // // // //                   <CircularProgress size={20} />
// // // // //                 ) : (
// // // // //                   "Confirm Deletion"
// // // // //                 )}
// // // // //               </Button>
// // // // //               <Button variant="outlined" onClick={handleCloseModal}>
// // // // //                 Cancel
// // // // //               </Button>
// // // // //             </Box>
// // // // //           </StyledModalPaper>
// // // // //         </Modal>
// // // // //       </Container>
// // // // //     </LocalizationProvider>
// // // // //   );
// // // // // };

// // // // // export default PropertyRequestsPage;

// // // // import React, { useEffect, useState } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import {
// // // //   fetchAllPropertyRequests,
// // // //   updatePropertyRequestByAdmin,
// // // //   deletePropertyRequest,
// // // // } from "../../redux/property request/propertyRequestSlice";
// // // // import {
// // // //   Container,
// // // //   Typography,
// // // //   CircularProgress,
// // // //   Box,
// // // //   Paper,
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableContainer,
// // // //   TableHead,
// // // //   TableRow,
// // // //   TablePagination,
// // // //   Button,
// // // //   IconButton,
// // // //   Tooltip,
// // // //   Modal,
// // // //   TextField,
// // // //   FormControl,
// // // //   InputLabel,
// // // //   Select,
// // // //   MenuItem,
// // // //   Grid,
// // // //   Dialog,
// // // //   DialogTitle,
// // // //   DialogContent,
// // // //   DialogActions,
// // // //   CardMedia,
// // // // } from "@mui/material";
// // // // import {
// // // //   CheckCircleOutline,
// // // //   HighlightOff,
// // // //   Visibility,
// // // //   DeleteOutline,
// // // //   ArrowBackIos,
// // // //   ArrowForwardIos,
// // // // } from "@mui/icons-material";
// // // // import { styled, useTheme } from "@mui/material/styles";
// // // // import { format } from "date-fns";
// // // // import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// // // // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// // // // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// // // // const StyledTableRow = styled(TableRow)(({ theme }) => ({
// // // //   "&:nth-of-type(odd)": {
// // // //     backgroundColor: theme.palette.action.hover,
// // // //   },
// // // //   "&:last-child td, &:last-child th": {
// // // //     border: 0,
// // // //   },
// // // // }));

// // // // const StyledModalPaper = styled(Paper)(({ theme }) => ({
// // // //   position: "absolute",
// // // //   top: "50%",
// // // //   left: "50%",
// // // //   transform: "translate(-50%, -50%)",
// // // //   width: 500,
// // // //   padding: theme.spacing(4),
// // // //   outline: "none",
// // // //   textAlign: "center",
// // // //   [theme.breakpoints.down("sm")]: {
// // // //     width: "90%",
// // // //     padding: theme.spacing(2),
// // // //   },
// // // // }));

// // // // const CarouselContainer = styled(Box)(({ theme }) => ({
// // // //   position: "relative",
// // // //   width: "100%",
// // // //   maxWidth: 400,
// // // //   margin: "auto",
// // // // }));

// // // // const CarouselImage = styled("img")({
// // // //   width: "100%",
// // // //   height: 250,
// // // //   objectFit: "cover",
// // // //   borderRadius: 8,
// // // // });

// // // // const CarouselButton = styled(IconButton)(({ theme }) => ({
// // // //   position: "absolute",
// // // //   top: "50%",
// // // //   transform: "translateY(-50%)",
// // // //   backgroundColor: "rgba(0, 0, 0, 0.5)",
// // // //   color: "#fff",
// // // //   "&:hover": {
// // // //     backgroundColor: "rgba(0, 0, 0, 0.7)",
// // // //   },
// // // // }));

// // // // const PropertyRequestsPage = () => {
// // // //   const dispatch = useDispatch();
// // // //   const theme = useTheme();

// // // //   const {
// // // //     propertyRequests,
// // // //     loading,
// // // //     error,
// // // //     deleteLoading,
// // // //     deletError,
// // // //     updateLoading,
// // // //   } = useSelector((state) => state.propertyRequest);

// // // //   const [page, setPage] = useState(0);
// // // //   const [rowsPerPage, setRowsPerPage] = useState(10);
// // // //   const [openAdminModal, setOpenAdminModal] = useState(false);
// // // //   const [openDetailsModal, setOpenDetailsModal] = useState(false);
// // // //   const [selectedRequest, setSelectedRequest] = useState(null);
// // // //   const [action, setAction] = useState("");
// // // //   const [filterType, setFilterType] = useState("All");
// // // //   const [photoIndex, setPhotoIndex] = useState(0);

// // // //   const [adminFormData, setAdminFormData] = useState({
// // // //     propertyNumber: "",
// // // //     expireDate: null,
// // // //     status: "",
// // // //   });

// // // //   useEffect(() => {
// // // //     dispatch(fetchAllPropertyRequests());
// // // //   }, [dispatch]);

// // // //   const handleChangePage = (event, newPage) => {
// // // //     setPage(newPage);
// // // //   };

// // // //   const handleChangeRowsPerPage = (event) => {
// // // //     setRowsPerPage(parseInt(event.target.value, 10));
// // // //     setPage(0);
// // // //   };

// // // //   const handleOpenAdminModal = (request, actionType) => {
// // // //     setSelectedRequest(request);
// // // //     setAction(actionType);
// // // //     if (actionType !== "delete") {
// // // //       setAdminFormData({
// // // //         propertyNumber: request.propertyNumber || "",
// // // //         expireDate: request.typeOperation === "Renting" ? null : null,
// // // //         status: actionType === "accept" ? "Accepted" : "Rejected",
// // // //       });
// // // //     }
// // // //     setOpenAdminModal(true);
// // // //   };

// // // //   const handleOpenDetailsModal = (request) => {
// // // //     setSelectedRequest(request);
// // // //     setPhotoIndex(0); // Reset carousel to the first image
// // // //     setOpenDetailsModal(true);
// // // //   };

// // // //   const handleCloseModal = () => {
// // // //     setOpenAdminModal(false);
// // // //     setOpenDetailsModal(false);
// // // //     setSelectedRequest(null);
// // // //     setAction("");
// // // //   };

// // // //   const handleAdminFormChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setAdminFormData({ ...adminFormData, [name]: value });
// // // //   };

// // // //   const handleDateChange = (newDate) => {
// // // //     setAdminFormData({ ...adminFormData, expireDate: newDate });
// // // //   };

// // // //   const handleAdminAction = () => {
// // // //     if (action === "delete") {
// // // //       dispatch(deletePropertyRequest(selectedRequest.id)).then(() => {
// // // //         dispatch(fetchAllPropertyRequests());
// // // //         handleCloseModal();
// // // //       });
// // // //     } else {
// // // //       // Logic for 'accept' and 'reject'
// // // //       const updateData = {
// // // //         id: selectedRequest.id,
// // // //         updateData: {
// // // //           status: adminFormData.status,
// // // //           propertyNumber: adminFormData.propertyNumber,
// // // //           expireDate:
// // // //             selectedRequest.typeOperation.toLowerCase() === "renting" &&
// // // //             adminFormData.status === "Accepted"
// // // //               ? adminFormData.expireDate
// // // //               : null,
// // // //         },
// // // //       };

// // // //       dispatch(updatePropertyRequestByAdmin(updateData)).then(() => {
// // // //         dispatch(fetchAllPropertyRequests());
// // // //         handleCloseModal();
// // // //       });
// // // //     }
// // // //   };

// // // //   const handleNextPhoto = () => {
// // // //     if (selectedRequest?.photos) {
// // // //       setPhotoIndex((prevIndex) =>
// // // //         prevIndex === selectedRequest.photos.length - 1 ? 0 : prevIndex + 1
// // // //       );
// // // //     }
// // // //   };

// // // //   const handlePreviousPhoto = () => {
// // // //     if (selectedRequest?.photos) {
// // // //       setPhotoIndex((prevIndex) =>
// // // //         prevIndex === 0 ? selectedRequest.photos.length - 1 : prevIndex - 1
// // // //       );
// // // //     }
// // // //   };

// // // //   const filteredRequests = propertyRequests.filter((request) => {
// // // //     if (filterType === "All") return true;
// // // //     return request.typeOperation.toLowerCase() === filterType.toLowerCase();
// // // //   });

// // // //   const paginatedRequests = filteredRequests.slice(
// // // //     page * rowsPerPage,
// // // //     page * rowsPerPage + rowsPerPage
// // // //   );

// // // //   if (loading) {
// // // //     return (
// // // //       <Box
// // // //         display="flex"
// // // //         justifyContent="center"
// // // //         alignItems="center"
// // // //         minHeight="100vh"
// // // //       >
// // // //         <CircularProgress />
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <Container>
// // // //         <Typography color="error" variant="h6" sx={{ mt: 4 }}>
// // // //           Error: {error}
// // // //         </Typography>
// // // //       </Container>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // //       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
// // // //         <Grid container spacing={2} alignItems="center" mb={4}>
// // // //           <Grid item xs={12} sm={6}>
// // // //             <Typography variant="h4" component="div">
// // // //               Property Requests Management
// // // //             </Typography>
// // // //           </Grid>
// // // //           <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
// // // //             <FormControl sx={{ m: 1, minWidth: 150 }}>
// // // //               <InputLabel>Operation Type</InputLabel>
// // // //               <Select
// // // //                 value={filterType}
// // // //                 label="Operation Type"
// // // //                 onChange={(e) => setFilterType(e.target.value)}
// // // //               >
// // // //                 <MenuItem value="All">All</MenuItem>
// // // //                 <MenuItem value="Selling">Selling</MenuItem>
// // // //                 <MenuItem value="Renting">Renting</MenuItem>
// // // //               </Select>
// // // //             </FormControl>
// // // //           </Grid>
// // // //         </Grid>

// // // //         <Paper sx={{ width: "100%", overflow: "hidden" }}>
// // // //           <TableContainer sx={{ maxHeight: 600 }}>
// // // //             <Table stickyHeader aria-label="sticky table">
// // // //               <TableHead>
// // // //                 <TableRow>
// // // //                   <TableCell>ID</TableCell>
// // // //                   <TableCell>Property Number</TableCell>
// // // //                   <TableCell>Operation Type</TableCell>
// // // //                   <TableCell>Status</TableCell>
// // // //                   <TableCell>Created At</TableCell>
// // // //                   <TableCell align="center">Actions</TableCell>
// // // //                 </TableRow>
// // // //               </TableHead>
// // // //               <TableBody>
// // // //                 {paginatedRequests.map((request) => (
// // // //                   <StyledTableRow key={request.id}>
// // // //                     <TableCell>{request.id}</TableCell>
// // // //                     <TableCell>{request.propertyNumber}</TableCell>
// // // //                     <TableCell>{request.typeOperation}</TableCell>
// // // //                     <TableCell>{request.status}</TableCell>
// // // //                     <TableCell>
// // // //                       {request.createdAt
// // // //                         ? format(new Date(request.createdAt), "PP")
// // // //                         : "N/A"}{" "}
// // // //                     </TableCell>
// // // //                     <TableCell align="center">
// // // //                       <Tooltip title="View Details">
// // // //                         <IconButton
// // // //                           color="info"
// // // //                           onClick={() => handleOpenDetailsModal(request)}
// // // //                         >
// // // //                           <Visibility />
// // // //                         </IconButton>
// // // //                       </Tooltip>
// // // //                       <Tooltip title="Accept Request">
// // // //                         <IconButton
// // // //                           color="success"
// // // //                           onClick={() => handleOpenAdminModal(request, "accept")}
// // // //                         >
// // // //                           <CheckCircleOutline />
// // // //                         </IconButton>
// // // //                       </Tooltip>
// // // //                       <Tooltip title="Reject Request">
// // // //                         <IconButton
// // // //                           color="error"
// // // //                           onClick={() => handleOpenAdminModal(request, "reject")}
// // // //                         >
// // // //                           <HighlightOff />
// // // //                         </IconButton>
// // // //                       </Tooltip>
// // // //                       <Tooltip title="Delete Request">
// // // //                         <IconButton
// // // //                           color="secondary"
// // // //                           onClick={() => handleOpenAdminModal(request, "delete")}
// // // //                         >
// // // //                           <DeleteOutline />
// // // //                         </IconButton>
// // // //                       </Tooltip>
// // // //                     </TableCell>
// // // //                   </StyledTableRow>
// // // //                 ))}

// // // //                 {!paginatedRequests.length && (
// // // //                   <TableRow>
// // // //                     <TableCell colSpan={6} align="center">
// // // //                       No property requests found.
// // // //                     </TableCell>
// // // //                   </TableRow>
// // // //                 )}
// // // //               </TableBody>
// // // //             </Table>
// // // //           </TableContainer>
// // // //           <TablePagination
// // // //             rowsPerPageOptions={[10, 25, 100]}
// // // //             component="div"
// // // //             count={filteredRequests.length}
// // // //             rowsPerPage={rowsPerPage}
// // // //             page={page}
// // // //             onPageChange={handleChangePage}
// // // //             onRowsPerPageChange={handleChangeRowsPerPage}
// // // //           />
// // // //         </Paper>

// // // //         {/* Modal for Admin Actions (Accept, Reject, Delete) */}
// // // //         <Modal open={openAdminModal} onClose={handleCloseModal}>
// // // //           <StyledModalPaper>
// // // //             <Typography variant="h6" gutterBottom>
// // // //               {action === "accept"
// // // //                 ? "Accept Property Request"
// // // //                 : action === "reject"
// // // //                 ? "Reject Property Request"
// // // //                 : "Delete Property Request"}
// // // //             </Typography>
// // // //             <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
// // // //               {`Are you sure you want to ${action} the request for property number ${selectedRequest?.propertyNumber}?`}
// // // //             </Typography>

// // // //             {action === "accept" &&
// // // //               selectedRequest?.typeOperation.toLowerCase() === "renting" && (
// // // //                 <Box component="form" noValidate sx={{ mt: 2 }}>
// // // //                   <DatePicker
// // // //                     label="Expiration Date"
// // // //                     value={adminFormData.expireDate}
// // // //                     onChange={handleDateChange}
// // // //                     slotProps={{
// // // //                         textField: { fullWidth: true, margin: "normal" }
// // // //                     }}
// // // //                   />
// // // //                 </Box>
// // // //               )}
// // // //             <Box
// // // //               sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
// // // //             >
// // // //               <Button
// // // //                 variant="contained"
// // // //                 color={
// // // //                   action === "accept"
// // // //                     ? "success"
// // // //                     : action === "reject"
// // // //                     ? "error"
// // // //                     : "secondary"
// // // //                 }
// // // //                 onClick={handleAdminAction}
// // // //                 disabled={updateLoading || deleteLoading}
// // // //               >
// // // //                 {action === "accept" ? (
// // // //                   updateLoading ? (
// // // //                     <CircularProgress size={20} color="inherit" />
// // // //                   ) : (
// // // //                     "Confirm Acceptance"
// // // //                   )
// // // //                 ) : action === "reject" ? (
// // // //                   updateLoading ? (
// // // //                     <CircularProgress size={20} color="inherit" />
// // // //                   ) : (
// // // //                     "Confirm Rejection"
// // // //                   )
// // // //                 ) : deleteLoading ? (
// // // //                   <CircularProgress size={20} color="inherit" />
// // // //                 ) : (
// // // //                   "Confirm Deletion"
// // // //                 )}
// // // //               </Button>
// // // //               <Button variant="outlined" onClick={handleCloseModal}>
// // // //                 Cancel
// // // //               </Button>
// // // //             </Box>
// // // //           </StyledModalPaper>
// // // //         </Modal>

// // // //         {/* Modal for Viewing Details */}
// // // //         <Dialog open={openDetailsModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
// // // //           <DialogTitle>Property Request Details</DialogTitle>
// // // //           <DialogContent dividers>
// // // //             {selectedRequest && (
// // // //               <Box>
// // // //                 <Grid container spacing={2}>
// // // //                   <Grid item xs={12}>
// // // //                     <CarouselContainer>
// // // //                       {selectedRequest.photos && selectedRequest.photos.length > 0 ? (
// // // //                         <>
// // // //                           <CardMedia
// // // //                             component="img"
// // // //                             image={selectedRequest.photos[photoIndex].url}
// // // //                             alt="Property Photo"
// // // //                             sx={{
// // // //                               width: "100%",
// // // //                               height: 300,
// // // //                               objectFit: "cover",
// // // //                               borderRadius: 1,
// // // //                             }}
// // // //                           />
// // // //                           {selectedRequest.photos.length > 1 && (
// // // //                             <>
// // // //                               <CarouselButton
// // // //                                 onClick={handlePreviousPhoto}
// // // //                                 sx={{ left: 8 }}
// // // //                               >
// // // //                                 <ArrowBackIos />
// // // //                               </CarouselButton>
// // // //                               <CarouselButton
// // // //                                 onClick={handleNextPhoto}
// // // //                                 sx={{ right: 8 }}
// // // //                               >
// // // //                                 <ArrowForwardIos />
// // // //                               </CarouselButton>
// // // //                             </>
// // // //                           )}
// // // //                         </>
// // // //                       ) : (
// // // //                         <Typography variant="body2" color="text.secondary" align="center">
// // // //                           No photos available.
// // // //                         </Typography>
// // // //                       )}
// // // //                     </CarouselContainer>
// // // //                   </Grid>
// // // //                   <Grid item xs={12}>
// // // //                     <Typography variant="h6">Request Info</Typography>
// // // //                     <Typography variant="body1">
// // // //                       <strong>ID:</strong> {selectedRequest.id}
// // // //                     </Typography>
// // // //                     <Typography variant="body1">
// // // //                       <strong>Property Number:</strong> {selectedRequest.propertyNumber}
// // // //                     </Typography>
// // // //                     <Typography variant="body1">
// // // //                       <strong>Operation Type:</strong> {selectedRequest.typeOperation}
// // // //                     </Typography>
// // // //                     <Typography variant="body1">
// // // //                       <strong>Status:</strong> {selectedRequest.status}
// // // //                     </Typography>
// // // //                     <Typography variant="body1">
// // // //                       <strong>Created At:</strong>{" "}
// // // //                       {format(new Date(selectedRequest.createdAt), "PP")}
// // // //                     </Typography>
// // // //                   </Grid>
// // // //                 </Grid>
// // // //               </Box>
// // // //             )}
// // // //           </DialogContent>
// // // //           <DialogActions>
// // // //             <Button onClick={handleCloseModal}>Close</Button>
// // // //           </DialogActions>
// // // //         </Dialog>
// // // //       </Container>
// // // //     </LocalizationProvider>
// // // //   );
// // // // };

// // // // export default PropertyRequestsPage;

// // // import React, { useEffect, useState } from "react";
// // //  import { useDispatch, useSelector } from "react-redux";
// // //  import {
// // //    fetchAllPropertyRequests,
// // //    updatePropertyRequestByAdmin,
// // //    deletePropertyRequest,
// // //  } from "../../redux/property request/propertyRequestSlice";
// // //  import {
// // //    Container,
// // //    Typography,
// // //    CircularProgress,
// // //    Box,
// // //    Paper,
// // //    Table,
// // //    TableBody,
// // //    TableCell,
// // //    TableContainer,
// // //    TableHead,
// // //    TableRow,
// // //    TablePagination,
// // //    Button,
// // //    IconButton,
// // //    Tooltip,
// // //    Modal,
// // //    TextField,
// // //    FormControl,
// // //    InputLabel,
// // //    Select,
// // //    MenuItem,
// // //    Grid,
// // //    Dialog,
// // //    DialogTitle,
// // //    DialogContent,
// // //    DialogActions,
// // //    CardMedia,
// // //  } from "@mui/material";
// // //  import {
// // //    CheckCircleOutline,
// // //    HighlightOff,
// // //    Visibility,
// // //    DeleteOutline,
// // //    ArrowBackIos,
// // //    ArrowForwardIos,
// // //    Close,
// // //  } from "@mui/icons-material";
// // //  import { styled, useTheme } from "@mui/material/styles";
// // //  import { format } from "date-fns";
// // //  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// // //  import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// // //  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// // //  const StyledTableRow = styled(TableRow)(({ theme }) => ({
// // //    "&:nth-of-type(odd)": {
// // //      backgroundColor: theme.palette.action.hover,
// // //    },
// // //    "&:last-child td, &:last-child th": {
// // //      border: 0,
// // //    },
// // //  }));

// // //  const StyledModalPaper = styled(Paper)(({ theme }) => ({
// // //    position: "absolute",
// // //    top: "50%",
// // //    left: "50%",
// // //    transform: "translate(-50%, -50%)",
// // //    width: 500,
// // //    padding: theme.spacing(4),
// // //    outline: "none",
// // //    textAlign: "center",
// // //    backgroundColor: theme.palette.background.paper,
// // //    boxShadow: theme.shadows["5"],
// // //    borderRadius: theme.shape.borderRadius,
// // //    "@media (max-width: 600px)": {
// // //      width: "90%",
// // //      padding: theme.spacing(2),
// // //    },
// // //  }));

// // //  const CarouselContainer = styled(Box)(({ theme }) => ({
// // //    position: "relative",
// // //    width: "100%",
// // //    maxWidth: 400,
// // //    margin: "auto",
// // //  }));

// // //  const CarouselImage = styled("img")({
// // //    width: "100%",
// // //    height: 250,
// // //    objectFit: "cover",
// // //    borderRadius: 8,
// // //  });

// // //  const CarouselButton = styled(IconButton)(({ theme }) => ({
// // //    position: "absolute",
// // //    top: "50%",
// // //    transform: "translateY(-50%)",
// // //    backgroundColor: "rgba(0, 0, 0, 0.5)",
// // //    color: "#fff",
// // //    "&:hover": {
// // //      backgroundColor: "rgba(0, 0, 0, 0.7)",
// // //    },
// // //  }));

// // //  const FullScreenDialog = styled(Dialog)(({ theme }) => ({
// // //    "& .MuiDialog-paperFullScreen": {
// // //      backgroundColor: theme.palette.background.default,
// // //    },
// // //  }));

// // //  const FullScreenImage = styled("img")({
// // //    display: "block",
// // //    maxWidth: "100%",
// // //    maxHeight: "100vh",
// // //    margin: "auto",
// // //  });

// // //  const PropertyRequestsPage = () => {
// // //    const dispatch = useDispatch();
// // //    const theme = useTheme();

// // //    const {
// // //      propertyRequests,
// // //      loading,
// // //      error,
// // //      deleteLoading,
// // //      deletError,
// // //      updateLoading,
// // //    } = useSelector((state) => state.propertyRequest);

// // //    const [page, setPage] = useState(0);
// // //    const [rowsPerPage, setRowsPerPage] = useState(10);
// // //    const [openAdminModal, setOpenAdminModal] = useState(false);
// // //    const [openDetailsModal, setOpenDetailsModal] = useState(false);
// // //    const [openFullScreen, setOpenFullScreen] = useState(false);
// // //    const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
// // //    const [selectedRequest, setSelectedRequest] = useState(null);
// // //    const [action, setAction] = useState("");
// // //    const [filterType, setFilterType] = useState("All");
// // //    const [photoIndex, setPhotoIndex] = useState(0);

// // //    const [adminFormData, setAdminFormData] = useState({
// // //      propertyNumber: "",
// // //      expireDate: null,
// // //      status: "",
// // //    });

// // //    useEffect(() => {
// // //      dispatch(fetchAllPropertyRequests());
// // //    }, [dispatch]);

// // //    const handleChangePage = (event, newPage) => {
// // //      setPage(newPage);
// // //    };

// // //    const handleChangeRowsPerPage = (event) => {
// // //      setRowsPerPage(parseInt(event.target.value, 10));
// // //      setPage(0);
// // //    };

// // //    const handleOpenAdminModal = (request, actionType) => {
// // //      setSelectedRequest(request);
// // //      setAction(actionType);
// // //      if (actionType !== "delete") {
// // //        setAdminFormData({
// // //          propertyNumber: request.propertyNumber || "",
// // //          expireDate: request.typeOperation === "Renting" ? null : null,
// // //          status: actionType === "accept" ? "accepted" : "rejected",
// // //        });
// // //      }
// // //      setOpenAdminModal(true);
// // //    };

// // //    const handleOpenDetailsModal = (request) => {
// // //      setSelectedRequest(request);
// // //      setPhotoIndex(0); // Reset carousel to the first image
// // //      setOpenDetailsModal(true);
// // //    };

// // //    const handleCloseModal = () => {
// // //      setOpenAdminModal(false);
// // //      setOpenDetailsModal(false);
// // //      setOpenFullScreen(false);
// // //      setSelectedRequest(null);
// // //      setAction("");
// // //      setFullScreenImageUrl("");
// // //    };

// // //    const handleAdminFormChange = (e) => {
// // //      const { name, value } = e.target;
// // //      setAdminFormData({ ...adminFormData, [name]: value });
// // //    };

// // //    const handleDateChange = (newDate) => {
// // //      setAdminFormData({ ...adminFormData, expireDate: newDate });
// // //    };

// // //    const handleAdminAction = () => {
// // //      if (action === "delete") {
// // //        dispatch(deletePropertyRequest(selectedRequest.id)).then(() => {
// // //          dispatch(fetchAllPropertyRequests());
// // //          handleCloseModal();
// // //        });
// // //      } else {
// // //        // Logic for 'accept' and 'reject'
// // //        const updateData = {
// // //          id: selectedRequest.id,
// // //          updateData: {
// // //            status: adminFormData.status,
// // //            propertyNumber: adminFormData.propertyNumber,
// // //            expireDate:
// // //              selectedRequest.typeOperation.toLowerCase() === "renting" &&
// // //              adminFormData.status === "Accepted"
// // //                ? adminFormData.expireDate
// // //                : null,
// // //          },
// // //        };

// // //        dispatch(updatePropertyRequestByAdmin(updateData)).then(() => {
// // //          dispatch(fetchAllPropertyRequests());
// // //          handleCloseModal();
// // //        });
// // //      }
// // //    };

// // //    const handleNextPhoto = () => {
// // //      if (selectedRequest?.photos) {
// // //        setPhotoIndex((prevIndex) =>
// // //          prevIndex === selectedRequest.photos.length - 1 ? 0 : prevIndex + 1
// // //        );
// // //      }
// // //    };

// // //    const handlePreviousPhoto = () => {
// // //      if (selectedRequest?.photos) {
// // //        setPhotoIndex((prevIndex) =>
// // //          prevIndex === 0 ? selectedRequest.photos.length - 1 : prevIndex - 1
// // //        );
// // //      }
// // //    };

// // //    const handleOpenFullScreen = (imageUrl) => {
// // //      setFullScreenImageUrl(imageUrl);
// // //      setOpenFullScreen(true);
// // //    };

// // //    const filteredRequests = propertyRequests.filter((request) => {
// // //      if (filterType === "All") return true;
// // //      return request.typeOperation.toLowerCase() === filterType.toLowerCase();
// // //    });

// // //    const paginatedRequests = filteredRequests.slice(
// // //      page * rowsPerPage,
// // //      page * rowsPerPage + rowsPerPage
// // //    );

// // //    if (loading) {
// // //      return (
// // //        <Box
// // //          display="flex"
// // //          justifyContent="center"
// // //          alignItems="center"
// // //          minHeight="100vh"
// // //        >
// // //          <CircularProgress />
// // //        </Box>
// // //      );
// // //    }

// // //    if (error) {
// // //      return (
// // //        <Container>
// // //          <Typography color="error" variant="h6" sx={{ mt: 4 }}>
// // //            Error: {error}
// // //          </Typography>
// // //        </Container>
// // //      );
// // //    }

// // //    return (
// // //      <LocalizationProvider dateAdapter={AdapterDateFns}>
// // //        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
// // //          <Grid container spacing={2} alignItems="center" mb={4}>
// // //            <Grid item xs={12} sm={6}>
// // //              <Typography variant="h4" component="div">
// // //                Property Requests Management
// // //              </Typography>
// // //            </Grid>
// // //            <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
// // //              <FormControl sx={{ m: 1, minWidth: 150 }}>
// // //                <InputLabel>Operation Type</InputLabel>
// // //                <Select
// // //                  value={filterType}
// // //                  label="Operation Type"
// // //                  onChange={(e) => setFilterType(e.target.value)}
// // //                >
// // //                  <MenuItem value="All">All</MenuItem>
// // //                  <MenuItem value="Selling">Selling</MenuItem>
// // //                  <MenuItem value="Renting">Renting</MenuItem>
// // //                </Select>
// // //              </FormControl>
// // //            </Grid>
// // //          </Grid>

// // //          <Paper sx={{ width: "100%", overflow: "hidden" }}>
// // //            <TableContainer sx={{ maxHeight: 600 }}>
// // //              <Table stickyHeader aria-label="sticky table">
// // //                <TableHead>
// // //                  <TableRow>
// // //                    <TableCell>ID</TableCell>
// // //                    <TableCell>Property Number</TableCell>
// // //                    <TableCell>Operation Type</TableCell>
// // //                    <TableCell>Status</TableCell>
// // //                    <TableCell>Created At</TableCell>
// // //                    <TableCell align="center">Actions</TableCell>
// // //                  </TableRow>
// // //                </TableHead>
// // //                <TableBody>
// // //                  {paginatedRequests.map((request) => (
// // //                    <StyledTableRow key={request.id}>
// // //                      <TableCell>{request.id}</TableCell>
// // //                      <TableCell>{request.propertyNumber}</TableCell>
// // //                      <TableCell>{request.typeOperation}</TableCell>
// // //                      <TableCell>{request.status}</TableCell>
// // //                      <TableCell>
// // //                        {request.createdAt
// // //                          ? format(new Date(request.createdAt), "PP")
// // //                          : "N/A"}{" "}
// // //                      </TableCell>
// // //                      <TableCell align="center">
// // //                        <Tooltip title="View Details">
// // //                          <IconButton
// // //                            color="info"
// // //                            onClick={() => handleOpenDetailsModal(request)}
// // //                          >
// // //                            <Visibility />
// // //                          </IconButton>
// // //                        </Tooltip>
// // //                        <Tooltip title="Accept Request">
// // //                          <IconButton
// // //                            color="success"
// // //                            onClick={() => handleOpenAdminModal(request, "accept")}
// // //                          >
// // //                            <CheckCircleOutline />
// // //                          </IconButton>
// // //                        </Tooltip>
// // //                        <Tooltip title="Reject Request">
// // //                          <IconButton
// // //                            color="error"
// // //                            onClick={() => handleOpenAdminModal(request, "reject")}
// // //                          >
// // //                            <HighlightOff />
// // //                          </IconButton>
// // //                        </Tooltip>
// // //                        <Tooltip title="Delete Request">
// // //                          <IconButton
// // //                            color="secondary"
// // //                            onClick={() => handleOpenAdminModal(request, "delete")}
// // //                          >
// // //                            <DeleteOutline />
// // //                          </IconButton>
// // //                        </Tooltip>
// // //                      </TableCell>
// // //                    </StyledTableRow>
// // //                  ))}

// // //                  {!paginatedRequests.length && (
// // //                    <TableRow>
// // //                      <TableCell colSpan={6} align="center">
// // //                        No property requests found.
// // //                      </TableCell>
// // //                    </TableRow>
// // //                  )}
// // //                </TableBody>
// // //              </Table>
// // //            </TableContainer>
// // //            <TablePagination
// // //              rowsPerPageOptions={[10, 25, 100]}
// // //              component="div"
// // //              count={filteredRequests.length}
// // //              rowsPerPage={rowsPerPage}
// // //              page={page}
// // //              onPageChange={handleChangePage}
// // //              onRowsPerPageChange={handleChangeRowsPerPage}
// // //            />
// // //          </Paper>

// // //          {/* Modal for Admin Actions (Accept, Reject, Delete) */}
// // //          <Modal open={openAdminModal} onClose={handleCloseModal}>
// // //            <StyledModalPaper>
// // //              <Typography variant="h6" gutterBottom>
// // //                {action === "accept"
// // //                  ? "Accept Property Request"
// // //                  : action === "reject"
// // //                  ? "Reject Property Request"
// // //                  : "Delete Property Request"}
// // //              </Typography>
// // //              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
// // //                {`Are you sure you want to ${action} the request for property number ${selectedRequest?.propertyNumber}?`}
// // //              </Typography>

// // //              {action === "accept" &&
// // //                selectedRequest?.typeOperation.toLowerCase() === "renting" && (
// // //                  <Box component="form" noValidate sx={{ mt: 2 }}>
// // //                    <DatePicker
// // //                      label="Expiration Date"
// // //                      value={adminFormData.expireDate}
// // //                      onChange={handleDateChange}
// // //                      slotProps={{
// // //                        textField: { fullWidth: true, margin: "normal" },
// // //                      }}
// // //                    />
// // //                  </Box>
// // //                )}
// // //              <Box
// // //                sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
// // //              >
// // //                <Button
// // //                  variant="contained"
// // //                  color={
// // //                    action === "accept"
// // //                      ? "success"
// // //                      : action === "reject"
// // //                      ? "error"
// // //                      : "secondary"
// // //                  }
// // //                  onClick={handleAdminAction}
// // //                  disabled={updateLoading || deleteLoading}
// // //                >
// // //                  {action === "accept" ? (
// // //                    updateLoading ? (
// // //                      <CircularProgress size={20} color="inherit" />
// // //                    ) : (
// // //                      "Confirm Acceptance"
// // //                    )
// // //                  ) : action === "reject" ? (
// // //                    updateLoading ? (
// // //                      <CircularProgress size={20} color="inherit" />
// // //                    ) : (
// // //                      "Confirm Rejection"
// // //                    )
// // //                  ) : deleteLoading ? (
// // //                    <CircularProgress size={20} color="inherit" />
// // //                  ) : (
// // //                    "Confirm Deletion"
// // //                  )}
// // //                </Button>
// // //                <Button variant="outlined" onClick={handleCloseModal}>
// // //                  Cancel
// // //                </Button>
// // //              </Box>
// // //            </StyledModalPaper>
// // //          </Modal>

// // //          {/* Modal for Viewing Details */}
// // //          <Dialog
// // //            open={openDetailsModal}
// // //            onClose={handleCloseModal}
// // //            maxWidth="sm"
// // //            fullWidth
// // //          >
// // //            <DialogTitle>Property Request Details</DialogTitle>
// // //            <DialogContent dividers>
// // //              {selectedRequest && (
// // //                <Box>
// // //                  <Grid container spacing={2}>
// // //                    <Grid item xs={12}>
// // //                      <CarouselContainer>
// // //                        {selectedRequest.photos && selectedRequest.photos.length > 0 ? (
// // //                          <>
// // //                            <CardMedia
// // //                              component="img"
// // //                              image={selectedRequest.photos?.[photoIndex]?.url}
// // //                              alt="Property Photo"
// // //                              onClick={() =>
// // //                                handleOpenFullScreen(
// // //                                  selectedRequest.photos?.[photoIndex]?.url
// // //                                )
// // //                              }
// // //                              sx={{
// // //                                width: "100%",
// // //                                height: 300,
// // //                                objectFit: "cover",
// // //                                borderRadius: 1,
// // //                                cursor: "pointer",
// // //                              }}
// // //                            />
// // //                            {selectedRequest.photos.length > 1 && (
// // //                              <>
// // //                                <CarouselButton
// // //                                  onClick={handlePreviousPhoto}
// // //                                  sx={{ left: 8 }}
// // //                                >
// // //                                  <ArrowBackIos />
// // //                                </CarouselButton>
// // //                                <CarouselButton
// // //                                  onClick={handleNextPhoto}
// // //                                  sx={{ right: 8 }}
// // //                                >
// // //                                  <ArrowForwardIos />
// // //                                </CarouselButton>
// // //                              </>
// // //                            )}
// // //                          </>
// // //                        ) : (
// // //                          <Typography
// // //                            variant="body2"
// // //                            color="text.secondary"
// // //                            align="center"
// // //                          >
// // //                            No photos available.
// // //                          </Typography>
// // //                        )}
// // //                      </CarouselContainer>
// // //                    </Grid>
// // //                    <Grid item xs={12}>
// // //                      <Typography variant="h6">Request Info</Typography>
// // //                      <Typography variant="body1">
// // //                        <strong>ID:</strong> {selectedRequest.id}
// // //                      </Typography>
// // //                      <Typography variant="body1">
// // //                        <strong>Property Number:</strong>{" "}
// // //                        {selectedRequest.propertyNumber}
// // //                      </Typography>
// // //                      <Typography variant="body1">
// // //                        <strong>Operation Type:</strong>{" "}
// // //                        {selectedRequest.typeOperation}
// // //                      </Typography>
// // //                      <Typography variant="body1">
// // //                        <strong>Status:</strong> {selectedRequest.status}
// // //                      </Typography>
// // //                      <Typography variant="body1">
// // //                        <strong>Created At:</strong>{" "}
// // //                        {format(new Date(selectedRequest.createdAt), "PP")}
// // //                      </Typography>
// // //                    </Grid>
// // //                  </Grid>
// // //                </Box>
// // //              )}
// // //            </DialogContent>
// // //            <DialogActions>
// // //              <Button onClick={handleCloseModal}>Close</Button>
// // //            </DialogActions>
// // //          </Dialog>

// // //          {/* Full Screen Image Modal */}
// // //          <FullScreenDialog
// // //            fullScreen
// // //            open={openFullScreen}
// // //            onClose={handleCloseModal}
// // //          >
// // //            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // //              Full Screen Image
// // //              <IconButton onClick={handleCloseModal}>
// // //                <Close />
// // //              </IconButton>
// // //            </DialogTitle>
// // //            <DialogContent sx={{ display: "flex", alignItems: "center" }}>
// // //              <FullScreenImage src={fullScreenImageUrl} alt="Full Screen Property Photo" />
// // //            </DialogContent>
// // //          </FullScreenDialog>
// // //        </Container>
// // //      </LocalizationProvider>
// // //    );
// // //  };

// // //  export default PropertyRequestsPage;

// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchAllPropertyRequests,
// //   updatePropertyRequestByAdmin,
// //   deletePropertyRequest,
// // } from "../../redux/property request/propertyRequestSlice";
// // import {
// //   Container,
// //   Typography,
// //   CircularProgress,
// //   Box,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TablePagination,
// //   Button,
// //   IconButton,
// //   Tooltip,
// //   Modal,
// //   TextField,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Grid,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   CardMedia,
// // } from "@mui/material";
// // import {
// //   CheckCircleOutline,
// //   HighlightOff,
// //   Visibility,
// //   DeleteOutline,
// //   ArrowBackIos,
// //   ArrowForwardIos,
// //   Close,
// // } from "@mui/icons-material";
// // import { styled, useTheme } from "@mui/material/styles";
// // import { format } from "date-fns";
// // import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// // const StyledTableRow = styled(TableRow)(({ theme }) => ({
// //   "&:nth-of-type(odd)": {
// //     backgroundColor: theme.palette.action.hover,
// //   },
// //   "&:last-child td, &:last-child th": {
// //     border: 0,
// //   },
// // }));

// // const StyledModalPaper = styled(Paper)(({ theme }) => ({
// //   position: "absolute",
// //   top: "50%",
// //   left: "50%",
// //   transform: "translate(-50%, -50%)",
// //   width: 500,
// //   padding: theme.spacing(4),
// //   outline: "none",
// //   textAlign: "center",
// //   backgroundColor: theme.palette.background.paper,
// //   boxShadow: theme.shadows["5"],
// //   borderRadius: theme.shape.borderRadius,
// //   "@media (max-width: 600px)": {
// //     width: "90%",
// //     padding: theme.spacing(2),
// //   },
// // }));

// // const CarouselContainer = styled(Box)(({ theme }) => ({
// //   position: "relative",
// //   width: "100%",
// //   maxWidth: 400,
// //   margin: "auto",
// // }));

// // const CarouselButton = styled(IconButton)(({ theme }) => ({
// //   position: "absolute",
// //   top: "50%",
// //   transform: "translateY(-50%)",
// //   backgroundColor: "rgba(0, 0, 0, 0.5)",
// //   color: "#fff",
// //   "&:hover": {
// //     backgroundColor: "rgba(0, 0, 0, 0.7)",
// //   },
// // }));

// // const FullScreenDialog = styled(Dialog)(({ theme }) => ({
// //   "& .MuiDialog-paperFullScreen": {
// //     backgroundColor: theme.palette.background.default,
// //   },
// // }));

// // const FullScreenImage = styled("img")({
// //   display: "block",
// //   maxWidth: "100%",
// //   maxHeight: "100vh",
// //   margin: "auto",
// // });

// // const PropertyRequestsPage = () => {
// //   const dispatch = useDispatch();
// //   const theme = useTheme();

// //   const {
// //     propertyRequests,
// //     loading,
// //     error,
// //     deleteLoading,
// //     deletError,
// //     updateLoading,
// //   } = useSelector((state) => state.propertyRequest);

// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);
// //   const [openAdminModal, setOpenAdminModal] = useState(false);
// //   const [openDetailsModal, setOpenDetailsModal] = useState(false);
// //   const [openFullScreen, setOpenFullScreen] = useState(false);
// //   const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
// //   const [selectedRequest, setSelectedRequest] = useState(null);
// //   const [action, setAction] = useState("");
// //   const [filterType, setFilterType] = useState("All");
// //   const [photoIndex, setPhotoIndex] = useState(0);

// //   const [adminFormData, setAdminFormData] = useState({
// //     propertyNumber: "",
// //     expireDate: null,
// //     status: "",
// //   });

// //   useEffect(() => {
// //     dispatch(fetchAllPropertyRequests());
// //   }, [dispatch]);

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const handleOpenAdminModal = (request, actionType) => {
// //     setSelectedRequest(request);
// //     setAction(actionType);
// //     if (actionType !== "delete") {
// //       setAdminFormData({
// //         propertyNumber: request.propertyNumber || "",
// //         expireDate: request.typeOperation === "Renting" ? null : null,
// //         status: actionType === "accept" ? "accepted" : "rejected",
// //       });
// //     }
// //     setOpenAdminModal(true);
// //   };

// //   const handleOpenDetailsModal = (request) => {
// //     setSelectedRequest(request);
// //     setPhotoIndex(0); // Reset carousel to the first image
// //     setOpenDetailsModal(true);
// //   };

// //   const handleCloseAdminModal = () => {
// //     setOpenAdminModal(false);
// //     setSelectedRequest(null);
// //     setAction("");
// //   };

// //   const handleCloseDetailsModal = () => {
// //     setOpenDetailsModal(false);
// //     setSelectedRequest(null);
// //   };

// //   const handleCloseFullScreen = () => {
// //     setOpenFullScreen(false);
// //     setFullScreenImageUrl("");
// //   };

// //   const handleAdminFormChange = (e) => {
// //     const { name, value } = e.target;
// //     setAdminFormData({ ...adminFormData, [name]: value });
// //   };

// //   const handleDateChange = (newDate) => {
// //     setAdminFormData({ ...adminFormData, expireDate: newDate });
// //   };

// //   const handleAdminAction = () => {
// //     if (action === "delete") {
// //       dispatch(deletePropertyRequest(selectedRequest.id)).then(() => {
// //         dispatch(fetchAllPropertyRequests());
// //         handleCloseAdminModal();
// //       });
// //     } else {
// //       // Logic for 'accept' and 'reject'
// //       const updateData = {
// //         id: selectedRequest.id,
// //         updateData: {
// //           status: adminFormData.status,
// //           propertyNumber: adminFormData.propertyNumber,
// //           expireDate:
// //             selectedRequest.typeOperation.toLowerCase() === "renting" &&
// //             adminFormData.status === "Accepted"
// //               ? adminFormData.expireDate
// //               : null,
// //         },
// //       };

// //       dispatch(updatePropertyRequestByAdmin(updateData)).then(() => {
// //         dispatch(fetchAllPropertyRequests());
// //         handleCloseAdminModal();
// //       });
// //     }
// //   };

// //   const handleNextPhoto = () => {
// //     if (selectedRequest?.photos) {
// //       setPhotoIndex((prevIndex) =>
// //         prevIndex === selectedRequest.photos.length - 1 ? 0 : prevIndex + 1
// //       );
// //     }
// //   };

// //   const handlePreviousPhoto = () => {
// //     if (selectedRequest?.photos) {
// //       setPhotoIndex((prevIndex) =>
// //         prevIndex === 0 ? selectedRequest.photos.length - 1 : prevIndex - 1
// //       );
// //     }
// //   };

// //   const handleOpenFullScreen = (imageUrl) => {
// //     setFullScreenImageUrl(imageUrl);
// //     setOpenFullScreen(true);
// //   };

// //   const filteredRequests = propertyRequests.filter((request) => {
// //     if (filterType === "All") return true;
// //     return request.typeOperation.toLowerCase() === filterType.toLowerCase();
// //   });

// //   const paginatedRequests = filteredRequests.slice(
// //     page * rowsPerPage,
// //     page * rowsPerPage + rowsPerPage
// //   );

// //   if (loading) {
// //     return (
// //       <Box
// //         display="flex"
// //         justifyContent="center"
// //         alignItems="center"
// //         minHeight="100vh"
// //       >
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Container>
// //         <Typography color="error" variant="h6" sx={{ mt: 4 }}>
// //           Error: {error}
// //         </Typography>
// //       </Container>
// //     );
// //   }

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
// //         <Grid container spacing={2} alignItems="center" mb={4}>
// //           <Grid item xs={12} sm={6}>
// //             <Typography variant="h4" component="div">
// //               Property Requests Management
// //             </Typography>
// //           </Grid>
// //           <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
// //             <FormControl sx={{ m: 1, minWidth: 150 }}>
// //               <InputLabel>Operation Type</InputLabel>
// //               <Select
// //                 value={filterType}
// //                 label="Operation Type"
// //                 onChange={(e) => setFilterType(e.target.value)}
// //               >
// //                 <MenuItem value="All">All</MenuItem>
// //                 <MenuItem value="Selling">Selling</MenuItem>
// //                 <MenuItem value="Renting">Renting</MenuItem>
// //               </Select>
// //             </FormControl>
// //           </Grid>
// //         </Grid>

// //         <Paper sx={{ width: "100%", overflow: "hidden" }}>
// //           <TableContainer sx={{ maxHeight: 600 }}>
// //             <Table stickyHeader aria-label="sticky table">
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell>ID</TableCell>
// //                   <TableCell>Property Number</TableCell>
// //                   <TableCell>Operation Type</TableCell>
// //                   <TableCell>Status</TableCell>
// //                   <TableCell>Created At</TableCell>
// //                   <TableCell align="center">Actions</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {paginatedRequests.map((request) => (
// //                   <StyledTableRow key={request.id}>
// //                     <TableCell>{request.id}</TableCell>
// //                     <TableCell>{request.propertyNumber}</TableCell>
// //                     <TableCell>{request.typeOperation}</TableCell>
// //                     <TableCell>{request.status}</TableCell>
// //                     <TableCell>
// //                       {request.createdAt
// //                         ? format(new Date(request.createdAt), "PP")
// //                         : "N/A"}{" "}
// //                     </TableCell>
// //                     <TableCell align="center">
// //                       <Tooltip title="View Details">
// //                         <IconButton
// //                           color="info"
// //                           onClick={() => handleOpenDetailsModal(request)}
// //                         >
// //                           <Visibility />
// //                         </IconButton>
// //                       </Tooltip>
// //                       <Tooltip title="Accept Request">
// //                         <IconButton
// //                           color="success"
// //                           onClick={() => handleOpenAdminModal(request, "accept")}
// //                         >
// //                           <CheckCircleOutline />
// //                         </IconButton>
// //                       </Tooltip>
// //                       <Tooltip title="Reject Request">
// //                         <IconButton
// //                           color="error"
// //                           onClick={() => handleOpenAdminModal(request, "reject")}
// //                         >
// //                           <HighlightOff />
// //                         </IconButton>
// //                       </Tooltip>
// //                       <Tooltip title="Delete Request">
// //                         <IconButton
// //                           color="secondary"
// //                           onClick={() => handleOpenAdminModal(request, "delete")}
// //                         >
// //                           <DeleteOutline />
// //                         </IconButton>
// //                       </Tooltip>
// //                     </TableCell>
// //                   </StyledTableRow>
// //                 ))}

// //                 {!paginatedRequests.length && (
// //                   <TableRow>
// //                     <TableCell colSpan={6} align="center">
// //                       No property requests found.
// //                     </TableCell>
// //                   </TableRow>
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //           <TablePagination
// //             rowsPerPageOptions={[10, 25, 100]}
// //             component="div"
// //             count={filteredRequests.length}
// //             rowsPerPage={rowsPerPage}
// //             page={page}
// //             onPageChange={handleChangePage}
// //             onRowsPerPageChange={handleChangeRowsPerPage}
// //           />
// //         </Paper>

// //         {/* Modal for Admin Actions (Accept, Reject, Delete) */}
// //         <Modal open={openAdminModal} onClose={handleCloseAdminModal}>
// //           <StyledModalPaper>
// //             <Typography variant="h6" gutterBottom>
// //               {action === "accept"
// //                 ? "Accept Property Request"
// //                 : action === "reject"
// //                 ? "Reject Property Request"
// //                 : "Delete Property Request"}
// //             </Typography>
// //             <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
// //               {`Are you sure you want to ${action} the request for property number ${selectedRequest?.propertyNumber}?`}
// //             </Typography>

// //             {action === "accept" &&
// //               selectedRequest?.typeOperation.toLowerCase() === "renting" && (
// //                 <Box component="form" noValidate sx={{ mt: 2 }}>
// //                   <DatePicker
// //                     label="Expiration Date"
// //                     value={adminFormData.expireDate}
// //                     onChange={handleDateChange}
// //                     slotProps={{
// //                       textField: { fullWidth: true, margin: "normal" },
// //                     }}
// //                   />
// //                 </Box>
// //               )}
// //             <Box
// //               sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
// //             >
// //               <Button
// //                 variant="contained"
// //                 color={
// //                   action === "accept"
// //                     ? "success"
// //                     : action === "reject"
// //                     ? "error"
// //                     : "secondary"
// //                 }
// //                 onClick={handleAdminAction}
// //                 disabled={updateLoading || deleteLoading}
// //               >
// //                 {action === "accept" ? (
// //                   updateLoading ? (
// //                     <CircularProgress size={20} color="inherit" />
// //                   ) : (
// //                     "Confirm Acceptance"
// //                   )
// //                 ) : action === "reject" ? (
// //                   updateLoading ? (
// //                     <CircularProgress size={20} color="inherit" />
// //                   ) : (
// //                     "Confirm Rejection"
// //                   )
// //                 ) : deleteLoading ? (
// //                   <CircularProgress size={20} color="inherit" />
// //                 ) : (
// //                   "Confirm Deletion"
// //                 )}
// //               </Button>
// //               <Button variant="outlined" onClick={handleCloseAdminModal}>
// //                 Cancel
// //               </Button>
// //             </Box>
// //           </StyledModalPaper>
// //         </Modal>

// //         {/* Modal for Viewing Details */}
// //         <Dialog
// //           open={openDetailsModal}
// //           onClose={handleCloseDetailsModal}
// //           maxWidth="sm"
// //           fullWidth
// //         >
// //           <DialogTitle>Property Request Details</DialogTitle>
// //           <DialogContent dividers>
// //             {selectedRequest && (
// //               <Box>
// //                 <Grid container spacing={2}>
// //                   <Grid item xs={12}>
// //                     <CarouselContainer>
// //                       {selectedRequest.photos && selectedRequest.photos.length > 0 ? (
// //                         <>
// //                           <CardMedia
// //                             component="img"
// //                             image={selectedRequest.photos?.[photoIndex]?.url}
// //                             alt="Property Photo"
// //                             onClick={() =>
// //                               handleOpenFullScreen(
// //                                 selectedRequest.photos?.[photoIndex]?.url
// //                               )
// //                             }
// //                             sx={{
// //                               width: "100%",
// //                               height: 300,
// //                               objectFit: "cover",
// //                               borderRadius: 1,
// //                               cursor: "pointer",
// //                             }}
// //                           />
// //                           {selectedRequest.photos.length > 1 && (
// //                             <>
// //                               <CarouselButton
// //                                 onClick={handlePreviousPhoto}
// //                                 sx={{ left: 8 }}
// //                               >
// //                                 <ArrowBackIos />
// //                               </CarouselButton>
// //                               <CarouselButton
// //                                 onClick={handleNextPhoto}
// //                                 sx={{ right: 8 }}
// //                               >
// //                                 <ArrowForwardIos />
// //                               </CarouselButton>
// //                             </>
// //                           )}
// //                         </>
// //                       ) : (
// //                         <Typography
// //                           variant="body2"
// //                           color="text.secondary"
// //                           align="center"
// //                         >
// //                           No photos available.
// //                         </Typography>
// //                       )}
// //                     </CarouselContainer>
// //                   </Grid>
// //                   <Grid item xs={12}>
// //                     <Typography variant="h6">Request Info</Typography>
// //                     <Typography variant="body1">
// //                       <strong>ID:</strong> {selectedRequest.id}
// //                     </Typography>
// //                     <Typography variant="body1">
// //                       <strong>Property Number:</strong>{" "}
// //                       {selectedRequest.propertyNumber}
// //                     </Typography>
// //                     <Typography variant="body1">
// //                       <strong>Operation Type:</strong>{" "}
// //                       {selectedRequest.typeOperation}
// //                     </Typography>
// //                     <Typography variant="body1">
// //                       <strong>Status:</strong> {selectedRequest.status}
// //                     </Typography>
// //                     <Typography variant="body1">
// //                       <strong>Created At:</strong>{" "}
// //                       {format(new Date(selectedRequest.createdAt), "PP")}
// //                     </Typography>
// //                   </Grid>
// //                 </Grid>
// //               </Box>
// //             )}
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={handleCloseDetailsModal}>Close</Button>
// //           </DialogActions>
// //         </Dialog>

// //         {/* Full Screen Image Modal */}
// //         <FullScreenDialog
// //           fullScreen
// //           open={openFullScreen}
// //           onClose={handleCloseFullScreen}
// //         >
// //           <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //             Full Screen Image
// //             <IconButton onClick={handleCloseFullScreen}>
// //               <Close />
// //             </IconButton>
// //           </DialogTitle>
// //           <DialogContent sx={{ display: "flex", alignItems: "center" }}>
// //             <FullScreenImage src={fullScreenImageUrl} alt="Full Screen Property Photo" />
// //           </DialogContent>
// //         </FullScreenDialog>
// //       </Container>
// //     </LocalizationProvider>
// //   );
// // };

// // export default PropertyRequestsPage;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllPropertyRequests,
//   updatePropertyRequestByAdmin,
//   deletePropertyRequest,
// } from "../../redux/property request/propertyRequestSlice";
// import {
//   Container,
//   Typography,
//   CircularProgress,
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Button,
//   IconButton,
//   Tooltip,
//   Modal,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CardMedia,
// } from "@mui/material";
// import {
//   CheckCircleOutline,
//   HighlightOff,
//   Visibility,
//   DeleteOutline,
//   ArrowBackIos,
//   ArrowForwardIos,
//   Close,
// } from "@mui/icons-material";
// import { styled, useTheme } from "@mui/material/styles";
// import { format } from "date-fns";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const StyledModalPaper = styled(Paper)(({ theme }) => ({
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   padding: theme.spacing(4),
//   outline: "none",
//   textAlign: "center",
//   backgroundColor: theme.palette.background.paper,
//   boxShadow: theme.shadows["5"],
//   borderRadius: theme.shape.borderRadius,
//   "@media (max-width: 600px)": {
//     width: "90%",
//     padding: theme.spacing(2),
//   },
// }));

// const CarouselContainer = styled(Box)(({ theme }) => ({
//   position: "relative",
//   width: "100%",
//   maxWidth: 400,
//   margin: "auto",
// }));

// const CarouselImage = styled("img")({
//   width: "100%",
//   height: 250,
//   objectFit: "cover",
//   borderRadius: 8,
// });

// const CarouselButton = styled(IconButton)(({ theme }) => ({
//   position: "absolute",
//   top: "50%",
//   transform: "translateY(-50%)",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//   },
// }));

// const FullScreenDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialog-paperFullScreen": {
//     backgroundColor: theme.palette.background.default,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// }));

// const FullScreenImage = styled("img")({
//   display: "block",
//   maxWidth: "95%",
//   maxHeight: "95vh",
//   objectFit: "contain",
// });

// const FullScreenNavButton = styled(IconButton)(({ theme }) => ({
//     position: "absolute",
//     top: "50%",
//     transform: "translateY(-50%)",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     color: "#fff",
//     "&:hover": {
//       backgroundColor: "rgba(0, 0, 0, 0.7)",
//     },
//     zIndex: 100, // Ensure buttons are on top
// }));

// const PropertyRequestsPage = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   const {
//     propertyRequests,
//     loading,
//     error,
//     deleteLoading,
//     deletError,
//     updateLoading,
//   } = useSelector((state) => state.propertyRequest);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [openAdminModal, setOpenAdminModal] = useState(false);
//   const [openDetailsModal, setOpenDetailsModal] = useState(false);
//   const [openFullScreen, setOpenFullScreen] = useState(false);
//   const [fullScreenIndex, setFullScreenIndex] = useState(0);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [action, setAction] = useState("");
//   const [filterType, setFilterType] = useState("All");
//   const [photoIndex, setPhotoIndex] = useState(0);

//   const [adminFormData, setAdminFormData] = useState({
//     propertyNumber: "",
//     expireDate: null,
//     status: "",
//   });

//   useEffect(() => {
//     dispatch(fetchAllPropertyRequests());
//   }, [dispatch]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleOpenAdminModal = (request, actionType) => {
//     setSelectedRequest(request);
//     setAction(actionType);
//     if (actionType !== "delete") {
//       setAdminFormData({
//         propertyNumber: request.propertyNumber || "",
//         expireDate: request.typeOperation === "Renting" ? null : null,
//         status: actionType === "accept" ? "Accepted" : "Rejected",
//       });
//     }
//     setOpenAdminModal(true);
//   };

//   const handleOpenDetailsModal = (request) => {
//     setSelectedRequest(request);
//     setPhotoIndex(0); // Reset carousel to the first image
//     setOpenDetailsModal(true);
//   };

//   const handleCloseAdminModal = () => {
//     setOpenAdminModal(false);
//     setSelectedRequest(null);
//     setAction("");
//   };

//   const handleCloseDetailsModal = () => {
//     setOpenDetailsModal(false);
//     setSelectedRequest(null);
//   };

//   const handleCloseFullScreen = () => {
//     setOpenFullScreen(false);
//     setFullScreenIndex(0);
//   };

//   const handleAdminFormChange = (e) => {
//     const { name, value } = e.target;
//     setAdminFormData({ ...adminFormData, [name]: value });
//   };

//   const handleDateChange = (newDate) => {
//     setAdminFormData({ ...adminFormData, expireDate: newDate });
//   };

//   const handleAdminAction = () => {
//     if (action === "delete") {
//       dispatch(deletePropertyRequest(selectedRequest.id)).then(() => {
//         dispatch(fetchAllPropertyRequests());
//         handleCloseAdminModal();
//       });
//     } else {
//       const updateData = {
//         id: selectedRequest.id,
//         updateData: {
//           status: adminFormData.status,
//           propertyNumber: adminFormData.propertyNumber,
//           expireDate:
//             selectedRequest.typeOperation.toLowerCase() === "renting" &&
//             adminFormData.status === "Accepted"
//               ? adminFormData.expireDate
//               : null,
//         },
//       };

//       dispatch(updatePropertyRequestByAdmin(updateData)).then(() => {
//         dispatch(fetchAllPropertyRequests());
//         handleCloseAdminModal();
//       });
//     }
//   };

//   const handleNextPhoto = () => {
//     if (selectedRequest?.photos) {
//       setPhotoIndex((prevIndex) =>
//         prevIndex === selectedRequest.photos.length - 1 ? 0 : prevIndex + 1
//       );
//     }
//   };

//   const handlePreviousPhoto = () => {
//     if (selectedRequest?.photos) {
//       setPhotoIndex((prevIndex) =>
//         prevIndex === 0 ? selectedRequest.photos.length - 1 : prevIndex - 1
//       );
//     }
//   };

//   const handleOpenFullScreen = (index) => {
//     setFullScreenIndex(index);
//     setOpenFullScreen(true);
//   };

//   const handleFullScreenNext = () => {
//     setFullScreenIndex((prevIndex) =>
//       prevIndex === selectedRequest.photos.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handleFullScreenPrevious = () => {
//     setFullScreenIndex((prevIndex) =>
//       prevIndex === 0 ? selectedRequest.photos.length - 1 : prevIndex - 1
//     );
//   };

//   const filteredRequests = propertyRequests.filter((request) => {
//     if (filterType === "All") return true;
//     return request.typeOperation.toLowerCase() === filterType.toLowerCase();
//   });

//   const paginatedRequests = filteredRequests.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Container>
//         <Typography color="error" variant="h6" sx={{ mt: 4 }}>
//           Error: {error}
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Grid container spacing={2} alignItems="center" mb={4}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h4" component="div">
//               Property Requests Management
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
//             <FormControl sx={{ m: 1, minWidth: 150 }}>
//               <InputLabel>Operation Type</InputLabel>
//               <Select
//                 value={filterType}
//                 label="Operation Type"
//                 onChange={(e) => setFilterType(e.target.value)}
//               >
//                 <MenuItem value="All">All</MenuItem>
//                 <MenuItem value="Selling">Selling</MenuItem>
//                 <MenuItem value="Renting">Renting</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>

//         <Paper sx={{ width: "100%", overflow: "hidden" }}>
//           <TableContainer sx={{ maxHeight: 600 }}>
//             <Table stickyHeader aria-label="sticky table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Property Number</TableCell>
//                   <TableCell>Operation Type</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Created At</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedRequests.map((request) => (
//                   <StyledTableRow key={request.id}>
//                     <TableCell>{request.id}</TableCell>
//                     <TableCell>{request.propertyNumber}</TableCell>
//                     <TableCell>{request.typeOperation}</TableCell>
//                     <TableCell>{request.status}</TableCell>
//                     <TableCell>
//                       {request.createdAt
//                         ? format(new Date(request.createdAt), "PP")
//                         : "N/A"}{" "}
//                     </TableCell>
//                     <TableCell align="center">
//                       <Tooltip title="View Details">
//                         <IconButton
//                           color="info"
//                           onClick={() => handleOpenDetailsModal(request)}
//                         >
//                           <Visibility />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Accept Request">
//                         <IconButton
//                           color="success"
//                           onClick={() => handleOpenAdminModal(request, "accept")}
//                         >
//                           <CheckCircleOutline />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Reject Request">
//                         <IconButton
//                           color="error"
//                           onClick={() => handleOpenAdminModal(request, "reject")}
//                         >
//                           <HighlightOff />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete Request">
//                         <IconButton
//                           color="secondary"
//                           onClick={() => handleOpenAdminModal(request, "delete")}
//                         >
//                           <DeleteOutline />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </StyledTableRow>
//                 ))}

//                 {!paginatedRequests.length && (
//                   <TableRow>
//                     <TableCell colSpan={6} align="center">
//                       No property requests found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 100]}
//             component="div"
//             count={filteredRequests.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>

//         {/* Modal for Admin Actions (Accept, Reject, Delete) */}
//         <Modal open={openAdminModal} onClose={handleCloseAdminModal}>
//           <StyledModalPaper>
//             <Typography variant="h6" gutterBottom>
//               {action === "accept"
//                 ? "Accept Property Request"
//                 : action === "reject"
//                 ? "Reject Property Request"
//                 : "Delete Property Request"}
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//               {`Are you sure you want to ${action} the request for property number ${selectedRequest?.propertyNumber}?`}
//             </Typography>

//             {action === "accept" &&
//               selectedRequest?.typeOperation.toLowerCase() === "renting" && (
//                 <Box component="form" noValidate sx={{ mt: 2 }}>
//                   <DatePicker
//                     label="Expiration Date"
//                     value={adminFormData.expireDate}
//                     onChange={handleDateChange}
//                     slotProps={{
//                       textField: { fullWidth: true, margin: "normal" },
//                     }}
//                   />
//                 </Box>
//               )}
//             <Box
//               sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
//             >
//               <Button
//                 variant="contained"
//                 color={
//                   action === "accept"
//                     ? "success"
//                     : action === "reject"
//                     ? "error"
//                     : "secondary"
//                 }
//                 onClick={handleAdminAction}
//                 disabled={updateLoading || deleteLoading}
//               >
//                 {action === "accept" ? (
//                   updateLoading ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     "Confirm Acceptance"
//                   )
//                 ) : action === "reject" ? (
//                   updateLoading ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     "Confirm Rejection"
//                   )
//                 ) : deleteLoading ? (
//                   <CircularProgress size={20} color="inherit" />
//                 ) : (
//                   "Confirm Deletion"
//                 )}
//               </Button>
//               <Button variant="outlined" onClick={handleCloseAdminModal}>
//                 Cancel
//               </Button>
//             </Box>
//           </StyledModalPaper>
//         </Modal>

//         {/* Modal for Viewing Details */}
//         <Dialog
//           open={openDetailsModal}
//           onClose={handleCloseDetailsModal}
//           maxWidth="sm"
//           fullWidth
//         >
//           <DialogTitle>Property Request Details</DialogTitle>
//           <DialogContent dividers>
//             {selectedRequest && (
//               <Box>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <CarouselContainer>
//                       {selectedRequest.photos && selectedRequest.photos.length > 0 ? (
//                         <>
//                           <CardMedia
//                             component="img"
//                             image={selectedRequest.photos?.[photoIndex]?.url}
//                             alt="Property Photo"
//                             onClick={() => handleOpenFullScreen(photoIndex)}
//                             sx={{
//                               width: "100%",
//                               height: 300,
//                               objectFit: "cover",
//                               borderRadius: 1,
//                               cursor: "pointer",
//                             }}
//                           />
//                           {selectedRequest.photos.length > 1 && (
//                             <>
//                               <CarouselButton
//                                 onClick={handlePreviousPhoto}
//                                 sx={{ left: 8 }}
//                               >
//                                 <ArrowBackIos />
//                               </CarouselButton>
//                               <CarouselButton
//                                 onClick={handleNextPhoto}
//                                 sx={{ right: 8 }}
//                               >
//                                 <ArrowForwardIos />
//                               </CarouselButton>
//                             </>
//                           )}
//                         </>
//                       ) : (
//                         <Typography
//                           variant="body2"
//                           color="text.secondary"
//                           align="center"
//                         >
//                           No photos available.
//                         </Typography>
//                       )}
//                     </CarouselContainer>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="h6">Request Info</Typography>
//                     <Typography variant="body1">
//                       <strong>ID:</strong> {selectedRequest.id}
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>Property Number:</strong>{" "}
//                       {selectedRequest.propertyNumber}
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>Operation Type:</strong>{" "}
//                       {selectedRequest.typeOperation}
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>Status:</strong> {selectedRequest.status}
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>Created At:</strong>{" "}
//                       {format(new Date(selectedRequest.createdAt), "PP")}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDetailsModal}>Close</Button>
//           </DialogActions>
//         </Dialog>

//         {/* Full Screen Image Modal */}
//         <FullScreenDialog
//           fullScreen
//           open={openFullScreen}
//           onClose={handleCloseFullScreen}
//         >
//             <IconButton
//                 onClick={handleCloseFullScreen}
//                 sx={{
//                     position: 'absolute',
//                     top: 8,
//                     right: 8,
//                     color: 'white',
//                     backgroundColor: 'rgba(0,0,0,0.5)',
//                     '&:hover': {
//                         backgroundColor: 'rgba(0,0,0,0.7)',
//                     },
//                     zIndex: 200,
//                 }}
//             >
//                 <Close />
//             </IconButton>

//             {selectedRequest?.photos?.length > 1 && (
//                 <>
//                 <FullScreenNavButton onClick={handleFullScreenPrevious} sx={{ left: 16 }}>
//                     <ArrowBackIos />
//                 </FullScreenNavButton>
//                 <FullScreenNavButton onClick={handleFullScreenNext} sx={{ right: 16 }}>
//                     <ArrowForwardIos />
//                 </FullScreenNavButton>
//                 </>
//             )}

//             <DialogContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 0 }}>
//                 <FullScreenImage src={selectedRequest?.photos?.[fullScreenIndex]?.url} alt="Full Screen Property Photo" />
//             </DialogContent>
//         </FullScreenDialog>
//       </Container>
//     </LocalizationProvider>
//   );
// };

// export default PropertyRequestsPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPropertyRequests,
  updatePropertyRequestByAdmin,
  deletePropertyRequest,
} from "../../redux/property request/propertyRequestSlice";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Tooltip,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardMedia,
} from "@mui/material";
import {
  CheckCircleOutline,
  HighlightOff,
  Visibility,
  DeleteOutline,
  ArrowBackIos,
  ArrowForwardIos,
  Close,
} from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledModalPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  padding: theme.spacing(4),
  outline: "none",
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows["5"],
  borderRadius: theme.shape.borderRadius,
  "@media (max-width: 600px)": {
    width: "90%",
    padding: theme.spacing(2),
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 400,
  margin: "auto",
}));

const CarouselImage = styled("img")({
  width: "100%",
  height: 250,
  objectFit: "cover",
  borderRadius: 8,
});

const CarouselButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
}));

const FullScreenDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paperFullScreen": {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const FullScreenImage = styled("img")({
  display: "block",
  maxWidth: "95%",
  maxHeight: "95vh",
  objectFit: "contain",
});

const FullScreenNavButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  zIndex: 100,
}));

const PropertyRequestsPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const {
    propertyRequests,
    loading,
    error,
    deleteLoading,
    deletError,
    updateLoading,
  } = useSelector((state) => state.propertyRequest);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openFullScreen, setOpenFullScreen] = useState(false);
  const [fullScreenIndex, setFullScreenIndex] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [action, setAction] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [photoIndex, setPhotoIndex] = useState(0);

  const [adminFormData, setAdminFormData] = useState({
    propertyNumber: "",
    expireDate: null,
    status: "",
  });


  useEffect(() => {
    dispatch(fetchAllPropertyRequests());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAdminModal = (request, actionType) => {
    setSelectedRequest(request);
    setAction(actionType);
    if (actionType !== "delete") {
      setAdminFormData({
        propertyNumber: request.propertyNumber || "",
        expireDate:
          request.typeOperation.toLowerCase() === "renting" ? null : null,
        status: actionType === "accept" ? "accepted" : "rejected",
      });
    }
    setOpenAdminModal(true);
  };

  const handleOpenDetailsModal = (request) => {
    setSelectedRequest(request);
    setPhotoIndex(0);
    setOpenDetailsModal(true);
  };

  const handleCloseAdminModal = () => {
    setOpenAdminModal(false);
    setSelectedRequest(null);
    setAction("");
    setAdminFormData({
      propertyNumber: "",
      expireDate: null,
      status: "",
    });
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedRequest(null);
  };

  const handleCloseFullScreen = () => {
    setOpenFullScreen(false);
    setFullScreenIndex(0);
  };

  const handleAdminFormChange = (e) => {
    const { name, value } = e.target;
    setAdminFormData({ ...adminFormData, [name]: value });
  };

  const handleDateChange = (newDate) => {
    setAdminFormData({ ...adminFormData, expireDate: newDate });
  };

  const handleAdminAction = () => {
    if (action === "delete") {
      dispatch(deletePropertyRequest(selectedRequest.id)).then(() => {
        dispatch(fetchAllPropertyRequests());
        handleCloseAdminModal();
      });
    } else {
      const updateData = {
        id: selectedRequest.id,
        updateData: {
          status: adminFormData.status,
          propertyNumber: adminFormData.propertyNumber,
          expireDate:
            selectedRequest.typeOperation.toLowerCase() === "renting" &&
            adminFormData.status === "accepted"
              ? // ? Date(adminFormData.expireDate)
                format(adminFormData.expireDate, "yyyy-MM-dd")
              : null,
        },
      };
      
      dispatch(updatePropertyRequestByAdmin(updateData)).then(() => {
        dispatch(fetchAllPropertyRequests());
        handleCloseAdminModal();
      });
    }
  };

  const handleNextPhoto = () => {
    if (selectedRequest?.photos) {
      setPhotoIndex((prevIndex) =>
        prevIndex === selectedRequest.photos.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousPhoto = () => {
    if (selectedRequest?.photos) {
      setPhotoIndex((prevIndex) =>
        prevIndex === 0 ? selectedRequest.photos.length - 1 : prevIndex - 1
      );
    }
  };

  const handleOpenFullScreen = (index) => {
    setFullScreenIndex(index);
    setOpenFullScreen(true);
  };

  const handleFullScreenNext = () => {
    setFullScreenIndex((prevIndex) =>
      prevIndex === selectedRequest.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleFullScreenPrevious = () => {
    setFullScreenIndex((prevIndex) =>
      prevIndex === 0 ? selectedRequest.photos.length - 1 : prevIndex - 1
    );
  };

  const filteredRequests = propertyRequests.filter((request) => {
    if (filterType === "All") return true;
    return request.typeOperation.toLowerCase() === filterType.toLowerCase();
  });

  const paginatedRequests = filteredRequests.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const isAcceptButtonDisabled =
    (action === "accept" &&
      selectedRequest?.typeOperation.toLowerCase() === "renting" &&
      adminFormData.expireDate === null) ||
    updateLoading ||
    deleteLoading;

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6" sx={{ mt: 4 }}>
          Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} alignItems="center" mb={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" component="div">
              Property Requests Management
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel>Operation Type</InputLabel>
              <Select
                value={filterType}
                label="Operation Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Selling">Selling</MenuItem>
                <MenuItem value="Renting">Renting</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Property Number</TableCell>
                  <TableCell>Operation Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRequests.map((request) => (
                  <StyledTableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.propertyNumber}</TableCell>
                    <TableCell>{request.typeOperation}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>
                      {request.createdAt
                        ? format(new Date(request.createdAt), "PP")
                        : "N/A"}{" "}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton
                          color="info"
                          onClick={() => handleOpenDetailsModal(request)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Accept Request">
                        <IconButton
                          color="success"
                          onClick={() =>
                            handleOpenAdminModal(request, "accept")
                          }
                        >
                          <CheckCircleOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject Request">
                        <IconButton
                          color="error"
                          onClick={() =>
                            handleOpenAdminModal(request, "reject")
                          }
                        >
                          <HighlightOff />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Request">
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            handleOpenAdminModal(request, "delete")
                          }
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </StyledTableRow>
                ))}

                {!paginatedRequests.length && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No property requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredRequests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Modal for Admin Actions (Accept, Reject, Delete) */}
        <Modal open={openAdminModal} onClose={handleCloseAdminModal}>
          <StyledModalPaper>
            <Typography variant="h6" gutterBottom>
              {action === "accept"
                ? "Accept Property Request"
                : action === "reject"
                ? "Reject Property Request"
                : "Delete Property Request"}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {`Are you sure you want to ${action} the request for property number ${selectedRequest?.propertyNumber}?`}
            </Typography>

            {action === "accept" &&
              selectedRequest?.typeOperation.toLowerCase() === "renting" && (
                <Box component="form" noValidate sx={{ mt: 2 }}>
                  <DatePicker
                    label="Expiration Date"
                    value={adminFormData.expireDate}
                    onChange={handleDateChange}
                    slotProps={{
                      textField: { fullWidth: true, margin: "normal" },
                    }}
                  />
                </Box>
              )}
            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
            >
              <Button
                variant="contained"
                color={
                  action === "accept"
                    ? "success"
                    : action === "reject"
                    ? "error"
                    : "secondary"
                }
                onClick={handleAdminAction}
                disabled={isAcceptButtonDisabled}
              >
                {action === "accept" ? (
                  updateLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Confirm Acceptance"
                  )
                ) : action === "reject" ? (
                  updateLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Confirm Rejection"
                  )
                ) : deleteLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Confirm Deletion"
                )}
              </Button>
              <Button variant="outlined" onClick={handleCloseAdminModal}>
                Cancel
              </Button>
            </Box>
          </StyledModalPaper>
        </Modal>

        {/* Modal for Viewing Details */}
        <Dialog
          open={openDetailsModal}
          onClose={handleCloseDetailsModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Property Request Details</DialogTitle>
          <DialogContent dividers>
            {selectedRequest && (
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CarouselContainer>
                      {selectedRequest.photos &&
                      selectedRequest.photos.length > 0 ? (
                        <>
                          <CardMedia
                            component="img"
                            image={selectedRequest.photos?.[photoIndex]?.url}
                            alt="Property Photo"
                            onClick={() => handleOpenFullScreen(photoIndex)}
                            sx={{
                              width: "100%",
                              height: 300,
                              objectFit: "cover",
                              borderRadius: 1,
                              cursor: "pointer",
                            }}
                          />
                          {selectedRequest.photos.length > 1 && (
                            <>
                              <CarouselButton
                                onClick={handlePreviousPhoto}
                                sx={{ left: 8 }}
                              >
                                <ArrowBackIos />
                              </CarouselButton>
                              <CarouselButton
                                onClick={handleNextPhoto}
                                sx={{ right: 8 }}
                              >
                                <ArrowForwardIos />
                              </CarouselButton>
                            </>
                          )}
                        </>
                      ) : (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="center"
                        >
                          No photos available.
                        </Typography>
                      )}
                    </CarouselContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Request Info</Typography>
                    <Typography variant="body1">
                      <strong>ID:</strong> {selectedRequest.id}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Property Number:</strong>{" "}
                      {selectedRequest.propertyNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Operation Type:</strong>{" "}
                      {selectedRequest.typeOperation}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Status:</strong> {selectedRequest.status}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Created At:</strong>{" "}
                      {format(new Date(selectedRequest.createdAt), "PP")}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetailsModal}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Full Screen Image Modal */}
        <FullScreenDialog
          fullScreen
          open={openFullScreen}
          onClose={handleCloseFullScreen}
        >
          <IconButton
            onClick={handleCloseFullScreen}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.7)",
              },
              zIndex: 200,
            }}
          >
            <Close />
          </IconButton>

          {selectedRequest?.photos?.length > 1 && (
            <>
              <FullScreenNavButton
                onClick={handleFullScreenPrevious}
                sx={{ left: 16 }}
              >
                <ArrowBackIos />
              </FullScreenNavButton>
              <FullScreenNavButton
                onClick={handleFullScreenNext}
                sx={{ right: 16 }}
              >
                <ArrowForwardIos />
              </FullScreenNavButton>
            </>
          )}

          <DialogContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 0,
            }}
          >
            <FullScreenImage
              src={selectedRequest?.photos?.[fullScreenIndex]?.url}
              alt="Full Screen Property Photo"
            />
          </DialogContent>
        </FullScreenDialog>
      </Container>
    </LocalizationProvider>
  );
};

export default PropertyRequestsPage;
