// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Layout } from "./pages/Layout";
// import { Home } from "./pages/Home";
// import { About } from "./pages/About";
// import StartRegisteringUserForm from "./components/StartRegisteringUserForm";
// import VerificationCode from "./components/VerificationCode";
// import CompleteRegistering from "./components/CompleteRegistering";
// import LoginForm from "./components/LoginForm";
// import Profile from "./components/Profile";
// import CreateOfficeForm from "./components/CreateOfficeForm";
// import StartRegisteringOfficeManagerForm from "./components/StartRegisteringOfficeManagerForm";
// import OfficesPage from "./pages/OfficesPage";
// import AddAdminForm from "./components/AddAdminForm";
// import SuperAdminDashboard from "./pages/SuperAdminDashboard";
// import Unauthorized from "./pages/Unauthorized";
// import ProtectedRoute from "./components/ProtectedRoute";
// import UserManagingPage from "./pages/UserManagingPage";
// import UserDetailsPage from "./pages/UserDetailsPage";
// import OfficePage from "./pages/OfficePage";
// import OfficeManagerPage from "./pages/OfficeManagerPage";
// import PropertyList from "./components/propertyList";
// import CreatePropertyForm from "./components/property/CreatePropertyForm";
// import PropertyPage from "./pages/PropertyPage";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Layout routes with Navbar */}
//         <Route path="/" element={<Layout />}>
//           {/* <ProtectedRoute
//             allowedRoles={["superAdmin", "user", "officeManager", "admin"]}
//           > */}
//             <Route index element={<Home />} />
//             <Route path="profile" element={<Profile />} />
//             <Route path="about" element={<About />} />
//             <Route path="offices" element={<OfficesPage />} />
//             <Route path="office/my-office" element={<OfficeManagerPage />} >
//             <Route path="add-property" element={<CreatePropertyForm />} />
//             </Route>
//             <Route path="offices/:id" element={<OfficePage />} />
//             <Route path="properties" element={<PropertyPage />} />
//           <Route path="/office-creating" element={<CreateOfficeForm />} />
//           <Route path="/property/new" element={<CreatePropertyForm />} />

//         </Route>

//         <Route
//           path="/superadmin"
//           element={
//             <ProtectedRoute allowedRoles={["superAdmin"]}>
//               <SuperAdminDashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="add-admin" element={<AddAdminForm />} />
//           <Route path="manage-users" element={<UserManagingPage />} />
//           <Route path="manage-users/:id" element={<UserDetailsPage />} />
//         </Route>

//         {/* routes WITHOUT Navbar */}
//         <Route
//           path="/start-registering-user"
//           element={<StartRegisteringUserForm />}
//         />
//         <Route
//           path="/start-registering-office-manager"
//           element={<StartRegisteringOfficeManagerForm />}
//         />
//         <Route path="/verify-code" element={<VerificationCode />} />
//         <Route path="/complete-registering" element={<CompleteRegistering />} />
//         <Route path="/login" element={<LoginForm />} />

//         <Route path="/unauthorized" element={<Unauthorized />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { AdminAndSuperLayout } from "./pages/AdminAndSuperLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages and components
import { Home } from "./pages/Home";
import Profile from "./components/Profile";
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

import LoginPage from "./components/LoginPage";
import StartRegisteringUserForm from "./components/StartRegisteringUserForm";
import StartRegisteringOfficeManagerForm from "./components/StartRegisteringOfficeManagerForm";
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
import { useEffect } from "react";
import socket, { registerSocketUser } from "./socket";
import NotificationPage from "./pages/NotificationPage";
import {
  getMyNotifications,
  getUnreadCount,
  increaseUnReadCount,
} from "./redux/notification/notificationSlice";

export default function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  useEffect(() => {
    const userId = user?.id;
    registerSocketUser(userId);

    socket.on("receiveNotification", (data) => {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(data.title, {
          body: data.message,
        });
      }
      dispatch(increaseUnReadCount());
    });
    // When a new notification is received:
    // 1. Fetch all notifications (if needed, e.g., to display on the notifications page)
    // dispatch(getMyNotifications());
    // // 2. Crucially, re-fetch the unread count to update the badge in the Navbar
    // dispatch(getUnreadCount(user?.id)); // Pass userId if your getUnreadCount requires it

    return () => {
      socket.off("receiveNotification");
    };
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Layout for User + OfficeManager */}
        <Route element={<Layout />}>
          <Route
            path="/home"
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
                <Profile />
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
            path="/office-creating"
            element={
              <ProtectedRoute allowedRoles={["officeManager"]}>
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
                allowedRoles={["user", "officeManager", "superAdmin", "admin"]}
              >
                <PropertyDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorite-property"
            element={
              <ProtectedRoute
                allowedRoles={["user", "officeManager", "superAdmin", "admin"]}
              >
                <FavoritePropertyPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorite-office"
            element={
              <ProtectedRoute
                allowedRoles={["user", "officeManager", "superAdmin", "admin"]}
              >
                <FavoriteOfficePage />
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
                <SuperAdminDashboard />
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
          {/* You can add Admin routes here similarly */}
        </Route>

        {/* Routes without layout (public) */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/start-registering-user"
          element={<StartRegisteringUserForm />}
        />
        <Route
          path="/start-registering-office-manager"
          element={<StartRegisteringOfficeManagerForm />}
        />
        <Route path="/verify-code" element={<VerificationCode />} />
        <Route path="/complete-registering" element={<CompleteRegistering />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/reserve/:id" element={<PaymentPage />} />
        <Route path="/subscribe/:id" element={<PaymentPageForSubscrbing />} />
      </Routes>
    </BrowserRouter>
  );
}
