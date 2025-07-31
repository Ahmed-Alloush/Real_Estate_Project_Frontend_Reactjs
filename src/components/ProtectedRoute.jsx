import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../redux/auth/authSlice";
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [attemptedFetch, setAttemptedFetch] = useState(false);

  useEffect(() => {
    // Fetch the user only once if not already loaded
    if (!user && !loading && !attemptedFetch) {
      dispatch(getUser()).finally(() => setAttemptedFetch(true));
    }
  }, [user, loading, attemptedFetch, dispatch]);

  // Loading UI while waiting for user data
  if (loading || (!user && !error && !attemptedFetch)) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          padding: 4,
          bgcolor: "rgba(37, 37, 37, 0.8)",
          borderRadius: 2,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  // If there's an error or no user after attempted fetch, redirect to login
  if (error || (!user && attemptedFetch)) {
    return <Navigate to="/login" replace />;
  }


  // If user exists but is not authorized
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and authorized
  return children;
};

export default ProtectedRoute;
