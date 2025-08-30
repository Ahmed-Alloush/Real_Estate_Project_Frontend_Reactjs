
// import React, { useState, useEffect } from "react"; // Added useEffect for state reset
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
//   ArrowForwardIos as ArrowForwardIosIcon, // CORRECTED: Changed from ArrowForwardIioIcon to ArrowForwardIosIcon
// } from "@mui/icons-material";

// const PropertyDetailsModal = ({ open, onClose, property }) => {
//   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
//   const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);

//   // Reset photo index when dialog opens for a new property
//   useEffect(() => {
//     // Using useEffect here
//     if (open && property) {
//       setCurrentPhotoIndex(0);
//     }
//   }, [open, property]); // Dependency array: run when open or property changes

//   if (!property) {
//     return null;
//   }

//   const photos = property.photos || [];
//   const hasPhotos = photos.length > 0;
//   // const owner = property.owner; // Direct access to owner object

//   const handleNextPhoto = () => {
//     setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
//   };

//   const handlePrevPhoto = () => {
//     setCurrentPhotoIndex(
//       (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
//     );
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
//       <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
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
//             <Grid item xs={12} md={7}>
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
//                           sx={{
//                             position: "absolute",
//                             left: 8,
//                             color: "white",
//                             backgroundColor: "rgba(0,0,0,0.5)",
//                             "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
//                           }}
//                           onClick={handlePrevPhoto}
//                         >
//                           <ArrowBackIosIcon />
//                         </IconButton>
//                         <IconButton
//                           sx={{
//                             position: "absolute",
//                             right: 8,
//                             color: "white",
//                             backgroundColor: "rgba(0,0,0,0.5)",
//                             "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
//                           }}
//                           onClick={handleNextPhoto}
//                         >
//                           <ArrowForwardIosIcon /> {/* CORRECTED USAGE */}
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
//                           border:
//                             index === currentPhotoIndex
//                               ? "2px solid #1976d2"
//                               : "1px solid #ddd",
//                           cursor: "pointer",
//                           transition: "border-color 0.2s",
//                         }}
//                         onClick={() => setCurrentPhotoIndex(index)}
//                       >
//                         <CardMedia
//                           component="img"
//                           image={photo.url}
//                           alt={`Thumbnail ${index + 1}`}
//                           sx={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                           }}
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
//             <Grid item xs={12} md={5}>
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
//                 **Publish Date:**{" "}
//                 {new Date(property.publishDate).toLocaleDateString()}
//               </Typography>
//               <Typography
//                 variant="body1"
//                 sx={{
//                   color:
//                     property.status === "accepted"
//                       ? "success.main"
//                       : property.status === "pending"
//                       ? "warning.main"
//                       : "error.main",
//                   fontWeight: "bold",
//                 }}
//               >
//                 **Status:**{" "}
//                 {property.status ? property.status.toUpperCase() : "N/A"}
//               </Typography>
//               <Typography variant="body1">
//                 **Description:** {property.description || "N/A"}
//               </Typography>

//               <Typography variant="body1">
//                 **Owner:** {property.owner}
//               </Typography>

//               <Divider sx={{ my: 2 }} />


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
//                 **License Type:**{" "}
//                 {property.licenseDetails?.license?.name || "N/A"}
//               </Typography>
//               <Typography variant="body1">
//                 **License Number:**{" "}
//                 {property.licenseDetails?.licenseNumber || "N/A"}
//               </Typography>
//               <Typography variant="body1">
//                 **License Date:**{" "}
//                 {property.licenseDetails?.date
//                   ? new Date(property.licenseDetails.date).toLocaleDateString()
//                   : "N/A"}
//               </Typography>
//             </Grid>

//             {/* Property Attributes */}
//             {property.propertyAttributes &&
//               property.propertyAttributes.length > 0 && (
//                 <Grid item xs={12}>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant="h6" gutterBottom>
//                     Property Attributes
//                   </Typography>
//                   <Grid container spacing={2}>
//                     {property.propertyAttributes.map((attr, index) => (
//                       <Grid item xs={6} sm={4} md={3} key={index}>
//                         <Typography variant="body1">
//                           **{attr.attribute?.name}:** {attr.value}
//                         </Typography>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </Grid>
//               )}
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
//           PaperProps={{ sx: { backgroundColor: "transparent" } }} // Make paper transparent for full effect
//         >
//           <DialogTitle
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               backgroundColor: "rgba(0,0,0,0.85)",
//               color: "white",
//               position: "absolute",
//               width: "100%",
//               top: 0,
//               zIndex: 1, // Ensure it's above the image
//               px: 3,
//               py: 1,
//             }}
//           >
//             <Typography variant="h6" color="inherit">
//               Property Photos ({currentPhotoIndex + 1} / {photos.length})
//             </Typography>
//             <IconButton
//               aria-label="close"
//               onClick={handleClosePhotoViewer}
//               sx={{ color: "white" }}
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
//                 cursor: "pointer", // Indicates it's clickable to close
//               }}
//               onClick={handleClosePhotoViewer} // Click anywhere on image to close
//             />
//             {photos.length > 1 && (
//               <>
//                 <IconButton
//                   sx={{
//                     position: "absolute",
//                     left: 20,
//                     color: "white",
//                     fontSize: 50,
//                     zIndex: 1,
//                   }}
//                   onClick={handlePrevPhoto}
//                 >
//                   <ArrowBackIosIcon sx={{ fontSize: "inherit" }} />
//                 </IconButton>
//                 <IconButton
//                   sx={{
//                     position: "absolute",
//                     right: 20,
//                     color: "white",
//                     fontSize: 50,
//                     zIndex: 1,
//                   }}
//                   onClick={handleNextPhoto}
//                 >
//                   <ArrowForwardIosIcon sx={{ fontSize: "inherit" }} />{" "}
//                   {/* CORRECTED USAGE */}
//                 </IconButton>
//               </>
//             )}
//           </DialogContent>
//         </Dialog>
//       )}
//     </>
//   );
// };

// export default PropertyDetailsModal;






import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Box,
  Divider,
  Avatar,
  CardMedia,
  Stack,
} from "@mui/material";
import {
  Close as CloseIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const PropertyDetailsModal = ({ open, onClose, property }) => {
  const { t } = useTranslation();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);

  useEffect(() => {
    if (open && property) {
      setCurrentPhotoIndex(0);
    }
  }, [open, property]);

  if (!property) {
    return null;
  }

  const getStatusTranslation = (status) => {
    const statusKey = status?.toLowerCase();
    return statusKey ? t(`propertyDetailsModal.statusEnum.${statusKey}`) : t("propertyDetailsModal.na");
  };

  const photos = property.photos || [];
  const hasPhotos = photos.length > 0;

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
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
          {t("propertyDetailsModal.title", {
            propertyNumber: property.propertyNumber,
          })}
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
                {t("propertyDetailsModal.photosSection")}
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
                      borderRadius: 1,
                      overflow: "hidden",
                      mb: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={photos[currentPhotoIndex].url}
                      alt={t("propertyDetailsModal.altText.mainPhoto", {
                        number: currentPhotoIndex + 1,
                      })}
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
                          sx={{
                            position: "absolute",
                            left: 8,
                            color: "white",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                          }}
                          onClick={handlePrevPhoto}
                        >
                          <ArrowBackIosIcon />
                        </IconButton>
                        <IconButton
                          sx={{
                            position: "absolute",
                            right: 8,
                            color: "white",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                          }}
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
                          border:
                            index === currentPhotoIndex
                              ? "2px solid #1976d2"
                              : "1px solid #ddd",
                          cursor: "pointer",
                          transition: "border-color 0.2s",
                        }}
                        onClick={() => setCurrentPhotoIndex(index)}
                      >
                        <CardMedia
                          component="img"
                          image={photo.url}
                          alt={t("propertyDetailsModal.altText.thumbnail", {
                            number: index + 1,
                          })}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
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
                  {t("propertyDetailsModal.noPhotos")}
                </Box>
              )}
            </Grid>

            {/* Property Information */}
            <Grid item xs={12} md={5}>
              <Typography variant="h6" gutterBottom>
                {t("propertyDetailsModal.informationSection")}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.propertyNumber")}**{" "}
                {property.propertyNumber}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.operationType")}**{" "}
                {property.typeOperation}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.space")}** {property.space} sqm
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.price")}** {property.price}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.propertyType")}**{" "}
                {property.type?.name || t("propertyDetailsModal.na")}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.publishDate")}**{" "}
                {new Date(property.publishDate).toLocaleDateString()}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color:
                    property.status === "accepted"
                      ? "success.main"
                      : property.status === "pending"
                      ? "warning.main"
                      : "error.main",
                  fontWeight: "bold",
                }}
              >
                **{t("propertyDetailsModal.status")}**{" "}
                {getStatusTranslation(property.status)}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.description")}**{" "}
                {property.description || t("propertyDetailsModal.na")}
              </Typography>

              <Typography variant="body1">
                **{t("propertyDetailsModal.owner")}** {property.owner}
              </Typography>

              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Location and License Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {t("propertyDetailsModal.locationSection")}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.governorate")}**{" "}
                {property.location?.governorate || t("propertyDetailsModal.na")}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.province")}**{" "}
                {property.location?.province || t("propertyDetailsModal.na")}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.city")}**{" "}
                {property.location?.city || t("propertyDetailsModal.na")}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.street")}**{" "}
                {property.location?.street || t("propertyDetailsModal.na")}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {t("propertyDetailsModal.licenseSection")}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.licenseType")}**{" "}
                {property.licenseDetails?.license?.name || t("propertyDetailsModal.na")}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.licenseNumber")}**{" "}
                {property.licenseDetails?.licenseNumber || t("propertyDetailsModal.na")}
              </Typography>
              <Typography variant="body1">
                **{t("propertyDetailsModal.licenseDate")}**{" "}
                {property.licenseDetails?.date
                  ? new Date(property.licenseDetails.date).toLocaleDateString()
                  : t("propertyDetailsModal.na")}
              </Typography>
            </Grid>

            {/* Property Attributes */}
            {property.propertyAttributes &&
              property.propertyAttributes.length > 0 && (
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {t("propertyDetailsModal.attributesSection")}
                  </Typography>
                  <Grid container spacing={2}>
                    {property.propertyAttributes.map((attr, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Typography variant="body1">
                          **{attr.attribute?.name || t("propertyDetailsModal.na")}:** {attr.value || t("propertyDetailsModal.na")}
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
          PaperProps={{ sx: { backgroundColor: "transparent" } }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.85)",
              color: "white",
              position: "absolute",
              width: "100%",
              top: 0,
              zIndex: 1,
              px: 3,
              py: 1,
            }}
          >
            <Typography variant="h6" color="inherit">
              {t("propertyDetailsModal.photoCounter", {
                current: currentPhotoIndex + 1,
                total: photos.length,
              })}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleClosePhotoViewer}
              sx={{ color: "white" }}
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
              alt={t("propertyDetailsModal.altText.viewerTitle", {
                number: currentPhotoIndex + 1,
              })}
              sx={{
                maxWidth: "95%",
                maxHeight: "95%",
                objectFit: "contain",
                cursor: "pointer",
              }}
              onClick={handleClosePhotoViewer}
            />
            {photos.length > 1 && (
              <>
                <IconButton
                  sx={{
                    position: "absolute",
                    left: 20,
                    color: "white",
                    fontSize: 50,
                    zIndex: 1,
                  }}
                  onClick={handlePrevPhoto}
                >
                  <ArrowBackIosIcon sx={{ fontSize: "inherit" }} />
                </IconButton>
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 20,
                    color: "white",
                    fontSize: 50,
                    zIndex: 1,
                  }}
                  onClick={handleNextPhoto}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: "inherit" }} />
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