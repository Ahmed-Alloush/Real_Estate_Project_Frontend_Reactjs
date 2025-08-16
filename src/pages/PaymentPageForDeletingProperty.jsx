// src/pages/PaymentPageForDeletingProperty.js

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
import PaymentForm from "../components/PaymentForm";
import { payBeforeDeleteProperty } from "../redux/property/propertySlice";
// Assuming you have a specific Redux action for subscriptions

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

const PaymentPageForDeletingProperty = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [paymentResult, setPaymentResult] = useState(null);

  const { currentOfficeLoading, error } = useSelector(
    (state) => state.property
  );

  // This function handles the logic when the form is submitted.
  const handlePaymentSubmit = async (paymentData) => {
    console.log(paymentData);

    const result = await dispatch(
      payBeforeDeleteProperty({ id, data: paymentData })
    );

    if (payBeforeDeleteProperty.fulfilled.match(result)) {
      setPaymentStatus("success");
      setPaymentResult(result.payload);
    }
  };

  const handleGoBack = () => navigate(-1);
  const handleCancelPayment = () => navigate(-1);

  const PaymentSuccessCard = () => (
    <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
      <CheckCircleOutline sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
      <Typography variant="h5" color="success.main" gutterBottom>
        Payment Successful!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => navigate(-1)}
      >
        Go to Your Office
      </Button>
    </Paper>
  );

  if (currentOfficeLoading) {
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
        <IconButton
          onClick={handleGoBack}
          sx={{
            position: "absolute",
            top: theme.spacing(2),
            left: theme.spacing(2),
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
              Complete Your Payment
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              {/* Subscription: <strong>{subscription.name}</strong>
              <br /> */}
              {/* Amount: <strong>${amount.toFixed(2)}</strong> */}
            </Typography>

            <Box mt={4}>
              <PaymentForm
                amount={20}
                onSubmit={handlePaymentSubmit} // Pass the handler
                onCancel={handleCancelPayment}
                // onCancel={handleCancelPayment}
                loading={currentOfficeLoading} // Pass the loading state
                error={error} // Pass the error state
              />
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default PaymentPageForDeletingProperty;
