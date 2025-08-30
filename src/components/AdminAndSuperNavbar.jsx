// // import React from "react";

// // import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
// // import { styled, alpha } from "@mui/material/styles";
// // import { Link, useNavigate } from "react-router-dom";
// // function AdminAndSuperNavbar() {
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     handleMenuClose();
// //     navigate("/login");
// //   };

// //   return (
// //     <AppBar position="static">
// //       <Toolbar>
// //         <Typography variant="h6" sx={{ flexGrow: 1 }}>
// //           SuperAdmin And Admin Dashboard
// //         </Typography>

// //         <Box>
// //           <Button color="inherit" component={Link} to="/superadmin/add-admin">
// //             Add Admin
// //           </Button>
// //           <Button
// //             color="inherit"
// //             component={Link}
// //             to="/superadmin/manage-users"
// //           >
// //             Manage Users
// //           </Button>

// //           <Button
// //             color="inherit"
// //             component={Link}
// //             to="/superadmin/manage-offices"
// //           >
// //             Offices
// //           </Button>

// //           <Button
// //             color="inherit"
// //             component={Link}
// //             to="/superadmin/manage-properties"
// //           >
// //             Properties
// //           </Button>
// //           <Button color="inherit" component={Link} to="/superadmin/reports">
// //             Reports
// //           </Button>
// //           <Button
// //             onClick={handleLogout}
// //             color="inherit"
// //             component={Link}
// //             to="/"
// //           >
// //             Logout
// //           </Button>
// //         </Box>
// //       </Toolbar>
// //     </AppBar>
// //   );
// // }

// // export default AdminAndSuperNavbar;

// /** @jsxImportSource @emotion/react */
// import React from "react";
// import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { css } from "@emotion/react";
// import styled from "@emotion/styled";
// import { logout } from "../redux/auth/authSlice"; // Adjust path if needed

// const NavbarButton = styled(Button)`
//   margin: 0 0.3rem;
//   padding: 8px 16px;
//   border-radius: 20px;
//   color: white;
//   background-color: rgba(255, 255, 255, 0.1);
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     background-color: rgba(255, 255, 255, 0.3);
//     transform: scale(1.05);
//   }
// `;

// const gradientAppBar = css`
//   background: linear-gradient(135deg, #3f51b5, #5c6bc0);
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
// `;

// const titleStyle = css`
//   font-weight: 600;
//   letter-spacing: 1px;
//   font-size: 1.25rem;
// `;

// function AdminAndSuperNavbar() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <AppBar position="static" css={gradientAppBar}>
//       <Toolbar>
//         <Typography variant="h6" css={titleStyle} sx={{ flexGrow: 1 }}>
//           Admin & SuperAdmin Dashboard
//         </Typography>

//         <Box>
//           <NavbarButton component={Link} to="/superadmin/add-admin">
//             Add Admin
//           </NavbarButton>
//           <NavbarButton component={Link} to="/superadmin/manage-users">
//             Manage Users
//           </NavbarButton>
//           <NavbarButton component={Link} to="/superadmin/manage-offices">
//             Offices
//           </NavbarButton>
//           <NavbarButton component={Link} to="/superadmin/manage-properties">
//             Properties
//           </NavbarButton>

//           <NavbarButton
//             component={Link}
//             to="/superadmin/manage-properties-requestes"
//           >
//             Properties Requestes
//           </NavbarButton>

//           <NavbarButton
//             component={Link}
//             to="/superadmin/manage-property-type"
//           >
//             Property Type
//           </NavbarButton>

//           <NavbarButton
//             component={Link}
//             to="/superadmin/manage-license-type"
//           >
//             License Type
//           </NavbarButton>

//           <NavbarButton component={Link} to="/superadmin/reports">
//             Reports
//           </NavbarButton>
//           <NavbarButton onClick={handleLogout}>Logout</NavbarButton>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default AdminAndSuperNavbar;

import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { logout } from "../redux/auth/authSlice";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
const NavbarButton = styled(Button)`
  margin: 0 0.3rem;
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
`;

const gradientAppBar = css`
  background: linear-gradient(135deg, #3f51b5, #5c6bc0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const titleStyle = css`
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 1.25rem;
`;

function AdminAndSuperNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" css={gradientAppBar}>
      <Toolbar>
        <Typography variant="h6" css={titleStyle} sx={{ flexGrow: 1 }}>
          {t("superAdminNav.title")}
        </Typography>

        <Box>
          <NavbarButton component={Link} to="/superadmin/add-admin">
            {t("superAdminNav.addAdmin")}
          </NavbarButton>
          <NavbarButton component={Link} to="/superadmin/manage-users">
            {t("superAdminNav.manageUsers")}
          </NavbarButton>
          <NavbarButton component={Link} to="/superadmin/manage-offices">
            {t("superAdminNav.offices")}
          </NavbarButton>
          <NavbarButton component={Link} to="/superadmin/manage-properties">
            {t("superAdminNav.properties")}
          </NavbarButton>
          <NavbarButton
            component={Link}
            to="/superadmin/manage-properties-requestes"
          >
            {t("superAdminNav.propertiesRequests")}
          </NavbarButton>
          <NavbarButton component={Link} to="/superadmin/manage-property-type">
            {t("superAdminNav.propertyType")}
          </NavbarButton>
          <NavbarButton component={Link} to="/superadmin/manage-license-type">
            {t("superAdminNav.licenseType")}
          </NavbarButton>
          <NavbarButton component={Link} to="/superadmin/manage-attribute">
            {t("superAdminNav.attribute")}
          </NavbarButton>
          {/* <NavbarButton component={Link} to="/superadmin/reports">
            {t("superAdminNav.reports")}
          </NavbarButton> */}
          <NavbarButton component={Link} to="/superadmin/manage-property-complaint">
            {t("superAdminNav.propertyComplaint")}
          </NavbarButton>

          <NavbarButton component={Link} to="/superadmin/manage-office-complaint">
            {t("superAdminNav.officeComplaint")}
          </NavbarButton>
          
          
          <NavbarButton onClick={handleLogout}>
            {t("superAdminNav.logout")}
          </NavbarButton>
        </Box>
        <Box color={"white"} bgcolor={"white"}>
          <LanguageSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AdminAndSuperNavbar;
