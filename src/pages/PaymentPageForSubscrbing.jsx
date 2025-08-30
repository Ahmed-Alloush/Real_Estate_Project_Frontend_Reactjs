// // // src/pages/PaymentPageForSubscrbing.js
// // import React, { useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Container,
// //   Paper,
// //   useTheme,
// //   CircularProgress, // Import CircularProgress for loading state
// //   IconButton, // Import IconButton for a cleaner back button
// // } from "@mui/material";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import an icon for the back button
// // import { CheckCircleOutline } from "@mui/icons-material";
// // import { useSelector } from "react-redux";
// // import { useNavigate, useParams } from "react-router-dom";
// // import PaymentForm from "../components/PaymentForm";

// // // New function for dynamic amount calculation
// // const calculateDynamicAmount = (price) => {
// //   price = parseFloat(price);
// //   if (price <= 0) {
// //     return 0; // Return 0 if price is invalid
// //   }

// //   // Define a base percentage for the payment (e.g., 10% of the property price)
// //   const percentage = 0.0001; // 10%

// //   // Define a minimum payment amount to ensure small properties have a reasonable payment
// //   const minimumPayment = 50; // For example, a minimum of $50

// //   let calculatedAmount = price * percentage;

// //   // Ensure the calculated amount is at least the minimum payment
// //   if (calculatedAmount < minimumPayment) {
// //     calculatedAmount = minimumPayment;
// //   }

// //   // Round to two decimal places for currency
// //   return parseFloat(calculatedAmount.toFixed(2));
// // };

// // const PaymentPageForSubscrbing = () => {
// //   const theme = useTheme();
// //   const navigate = useNavigate();
// //   const { id } = useParams();

// //   const [paymentResult, setPaymentResult] = useState(null);
// //   const [paymentStatus, setPaymentStatus] = useState("idle");

// //   const { subscriptions, loading, error } = useSelector(
// //     (state) => state.subscriptions
// //   ); // Get loading and error state for subscription

// //   const subscription = subscriptions?.find((sub) => sub.id.toString() === id);

// //   // Calculate amount only if property and its price are available
// //   const amount = property?.price ? calculateDynamicAmount(property.price) : 0;

// //   const handlePaymentSuccess = (reservationData) => {
// //     setPaymentStatus("success");
// //     setPaymentResult(reservationData);
// //   };

// //   const handleGoBack = () => {
// //     navigate(-1);
// //   };

// //   const handleCancelPayment = () => {
// //     navigate("/home");
// //   };

// //   const resetPayment = () => {
// //     setPaymentResult(null);
// //     setPaymentStatus("idle");
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
// //         {`Your subscription expires on ${reservation?.expires_at}.`}
// //       </Typography>
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         onClick={() => navigate("/office/my-office")}
// //         sx={{ mt: 3 }}
// //       >
// //         Ok
// //       </Button>
// //     </Paper>
// //   );

// //   // --- Render Logic ---
// //   if (loading) {
// //     return (
// //       <Box
// //         sx={{
// //           minHeight: "100vh",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
// //         }}
// //       >
// //         <CircularProgress color="primary" />
// //       </Box>
// //     );
// //   }

// //   if (propertyError) {
// //     return (
// //       <Box
// //         sx={{
// //           minHeight: "100vh",
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
// //           p: 3,
// //         }}
// //       >
// //         <Typography variant="body1" color="text.secondary">
// //           {typeof error === "string" ? error : "Please try again later."}
// //         </Typography>
// //         <Button variant="contained" onClick={handleGoBack} sx={{ mt: 2 }}>
// //           Go Back
// //         </Button>
// //       </Box>
// //     );
// //   }

// //   // // if (!property || !propertyId || amount === 0) {
// //   // if (!property || !propertyId ) {
// //   //   // This case handles if property or its ID isn't found, or if calculated amount is 0 (after loading)
// //   //   return (
// //   //     <Box
// //   //       sx={{
// //   //         minHeight: "100vh",
// //   //         display: "flex",
// //   //         flexDirection: "column",
// //   //         alignItems: "center",
// //   //         justifyContent: "center",
// //   //         background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
// //   //         p: 3,
// //   //       }}
// //   //     >
// //   //       <Typography variant="h5" color="text.primary" gutterBottom>
// //   //         Property details not available for payment.
// //   //       </Typography>
// //   //       <Typography variant="body1" color="text.secondary">
// //   //         Please select a property to proceed with payment.
// //   //       </Typography>
// //   //       <Button variant="contained" onClick={() => navigate('/home')} sx={{ mt: 2 }}>
// //   //         Browse Properties
// //   //       </Button>
// //   //     </Box>
// //   //   );
// //   // }

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         p: 3,
// //         position: "relative",
// //       }}
// //     >
// //       {/* Go Back Button at the top left */}
// //       {paymentStatus !== "success" && (
// //         <IconButton
// //           aria-label="go back"
// //           onClick={handleGoBack}
// //           sx={{
// //             position: "absolute",
// //             top: theme.spacing(2), // Slightly adjusted for IconButton
// //             left: theme.spacing(2), // Slightly adjusted for IconButton
// //             zIndex: 1000,
// //             color: "white", // Ensure it's visible on the background
// //             backgroundColor: "rgba(255, 255, 255, 0.2)", // Subtle background
// //             "&:hover": {
// //               backgroundColor: "rgba(255, 255, 255, 0.3)",
// //             },
// //           }}
// //         >
// //           <ArrowBackIcon />
// //         </IconButton>
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
// //             <Typography
// //               variant="subtitle1"
// //               textAlign="center"
// //               color="text.secondary"
// //               mb={3}
// //             >
// //               Payment for **{subscription?.name || "the subscription"}**: **$
// //               {amount.toFixed(2)}**
// //             </Typography>

// //             <Box mt={4}>
// //               <PaymentForm
// //                 amount={amount}
// //                 propertyId={propertyId}
// //                 onPaymentSuccess={handlePaymentSuccess}
// //                 onCancelPayment={handleCancelPayment}
// //                 // onGoBack is now handled by the IconButton directly in PaymentPage
// //               />
// //             </Box>
// //           </Paper>
// //         )}
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default PaymentPageForSubscrbing;

// // src/pages/PaymentPageForSubscrbing.js
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Paper,
//   useTheme,
//   CircularProgress,
//   IconButton,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { CheckCircleOutline } from "@mui/icons-material";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import PaymentForm from "../components/PaymentForm";

// // Calculate subscription amount (fixed to minimum of $50 or 0.0001 * price)
// const calculateAmount = (price) => {
//   const percentage = 0.0001;
//   const minimum = 50;
//   let amount = parseFloat(price) * percentage;
//   return parseFloat(Math.max(amount, minimum).toFixed(2));
// };

// // Calculate subscription expiration date
// const calculateExpirationDate = (durationStr) => {
//   const now = new Date();
//   const [value, unit] = durationStr.split(" ");
//   const amount = parseInt(value);

//   if (unit.toLowerCase().includes("mon")) {
//     now.setMonth(now.getMonth() + amount);
//   } else if (unit.toLowerCase().includes("year")) {
//     now.setFullYear(now.getFullYear() + amount);
//   }

//   return now.toISOString().split("T")[0]; // Return as YYYY-MM-DD
// };

// const PaymentPageForSubscrbing = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [paymentStatus, setPaymentStatus] = useState("idle");
//   const [paymentResult, setPaymentResult] = useState(null);

//   const { subscriptions, loading, error } = useSelector(
//     (state) => state.subscription
//   );

//   const subscription = subscriptions?.find((sub) => sub.id === id);
//   const amount = subscription ? calculateAmount(subscription.price) : 0;
//   const expirationDate = subscription ? calculateExpirationDate(subscription.duration) : null;

//   const handlePaymentSuccess = (reservationData) => {
//     setPaymentStatus("success");
//     setPaymentResult(reservationData);
//   };

//   const handleGoBack = () => navigate(-1);
//   const handleCancelPayment = () => navigate("/home");

//   // UI for success card
//   const PaymentSuccessCard = () => (
//     <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
//       <CheckCircleOutline sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
//       <Typography variant="h5" color="success.main" gutterBottom>
//         Payment Successful!
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         You’ve paid <strong>${amount.toFixed(2)}</strong> for the{" "}
//         <strong>{subscription?.name}</strong>.
//       </Typography>
//       <Typography variant="body2">
//         Your subscription will expire on <strong>{expirationDate}</strong>.
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ mt: 3 }}
//         onClick={() => navigate("/office/my-office")}
//       >
//         Go to Dashboard
//       </Button>
//     </Paper>
//   );

//   // === Loading State ===
//   if (loading) {
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
//       </Box>
//     );
//   }

//   // === Error or Invalid Subscription ===
//   if (!subscription || error) {
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
//           Subscription not found
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           {typeof error === "string" ? error : "Please try again later."}
//         </Typography>
//         <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/home")}>
//           Go Home
//         </Button>
//       </Box>
//     );
//   }

//   // === Main Payment UI ===
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
//       {/* Back Button */}
//       {paymentStatus !== "success" && (
//         <IconButton
//           onClick={handleGoBack}
//           sx={{
//             position: "absolute",
//             top: theme.spacing(2),
//             left: theme.spacing(2),
//             color: "white",
//             backgroundColor: "rgba(255,255,255,0.2)",
//             "&:hover": {
//               backgroundColor: "rgba(255,255,255,0.3)",
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
//             <Typography
//               variant="subtitle1"
//               textAlign="center"
//               color="text.secondary"
//               mb={3}
//             >
//               Subscription: <strong>{subscription.name}</strong>
//               <br />
//               Amount: <strong>${amount.toFixed(2)}</strong>
//             </Typography>

//             <Box mt={4}>
//               <PaymentForm
//                 amount={amount}
//                 propertyId={'lkdfsk'}
//                 // subscriptionId={subscription.id}
//                 onPaymentSuccess={handlePaymentSuccess}
//                 onCancelPayment={handleCancelPayment}
//               />
//             </Box>
//           </Paper>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default PaymentPageForSubscrbing;

// // src/pages/PaymentPageForSubscrbing.js

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Paper,
//   useTheme,
//   CircularProgress,
//   IconButton,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { CheckCircleOutline } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import PaymentForm from "../components/PaymentForm";
// // Assuming you have a specific Redux action for subscriptions
// import { createOfficeSubscription } from "../redux/office subscription/officeSubscriptionSlice";

// const calculateAmount = (price) => {
//   const percentage = 0.0001;
//   const minimum = 50;
//   let amount = parseFloat(price) * percentage;
//   return parseFloat(Math.max(amount, minimum).toFixed(2));
// };

// const calculateExpirationDate = (durationStr) => {
//   const now = new Date();
//   const [value, unit] = durationStr.split(" ");
//   const amount = parseInt(value);

//   if (unit.toLowerCase().includes("mon")) {
//     now.setMonth(now.getMonth() + amount);
//   } else if (unit.toLowerCase().includes("year")) {
//     now.setFullYear(now.getFullYear() + amount);
//   }

//   return now.toISOString().split("T")[0];
// };

// const PaymentPageForSubscrbing = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const [paymentStatus, setPaymentStatus] = useState("idle");
//   const [paymentResult, setPaymentResult] = useState(null);

//   const { subscriptions, loading, error } = useSelector(
//     (state) => state.subscription
//   );

//   const subscription = subscriptions?.find((sub) => sub.id === id);
//   const amount = subscription ? parseFloat(subscription.price) : 0;
//   const expirationDate = subscription
//     ? calculateExpirationDate(subscription.duration)
//     : null;

//   // This function handles the logic when the form is submitted.
//   const handlePaymentSubmit = async (paymentData) => {
//     const result = await dispatch(
//       createOfficeSubscription({ subscriptionId: id, ...paymentData })
//     );

//     if (createOfficeSubscription.fulfilled.match(result)) {
//       setPaymentStatus("success");
//       setPaymentResult(result.payload);
//     }
//   };

//   const handleGoBack = () => navigate(-1);
//   const handleCancelPayment = () => navigate("/");

//   const PaymentSuccessCard = () => (
//     <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
//       <CheckCircleOutline sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
//       <Typography variant="h5" color="success.main" gutterBottom>
//         Payment Successful!
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         You’ve paid <strong>${amount.toFixed(2)}</strong> for the{" "}
//         <strong>{subscription?.name}</strong>.
//       </Typography>
//       <Typography variant="body2">
//         Your subscription will expire on <strong>{expirationDate}</strong>.
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ mt: 3 }}
//         onClick={() => navigate("/office/my-office")}
//       >
//         Go to Dashboard
//       </Button>
//     </Paper>
//   );

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   if (!subscription || error) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           p: 3,
//         }}
//       >
//         <Typography variant="h5" color="text.primary" gutterBottom>
//           Subscription not found
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           {typeof error === "string" ? error : "Please try again later."}
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{ mt: 2 }}
//           onClick={() => navigate("/home")}
//         >
//           Go Home
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
//       {paymentStatus !== "success" && (
//         <IconButton
//           onClick={handleGoBack}
//           sx={{
//             position: "absolute",
//             top: theme.spacing(2),
//             left: theme.spacing(2),
//             color: "white",
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
//             <Typography
//               variant="subtitle1"
//               textAlign="center"
//               color="text.secondary"
//               mb={3}
//             >
//               Subscription: <strong>{subscription.name}</strong>
//               <br />
//               Amount: <strong>${amount.toFixed(2)}</strong>
//             </Typography>

//             <Box mt={4}>
//               <PaymentForm
//                 amount={amount}
//                 onSubmit={handlePaymentSubmit} // Pass the handler
//                 onCancel={handleCancelPayment}
//                 // onCancel={handleCancelPayment}
//                 loading={loading} // Pass the loading state
//                 error={error} // Pass the error state
//               />
//             </Box>
//           </Paper>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default PaymentPageForSubscrbing;






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
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PaymentForm from "../components/PaymentForm";
import { createOfficeSubscription } from "../redux/office subscription/officeSubscriptionSlice";

const calculateAmount = (price) => {
  const percentage = 0.0001;
  const minimum = 50;
  let amount = parseFloat(price) * percentage;
  return parseFloat(Math.max(amount, minimum).toFixed(2));
};

const calculateExpirationDate = (durationStr) => {
  const now = new Date();
  const [value, unit] = durationStr.split(" ");
  const amount = parseInt(value);

  if (unit.toLowerCase().includes("mon")) {
    now.setMonth(now.getMonth() + amount);
  } else if (unit.toLowerCase().includes("year")) {
    now.setFullYear(now.getFullYear() + amount);
  }

  return now.toISOString().split("T")[0];
};

const PaymentPageForSubscrbing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [paymentResult, setPaymentResult] = useState(null);

  const { subscriptions, loading, error } = useSelector(
    (state) => state.subscription
  );

  const subscription = subscriptions?.find((sub) => sub.id === id);
  const amount = subscription ? parseFloat(subscription.price) : 0;
  const expirationDate = subscription
    ? calculateExpirationDate(subscription.duration)
    : null;

  const handlePaymentSubmit = async (paymentData) => {
    const result = await dispatch(
      createOfficeSubscription({ subscriptionId: id, ...paymentData })
    );

    if (createOfficeSubscription.fulfilled.match(result)) {
      setPaymentStatus("success");
      setPaymentResult(result.payload);
    }
  };

  const handleGoBack = () => navigate(-1);
  const handleCancelPayment = () => navigate("/");
  const isRTL = i18n.language === "ar";

  const PaymentSuccessCard = () => (
    <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
      <CheckCircleOutline sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
      <Typography variant="h5" color="success.main" gutterBottom>
        {t("subscriptionPayment.successTitle")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t("subscriptionPayment.successMessage", {
          amount: amount.toFixed(2),
          name: subscription?.name,
        })}
      </Typography>
      <Typography variant="body2">
        {t("subscriptionPayment.expirationMessage", {
          expirationDate,
        })}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => navigate("/office/my-office")}
      >
        {t("subscriptionPayment.goToDashboard")}
      </Button>
    </Paper>
  );

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!subscription || error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Typography variant="h5" color="text.primary" gutterBottom>
          {t("subscriptionPayment.notFoundTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {typeof error === "string" ? error : t("subscriptionPayment.genericError")}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/home")}
        >
          {t("subscriptionPayment.goHome")}
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
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {paymentStatus !== "success" && (
        <IconButton
          onClick={handleGoBack}
          sx={{
            position: "absolute",
            top: theme.spacing(2),
            left: isRTL ? "auto" : theme.spacing(2),
            right: isRTL ? theme.spacing(2) : "auto",
            color: "white",
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      <Container maxWidth="sm">
        {paymentStatus === "success" ? (
          <PaymentSuccessCard />
        ) : (
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight="bold"
              gutterBottom
            >
              {t("subscriptionPayment.formTitle")}
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              {t("subscriptionPayment.formSubtitle", {
                name: subscription.name,
                amount: amount.toFixed(2),
              })}
            </Typography>

            <Box mt={4}>
              <PaymentForm
                amount={amount}
                onSubmit={handlePaymentSubmit}
                onCancel={handleCancelPayment}
                loading={loading}
                error={error}
              />
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default PaymentPageForSubscrbing;