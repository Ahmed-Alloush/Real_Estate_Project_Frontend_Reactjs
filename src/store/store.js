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
import propertyRequestReducer from "../redux/property request/propertyRequestSlice";
import propertyTypeReducer from "../redux/property type/propertyTypeSlice";
import licenseTypeReducer from "../redux/license type/licenseTypeSlice";
import officeCommentReducer from "../redux/office comment/officeCommentSlice";
import attributeReducer from "../redux/attribute/attributeSlice";
import statisticsReducer from "../redux/superAdmin/statisticsSlice";
import officeComplaintReducer from "../redux/superAdmin/manageOfficeComplaintSlice";
import propertyComplaintReducer from "../redux/superAdmin/managePropertyComplaintSlice";
import themReducer from "../redux/them/themSlice";


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
    notification:notificationReducer,
    propertyRequest: propertyRequestReducer,
    propertyType:propertyTypeReducer,
    attribute:attributeReducer,
    licenseType:licenseTypeReducer,
    officeComment:officeCommentReducer,
    statistics:statisticsReducer,
    officeComplaint:officeComplaintReducer,
    propertyComplaint:propertyComplaintReducer,
    them:themReducer,
  },
});
