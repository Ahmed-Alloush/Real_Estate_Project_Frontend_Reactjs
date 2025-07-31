import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyCode } from "../redux/auth/authSlice";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function VerificationCode() {
  const dispatch = useDispatch();
  const { loading, error, verifySuccess } = useSelector((state) => state.auth);

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const navigate = useNavigate();


    useEffect(() => {
      if (verifySuccess) {
        navigate("/complete-registering");
      }
    }, [verifySuccess, navigate]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // auto move to next
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = digits.join("");
    dispatch(verifyCode(code));
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 400,
        margin: "auto",
        mt: 5,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center" color="primary">
        Verify Code
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} justifyContent="center">
          {digits.map((digit, idx) => (
            <Grid item key={idx}>
              <TextField
                inputRef={(el) => (inputs.current[idx] = el)}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                    width: "40px",
                    height: "40px",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, py: 1.5 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Verify"}
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {verifyCode && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Code verified successfully!
          </Alert>
        )}
      </form>
    </Box>
  );
}
