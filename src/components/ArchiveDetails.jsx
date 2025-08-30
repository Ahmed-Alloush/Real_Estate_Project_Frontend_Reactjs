// import React from 'react';
// import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// function ArchiveDetails({ archive }) {
//   if (!archive) {
//     return <Typography>Select an archive to view details.</Typography>;
//   }

//   return (
//     <Box sx={{ my: 4 }}>
//       <Typography variant="h5" gutterBottom>
//         Details for Property #{archive.property_Number}
//       </Typography>
//       <Typography>
//         Location: {`${archive.location.governorate},${archive.location.province},${archive.location.city},${archive.location.street}` || 'N/A'}
//       </Typography>
//       <Typography>
//         Space: {archive.space}
//       </Typography>
      
//       <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
//         Records
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Client Name</TableCell>
//               <TableCell>Owner Name</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {archive.records.map((record) => (
//               <TableRow key={record.id}>
//                 <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
//                 <TableCell>{record.type}</TableCell>
//                 <TableCell>${record.price}</TableCell>
//                 <TableCell>{record.client_name}</TableCell>
//                 <TableCell>{record.owner_name}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default ArchiveDetails;





import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Grid } from '@mui/material';

function ArchiveDetails({ archive }) {
  if (!archive) {
    return <Typography variant="h6" align="center" color="text.secondary">Select an archive to view details.</Typography>;
  }

  const { property_Number, propertyType, typeOfPropertyType, space, location, records } = archive;

  return (
    <Box sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: '12px' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Property #{property_Number}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Property Type
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {propertyType} - {typeOfPropertyType}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Space
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {space}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary">
              Location
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {location ? `${location.governorate}, ${location.province}, ${location.city}, ${location.street}` : 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" component="h3" sx={{ mt: 5, mb: 2, fontWeight: 'bold' }}>
        Records
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="records table">
          <TableHead sx={{ backgroundColor: 'primary.light' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Client Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Owner Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length > 0 ? records.map((record) => (
              <TableRow
                key={record.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: 'grey.100' } }}
              >
                <TableCell component="th" scope="row">
                  {new Date(record.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>${record.price}</TableCell>
                <TableCell>{record.client_name}</TableCell>
                <TableCell>{record.owner_name}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    No records found for this property.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ArchiveDetails;