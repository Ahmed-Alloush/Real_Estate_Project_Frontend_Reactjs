// // import React, { useState } from "react";
// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   IconButton,
// //   Typography,
// //   Grid,
// //   Box,
// //   Divider,
// //   Card,
// //   CardMedia,
// // } from "@mui/material";
// // import {
// //   Close as CloseIcon,
// //   ArrowBackIos as ArrowBackIosIcon,
// //   ArrowForwardIos as ArrowForwardIosIcon,
// // } from "@mui/icons-material";

// // const PropertyDetailsModal = ({ open, onClose, property }) => {
// //   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
// //   const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);

// //   if (!property) {
// //     return null;
// //   }

// //   const photos = property.photos || [];
// //   const hasPhotos = photos.length > 0;

// //   const handleNextPhoto = () => {
// //     setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
// //   };

// //   const handlePrevPhoto = () => {
// //     setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
// //   };

// //   const handleOpenPhotoViewer = (index) => {
// //     setCurrentPhotoIndex(index);
// //     setIsPhotoViewerOpen(true);
// //   };

// //   const handleClosePhotoViewer = () => {
// //     setIsPhotoViewerOpen(false);
// //   };

// //   return (
// //     <>
// //       {/* Main Property Details Dialog */}
// //       <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
// //         <DialogTitle>
// //           Property Details: {property.propertyNumber}
// //           <IconButton
// //             aria-label="close"
// //             onClick={onClose}
// //             sx={{
// //               position: "absolute",
// //               right: 8,
// //               top: 8,
// //               color: (theme) => theme.palette.grey[500],
// //             }}
// //           >
// //             <CloseIcon />
// //           </IconButton>
// //         </DialogTitle>
// //         <DialogContent dividers>
// //           <Grid container spacing={3}>
// //             {/* Property Photos Section */}
// //             <Grid item xs={12} md={6}>
// //               <Typography variant="h6" gutterBottom>
// //                 Property Photos
// //               </Typography>
// //               {hasPhotos ? (
// //                 <Box
// //                   sx={{
// //                     position: "relative",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     height: 300,
// //                     backgroundColor: "#f0f0f0",
// //                     borderRadius: 1,
// //                     overflow: "hidden",
// //                   }}
// //                 >
// //                   <CardMedia
// //                     component="img"
// //                     image={photos[currentPhotoIndex].url}
// //                     alt={`Property Photo ${currentPhotoIndex + 1}`}
// //                     sx={{
// //                       maxHeight: "100%",
// //                       maxWidth: "100%",
// //                       objectFit: "contain",
// //                       cursor: "pointer",
// //                     }}
// //                     onClick={() => handleOpenPhotoViewer(currentPhotoIndex)}
// //                   />
// //                   {photos.length > 1 && (
// //                     <>
// //                       <IconButton
// //                         sx={{ position: "absolute", left: 8, color: "white", backgroundColor: "rgba(0,0,0,0.5)", '&:hover': {backgroundColor: "rgba(0,0,0,0.7)"} }}
// //                         onClick={handlePrevPhoto}
// //                       >
// //                         <ArrowBackIosIcon />
// //                       </IconButton>
// //                       <IconButton
// //                         sx={{ position: "absolute", right: 8, color: "white", backgroundColor: "rgba(0,0,0,0.5)", '&:hover': {backgroundColor: "rgba(0,0,0,0.7)"} }}
// //                         onClick={handleNextPhoto}
// //                       >
// //                         <ArrowForwardIosIcon />
// //                       </IconButton>
// //                     </>
// //                   )}
// //                   <Typography
// //                     variant="caption"
// //                     sx={{
// //                       position: "absolute",
// //                       bottom: 8,
// //                       right: 8,
// //                       color: "white",
// //                       backgroundColor: "rgba(0,0,0,0.6)",
// //                       px: 1,
// //                       borderRadius: 1,
// //                     }}
// //                   >
// //                     {currentPhotoIndex + 1} / {photos.length}
// //                   </Typography>
// //                 </Box>
// //               ) : (
// //                 <Box
// //                   sx={{
// //                     height: 200,
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     backgroundColor: "#f0f0f0",
// //                     color: "#9e9e9e",
// //                     borderRadius: 1,
// //                   }}
// //                 >
// //                   No Photos Available
// //                 </Box>
// //               )}
// //             </Grid>

// //             {/* Property Information */}
// //             <Grid item xs={12} md={6}>
// //               <Typography variant="h6" gutterBottom>
// //                 Property Information
// //               </Typography>
// //               <Typography variant="body1">
// //                 **Property Number:** {property.propertyNumber}
// //               </Typography>
// //               <Typography variant="body1">
// //                 **Operation Type:** {property.typeOperation}
// //               </Typography>
// //               <Typography variant="body1">
// //                 **Space:** {property.space} sqm
// //               </Typography>
// //               <Typography variant="body1">
// //                 **Price:** {property.price}
// //               </Typography>
// //               <Typography variant="body1">
// //                 **Property Type:** {property.type?.name}
// //               </Typography>
// //               <Typography variant="body1">
// //                 **Publish Date:** {new Date(property.publishDate).toLocaleDateString()}
// //               </Typography>
// //               <Typography variant="body1" sx={{ color: property.status === 'accepted' ? 'success.main' : property.status === 'pending' ? 'warning.main' : 'error.main', fontWeight: 'bold' }}>
// //                 **Status:** {property.status ? property.status.toUpperCase() : "N/A"}
// //               </Typography>
// //               <Typography variant="body1">
// //                 **Description:** {property.description || "N/A"}
// //               </Typography>
// //             </Grid>

// //             <Grid item xs={12}>
// //               <Divider sx={{ my: 2 }} />
// //             </Grid>

// //             {/* Location and License Details */}
// //             <Grid item xs={12} md={6}>
// //               <Typography variant="h6" gutterBottom>
// //                 Location Details
// //               </Typography>
// //               <Typography variant="body1">
// //                 **Governorate:** {property.location?.governorate}
// //               </Typography>
// //               <Typography variant="body1">
// //                 **Province:** {property.location?.province}
// //               </Typography>
// //               <Typography variant="body1">
// //                 **City:** {property.location?.city}
// //               </Typography>
// //               <Typography variant="body1">
// //                 **Street:** {property.location?.street}
// //               </Typography>
// //             </Grid>

// //             <Grid item xs={12} md={6}>
// //               <Typography variant="h6" gutterBottom>
// //                 License Details
// //               </Typography>
// //               <Typography variant="body1">
// //                 **License Type:** {property.licenseDetails?.license?.name || "N/A"}
// //               </Typography>
// //               <Typography variant="body1">
// //                 **License Number:** {property.licenseDetails?.licenseNumber || "N/A"}
// //               </Typography>
// //               <Typography variant="body1">
// //                 **License Date:** {property.licenseDetails?.date ? new Date(property.licenseDetails.date).toLocaleDateString() : "N/A"}
// //               </Typography>
// //             </Grid>

// //             {/* Property Attributes */}
// //             {property.propertyAttributes && property.propertyAttributes.length > 0 && (
// //               <Grid item xs={12}>
// //                 <Divider sx={{ my: 2 }} />
// //                 <Typography variant="h6" gutterBottom>
// //                   Property Attributes
// //                 </Typography>
// //                 <Grid container spacing={2}>
// //                   {property.propertyAttributes.map((attr, index) => (
// //                     <Grid item xs={6} sm={4} md={3} key={index}>
// //                       <Typography variant="body1">
// //                         **{attr.attribute?.name}:** {attr.value}
// //                       </Typography>
// //                     </Grid>
// //                   ))}
// //                 </Grid>
// //               </Grid>
// //             )}
// //           </Grid>
// //         </DialogContent>
// //       </Dialog>

// //       {/* Full-screen Photo Viewer Dialog */}
// //       {hasPhotos && (
// //         <Dialog
// //           open={isPhotoViewerOpen}
// //           onClose={handleClosePhotoViewer}
// //           maxWidth="xl"
// //           fullScreen
// //         >
// //           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.85)', color: 'white' }}>
// //             Property Photos ({currentPhotoIndex + 1} / {photos.length})
// //             <IconButton
// //               aria-label="close"
// //               onClick={handleClosePhotoViewer}
// //               sx={{ color: 'white' }}
// //             >
// //               <CloseIcon />
// //             </IconButton>
// //           </DialogTitle>
// //           <DialogContent
// //             sx={{
// //               display: "flex",
// //               justifyContent: "center",
// //               alignItems: "center",
// //               backgroundColor: "rgba(0,0,0,0.85)",
// //               p: 0,
// //               position: "relative",
// //             }}
// //           >
// //             <Box
// //               component="img"
// //               src={photos[currentPhotoIndex].url}
// //               alt={`Full-screen Property Photo ${currentPhotoIndex + 1}`}
// //               sx={{
// //                 maxWidth: "100%",
// //                 maxHeight: "100%",
// //                 objectFit: "contain",
// //                 cursor: 'zoom-out',
// //               }}
// //               onClick={handleClosePhotoViewer} // Click anywhere on image to close
// //             />
// //             {photos.length > 1 && (
// //               <>
// //                 <IconButton
// //                   sx={{ position: "absolute", left: 20, color: "white", fontSize: 50 }}
// //                   onClick={handlePrevPhoto}
// //                 >
// //                   <ArrowBackIosIcon sx={{ fontSize: 'inherit' }} />
// //                 </IconButton>
// //                 <IconButton
// //                   sx={{ position: "absolute", right: 20, color: "white", fontSize: 50 }}
// //                   onClick={handleNextPhoto}
// //                 >
// //                   <ArrowForwardIosIcon sx={{ fontSize: 'inherit' }} />
// //                 </IconButton>
// //               </>
// //             )}
// //           </DialogContent>
// //         </Dialog>
// //       )}
// //     </>
// //   );
// // };

// // export default PropertyDetailsModal;





// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Typography,
//   Grid,
//   Box,
//   Divider,
//   Avatar, // For owner's profile photo
//   CardMedia, // Use CardMedia for image display
//   Stack, // For horizontal arrangement of thumbnails
// } from "@mui/material";
// import {
//   Close as CloseIcon,
//   ArrowBackIos as ArrowBackIosIcon,
//   ArrowForwardIos as ArrowForwardIosIcon,
// } from "@mui/icons-material";

// const PropertyDetailsModal = ({ open, onClose, property }) => {
//   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
//   const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);

//   // Reset photo index when dialog opens for a new property
//   React.useEffect(() => {
//     if (open && property) {
//       setCurrentPhotoIndex(0);
//     }
//   }, [open, property]);

//   if (!property) {
//     return null;
//   }

//   const photos = property.photos || [];
//   const hasPhotos = photos.length > 0;
//   const owner = property.owner; // Direct access to owner object

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

//   return (
//     <>
//       {/* Main Property Details Dialog */}
//       <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth> {/* Increased maxWidth to "xl" */}
//         <DialogTitle>
//           Property Details: {property.propertyNumber}
//           <IconButton
//             aria-label="close"
//             onClick={onClose}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={3}>
//             {/* Property Photos Section - Increased Size */}
//             <Grid item xs={12} md={7}> {/* Increased from md={6} to md={7} for more space */}
//               <Typography variant="h6" gutterBottom>
//                 Property Photos
//               </Typography>
//               {hasPhotos ? (
//                 <>
//                   <Box
//                     sx={{
//                       position: "relative",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       height: 450, // Increased height for main photo
//                       backgroundColor: "#f0f0f0",
//                       borderRadius: 1,
//                       overflow: "hidden",
//                       mb: 2,
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       image={photos[currentPhotoIndex].url}
//                       alt={`Property Photo ${currentPhotoIndex + 1}`}
//                       sx={{
//                         maxHeight: "100%",
//                         maxWidth: "100%",
//                         objectFit: "contain",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => handleOpenPhotoViewer(currentPhotoIndex)}
//                     />
//                     {photos.length > 1 && (
//                       <>
//                         <IconButton
//                           sx={{ position: "absolute", left: 8, color: "white", backgroundColor: "rgba(0,0,0,0.5)", '&:hover': {backgroundColor: "rgba(0,0,0,0.7)"} }}
//                           onClick={handlePrevPhoto}
//                         >
//                           <ArrowBackIosIcon />
//                         </IconButton>
//                         <IconButton
//                           sx={{ position: "absolute", right: 8, color: "white", backgroundColor: "rgba(0,0,0,0.5)", '&:hover': {backgroundColor: "rgba(0,0,0,0.7)"} }}
//                           onClick={handleNextPhoto}
//                         >
//                           <ArrowForwardIosIcon />
//                         </IconButton>
//                       </>
//                     )}
//                     <Typography
//                       variant="caption"
//                       sx={{
//                         position: "absolute",
//                         bottom: 8,
//                         right: 8,
//                         color: "white",
//                         backgroundColor: "rgba(0,0,0,0.6)",
//                         px: 1,
//                         borderRadius: 1,
//                       }}
//                     >
//                       {currentPhotoIndex + 1} / {photos.length}
//                     </Typography>
//                   </Box>
//                   {/* Thumbnail Row */}
//                   <Stack direction="row" spacing={1} overflow="auto" pb={1}>
//                     {photos.map((photo, index) => (
//                       <Box
//                         key={photo.id}
//                         sx={{
//                           width: 80,
//                           height: 80,
//                           flexShrink: 0, // Prevent shrinking
//                           borderRadius: 1,
//                           overflow: "hidden",
//                           border: index === currentPhotoIndex ? "2px solid #1976d2" : "1px solid #ddd",
//                           cursor: "pointer",
//                           transition: "border-color 0.2s",
//                         }}
//                         onClick={() => setCurrentPhotoIndex(index)}
//                       >
//                         <CardMedia
//                           component="img"
//                           image={photo.url}
//                           alt={`Thumbnail ${index + 1}`}
//                           sx={{ width: "100%", height: "100%", objectFit: "cover" }}
//                         />
//                       </Box>
//                     ))}
//                   </Stack>
//                 </>
//               ) : (
//                 <Box
//                   sx={{
//                     height: 200,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backgroundColor: "#f0f0f0",
//                     color: "#9e9e9e",
//                     borderRadius: 1,
//                   }}
//                 >
//                   No Photos Available
//                 </Box>
//               )}
//             </Grid>

//             {/* Property Information */}
//             <Grid item xs={12} md={5}> {/* Adjusted from md={6} to md={5} */}
//               <Typography variant="h6" gutterBottom>
//                 Property Information
//               </Typography>
//               <Typography variant="body1">
//                 **Property Number:** {property.propertyNumber}
//               </Typography>
//               <Typography variant="body1">
//                 **Operation Type:** {property.typeOperation}
//               </Typography>
//               <Typography variant="body1">
//                 **Space:** {property.space} sqm
//               </Typography>
//               <Typography variant="body1">
//                 **Price:** {property.price}
//               </Typography>
//               <Typography variant="body1">
//                 **Property Type:** {property.type?.name}
//               </Typography>
//               <Typography variant="body1">
//                 **Publish Date:** {new Date(property.publishDate).toLocaleDateString()}
//               </Typography>
//               <Typography variant="body1" sx={{ color: property.status === 'accepted' ? 'success.main' : property.status === 'pending' ? 'warning.main' : 'error.main', fontWeight: 'bold' }}>
//                 **Status:** {property.status ? property.status.toUpperCase() : "N/A"}
//               </Typography>
//               <Typography variant="body1">
//                 **Description:** {property.description || "N/A"}
//               </Typography>

//               <Divider sx={{ my: 2 }} />

//               {/* Owner Information */}
//               <Typography variant="h6" gutterBottom>
//                 Owner Information
//               </Typography>
//               {owner ? (
//                 <Box display="flex" alignItems="center" mb={1}>
//                   {owner.profile_photo?.url ? (
//                     <Avatar src={owner.profile_photo.url} alt={`${owner.first_name} ${owner.last_name}`} sx={{ width: 60, height: 60, mr: 2 }} />
//                   ) : (
//                     <Avatar sx={{ width: 60, height: 60, mr: 2 }}>{owner.first_name ? owner.first_name[0] : '?'}</Avatar>
//                   )}
//                   <Box>
//                     <Typography variant="body1">
//                       **Full Name:** {owner.first_name} {owner.last_name}
//                     </Typography>
//                     <Typography variant="body1">
//                       **National Number:** {owner.national_number || "N/A"}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       **Email:** {owner.email}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       **Phone:** {owner.phone}
//                     </Typography>
//                   </Box>
//                 </Box>
//               ) : (
//                 <Typography variant="body1" color="text.secondary">
//                   Owner information not available.
//                 </Typography>
//               )}
//             </Grid>

//             <Grid item xs={12}>
//               <Divider sx={{ my: 2 }} />
//             </Grid>

//             {/* Location and License Details */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" gutterBottom>
//                 Location Details
//               </Typography>
//               <Typography variant="body1">
//                 **Governorate:** {property.location?.governorate}
//               </Typography>
//               <Typography variant="body1">
//                 **Province:** {property.location?.province}
//               </Typography>
//               <Typography variant="body1">
//                 **City:** {property.location?.city}
//               </Typography>
//               <Typography variant="body1">
//                 **Street:** {property.location?.street}
//               </Typography>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" gutterBottom>
//                 License Details
//               </Typography>
//               <Typography variant="body1">
//                 **License Type:** {property.licenseDetails?.license?.name || "N/A"}
//               </Typography>
//               <Typography variant="body1">
//                 **License Number:** {property.licenseDetails?.licenseNumber || "N/A"}
//               </Typography>
//               <Typography variant="body1">
//                 **License Date:** {property.licenseDetails?.date ? new Date(property.licenseDetails.date).toLocaleDateString() : "N/A"}
//               </Typography>
//             </Grid>

//             {/* Property Attributes */}
//             {property.propertyAttributes && property.propertyAttributes.length > 0 && (
//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Property Attributes
//                 </Typography>
//                 <Grid container spacing={2}>
//                   {property.propertyAttributes.map((attr, index) => (
//                     <Grid item xs={6} sm={4} md={3} key={index}>
//                       <Typography variant="body1">
//                         **{attr.attribute?.name}:** {attr.value}
//                       </Typography>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Grid>
//             )}
//           </Grid>
//         </DialogContent>
//       </Dialog>

//       {/* Full-screen Photo Viewer Dialog */}
//       {hasPhotos && (
//         <Dialog
//           open={isPhotoViewerOpen}
//           onClose={handleClosePhotoViewer}
//           maxWidth="xl"
//           fullScreen
//           PaperProps={{ sx: { backgroundColor: 'transparent' } }} // Make paper transparent for full effect
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
//             zIndex: 1, // Ensure it's above the image
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
//               backgroundColor: "rgba(0,0,0,0.85)", // Dark background
//               p: 0,
//               position: "relative",
//             }}
//           >
//             <Box
//               component="img"
//               src={photos[currentPhotoIndex].url}
//               alt={`Full-screen Property Photo ${currentPhotoIndex + 1}`}
//               sx={{
//                 maxWidth: "95%", // Slightly less than 100% to leave some padding
//                 maxHeight: "95%",
//                 objectFit: "contain",
//                 cursor: 'pointer', // Indicates it's clickable to close
//               }}
//               onClick={handleClosePhotoViewer} // Click anywhere on image to close
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
//                   <ArrowForwardIioIcon sx={{ fontSize: 'inherit' }} />
//                 </IconButton>
//               </>
//             )}
//           </DialogContent>
//         </Dialog>
//       )}
//     </>
//   );
// };

// export default PropertyDetailsModal;\




import React, { useState, useEffect } from "react"; // Added useEffect for state reset
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Box,
  Divider,
  Avatar, // For owner's profile photo
  CardMedia, // Use CardMedia for image display
  Stack, // For horizontal arrangement of thumbnails
} from "@mui/material";
import {
  Close as CloseIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon, // CORRECTED: Changed from ArrowForwardIioIcon to ArrowForwardIosIcon
} from "@mui/icons-material";

const PropertyDetailsModal = ({ open, onClose, property }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);

  // Reset photo index when dialog opens for a new property
  useEffect(() => { // Using useEffect here
    if (open && property) {
      setCurrentPhotoIndex(0);
    }
  }, [open, property]); // Dependency array: run when open or property changes

  if (!property) {
    return null;
  }

  const photos = property.photos || [];
  const hasPhotos = photos.length > 0;
  const owner = property.owner; // Direct access to owner object

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

  return (
    <>
      {/* Main Property Details Dialog */}
      <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
        <DialogTitle>
          Property Details: {property.propertyNumber}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Property Photos Section - Increased Size */}
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
                      height: 450, // Increased height for main photo
                      backgroundColor: "#f0f0f0",
                      borderRadius: 1,
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
                          <ArrowForwardIosIcon /> {/* CORRECTED USAGE */}
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
                          flexShrink: 0, // Prevent shrinking
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
                **Property Number:** {property.propertyNumber}
              </Typography>
              <Typography variant="body1">
                **Operation Type:** {property.typeOperation}
              </Typography>
              <Typography variant="body1">
                **Space:** {property.space} sqm
              </Typography>
              <Typography variant="body1">
                **Price:** {property.price}
              </Typography>
              <Typography variant="body1">
                **Property Type:** {property.type?.name}
              </Typography>
              <Typography variant="body1">
                **Publish Date:** {new Date(property.publishDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ color: property.status === 'accepted' ? 'success.main' : property.status === 'pending' ? 'warning.main' : 'error.main', fontWeight: 'bold' }}>
                **Status:** {property.status ? property.status.toUpperCase() : "N/A"}
              </Typography>
              <Typography variant="body1">
                **Description:** {property.description || "N/A"}
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
                    <Typography variant="body1">
                      **National Number:** {owner.national_number || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      **Email:** {owner.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      **Phone:** {owner.phone}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Owner information not available.
                </Typography>
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
                **Governorate:** {property.location?.governorate}
              </Typography>
              <Typography variant="body1">
                **Province:** {property.location?.province}
              </Typography>
              <Typography variant="body1">
                **City:** {property.location?.city}
              </Typography>
              <Typography variant="body1">
                **Street:** {property.location?.street}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                License Details
              </Typography>
              <Typography variant="body1">
                **License Type:** {property.licenseDetails?.license?.name || "N/A"}
              </Typography>
              <Typography variant="body1">
                **License Number:** {property.licenseDetails?.licenseNumber || "N/A"}
              </Typography>
              <Typography variant="body1">
                **License Date:** {property.licenseDetails?.date ? new Date(property.licenseDetails.date).toLocaleDateString() : "N/A"}
              </Typography>
            </Grid>

            {/* Property Attributes */}
            {property.propertyAttributes && property.propertyAttributes.length > 0 && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Property Attributes
                </Typography>
                <Grid container spacing={2}>
                  {property.propertyAttributes.map((attr, index) => (
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
        </DialogContent>
      </Dialog>

      {/* Full-screen Photo Viewer Dialog */}
      {hasPhotos && (
        <Dialog
          open={isPhotoViewerOpen}
          onClose={handleClosePhotoViewer}
          maxWidth="xl"
          fullScreen
          PaperProps={{ sx: { backgroundColor: 'transparent' } }} // Make paper transparent for full effect
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
            zIndex: 1, // Ensure it's above the image
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
              backgroundColor: "rgba(0,0,0,0.85)", // Dark background
              p: 0,
              position: "relative",
            }}
          >
            <Box
              component="img"
              src={photos[currentPhotoIndex].url}
              alt={`Full-screen Property Photo ${currentPhotoIndex + 1}`}
              sx={{
                maxWidth: "95%", // Slightly less than 100% to leave some padding
                maxHeight: "95%",
                objectFit: "contain",
                cursor: 'pointer', // Indicates it's clickable to close
              }}
              onClick={handleClosePhotoViewer} // Click anywhere on image to close
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
                  <ArrowForwardIosIcon sx={{ fontSize: 'inherit' }} /> {/* CORRECTED USAGE */}
                </IconButton>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PropertyDetailsModal;