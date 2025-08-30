// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchArchives,
//   fetchOneArchiveWithRecords,
// } from "../../redux/archive/archiveSlice";
// import {
//   Container,
//   Typography,
//   CircularProgress,
//   Grid,
//   Card,
//   CardContent,
//   CardActionArea,
//   Box,
// } from "@mui/material";
// import ArchiveDetails from "../../components/ArchiveDetails"; // A new component for displaying a single archive

// function ArchivePage() {
//   const dispatch = useDispatch();
//   const { archives, selectedArchive, status, error } = useSelector(
//     (state) => state.archive
//   );

//   // Fetch all archives on component mount
//   useEffect(() => {
//     dispatch(fetchArchives());
//   }, [dispatch]);

//   const handleArchiveClick = (archiveId) => {
//     // When an archive card is clicked, fetch its records
//     dispatch(fetchOneArchiveWithRecords(archiveId));
//   };

//   if (status === "loading") {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (status === "failed") {
//     return (
//       <Container>
//         <Typography color="error" align="center" variant="h6" sx={{ mt: 4 }}>
//           Error: {error ? error.message : "Something went wrong."}
//         </Typography>
//       </Container>
//     );
//   }

//   // The main UI
//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
//         Archive List
//       </Typography>

//       <Grid container spacing={3}>
//         {archives.map((archive) => (
//           <Grid item xs={12} sm={6} md={4} key={archive.id}>
//             <Card sx={{ height: "100%" }}>
//               <CardActionArea onClick={() => handleArchiveClick(archive.id)}>
//                 <CardContent>
//                   <Typography variant="h6" component="div">
//                     Property #{archive.property_Number}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Type: {archive.propertyType} - {archive.typeOfPropertyType}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Location:{" "}
//                     {`${archive.location.governorate},${archive.location.province},${archive.location.city},${archive.location.street}` ||
//                       "N/A"}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Display selected archive details in a modal or a new section */}
//       {selectedArchive && (
//         <Box sx={{ mt: 4 }}>
//           <ArchiveDetails archive={selectedArchive} />
//         </Box>
//       )}
//     </Container>
//   );
// }

// export default ArchivePage;




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArchives, fetchOneArchiveWithRecords } from '../../redux/archive/archiveSlice';
import { Container, Typography, CircularProgress, Grid, Card, CardContent, CardActionArea, Box, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArchiveDetails from '../../components/ArchiveDetails';

function ArchivePage() {
  const dispatch = useDispatch();
  const { archives, selectedArchive, status, error } = useSelector((state) => state.archive);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchArchives());
  }, [dispatch]);

  const handleArchiveClick = (archiveId) => {
    dispatch(fetchOneArchiveWithRecords(archiveId));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Container>
        <Typography color="error" align="center" variant="h6" sx={{ mt: 4 }}>
          Error: {error ? error.message : 'Something went wrong.'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'text.primary' }}>
        Archived Properties
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {archives.map((archive) => (
          <Grid item xs={12} sm={6} md={4} key={archive.id}>
            <Card
              sx={{
                height: '100%',
                borderRadius: '12px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
              }}
              elevation={4}
            >
              <CardActionArea onClick={() => handleArchiveClick(archive.id)}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Property #{archive.property_Number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Type: {archive.propertyType} - {archive.typeOfPropertyType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Space: {archive.space}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Location: {archive.location ? `${archive.location.city}, ${archive.location.governorate}` : 'N/A'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Archive Details
          </Typography>
          <IconButton onClick={handleCloseModal} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedArchive && <ArchiveDetails archive={selectedArchive} />}
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default ArchivePage;