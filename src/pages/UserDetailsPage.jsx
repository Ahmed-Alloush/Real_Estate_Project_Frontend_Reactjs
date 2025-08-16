import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getUserById, // Placeholder for the new thunk
  // You will also need to create thunks for ban/warn actions
} from '../redux/auth/authSlice';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Modal,
  TextField,
  Card,
  CardContent,
  Chip,
  Alert,
  AlertTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

const StyledModalPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  padding: theme.spacing(4),
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const UserDetailsPage = () => {
  const { id } = useParams(); // Get the 'id' from the URL
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(
    (state) => state.auth // Assuming the fetched user is stored in 'user'
  );
  
  // State for admin actions modal
  const [openBanModal, setOpenBanModal] = useState(false);
  const [openWarnModal, setOpenWarnModal] = useState(false);
  const [warnReason, setWarnReason] = useState('');
  const [banReason, setBanReason] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id)); // Dispatch the new thunk with the 'id'
    }
  }, [dispatch, id]);

  const handleBanUser = () => {
    // Dispatch a thunk to ban the user
    // e.g., dispatch(banUser({ id: user.id, reason: banReason }));
    console.log(`Banning user ${user.id} for reason: ${banReason}`);
    setOpenBanModal(false);
  };

  const handleWarnUser = () => {
    // Dispatch a thunk to warn the user
    // e.g., dispatch(warnUser({ id: user.id, reason: warnReason }));
    console.log(`Warning user ${user.id} with reason: ${warnReason}`);
    setOpenWarnModal(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="info">
          <AlertTitle>No User Found</AlertTitle>
          The user with ID {id} was not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              alt={`${user.first_name} ${user.last_name}`}
              src={user.profile_photo?.url}
              sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h5" component="h1" gutterBottom>
              {user.first_name} {user.last_name}
            </Typography>
            <Chip
              label={user.role}
              color={user.role === 'superAdmin' ? 'secondary' : 'primary'}
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, my: 2 }}>
              <Button
                variant="contained"
                color="warning"
                startIcon={<WarningIcon />}
                onClick={() => setOpenWarnModal(true)}
              >
                Warn User
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<BlockIcon />}
                onClick={() => setOpenBanModal(true)}
              >
                Ban User
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Email" secondary={user.email} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Phone" secondary={user.phone} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="National Number" secondary={user.national_number} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Verification Status" secondary={
                  <Chip
                    label={user.is_verified ? 'Verified' : 'Not Verified'}
                    icon={user.is_verified ? <CheckCircleIcon /> : <DoNotDisturbAltIcon />}
                    color={user.is_verified ? 'success' : 'error'}
                    size="small"
                  />
                } />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Ban Status" secondary={
                  user.banned ? (
                    <Chip
                      label={`Banned until ${new Date(user.banned.ban_end_time).toLocaleDateString()}`}
                      color="error"
                      size="small"
                    />
                  ) : (
                    <Chip label="Active" color="success" size="small" />
                  )
                } />
              </ListItem>
              <Divider />
            </List>
          </Grid>
        </Grid>
        
        {user.userWarnings && user.userWarnings.warnings.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              User Warnings ({user.userWarnings.report_counts})
            </Typography>
            <Grid container spacing={2}>
              {user.userWarnings.warnings.map((warning, index) => (
                <Grid item xs={12} sm={6} md={4} key={warning.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Warning #{index + 1}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Reason:</strong> {warning.reason}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        <strong>End Time:</strong> {new Date(warning.warn_end_time).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Ban User Modal */}
      <Modal open={openBanModal} onClose={() => setOpenBanModal(false)}>
        <StyledModalPaper>
          <Typography variant="h6">Ban User</Typography>
          <TextField
            label="Reason for banning"
            multiline
            rows={4}
            fullWidth
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
          />
          <Button variant="contained" color="error" onClick={handleBanUser}>
            Confirm Ban
          </Button>
        </StyledModalPaper>
      </Modal>

      {/* Warn User Modal */}
      <Modal open={openWarnModal} onClose={() => setOpenWarnModal(false)}>
        <StyledModalPaper>
          <Typography variant="h6">Warn User</Typography>
          <TextField
            label="Reason for warning"
            multiline
            rows={4}
            fullWidth
            value={warnReason}
            onChange={(e) => setWarnReason(e.target.value)}
          />
          <Button variant="contained" color="warning" onClick={handleWarnUser}>
            Confirm Warning
          </Button>
        </StyledModalPaper>
      </Modal>
    </Container>
  );
};

export default UserDetailsPage;