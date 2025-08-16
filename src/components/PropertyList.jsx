// import React from "react";
// import {
//   Button,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   CardMedia,
//   Box,
//   Stack,
//   Divider,
//   Chip,
//   CircularProgress,
// } from "@mui/material";

// const PropertyList = ({
//   properties = [],
//   onDelete,
//   canDelete = false,
//   isDeleteLoading,
// }) => {
//   return (
//     <>
//       {/* Overlay loading screen */}
//       {isDeleteLoading && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "300px",
//             padding: 4,
//             bgcolor: "rgba(0, 0, 0, 0.8)",
//             borderRadius: 2,
//             zIndex: 9999,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center",
//           }}
//         >
//           <Box textAlign="center">
//             <CircularProgress color="inherit" />
//             <Typography variant="h6" color="white" mt={2}>
//               Deleting property...
//             </Typography>
//           </Box>
//         </Box>
//       )}

//       {/* Property Cards Grid */}
//       <Grid container spacing={3}>
//         {properties.map((property) => {
//           const firstPhoto = property.photos?.[0]?.url;
//           const location = property.location;
//           const attributes = property.propertyAttributes || [];

//           return (
//             <Grid item key={property.id} xs={12} sm={6} md={4}>
//               <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
//                 {firstPhoto && (
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={firstPhoto}
//                     alt="Property Image"
//                     sx={{ objectFit: "cover" }}
//                   />
//                 )}
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     {property.propertyNumber}
//                   </Typography>

//                   <Stack
//                     direction="row"
//                     spacing={1}
//                     justifyContent="space-between"
//                   >
//                     <Typography variant="body2" color="text.secondary">
//                       Type: <strong>{property.type?.name}</strong>
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Price: <strong>{property.price} $</strong>
//                     </Typography>
//                   </Stack>

//                   <Typography variant="body2" mt={1}>
//                     {property.description}
//                   </Typography>

//                   <Divider sx={{ my: 1 }} />

//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Location:
//                     </Typography>
//                     <Typography variant="body2">
//                       {location?.city}, {location?.governorate}
//                     </Typography>
//                   </Box>

//                   <Divider sx={{ my: 1 }} />

//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Attributes:
//                     </Typography>
//                     <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
//                       {attributes.length > 0 ? (
//                         attributes.map((attr) => (
//                           <Chip
//                             key={attr.id}
//                             label={`${attr.attribute.name}: ${attr.value}`}
//                             variant="outlined"
//                             color="primary"
//                             size="small"
//                             sx={{ mb: 1 }}
//                           />
//                         ))
//                       ) : (
//                         <Typography variant="body2">No attributes</Typography>
//                       )}
//                     </Stack>
//                   </Box>
//                 </CardContent>

//                 <CardActions>
//                   {canDelete ? (
//                     <Button
//                       variant="outlined"
//                       color="error"
//                       fullWidth
//                       onClick={() => onDelete(property.id)}
//                     >
//                       Delete
//                     </Button>
//                   ) : (
//                     <Box width="100%" textAlign="center">
//                       <Typography variant="caption" color="text.secondary">
//                         Explore more details on this property.
//                       </Typography>
//                     </Box>
//                   )}
//                 </CardActions>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </>
//   );
// };

// export default PropertyList;

// src/components/PropertyList.jsx (or wherever your PropertyList is)
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Box,
  Stack,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";

const PropertyList = ({
  properties = [],
  onDelete, // Keep onDelete for cases where you might still need it
  onUpdate,
  onSendRequest,
  canDelete = false,
  isDeleteLoading,
  loading = false,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const handleCardClick = (propertyId) => {
    // Navigate to the property details page using the property's ID
    // Ensure this route matches your router setup (e.g., /properties/:propertyId)
    navigate(`/properties/${propertyId}`);
  };

  return (
    <>
      {/* Overlay loading screen (for delete, if applicable) */}
      {isDeleteLoading && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            padding: 4,
            bgcolor: "rgba(0, 0, 0, 0.8)",
            borderRadius: 2,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box textAlign="center">
            <CircularProgress color="inherit" />
            <Typography variant="h6" color="white" mt={2}>
              Deleting property...
            </Typography>
          </Box>
        </Box>
      )}

      {loading && (
        <Box textAlign="center" m={"50%"} bgcolor={"black"}>
          <CircularProgress />
        </Box>
      )}

      {/* Property Cards Grid */}
      <Grid container spacing={3}>
        {properties.map((property) => {
          const firstPhoto = property.photos?.[0]?.url;
          const location = property.location;
          const attributes = property.propertyAttributes || [];

          return (
            <Grid item key={property.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 4,
                  cursor: "pointer", // Indicate that the card is clickable
                  "&:hover": {
                    boxShadow: 8, // Add a hover effect
                  },
                  height: "100%", // Ensure cards have consistent height
                  display: "flex",
                  flexDirection: "column",
                }}
                // Add the onClick handler to the entire card
                onClick={() => handleCardClick(property.id)}
              >
                {firstPhoto && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={firstPhoto}
                    alt="Property Image"
                    sx={{ objectFit: "cover" }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  {" "}
                  {/* Allow content to grow */}
                  <Typography variant="h6" gutterBottom>
                    {property.propertyNumber}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                  >
                    <Typography variant="body2" color="text.secondary">
                      Type: <strong>{property.type?.name}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: <strong>{property.price} $</strong>
                    </Typography>
                  </Stack>
                  <Typography variant="body2" mt={1} noWrap>
                    {" "}
                    {/* Added noWrap for long descriptions */}
                    {property.description}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Location:
                    </Typography>
                    <Typography variant="body2">
                      {location?.city}, {location?.governorate}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Attributes:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                      {attributes.length > 0 ? (
                        attributes.map((attr) => (
                          <Chip
                            key={attr.id}
                            label={`${attr.attribute.name}: ${attr.value}`}
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        ))
                      ) : (
                        <Typography variant="body2">No attributes</Typography>
                      )}
                    </Stack>
                  </Box>
                </CardContent>

                <CardActions sx={{ mt: "auto" }}>
                  {" "}
                  {/* Push actions to bottom */}
                  {/* The delete button should prevent event bubbling to the card click */}
                  {canDelete ? (
                    <>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation(); // Stop the card's onClick from firing
                          navigate(`/delete-property/${property?.id}`)
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation(); // Stop the card's onClick from firing
                          navigate(`/update-property/${property?.id}`)
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation(); // Stop the card's onClick from firing
                          // Pass the entire property object to the handler
                          onSendRequest(property);
                        }}
                      >
                        Send Request
                      </Button>
                    </>
                  ) : (
                    // This section is now less relevant as the whole card is clickable
                    <Box width="100%" textAlign="center">
                      <Typography variant="caption" color="text.secondary">
                        Click for more details.
                      </Typography>
                    </Box>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default PropertyList;
