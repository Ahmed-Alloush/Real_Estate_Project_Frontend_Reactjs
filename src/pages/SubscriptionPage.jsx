// // import React, { useEffect } from 'react';
// // import {
// //   Container,
// //   Typography,
// //   Grid,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   Button,
// //   CircularProgress,
// //   Box,
// //   Alert,
// // } from '@mui/material';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getAllSubscriptions } from '../redux/subscription/subscriptionSlice'; // Adjust the path as needed
// // import { useNavigate } from 'react-router-dom';

// // function SubscriptionPage() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const { subscriptions, loading, error } = useSelector((state) => state.subscription);

// //   useEffect(() => {
// //     dispatch(getAllSubscriptions());
// //   }, [dispatch]);

// //   return (
// //     <Container maxWidth="lg" sx={{ mt: 6 }}>
// //       <Typography variant="h4" align="center" gutterBottom>
// //         Choose the Right Subscription Plan for You
// //       </Typography>

// //       {loading && (
// //         <Box display="flex" justifyContent="center" mt={4}>
// //           <CircularProgress />
// //         </Box>
// //       )}

// //       {error && (
// //         <Box my={3}>
// //           <Alert severity="error">{error}</Alert>
// //         </Box>
// //       )}

// //       <Grid container spacing={4} mt={2}>
// //         {subscriptions.map((sub) => (
// //           <Grid item xs={12} sm={6} md={4} lg={3} key={sub.id}>
// //             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
// //               <CardContent>
// //                 <Typography variant="h6" gutterBottom>
// //                   {sub.name}
// //                 </Typography>
// //                 <Typography variant="h5" color="primary" gutterBottom>
// //                   ${sub.price}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary" gutterBottom>
// //                   {sub.description}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   <strong>Properties:</strong> {sub.propertyNumber}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   <strong>Promotions:</strong> {sub.numberOfPromotion}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   <strong>Duration:</strong> {sub.duration}
// //                 </Typography>
// //               </CardContent>
// //               <CardActions sx={{ mt: 'auto', justifyContent: 'center', mb: 1 }}>
// //                 <Button
// //                   variant="contained"
// //                   size="small"
// //                   color="primary"
// //                   onClick={() => navigate(`/subscribe/${sub.id}`)}
// //                 >
// //                   Subscribe Now
// //                 </Button>
// //               </CardActions>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Container>
// //   );
// // }

// // export default SubscriptionPage;



// import React, { useEffect } from 'react';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   CircularProgress,
//   Box,
//   Alert,
//   Tooltip,
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllSubscriptions } from '../redux/subscription/subscriptionSlice';
// import { useNavigate } from 'react-router-dom';

// function SubscriptionPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { subscriptions, loading, error } = useSelector((state) => state.subscription);
//   const { UserOffice } = useSelector((state) => state.office);

//   useEffect(() => {
//     dispatch(getAllSubscriptions());
//   }, [dispatch]);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
//       <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
//         Choose Your Subscription Plan
//       </Typography>
//       <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
//         Pick the plan that best suits your office's needs.
//       </Typography>

//       {loading && (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       )}

//       {error && (
//         <Box my={3}>
//           <Alert severity="error">{error}</Alert>
//         </Box>
//       )}

//       <Grid container spacing={4} mt={3}>
//         {subscriptions.map((sub) => {
//           const isPopular = sub.name.toLowerCase().includes("premium") || sub.name.toLowerCase().includes("pro");
//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={sub.id}>
//               <Card
//                 elevation={6}
//                 sx={{
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   borderRadius: 4,
//                   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                   '&:hover': {
//                     transform: 'scale(1.05)',
//                     boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
//                   },
//                   position: 'relative',
//                   border: isPopular ? '2px solid #1976d2' : '1px solid #e0e0e0',
//                   backgroundColor: isPopular ? '#f0f8ff' : 'white',
//                 }}
//               >
//                 {isPopular && (
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: 12,
//                       right: 12,
//                       backgroundColor: '#1976d2',
//                       color: 'white',
//                       px: 1.5,
//                       py: 0.5,
//                       borderRadius: 2,
//                       fontSize: 12,
//                       fontWeight: 600,
//                       zIndex: 1,
//                     }}
//                   >
//                     Popular
//                   </Box>
//                 )}
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom fontWeight="bold">
//                     {sub.name}
//                   </Typography>
//                   <Typography variant="h4" color="primary" gutterBottom>
//                     ${sub.price}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     {sub.description}
//                   </Typography>
//                   <Box mt={2}>
//                     <Typography variant="body2" color="text.primary">
//                       🏠 <strong>Properties:</strong> {sub.propertyNumber}
//                     </Typography>
//                     <Typography variant="body2" color="text.primary">
//                       🚀 <strong>Promotions:</strong> {sub.numberOfPromotion}
//                     </Typography>
//                     <Typography variant="body2" color="text.primary">
//                       ⏳ <strong>Duration:</strong> {sub.duration}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//                 <CardActions sx={{ mt: 'auto', justifyContent: 'center', mb: 2 }}>
//                   <Tooltip title="Click to activate this plan">
//                     <Button
//                       variant="contained"
//                       size="medium"
//                       color="primary"
//                       sx={{
//                         fontWeight: 'bold',
//                         px: 3,
//                         py: 1,
//                         borderRadius: 2,
//                         textTransform: 'none',
//                         backgroundColor: '#1976d2',
//                         '&:hover': {
//                           backgroundColor: '#115293',
//                         },
//                       }}
//                       onClick={() => navigate(`/subscribe/${sub.id}`)}
//                     >
//                       Subscribe Now
//                     </Button>
//                   </Tooltip>
//                 </CardActions>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Container>
//   );
// }

// export default SubscriptionPage;




import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Box,
  Alert,
  Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubscriptions } from '../redux/subscription/subscriptionSlice';
import { useNavigate } from 'react-router-dom';

function SubscriptionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subscriptions, loading, error } = useSelector((state) => state.subscription);
  const { UserOffice } = useSelector((state) => state.office);

  useEffect(() => {
    dispatch(getAllSubscriptions());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
        Choose Your Subscription Plan
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
        Pick the plan that best suits your office's needs.
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box my={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <Grid container spacing={4} mt={3}>
        {subscriptions.map((sub) => {
          const isPopular = sub.name.toLowerCase().includes("premium") || sub.name.toLowerCase().includes("pro");
          const isCurrentSubscription =
            UserOffice?.officeSubscription?.subscription?.id === sub.id;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={sub.id}>
              <Card
                elevation={6}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: isCurrentSubscription ? 'none' : 'scale(1.05)',
                    boxShadow: isCurrentSubscription ? 'none' : '0 12px 24px rgba(0,0,0,0.2)',
                  },
                  position: 'relative',
                  border: isCurrentSubscription
                    ? '2px solid green'
                    : isPopular
                    ? '2px solid #1976d2'
                    : '1px solid #e0e0e0',
                  backgroundColor: isCurrentSubscription
                    ? '#e8f5e9'
                    : isPopular
                    ? '#f0f8ff'
                    : 'white',
                }}
              >
                {isPopular && !isCurrentSubscription && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      backgroundColor: '#1976d2',
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: 12,
                      fontWeight: 600,
                      zIndex: 1,
                    }}
                  >
                    Popular
                  </Box>
                )}

                {isCurrentSubscription && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      backgroundColor: 'green',
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: 12,
                      fontWeight: 600,
                      zIndex: 1,
                    }}
                  >
                    Current Plan
                  </Box>
                )}

                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {sub.name}
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    ${sub.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {sub.description}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body2" color="text.primary">
                      🏠 <strong>Properties:</strong> {sub.propertyNumber}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      🚀 <strong>Promotions:</strong> {sub.numberOfPromotion}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      ⏳ <strong>Duration:</strong> {sub.duration}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ mt: 'auto', justifyContent: 'center', mb: 2 }}>
                  <Tooltip
                    title={
                      isCurrentSubscription
                        ? 'You are already using this plan'
                        : 'Click to activate this plan'
                    }
                  >
                    <span>
                      <Button
                        variant="contained"
                        size="medium"
                        color={isCurrentSubscription ? 'success' : 'primary'}
                        disabled={isCurrentSubscription}
                        sx={{
                          fontWeight: 'bold',
                          px: 3,
                          py: 1,
                          borderRadius: 2,
                          textTransform: 'none',
                          backgroundColor: isCurrentSubscription ? '#4caf50' : '#1976d2',
                          '&:hover': {
                            backgroundColor: isCurrentSubscription ? '#4caf50' : '#115293',
                          },
                        }}
                        onClick={() =>
                          !isCurrentSubscription && navigate(`/subscribe/${sub.id}`)
                        }
                      >
                        {isCurrentSubscription ? 'Current Plan' : 'Subscribe Now'}
                      </Button>
                    </span>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default SubscriptionPage;
