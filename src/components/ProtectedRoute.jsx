// import { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
// import { getUser } from "../redux/auth/authSlice";
// import { Box, CircularProgress } from "@mui/material";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, loading, error } = useSelector((state) => state.auth);

//   // const [attemptedFetch, setAttemptedFetch] = useState(false);

//   // useEffect(() => {
//   //   // Fetch the user only once if not already loaded
//   //   if (!user && !loading && !attemptedFetch) {
//   //     dispatch(getUser()).finally(() => setAttemptedFetch(true));
//   //   }
//   // }, [user, loading, attemptedFetch, dispatch]);

//   // const hasFetchedUser = useRef(false);

//   useEffect(() => {
//     // Only fetch if the user isn't loaded and we haven't tried yet
//     if (!user && !loading && !hasFetchedUser.current) {
//       hasFetchedUser.current = true;
//       dispatch(getUser());
//       console.log(1)
//     }
//   }, [user, loading, dispatch]);


//   // Loading UI while waiting for user data
//   if (loading || (!user && !error && !hasFetchedUser.current)) {
//     return (
//       <Box
//         sx={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "300px",
//           padding: 4,
//           bgcolor: "rgba(37, 37, 37, 0.8)",
//           borderRadius: 2,
//           zIndex: 9999,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//         }}
//       >
//         <CircularProgress color="inherit" />
//       </Box>
//     );
//   }

//   // If there's an error or no user after attempted fetch, redirect to login
//   if (error || (!user && hasFetchedUser.current)) {
//     return <Navigate to="/login" replace />;
//   }

//   // If user exists but is not authorized
//   if (user && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // User is authenticated and authorized
//   return children;
// };

// export default ProtectedRoute;










// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { getUser } from "../redux/auth/authSlice";
// import { Box, CircularProgress } from "@mui/material";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const dispatch = useDispatch();
//   const { user, loading } = useSelector((state) => state.auth);
  
//   // Use a local state to track if we've attempted to fetch the user
//   const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
  
//   // Check for the presence of a token
//   const hasToken = !!localStorage.getItem("accessToken");

//   useEffect(() => {
//     // Only attempt to fetch if there's a token and we haven't already
//     if (hasToken && !user && !loading && !hasAttemptedFetch) {
//       dispatch(getUser()).finally(() => {
//         // Set state after the fetch, regardless of success or failure
//         setHasAttemptedFetch(true);
//       });
//     }
//   }, [dispatch, hasToken, user, loading, hasAttemptedFetch]);

//   // Loading UI while waiting for user data
//   // Show spinner if we have a token but no user yet and we are loading or haven't attempted to fetch
//   if (loading || (hasToken && !user && !hasAttemptedFetch)) {
//     return (
//       <Box
//         sx={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           zIndex: 9999,
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // If no user exists after a fetch attempt, or if there was no token, redirect to login
//   if (!user && hasAttemptedFetch) {
//     return <Navigate to="/login" replace />;
//   }
  
//   // Also redirect if there was no token from the start
//   if (!hasToken) {
//     return <Navigate to="/login" replace />;
//   }

//   // If user exists but is not authorized
//   if (user && allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // User is authenticated and authorized
//   return children;
// };

// export default ProtectedRoute;




import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../redux/auth/authSlice";
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  // Use a local state to track if we've attempted to fetch the user
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  // Check for the presence of a token
  const hasToken = !!localStorage.getItem("accessToken");

  useEffect(() => {
    // Only attempt to fetch if there's a token and we haven't already
    if (hasToken && !user && !loading && !hasAttemptedFetch) {
      dispatch(getUser()).finally(() => {
        setHasAttemptedFetch(true);
      });
    }
  }, [dispatch, hasToken, user, loading, hasAttemptedFetch]);

  // Loading UI while waiting for user data
  if (loading || (hasToken && !user && !hasAttemptedFetch)) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If no user is authenticated or a fetch attempt failed
  if (!hasToken || (!user && hasAttemptedFetch)) {
    return <Navigate to="/login" replace />;
  }

  // Determine the user's role and the target route for unauthorized access
  const userRole = user?.role;
  let redirectPath = "/"; // Default redirect for 'user' and 'officeManager'

  // The 'superAdmin' and 'admin' roles should be redirected to '/superadmin'
  if (userRole === "admin" || userRole === "superAdmin") {
    redirectPath = "/superadmin";
  }

  // Check if the user's role is not included in the allowedRoles for this route
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect based on the user's role
    return <Navigate to={redirectPath} replace />;
  }

  // User is authenticated and authorized
  return children;
};

export default ProtectedRoute;