// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActionArea,
//   CircularProgress,
//   Alert,
//   Box,
// } from '@mui/material';
// import { fetchFavoriteProperties } from '../redux/property/propertySlice';

// function FavoritePropertyPage() {
//   const dispatch = useDispatch();
//   const {
//     favoriteProperties,
//     favoritePropertiesLoading,
//     favoritePropertiesError,
//   } = useSelector((state) => state.property);

//   useEffect(() => {
//     dispatch(fetchFavoriteProperties());
//   }, [dispatch]);

//   const getFirstImageUrl = (property) => {
//     // Assuming the API response for a single property has a 'photos' array.
//     // If the data structure is different, you may need to adjust this.
//     // The provided slice has a 'property' object, but no 'photos' in the example favorite property object.
//     // We'll assume the full property object (like in PropertyDetailsPage) would be available here.
//     return property.photos?.[0]?.url || 'https://via.placeholder.com/400x300.png?text=No+Image+Available';
//   };

//   if (favoritePropertiesLoading) {
//     return (
//       <Container sx={{ mt: 6, textAlign: 'center' }}>
//         <CircularProgress />
//         <Typography mt={2}>Loading favorite properties...</Typography>
//       </Container>
//     );
//   }

//   if (favoritePropertiesError) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="error">
//           Error loading favorite properties: {favoritePropertiesError.message || 'An unknown error occurred.'}
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container sx={{ mt: 4, pb: 6 }}>
//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         My Favorite Properties
//       </Typography>

//       {favoriteProperties.length === 0 ? (
//         <Alert severity="info" sx={{ mt: 3 }}>
//           You don't have any favorite properties yet.
//         </Alert>
//       ) : (
//         <Grid container spacing={4} sx={{ mt: 2 }}>
//           {favoriteProperties.map((favoriteItem) => {
//             const property = favoriteItem.property;
//             return (
//               <Grid item key={property.id} xs={12} sm={6} md={4}>
//                 <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                   <CardActionArea component={Link} to={`/properties/${property.id}`} sx={{ flexGrow: 1 }}>
//                     <CardMedia
//                       component="img"
//                       height="200"
//                       image={getFirstImageUrl(property)}
//                       alt={`Image of property number ${property.propertyNumber}`}
//                     />
//                     <CardContent>
//                       <Typography variant="h6" fontWeight="bold" noWrap>
//                         Property #{property.propertyNumber}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                         Operation: {property.typeOperation}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Space: {property.space} m²
//                       </Typography>
//                       <Typography variant="body1" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
//                         Price: {property.price}
//                       </Typography>
//                     </CardContent>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       )}
//     </Container>
//   );
// }

// export default FavoritePropertyPage;



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CircularProgress,
  Alert,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  fetchFavoriteProperties,
  deleteAllFavoriteProperties,
  deleteFavoriteProperty,
} from '../redux/property/propertySlice';

function FavoritePropertyPage() {
  const dispatch = useDispatch();
  const {
    favoriteProperties,
    favoritePropertiesLoading,
    favoritePropertiesError,
    favoriteActionLoading, // New state for action loading
    favoriteActionError, // New state for action errors
  } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(fetchFavoriteProperties());
  }, [dispatch]);

  const handleClearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorite properties?')) {
      dispatch(deleteAllFavoriteProperties());
    }
  };

  const handleDeleteFavoriteProperty = (propertyId) => {
    if (window.confirm('Are you sure you want to remove this property from your favorites?')) {
      dispatch(deleteFavoriteProperty(propertyId));
    }
  };

  const getFirstImageUrl = (property) => {
    return (
      property?.photos?.[0]?.url ||
      'https://via.placeholder.com/400x300.png?text=No+Image+Available'
    );
  };

  if (favoritePropertiesLoading) {
    return (
      <Container sx={{ mt: 6, textAlign: 'center' }}>
        <CircularProgress />
        <Typography mt={2}>Loading favorite properties...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, pb: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          My Favorite Properties
        </Typography>
        {favoriteProperties.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleClearAllFavorites}
            disabled={favoriteActionLoading}
          >
            Clear All
          </Button>
        )}
      </Box>

      {favoritePropertiesError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading favorite properties: {favoritePropertiesError.message || 'An unknown error occurred.'}
        </Alert>
      )}

      {favoriteActionError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error performing action: {favoriteActionError.message || 'An unknown error occurred.'}
        </Alert>
      )}

      {favoriteProperties.length === 0 ? (
        <Alert severity="info" sx={{ mt: 3 }}>
          You don't have any favorite properties yet.
        </Alert>
      ) : (
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {favoriteProperties.map((favoriteItem) => {
            const property = favoriteItem.property;
            return (
              <Grid item key={property.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardActionArea
                      component={Link}
                      to={`/properties/${property.id}`}
                      sx={{ flexGrow: 1 }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={getFirstImageUrl(property)}
                        alt={`Image of property number ${property.propertyNumber}`}
                      />
                    </CardActionArea>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteFavoriteProperty(property.id)}
                      disabled={favoriteActionLoading}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        },
                      }}
                    >
                      {favoriteActionLoading ? (
                        <CircularProgress size={24} color="error" />
                      ) : (
                        <DeleteIcon color="error" />
                      )}
                    </IconButton>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" noWrap>
                      Property #{property.propertyNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Operation: {property.typeOperation}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Space: {property.space} m²
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
                      Price: {property.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}

export default FavoritePropertyPage;