import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { getUserProperties } from '../redux/auth/authSlice'; // Adjust the import path
import { createPropertyComplaint } from '../redux/superAdmin/managePropertyComplaintSlice';


function UserPropertiesPage() {
  const dispatch = useDispatch();
  const { userProperties, userPropertiesLoading, userPropertiesError } = useSelector((state) => state.auth);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [complaintData, setComplaintData] = useState({
    title: '',
    content: '',
    complaint_media: [],
  });

  useEffect(() => {
    dispatch(getUserProperties());
  }, [dispatch]);

  const handleOpenDialog = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPropertyId(null);
    setComplaintData({
      title: '',
      content: '',
      complaint_media: [],
    });
  };

  const handleFileChange = (e) => {
    setComplaintData({
      ...complaintData,
      complaint_media: Array.from(e.target.files),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaintData({ ...complaintData, [name]: value });
  };

  const handleSubmitComplaint = async () => {
    if (!complaintData.title || !complaintData.content) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('propertyId', selectedPropertyId);
    formData.append('title', complaintData.title);
    formData.append('content', complaintData.content);
    
    complaintData.complaint_media.forEach(file => {
      formData.append('complaint_media', file);
    });
    
    try {
      await dispatch(createPropertyComplaint({ formData })).unwrap();
      alert('Complaint submitted successfully!');
      handleCloseDialog();
    } catch (error) {
      alert(`Failed to submit complaint: ${error.message || 'Unknown error'}`);
    }
  };

  if (userPropertiesLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (userPropertiesError) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{userPropertiesError}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        My Properties
      </Typography>

      {userProperties.length === 0 ? (
        <Alert severity="info" sx={{ mt: 4 }}>
          You have no properties associated with your account.
        </Alert>
      ) : (
        <Grid container spacing={4}>
          {userProperties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={property.propertyPhotos?.[0]?.url || 'https://via.placeholder.com/400x200?text=No+Image'}
                  alt={property.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {property.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* **Address:** {property.location || 'N/A'} */}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    **Price:** ${property.price?.toLocaleString() || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    **Type:** {property.type || 'N/A'}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOpenDialog(property.id)}
                  >
                    Create Complaint
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Create Complaint
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={complaintData.title}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={complaintData.content}
            onChange={handleChange}
            required
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AddAPhotoIcon />}
              fullWidth
            >
              Upload Photos
              <input
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Box>
          <Box sx={{ mt: 1 }}>
            {complaintData.complaint_media.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                {complaintData.complaint_media.length} file(s) selected
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitComplaint} variant="contained" color="primary">
            Submit Complaint
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UserPropertiesPage;