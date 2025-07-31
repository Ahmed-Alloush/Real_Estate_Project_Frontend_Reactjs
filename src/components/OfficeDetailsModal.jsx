// import React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Typography,
//   Grid,
//   Box,
//   Divider,
//   Card,
//   CardMedia,
// } from "@mui/material";
// import { Close as CloseIcon } from "@mui/icons-material";

// const OfficeDetailsModal = ({ open, onClose, office }) => {
//   if (!office) {
//     return null; // Don't render if no office data is provided
//   }

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>
//         Office Details: {office.name}
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent dividers>
//         <Grid container spacing={3}>
//           {/* Office Information */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" gutterBottom>
//               Office Information
//             </Typography>
//             <Typography variant="body1">
//               **Name:** {office.name}
//             </Typography>
//             <Typography variant="body1">
//               **Email:** {office.office_email}
//             </Typography>
//             <Typography variant="body1">
//               **Phone:** {office.office_phone}
//             </Typography>
//             <Typography variant="body1">
//               **License Number:** {office.license_number}
//             </Typography>
//             <Typography variant="body1">
//               **Personal Identity Number:** {office.personal_identity_number}
//             </Typography>
//             <Typography variant="body1" sx={{ color: office.status === 'accepted' ? 'success.main' : office.status === 'pending' ? 'warning.main' : 'error.main', fontWeight: 'bold' }}>
//               **Status:** {office.status ? office.status.toUpperCase() : "N/A"}
//             </Typography>
//           </Grid>

//           {/* Office Photos */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" gutterBottom>
//               Photos
//             </Typography>
//             {office.office_photo?.url && (
//               <Box mb={2}>
//                 <Typography variant="subtitle1" gutterBottom>Office Photo</Typography>
//                 <Card>
//                   <CardMedia
//                     component="img"
//                     image={office.office_photo.url}
//                     alt="Office Photo"
//                     sx={{ maxHeight: 250, width: "100%", objectFit: "contain" }}
//                   />
//                 </Card>
//               </Box>
//             )}
//             {office.license_photo?.url && (
//               <Box mb={2}>
//                 <Typography variant="subtitle1" gutterBottom>License Photo</Typography>
//                 <Card>
//                   <CardMedia
//                     component="img"
//                     image={office.license_photo.url}
//                     alt="License Photo"
//                     sx={{ maxHeight: 250, width: "100%", objectFit: "contain" }}
//                   />
//                 </Card>
//               </Box>
//             )}
//             {!office.office_photo?.url && !office.license_photo?.url && (
//               <Typography variant="body2" color="text.secondary">
//                 No photos available.
//               </Typography>
//             )}
//           </Grid>

//           <Grid item xs={12}>
//             <Divider sx={{ my: 2 }} />
//           </Grid>

//           {/* Office Manager Information */}
//           {office.user && (
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Office Manager Information
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={4}>
//                   {office.user.profile_photo?.url ? (
//                     <Box display="flex" justifyContent="center">
//                       <CardMedia
//                         component="img"
//                         image={office.user.profile_photo.url}
//                         alt={`${office.user.first_name}'s Profile Photo`}
//                         sx={{
//                           borderRadius: "50%",
//                           width: 100,
//                           height: 100,
//                           objectFit: "cover",
//                         }}
//                       />
//                     </Box>
//                   ) : (
//                     <Box
//                       width={100}
//                       height={100}
//                       borderRadius="50%"
//                       display="flex"
//                       alignItems="center"
//                       justifyContent="center"
//                       sx={{ backgroundColor: "#e0e0e0", color: "#757575", mx: "auto" }}
//                     >
//                       No Photo
//                     </Box>
//                   )}
//                 </Grid>
//                 <Grid item xs={12} sm={8}>
//                   <Typography variant="body1">
//                     **Name:** {office.user.first_name} {office.user.last_name}
//                   </Typography>
//                   <Typography variant="body1">
//                     **Email:** {office.user.email}
//                   </Typography>
//                   <Typography variant="body1">
//                     **Phone:** {office.user.phone}
//                   </Typography>
//                   <Typography variant="body1">
//                     **Role:** {office.user.role}
//                   </Typography>
//                   <Typography variant="body1">
//                     **National Number:** {office.user.national_number}
//                   </Typography>
//                   <Typography variant="body1">
//                     **Verified:** {office.user.is_verified ? "Yes" : "No"}
//                   </Typography>
//                   {office.user.banned && (
//                     <Typography variant="body1" color="error">
//                       **Banned:** Yes
//                     </Typography>
//                   )}
//                   {office.user.userWarnings && (
//                     <Typography variant="body1" color="warning.dark">
//                       **Warnings:** {office.user.userWarnings.report_counts}
//                     </Typography>
//                   )}
//                 </Grid>
//               </Grid>
//             </Grid>
//           )}
//         </Grid>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default OfficeDetailsModal;



import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Box,
  Divider,
  Card,
  CardMedia,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const OfficeDetailsModal = ({ open, onClose, office }) => {
  const [isLicensePhotoViewerOpen, setIsLicensePhotoViewerOpen] = useState(false);

  if (!office) {
    return null; // Don't render if no office data is provided
  }

  const handleOpenLicensePhotoViewer = () => {
    setIsLicensePhotoViewerOpen(true);
  };

  const handleCloseLicensePhotoViewer = () => {
    setIsLicensePhotoViewerOpen(false);
  };

  return (
    <>
      {/* Main Office Details Dialog */}
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Office Details: {office.name}
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
            {/* Office Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Office Information
              </Typography>
              <Typography variant="body1">
                **Name:** {office.name}
              </Typography>
              <Typography variant="body1">
                **Email:** {office.office_email}
              </Typography>
              <Typography variant="body1">
                **Phone:** {office.office_phone}
              </Typography>
              <Typography variant="body1">
                **License Number:** {office.license_number}
              </Typography>
              <Typography variant="body1">
                **Personal Identity Number:** {office.personal_identity_number}
              </Typography>
              <Typography variant="body1" sx={{ color: office.status === 'accepted' ? 'success.main' : office.status === 'pending' ? 'warning.main' : 'error.main', fontWeight: 'bold' }}>
                **Status:** {office.status ? office.status.toUpperCase() : "N/A"}
              </Typography>
            </Grid>

            {/* Office Photos */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Photos
              </Typography>
              {office.office_photo?.url && (
                <Box mb={2}>
                  <Typography variant="subtitle1" gutterBottom>Office Photo</Typography>
                  <Card>
                    <CardMedia
                      component="img"
                      image={office.office_photo.url}
                      alt="Office Photo"
                      sx={{ maxHeight: 250, width: "100%", objectFit: "contain" }}
                    />
                  </Card>
                </Box>
              )}
              {office.license_photo?.url && (
                <Box mb={2}>
                  <Typography variant="subtitle1" gutterBottom>License Photo (Click to Enlarge)</Typography>
                  <Card>
                    <CardMedia
                      component="img"
                      image={office.license_photo.url}
                      alt="License Photo"
                      sx={{
                        maxHeight: 250,
                        width: "100%",
                        objectFit: "contain",
                        cursor: "pointer", // Indicate clickable
                        "&:hover": {
                          opacity: 0.8, // Visual feedback on hover
                        },
                      }}
                      onClick={handleOpenLicensePhotoViewer} // <-- New click handler
                    />
                  </Card>
                </Box>
              )}
              {!office.office_photo?.url && !office.license_photo?.url && (
                <Typography variant="body2" color="text.secondary">
                  No photos available.
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Office Manager Information */}
            {office.user && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Office Manager Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    {office.user.profile_photo?.url ? (
                      <Box display="flex" justifyContent="center">
                        <CardMedia
                          component="img"
                          image={office.user.profile_photo.url}
                          alt={`${office.user.first_name}'s Profile Photo`}
                          sx={{
                            borderRadius: "50%",
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    ) : (
                      <Box
                        width={100}
                        height={100}
                        borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ backgroundColor: "#e0e0e0", color: "#757575", mx: "auto" }}
                      >
                        No Photo
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="body1">
                      **Name:** {office.user.first_name} {office.user.last_name}
                    </Typography>
                    <Typography variant="body1">
                      **Email:** {office.user.email}
                    </Typography>
                    <Typography variant="body1">
                      **Phone:** {office.user.phone}
                    </Typography>
                    <Typography variant="body1">
                      **Role:** {office.user.role}
                    </Typography>
                    <Typography variant="body1">
                      **National Number:** {office.user.national_number}
                    </Typography>
                    <Typography variant="body1">
                      **Verified:** {office.user.is_verified ? "Yes" : "No"}
                    </Typography>
                    {office.user.banned && (
                      <Typography variant="body1" color="error">
                        **Banned:** Yes
                      </Typography>
                    )}
                    {office.user.userWarnings && (
                      <Typography variant="body1" color="warning.dark">
                        **Warnings:** {office.user.userWarnings.report_counts}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Full-screen License Photo Viewer Dialog */}
      {office.license_photo?.url && (
        <Dialog
          open={isLicensePhotoViewerOpen}
          onClose={handleCloseLicensePhotoViewer}
          maxWidth="xl" // Allow it to be very wide
          fullScreen // Make it fill the whole screen
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            License Photo Viewer
            <IconButton
              aria-label="close"
              onClick={handleCloseLicensePhotoViewer}
              sx={{ color: (theme) => theme.palette.grey[500] }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.85)", // Dark background for photo
              p: 0, // Remove padding to let image fill
            }}
          >
            <Box
              component="img"
              src={office.license_photo.url}
              alt="Full-screen License Photo"
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain", // Ensure the whole image is visible
                cursor: 'zoom-out', // Hint to user they can click to close
              }}
              onClick={handleCloseLicensePhotoViewer} // Click anywhere on image to close
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default OfficeDetailsModal;