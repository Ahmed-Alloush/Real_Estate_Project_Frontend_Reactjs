// // // // // // src/components/PaymentPage.js
// // // // // import React, { useState } from 'react';
// // // // // import { StripeProvider } from '../contexts/StripeContext';
// // // // // import PaymentForm from '../components/PaymentForm';
// // // // // import './PaymentPage.css';

// // // // // const PaymentPage = () => {
// // // // //   const [paymentAmount, setPaymentAmount] = useState(50.00);
// // // // //   const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error
// // // // //   const [paymentResult, setPaymentResult] = useState(null);

// // // // //   const handlePaymentSuccess = (paymentIntent) => {
// // // // //     setPaymentStatus('success');
// // // // //     setPaymentResult(paymentIntent);

// // // // //     // Here you can:
// // // // //     // - Update your backend with the successful payment
// // // // //     // - Redirect to a success page
// // // // //     // - Show a success message
// // // // //     // - Update user's account/subscription status

// // // // //     console.log('Payment successful:', paymentIntent);
// // // // //   };

// // // // //   const handlePaymentError = (error) => {
// // // // //     setPaymentStatus('error');
// // // // //     setPaymentResult(error);

// // // // //     // Here you can:
// // // // //     // - Log the error to your backend
// // // // //     // - Show user-friendly error messages
// // // // //     // - Offer retry options

// // // // //     console.error('Payment failed:', error);
// // // // //   };

// // // // //   const resetPayment = () => {
// // // // //     setPaymentStatus('idle');
// // // // //     setPaymentResult(null);
// // // // //   };

// // // // //   if (paymentStatus === 'success') {
// // // // //     return (
// // // // //       <div className="payment-page">
// // // // //         <div className="payment-container">
// // // // //           <div className="payment-success-card">
// // // // //             <div className="success-icon">✓</div>
// // // // //             <h2>Payment Successful!</h2>
// // // // //             <p>Your payment of ${paymentAmount.toFixed(2)} has been processed successfully.</p>
// // // // //             <p><strong>Payment ID:</strong> {paymentResult.id}</p>
// // // // //             <button onClick={resetPayment} className="reset-button">
// // // // //               Make Another Payment
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="payment-page">
// // // // //       <div className="payment-container">
// // // // //         <h1>Complete Your Payment</h1>

// // // // //         <div className="amount-selector">
// // // // //           <label htmlFor="amount">Payment Amount:</label>
// // // // //           <select
// // // // //             id="amount"
// // // // //             value={paymentAmount}
// // // // //             onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
// // // // //             className="amount-select"
// // // // //           >
// // // // //             <option value={25.00}>$25.00</option>
// // // // //             <option value={50.00}>$50.00</option>
// // // // //             <option value={100.00}>$100.00</option>
// // // // //             <option value={200.00}>$200.00</option>
// // // // //           </select>
// // // // //         </div>

// // // // //         <StripeProvider>
// // // // //           <PaymentForm
// // // // //             amount={paymentAmount}
// // // // //             onPaymentSuccess={handlePaymentSuccess}
// // // // //             onPaymentError={handlePaymentError}
// // // // //           />
// // // // //         </StripeProvider>

// // // // //         {paymentStatus === 'error' && (
// // // // //           <div className="payment-error-card">
// // // // //             <h3>Payment Failed</h3>
// // // // //             <p>{paymentResult?.message || 'An error occurred while processing your payment.'}</p>
// // // // //             <button onClick={resetPayment} className="retry-button">
// // // // //               Try Again
// // // // //             </button>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PaymentPage;

// // // // import React, { useState } from "react";
// // // // import {
// // // //   Box,
// // // //   Typography,
// // // //   Button,
// // // //   Container,
// // // //   MenuItem,
// // // //   Select,
// // // //   InputLabel,
// // // //   FormControl,
// // // //   Paper,
// // // //   useTheme,
// // // // } from "@mui/material";
// // // // import { CheckCircleOutline } from "@mui/icons-material";

// // // // import { StripeProvider } from "../contexts/StripeContext";
// // // // import PaymentForm from "../components/PaymentForm";
// // // // import { useSelector } from "react-redux";

// // // // const PaymentPage = () => {
// // // //   const { property, loading, propertyError } = useSelector(
// // // //     (state) => state.property
// // // //   );

// // // //   const amount = property?.price / 100;
// // // //   // const [paymentAmount, setPaymentAmount] = useState(50.0);
// // // //   const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, processing, success, error
// // // //   const [paymentResult, setPaymentResult] = useState(null);
// // // //   const theme = useTheme();

// // // //   const handlePaymentSuccess = (paymentIntent) => {
// // // //     setPaymentStatus("success");
// // // //     setPaymentResult(paymentIntent);
// // // //   };

// // // //   const handlePaymentError = (error) => {
// // // //     setPaymentStatus("error");
// // // //     setPaymentResult(error);
// // // //     console.error("Payment failed:", error);
// // // //   };

// // // //   const resetPayment = () => {
// // // //     setPaymentStatus("idle");
// // // //     setPaymentResult(null);
// // // //   };

// // // //   const PaymentSuccessCard = () => (
// // // //     <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
// // // //       <CheckCircleOutline sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
// // // //       <Typography variant="h5" color="success.main" gutterBottom>
// // // //         Payment Successful!
// // // //       </Typography>
// // // //       <Typography variant="body1" gutterBottom>
// // // //         Your payment of ${paymentAmount.toFixed(2)} has been processed.
// // // //       </Typography>
// // // //       <Typography variant="body2" gutterBottom>
// // // //         <strong>Payment ID:</strong> {paymentResult.id}
// // // //       </Typography>
// // // //       <Button
// // // //         variant="contained"
// // // //         color="primary"
// // // //         onClick={resetPayment}
// // // //         sx={{ mt: 3 }}
// // // //       >
// // // //         Make Another Payment
// // // //       </Button>
// // // //     </Paper>
// // // //   );

// // // //   const PaymentErrorCard = () => (
// // // //     <Paper
// // // //       elevation={3}
// // // //       sx={{ p: 3, mt: 3, textAlign: "center", borderLeft: "5px solid red" }}
// // // //     >
// // // //       <Typography variant="h6" color="error" gutterBottom>
// // // //         Payment Failed
// // // //       </Typography>
// // // //       <Typography variant="body2" gutterBottom>
// // // //         {paymentResult?.message ||
// // // //           "An error occurred while processing your payment."}
// // // //       </Typography>
// // // //       <Button
// // // //         variant="contained"
// // // //         color="error"
// // // //         onClick={resetPayment}
// // // //         sx={{ mt: 2 }}
// // // //       >
// // // //         Try Again
// // // //       </Button>
// // // //     </Paper>
// // // //   );

// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         minHeight: "100vh",
// // // //         background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
// // // //         display: "flex",
// // // //         alignItems: "center",
// // // //         justifyContent: "center",
// // // //         p: 3,
// // // //       }}
// // // //     >
// // // //       <Container maxWidth="sm">
// // // //         {paymentStatus === "success" ? (
// // // //           <PaymentSuccessCard />
// // // //         ) : (
// // // //           <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
// // // //             <Typography
// // // //               variant="h4"
// // // //               textAlign="center"
// // // //               fontWeight="bold"
// // // //               gutterBottom
// // // //             >
// // // //               Complete Your Payment
// // // //             </Typography>

// // // //             <Box mt={4}>
// // // //               <StripeProvider>
// // // //                 <PaymentForm
// // // //                   amount={amount}
// // // //                   onPaymentSuccess={handlePaymentSuccess}
// // // //                   onPaymentError={handlePaymentError}
// // // //                 />
// // // //               </StripeProvider>
// // // //             </Box>

// // // //             {paymentStatus === "error" && <PaymentErrorCard />}
// // // //           </Paper>
// // // //         )}
// // // //       </Container>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default PaymentPage;

// // // // src/pages/PaymentPage.js
// // // import React, { useState } from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Button,
// // //   Container,
// // //   Paper,
// // //   useTheme,
// // // } from "@mui/material";
// // // import { CheckCircleOutline } from "@mui/icons-material";
// // // import { useSelector } from "react-redux";
// // // import PaymentForm from "../components/PaymentForm";

// // // const PaymentPage = () => {
// // //   const theme = useTheme();
// // //   const [paymentResult, setPaymentResult] = useState(null);
// // //   const [paymentStatus, setPaymentStatus] = useState("idle");

// // //   const { property } = useSelector((state) => state.property);
// // //   const amount = property?.price ? property.price / 100 : 0;
// // //   const propertyId = property?._id || property?.id;

// // //   const handlePaymentSuccess = (reservationData) => {
// // //     setPaymentStatus("success");
// // //     setPaymentResult(reservationData);
// // //   };

// // //   const resetPayment = () => {
// // //     setPaymentResult(null);
// // //     setPaymentStatus("idle");
// // //   };

// // //   const PaymentSuccessCard = () => (
// // //     <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
// // //       <CheckCircleOutline sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
// // //       <Typography variant="h5" color="success.main" gutterBottom>
// // //         Payment Successful!
// // //       </Typography>
// // //       <Typography variant="body1" gutterBottom>
// // //         Your reservation of ${amount.toFixed(2)} is confirmed.
// // //       </Typography>
// // //       <Typography variant="body2" gutterBottom>
// // //         <strong>Reservation ID:</strong> {paymentResult?._id}
// // //       </Typography>
// // //       <Button
// // //         variant="contained"
// // //         color="primary"
// // //         onClick={resetPayment}
// // //         sx={{ mt: 3 }}
// // //       >
// // //         Make Another Reservation
// // //       </Button>
// // //     </Paper>
// // //   );

// // //   return (
// // //     <Box
// // //       sx={{
// // //         minHeight: "100vh",
// // //         background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
// // //         display: "flex",
// // //         alignItems: "center",
// // //         justifyContent: "center",
// // //         p: 3,
// // //       }}
// // //     >
// // //       <Container maxWidth="sm">
// // //         {paymentStatus === "success" ? (
// // //           <PaymentSuccessCard />
// // //         ) : (
// // //           <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
// // //             <Typography
// // //               variant="h4"
// // //               textAlign="center"
// // //               fontWeight="bold"
// // //               gutterBottom
// // //             >
// // //               Complete Your Payment
// // //             </Typography>

// // //             <Box mt={4}>
// // //               <PaymentForm
// // //                 amount={amount}
// // //                 propertyId={propertyId}
// // //                 onPaymentSuccess={handlePaymentSuccess}
// // //               />
// // //             </Box>
// // //           </Paper>
// // //         )}
// // //       </Container>
// // //     </Box>
// // //   );
// // // };

// // // export default PaymentPage;

// // // src/pages/PaymentPage.js
// // import React, { useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Container,
// //   Paper,
// //   useTheme,
// // } from "@mui/material";
// // import { CheckCircleOutline } from "@mui/icons-material";
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom"; // Import useNavigate hook
// // import PaymentForm from "../components/PaymentForm";

// // const PaymentPage = () => {
// //   const theme = useTheme();
// //   const navigate = useNavigate(); // Initialize useNavigate hook

// //   const [paymentResult, setPaymentResult] = useState(null);
// //   const [paymentStatus, setPaymentStatus] = useState("idle");

// //   const { property } = useSelector((state) => state.property);
// //   // Ensure amount is a number and handle cases where it might be undefined or null
// //   const amount = property?.price ? property.price / 100 : 0;
// //   const propertyId = property?._id || property?.id;

// //   const handlePaymentSuccess = (reservationData) => {
// //     setPaymentStatus("success");
// //     setPaymentResult(reservationData);
// //   };

// //   const handleGoBack = () => {
// //     // This will navigate to the previous page in the browser history
// //     navigate(-1);
// //   };

// //   const handleCancelPayment = () => {
// //     // You can navigate to a specific page, e.g., the home page or a booking summary page
// //     navigate(-1); // Navigate to the home page (you can change this route)
// //     // Optionally, you might want to reset any payment-related state in Redux or local state
// //     // For example: dispatch(resetPaymentState());
// //   };

// //   const resetPayment = () => {
// //     setPaymentResult(null);
// //     setPaymentStatus("idle");
// //     // Optionally navigate to a new reservation page or back to property details
// //     // navigate("/some-other-reservation-start-page");
// //   };

// //   const PaymentSuccessCard = () => (
// //     <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
// //       <CheckCircleOutline sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
// //       <Typography variant="h5" color="success.main" gutterBottom>
// //         Payment Successful!
// //       </Typography>
// //       <Typography variant="body1" gutterBottom>
// //         Your reservation of **${amount.toFixed(2)}** is confirmed.
// //       </Typography>
// //       <Typography variant="body2" gutterBottom>
// //         **Reservation ID:** {paymentResult?._id}
// //       </Typography>
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         onClick={resetPayment}
// //         sx={{ mt: 3 }}
// //       >
// //         Make Another Reservation
// //       </Button>
// //     </Paper>
// //   );

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         p: 3,
// //       }}
// //     >
// //                   <Button
// //                     variant="outlined"
// //                     color="secondary"

// //                     // onClick={onGoBack}
// //                     // disabled={loading}
// //                   >
// //                     Go Back
// //                   </Button>
// //                 {/* {onGoBack && ( */}
// //                 {/* )} */}
// //       <Container maxWidth="sm">
// //         {paymentStatus === "success" ? (
// //           <PaymentSuccessCard />
// //         ) : (
// //           <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
// //             <Typography
// //               variant="h4"
// //               textAlign="center"
// //               fontWeight="bold"
// //               gutterBottom
// //             >
// //               Complete Your Payment
// //             </Typography>

// //             <Box mt={4}>
// //               <PaymentForm
// //                 amount={amount}
// //                 propertyId={propertyId}
// //                 onPaymentSuccess={handlePaymentSuccess}
// //                 onGoBack={handleGoBack} // Pass the handleGoBack function
// //                 onCancelPayment={handleCancelPayment} // Pass the handleCancelPayment function
// //               />
// //             </Box>
// //           </Paper>
// //         )}
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default PaymentPage;

// // // src/pages/PaymentPage.js
// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Container,
// //   Paper,
// //   useTheme,
// // } from "@mui/material";
// // import { CheckCircleOutline } from "@mui/icons-material";
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom"; // Import useNavigate hook
// // import PaymentForm from "../components/PaymentForm";

// // // New function for dynamic amount calculation
// // const calculateDynamicAmount = (price) => {
// //   if (typeof price !== "number" || price <= 0) {
// //     return 0; // Or throw an error, depending on desired behavior
// //   }
// //   console.log(price);

// //   // Define a base percentage for the payment (e.g., 10% of the property price)
// //   const percentage = 0.1; // 10%

// //   // Define a minimum payment amount to ensure small properties have a reasonable payment
// //   const minimumPayment = 50; // For example, a minimum of $50

// //   let calculatedAmount = price * percentage;

// //   // Ensure the calculated amount is at least the minimum payment
// //   if (calculatedAmount < minimumPayment) {
// //     calculatedAmount = minimumPayment;
// //   }

// //   // You might also want to set a maximum payment for very expensive properties
// //   // const maximumPayment = 1000; // For example, maximum $1000 for this payment step
// //   // if (calculatedAmount > maximumPayment) {
// //   //   calculatedAmount = maximumPayment;
// //   // }

// //   // Round to two decimal places for currency
// //   return parseFloat(calculatedAmount.toFixed(2));
// // };

// // const PaymentPage = () => {
// //   const theme = useTheme();
// //   const navigate = useNavigate(); // Initialize useNavigate hook
// //   let amount = 0;
// //   const [paymentResult, setPaymentResult] = useState(null);
// //   const [paymentStatus, setPaymentStatus] = useState("idle");

// //   const { property } = useSelector((state) => state.property);
// //   useEffect(() => {
// //     console.log("kldjklsk");
    
// //     amount = calculateDynamicAmount(property?.price || 0);
// //   }, [propertyId]);
// //   // Use the new dynamic amount calculation function
// //   const propertyId = property?.id ;
// //   console.log("amount", amount, "property.price", property?.price);

// //   const handlePaymentSuccess = (reservationData) => {
// //     setPaymentStatus("success");
// //     setPaymentResult(reservationData);
// //   };

// //   const handleGoBack = () => {
// //     // This will navigate to the previous page in the browser history
// //     navigate(-1);
// //   };

// //   const handleCancelPayment = () => {
// //     // You can navigate to a specific page, e.g., the home page or a booking summary page
// //     navigate("/"); // Navigate to the home page (you can change this route)
// //     // Optionally, you might want to reset any payment-related state in Redux or local state
// //     // For example: dispatch(resetPaymentState());
// //   };

// //   const resetPayment = () => {
// //     setPaymentResult(null);
// //     setPaymentStatus("idle");
// //     // Optionally navigate to a new reservation page or back to property details
// //     // navigate("/some-other-reservation-start-page");
// //   };

// //   const PaymentSuccessCard = () => (
// //     <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
// //       <CheckCircleOutline sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
// //       <Typography variant="h5" color="success.main" gutterBottom>
// //         Payment Successful!
// //       </Typography>
// //       <Typography variant="body1" gutterBottom>
// //         Your reservation of **${amount.toFixed(2)}** is confirmed.
// //       </Typography>
// //       <Typography variant="body2" gutterBottom>
// //         **Reservation ID:** {paymentResult?._id}
// //       </Typography>
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         onClick={resetPayment}
// //         sx={{ mt: 3 }}
// //       >
// //         Make Another Reservation
// //       </Button>
// //     </Paper>
// //   );

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         p: 3,
// //         position: "relative", // Added for positioning the back button
// //       }}
// //     >
// //       {/* Go Back Button at the top left */}
// //       {paymentStatus !== "success" && ( // Only show if not on success screen
// //         <Button
// //           variant="outlined"
// //           // color="primary"
// //           onClick={handleGoBack}
// //           sx={{
// //             position: "absolute",
// //             top: theme.spacing(3), // Adjust as needed
// //             left: theme.spacing(3), // Adjust as needed
// //             zIndex: 1000, // Ensure it's above other content
// //             color: "white",
// //             borderColor: "white",
// //             ":hover": "blue",
// //           }}
// //         >
// //           Go Back
// //         </Button>
// //       )}

// //       <Container maxWidth="sm">
// //         {paymentStatus === "success" ? (
// //           <PaymentSuccessCard />
// //         ) : (
// //           <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
// //             <Typography
// //               variant="h4"
// //               textAlign="center"
// //               fontWeight="bold"
// //               gutterBottom
// //             >
// //               Complete Your Payment
// //             </Typography>

// //             <Box mt={4}>
// //               <PaymentForm
// //                 amount={amount}
// //                 propertyId={propertyId}
// //                 onPaymentSuccess={handlePaymentSuccess}
// //                 // We remove onGoBack from PaymentForm as it's now handled directly in PaymentPage
// //                 onCancelPayment={handleCancelPayment}
// //               />
// //             </Box>
// //           </Paper>
// //         )}
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default PaymentPage;




// // src/pages/PaymentPage.js
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Paper,
//   useTheme,
//   CircularProgress, // Import CircularProgress for loading state
//   IconButton, // Import IconButton for a cleaner back button
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import an icon for the back button
// import { CheckCircleOutline } from "@mui/icons-material";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import PaymentForm from "../components/PaymentForm";

// // New function for dynamic amount calculation
// const calculateDynamicAmount = (price) => {
//   price = parseFloat(price)
//   if (price <= 0) {
//     return 0; // Return 0 if price is invalid
//   }

//   // Define a base percentage for the payment (e.g., 10% of the property price)
//   const percentage = 0.0001; // 10%

//   // Define a minimum payment amount to ensure small properties have a reasonable payment
//   const minimumPayment = 50; // For example, a minimum of $50

//   let calculatedAmount = price * percentage;

//   // Ensure the calculated amount is at least the minimum payment
//   if (calculatedAmount < minimumPayment) {
//     calculatedAmount = minimumPayment;
//   }

//   // Round to two decimal places for currency
//   return parseFloat(calculatedAmount.toFixed(2));
// };

// const PaymentPage = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
  

//   const [paymentResult, setPaymentResult] = useState(null);
//   const [paymentStatus, setPaymentStatus] = useState("idle");

//   const { property, loading: propertyLoading, error: propertyError } = useSelector((state) => state.property); // Get loading and error state for property
//   const { reservation, loading, error  } = useSelector((state) => state.reservation); // Get loading and error state for property

//   // Calculate amount only if property and its price are available
//   const amount = property?.price ? calculateDynamicAmount(property.price) : 0;
//   const propertyId = property?.id ;

//   const handlePaymentSuccess = (reservationData) => {
//     setPaymentStatus("success");
//     setPaymentResult(reservationData);
//   };

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   const handleCancelPayment = () => {
//     navigate("/home");
//   };

//   const resetPayment = () => {
//     setPaymentResult(null);
//     setPaymentStatus("idle");
//   };

//   const PaymentSuccessCard = () => (
//     <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
//       <CheckCircleOutline sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
//       <Typography variant="h5" color="success.main" gutterBottom>
//         Payment Successful!
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         Your reservation of **${amount.toFixed(2)}** is confirmed.
//       </Typography>
//       <Typography variant="body2" gutterBottom>
//         {`Your reservation expires on ${reservation?.expires_at}, so please speake with the property's office for ${property?.typeOperation}`}
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={()=>navigate('/reservations')}
//         sx={{ mt: 3 }}
//       >
//         Ok
//       </Button>
//     </Paper>
//   );

//   // --- Render Logic ---
//   if (propertyLoading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
//         }}
//       >
//         <CircularProgress color="primary" />
//         <Typography variant="h6" sx={{ ml: 2, color: "white" }}>
//           Loading property details...
//         </Typography>
//       </Box>
//     );
//   }

//   if (propertyError) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
//           p: 3,
//         }}
//       >
//         <Typography variant="h5" color="error" gutterBottom>
//           Error loading property!
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           {typeof propertyError === "string" ? propertyError : "Please try again later."}
//         </Typography>
//         <Button variant="contained" onClick={handleGoBack} sx={{ mt: 2 }}>
//           Go Back
//         </Button>
//       </Box>
//     );
//   }

//   // if (!property || !propertyId || amount === 0) {
//   if (!property || !propertyId ) {
//     // This case handles if property or its ID isn't found, or if calculated amount is 0 (after loading)
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
//           p: 3,
//         }}
//       >
//         <Typography variant="h5" color="text.primary" gutterBottom>
//           Property details not available for payment.
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Please select a property to proceed with payment.
//         </Typography>
//         <Button variant="contained" onClick={() => navigate('/home')} sx={{ mt: 2 }}>
//           Browse Properties
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         p: 3,
//         position: "relative",
//       }}
//     >
//       {/* Go Back Button at the top left */}
//       {paymentStatus !== "success" && (
//         <IconButton
//           aria-label="go back"
//           onClick={handleGoBack}
//           sx={{
//             position: "absolute",
//             top: theme.spacing(2), // Slightly adjusted for IconButton
//             left: theme.spacing(2), // Slightly adjusted for IconButton
//             zIndex: 1000,
//             color: 'white', // Ensure it's visible on the background
//             backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle background
//             '&:hover': {
//               backgroundColor: 'rgba(255, 255, 255, 0.3)',
//             },
//           }}
//         >
//           <ArrowBackIcon />
//         </IconButton>
//       )}

//       <Container maxWidth="sm">
//         {paymentStatus === "success" ? (
//           <PaymentSuccessCard />
//         ) : (
//           <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
//             <Typography
//               variant="h4"
//               textAlign="center"
//               fontWeight="bold"
//               gutterBottom
//             >
//               Complete Your Payment
//             </Typography>
//             <Typography variant="subtitle1" textAlign="center" color="text.secondary" mb={3}>
//                 Payment for **{property?.name || 'the property'}**: **${amount.toFixed(2)}**
//             </Typography>

//             <Box mt={4}>
//               <PaymentForm
//                 amount={amount}
//                 propertyId={propertyId}
//                 onPaymentSuccess={handlePaymentSuccess}
//                 onCancelPayment={handleCancelPayment}
//                 // onGoBack is now handled by the IconButton directly in PaymentPage
//               />
//             </Box>
//           </Paper>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default PaymentPage;



// src/pages/PaymentPage.js

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  useTheme,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CheckCircleOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
// The original reservation Redux action
import { makeReservation } from "../redux/reservation/reservationSlice";

const calculateDynamicAmount = (price) => {
  price = parseFloat(price);
  if (price <= 0) {
    return 0;
  }
  const percentage = 0.0001;
  const minimumPayment = 50;
  let calculatedAmount = price * percentage;
  if (calculatedAmount < minimumPayment) {
    calculatedAmount = minimumPayment;
  }
  return parseFloat(calculatedAmount.toFixed(2));
};

const PaymentPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentResult, setPaymentResult] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("idle");

  const { property, loading: propertyLoading, error: propertyError } = useSelector((state) => state.property);
  const { reservation, loading: reservationLoading, error: reservationError } = useSelector((state) => state.reservation);

  const amount = property?.price ? calculateDynamicAmount(property.price) : 0;
  const propertyId = property?.id;

  // This function handles the form submission for reservations
  const handlePaymentSubmit = async (paymentData) => {
    const result = await dispatch(makeReservation({ propertyId, paymentData }));

    if (makeReservation.fulfilled.match(result)) {
      setPaymentStatus("success");
      setPaymentResult(result.payload);
    }
  };

  const handleGoBack = () => navigate(-1);
  const handleCancelPayment = () => navigate("/home");

  const PaymentSuccessCard = () => (
    <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
      <CheckCircleOutline sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
      <Typography variant="h5" color="success.main" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your reservation of <strong>${amount.toFixed(2)}</strong> is confirmed.
      </Typography>
      <Typography variant="body2" gutterBottom>
        {`Your reservation expires on ${reservation?.expires_at}, so please speak with the property's office for ${property?.typeOperation}`}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={()=>navigate('/reservations')}
        sx={{ mt: 3 }}
      >
        Ok
      </Button>
    </Paper>
  );

  // --- Render Logic ---
  if (propertyLoading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ ml: 2, color: "white" }}>
          Loading property details...
        </Typography>
      </Box>
    );
  }

  if (propertyError) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Error loading property!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {typeof propertyError === "string" ? propertyError : "Please try again later."}
        </Typography>
        <Button variant="contained" onClick={handleGoBack} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  if (!property || !propertyId) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3 }}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          Property details not available for payment.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please select a property to proceed with payment.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/home')} sx={{ mt: 2 }}>
          Browse Properties
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        position: "relative",
      }}
    >
      {paymentStatus !== "success" && (
        <IconButton aria-label="go back" onClick={handleGoBack} sx={{ position: "absolute", top: theme.spacing(2), left: theme.spacing(2), zIndex: 1000, color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
      )}

      <Container maxWidth="sm">
        {paymentStatus === "success" ? (
          <PaymentSuccessCard />
        ) : (
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
              Complete Your Payment
            </Typography>
            <Typography variant="subtitle1" textAlign="center" color="text.secondary" mb={3}>
                Payment for <strong>{property?.name || 'the property'}</strong>: <strong>${amount.toFixed(2)}</strong>
            </Typography>

            <Box mt={4}>
              <PaymentForm
                amount={amount}
                onSubmit={handlePaymentSubmit} // Pass the handler
                onCancel={handleCancelPayment}
                loading={reservationLoading} // Pass the loading state
                error={reservationError} // Pass the error state
              />
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default PaymentPage;