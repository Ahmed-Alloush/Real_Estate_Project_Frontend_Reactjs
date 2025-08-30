// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Layout } from "./pages/Layout";
// import { AdminAndSuperLayout } from "./pages/AdminAndSuperLayout";
// import ProtectedRoute from "./components/ProtectedRoute";

// // Pages and components
// import { Home } from "./pages/Home";
// import Profile from "./components/Profile";
// import OfficesPage from "./pages/OfficesPage";
// import OfficeDetailsPage from "./pages/OfficeDetailsPage";
// import OfficeManagerPage from "./pages/OfficeManagerPage";
// import CreateOfficeForm from "./components/CreateOfficeForm";
// import CreatePropertyForm from "./components/property/CreatePropertyForm";
// import PropertyPage from "./pages/PropertyPage";

// import SuperAdminDashboard from "./pages/SuperAdminDashboard";
// import AddAdminForm from "./components/AddAdminForm";
// import UserManagingPage from "./pages/UserManagingPage";
// import UserDetailsPage from "./pages/UserDetailsPage";

// import LoginPage from "./pages/LoginPage";
// import StartRegisteringUserForm from "./components/StartRegisteringUserForm";
// import VerificationCode from "./components/VerificationCode";
// import CompleteRegistering from "./components/CompleteRegistering";
// import Unauthorized from "./pages/Unauthorized";
// import { About } from "./pages/About";
// import ManageOfficePage from "./pages/adminAndSuperAdmin/ManageOfficePage";
// import ManagePropertyPage from "./pages/adminAndSuperAdmin/ManagePropertyPage";
// import PropertyDetailsPage from "./pages/PropertyDetailsPage";
// import PaymentPage from "./pages/PaymentPage";
// import ReservedPropertyPage from "./pages/ReservedPropertyPage";
// import SubscriptionPage from "./pages/SubscriptionPage";
// import PaymentPageForSubscrbing from "./pages/PaymentPageForSubscrbing";
// import FavoritePropertyPage from "./pages/FavoritePropertyPage";
// import FavoriteOfficePage from "./pages/FavoriteOfficePage";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import socket, { registerSocketUser } from "./socket";
// import NotificationPage from "./pages/NotificationPage";
// import {
//   getMyNotifications,
//   getUnreadCount,
//   increaseUnReadCount,
// } from "./redux/notification/notificationSlice";
// import PropertyRequestsPage from "./pages/adminAndSuperAdmin/PropertyRequestsPage";
// import ManageLicenseTypePage from "./pages/adminAndSuperAdmin/ManageLicenseTypePage";
// import UpdatePropertyPage from "./pages/UpdatePropertyPage";
// import PaymentPageForDeletingProperty from "./pages/PaymentPageForDeletingProperty";

// export default function App() {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission().then((permission) => {
//         console.log("Notification permission:", permission);
//       });
//     }
//   }, []);

//   useEffect(() => {
//     const userId = user?.id;
//     registerSocketUser(userId);

//     socket.on("receiveNotification", (data) => {
//       if ("Notification" in window && Notification.permission === "granted") {
//         new Notification(data.title, {
//           body: data.message,
//         });
//       }
//       dispatch(increaseUnReadCount());
//     });
//     // When a new notification is received:
//     // 1. Fetch all notifications (if needed, e.g., to display on the notifications page)
//     // dispatch(getMyNotifications());
//     // // 2. Crucially, re-fetch the unread count to update the badge in the Navbar
//     // dispatch(getUnreadCount(user?.id)); // Pass userId if your getUnreadCount requires it

//     return () => {
//       socket.off("receiveNotification");
//     };
//   }, [user]);

//   return (

//         <BrowserRouter>
//           <Routes>
//             {/* Layout for User + OfficeManager */}
//             <Route element={<Layout />}>
//               <Route
//                 path="/"
//                 element={
//                   <ProtectedRoute allowedRoles={["user", "officeManager"]}>
//                     <Home />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="profile"
//                 element={
//                   <ProtectedRoute allowedRoles={["user", "officeManager"]}>
//                     <Profile />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="about"
//                 element={
//                   <ProtectedRoute allowedRoles={["user", "officeManager"]}>
//                     <About />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="offices"
//                 element={
//                   <ProtectedRoute allowedRoles={["user", "officeManager"]}>
//                     <OfficesPage />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="offices/:id"
//                 element={
//                   <ProtectedRoute allowedRoles={["user", "officeManager"]}>
//                     <OfficeDetailsPage />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="office/my-office"
//                 element={
//                   <ProtectedRoute allowedRoles={["officeManager"]}>
//                     <OfficeManagerPage />
//                   </ProtectedRoute>
//                 }
//               >
//                 <Route
//                   path="add-property"
//                   element={
//                     <ProtectedRoute allowedRoles={["officeManager"]}>
//                       <CreatePropertyForm />
//                     </ProtectedRoute>
//                   }
//                 />
//               </Route>

//               <Route
//                 path="update-property/:id"
//                 element={
//                   <ProtectedRoute allowedRoles={["officeManager"]}>
//                     <UpdatePropertyPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="delete-property/:id"
//                 element={
//                   <ProtectedRoute allowedRoles={["officeManager"]}>
//                     <PaymentPageForDeletingProperty />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/create-office"
//                 element={
//                   <ProtectedRoute allowedRoles={["officeManager", "user"]}>
//                     <CreateOfficeForm />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/property/new"
//                 element={
//                   <ProtectedRoute allowedRoles={["officeManager"]}>
//                     <CreatePropertyForm />
//                   </ProtectedRoute>
//                 }
//               />
//               {/* <Route
//             path="my-office/update-property/:id"
//             element={<UpdatePropertyPage />}
//           /> */}
//               <Route
//                 path="/properties"
//                 element={
//                   <ProtectedRoute allowedRoles={["user", "officeManager"]}>
//                     <PropertyPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/reserved-property"
//                 element={
//                   <ProtectedRoute allowedRoles={["user", "officeManager"]}>
//                     <ReservedPropertyPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/properties/:id"
//                 element={
//                   <ProtectedRoute
//                     allowedRoles={[
//                       "user",
//                       "officeManager",
//                       "superAdmin",
//                       "admin",
//                     ]}
//                   >
//                     <PropertyDetailsPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/favorite-property"
//                 element={
//                   <ProtectedRoute
//                     allowedRoles={[
//                       "user",
//                       "officeManager",
//                       "superAdmin",
//                       "admin",
//                     ]}
//                   >
//                     <FavoritePropertyPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/favorite-office"
//                 element={
//                   <ProtectedRoute
//                     allowedRoles={[
//                       "user",
//                       "officeManager",
//                       "superAdmin",
//                       "admin",
//                     ]}
//                   >
//                     <FavoriteOfficePage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/subscriptions"
//                 element={
//                   <ProtectedRoute allowedRoles={["officeManager"]}>
//                     <SubscriptionPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/notifications"
//                 element={
//                   <ProtectedRoute allowedRoles={["officeManager", "user"]}>
//                     <NotificationPage />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>

//             {/* Layout for Admin and Super Admin */}
//             <Route element={<AdminAndSuperLayout />}>
//               <Route
//                 index
//                 path="/superadmin"
//                 element={
//                   <ProtectedRoute allowedRoles={["superAdmin"]}>
//                     <SuperAdminDashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/superadmin/add-admin"
//                 element={
//                   <ProtectedRoute allowedRoles={["superAdmin"]}>
//                     <AddAdminForm />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/superadmin/manage-users"
//                 element={
//                   <ProtectedRoute allowedRoles={["superAdmin"]}>
//                     <UserManagingPage />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/superadmin/manage-users/:id"
//                 element={
//                   <ProtectedRoute allowedRoles={["superAdmin"]}>
//                     <UserDetailsPage />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/superadmin/manage-offices"
//                 element={
//                   <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
//                     <ManageOfficePage />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/superadmin/manage-properties"
//                 element={
//                   <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
//                     <ManagePropertyPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/superadmin/manage-properties-requestes"
//                 element={
//                   <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
//                     <PropertyRequestsPage />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/superadmin/manage-license-type"
//                 element={
//                   <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
//                     <ManageLicenseTypePage />
//                   </ProtectedRoute>
//                 }
//               />
//               {/* You can add Admin routes here similarly */}
//             </Route>

//             {/* Routes without layout (public) */}
//             <Route path="/login" element={<LoginPage />} />
//             <Route
//               path="/start-registering-user"
//               element={<StartRegisteringUserForm />}
//             />
//             <Route path="/verify-code" element={<VerificationCode />} />
//             <Route
//               path="/complete-registering"
//               element={<CompleteRegistering />}
//             />
//             <Route path="/unauthorized" element={<Unauthorized />} />
//             <Route path="/reserve/:id" element={<PaymentPage />} />
//             <Route
//               path="/subscribe/:id"
//               element={<PaymentPageForSubscrbing />}
//             />
//           </Routes>
//         </BrowserRouter>

//   );
// }

// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser } from "./redux/auth/authSlice";
// import { getMyNotifications, increaseUnReadCount } from "./redux/notification/notificationSlice";
// import socket, { registerSocketUser } from "./socket";
// import ProtectedRoute from "./components/ProtectedRoute";
// import LoadingScreen from "./components/LoadingScreen"; // You'll need to create this component

// // Layouts
// import { Layout } from "./pages/Layout";
// import { AdminAndSuperLayout } from "./pages/AdminAndSuperLayout";

// // User and OfficeManager Pages
// import { Home } from "./pages/Home";
// import Profile from "./components/Profile";
// import OfficesPage from "./pages/OfficesPage";
// import OfficeDetailsPage from "./pages/OfficeDetailsPage";
// import OfficeManagerPage from "./pages/OfficeManagerPage";
// import CreateOfficeForm from "./components/CreateOfficeForm";
// import CreatePropertyForm from "./components/property/CreatePropertyForm";
// import PropertyPage from "./pages/PropertyPage";
// import PropertyDetailsPage from "./pages/PropertyDetailsPage";
// import PaymentPage from "./pages/PaymentPage";
// import ReservedPropertyPage from "./pages/ReservedPropertyPage";
// import SubscriptionPage from "./pages/SubscriptionPage";
// import PaymentPageForSubscrbing from "./pages/PaymentPageForSubscrbing";
// import FavoritePropertyPage from "./pages/FavoritePropertyPage";
// import FavoriteOfficePage from "./pages/FavoriteOfficePage";
// import NotificationPage from "./pages/NotificationPage";
// import { About } from "./pages/About";

// // Admin and SuperAdmin Pages
// import SuperAdminDashboard from "./pages/SuperAdminDashboard";
// import AddAdminForm from "./components/AddAdminForm";
// import UserManagingPage from "./pages/UserManagingPage";
// import UserDetailsPage from "./pages/UserDetailsPage";
// import ManageOfficePage from "./pages/adminAndSuperAdmin/ManageOfficePage";
// import ManagePropertyPage from "./pages/adminAndSuperAdmin/ManagePropertyPage";
// import PropertyRequestsPage from "./pages/adminAndSuperAdmin/PropertyRequestsPage";
// import ManageLicenseTypePage from "./pages/adminAndSuperAdmin/ManageLicenseTypePage";

// // Public Pages
// import LoginPage from "./pages/LoginPage";
// import StartRegisteringUserForm from "./components/StartRegisteringUserForm";
// import VerificationCode from "./components/VerificationCode";
// import CompleteRegistering from "./components/CompleteRegistering";
// import Unauthorized from "./pages/Unauthorized";

// export default function App() {
//   const dispatch = useDispatch();
//   const { user, loading, error } = useSelector((state) => state.auth);
//   const [initialUserLoaded, setInitialUserLoaded] = useState(false);

//   // // Initial user fetching
//   // useEffect(() => {
//   //   // Only fetch user on initial load
//   //   if (!user && !error) {
//   //     dispatch(getUser()).finally(() => {
//   //       setInitialUserLoaded(true);
//   //     });
//   //   } else {
//   //       setInitialUserLoaded(true);
//   //   }
//   // }, [dispatch, user, error]);

//   // Notification and Socket setup
//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   useEffect(() => {
//     const userId = user?.id;
//     if (userId) {
//       registerSocketUser(userId);
//       socket.on("receiveNotification", (data) => {
//         if ("Notification" in window && Notification.permission === "granted") {
//           new Notification(data.title, { body: data.message });
//         }
//         dispatch(increaseUnReadCount());
//       });
//     }

//     return () => {
//       socket.off("receiveNotification");
//     };
//   }, [user, dispatch]);

//   // Display a loading screen while user data is being fetched for the first time
//   if (loading || !initialUserLoaded) {
//     return <LoadingScreen />;
//   }

//   // --- Main Logic: Conditionally render the entire app based on user role ---

//   // ADMIN and SUPER ADMIN view
//   if (user && (user.role === "admin" || user.role === "superAdmin")) {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route element={<AdminAndSuperLayout />}>
//             <Route path="/superadmin" element={<SuperAdminDashboard />} />
//             <Route path="/superadmin/add-admin" element={<AddAdminForm />} />
//             <Route path="/superadmin/manage-users" element={<UserManagingPage />} />
//             <Route path="/superadmin/manage-users/:id" element={<UserDetailsPage />} />
//             <Route path="/superadmin/manage-offices" element={<ManageOfficePage />} />
//             <Route path="/superadmin/manage-properties" element={<ManagePropertyPage />} />
//             <Route path="/superadmin/manage-properties-requestes" element={<PropertyRequestsPage />} />
//             <Route path="/superadmin/manage-license-type" element={<ManageLicenseTypePage />} />
//             {/* Redirect any other path to the admin dashboard */}
//             <Route path="*" element={<Navigate to="/superadmin" />} />
//           </Route>
//           {/* Public routes for admin (e.g., login, unauthorized) */}
//           <Route path="/login" element={<Navigate to="/superadmin" />} />
//           <Route path="/unauthorized" element={<Unauthorized />} />
//         </Routes>
//       </BrowserRouter>
//     );
//   }

//   // GENERAL USER (including OfficeManager) and PUBLIC view
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Layout />}>
//           {/* Protected Routes for General Users and OfficeManagers */}
//           <Route path="/" element={<Home />} />
//           <Route path="/profile" element={<ProtectedRoute allowedRoles={["user", "officeManager"]}><Profile /></ProtectedRoute>} />
//           <Route path="/about" element={<About />} />
//           <Route path="/offices" element={<OfficesPage />} />
//           <Route path="/offices/:id" element={<OfficeDetailsPage />} />
//           <Route path="/office/my-office" element={<ProtectedRoute allowedRoles={["officeManager"]}><OfficeManagerPage /></ProtectedRoute>} />
//           <Route path="/office/my-office/add-property" element={<ProtectedRoute allowedRoles={["officeManager"]}><CreatePropertyForm /></ProtectedRoute>} />
//           <Route path="/create-office" element={<ProtectedRoute allowedRoles={["officeManager", "user"]}><CreateOfficeForm /></ProtectedRoute>} />
//           <Route path="/property/new" element={<ProtectedRoute allowedRoles={["officeManager"]}><CreatePropertyForm /></ProtectedRoute>} />
//           <Route path="/properties" element={<PropertyPage />} />
//           <Route path="/properties/:id" element={<PropertyDetailsPage />} />
//           <Route path="/reserved-property" element={<ProtectedRoute allowedRoles={["user", "officeManager"]}><ReservedPropertyPage /></ProtectedRoute>} />
//           <Route path="/favorite-property" element={<ProtectedRoute allowedRoles={["user", "officeManager"]}><FavoritePropertyPage /></ProtectedRoute>} />
//           <Route path="/favorite-office" element={<ProtectedRoute allowedRoles={["user", "officeManager"]}><FavoriteOfficePage /></ProtectedRoute>} />
//           <Route path="/subscriptions" element={<ProtectedRoute allowedRoles={["officeManager"]}><SubscriptionPage /></ProtectedRoute>} />
//           <Route path="/notifications" element={<ProtectedRoute allowedRoles={["officeManager", "user"]}><NotificationPage /></ProtectedRoute>} />

//           {/* Public Routes without Layout */}
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/start-registering-user" element={<StartRegisteringUserForm />} />
//           <Route path="/verify-code" element={<VerificationCode />} />
//           <Route path="/complete-registering" element={<CompleteRegistering />} />
//           <Route path="/unauthorized" element={<Unauthorized />} />
//           <Route path="/reserve/:id" element={<PaymentPage />} />
//           <Route path="/subscribe/:id" element={<PaymentPageForSubscrbing />} />

//           {/* Redirect to home for any admin routes accessed by a normal user */}
//           <Route path="/superadmin/*" element={<Navigate to="/" replace />} />

//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { AdminAndSuperLayout } from "./pages/AdminAndSuperLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// Pages and components
import { Home } from "./pages/Home";
import OfficesPage from "./pages/OfficesPage";
import OfficeDetailsPage from "./pages/OfficeDetailsPage";
import OfficeManagerPage from "./pages/OfficeManagerPage";
import CreateOfficeForm from "./components/CreateOfficeForm";
import CreatePropertyForm from "./components/property/CreatePropertyForm";
import PropertyPage from "./pages/PropertyPage";

import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AddAdminForm from "./components/AddAdminForm";
import UserManagingPage from "./pages/UserManagingPage";
import UserDetailsPage from "./pages/UserDetailsPage";

import LoginPage from "./pages/LoginPage";
import StartRegisteringUserForm from "./components/StartRegisteringUserForm";
import VerificationCode from "./components/VerificationCode";
import CompleteRegistering from "./components/CompleteRegistering";
import Unauthorized from "./pages/Unauthorized";
import { About } from "./pages/About";
import ManageOfficePage from "./pages/adminAndSuperAdmin/ManageOfficePage";
import ManagePropertyPage from "./pages/adminAndSuperAdmin/ManagePropertyPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import ReservedPropertyPage from "./pages/ReservedPropertyPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import PaymentPageForSubscrbing from "./pages/PaymentPageForSubscrbing";
import FavoritePropertyPage from "./pages/FavoritePropertyPage";
import FavoriteOfficePage from "./pages/FavoriteOfficePage";
import { useDispatch, useSelector } from "react-redux";
import socket, { registerSocketUser } from "./socket";
import NotificationPage from "./pages/NotificationPage";
import {
  getMyNotifications,
  getUnreadCount,
  increaseUnReadCount,
} from "./redux/notification/notificationSlice";
import PropertyRequestsPage from "./pages/adminAndSuperAdmin/PropertyRequestsPage";
import ManageLicenseTypePage from "./pages/adminAndSuperAdmin/ManageLicenseTypePage";
import UpdatePropertyPage from "./pages/UpdatePropertyPage";
import PaymentPageForDeletingProperty from "./pages/PaymentPageForDeletingProperty";
import ProfilePage from "./pages/ProfilePage";
import { DarkModeSwitch } from "./components/mode/DarkModeSwitch";
import { darkTheme, lightTheme } from "./theme";
import ManagePropertyTypePage from "./pages/adminAndSuperAdmin/ManagePropertyTypePage";
import ManageAttributePage from "./pages/adminAndSuperAdmin/ManageAttributePage";
import ManagePropertyComplaintPage from "./pages/adminAndSuperAdmin/ManagePropertyComplaintPage";
import ManageOfficeComplaintPage from "./pages/adminAndSuperAdmin/ManageOfficeComplaintPage";

import StatisticsDashboard from "./pages/adminAndSuperAdmin/StatisticsDashboardPage";
import OfficeComplaintPage from "./pages/OfficeComplaintPage";
import PropertyComplaintPage from "./pages/PropertyComplaintPage";
import UserPropertiesPage from "./pages/UserPropertiesPage";
import ArchivePage from "./pages/adminAndSuperAdmin/ArchivePage";

export default function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const { isDarkMode } = useSelector((state) => state.them);

  // // Create MUI theme with RTL support
  // const theme = createTheme({
  //   direction: i18n.language === "ar" ? "rtl" : "ltr",
  //   typography: {
  //     fontFamily:
  //       i18n.language === "ar"
  //         ? "'Cairo', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  //         : "'Roboto', 'Helvetica', 'Arial', sans-serif",
  //   },
  //   palette: {
  //     mode: "light", // You can make this dynamic based on user preference
  //   },
  //   components: {
  //     // MUI component customizations for RTL
  //     MuiTextField: {
  //       defaultProps: {
  //         dir: i18n.language === "ar" ? "rtl" : "ltr",
  //       },
  //     },
  //     MuiInputBase: {
  //       styleOverrides: {
  //         root: {
  //           textAlign: i18n.language === "ar" ? "right" : "left",
  //         },
  //       },
  //     },
  //     MuiButton: {
  //       styleOverrides: {
  //         root: {
  //           fontFamily:
  //             i18n.language === "ar"
  //               ? "'Cairo', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  //               : "'Roboto', 'Helvetica', 'Arial', sans-serif",
  //         },
  //       },
  //     },
  //     MuiTypography: {
  //       styleOverrides: {
  //         root: {
  //           fontFamily:
  //             i18n.language === "ar"
  //               ? "'Cairo', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  //               : "'Roboto', 'Helvetica', 'Arial', sans-serif",
  //         },
  //       },
  //     },
  //   },
  // });

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  useEffect(() => {
    // This effect should only run when the user state changes.
    const userId = user?.id;

    if (userId) {
      // Register the user with the socket and handle connection/disconnection
      // Use a function to ensure correct logic on connect/disconnect
      socket.connect();
      socket.emit("registerUser", userId);

      const handleReceiveNotification = (data) => {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(data.title, {
            body: data.message,
          });
        }
        dispatch(increaseUnReadCount());
      };

      socket.on("receiveNotification", handleReceiveNotification);

      // Cleanup function to run when the component unmounts or dependencies change
      return () => {
        socket.off("receiveNotification", handleReceiveNotification);
        // Disconnect the socket when the user logs out or the component unmounts
        // socket.disconnect();
        // Note: You can uncomment this if you want to explicitly disconnect on logout.
        // For page refresh, the browser handles the disconnection, and the backend handles the cleanup.
      };
    } else {
      // Disconnect the socket if there is no user
      socket.disconnect();
    }
  }, [user, dispatch]);

  useEffect(() => {
    const isRTL = i18n.language === "ar";
    document.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;

    // Update body class for CSS targeting
    document.body.className = isRTL ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Layout for User + OfficeManager */}
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["user", "officeManager"]}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute allowedRoles={["user", "officeManager"]}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="about"
              element={
                <ProtectedRoute allowedRoles={["user", "officeManager"]}>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="offices"
              element={
                <ProtectedRoute allowedRoles={["user", "officeManager"]}>
                  <OfficesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="offices/:id"
              element={
                <ProtectedRoute allowedRoles={["user", "officeManager"]}>
                  <OfficeDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="office/my-office"
              element={
                <ProtectedRoute allowedRoles={["officeManager"]}>
                  <OfficeManagerPage />
                </ProtectedRoute>
              }
            >
              <Route
                path="add-property"
                element={
                  <ProtectedRoute allowedRoles={["officeManager"]}>
                    <CreatePropertyForm />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path="update-property/:id"
              element={
                <ProtectedRoute allowedRoles={["officeManager"]}>
                  <UpdatePropertyPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="delete-property/:id"
              element={
                <ProtectedRoute allowedRoles={["officeManager"]}>
                  <PaymentPageForDeletingProperty />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-office"
              element={
                <ProtectedRoute allowedRoles={["officeManager", "user"]}>
                  <CreateOfficeForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/property/new"
              element={
                <ProtectedRoute allowedRoles={["officeManager"]}>
                  <CreatePropertyForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/properties"
              element={
                <ProtectedRoute allowedRoles={["user", "officeManager"]}>
                  <PropertyPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reserved-property"
              element={
                <ProtectedRoute allowedRoles={["user", "officeManager"]}>
                  <ReservedPropertyPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/properties/:id"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "officeManager",
                    "superAdmin",
                    "admin",
                  ]}
                >
                  <PropertyDetailsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/favorite-property"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "officeManager",
                    "superAdmin",
                    "admin",
                  ]}
                >
                  <FavoritePropertyPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/favorite-office"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "officeManager",
                    "superAdmin",
                    "admin",
                  ]}
                >
                  <FavoriteOfficePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/office-complaint"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "officeManager",
                    "superAdmin",
                    "admin",
                  ]}
                >
                  <OfficeComplaintPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/property-complaint"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "officeManager",
                    "superAdmin",
                    "admin",
                  ]}
                >
                  <PropertyComplaintPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user-property"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "user",
                    "officeManager",
                    "superAdmin",
                    "admin",
                  ]}
                >
                  <UserPropertiesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/subscriptions"
              element={
                <ProtectedRoute allowedRoles={["officeManager"]}>
                  <SubscriptionPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notifications"
              element={
                <ProtectedRoute allowedRoles={["officeManager", "user"]}>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Layout for Admin and Super Admin */}
          <Route element={<AdminAndSuperLayout />}>
            <Route
              index
              path="/superadmin"
              element={
                <ProtectedRoute allowedRoles={["superAdmin"]}>
                  <StatisticsDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/add-admin"
              element={
                <ProtectedRoute allowedRoles={["superAdmin"]}>
                  <AddAdminForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/manage-users"
              element={
                <ProtectedRoute allowedRoles={["superAdmin"]}>
                  <UserManagingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/manage-users/:id"
              element={
                <ProtectedRoute allowedRoles={["superAdmin"]}>
                  <UserDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/manage-offices"
              element={
                <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
                  <ManageOfficePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/manage-properties"
              element={
                <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
                  <ManagePropertyPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/superadmin/manage-properties-requestes"
              element={
                <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
                  <PropertyRequestsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/manage-license-type"
              element={
                <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
                  <ManageLicenseTypePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/superadmin/manage-property-type"
              element={
                <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
                  <ManagePropertyTypePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/manage-attribute"
              element={
                <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
                  <ManageAttributePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/superadmin/manage-property-complaint"
              element={
                <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
                  <ManagePropertyComplaintPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/superadmin/manage-office-complaint"
              element={
                <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
                  <ManageOfficeComplaintPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/superadmin/manage-archive"
              element={
                <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
                  <ArchivePage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Routes without layout (public) */}
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/start-registering-user"
            element={<StartRegisteringUserForm />}
          />
          <Route path="/verify-code" element={<VerificationCode />} />
          <Route
            path="/complete-registering"
            element={<CompleteRegistering />}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/reserve/:id" element={<PaymentPage />} />
          <Route path="/subscribe/:id" element={<PaymentPageForSubscrbing />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

// useEffect(() => {
//   const userId = user?.id;
//   registerSocketUser(userId);

//   socket.on("receiveNotification", (data) => {
//     if ("Notification" in window && Notification.permission === "granted") {
//       new Notification(data.title, {
//         body: data.message,
//       });
//     }
//     dispatch(increaseUnReadCount());
//   });

//   return () => {
//     socket.off("receiveNotification");
//   };
// }, [user, dispatch]);

// Handle language change and document direction
