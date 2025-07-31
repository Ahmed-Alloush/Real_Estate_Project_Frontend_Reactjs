// // // import React, { useEffect } from "react";
// // // import { getAllOfficesWhichAreStillNotAcceptedYet } from "../../redux/superAdmin/manageOfficeSlice";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { deleteOffice } from "../../redux/office/officeSlice";
// // // import { Alert, CircularProgress, Container, Grid } from "@mui/material";
// // // import OfficeCard from "../../components/OfficeCard";

// // // function ManageOfficePage() {
// // //   const dispatch = useDispatch();

// // //   const { offices, loading, error } = useSelector((state) => state.manageOffice);

// // //   useEffect(() => {
// // //     dispatch(getAllOfficesWhichAreStillNotAcceptedYet());
// // //   }, [dispatch]);

// // //   const handleDelete = (id) => {
// // //     if (window.confirm("Are you sure you want to delete this office?")) {
// // //       dispatch(deleteOffice(id));
// // //     }
// // //   };

// // //   const handleEdit = (id) => {
// // //     // you could navigate to an edit page, for now just log
// // //     console.log("Edit office", id);
// // //   };

// // //   return (
// // //     <Container sx={{ mt: 4 }}>
// // //       {/* <Typography variant="h4" gutterBottom>
// // //         Offices
// // //       </Typography> */}

// // //       {loading && <CircularProgress />}
// // //       {error && <Alert severity="error">{error.message || error}</Alert>}

// // //       <Grid container spacing={3} sx={{ mt: 2 }}>
// // //         {offices.map((office) => (
// // //           <Grid item xs={12} sm={6} md={4} key={office.id}>
// // //             {/* <OfficeCard
// // //               id={office.id}
// // //               name={office.name}
// // //               office_photo={office.office_photo}
// // //               office_phone={office.office_phone}
// // //               ratingsCount={office.ratingsCount}
// // //             /> */}
// // //           </Grid>
// // //         ))}
// // //       </Grid>
// // //     </Container>
// // //   );
// // // }

// // // export default ManageOfficePage;

// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getAllOfficesWhichAreStillNotAcceptedYet } from "../../redux/superAdmin/manageOfficeSlice";
// // import { deleteOffice } from "../../redux/office/officeSlice"; // Assuming deleteOffice is in officeSlice
// // // Import any other actions for approve/reject if you have them in manageOfficeSlice
// // // For example: { approveOffice, rejectOffice } from "../../redux/superAdmin/manageOfficeSlice";

// // import {
// //   Container,
// //   Grid,
// //   Typography,
// //   CircularProgress,
// //   Alert,
// //   Card,
// //   CardContent,
// //   CardMedia,
// //   CardActions,
// //   Button,
// //   Box,
// //   Dialog, // For the details modal
// //   DialogTitle,
// //   DialogContent,
// //   IconButton,
// // } from "@mui/material";
// // import {
// //   Visibility as VisibilityIcon,
// //   CheckCircleOutline as ApproveIcon,
// //   HighlightOff as RejectIcon,
// //   DeleteOutline as DeleteIcon,
// //   Close as CloseIcon,
// // } from "@mui/icons-material";
// // import OfficeDetailsModal from "../../components/OfficeDetailsModal";

// // // Import the new OfficeDetailsModal component

// // function ManageOfficesPage() {
// //   const dispatch = useDispatch();
// //   const { offices, loading, error } = useSelector(
// //     (state) => state.manageOffice
// //   );

// //   const [selectedOffice, setSelectedOffice] = useState(null);
// //   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

// //   useEffect(() => {
// //     // Fetch offices that are still not accepted yet
// //     dispatch(getAllOfficesWhichAreStillNotAcceptedYet());
// //   }, [dispatch]);

// //   const handleViewDetails = (office) => {
// //     setSelectedOffice(office);
// //     setIsDetailsModalOpen(true);
// //   };

// //   const handleApprove = (id) => {
// //     if (window.confirm("Are you sure you want to approve this office?")) {
// //       // Dispatch your approve action here
// //       // dispatch(approveOffice(id));
// //       console.log("Approve office with ID:", id);
// //       // After successful approval, you might want to re-fetch offices or update state
// //     }
// //   };

// //   const handleReject = (id) => {
// //     if (window.confirm("Are you sure you want to reject this office?")) {
// //       // Dispatch your reject action here
// //       // dispatch(rejectOffice(id));
// //       console.log("Reject office with ID:", id);
// //       // After successful rejection, you might want to re-fetch offices or update state
// //     }
// //   };

// //   const handleDelete = (id) => {
// //     if (window.confirm("Are you sure you want to delete this office?")) {
// //       // Assuming deleteOffice action takes an ID
// //       dispatch(deleteOffice(id)); // This dispatches the action
// //       console.log("Delete office with ID:", id);
// //       // Optionally, refetch offices after deletion or remove from local state
// //     }
// //   };

// //   const handleCloseDetailsModal = () => {
// //     setIsDetailsModalOpen(false);
// //     setSelectedOffice(null);
// //   };

// //   return (
// //     <Container sx={{ mt: 4 }}>
// //       <Typography variant="h4" gutterBottom component="h1">
// //         Manage Offices (Pending Approval)
// //       </Typography>

// //       {loading && (
// //         <Box display="flex" justifyContent="center" py={4}>
// //           <CircularProgress />
// //         </Box>
// //       )}

// //       {error && (
// //         <Alert severity="error" sx={{ mb: 2 }}>
// //           {error.message || error.response?.data?.message || "An unknown error occurred."}
// //         </Alert>
// //       )}

// //       {!loading && offices.length === 0 && (
// //         <Alert severity="info">No pending offices to display.</Alert>
// //       )}

// //       <Grid container spacing={3} sx={{ mt: 2 }}>
// //         {offices.map((office) => (
// //           <Grid item xs={12} sm={6} md={4} key={office.id}>
// //             <Card raised sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
// //               {office.office_photo?.url ? (
// //                 <CardMedia
// //                   component="img"
// //                   height="140"
// //                   image={office.office_photo.url}
// //                   alt={office.name}
// //                   sx={{ objectFit: "cover" }}
// //                 />
// //               ) : (
// //                 <Box
// //                   height="140px"
// //                   display="flex"
// //                   alignItems="center"
// //                   justifyContent="center"
// //                   sx={{ backgroundColor: "#f0f0f0", color: "#9e9e9e" }}
// //                 >
// //                   No Photo Available
// //                 </Box>
// //               )}
// //               <CardContent sx={{ flexGrow: 1 }}>
// //                 <Typography gutterBottom variant="h6" component="div">
// //                   {office.name}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   **Status:** {office.status ? office.status.toUpperCase() : "N/A"}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   **Email:** {office.office_email}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   **Phone:** {office.office_phone}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   **Manager:** {office.user?.first_name} {office.user?.last_name}
// //                 </Typography>
// //               </CardContent>
// //               <CardActions sx={{ mt: "auto", justifyContent: "space-between", flexWrap: "wrap" }}>
// //                 <Button
// //                   size="small"
// //                   startIcon={<VisibilityIcon />}
// //                   onClick={() => handleViewDetails(office)}
// //                 >
// //                   View Details
// //                 </Button>
// //                 <Box>
// //                   {/* These buttons are for offices with 'pending' status */}
// //                   {office.status === "pending" && (
// //                     <>
// //                       <Button
// //                         size="small"
// //                         color="success"
// //                         startIcon={<ApproveIcon />}
// //                         onClick={() => handleApprove(office.id)}
// //                       >
// //                         Approve
// //                       </Button>
// //                       <Button
// //                         size="small"
// //                         color="warning"
// //                         startIcon={<RejectIcon />}
// //                         onClick={() => handleReject(office.id)}
// //                       >
// //                         Reject
// //                       </Button>
// //                     </>
// //                   )}
// //                   {/* Delete button can be for any status, or conditional */}
// //                   <Button
// //                     size="small"
// //                     color="error"
// //                     startIcon={<DeleteIcon />}
// //                     onClick={() => handleDelete(office.id)}
// //                   >
// //                     Delete
// //                   </Button>
// //                 </Box>
// //               </CardActions>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {selectedOffice && (
// //         <OfficeDetailsModal
// //           open={isDetailsModalOpen}
// //           onClose={handleCloseDetailsModal}
// //           office={selectedOffice}
// //         />
// //       )}
// //     </Container>
// //   );
// // }

// // export default ManageOfficesPage;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from 'sweetalert2'; // Import SweetAlert2

// import {
//   getAllOfficesWhichAreStillNotAcceptedYet,
//   updateOfficeStatus, // Import the new action
//   // Add other actions if you have them, like resetStatus, removeOfficeFromList
// } from "../../redux/superAdmin/manageOfficeSlice";
// import { deleteOffice } from "../../redux/office/officeSlice"; // Assuming deleteOffice is in officeSlice

// import {
//   Container,
//   Grid,
//   Typography,
//   CircularProgress,
//   Alert,
//   Card,
//   CardContent,
//   CardMedia,
//   CardActions,
//   Button,
//   Box,
//   // Dialog, // No longer directly used in this file, but in OfficeDetailsModal
//   // DialogTitle,
//   // DialogContent,
//   // IconButton,
// } from "@mui/material";
// import {
//   Visibility as VisibilityIcon,
//   CheckCircleOutline as ApproveIcon,
//   HighlightOff as RejectIcon,
//   DeleteOutline as DeleteIcon,
//   // Close as CloseIcon, // No longer directly used in this file
// } from "@mui/icons-material";

// import OfficeDetailsModal from "../../components/OfficeDetailsModal"; // Adjust path as needed

// function ManageOfficesPage() {
//   const dispatch = useDispatch();
//   const { offices, loading, error, statusUpdateLoading } = useSelector( // Added statusUpdateLoading
//     (state) => state.manageOffice
//   );

//   const [selectedOffice, setSelectedOffice] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

//   useEffect(() => {
//     dispatch(getAllOfficesWhichAreStillNotAcceptedYet());
//   }, [dispatch]);

//   const handleViewDetails = (office) => {
//     setSelectedOffice(office);
//     setIsDetailsModalOpen(true);
//   };

//   const handleApprove = (officeId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to approve this office? This action is irreversible!", // Specific text for approval
//       icon: "question", // Use 'question' or 'info' for approval
//       showCancelButton: true,
//       confirmButtonColor: "#28a745", // Green for approve
//       cancelButtonColor: "#6c757d", // Grey for cancel
//       confirmButtonText: "Yes, Approve it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(updateOfficeStatus({ officeId, status: "accepted" }));
//         Swal.fire(
//           "Approved!",
//           "The office has been approved successfully.",
//           "success"
//         );
//       }
//     });
//   };

//   const handleReject = (officeId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to reject this office? This action is irreversible!", // Specific text for rejection
//       icon: "warning", // 'warning' is suitable for rejection
//       showCancelButton: true,
//       confirmButtonColor: "#dc3545", // Red for reject
//       cancelButtonColor: "#6c757d", // Grey for cancel
//       confirmButtonText: "Yes, Reject it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(updateOfficeStatus({ officeId, status: "rejected" }));
//         Swal.fire(
//           "Rejected!",
//           "The office has been rejected successfully.",
//           "success" // Or 'info' if you don't want a "success" icon for rejection
//         );
//       }
//     });
//   };

//   const handleDelete = (officeId) => { // Changed 'id' to 'officeId' for consistency
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete this office. This action is irreversible!", // Specific text for deletion
//       icon: "error", // 'error' or 'warning' is good for permanent delete
//       showCancelButton: true,
//       confirmButtonColor: "#d33", // Red for delete
//       cancelButtonColor: "#3085d6", // Blue for cancel
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteOffice(officeId)); // Assuming deleteOffice takes the ID directly
//         Swal.fire(
//           "Deleted!",
//           "The office has been deleted.",
//           "success"
//         );
//       }
//     });
//   };

//   const handleCloseDetailsModal = () => {
//     setIsDetailsModalOpen(false);
//     setSelectedOffice(null);
//   };

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom component="h1">
//         Manage Offices (Pending Approval)
//       </Typography>

//       {loading && (
//         <Box display="flex" justifyContent="center" py={4}>
//           <CircularProgress />
//         </Box>
//       )}

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error.message || error.response?.data?.message || "An unknown error occurred."}
//         </Alert>
//       )}

//       {/* Show a loading indicator for status updates if needed */}
//       {statusUpdateLoading && (
//         <Alert severity="info" sx={{ mb: 2 }}>
//           Updating office status...
//         </Alert>
//       )}

//       {!loading && offices.length === 0 && (
//         <Alert severity="info">No pending offices to display.</Alert>
//       )}

//       <Grid container spacing={3} sx={{ mt: 2 }}>
//         {offices.map((office) => (
//           <Grid item xs={12} sm={6} md={4} key={office.id}>
//             <Card raised sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
//               {office.office_photo?.url ? (
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={office.office_photo.url}
//                   alt={office.name}
//                   sx={{ objectFit: "cover" }}
//                 />
//               ) : (
//                 <Box
//                   height="140px"
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="center"
//                   sx={{ backgroundColor: "#f0f0f0", color: "#9e9e9e" }}
//                 >
//                   No Photo Available
//                 </Box>
//               )}
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography gutterBottom variant="h6" component="div">
//                   {office.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   **Status:** {office.status ? office.status.toUpperCase() : "N/A"}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   **Email:** {office.office_email}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   **Phone:** {office.office_phone}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   **Manager:** {office.user?.first_name} {office.user?.last_name}
//                 </Typography>
//               </CardContent>
//               <CardActions sx={{ mt: "auto", justifyContent: "space-between", flexWrap: "wrap" }}>
//                 <Button
//                   size="small"
//                   startIcon={<VisibilityIcon />}
//                   onClick={() => handleViewDetails(office)}
//                 >
//                   View Details
//                 </Button>
//                 <Box>
//                   {/* These buttons are for offices with 'pending' status */}
//                   {office.status === "pending" && (
//                     <>
//                       <Button
//                         size="small"
//                         color="success"
//                         startIcon={<ApproveIcon />}
//                         onClick={() => handleApprove(office.id)}
//                         disabled={statusUpdateLoading} // Disable if an update is in progress
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         size="small"
//                         color="warning"
//                         startIcon={<RejectIcon />}
//                         onClick={() => handleReject(office.id)}
//                         disabled={statusUpdateLoading} // Disable if an update is in progress
//                       >
//                         Reject
//                       </Button>
//                     </>
//                   )}
//                   {/* Delete button can be for any status, or conditional */}
//                   <Button
//                     size="small"
//                     color="error"
//                     startIcon={<DeleteIcon />}
//                     onClick={() => handleDelete(office.id)}
//                     disabled={statusUpdateLoading} // Disable if an update is in progress
//                   >
//                     Delete
//                   </Button>
//                 </Box>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {selectedOffice && (
//         <OfficeDetailsModal
//           open={isDetailsModalOpen}
//           onClose={handleCloseDetailsModal}
//           office={selectedOffice}
//         />
//       )}
//     </Container>
//   );
// }

// export default ManageOfficesPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert2

import {
  getAllOfficesWhichAreStillNotAcceptedYet,
  updateOfficeStatus, // Import the new action
} from "../../redux/superAdmin/manageOfficeSlice";
import { deleteOffice } from "../../redux/office/officeSlice"; // Assuming deleteOffice is in officeSlice

import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  Pagination, // Import Pagination component from Material-UI
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  CheckCircleOutline as ApproveIcon,
  HighlightOff as RejectIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";

import OfficeDetailsModal from "../../components/OfficeDetailsModal"; // Adjust path as needed

function ManageOfficesPage() {
  const dispatch = useDispatch();
  const { offices, loading, error, statusUpdateLoading, pagination } =
    useSelector(
      // Added pagination from state
      (state) => state.manageOffice
    );

  const [selectedOffice, setSelectedOffice] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(
      getAllOfficesWhichAreStillNotAcceptedYet({
        page: pagination.page,
        limit: pagination.limit,
      })
    );
  }, [dispatch, pagination.page, pagination.limit]); // Re-fetch data when the page or limit changes

  const handleViewDetails = (office) => {
    setSelectedOffice(office);
    setIsDetailsModalOpen(true);
  };

  const handleApprove = (officeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this office? This action is irreversible!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateOfficeStatus({ officeId, status: "accepted" }));
        Swal.fire(
          "Approved!",
          "The office has been approved successfully.",
          "success"
        );
      }
    });
  };

  const handleReject = (officeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this office? This action is irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateOfficeStatus({ officeId, status: "rejected" }));
        Swal.fire(
          "Rejected!",
          "The office has been rejected successfully.",
          "info"
        );
      }
    });
  };

  const handleDelete = (officeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this office. This action is irreversible!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOffice(officeId));
        Swal.fire("Deleted!", "The office has been deleted.", "success");
      }
    });
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOffice(null);
  };

  const handlePageChange = (event, newPage) => {
    dispatch(
      getAllOfficesWhichAreStillNotAcceptedYet({
        page: newPage,
        limit: pagination.limit,
      })
    );
    dispatch(setPage({ page: newPage, limit: pagination.limit }));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom component="h1">
        Manage Offices (Pending Approval)
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message ||
            error.response?.data?.message ||
            "An unknown error occurred."}
        </Alert>
      )}

      {statusUpdateLoading && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Updating office status...
        </Alert>
      )}

      {!loading && offices.length === 0 && (
        <Alert severity="info">No pending offices to display.</Alert>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {offices.map((office) => (
          <Grid item xs={12} sm={6} md={4} key={office.id}>
            <Card
              raised
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              {office.office_photo?.url ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={office.office_photo.url}
                  alt={office.name}
                  sx={{ objectFit: "cover" }}
                />
              ) : (
                <Box
                  height="140px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ backgroundColor: "#f0f0f0", color: "#9e9e9e" }}
                >
                  No Photo Available
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {office.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  **Status:**{" "}
                  {office.status ? office.status.toUpperCase() : "N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  **Email:** {office.office_email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  **Phone:** {office.office_phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  **Manager:** {office.user?.first_name}{" "}
                  {office.user?.last_name}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  mt: "auto",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewDetails(office)}
                >
                  View Details
                </Button>
                <Box>
                  {office.status === "pending" && (
                    <>
                      <Button
                        size="small"
                        color="success"
                        startIcon={<ApproveIcon />}
                        onClick={() => handleApprove(office.id)}
                        disabled={statusUpdateLoading}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        color="warning"
                        startIcon={<RejectIcon />}
                        onClick={() => handleReject(office.id)}
                        disabled={statusUpdateLoading}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(office.id)}
                    disabled={statusUpdateLoading}
                  >
                    Delete
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Component */}
      {pagination.pageCount > 1 && (
        <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
          <Pagination
            count={pagination.pageCount}
            page={pagination.page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {selectedOffice && (
        <OfficeDetailsModal
          open={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          office={selectedOffice}
        />
      )}
    </Container>
  );
}

export default ManageOfficesPage;
