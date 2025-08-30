// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {
//   getUserById, // Placeholder for the new thunk
//   // You will also need to create thunks for ban/warn actions
// } from '../redux/auth/authSlice';
// import {
//   Container,
//   Typography,
//   CircularProgress,
//   Box,
//   Paper,
//   Grid,
//   Avatar,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Button,
//   Modal,
//   TextField,
//   Card,
//   CardContent,
//   Chip,
//   Alert,
//   AlertTitle,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import WarningIcon from '@mui/icons-material/Warning';
// import BlockIcon from '@mui/icons-material/Block';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

// const StyledModalPaper = styled(Paper)(({ theme }) => ({
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   padding: theme.spacing(4),
//   outline: 'none',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: theme.spacing(2),
// }));

// const UserDetailsPage = () => {
//   const { id } = useParams(); // Get the 'id' from the URL
//   const dispatch = useDispatch();
//   const { userById, loadingById, errorById } = useSelector(
//     (state) => state.auth // Assuming the fetched user is stored in 'user'
//   );
  
//   // State for admin actions modal
//   const [openBanModal, setOpenBanModal] = useState(false);
//   const [openWarnModal, setOpenWarnModal] = useState(false);
//   const [warnReason, setWarnReason] = useState('');
//   const [banReason, setBanReason] = useState('');

//   useEffect(() => {
//     if (id) {
//       dispatch(getUserById(id)); // Dispatch the new thunk with the 'id'
//     }
//   }, [dispatch, id]);

//   const handleBanUser = () => {
//     // Dispatch a thunk to ban the user
//     // e.g., dispatch(banUser({ id: user.id, reason: banReason }));
//     console.log(`Banning user ${userById.id} for reason: ${banReason}`);
//     setOpenBanModal(false);
//   };

//   const handleWarnUser = () => {
//     // Dispatch a thunk to warn the user
//     // e.g., dispatch(warnUser({ id: user.id, reason: warnReason }));
//     console.log(`Warning user ${userById.id} with reason: ${warnReason}`);
//     setOpenWarnModal(false);
//   };

//   if (loadingById) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (errorById) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Alert severity="error">
//           <AlertTitle>Error</AlertTitle>
//           {errorById}
//         </Alert>
//       </Container>
//     );
//   }

//   if (!userById) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Alert severity="info">
//           <AlertTitle>No User Found</AlertTitle>
//           The user with ID {id} was not found.
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
//             <Avatar
//               alt={`${userById.first_name} ${userById.last_name}`}
//               src={userById.profile_photo?.url}
//               sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
//             />
//             <Typography variant="h5" component="h1" gutterBottom>
//               {userById.first_name} {userById.last_name}
//             </Typography>
//             <Chip
//               label={userById.role}
//               color={userById.role === 'superAdmin' ? 'secondary' : 'primary'}
//               sx={{ mb: 1 }}
//             />
//             <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, my: 2 }}>
//               <Button
//                 variant="contained"
//                 color="warning"
//                 startIcon={<WarningIcon />}
//                 onClick={() => setOpenWarnModal(true)}
//               >
//                 Warn User
//               </Button>
//               <Button
//                 variant="contained"
//                 color="error"
//                 startIcon={<BlockIcon />}
//                 onClick={() => setOpenBanModal(true)}
//               >
//                 Ban User
//               </Button>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={8}>
//             <Typography variant="h6" gutterBottom>
//               User Information
//             </Typography>
//             <List>
//               <ListItem>
//                 <ListItemText primary="Email" secondary={userById.email} />
//               </ListItem>
//               <Divider />
//               <ListItem>
//                 <ListItemText primary="Phone" secondary={userById.phone} />
//               </ListItem>
//               <Divider />
//               <ListItem>
//                 <ListItemText primary="National Number" secondary={userById.national_number} />
//               </ListItem>
//               <Divider />
//               <ListItem>
//                 <ListItemText primary="Verification Status" secondary={
//                   <Chip
//                     label={userById.is_verified ? 'Verified' : 'Not Verified'}
//                     icon={userById.is_verified ? <CheckCircleIcon /> : <DoNotDisturbAltIcon />}
//                     color={userById.is_verified ? 'success' : 'error'}
//                     size="small"
//                   />
//                 } />
//               </ListItem>
//               <Divider />
//               <ListItem>
//                 <ListItemText primary="Ban Status" secondary={
//                   userById.banned ? (
//                     <Chip
//                       label={`Banned until ${new Date(userById.banned.ban_end_time).toLocaleDateString()}`}
//                       color="error"
//                       size="small"
//                     />
//                   ) : (
//                     <Chip label="Active" color="success" size="small" />
//                   )
//                 } />
//               </ListItem>
//               <Divider />
//             </List>
//           </Grid>
//         </Grid>
        
//         {userById.userWarnings && userById.userWarnings.warnings.length > 0 && (
//           <Box sx={{ mt: 4 }}>
//             <Typography variant="h6" gutterBottom>
//               User Warnings ({userById.userWarnings.report_counts})
//             </Typography>
//             <Grid container spacing={2}>
//               {userById.userWarnings.warnings.map((warning, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={warning.id}>
//                   <Card variant="outlined">
//                     <CardContent>
//                       <Typography variant="subtitle1" gutterBottom>
//                         Warning #{index + 1}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         <strong>Reason:</strong> {warning.reason}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         <strong>End Time:</strong> {new Date(warning.warn_end_time).toLocaleDateString()}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         )}
//       </Paper>

//       {/* Ban User Modal */}
//       <Modal open={openBanModal} onClose={() => setOpenBanModal(false)}>
//         <StyledModalPaper>
//           <Typography variant="h6">Ban User</Typography>
//           <TextField
//             label="Reason for banning"
//             multiline
//             rows={4}
//             fullWidth
//             value={banReason}
//             onChange={(e) => setBanReason(e.target.value)}
//           />
//           <Button variant="contained" color="error" onClick={handleBanUser}>
//             Confirm Ban
//           </Button>
//         </StyledModalPaper>
//       </Modal>

//       {/* Warn User Modal */}
//       <Modal open={openWarnModal} onClose={() => setOpenWarnModal(false)}>
//         <StyledModalPaper>
//           <Typography variant="h6">Warn User</Typography>
//           <TextField
//             label="Reason for warning"
//             multiline
//             rows={4}
//             fullWidth
//             value={warnReason}
//             onChange={(e) => setWarnReason(e.target.value)}
//           />
//           <Button variant="contained" color="warning" onClick={handleWarnUser}>
//             Confirm Warning
//           </Button>
//         </StyledModalPaper>
//       </Modal>
//     </Container>
//   );
// };

// export default UserDetailsPage;




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserById } from '../redux/auth/authSlice';
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
import { useTranslation } from 'react-i18next';
import { warnUser } from '../redux/superAdmin/superAdminSlice';

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
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userById, loadingById, errorById } = useSelector(
    (state) => state.auth
  );

  const [openBanModal, setOpenBanModal] = useState(false);
  const [openWarnModal, setOpenWarnModal] = useState(false);
  const [warnReason, setWarnReason] = useState('');
  const [banReason, setBanReason] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  const handleBanUser = () => {
    // Dispatch a thunk to ban the user
    console.log(`Banning user ${userById.id} for reason: ${banReason}`);
    setOpenBanModal(false);
  };

  const handleWarnUser = () => {
    // Dispatch a thunk to warn the user
    dispatch(warnUser({
      userId:userById.id,
      reason:warnReason,
    }))
    console.log(`Warning user ${userById.id} with reason: ${warnReason}`);
    setOpenWarnModal(false);
  };

  if (loadingById) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>{t('userDetails.loading')}</Typography>
      </Box>
    );
  }

  if (errorById) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          <AlertTitle>{t('userDetails.errors.errorTitle')}</AlertTitle>
          {t('userDetails.errors.somethingWentWrong')}
        </Alert>
      </Container>
    );
  }

  if (!userById) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="info">
          <AlertTitle>{t('userDetails.errors.noUserFoundTitle')}</AlertTitle>
          {t('userDetails.errors.noUserFoundMessage', { id })}
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
              alt={`${userById.first_name} ${userById.last_name}`}
              src={userById.profile_photo?.url}
              sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h5" component="h1" gutterBottom>
              {userById.first_name} {userById.last_name}
            </Typography>
            <Chip
              label={userById.role}
              color={userById.role === 'superAdmin' ? 'secondary' : 'primary'}
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, my: 2 }}>
              <Button
                variant="contained"
                color="warning"
                startIcon={<WarningIcon />}
                onClick={() => setOpenWarnModal(true)}
              >
                {t('userDetails.info.warnUserButton')}
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<BlockIcon />}
                onClick={() => setOpenBanModal(true)}
              >
                {t('userDetails.info.banUserButton')}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              {t('userDetails.info.userInformation')}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={t('userDetails.info.email')}
                  secondary={userById.email}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={t('userDetails.info.phone')}
                  secondary={userById.phone}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={t('userDetails.info.nationalNumber')}
                  secondary={userById.national_number}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={t('userDetails.info.verificationStatus')}
                  secondary={
                    <Chip
                      label={
                        userById.is_verified
                          ? t('userDetails.info.verified')
                          : t('userDetails.info.notVerified')
                      }
                      icon={userById.is_verified ? <CheckCircleIcon /> : <DoNotDisturbAltIcon />}
                      color={userById.is_verified ? 'success' : 'error'}
                      size="small"
                    />
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={t('userDetails.info.banStatus')}
                  secondary={
                    userById.banned ? (
                      <Chip
                        label={t('userDetails.info.bannedUntil', {
                          date: new Date(userById.banned.ban_end_time).toLocaleDateString(),
                        })}
                        color="error"
                        size="small"
                      />
                    ) : (
                      <Chip label={t('userDetails.info.active')} color="success" size="small" />
                    )
                  }
                />
              </ListItem>
              <Divider />
            </List>
          </Grid>
        </Grid>

        {userById.userWarnings && userById.userWarnings.warnings.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t('userDetails.info.userWarningsTitle', { count: userById.userWarnings.report_counts })}
            </Typography>
            <Grid container spacing={2}>
              {userById.userWarnings.warnings.map((warning, index) => (
                <Grid item xs={12} sm={6} md={4} key={warning.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {t('userDetails.info.warningNumber', { number: index + 1 })}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>{t('userDetails.info.reason')}:</strong> {warning.reason}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        <strong>{t('userDetails.info.endTime')}:</strong> {new Date(warning.warn_end_time).toLocaleDateString()}
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
          <Typography variant="h6">{t('userDetails.info.modal.banTitle')}</Typography>
          <TextField
            label={t('userDetails.info.modal.banReasonLabel')}
            multiline
            rows={4}
            fullWidth
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
          />
          <Button variant="contained" color="error" onClick={handleBanUser}>
            {t('userDetails.info.modal.confirmBanButton')}
          </Button>
        </StyledModalPaper>
      </Modal>

      {/* Warn User Modal */}
      <Modal open={openWarnModal} onClose={() => setOpenWarnModal(false)}>
        <StyledModalPaper>
          <Typography variant="h6">{t('userDetails.info.modal.warnTitle')}</Typography>
          <TextField
            label={t('userDetails.info.modal.warnReasonLabel')}
            multiline
            rows={4}
            fullWidth
            value={warnReason}
            onChange={(e) => setWarnReason(e.target.value)}
          />
          <Button variant="contained" color="warning" onClick={handleWarnUser}>
            {t('userDetails.info.modal.confirmWarnButton')}
          </Button>
        </StyledModalPaper>
      </Modal>
    </Container>
  );
};

export default UserDetailsPage;