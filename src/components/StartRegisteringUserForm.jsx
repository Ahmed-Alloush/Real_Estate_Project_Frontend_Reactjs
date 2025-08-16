// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { startRegisterByEmailPhoneAsUser } from "../features/auth/startRegisterSlice";
// import {
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   CircularProgress,
//   Alert,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";

// export default function StartRegisteringUserForm() {
//   const dispatch = useDispatch();
//   const { loading, error, success } = useSelector(
//     (state) => state.startRegister
//   );

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [countryCode, setCountryCode] = useState("+963");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // send combined phone number
//     dispatch(startRegisterByEmailPhoneAsUser({ email, phone: countryCode + phone }));
//   };

//   useEffect(() => {
//     if (success) {
//       navigate("/verify-code");
//     }
//   }, [success, navigate]);

//   return (
//     <Box
//       sx={{
//         p: 3,
//         maxWidth: 400,
//         margin: "auto",
//         mt: 5,
//         backgroundColor: "#f9f9f9",
//         borderRadius: 2,
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h5" mb={2} textAlign="center" color="primary">
//         Sign Up As User
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               variant="outlined"
//               type="email"
//               fullWidth
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <FormControl fullWidth>
//               <InputLabel id="country-code-label">Code</InputLabel>
//               <Select
//                 labelId="country-code-label"
//                 value={countryCode}
//                 label="Code"
//                 onChange={(e) => setCountryCode(e.target.value)}
//               >
//                 <MenuItem value="+963">+963 (SY)</MenuItem>
//                 <MenuItem value="+1">+1 (US)</MenuItem>
//                 <MenuItem value="+44">+44 (UK)</MenuItem>
//                 <MenuItem value="+971">+971 (UAE)</MenuItem>
//                 <MenuItem value="+49">+49 (DE)</MenuItem>
//                 <MenuItem value="+33">+33 (FR)</MenuItem>
//                 <MenuItem value="+90">+90 (TR)</MenuItem>
//                 {/* you can add more as you wish */}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={8}>
//             <TextField
//               label="Phone"
//               variant="outlined"
//               type="tel"
//               fullWidth
//               required
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               disabled={loading}
//               sx={{ py: 1.5 }}
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 "Login"
//               )}
//             </Button>
//             <Typography
//               component={Link}
//               to="/login"
//               sx={{ color: "inherit", textDecoration: "none" }}
//             >
//               Already have an Account
//             </Typography>

//               <Typography
//               component={Link}
//               to="/start-registering-office-manager"
//               sx={{ color: "inherit", textDecoration: "none" }}
//             >
//               Do you register as Office manager
//             </Typography>
//           </Grid>
//           {error && (
//             <Grid item xs={12}>
//               <Alert severity="error">{error}</Alert>
//             </Grid>
//           )}
//         </Grid>
//       </form>
//     </Box>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startRegisterByEmailPhoneAsUser,
  resetUserState,
} from "../redux/auth/authSlice";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function StartRegisteringUserForm() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+963");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      startRegisterByEmailPhoneAsUser({
        email,
        phone: countryCode + phone,
      })
    );
  };

  useEffect(() => {
    dispatch(resetUserState());
  }, []);

  useEffect(() => {
    if (success) {
      navigate("/verify-code");
    }
  }, [success, navigate]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e3f2fd, #f0f4ff)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 480,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" mb={1} textAlign="center" color="primary">
          User Signup
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          mb={3}
          color="text.secondary"
        >
          Create your personal user account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="country-code-label">Code</InputLabel>
                <Select
                  labelId="country-code-label"
                  value={countryCode}
                  label="Code"
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <MenuItem value="+963">+963 (SY)</MenuItem>
                  <MenuItem value="+1">+1 (US)</MenuItem>
                  <MenuItem value="+44">+44 (UK)</MenuItem>
                  <MenuItem value="+971">+971 (UAE)</MenuItem>
                  <MenuItem value="+49">+49 (DE)</MenuItem>
                  <MenuItem value="+33">+33 (FR)</MenuItem>
                  <MenuItem value="+90">+90 (TR)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Phone"
                variant="outlined"
                type="tel"
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  letterSpacing: 0.5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Register"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box mt={3} textAlign="center">
          <Typography
            component={Link}
            to="/login"
            variant="body2"
            sx={{
              display: "block",
              color: "primary.main",
              textDecoration: "none",
              fontWeight: "bold",
              mb: 1,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Already have an account? Login
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}
