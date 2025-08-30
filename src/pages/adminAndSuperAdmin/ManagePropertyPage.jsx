// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import Swal from 'sweetalert2'; // Import SweetAlert2

// // import {
// //   getAllPendingProperties, // Changed to pending properties
// //   updatePropertyStatus, // Changed to property status update
// //   deleteProperty, // Changed to delete property
// //   // If you also want to fetch all properties, import getAllProperties here
// // } from "../../redux/superAdmin/managePropertySlice"; // Ensure this path is correct

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
// // } from "@mui/material";
// // import {
// //   Visibility as VisibilityIcon,
// //   CheckCircleOutline as ApproveIcon,
// //   HighlightOff as RejectIcon,
// //   DeleteOutline as DeleteIcon,
// // } from "@mui/icons-material";

// // import PropertyDetailsModal from '../../components/PropertyDetailsModal'

// // function ManagePropertyPage() {
// //   const dispatch = useDispatch();
// //   const { properties, loading, error, statusUpdateLoading, deleteLoading } = useSelector( // Destructure properties
// //     (state) => state.manageProperty // Access the manageProperty slice
// //   );

// //   const [selectedProperty, setSelectedProperty] = useState(null);
// //   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

// //   useEffect(() => {
// //     // Fetch pending properties by default for admin review
// //     dispatch(getAllPendingProperties());
// //     // If you want to fetch all properties:
// //     // dispatch(getAllProperties());
// //   }, [dispatch]);

// //   const handleViewDetails = (property) => {
// //     setSelectedProperty(property);
// //     setIsDetailsModalOpen(true);
// //   };

// //   const handleApprove = (propertyId) => {
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "Do you want to approve this property? This action is irreversible!",
// //       icon: "question",
// //       showCancelButton: true,
// //       confirmButtonColor: "#28a745",
// //       cancelButtonColor: "#6c757d",
// //       confirmButtonText: "Yes, Approve it!",
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         dispatch(updatePropertyStatus({ propertyId, status: "accepted" }));
// //         Swal.fire(
// //           "Approved!",
// //           "The property has been approved successfully.",
// //           "success"
// //         );
// //       }
// //     });
// //   };

// //   const handleReject = (propertyId) => {
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "Do you want to reject this property? This action is irreversible!",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#dc3545",
// //       cancelButtonColor: "#6c757d",
// //       confirmButtonText: "Yes, Reject it!",
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         dispatch(updatePropertyStatus({ propertyId, status: "rejected" }));
// //         Swal.fire(
// //           "Rejected!",
// //           "The property has been rejected successfully.",
// //           "info" // Use 'info' for rejection success
// //         );
// //       }
// //     });
// //   };

// //   const handleDelete = (propertyId) => {
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "This will permanently delete this property. This action is irreversible!",
// //       icon: "error",
// //       showCancelButton: true,
// //       confirmButtonColor: "#d33",
// //       cancelButtonColor: "#3085d6",
// //       confirmButtonText: "Yes, delete it!",
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         dispatch(deleteProperty(propertyId)); // Dispatch deleteProperty
// //         Swal.fire(
// //           "Deleted!",
// //           "The property has been deleted.",
// //           "success"
// //         );
// //       }
// //     });
// //   };

// //   const handleCloseDetailsModal = () => {
// //     setIsDetailsModalOpen(false);
// //     setSelectedProperty(null);
// //   };

// //   return (
// //     <Container sx={{ mt: 4 }}>
// //       <Typography variant="h4" gutterBottom component="h1">
// //         Manage Properties (Pending Approval)
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

// //       {(statusUpdateLoading || deleteLoading) && (
// //         <Alert severity="info" sx={{ mb: 2 }}>
// //           Processing request...
// //         </Alert>
// //       )}

// //       {!loading && properties.length === 0 && (
// //         <Alert severity="info">No pending properties to display.</Alert>
// //       )}

// //       <Grid container spacing={3} sx={{ mt: 2 }}>
// //         {properties.map((property) => (
// //           <Grid item xs={12} sm={6} md={4} key={property.id}>
// //             <Card raised sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
// //               {property.photos && property.photos.length > 0 ? (
// //                 <CardMedia
// //                   component="img"
// //                   height="140"
// //                   image={property.photos[0].url} // Display the first photo
// //                   alt={property.propertyNumber}
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
// //                   Property #{property.propertyNumber}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   **Type:** {property.type?.name}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   **Operation:** {property.typeOperation}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   **Status:** {property.status ? property.status.toUpperCase() : "N/A"}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   **Location:** {property.location?.city}, {property.location?.governorate}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   **Price:** {property.price}
// //                 </Typography>
// //               </CardContent>
// //               <CardActions sx={{ mt: "auto", justifyContent: "space-between", flexWrap: "wrap" }}>
// //                 <Button
// //                   size="small"
// //                   startIcon={<VisibilityIcon />}
// //                   onClick={() => handleViewDetails(property)}
// //                 >
// //                   View Details
// //                 </Button>
// //                 <Box>
// //                   {property.status === "pending" && (
// //                     <>
// //                       <Button
// //                         size="small"
// //                         color="success"
// //                         startIcon={<ApproveIcon />}
// //                         onClick={() => handleApprove(property.id)}
// //                         disabled={statusUpdateLoading || deleteLoading}
// //                       >
// //                         Approve
// //                       </Button>
// //                       <Button
// //                         size="small"
// //                         color="warning"
// //                         startIcon={<RejectIcon />}
// //                         onClick={() => handleReject(property.id)}
// //                         disabled={statusUpdateLoading || deleteLoading}
// //                       >
// //                         Reject
// //                       </Button>
// //                     </>
// //                   )}
// //                   <Button
// //                     size="small"
// //                     color="error"
// //                     startIcon={<DeleteIcon />}
// //                     onClick={() => handleDelete(property.id)}
// //                     disabled={statusUpdateLoading || deleteLoading}
// //                   >
// //                     Delete
// //                   </Button>
// //                 </Box>
// //               </CardActions>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {selectedProperty && (
// //         <PropertyDetailsModal
// //           open={isDetailsModalOpen}
// //           onClose={handleCloseDetailsModal}
// //           property={selectedProperty}
// //         />
// //       )}
// //     </Container>
// //   );
// // }

// // export default ManagePropertyPage;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2"; // Import SweetAlert2

// import {
//   getAllPendingProperties, // Changed to pending properties
//   updatePropertyStatus, // Changed to property status update
//   deleteProperty, // Changed to delete property
//   setPage, // Added setPage for pagination
// } from "../../redux/superAdmin/managePropertySlice"; // Ensure this path is correct

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
//   Pagination,
// } from "@mui/material";
// import {
//   Visibility as VisibilityIcon,
//   CheckCircleOutline as ApproveIcon,
//   HighlightOff as RejectIcon,
//   DeleteOutline as DeleteIcon,
// } from "@mui/icons-material";

// import PropertyDetailsModal from "../../components/PropertyDetailsModal";

// function ManagePropertyPage() {
//   const dispatch = useDispatch();
//   const {
//     properties,
//     loading,
//     error,
//     statusUpdateLoading,
//     deleteLoading,
//     pagination,
//   } = useSelector(
//     // Destructure properties
//     (state) => state.manageProperty // Access the manageProperty slice
//   );
//   const pageCount = pagination.pageCount;
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

//   useEffect(() => {
//     // Fetch pending properties by default for admin review with pagination
//     dispatch(
//       getAllPendingProperties({
//         page: pagination.page,
//         limit: pagination.limit,
//       })
//     );
//   }, [dispatch, pagination.page, pagination.limit]); // Re-fetch when pagination changes

//   const handleViewDetails = (property) => {
//     setSelectedProperty(property);
//     setIsDetailsModalOpen(true);
//   };

//   const handleApprove = (propertyId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to approve this property? This action is irreversible!",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#28a745",
//       cancelButtonColor: "#6c757d",
//       confirmButtonText: "Yes, Approve it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(updatePropertyStatus({ propertyId, status: "accepted" }));
//         Swal.fire(
//           "Approved!",
//           "The property has been approved successfully.",
//           "success"
//         );
//       }
//     });
//   };

//   const handleReject = (propertyId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to reject this property? This action is irreversible!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#dc3545",
//       cancelButtonColor: "#6c757d",
//       confirmButtonText: "Yes, Reject it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(updatePropertyStatus({ propertyId, status: "rejected" }));
//         Swal.fire(
//           "Rejected!",
//           "The property has been rejected successfully.",
//           "info" // Use 'info' for rejection success
//         );
//       }
//     });
//   };

//   const handleDelete = (propertyId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This will permanently delete this property. This action is irreversible!",
//       icon: "error",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteProperty(propertyId)); // Dispatch deleteProperty
//         Swal.fire("Deleted!", "The property has been deleted.", "success");
//       }
//     });
//   };

//   const handleCloseDetailsModal = () => {
//     setIsDetailsModalOpen(false);
//     setSelectedProperty(null);
//   };

//   const handlePageChange = (event, value) => {
//     dispatch(setPage({ page: value }));
//   };

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom component="h1">
//         Manage Properties (Pending Approval)
//       </Typography>

//       {loading && (
//         <Box display="flex" justifyContent="center" py={4}>
//           <CircularProgress />
//         </Box>
//       )}

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error.message ||
//             error.response?.data?.message ||
//             "An unknown error occurred."}
//         </Alert>
//       )}

//       {(statusUpdateLoading || deleteLoading) && (
//         <Alert severity="info" sx={{ mb: 2 }}>
//           Processing request...
//         </Alert>
//       )}

//       {!loading && properties.length === 0 && (
//         <Alert severity="info">No pending properties to display.</Alert>
//       )}

//       <Grid container spacing={3} sx={{ mt: 2 }}>
//         {properties.map((property) => (
//           <Grid item xs={12} sm={6} md={4} key={property.id}>
//             <Card
//               raised
//               sx={{ display: "flex", flexDirection: "column", height: "100%" }}
//             >
//               {property.photos && property.photos.length > 0 ? (
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={property.photos[0].url} // Display the first photo
//                   alt={property.propertyNumber}
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
//                   Property #{property.propertyNumber}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   **Type:** {property.type?.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   **Operation:** {property.typeOperation}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   **Status:**{" "}
//                   {property.status ? property.status.toUpperCase() : "N/A"}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   **Location:** {property.location?.city},{" "}
//                   {property.location?.governorate}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   **Price:** {property.price}
//                 </Typography>
//               </CardContent>
//               <CardActions
//                 sx={{
//                   mt: "auto",
//                   justifyContent: "space-between",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <Button
//                   size="small"
//                   startIcon={<VisibilityIcon />}
//                   onClick={() => handleViewDetails(property)}
//                 >
//                   View Details
//                 </Button>
//                 <Box>
//                   {property.status === "pending" && (
//                     <>
//                       <Button
//                         size="small"
//                         color="success"
//                         startIcon={<ApproveIcon />}
//                         onClick={() => handleApprove(property.id)}
//                         disabled={statusUpdateLoading || deleteLoading}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         size="small"
//                         color="warning"
//                         startIcon={<RejectIcon />}
//                         onClick={() => handleReject(property.id)}
//                         disabled={statusUpdateLoading || deleteLoading}
//                       >
//                         Reject
//                       </Button>
//                     </>
//                   )}
//                   <Button
//                     size="small"
//                     color="error"
//                     startIcon={<DeleteIcon />}
//                     onClick={() => handleDelete(property.id)}
//                     disabled={statusUpdateLoading || deleteLoading}
//                   >
//                     Delete
//                   </Button>
//                 </Box>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Pagination component */}
//       {pageCount > 1 && (
//         <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
//           <Pagination
//             count={pagination.pageCount}
//             page={pagination.page}
//             onChange={handlePageChange}
//             color="primary"
//           />
//         </Box>
//       )}

//       {selectedProperty && (
//         <PropertyDetailsModal
//           open={isDetailsModalOpen}
//           onClose={handleCloseDetailsModal}
//           property={selectedProperty}
//         />
//       )}
//     </Container>
//   );
// }

// export default ManagePropertyPage;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next"; // Import useTranslation

import {
  getAllPendingProperties,
  updatePropertyStatus,
  deleteProperty,
  setPage,
} from "../../redux/superAdmin/managePropertySlice";

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
  Pagination,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  CheckCircleOutline as ApproveIcon,
  HighlightOff as RejectIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";

import PropertyDetailsModal from "../../components/PropertyDetailsModal";

function ManagePropertyPage() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(); // Use the hook
  const {
    properties,
    loading,
    error,
    statusUpdateLoading,
    deleteLoading,
    pagination,
  } = useSelector((state) => state.manageProperty);
  const pageCount = pagination.pageCount;
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(
      getAllPendingProperties({
        page: pagination.page,
        limit: pagination.limit,
      })
    );
  }, [dispatch, pagination.page, pagination.limit]);

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setIsDetailsModalOpen(true);
  };

  const handleApprove = (propertyId) => {
    Swal.fire({
      title: t("manageProperty.approveTitle"),
      text: t("manageProperty.approveText"),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t("manageProperty.approveConfirmBtn"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updatePropertyStatus({ propertyId, status: "accepted" }));
        Swal.fire(
          t("manageProperty.approveSuccessTitle"),
          t("manageProperty.approveSuccessText"),
          "success"
        );
      }
    });
  };

  const handleReject = (propertyId) => {
    Swal.fire({
      title: t("manageProperty.rejectTitle"),
      text: t("manageProperty.rejectText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t("manageProperty.rejectConfirmBtn"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updatePropertyStatus({ propertyId, status: "rejected" }));
        Swal.fire(
          t("manageProperty.rejectSuccessTitle"),
          t("manageProperty.rejectSuccessText"),
          "info"
        );
      }
    });
  };

  const handleDelete = (propertyId) => {
    Swal.fire({
      title: t("manageProperty.deleteTitle"),
      text: t("manageProperty.deleteText"),
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("manageProperty.deleteConfirmBtn"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProperty(propertyId));
        Swal.fire(
          t("manageProperty.deleteSuccessTitle"),
          t("manageProperty.deleteSuccessText"),
          "success"
        );
      }
    });
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedProperty(null);
  };

  const handlePageChange = (event, value) => {
    dispatch(setPage({ page: value }));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom component="h1">
        {t("manageProperty.title")}
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

      {(statusUpdateLoading || deleteLoading) && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {t("manageProperty.processing")}
        </Alert>
      )}

      {!loading && properties.length === 0 && (
        <Alert severity="info">{t("manageProperty.noPendingProperties")}</Alert>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <Card
              raised
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              {property.photos && property.photos.length > 0 ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={property.photos[0].url}
                  alt={property.propertyNumber}
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
                  {t("manageProperty.noPhoto")}
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {t("manageProperty.propertyNumber")} #{property.propertyNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>{t("manageProperty.type")}:</strong> {property.type?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>{t("manageProperty.operation")}:</strong> {property.typeOperation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>{t("manageProperty.status")}:</strong>{" "}
                  {property.status ? property.status.toUpperCase() : "N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>{t("manageProperty.location")}:</strong> {property.location?.city},{" "}
                  {property.location?.governorate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>{t("manageProperty.price")}:</strong> {property.price}
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
                  onClick={() => handleViewDetails(property)}
                >
                  {t("manageProperty.viewDetails")}
                </Button>
                <Box>
                  {property.status === "pending" && (
                    <>
                      <Button
                        size="small"
                        color="success"
                        startIcon={<ApproveIcon />}
                        onClick={() => handleApprove(property.id)}
                        disabled={statusUpdateLoading || deleteLoading}
                      >
                        {t("manageProperty.approve")}
                      </Button>
                      <Button
                        size="small"
                        color="warning"
                        startIcon={<RejectIcon />}
                        onClick={() => handleReject(property.id)}
                        disabled={statusUpdateLoading || deleteLoading}
                      >
                        {t("manageProperty.reject")}
                      </Button>
                    </>
                  )}
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(property.id)}
                    disabled={statusUpdateLoading || deleteLoading}
                  >
                    {t("manageProperty.delete")}
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <Pagination
            count={pagination.pageCount}
            page={pagination.page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {selectedProperty && (
        <PropertyDetailsModal
          open={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          property={selectedProperty}
        />
      )}
    </Container>
  );
}

export default ManagePropertyPage;