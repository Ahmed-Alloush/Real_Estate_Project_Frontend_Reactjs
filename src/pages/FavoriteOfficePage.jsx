import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  fetchFavoriteOffices,
  deleteFavoriteOffice,
  deleteAllFavoriteOffices,
} from '../redux/office/officeSlice';

const FavoriteOfficePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    favoriteOffices,
    favoriteOfficesLoading,
    favoriteOfficesError,
  } = useSelector((state) => state.office);

  useEffect(() => {
    dispatch(fetchFavoriteOffices());
  }, [dispatch]);

  const handleDeleteFavorite = (officeId) => {
    if (window.confirm('Are you sure you want to remove this office from your favorites?')) {
      dispatch(deleteFavoriteOffice(officeId));
    }
  };

  const handleClearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all offices from your favorites?')) {
      dispatch(deleteAllFavoriteOffices());
    }
  };

  const handleViewOffice = (officeId) => {
    navigate(`/offices/${officeId}`);
  };

  return (
    <Container sx={{ mt: 4, pb: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Favorite Offices
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
        {favoriteOffices.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearAllFavorites}
            disabled={favoriteOfficesLoading}
          >
            Clear All Favorites
          </Button>
        )}
      </Box>

      {favoriteOfficesLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {favoriteOfficesError && (
        <Alert severity="error" sx={{ mt: 4 }}>
          Error loading favorite offices: {favoriteOfficesError?.message || 'Unknown error'}
        </Alert>
      )}

      {!favoriteOfficesLoading && !favoriteOfficesError && favoriteOffices.length === 0 && (
        <Alert severity="info" sx={{ mt: 4 }}>
          You have no favorite offices yet.
        </Alert>
      )}

      <Grid container spacing={3}>
        {favoriteOffices.map((favoriteItem) => (
          <Grid item xs={12} sm={6} md={4} key={favoriteItem.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={favoriteItem.office?.office_photo?.url || 'https://via.placeholder.com/200'}
                alt={favoriteItem.office.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" component="div">
                    {favoriteItem.office.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' ,ml:1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Favorite
                    </Typography>
                    <FavoriteIcon color="error" sx={{ mr: 0.5 }} />
                  </Box>
                </Box>
                {/* <Typography variant="body2" color="text.secondary">
                  Location: {favoriteItem.office.location?.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Space: {favoriteItem.office.space} m²
                </Typography> */}
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleViewOffice(favoriteItem.office.id)}
                >
                  View Details
                </Button>
                <IconButton
                  aria-label="remove from favorites"
                  onClick={() => handleDeleteFavorite(favoriteItem.office.id)}
                  disabled={favoriteOfficesLoading}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoriteOfficePage;