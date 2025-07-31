import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import OfficeReducer from "../redux/office/officeSlice";
import superAdminReducer from "../redux/superAdmin/superAdminSlice";
import blogReducer from "../redux/blog/blogSlice";
import propertyReducer from "../redux/property/propertySlice";
import manageUserReducer from "../redux/superAdmin/manageUserSlice";
import manageOfficeReducer from "../redux/superAdmin/manageOfficeSlice";
import managePropertyReducer from "../redux/superAdmin/managePropertySlice";
import reservationReducer from "../redux/reservation/reservationSlice";
import subscriptionReducer from "../redux/subscription/subscriptionSlice";
import officeSubscriptionReducer from "../redux/office subscription/officeSubscriptionSlice";
import notificationReducer from "../redux/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    office: OfficeReducer,
    superAdmin: superAdminReducer,
    blog: blogReducer,
    property: propertyReducer,
    manageUser: manageUserReducer,
    manageOffice: manageOfficeReducer,
    manageProperty: managePropertyReducer, // <-- Add this
    reservation: reservationReducer, // Add this line
    subscription: subscriptionReducer, // Add this line
    officeSubscription: officeSubscriptionReducer, // Add this line
    notification:notificationReducer
  },
});
