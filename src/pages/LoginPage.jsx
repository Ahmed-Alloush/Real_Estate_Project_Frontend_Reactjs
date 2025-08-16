// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../redux/auth/authSlice";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Grid,
//   TextField,
//   Typography,
//   CircularProgress,
//   Alert,
//   Paper,
// } from "@mui/material";

// export default function LoginPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, accessToken, success, role } = useSelector(
//     (state) => state.auth
//   );

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     if (success ){
//       navigate("/");
//     }
//   }, [success, role, navigate]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login(formData));
//   };

//   return (
//     <Grid
//       container
//       justifyContent="center"
//       alignItems="center"
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(to bottom, #e3f2fd, #f0f4ff)",
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           p: 4,
//           maxWidth: 420,
//           width: "100%",
//           borderRadius: 3,
//         }}
//       >
//         <Typography variant="h4" mb={2} textAlign="center" color="primary">
//           Welcome Back
//         </Typography>
//         <Typography
//           variant="body2"
//           textAlign="center"
//           mb={3}
//           color="text.secondary"
//         >
//           Please login to continue
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 name="email"
//                 label="Email"
//                 type="email"
//                 fullWidth
//                 required
//                 variant="outlined"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 name="password"
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 required
//                 variant="outlined"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </Grid>
//             {/* {error && (
//               <Grid item xs={12}>
//                 <Alert severity="error">{error}</Alert>
//               </Grid>
//             )} */}
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 size="large"
//                 disabled={loading}
//                 sx={{
//                   py: 1.5,
//                   fontWeight: "bold",
//                   letterSpacing: 0.5,
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     transform: "translateY(-2px)",
//                   },
//                 }}
//               >
//                 {loading ? (
//                   <CircularProgress size={24} color="inherit" />
//                 ) : (
//                   "Login"
//                 )}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//         <Typography
//           mt={3}
//           variant="body2"
//           textAlign="center"
//           component={Link}
//           to="/start-registering-user"
//           sx={{
//             color: "primary.main",
//             textDecoration: "none",
//             fontWeight: "bold",
//             display: "block",
//             "&:hover": {
//               textDecoration: "underline",
//             },
//           }}
//         >
//           Don&apos;t have an account? Register
//         </Typography>
//       </Paper>
//     </Grid>
//   );
// }

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetUserState } from "../redux/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Fade,
} from "@mui/material";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, role, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    dispatch(resetUserState())
  },[])

  useEffect(() => {
    if (success && (role === "user" || role === "officeManager")) {
      navigate("/");
    } else if (success && (role === "admin" || role === "superAdmin")) {
      navigate("/superAdmin");
    }
  }, [success, role, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.email || !formData.password) return;

    dispatch(login(formData));
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #f0f4ff)",
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          maxWidth: 450,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" mb={1} textAlign="center" color="primary">
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          mb={3}
          color="text.secondary"
        >
          Please login to continue to your account
        </Typography>

        {error && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 2 }}>
              {typeof error === "string"
                ? error
                : error.message || "Something went wrong. Please try again."}
            </Alert>
          </Fade>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                required
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                required
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
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
                  mt: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography
          mt={3}
          variant="body2"
          textAlign="center"
          component={Link}
          to="/start-registering-user"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            fontWeight: "bold",
            display: "block",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Don&apos;t have an account? Register
        </Typography>
      </Paper>
    </Grid>
  );
}
