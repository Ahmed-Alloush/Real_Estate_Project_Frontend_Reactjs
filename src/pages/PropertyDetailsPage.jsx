
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   Grid,
//   Box,
//   Button,
//   IconButton,
//   Stack,
//   CardMedia,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   CircularProgress,
//   Alert,
//   Divider,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   ArrowBackIos as ArrowBackIosIcon,
//   ArrowForwardIos as ArrowForwardIosIcon,
//   Close as CloseIcon,
// } from "@mui/icons-material";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPropertyById } from "../redux/property/propertySlice";

// const PropertyDetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     property: singleProperty,
//     loading,
//     error,
//   } = useSelector((state) => state.property);
//   const { role: userRole } = useSelector((state) => state.auth);

//   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
//   const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);

//   const canViewSensitiveOwnerInfo = [
//     "officeManager",
//     "admin",
//     "superAdmin",
//   ].includes(userRole);
//   const canViewLicenseDetails = canViewSensitiveOwnerInfo;

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchPropertyById(id));
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (singleProperty) {
//       setCurrentPhotoIndex(0);
//     }
//   }, [singleProperty]);

//   const handleOpenPhotoViewer = (index) => {
//     setCurrentPhotoIndex(index);
//     setIsPhotoViewerOpen(true);
//   };

//   const handleClosePhotoViewer = () => setIsPhotoViewerOpen(false);

//   const handlePrevPhoto = () =>
//     setCurrentPhotoIndex(
//       (prev) =>
//         (prev - 1 + singleProperty.photos.length) % singleProperty.photos.length
//     );
//   const handleNextPhoto = () =>
//     setCurrentPhotoIndex((prev) => (prev + 1) % singleProperty.photos.length);

//   if (loading) {
//     return (
//       <Container sx={{ mt: 6, textAlign: "center" }}>
//         <CircularProgress />
//         <Typography mt={2}>Loading property details...</Typography>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="error" sx={{ mb: 2 }}>
//           Error loading property:{" "}
//           {error.message || error.response?.data?.message || "Unknown error"}
//         </Alert>
//         <Button
//           variant="outlined"
//           startIcon={<ArrowBackIcon />}
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </Button>
//       </Container>
//     );
//   }

//   if (!singleProperty) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="info">Property not found.</Alert>
//         <Button
//           variant="outlined"
//           startIcon={<ArrowBackIcon />}
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </Button>
//       </Container>
//     );
//   }

//   const photos = singleProperty.photos || [];

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
//       <Button
//         variant="contained"
//         startIcon={<ArrowBackIcon />}
//         onClick={() => navigate(-1)}
//         sx={{ mb: 4 }}
//       >
//         Back to Properties
//       </Button>

//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         Property #{singleProperty.propertyNumber}
//       </Typography>

//       <Grid container spacing={4}>
//         {/* PHOTO SECTION */}
//         <Grid item xs={12} md={7}>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Photos
//           </Typography>

//           {photos.length > 0 ? (
//             <>
//               <Box
//                 sx={{
//                   position: "relative",
//                   height: 450,
//                   borderRadius: 3,
//                   overflow: "hidden",
//                   boxShadow: 3,
//                   mb: 2,
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   image={photos[currentPhotoIndex].url}
//                   onClick={() => handleOpenPhotoViewer(currentPhotoIndex)}
//                   sx={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     cursor: "pointer",
//                     transition: "0.3s",
//                     "&:hover": {
//                       filter: "brightness(0.95)",
//                     },
//                   }}
//                 />
//                 {photos.length > 1 && (
//                   <>
//                     <IconButton
//                       onClick={handlePrevPhoto}
//                       sx={{
//                         position: "absolute",
//                         left: 8,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         backgroundColor: "rgba(0,0,0,0.5)",
//                         color: "#fff",
//                         "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
//                       }}
//                     >
//                       <ArrowBackIosIcon />
//                     </IconButton>
//                     <IconButton
//                       onClick={handleNextPhoto}
//                       sx={{
//                         position: "absolute",
//                         right: 8,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         backgroundColor: "rgba(0,0,0,0.5)",
//                         color: "#fff",
//                         "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
//                       }}
//                     >
//                       <ArrowForwardIosIcon />
//                     </IconButton>
//                   </>
//                 )}
//               </Box>

//               <Stack direction="row" spacing={1} overflow="auto">
//                 {photos.map((photo, index) => (
//                   <Box
//                     key={photo.id}
//                     onClick={() => setCurrentPhotoIndex(index)}
//                     sx={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: 2,
//                       overflow: "hidden",
//                       border:
//                         index === currentPhotoIndex
//                           ? "2px solid #1976d2"
//                           : "1px solid #ccc",
//                       cursor: "pointer",
//                       flexShrink: 0,
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       image={photo.url}
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
//                 backgroundColor: "#f0f0f0",
//                 color: "#888",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: 2,
//               }}
//             >
//               No Photos Available
//             </Box>
//           )}
//         </Grid>

//         {/* INFO SECTION */}
//         <Grid item xs={12} md={5}>
//           <Box
//             sx={{
//               p: 3,
//               borderRadius: 2,
//               backgroundColor: "#f9f9f9",
//               boxShadow: 1,
//             }}
//           >
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Information
//             </Typography>
//             <Typography>
//               Operation Type: {singleProperty.typeOperation}
//             </Typography>
//             <Typography>Space: {singleProperty.space} m²</Typography>
//             <Typography>Price: {singleProperty.price}</Typography>
//             <Typography>Type: {singleProperty.type?.name}</Typography>
//             <Typography>
//               Published:{" "}
//               {new Date(singleProperty.publishDate).toLocaleDateString()}
//             </Typography>
//             <Typography sx={{ mt: 2 }}>
//               Description: {singleProperty.description || "N/A"}
//             </Typography>
//           </Box>
//         </Grid>

//         {/* LOCATION SECTION */}
//         <Grid item xs={12} md={6}>
//           <Box
//             sx={{
//               p: 3,
//               borderRadius: 2,
//               boxShadow: 1,
//               backgroundColor: "#fafafa",
//             }}
//           >
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Location
//             </Typography>
//             <Typography>
//               Governorate: {singleProperty.location?.governorate}
//             </Typography>
//             <Typography>
//               Province: {singleProperty.location?.province}
//             </Typography>
//             <Typography>City: {singleProperty.location?.city}</Typography>
//             <Typography>Street: {singleProperty.location?.street}</Typography>
//           </Box>
//         </Grid>

//         {/* LICENSE SECTION */}
//         {canViewLicenseDetails && (
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 p: 3,
//                 borderRadius: 2,
//                 boxShadow: 1,
//                 backgroundColor: "#fafafa",
//               }}
//             >
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 License Details
//               </Typography>
//               <Typography>
//                 Type: {singleProperty.licenseDetails?.license?.name || "N/A"}
//               </Typography>
//               <Typography>
//                 Number: {singleProperty.licenseDetails?.licenseNumber || "N/A"}
//               </Typography>
//               <Typography>
//                 Date:{" "}
//                 {singleProperty.licenseDetails?.date
//                   ? new Date(
//                       singleProperty.licenseDetails.date
//                     ).toLocaleDateString()
//                   : "N/A"}
//               </Typography>
//             </Box>
//           </Grid>
//         )}

//         {/* ATTRIBUTES SECTION */}
//         {singleProperty.propertyAttributes?.length > 0 && (
//           <Grid item xs={12}>
//             <Box sx={{ mt: 3 }}>
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 Property Attributes
//               </Typography>
//               <Grid container spacing={2}>
//                 {singleProperty.propertyAttributes.map((attr, idx) => (
//                   <Grid item xs={6} sm={4} md={3} key={idx}>
//                     <Typography>
//                       {attr.attribute?.name}: <strong>{attr.value}</strong>
//                     </Typography>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>
//           </Grid>
//         )}
//       </Grid>

//       {/* FULLSCREEN PHOTO VIEWER */}
//       {photos.length > 0 && (
//         <Dialog
//           open={isPhotoViewerOpen}
//           onClose={handleClosePhotoViewer}
//           fullScreen
//         >
//           <DialogTitle
//             sx={{
//               backgroundColor: "rgba(0,0,0,0.85)",
//               color: "#fff",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="h6">
//               Photo {currentPhotoIndex + 1} / {photos.length}
//             </Typography>
//             <IconButton onClick={handleClosePhotoViewer} sx={{ color: "#fff" }}>
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent
//             sx={{
//               backgroundColor: "rgba(0,0,0,0.85)",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               p: 0,
//             }}
//           >
//             <Box
//               component="img"
//               src={photos[currentPhotoIndex].url}
//               sx={{
//                 maxWidth: "90%",
//                 maxHeight: "90%",
//                 objectFit: "contain",
//                 cursor: "pointer",
//               }}
//               onClick={handleClosePhotoViewer}
//             />
//             {photos.length > 1 && (
//               <>
//                 <IconButton
//                   onClick={handlePrevPhoto}
//                   sx={{
//                     position: "absolute",
//                     left: 20,
//                     color: "white",
//                     fontSize: 50,
//                   }}
//                 >
//                   <ArrowBackIosIcon sx={{ fontSize: "inherit" }} />
//                 </IconButton>
//                 <IconButton
//                   onClick={handleNextPhoto}
//                   sx={{
//                     position: "absolute",
//                     right: 20,
//                     color: "white",
//                     fontSize: 50,
//                   }}
//                 >
//                   <ArrowForwardIosIcon sx={{ fontSize: "inherit" }} />
//                 </IconButton>
//               </>
//             )}
//           </DialogContent>
//         </Dialog>
//       )}

//       <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={() => navigate(`/reserve/${singleProperty.id}`)}
//           sx={{
//             px: 5,
//             py: 1.5,
//             borderRadius: 3,
//             fontWeight: 600,
//             fontSize: "1.1rem",
//             boxShadow: 2,
//             textTransform: "none",
//           }}
//         >
//           Reserve This Property
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default PropertyDetailsPage;






import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  Stack,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPropertyById,
  createFavoriteProperty,
  deleteFavoriteProperty,
  fetchFavoriteProperties,
} from "../redux/property/propertySlice";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    property: singleProperty,
    loading,
    error,
    favoriteProperties,
    favoriteActionLoading,
  } = useSelector((state) => state.property);
  const { role: userRole } = useSelector((state) => state.auth);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);

  const canViewSensitiveOwnerInfo = [
    "officeManager",
    "admin",
    "superAdmin",
  ].includes(userRole);
  const canViewLicenseDetails = canViewSensitiveOwnerInfo;
  
  // Check if the current property is in the user's favorites
  const isFavorite = favoriteProperties.some(
    (fav) => fav?.property?.id === singleProperty?.id
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(id));
      // Always fetch favorite properties to keep the favorite status up-to-date
      dispatch(fetchFavoriteProperties());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProperty) {
      setCurrentPhotoIndex(0);
    }
  }, [singleProperty]);

  const handleOpenPhotoViewer = (index) => {
    setCurrentPhotoIndex(index);
    setIsPhotoViewerOpen(true);
  };

  const handleClosePhotoViewer = () => setIsPhotoViewerOpen(false);

  const handlePrevPhoto = () =>
    setCurrentPhotoIndex(
      (prev) =>
        (prev - 1 + singleProperty.photos.length) % singleProperty.photos.length
    );

  const handleNextPhoto = () =>
    setCurrentPhotoIndex((prev) => (prev + 1) % singleProperty.photos.length);

  const handleToggleFavorite = () => {
    if (!singleProperty || favoriteActionLoading) return;

    if (isFavorite) {
      dispatch(deleteFavoriteProperty(singleProperty.id));
    } else {
      dispatch(createFavoriteProperty(singleProperty.id));
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading property details...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading property:{" "}
          {error.message || error.response?.data?.message || "Unknown error"}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  if (!singleProperty) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Property not found.</Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  const photos = singleProperty.photos || [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 4 }}
      >
        Back to Properties
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Property #{singleProperty.propertyNumber}
        </Typography>
      </Box>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        {/* PHOTO SECTION */}
        <Grid item xs={12} md={7}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Photos
          </Typography>

          {photos.length > 0 ? (
            <>
              <Box
                sx={{
                  position: "relative",
                  height: 450,
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 3,
                  mb: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={photos[currentPhotoIndex].url}
                  onClick={() => handleOpenPhotoViewer(currentPhotoIndex)}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      filter: "brightness(0.95)",
                    },
                  }}
                />
                {photos.length > 1 && (
                  <>
                    <IconButton
                      onClick={handlePrevPhoto}
                      sx={{
                        position: "absolute",
                        left: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                      }}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleNextPhoto}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </>
                )}
              </Box>

              <Stack direction="row" spacing={1} overflow="auto">
                {photos.map((photo, index) => (
                  <Box
                    key={photo.id}
                    onClick={() => setCurrentPhotoIndex(index)}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      overflow: "hidden",
                      border:
                        index === currentPhotoIndex
                          ? "2px solid #1976d2"
                          : "1px solid #ccc",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={photo.url}
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
                backgroundColor: "#f0f0f0",
                color: "#888",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              No Photos Available
            </Box>
          )}
        </Grid>

        {/* INFO SECTION */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Information
            </Typography>
            <Typography>
              Operation Type: {singleProperty.typeOperation}
            </Typography>
            <Typography>Space: {singleProperty.space} m²</Typography>
            <Typography>Price: {singleProperty.price}</Typography>
            <Typography>Type: {singleProperty.type?.name}</Typography>
            <Typography>
              Published:{" "}
              {new Date(singleProperty.publishDate).toLocaleDateString()}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Description: {singleProperty.description || "N/A"}
            </Typography>
          </Box>
        </Grid>

        {/* LOCATION SECTION */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: "#fafafa",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Location
            </Typography>
            <Typography>
              Governorate: {singleProperty.location?.governorate}
            </Typography>
            <Typography>
              Province: {singleProperty.location?.province}
            </Typography>
            <Typography>City: {singleProperty.location?.city}</Typography>
            <Typography>Street: {singleProperty.location?.street}</Typography>
          </Box>
        </Grid>

        {/* LICENSE SECTION */}
        {canViewLicenseDetails && (
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: "#fafafa",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                License Details
              </Typography>
              <Typography>
                Type: {singleProperty.licenseDetails?.license?.name || "N/A"}
              </Typography>
              <Typography>
                Number: {singleProperty.licenseDetails?.licenseNumber || "N/A"}
              </Typography>
              <Typography>
                Date:{" "}
                {singleProperty.licenseDetails?.date
                  ? new Date(
                      singleProperty.licenseDetails.date
                    ).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </Box>
          </Grid>
        )}

        {/* ATTRIBUTES SECTION */}
        {singleProperty.propertyAttributes?.length > 0 && (
          <Grid item xs={12}>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Property Attributes
              </Typography>
              <Grid container spacing={2}>
                {singleProperty.propertyAttributes.map((attr, idx) => (
                  <Grid item xs={6} sm={4} md={3} key={idx}>
                    <Typography>
                      {attr.attribute?.name}: <strong>{attr.value}</strong>
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* FULLSCREEN PHOTO VIEWER */}
      {photos.length > 0 && (
        <Dialog
          open={isPhotoViewerOpen}
          onClose={handleClosePhotoViewer}
          fullScreen
        >
          <DialogTitle
            sx={{
              backgroundColor: "rgba(0,0,0,0.85)",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">
              Photo {currentPhotoIndex + 1} / {photos.length}
            </Typography>
            <IconButton onClick={handleClosePhotoViewer} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              backgroundColor: "rgba(0,0,0,0.85)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 0,
            }}
          >
            <Box
              component="img"
              src={photos[currentPhotoIndex].url}
              sx={{
                maxWidth: "90%",
                maxHeight: "90%",
                objectFit: "contain",
                cursor: "pointer",
              }}
              onClick={handleClosePhotoViewer}
            />
            {photos.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevPhoto}
                  sx={{
                    position: "absolute",
                    left: 20,
                    color: "white",
                    fontSize: 50,
                  }}
                >
                  <ArrowBackIosIcon sx={{ fontSize: "inherit" }} />
                </IconButton>
                <IconButton
                  onClick={handleNextPhoto}
                  sx={{
                    position: "absolute",
                    right: 20,
                    color: "white",
                    fontSize: 50,
                  }}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: "inherit" }} />
                </IconButton>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Buttons at the bottom */}
      <Box sx={{ mt: 6, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate(`/reserve/${singleProperty.id}`)}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 600,
            fontSize: "1.1rem",
            boxShadow: 2,
            textTransform: "none",
          }}
        >
          Reserve This Property
        </Button>
        <Button
          variant="contained"
          color={isFavorite ? "error" : "success"}
          size="large"
          onClick={handleToggleFavorite}
          disabled={favoriteActionLoading}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 600,
            fontSize: "1.1rem",
            boxShadow: 2,
            textTransform: "none",
          }}
        >
          {favoriteActionLoading
            ? "Updating..."
            : isFavorite
            ? "Remove from Favorite"
            : "Add to Favorite"}
        </Button>
      </Box>
    </Container>
  );
};

export default PropertyDetailsPage;