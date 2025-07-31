// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Container,
//   Typography,
//   Grid,
//   Box,
//   Divider,
//   CircularProgress,
//   Alert,
//   IconButton,
//   CardMedia,
//   Avatar,
//   Stack,
//   Button,
//   Dialog, // Ensure Dialog is imported for the full-screen viewer
//   DialogTitle,
//   DialogContent,
// } from "@mui/material";
// import {
//   ArrowBackIos as ArrowBackIosIcon,
//   ArrowForwardIos as ArrowForwardIosIcon,
//   ArrowBack as ArrowBackIcon,
//   Close as CloseIcon, // Make sure CloseIcon is imported for the dialog
// } from "@mui/icons-material";

// // IMPORTANT: Use fetchPropertyById from your 'property' slice
// import { fetchPropertyById } from "../redux/property/propertySlice"; // Adjust path as needed

// const PropertyDetailsPage = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Use state from your 'property' slice for a single property
//   const { property: singleProperty, loading, error } = useSelector(
//     (state) => state.property // Access the 'property' slice state
//   );

//   // === IMPORTANT: Replace this with your actual user role from Redux/Auth ===
//   // Example: const userRole = useSelector(state => state.auth.user?.role);
//   // For demonstration, let's assume a role for now.
//   const userRole = "user"; // Default to a 'user' role for general public view
//   // Consider mapping specific backend roles to more readable frontend roles if needed
//   // === END IMPORTANT ===

//   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
//   const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchPropertyById(id)); // Dispatch your fetchPropertyById thunk
//     }
//   }, [dispatch, id]);

//   // Reset photo index when property data loads/changes
//   useEffect(() => {
//     if (singleProperty) {
//       setCurrentPhotoIndex(0);
//     }
//   }, [singleProperty]);

//   if (loading) {
//     return (
//       <Container sx={{ mt: 4, display: "flex", justifyContent: "center", alignItems: "center", minHeight: '80vh' }}>
//         <CircularProgress />
//         <Typography variant="h6" ml={2}>Loading property details...</Typography>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="error">
//           Error loading property: {error.message || error.response?.data?.message || "An unknown error occurred."}
//         </Alert>
//         <Button
//             variant="outlined"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate(-1)}
//             sx={{ mt: 2 }}
//         >
//             Go Back
//         </Button>
//       </Container>
//     );
//   }

//   if (!singleProperty) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="info">Property not found or invalid ID.</Alert>
//         <Button
//             variant="outlined"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate(-1)}
//             sx={{ mt: 2 }}
//         >
//             Go Back
//         </Button>
//       </Container>
//     );
//   }

//   const photos = singleProperty.photos || [];
//   const hasPhotos = photos.length > 0;
//   const owner = singleProperty.owner;

//   const handleNextPhoto = () => {
//     setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
//   };

//   const handlePrevPhoto = () => {
//     setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
//   };

//   const handleOpenPhotoViewer = (index) => {
//     setCurrentPhotoIndex(index);
//     setIsPhotoViewerOpen(true);
//   };

//   const handleClosePhotoViewer = () => {
//     setIsPhotoViewerOpen(false);
//   };

//   // Determine if the current user role has access to sensitive owner info
//   // You can define which roles get which access levels
//   const canViewSensitiveOwnerInfo = ['office_manager', 'admin', 'super_admin'].includes(userRole);
//   const canViewLicenseDetails = ['office_manager', 'admin', 'super_admin'].includes(userRole);


//   return (
//     <Container sx={{ mt: 4, pb: 4 }}>
//       <Button
//         variant="outlined"
//         startIcon={<ArrowBackIcon />}
//         onClick={() => navigate(-1)} // Go back to the previous page
//         sx={{ mb: 3 }}
//       >
//         Back to Properties
//       </Button>

//       <Typography variant="h4" gutterBottom component="h1">
//         Property Details: {singleProperty.propertyNumber}
//       </Typography>

//       <Grid container spacing={4}>
//         {/* Property Photos Section */}
//         <Grid item xs={12} md={7}>
//           <Typography variant="h6" gutterBottom>
//             Property Photos
//           </Typography>
//           {hasPhotos ? (
//             <>
//               <Box
//                 sx={{
//                   position: "relative",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: 450,
//                   backgroundColor: "#f0f0f0",
//                   borderRadius: 2,
//                   overflow: "hidden",
//                   mb: 2,
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   image={photos[currentPhotoIndex].url}
//                   alt={`Property Photo ${currentPhotoIndex + 1}`}
//                   sx={{
//                     maxHeight: "100%",
//                     maxWidth: "100%",
//                     objectFit: "contain",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleOpenPhotoViewer(currentPhotoIndex)}
//                 />
//                 {photos.length > 1 && (
//                   <>
//                     <IconButton
//                       sx={{ position: "absolute", left: 8, color: "white", backgroundColor: "rgba(0,0,0,0.5)", '&:hover': {backgroundColor: "rgba(0,0,0,0.7)"} }}
//                       onClick={handlePrevPhoto}
//                     >
//                       <ArrowBackIosIcon />
//                     </IconButton>
//                     <IconButton
//                       sx={{ position: "absolute", right: 8, color: "white", backgroundColor: "rgba(0,0,0,0.5)", '&:hover': {backgroundColor: "rgba(0,0,0,0.7)"} }}
//                       onClick={handleNextPhoto}
//                     >
//                       <ArrowForwardIosIcon />
//                     </IconButton>
//                   </>
//                 )}
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     position: "absolute",
//                     bottom: 8,
//                     right: 8,
//                     color: "white",
//                     backgroundColor: "rgba(0,0,0,0.6)",
//                     px: 1,
//                     borderRadius: 1,
//                   }}
//                 >
//                   {currentPhotoIndex + 1} / {photos.length}
//                 </Typography>
//               </Box>
//               {/* Thumbnail Row */}
//               <Stack direction="row" spacing={1} overflow="auto" pb={1}>
//                 {photos.map((photo, index) => (
//                   <Box
//                     key={photo.id}
//                     sx={{
//                       width: 80,
//                       height: 80,
//                       flexShrink: 0,
//                       borderRadius: 1,
//                       overflow: "hidden",
//                       border: index === currentPhotoIndex ? "2px solid #1976d2" : "1px solid #ddd",
//                       cursor: "pointer",
//                       transition: "border-color 0.2s",
//                     }}
//                     onClick={() => setCurrentPhotoIndex(index)}
//                   >
//                     <CardMedia
//                       component="img"
//                       image={photo.url}
//                       alt={`Thumbnail ${index + 1}`}
//                       sx={{ width: "100%", height: "100%", objectFit: "cover" }}
//                     />
//                   </Box>
//                 ))}
//               </Stack>
//             </>
//           ) : (
//             <Box
//               sx={{
//                 height: 200,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: "#f0f0f0",
//                 color: "#9e9e9e",
//                 borderRadius: 1,
//               }}
//             >
//               No Photos Available
//             </Box>
//           )}
//         </Grid>

//         {/* Property Information */}
//         <Grid item xs={12} md={5}>
//           <Typography variant="h6" gutterBottom>
//             Property Information
//           </Typography>
//           <Typography variant="body1">
//             **Property Number:** {singleProperty.propertyNumber}
//           </Typography>
//           <Typography variant="body1">
//             **Operation Type:** {singleProperty.typeOperation}
//           </Typography>
//           <Typography variant="body1">
//             **Space:** {singleProperty.space} sqm
//           </Typography>
//           <Typography variant="body1">
//             **Price:** {singleProperty.price}
//           </Typography>
//           <Typography variant="body1">
//             **Property Type:** {singleProperty.type?.name}
//           </Typography>
//           <Typography variant="body1">
//             **Publish Date:** {new Date(singleProperty.publishDate).toLocaleDateString()}
//           </Typography>
//           {/* Status might only be relevant for admin-like roles, or show a simplified status */}
//           {userRole !== 'user' && ( // Example: don't show status to general users
//               <Typography variant="body1" sx={{ color: singleProperty.status === 'accepted' ? 'success.main' : singleProperty.status === 'pending' ? 'warning.main' : 'error.main', fontWeight: 'bold' }}>
//                 **Status:** {singleProperty.status ? singleProperty.status.toUpperCase() : "N/A"}
//               </Typography>
//           )}
//           <Typography variant="body1">
//             **Description:** {singleProperty.description || "N/A"}
//           </Typography>

//           <Divider sx={{ my: 2 }} />

//           {/* Owner Information */}
//           <Typography variant="h6" gutterBottom>
//             Owner Information
//           </Typography>
//           {owner ? (
//             <Box display="flex" alignItems="center" mb={1}>
//               {owner.profile_photo?.url ? (
//                 <Avatar src={owner.profile_photo.url} alt={`${owner.first_name} ${owner.last_name}`} sx={{ width: 60, height: 60, mr: 2 }} />
//               ) : (
//                 <Avatar sx={{ width: 60, height: 60, mr: 2 }}>{owner.first_name ? owner.first_name[0] : '?'}</Avatar>
//               )}
//               <Box>
//                 <Typography variant="body1">
//                   **Full Name:** {owner.first_name} {owner.last_name}
//                 </Typography>
//                 {/* Conditionally render sensitive info based on userRole */}
//                 {canViewSensitiveOwnerInfo && (
//                   <>
//                     <Typography variant="body1">
//                       **National Number:** {owner.national_number || "N/A"}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       **Email:** {owner.email}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       **Phone:** {owner.phone}
//                     </Typography>
//                   </>
//                 )}
//                 {!canViewSensitiveOwnerInfo && (
//                     <Typography variant="body2" color="text.secondary">
//                         (Contact owner via office)
//                     </Typography>
//                 )}
//               </Box>
//             </Box>
//           ) : (
//             <Typography variant="body1" color="text.secondary">
//               Owner information not available.
//             </Typography>
//           )}
//         </Grid>

//         <Grid item xs={12}>
//           <Divider sx={{ my: 2 }} />
//         </Grid>

//         {/* Location and License Details */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" gutterBottom>
//             Location Details
//           </Typography>
//           <Typography variant="body1">
//             **Governorate:** {singleProperty.location?.governorate}
//           </Typography>
//           <Typography variant="body1">
//             **Province:** {singleProperty.location?.province}
//           </Typography>
//           <Typography variant="body1">
//             **City:** {singleProperty.location?.city}
//           </Typography>
//           <Typography variant="body1">
//             **Street:** {singleProperty.location?.street}
//           </Typography>
//         </Grid>

//         {canViewLicenseDetails && ( // Conditionally render license details
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" gutterBottom>
//               License Details
//             </Typography>
//             <Typography variant="body1">
//               **License Type:** {singleProperty.licenseDetails?.license?.name || "N/A"}
//             </Typography>
//             <Typography variant="body1">
//               **License Number:** {singleProperty.licenseDetails?.licenseNumber || "N/A"}
//             </Typography>
//             <Typography variant="body1">
//               **License Date:** {singleProperty.licenseDetails?.date ? new Date(singleProperty.licenseDetails.date).toLocaleDateString() : "N/A"}
//             </Typography>
//           </Grid>
//         )}

//         {/* Property Attributes */}
//         {singleProperty.propertyAttributes && singleProperty.propertyAttributes.length > 0 && (
//           <Grid item xs={12}>
//             <Divider sx={{ my: 2 }} />
//             <Typography variant="h6" gutterBottom>
//               Property Attributes
//             </Typography>
//             <Grid container spacing={2}>
//               {singleProperty.propertyAttributes.map((attr, index) => (
//                 <Grid item xs={6} sm={4} md={3} key={index}>
//                   <Typography variant="body1">
//                     **{attr.attribute?.name}:** {attr.value}
//                   </Typography>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         )}
//       </Grid>

//       {/* Full-screen Photo Viewer Dialog (remains a dialog as it overlays the entire page) */}
//       {hasPhotos && (
//         <Dialog
//           open={isPhotoViewerOpen}
//           onClose={handleClosePhotoViewer}
//           maxWidth="xl"
//           fullScreen
//           PaperProps={{ sx: { backgroundColor: 'transparent' } }}
//         >
//           <DialogTitle sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             backgroundColor: 'rgba(0,0,0,0.85)',
//             color: 'white',
//             position: 'absolute',
//             width: '100%',
//             top: 0,
//             zIndex: 1,
//             px: 3, py: 1
//           }}>
//             <Typography variant="h6" color="inherit">
//               Property Photos ({currentPhotoIndex + 1} / {photos.length})
//             </Typography>
//             <IconButton
//               aria-label="close"
//               onClick={handleClosePhotoViewer}
//               sx={{ color: 'white' }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "rgba(0,0,0,0.85)",
//               p: 0,
//               position: "relative",
//             }}
//           >
//             <Box
//               component="img"
//               src={photos[currentPhotoIndex].url}
//               alt={`Full-screen Property Photo ${currentPhotoIndex + 1}`}
//               sx={{
//                 maxWidth: "95%",
//                 maxHeight: "95%",
//                 objectFit: "contain",
//                 cursor: 'pointer',
//               }}
//               onClick={handleClosePhotoViewer}
//             />
//             {photos.length > 1 && (
//               <>
//                 <IconButton
//                   sx={{ position: "absolute", left: 20, color: "white", fontSize: 50, zIndex: 1 }}
//                   onClick={handlePrevPhoto}
//                 >
//                   <ArrowBackIosIcon sx={{ fontSize: 'inherit' }} />
//                 </IconButton>
//                 <IconButton
//                   sx={{ position: "absolute", right: 20, color: "white", fontSize: 50, zIndex: 1 }}
//                   onClick={handleNextPhoto}
//                 >
//                   <ArrowForwardIosIcon sx={{ fontSize: 'inherit' }} />
//                 </IconButton>
//               </>
//             )}
//           </DialogContent>
//         </Dialog>
//       )}
//     </Container>
//   );
// };

// export default PropertyDetailsPage;














import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  CardMedia,
  Avatar,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, // Added for dialog actions
  TextField, // Added for form inputs
  MenuItem, // Added for select
  Snackbar // Added for notifications
} from "@mui/material";
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// IMPORTANT: Use fetchPropertyById from your 'property' slice
import { fetchPropertyById } from "../redux/property/propertySlice"; // Adjust path as needed
import { makeReservation, clearReservationStatus } from "../redux/reservation/reservationSlice"; // Import new actions

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use state from your 'property' slice for a single property
  const { property: singleProperty, loading, error } = useSelector(
    (state) => state.property
  );

  // Get state from the new 'reservation' slice
  const {
    loading: reservationLoading,
    error: reservationError,
    success: reservationSuccess,
  } = useSelector((state) => state.reservation);

  // === IMPORTANT: Replace this with your actual user role from Redux/Auth ===
  const userRole = "user"; // Default to a 'user' role for general public view
  // === END IMPORTANT ===

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false); // State for payment dialog
  // State for payment form fields
  const [paymentType, setPaymentType] = useState("mastercard");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(id));
    }
  }, [dispatch, id]);

  // Reset photo index when property data loads/changes
  useEffect(() => {
    if (singleProperty) {
      setCurrentPhotoIndex(0);
    }
  }, [singleProperty]);

  // Handle reservation success/error notifications
  useEffect(() => {
    if (reservationSuccess) {
      setSnackbarMessage("Reservation successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsPaymentDialogOpen(false); // Close dialog on success
      dispatch(clearReservationStatus()); // Clear status after showing message
    }
    if (reservationError) {
      setSnackbarMessage(`Reservation failed: ${reservationError.message || 'An unknown error occurred.'}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      // Don't close dialog on error, let user retry/correct
    }
  }, [reservationSuccess, reservationError, dispatch]);


  const handleOpenPaymentDialog = () => {
    setIsPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
    // Optionally clear form fields when closing
    setPaymentType("mastercard");
    setCardNumber("");
    setExpiryMonth("");
    setExpiryYear("");
    setCvv("");
    dispatch(clearReservationStatus()); // Clear any previous reservation errors/success
  };

  const handleMakeReservation = () => {
    // Basic validation
    if (!paymentType || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      setSnackbarMessage("Please fill in all payment details.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    const paymentData = {
      type: paymentType,
      cardNumber: cardNumber,
      expiryMonth: parseInt(expiryMonth, 10),
      expiryYear: parseInt(expiryYear, 10),
      cvv: cvv,
    };

    dispatch(makeReservation({ propertyId: id, paymentData }));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: "flex", justifyContent: "center", alignItems: "center", minHeight: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" ml={2}>Loading property details...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Error loading property: {error.message || error.response?.data?.message || "An unknown error occurred."}
        </Alert>
        <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mt: 2 }}
        >
            Go Back
        </Button>
      </Container>
    );
  }

  if (!singleProperty) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Property not found or invalid ID.</Alert>
        <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mt: 2 }}
        >
            Go Back
        </Button>
      </Container>
    );
  }

  const photos = singleProperty.photos || [];
  const hasPhotos = photos.length > 0;
  const owner = singleProperty.owner;

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const handleOpenPhotoViewer = (index) => {
    setCurrentPhotoIndex(index);
    setIsPhotoViewerOpen(true);
  };

  const handleClosePhotoViewer = () => {
    setIsPhotoViewerOpen(false);
  };

  const canViewSensitiveOwnerInfo = ['office_manager', 'admin', 'super_admin'].includes(userRole);
  const canViewLicenseDetails = ['office_manager', 'admin', 'super_admin'].includes(userRole);


  return (
    <Container sx={{ mt: 4, pb: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Properties
      </Button>

      <Typography variant="h4" gutterBottom component="h1">
        Property Details: {singleProperty.propertyNumber}
      </Typography>

      <Grid container spacing={4}>
        {/* Property Photos Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h6" gutterBottom>
            Property Photos
          </Typography>
          {hasPhotos ? (
            <>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 450,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 2,
                  overflow: "hidden",
                  mb: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={photos[currentPhotoIndex].url}
                  alt={`Property Photo ${currentPhotoIndex + 1}`}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenPhotoViewer(currentPhotoIndex)}
                />
                {photos.length > 1 && (
                  <>
                    <IconButton
                      sx={{ position: "absolute", left: 8, color: "white", backgroundColor: "rgba(0,0,0,0.5)", '&:hover': {backgroundColor: "rgba(0,0,0,0.7)"} }}
                      onClick={handlePrevPhoto}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      sx={{ position: "absolute", right: 8, color: "white", backgroundColor: "rgba(0,0,0,0.5)", '&:hover': {backgroundColor: "rgba(0,0,0,0.7)"} }}
                      onClick={handleNextPhoto}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </>
                )}
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    px: 1,
                    borderRadius: 1,
                  }}
                >
                  {currentPhotoIndex + 1} / {photos.length}
                </Typography>
              </Box>
              {/* Thumbnail Row */}
              <Stack direction="row" spacing={1} overflow="auto" pb={1}>
                {photos.map((photo, index) => (
                  <Box
                    key={photo.id}
                    sx={{
                      width: 80,
                      height: 80,
                      flexShrink: 0,
                      borderRadius: 1,
                      overflow: "hidden",
                      border: index === currentPhotoIndex ? "2px solid #1976d2" : "1px solid #ddd",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    onClick={() => setCurrentPhotoIndex(index)}
                  >
                    <CardMedia
                      component="img"
                      image={photo.url}
                      alt={`Thumbnail ${index + 1}`}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                ))}
              </Stack>
            </>
          ) : (
            <Box
              sx={{
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f0f0",
                color: "#9e9e9e",
                borderRadius: 1,
              }}
            >
              No Photos Available
            </Box>
          )}
        </Grid>

        {/* Property Information */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            Property Information
          </Typography>
          <Typography variant="body1">
            **Property Number:** {singleProperty.propertyNumber}
          </Typography>
          <Typography variant="body1">
            **Operation Type:** {singleProperty.typeOperation}
          </Typography>
          <Typography variant="body1">
            **Space:** {singleProperty.space} sqm
          </Typography>
          <Typography variant="body1">
            **Price:** {singleProperty.price}
          </Typography>
          <Typography variant="body1">
            **Property Type:** {singleProperty.type?.name}
          </Typography>
          <Typography variant="body1">
            **Publish Date:** {new Date(singleProperty.publishDate).toLocaleDateString()}
          </Typography>
          {/* Status might only be relevant for admin-like roles, or show a simplified status */}
          {userRole !== 'user' && ( // Example: don't show status to general users
              <Typography variant="body1" sx={{ color: singleProperty.status === 'accepted' ? 'success.main' : singleProperty.status === 'pending' ? 'warning.main' : 'error.main', fontWeight: 'bold' }}>
                **Status:** {singleProperty.status ? singleProperty.status.toUpperCase() : "N/A"}
              </Typography>
          )}
          <Typography variant="body1">
            **Description:** {singleProperty.description || "N/A"}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Owner Information */}
          <Typography variant="h6" gutterBottom>
            Owner Information
          </Typography>
          {owner ? (
            <Box display="flex" alignItems="center" mb={1}>
              {owner.profile_photo?.url ? (
                <Avatar src={owner.profile_photo.url} alt={`${owner.first_name} ${owner.last_name}`} sx={{ width: 60, height: 60, mr: 2 }} />
              ) : (
                <Avatar sx={{ width: 60, height: 60, mr: 2 }}>{owner.first_name ? owner.first_name[0] : '?'}</Avatar>
              )}
              <Box>
                <Typography variant="body1">
                  **Full Name:** {owner.first_name} {owner.last_name}
                </Typography>
                {/* Conditionally render sensitive info based on userRole */}
                {canViewSensitiveOwnerInfo && (
                  <>
                    <Typography variant="body1">
                      **National Number:** {owner.national_number || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      **Email:** {owner.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      **Phone:** {owner.phone}
                    </Typography>
                  </>
                )}
                {!canViewSensitiveOwnerInfo && (
                    <Typography variant="body2" color="text.secondary">
                        (Contact owner via office)
                    </Typography>
                )}
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Owner information not available.
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Reserve Property Button */}
          {userRole === 'user' && ( // Only show to users who can reserve
              <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleOpenPaymentDialog}
                  sx={{ mt: 2 }}
              >
                  Reserve Property
              </Button>
          )}

        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Location and License Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Location Details
          </Typography>
          <Typography variant="body1">
            **Governorate:** {singleProperty.location?.governorate}
          </Typography>
          <Typography variant="body1">
            **Province:** {singleProperty.location?.province}
          </Typography>
          <Typography variant="body1">
            **City:** {singleProperty.location?.city}
          </Typography>
          <Typography variant="body1">
            **Street:** {singleProperty.location?.street}
          </Typography>
        </Grid>

        {canViewLicenseDetails && ( // Conditionally render license details
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              License Details
            </Typography>
            <Typography variant="body1">
              **License Type:** {singleProperty.licenseDetails?.license?.name || "N/A"}
            </Typography>
            <Typography variant="body1">
              **License Number:** {singleProperty.licenseDetails?.licenseNumber || "N/A"}
            </Typography>
            <Typography variant="body1">
              **License Date:** {singleProperty.licenseDetails?.date ? new Date(singleProperty.licenseDetails.date).toLocaleDateString() : "N/A"}
            </Typography>
          </Grid>
        )}

        {/* Property Attributes */}
        {singleProperty.propertyAttributes && singleProperty.propertyAttributes.length > 0 && (
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Property Attributes
            </Typography>
            <Grid container spacing={2}>
              {singleProperty.propertyAttributes.map((attr, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Typography variant="body1">
                    **{attr.attribute?.name}:** {attr.value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>

      {/* Full-screen Photo Viewer Dialog */}
      {hasPhotos && (
        <Dialog
          open={isPhotoViewerOpen}
          onClose={handleClosePhotoViewer}
          maxWidth="xl"
          fullScreen
          PaperProps={{ sx: { backgroundColor: 'transparent' } }}
        >
          <DialogTitle sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: 'white',
            position: 'absolute',
            width: '100%',
            top: 0,
            zIndex: 1,
            px: 3, py: 1
          }}>
            <Typography variant="h6" color="inherit">
              Property Photos ({currentPhotoIndex + 1} / {photos.length})
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleClosePhotoViewer}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.85)",
              p: 0,
              position: "relative",
            }}
          >
            <Box
              component="img"
              src={photos[currentPhotoIndex].url}
              alt={`Full-screen Property Photo ${currentPhotoIndex + 1}`}
              sx={{
                maxWidth: "95%",
                maxHeight: "95%",
                objectFit: "contain",
                cursor: 'pointer',
              }}
              onClick={handleClosePhotoViewer}
            />
            {photos.length > 1 && (
              <>
                <IconButton
                  sx={{ position: "absolute", left: 20, color: "white", fontSize: 50, zIndex: 1 }}
                  onClick={handlePrevPhoto}
                >
                  <ArrowBackIosIcon sx={{ fontSize: 'inherit' }} />
                </IconButton>
                <IconButton
                  sx={{ position: "absolute", right: 20, color: "white", fontSize: 50, zIndex: 1 }}
                  onClick={handleNextPhoto}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: 'inherit' }} />
                </IconButton>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onClose={handleClosePaymentDialog}>
        <DialogTitle>
          Reserve Property: {singleProperty.propertyNumber}
          <IconButton
            aria-label="close"
            onClick={handleClosePaymentDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            Enter Payment Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                label="Card Type"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                fullWidth
                margin="normal"
              >
                <MenuItem value="mastercard">Mastercard</MenuItem>
                <MenuItem value="visa">Visa</MenuItem>
                {/* Add other card types as needed */}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                fullWidth
                margin="normal"
                type="text" // Can be 'number' but 'text' allows for formatting/spaces if needed
                inputProps={{ maxLength: 16 }} // Max length for typical card numbers
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expiry Month (MM)"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                fullWidth
                margin="normal"
                type="number"
                inputProps={{ min: 1, max: 12, maxLength: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expiry Year (YY)"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                fullWidth
                margin="normal"
                type="number"
                inputProps={{ min: new Date().getFullYear().toString().slice(2), maxLength: 2 }} // Start from current year's last two digits
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                fullWidth
                margin="normal"
                type="password" // Use password type for security
                inputProps={{ maxLength: 4 }} // CVV is usually 3 or 4 digits
              />
            </Grid>
          </Grid>
          {reservationError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {reservationError.message || "An error occurred during reservation."}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleMakeReservation}
            color="primary"
            variant="contained"
            disabled={reservationLoading} // Disable button while loading
          >
            {reservationLoading ? <CircularProgress size={24} /> : "Confirm Reservation"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PropertyDetailsPage;