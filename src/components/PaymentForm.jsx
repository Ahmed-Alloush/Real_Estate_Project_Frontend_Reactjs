// // // // // // // // // src/components/PaymentForm.js
// // // // // // // // import React, { useState } from 'react';
// // // // // // // // import {
// // // // // // // //   useStripe,
// // // // // // // //   useElements,
// // // // // // // //   CardElement,
// // // // // // // //   PaymentElement,
// // // // // // // // } from '@stripe/react-stripe-js';
// // // // // // // // import { stripeAPI } from '../services/stripe-api';
// // // // // // // // import './PaymentForm.css';

// // // // // // // // const PaymentForm = ({ amount, onPaymentSuccess, onPaymentError }) => {
// // // // // // // //   const stripe = useStripe();
// // // // // // // //   const elements = useElements();
// // // // // // // //   const [isProcessing, setIsProcessing] = useState(false);
// // // // // // // //   const [error, setError] = useState(null);
// // // // // // // //   const [clientSecret, setClientSecret] = useState('');

// // // // // // // //   // Initialize payment intent when component mounts
// // // // // // // //   React.useEffect(() => {
// // // // // // // //     const initializePayment = async () => {
// // // // // // // //       try {
// // // // // // // //         const { clientSecret } = await stripeAPI.createPaymentIntent(amount);
// // // // // // // //         setClientSecret(clientSecret);
// // // // // // // //       } catch (err) {
// // // // // // // //         setError(err.message);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     if (amount > 0) {
// // // // // // // //       initializePayment();
// // // // // // // //     }
// // // // // // // //   }, [amount]);

// // // // // // // //   const handleSubmit = async (event) => {
// // // // // // // //     event.preventDefault();

// // // // // // // //     if (!stripe || !elements || !clientSecret) {
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setIsProcessing(true);
// // // // // // // //     setError(null);

// // // // // // // //     try {
// // // // // // // //       const { error: submitError } = await elements.submit();
// // // // // // // //       if (submitError) {
// // // // // // // //         setError(submitError.message);
// // // // // // // //         setIsProcessing(false);
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       const { error, paymentIntent } = await stripe.confirmPayment({
// // // // // // // //         elements,
// // // // // // // //         clientSecret,
// // // // // // // //         confirmParams: {
// // // // // // // //           return_url: `${window.location.origin}/payment-success`,
// // // // // // // //         },
// // // // // // // //         redirect: 'if_required',
// // // // // // // //       });

// // // // // // // //       if (error) {
// // // // // // // //         setError(error.message);
// // // // // // // //         onPaymentError?.(error);
// // // // // // // //       } else if (paymentIntent.status === 'succeeded') {
// // // // // // // //         onPaymentSuccess?.(paymentIntent);
// // // // // // // //       }
// // // // // // // //     } catch (err) {
// // // // // // // //       setError(err.message);
// // // // // // // //       onPaymentError?.(err);
// // // // // // // //     } finally {
// // // // // // // //       setIsProcessing(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   if (!clientSecret) {
// // // // // // // //     return <div className="payment-loading">Initializing payment...</div>;
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <form onSubmit={handleSubmit} className="payment-form">
// // // // // // // //       <div className="payment-amount">
// // // // // // // //         <h3>Payment Amount: ${amount.toFixed(2)}</h3>
// // // // // // // //       </div>

// // // // // // // //       <div className="payment-element-container">
// // // // // // // //         <PaymentElement />
// // // // // // // //       </div>

// // // // // // // //       {error && (
// // // // // // // //         <div className="payment-error">
// // // // // // // //           {error}
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       <button
// // // // // // // //         type="submit"
// // // // // // // //         disabled={!stripe || isProcessing}
// // // // // // // //         className="payment-button"
// // // // // // // //       >
// // // // // // // //         {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
// // // // // // // //       </button>
// // // // // // // //     </form>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // // Alternative simpler version using CardElement
// // // // // // // // export const CardPaymentForm = ({ amount, onPaymentSuccess, onPaymentError }) => {
// // // // // // // //   const stripe = useStripe();
// // // // // // // //   const elements = useElements();
// // // // // // // //   const [isProcessing, setIsProcessing] = useState(false);
// // // // // // // //   const [error, setError] = useState(null);

// // // // // // // //   const handleSubmit = async (event) => {
// // // // // // // //     event.preventDefault();

// // // // // // // //     if (!stripe || !elements) {
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setIsProcessing(true);
// // // // // // // //     setError(null);

// // // // // // // //     try {
// // // // // // // //       // Create payment intent
// // // // // // // //       const { clientSecret } = await stripeAPI.createPaymentIntent(amount);

// // // // // // // //       // Get card element
// // // // // // // //       const cardElement = elements.getElement(CardElement);

// // // // // // // //       // Confirm payment
// // // // // // // //       const { error, paymentIntent } = await stripe.confirmCardPayment(
// // // // // // // //         clientSecret,
// // // // // // // //         {
// // // // // // // //           payment_method: {
// // // // // // // //             card: cardElement,
// // // // // // // //             billing_details: {
// // // // // // // //               name: 'Customer Name', // You can make this dynamic
// // // // // // // //             },
// // // // // // // //           },
// // // // // // // //         }
// // // // // // // //       );

// // // // // // // //       if (error) {
// // // // // // // //         setError(error.message);
// // // // // // // //         onPaymentError?.(error);
// // // // // // // //       } else {
// // // // // // // //         onPaymentSuccess?.(paymentIntent);
// // // // // // // //       }
// // // // // // // //     } catch (err) {
// // // // // // // //       setError(err.message);
// // // // // // // //       onPaymentError?.(err);
// // // // // // // //     } finally {
// // // // // // // //       setIsProcessing(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <form onSubmit={handleSubmit} className="payment-form">
// // // // // // // //       <div className="payment-amount">
// // // // // // // //         <h3>Payment Amount: ${amount.toFixed(2)}</h3>
// // // // // // // //       </div>

// // // // // // // //       <div className="card-element-container">
// // // // // // // //         <CardElement
// // // // // // // //           options={{
// // // // // // // //             style: {
// // // // // // // //               base: {
// // // // // // // //                 fontSize: '16px',
// // // // // // // //                 color: '#424770',
// // // // // // // //                 '::placeholder': {
// // // // // // // //                   color: '#aab7c4',
// // // // // // // //                 },
// // // // // // // //               },
// // // // // // // //               invalid: {
// // // // // // // //                 color: '#9e2146',
// // // // // // // //               },
// // // // // // // //             },
// // // // // // // //           }}
// // // // // // // //         />
// // // // // // // //       </div>

// // // // // // // //       {error && (
// // // // // // // //         <div className="payment-error">
// // // // // // // //           {error}
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       <button
// // // // // // // //         type="submit"
// // // // // // // //         disabled={!stripe || isProcessing}
// // // // // // // //         className="payment-button"
// // // // // // // //       >
// // // // // // // //         {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
// // // // // // // //       </button>
// // // // // // // //     </form>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default PaymentForm;

// // // // // // // // src/components/PaymentForm.js
// // // // // // // import React, { useState } from 'react';
// // // // // // // import {
// // // // // // //   Box,
// // // // // // //   Typography,
// // // // // // //   TextField,
// // // // // // //   Button,
// // // // // // //   Paper,
// // // // // // //   Alert,
// // // // // // //   CircularProgress,
// // // // // // // } from '@mui/material';
// // // // // // // import { useSelector } from 'react-redux';

// // // // // // // const PaymentForm = ({ amount = 50.0, onSubmit }) => {

// // // // // // //   const [name, setName] = useState('');
// // // // // // //   const [cardNumber, setCardNumber] = useState('');
// // // // // // //   const [cvv, setCvv] = useState('');
// // // // // // //   const [expiry, setExpiry] = useState('');
// // // // // // //   const [isProcessing, setIsProcessing] = useState(false);
// // // // // // //   const [error, setError] = useState('');

// // // // // // //   const handleFormSubmit = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     setIsProcessing(true);
// // // // // // //     setError('');

// // // // // // //     // Simulate fake payment flow
// // // // // // //     try {
// // // // // // //       await new Promise((resolve) => setTimeout(resolve, 1500));

// // // // // // //       if (!name || !cardNumber || !cvv || !expiry) {
// // // // // // //         throw new Error('Please fill out all fields.');
// // // // // // //       }

// // // // // // //       if (onSubmit) {
// // // // // // //         onSubmit({
// // // // // // //           name,
// // // // // // //           cardNumber,
// // // // // // //           amount,
// // // // // // //         });
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       setError(err.message || 'Something went wrong.');
// // // // // // //     } finally {
// // // // // // //       setIsProcessing(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
// // // // // // //       <Typography variant="h5" textAlign="center" gutterBottom>
// // // // // // //         Pay ${amount.toFixed(2)}
// // // // // // //       </Typography>

// // // // // // //       {error && (
// // // // // // //         <Alert severity="error" sx={{ mb: 2 }}>
// // // // // // //           {error}
// // // // // // //         </Alert>
// // // // // // //       )}

// // // // // // //       <Box component="form" onSubmit={handleFormSubmit} noValidate>
// // // // // // //         <TextField
// // // // // // //           fullWidth
// // // // // // //           label="Name on Card"
// // // // // // //           value={name}
// // // // // // //           onChange={(e) => setName(e.target.value)}
// // // // // // //           margin="normal"
// // // // // // //           required
// // // // // // //         />
// // // // // // //         <TextField
// // // // // // //           fullWidth
// // // // // // //           label="Card Number"
// // // // // // //           value={cardNumber}
// // // // // // //           onChange={(e) => setCardNumber(e.target.value)}
// // // // // // //           margin="normal"
// // // // // // //           required
// // // // // // //         />
// // // // // // //         <TextField
// // // // // // //           fullWidth
// // // // // // //           label="CVV"
// // // // // // //           value={cvv}
// // // // // // //           onChange={(e) => setCvv(e.target.value)}
// // // // // // //           margin="normal"
// // // // // // //           required
// // // // // // //         />
// // // // // // //         <TextField
// // // // // // //           fullWidth
// // // // // // //           label="Expiry (MM/YY)"
// // // // // // //           value={expiry}
// // // // // // //           onChange={(e) => setExpiry(e.target.value)}
// // // // // // //           margin="normal"
// // // // // // //           required
// // // // // // //         />

// // // // // // //         <Button
// // // // // // //           fullWidth
// // // // // // //           type="submit"
// // // // // // //           variant="contained"
// // // // // // //           color="primary"
// // // // // // //           disabled={isProcessing}
// // // // // // //           sx={{ mt: 3 }}
// // // // // // //         >
// // // // // // //           {isProcessing ? <CircularProgress size={24} color="inherit" /> : `Pay $${amount.toFixed(2)}`}
// // // // // // //         </Button>
// // // // // // //       </Box>
// // // // // // //     </Paper>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default PaymentForm;

// // // // // // // src/components/PaymentForm.js
// // // // // // import React, { useState } from "react";
// // // // // // import {
// // // // // //   Box,
// // // // // //   Typography,
// // // // // //   TextField,
// // // // // //   Button,
// // // // // //   Paper,
// // // // // //   Alert,
// // // // // //   CircularProgress,
// // // // // // } from "@mui/material";
// // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // import { makeReservation } from "../redux/slices/reservationSlice";

// // // // // // const PaymentForm = ({ amount, propertyId, onPaymentSuccess }) => {
// // // // // //   const dispatch = useDispatch();
// // // // // //   const { loading, error, success, reservation } = useSelector(
// // // // // //     (state) => state.reservation
// // // // // //   );

// // // // // //   const [cardType, setCardType] = useState("");
// // // // // //   const [cardNumber, setCardNumber] = useState("");
// // // // // //   const [cvv, setCvv] = useState("");
// // // // // //   const [expiry, setExpiry] = useState("");

// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();

// // // // // //     if (!cardType || !cardNumber || !cvv || !expiry) {
// // // // // //       return;
// // // // // //     }

// // // // // //     const paymentData = {
// // // // // //       type:cardType,
// // // // // //       cardNumber,
// // // // // //       cvv,
// // // // // //       expiry,
// // // // // //       amount,
// // // // // //     };

// // // // // //     const result = await dispatch(makeReservation({ propertyId, paymentData }));

// // // // // //     if (makeReservation.fulfilled.match(result)) {
// // // // // //       onPaymentSuccess?.(result.payload);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
// // // // // //       <Typography variant="h5" textAlign="center" gutterBottom>
// // // // // //         Pay ${amount.toFixed(2)}
// // // // // //       </Typography>

// // // // // //       {error && (
// // // // // //         <Alert severity="error" sx={{ mb: 2 }}>
// // // // // //           {typeof error === "string" ? error : "Reservation failed."}
// // // // // //         </Alert>
// // // // // //       )}

// // // // // //       <Box component="form" onSubmit={handleSubmit} noValidate>
// // // // // //         <TextField
// // // // // //           fullWidth
// // // // // //           label="Name on Card"
// // // // // //           value={name}
// // // // // //           onChange={(e) => setName(e.target.value)}
// // // // // //           margin="normal"
// // // // // //           required
// // // // // //         />
// // // // // //         <TextField
// // // // // //           fullWidth
// // // // // //           label="Card Number"
// // // // // //           value={cardNumber}
// // // // // //           onChange={(e) => setCardNumber(e.target.value)}
// // // // // //           margin="normal"
// // // // // //           required
// // // // // //         />
// // // // // //         <TextField
// // // // // //           fullWidth
// // // // // //           label="CVV"
// // // // // //           value={cvv}
// // // // // //           onChange={(e) => setCvv(e.target.value)}
// // // // // //           margin="normal"
// // // // // //           required
// // // // // //         />
// // // // // //         <TextField
// // // // // //           fullWidth
// // // // // //           label="Expiry (MM/YY)"
// // // // // //           value={expiry}
// // // // // //           onChange={(e) => setExpiry(e.target.value)}
// // // // // //           margin="normal"
// // // // // //           required
// // // // // //         />

// // // // // //         <Button
// // // // // //           fullWidth
// // // // // //           type="submit"
// // // // // //           variant="contained"
// // // // // //           color="primary"
// // // // // //           disabled={loading}
// // // // // //           sx={{ mt: 3 }}
// // // // // //         >
// // // // // //           {loading ? (
// // // // // //             <CircularProgress size={24} color="inherit" />
// // // // // //           ) : (
// // // // // //             `Pay $${amount.toFixed(2)}`
// // // // // //           )}
// // // // // //         </Button>
// // // // // //       </Box>
// // // // // //     </Paper>
// // // // // //   );
// // // // // // };

// // // // // // export default PaymentForm;

// // // // // // src/components/PaymentForm.js
// // // // // import React, { useState } from "react";
// // // // // import {
// // // // //   Box,
// // // // //   Typography,
// // // // //   TextField,
// // // // //   Button,
// // // // //   Paper,
// // // // //   Alert,
// // // // //   CircularProgress,
// // // // // } from "@mui/material";
// // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // import { makeReservation } from "../redux/reservation/reservationSlice";
// // // // // // import { makeReservation } from "../redux/slices/reservationSlice";

// // // // // const detectCardType = (number) => {
// // // // //   const cleaned = number.replace(/\D/g, "");
// // // // //   if (/^4/.test(cleaned)) return "visa";
// // // // //   if (/^5[1-5]/.test(cleaned)) return "mastercard";
// // // // //   if (/^3[47]/.test(cleaned)) return "amex";
// // // // //   if (/^6(?:011|5)/.test(cleaned)) return "discover";
// // // // //   return "unknown";
// // // // // };

// // // // // const PaymentForm = ({ amount, propertyId, onPaymentSuccess }) => {
// // // // //   const dispatch = useDispatch();
// // // // //   const { loading, error } = useSelector((state) => state.reservation);

// // // // //   const [cardNumber, setCardNumber] = useState("");
// // // // //   const [cvv, setCvv] = useState("");
// // // // //   const [expiry, setExpiry] = useState("");

// // // // //   const [formError, setFormError] = useState("");

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();

// // // // //     const cleanedCardNumber = cardNumber.replace(/\s/g, "");
// // // // //     const cardType = detectCardType(cleanedCardNumber);

// // // // //     if (!cleanedCardNumber || !cvv || !expiry) {
// // // // //       setFormError("Please fill in all fields.");
// // // // //       return;
// // // // //     }

// // // // //     if (!/^\d{3,4}$/.test(cvv)) {
// // // // //       setFormError("Invalid CVV.");
// // // // //       return;
// // // // //     }

// // // // //     if (!/^\d{2}\/\d{2}$/.test(expiry)) {
// // // // //       setFormError("Expiry format must be MM/YY.");
// // // // //       return;
// // // // //     }

// // // // //     const [monthStr, yearStr] = expiry.split("/");
// // // // //     const expiryMonth = parseInt(monthStr, 10);
// // // // //     const expiryYear = parseInt("20" + yearStr, 10); // convert "25" to 2025

// // // // //     if (
// // // // //       isNaN(expiryMonth) ||
// // // // //       isNaN(expiryYear) ||
// // // // //       expiryMonth < 1 ||
// // // // //       expiryMonth > 12
// // // // //     ) {
// // // // //       setFormError("Invalid expiry date.");
// // // // //       return;
// // // // //     }

// // // // //     const currentDate = new Date();
// // // // //     const expiryDate = new Date(expiryYear, expiryMonth - 1);
// // // // //     if (expiryDate < currentDate) {
// // // // //       setFormError("Card has expired.");
// // // // //       return;
// // // // //     }

// // // // //     setFormError("");

// // // // //     const paymentData = {
// // // // //       type: cardType,
// // // // //       cardNumber: cleanedCardNumber,
// // // // //       cvv,
// // // // //       expiryMonth,
// // // // //       expiryYear,
// // // // //       amount,
// // // // //     };

// // // // //     const result = await dispatch(makeReservation({ propertyId, paymentData }));

// // // // //     if (makeReservation.fulfilled.match(result)) {
// // // // //       onPaymentSuccess?.(result.payload);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
// // // // //       <Typography variant="h5" textAlign="center" gutterBottom>
// // // // //         Pay ${amount.toFixed(2)}
// // // // //       </Typography>

// // // // //       {(error || formError) && (
// // // // //         <Alert severity="error" sx={{ mb: 2 }}>
// // // // //           {formError || (typeof error === "string" ? error : "Payment failed.")}
// // // // //         </Alert>
// // // // //       )}

// // // // //       <Box component="form" onSubmit={handleSubmit} noValidate>
// // // // //         <TextField
// // // // //           fullWidth
// // // // //           label="Card Number"
// // // // //           value={cardNumber}
// // // // //           onChange={(e) => setCardNumber(e.target.value)}
// // // // //           margin="normal"
// // // // //           required
// // // // //           placeholder="e.g. 5105 1051 0510 5100"
// // // // //         />
// // // // //         <TextField
// // // // //           fullWidth
// // // // //           label="CVV"
// // // // //           value={cvv}
// // // // //           onChange={(e) => setCvv(e.target.value)}
// // // // //           margin="normal"
// // // // //           required
// // // // //           type="password"
// // // // //         />
// // // // //         <TextField
// // // // //           fullWidth
// // // // //           label="Expiry (MM/YY)"
// // // // //           value={expiry}
// // // // //           onChange={(e) => setExpiry(e.target.value)}
// // // // //           margin="normal"
// // // // //           required
// // // // //           placeholder="e.g. 08/30"
// // // // //         />

// // // // //         <Button
// // // // //           fullWidth
// // // // //           type="submit"
// // // // //           variant="contained"
// // // // //           color="primary"
// // // // //           disabled={loading}
// // // // //           sx={{ mt: 3 }}
// // // // //         >
// // // // //           {loading ? (
// // // // //             <CircularProgress size={24} color="inherit" />
// // // // //           ) : (
// // // // //             `Pay $${amount.toFixed(2)}`
// // // // //           )}
// // // // //         </Button>
// // // // //       </Box>
// // // // //     </Paper>
// // // // //   );
// // // // // };

// // // // // export default PaymentForm;

// // // // // src/components/PaymentForm.js
// // // // import React, { useState, useEffect } from "react";
// // // // import {
// // // //   Box,
// // // //   Typography,
// // // //   TextField,
// // // //   Button,
// // // //   Paper,
// // // //   Alert,
// // // //   CircularProgress,
// // // //   InputAdornment,
// // // // } from "@mui/material";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { makeReservation } from "../redux/reservation/reservationSlice";

// // // // const detectCardType = (number) => {
// // // //   if (/^4/.test(number)) return "visa";
// // // //   if (/^5[1-5]/.test(number)) return "mastercard";
// // // //   if (/^3[47]/.test(number)) return "paypal";
// // // //   if (/^6/.test(number)) return "google_pay";
// // // //   if (/^9/.test(number)) return "apple_pay";
// // // //   return "";
// // // // };

// // // // const formatCardNumber = (value) => {
// // // //   return value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
// // // // };

// // // // const formatExpiry = (value) => {
// // // //   return value
// // // //     .replace(/\D/g, "")
// // // //     .replace(/^(\d{2})(\d{1,2})?$/, (_, m, y) => (y ? `${m}/${y}` : m));
// // // // };

// // // // const PaymentForm = ({ amount, propertyId, onPaymentSuccess }) => {
// // // //   const dispatch = useDispatch();
// // // //   const { loading, error } = useSelector((state) => state.reservation);

// // // //   const [cardType, setCardType] = useState("");
// // // //   // const [name, setName] = useState("");
// // // //   const [cardNumber, setCardNumber] = useState("");
// // // //   const [cvv, setCvv] = useState("");
// // // //   const [expiry, setExpiry] = useState("");

// // // //   useEffect(() => {
// // // //     const rawNumber = cardNumber.replace(/\s/g, "");
// // // //     setCardType(detectCardType(rawNumber));
// // // //   }, [cardNumber]);

// // // //   console.log("cardType",cardType);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();

// // // //     const rawNumber = cardNumber.replace(/\s/g, "");
// // // //     const [month, year] = expiry.split("/");

// // // //     if ( !rawNumber || !cvv || !month || !year || !cardType) return;

// // // //     const paymentData = {
// // // //       type: cardType,
// // // //       cardNumber: rawNumber,
// // // //       cvv,
// // // //       expiryMonth: parseInt(month),
// // // //       expiryYear: parseInt(year),
// // // //       amount,
// // // //     };

// // // //     const result = await dispatch(makeReservation({ propertyId, paymentData }));

// // // //     if (makeReservation.fulfilled.match(result)) {
// // // //       onPaymentSuccess?.(result.payload);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Paper elevation={3} sx={{ p: 4, maxWidth: 420, mx: "auto" }}>
// // // //       <Typography variant="h5" textAlign="center" gutterBottom>
// // // //         Pay ${amount.toFixed(2)}
// // // //       </Typography>

// // // //       {error && (
// // // //         <Alert severity="error" sx={{ mb: 2 }}>
// // // //           {typeof error === "string" ? error : "Reservation failed."}
// // // //         </Alert>
// // // //       )}

// // // //       <Box component="form" onSubmit={handleSubmit} noValidate>
// // // //         <TextField
// // // //           fullWidth
// // // //           label="Card Type"
// // // //           value={cardType}
// // // //           // onChange={(e) => setName(e.target.value)}
// // // //           margin="normal"
// // // //         />
// // // //         <TextField
// // // //           fullWidth
// // // //           label="Card Number"
// // // //           value={cardNumber}
// // // //           onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
// // // //           margin="normal"
// // // //           required
// // // //           inputProps={{ maxLength: 19 }}
// // // //           helperText={cardType && `Detected: ${cardType.toUpperCase()}`}
// // // //         />
// // // //         <TextField
// // // //           fullWidth
// // // //           label="CVV"
// // // //           value={cvv}
// // // //           onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
// // // //           margin="normal"
// // // //           required
// // // //           inputProps={{ maxLength: 4 }}
// // // //         />
// // // //         <TextField
// // // //           fullWidth
// // // //           label="Expiry (MM/YY)"
// // // //           value={expiry}
// // // //           onChange={(e) => setExpiry(formatExpiry(e.target.value))}
// // // //           margin="normal"
// // // //           required
// // // //           inputProps={{ maxLength: 5 }}
// // // //         />

// // // //         <Button
// // // //           fullWidth
// // // //           type="submit"
// // // //           variant="contained"
// // // //           color="primary"
// // // //           disabled={loading}
// // // //           sx={{ mt: 3 }}
// // // //         >
// // // //           {loading ? (
// // // //             <CircularProgress size={24} color="inherit" />
// // // //           ) : (
// // // //             `Pay $${amount.toFixed(2)}`
// // // //           )}
// // // //         </Button>
// // // //       </Box>
// // // //     </Paper>
// // // //   );
// // // // };

// // // // export default PaymentForm;

// // // // src/components/PaymentForm.js
// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   TextField,
// // //   Button,
// // //   Paper,
// // //   Alert,
// // //   CircularProgress,
// // //   Chip,
// // // } from "@mui/material";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { makeReservation } from "../redux/reservation/reservationSlice";

// // // const detectCardType = (number) => {
// // //   if (/^4/.test(number)) return "visa";
// // //   if (/^5[1-5]/.test(number)) return "mastercard";
// // //   if (/^3[47]/.test(number)) return "paypal";
// // //   if (/^6/.test(number)) return "google_pay";
// // //   if (/^9/.test(number)) return "apple_pay";
// // //   return "";
// // // };

// // // const formatCardNumber = (value) => {
// // //   return value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
// // // };

// // // const formatExpiry = (value) => {
// // //   return value
// // //     .replace(/\D/g, "")
// // //     .replace(/^(\d{2})(\d{1,2})?$/, (_, m, y) => (y ? `${m}/${y}` : m));
// // // };

// // // const PaymentForm = ({ amount, propertyId, onPaymentSuccess }) => {
// // //   const dispatch = useDispatch();
// // //   const { loading, error } = useSelector((state) => state.reservation);

// // //   const [cardType, setCardType] = useState("");
// // //   const [cardNumber, setCardNumber] = useState("");
// // //   const [cvv, setCvv] = useState("");
// // //   const [expiry, setExpiry] = useState("");

// // //   useEffect(() => {
// // //     const raw = cardNumber.replace(/\s/g, "");
// // //     setCardType(detectCardType(raw));
// // //   }, [cardNumber]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const rawNumber = cardNumber.replace(/\s/g, "");
// // //     const [month, year] = expiry.split("/");

// // //     if (!rawNumber || !cvv || !month || !year || !cardType) return;

// // //     const paymentData = {
// // //       type: cardType,
// // //       cardNumber: rawNumber,
// // //       cvv,
// // //       expiryMonth: parseInt(month),
// // //       expiryYear: parseInt(year),
// // //       amount,
// // //     };

// // //     const result = await dispatch(makeReservation({ propertyId, paymentData }));
// // //     if (makeReservation.fulfilled.match(result)) {
// // //       onPaymentSuccess?.(result.payload);
// // //     }
// // //   };

// // //   return (
// // //     <Paper elevation={3} sx={{ p: 4, maxWidth: 450, mx: "auto" }}>
// // //       <Typography variant="h5" textAlign="center" gutterBottom>
// // //         Pay ${amount.toFixed(2)}
// // //       </Typography>

// // //       {error && (
// // //         <Alert severity="error" sx={{ mb: 2 }}>
// // //           {typeof error === "string" ? error : "Payment failed, try again."}
// // //         </Alert>
// // //       )}

// // //       <Box component="form" onSubmit={handleSubmit} noValidate>
// // //         <TextField
// // //           fullWidth
// // //           label="Card Number"
// // //           value={cardNumber}
// // //           onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
// // //           margin="normal"
// // //           required
// // //           inputProps={{ maxLength: 19 }}
// // //           helperText="Enter 16-digit card number"
// // //         />

// // //         {cardType && (
// // //           <Box mt={1} mb={2}>
// // //             <Chip
// // //               label={`Card Type: ${cardType.replace("_", " ").toUpperCase()}`}
// // //               color="primary"
// // //               sx={{ fontWeight: "bold" }}
// // //             />
// // //           </Box>
// // //         )}

// // //         <TextField
// // //           fullWidth
// // //           label="CVV"
// // //           value={cvv}
// // //           onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
// // //           margin="normal"
// // //           required
// // //           inputProps={{ maxLength: 4 }}
// // //           helperText="3 or 4-digit code on back of card"
// // //         />

// // //         <TextField
// // //           fullWidth
// // //           label="Expiry (MM/YY)"
// // //           value={expiry}
// // //           onChange={(e) => setExpiry(formatExpiry(e.target.value))}
// // //           margin="normal"
// // //           required
// // //           inputProps={{ maxLength: 5 }}
// // //           helperText="Format: MM/YY"
// // //         />

// // //         <Button
// // //           fullWidth
// // //           type="submit"
// // //           variant="contained"
// // //           color="primary"
// // //           disabled={loading}
// // //           sx={{ mt: 3 }}
// // //         >
// // //           {loading ? (
// // //             <CircularProgress size={24} color="inherit" />
// // //           ) : (
// // //             `Pay $${amount.toFixed(2)}`
// // //           )}
// // //         </Button>
// // //       </Box>
// // //     </Paper>
// // //   );
// // // };

// // // export default PaymentForm;

// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   TextField,
// //   Button,
// //   Paper,
// //   Alert,
// //   CircularProgress,
// //   Chip,
// // } from "@mui/material";
// // import { useDispatch, useSelector } from "react-redux";
// // import { makeReservation } from "../redux/reservation/reservationSlice";

// // const detectCardType = (number) => {
// //   if (/^4/.test(number)) return "visa";
// //   if (/^5[1-5]/.test(number)) return "mastercard";
// //   if (/^3[47]/.test(number)) return "american_express"; // Corrected for common card types
// //   if (/^6(?:011|5)/.test(number)) return "discover"; // Added discover
// //   // Note: PayPal, Google Pay, Apple Pay are typically payment methods, not card types
// //   // associated with a physical card number prefix. If you truly have card numbers
// //   // that start with 9 for Apple Pay or 6 for Google Pay, ensure they are accurate.
// //   // For most credit/debit cards, the prefixes are for Visa, Mastercard, Amex, Discover etc.
// //   if (/^9/.test(number)) return "apple_pay"; // Placeholder based on your original logic
// //   return "";
// // };

// // const formatCardNumber = (value) => {
// //   return value
// //     .replace(/\D/g, "")
// //     .replace(/(.{4})/g, "$1 ")
// //     .trim();
// // };

// // const formatExpiry = (value) => {
// //   return value
// //     .replace(/\D/g, "")
// //     .replace(/^(\d{2})(\d{1,2})?$/, (_, m, y) => (y ? `${m}/${y}` : m));
// // };

// // const PaymentForm = ({
// //   amount,
// //   propertyId,
// //   onPaymentSuccess,
// //   onCancelPayment, // New prop for canceling payment
// // }) => {
// //   const dispatch = useDispatch();
// //   const { loading, error } = useSelector((state) => state.reservation);
// //   const { user } = useSelector((state) => state.auth);

// //   const [cardType, setCardType] = useState("");
// //   const [cardNumber, setCardNumber] = useState("");
// //   const [cvv, setCvv] = useState("");
// //   const [expiry, setExpiry] = useState("");

// //   useEffect(() => {
// //     const raw = cardNumber.replace(/\s/g, "");
// //     setCardType(detectCardType(raw));
// //   }, [cardNumber]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const rawNumber = cardNumber.replace(/\s/g, "");
// //     const [month, year] = expiry.split("/");

// //     // Basic validation to ensure fields are filled before dispatching
// //     if (
// //       !rawNumber ||
// //       rawNumber.length < 13 || // Minimum card number length
// //       !cvv ||
// //       cvv.length < 3 || // Minimum CVV length
// //       !month ||
// //       !year ||
// //       expiry.length !== 5 || // MM/YY
// //       !cardType
// //     ) {
// //       alert("Please fill in all card details correctly."); // Simple alert for missing fields
// //       return;
// //     }

// //     const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
// //     const currentMonth = new Date().getMonth() + 1; // Month is 0-indexed

// //     if (
// //       parseInt(year) < currentYear ||
// //       (parseInt(year) === currentYear && parseInt(month) < currentMonth)
// //     ) {
// //       alert("Expiry date cannot be in the past.");
// //       return;
// //     }

// //     const paymentData = {
// //       type: cardType,
// //       cardNumber: rawNumber,
// //       cvv,
// //       expiryMonth: parseInt(month),
// //       expiryYear: parseInt(year),
// //       amount,
// //     };

// //     const result = await dispatch(makeReservation({ propertyId, paymentData }));
// //     if (makeReservation.fulfilled.match(result)) {
// //       onPaymentSuccess?.(result.payload);
// //     }
// //   };

// //   return (
// //     <Paper elevation={3} sx={{ p: 4, maxWidth: 450, mx: "auto" }}>
// //       <Typography variant="h5" textAlign="center" gutterBottom>
// //         Pay ${amount.toFixed(2)}
// //       </Typography>

// //       {error && (
// //         <Alert severity="error" sx={{ mb: 2 }}>
// //           {typeof error === "string" ? error : "Payment failed, try again."}
// //         </Alert>
// //       )}

// //       <Box component="form" onSubmit={handleSubmit} noValidate>
// //         <TextField
// //           fullWidth
// //           label="Card Number"
// //           value={cardNumber}
// //           onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
// //           margin="normal"
// //           required
// //           inputProps={{ maxLength: 19 }}
// //           helperText="Enter 16-digit card number"
// //         />

// //         {cardType && (
// //           <Box mt={1} mb={2}>
// //             <Chip
// //               label={`Card Type: ${cardType.replace("_", " ").toUpperCase()}`}
// //               color="primary"
// //               sx={{ fontWeight: "bold" }}
// //             />
// //           </Box>
// //         )}

// //         <TextField
// //           fullWidth
// //           label="CVV"
// //           value={cvv}
// //           onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
// //           margin="normal"
// //           required
// //           inputProps={{ maxLength: 4 }}
// //           helperText="3 or 4-digit code on back of card"
// //         />

// //         <TextField
// //           fullWidth
// //           label="Expiry (MM/YY)"
// //           value={expiry}
// //           onChange={(e) => setExpiry(formatExpiry(e.target.value))}
// //           margin="normal"
// //           required
// //           inputProps={{ maxLength: 5 }}
// //           helperText="Format: MM/YY"
// //         />

// //         <Button
// //           fullWidth
// //           type="submit"
// //           variant="contained"
// //           color="primary"
// //           disabled={loading}
// //           sx={{ mt: 3 }}
// //         >
// //           {loading ? (
// //             <CircularProgress size={24} color="inherit" />
// //           ) : (
// //             `Pay $${amount.toFixed(2)}`
// //           )}
// //         </Button>

// //         {/* Action Buttons */}
// //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
// //           {onCancelPayment && (
// //             <Button
// //               fullWidth
// //               variant="outlined"
// //               color="error"
// //               onClick={onCancelPayment}
// //               disabled={loading}
// //             >
// //               Cancel Payment
// //             </Button>
// //           )}
// //         </Box>
// //       </Box>
// //     </Paper>
// //   );
// // };

// // export default PaymentForm;






// // src/components/PaymentForm.js

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Alert,
//   CircularProgress,
//   Chip,
// } from "@mui/material";
// import { AlertCircle } from "lucide-react";

// // Helper functions for formatting and validation are kept local
// // as they are part of the component's internal logic.
// const detectCardType = (number) => {
//   if (/^4/.test(number)) return "visa";
//   if (/^5[1-5]/.test(number)) return "mastercard";
//   if (/^3[47]/.test(number)) return "american_express";
//   if (/^6(?:011|5)/.test(number)) return "discover";
//   return "";
// };

// const formatCardNumber = (value) => {
//   return value
//     .replace(/\D/g, "")
//     .replace(/(.{4})/g, "$1 ")
//     .trim();
// };

// const formatExpiry = (value) => {
//   return value
//     .replace(/\D/g, "")
//     .replace(/^(\d{2})(\d{1,2})?$/, (_, m, y) => (y ? `${m}/${y}` : m));
// };

// const PaymentForm = ({
//   amount,
//   onSubmit, // The new, flexible submission handler
//   onCancel, // The new prop for the cancel action
//   loading = false, // Controlled by the parent component
//   error = null, // Controlled by the parent component
// }) => {
//   const [cardType, setCardType] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [expiry, setExpiry] = useState("");

//   useEffect(() => {
//     const raw = cardNumber.replace(/\s/g, "");
//     setCardType(detectCardType(raw));
//   }, [cardNumber]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const rawNumber = cardNumber.replace(/\s/g, "");
//     const [month, year] = expiry.split("/");

//     // Basic form validation
//     if (
//       !rawNumber || rawNumber.length < 13 ||
//       !cvv || cvv.length < 3 ||
//       !month || !year || expiry.length !== 5 ||
//       !cardType
//     ) {

//       <AlertCircle>
//         Please fill in all card details correctly.
//       </AlertCircle>
//       return;
//     }

//     const currentYear = new Date().getFullYear() % 100;
//     const currentMonth = new Date().getMonth() + 1;

//     if (
//       parseInt(year) < currentYear ||
//       (parseInt(year) === currentYear && parseInt(month) < currentMonth)
//     ) {
//       alert("Expiry date cannot be in the past.");
//       return;
//     }

//     // Call the onSubmit prop with the payment data
//     onSubmit({
//       type: cardType,
//       cardNumber: rawNumber,
//       cvv,
//       expiryMonth: parseInt(month),
//       expiryYear: parseInt(year),
//       amount,
//     });
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 4, maxWidth: 450, mx: "auto" }}>
//       <Typography variant="h5" textAlign="center" gutterBottom>
//         Pay ${amount.toFixed(2)}
//       </Typography>

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {typeof error === "string" ? error : "Payment failed, please try again."}
//         </Alert>
//       )}

//       <Box component="form" onSubmit={handleSubmit} noValidate>
//         <TextField
//           fullWidth
//           label="Card Number"
//           value={cardNumber}
//           onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
//           margin="normal"
//           required
//           inputProps={{ maxLength: 19 }}
//           helperText="Enter 16-digit card number"
//         />

//         {cardType && (
//           <Box mt={1} mb={2}>
//             <Chip
//               label={`Card Type: ${cardType.replace("_", " ").toUpperCase()}`}
//               color="primary"
//               sx={{ fontWeight: "bold" }}
//             />
//           </Box>
//         )}

//         <TextField
//           fullWidth
//           label="CVV"
//           value={cvv}
//           onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
//           margin="normal"
//           required
//           inputProps={{ maxLength: 4 }}
//           helperText="3 or 4-digit code on back of card"
//         />

//         <TextField
//           fullWidth
//           label="Expiry (MM/YY)"
//           value={expiry}
//           onChange={(e) => setExpiry(formatExpiry(e.target.value))}
//           margin="normal"
//           required
//           inputProps={{ maxLength: 5 }}
//           helperText="Format: MM/YY"
//         />

//         <Button
//           fullWidth
//           type="submit"
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//           disabled={loading}
//           sx={{ mt: 3 }}
//         >
//           {loading ? (
//             <CircularProgress size={24} color="inherit" />
//           ) : (
//             `Pay $${amount.toFixed(2)}`
//           )}
//         </Button>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//           {onCancel && (
//             <Button
//               fullWidth
//               variant="outlined"
//               color="error"
//               onClick={onCancel}
//               disabled={loading}
//             >
//               Cancel Payment
//             </Button>
//           )}
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// export default PaymentForm;





import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const detectCardType = (number) => {
  if (/^4/.test(number)) return "visa";
  if (/^5[1-5]/.test(number)) return "mastercard";
  if (/^3[47]/.test(number)) return "american_express";
  if (/^6(?:011|5)/.test(number)) return "discover";
  return "";
};

const formatCardNumber = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

const formatExpiry = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d{1,2})?$/, (_, m, y) => (y ? `${m}/${y}` : m));
};

const PaymentForm = ({
  amount,
  onSubmit,
  onCancel,
  loading = false,
  error = null,
}) => {
  const { t } = useTranslation();
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    const raw = cardNumber.replace(/\s/g, "");
    setCardType(detectCardType(raw));
  }, [cardNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawNumber = cardNumber.replace(/\s/g, "");
    const [month, year] = expiry.split("/");

    if (
      !rawNumber ||
      rawNumber.length < 13 ||
      !cvv ||
      cvv.length < 3 ||
      !month ||
      !year ||
      expiry.length !== 5 ||
      !cardType
    ) {
      alert(t("paymentForm.errors.missingDetails"));
      return;
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (
      parseInt(year) < currentYear ||
      (parseInt(year) === currentYear && parseInt(month) < currentMonth)
    ) {
      alert(t("paymentForm.errors.pastExpiry"));
      return;
    }

    onSubmit({
      type: cardType,
      cardNumber: rawNumber,
      cvv,
      expiryMonth: parseInt(month),
      expiryYear: parseInt(year),
      amount,
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 450, mx: "auto" }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        {t("paymentForm.payAmount", { amount: amount.toFixed(2) })}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {typeof error === "string"
            ? error
            : t("paymentForm.errors.paymentFailed")}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label={t("paymentForm.cardNumberLabel")}
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          margin="normal"
          required
          inputProps={{ maxLength: 19 }}
          helperText={t("paymentForm.cardNumberHelper")}
        />

        {cardType && (
          <Box mt={1} mb={2}>
            <Chip
              label={`${t("paymentForm.cardType")} ${cardType.replace("_", " ").toUpperCase()}`}
              color="primary"
              sx={{ fontWeight: "bold" }}
            />
          </Box>
        )}

        <TextField
          fullWidth
          label={t("paymentForm.cvvLabel")}
          value={cvv}
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
          margin="normal"
          required
          inputProps={{ maxLength: 4 }}
          helperText={t("paymentForm.cvvHelper")}
        />

        <TextField
          fullWidth
          label={t("paymentForm.expiryLabel")}
          value={expiry}
          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
          margin="normal"
          required
          inputProps={{ maxLength: 5 }}
          helperText={t("paymentForm.expiryHelper")}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t("paymentForm.submitButton", { amount: amount.toFixed(2) })
          )}
        </Button>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          {onCancel && (
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={onCancel}
              disabled={loading}
            >
              {t("paymentForm.cancelButton")}
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default PaymentForm;