// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   IconButton,
//   InputBase,
//   Menu,
//   MenuItem,
//   Badge,
//   useTheme,
//   useMediaQuery,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
// } from "@mui/material";
// import { styled, alpha } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/auth/authSlice";
// import {
//   getMyNotifications,
//   getUnreadCount,
// } from "../redux/notification/notificationSlice";
// import LanguageSwitcher from "./LanguageSwitcher";

// // --- Styled Components (updated) ---

// export const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: theme.spacing(2),
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     width: "auto",
//     marginLeft: theme.spacing(3),
//   },
//   transition: "width 0.3s ease-in-out",
// }));

// export const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// export const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "20ch",
//       "&:focus": {
//         width: "30ch",
//       },
//     },
//   },
// }));

// const NavLink = styled(Typography)(({ theme }) => ({
//   textDecoration: "none",
//   color: "inherit",
//   fontWeight: 600,
//   padding: "0 8px",
//   "&:hover": {
//     color: theme.palette.secondary.main,
//     borderBottom: `2px solid ${theme.palette.secondary.main}`,
//   },
//   transition: "all 0.2s ease-in-out",
// }));

// // --- Navbar Component ---

// export default function Navbar() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const { user } = useSelector((state) => state.auth);
//   const { unreadCount } = useSelector((state) => state.notification);

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   useEffect(() => {
//     if (user?.id) {
//       dispatch(getMyNotifications());
//       // dispatch(getUnreadCount(user.id));
//     }
//   }, [dispatch, user?.id]);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleProfileClick = () => {
//     handleMenuClose();
//     navigate("/profile");
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     handleMenuClose();
//     navigate("/login");
//   };

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const navLinks = (
//     <>
//       <NavLink component={Link} to="/properties">
//         Properties
//       </NavLink>
//       <NavLink component={Link} to="/offices">
//         Offices
//       </NavLink>
//       {user?.role === "officeManager" && (
//         <NavLink component={Link} to="/office/my-office">
//           My Office
//         </NavLink>
//       )}
//       <NavLink component={Link} to="/reserved-property">
//         Reserved Properties
//       </NavLink>
//       <NavLink component={Link} to="/favorite-property">
//         Favorite Properties
//       </NavLink>
//       <NavLink component={Link} to="/favorite-office">
//         Favorite Offices
//       </NavLink>
//     </>
//   );

//   return (
//     <AppBar position="sticky">
//       <Toolbar>
//         {/* Mobile menu button */}
//         {isMobile && (
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             onClick={toggleDrawer(true)}
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//         )}

//         {/* Logo */}
//         <Typography
//           variant="h5"
//           component={Link}
//           to="/"
//           sx={{
//             color: "inherit",
//             textDecoration: "none",
//             fontWeight: 700,
//             flexGrow: isMobile ? 1 : 0,
//           }}
//         >
//           MyRealEstate
//         </Typography>

//         {/* Desktop Navigation Links */}
//         {!isMobile && (
//           <Box sx={{ ml: 4, display: "flex", alignItems: "center", gap: 3 }}>
//             {navLinks}
//           </Box>
//         )}

//         {/* Spacer to push items to the right */}
//         <Box sx={{ flexGrow: 1 }} />

//         {/* Search, Notifications, Profile */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <IconButton
//             color="inherit"
//             onClick={() => navigate("/notifications")}
//           >
//             <Badge badgeContent={unreadCount || "0"} color="error">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>

//           <IconButton
//             size="large"
//             color="inherit"
//             onClick={handleProfileMenuOpen}
//           >
//             <AccountCircle />
//           </IconButton>
//         <Box>
//           <LanguageSwitcher/>
//         </Box>
//         </Box>

//         {/* Profile Menu */}
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//         >
//           <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
//           <MenuItem onClick={handleLogout}>Logout</MenuItem>
//         </Menu>

//         {/* Mobile Navigation Drawer */}
//         <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
//           <Box
//             sx={{ width: 250, p: 2 }}
//             role="presentation"
//             onClick={toggleDrawer(false)}
//             onKeyDown={toggleDrawer(false)}
//           >
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Navigation
//             </Typography>
//             <Divider />
//             <List>
//               <ListItem button component={Link} to="/properties">
//                 <ListItemText primary="Properties" />
//               </ListItem>
//               <ListItem button component={Link} to="/offices">
//                 <ListItemText primary="Offices" />
//               </ListItem>
//               {user?.role === "officeManager" && (
//                 <ListItem button component={Link} to="/office/my-office">
//                   <ListItemText primary="My Office" />
//                 </ListItem>
//               )}
//               <ListItem button component={Link} to="/reserved-property">
//                 <ListItemText primary="Reserved Properties" />
//               </ListItem>
//               <ListItem button component={Link} to="/favorite-property">
//                 <ListItemText primary="Favorite Properties" />
//               </ListItem>
//               <ListItem button component={Link} to="/favorite-office">
//                 <ListItemText primary="Favorite Offices" />
//               </ListItem>
//             </List>
//           </Box>
//         </Drawer>
//       </Toolbar>
//     </AppBar>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../redux/auth/authSlice";
import {
  getMyNotifications,
  getUnreadCount,
} from "../redux/notification/notificationSlice";
import LanguageSwitcher from "./LanguageSwitcher";
import { DarkModeSwitch } from "./mode/DarkModeSwitch";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Sun icon for light mode
import Brightness2Icon from "@mui/icons-material/Brightness2"; // Moon icon for dark mode
import { toggleTheme } from "../redux/them/themSlice"; // Import the correct action

// --- Styled Components (updated for RTL support) ---

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.direction === "rtl" ? 0 : theme.spacing(2),
  marginRight: theme.direction === "rtl" ? theme.spacing(2) : 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
    marginLeft: theme.direction === "rtl" ? 0 : theme.spacing(3),
    marginRight: theme.direction === "rtl" ? theme.spacing(3) : 0,
  },
  transition: "width 0.3s ease-in-out",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: theme.direction === "rtl" ? 0 : "auto",
  left: theme.direction === "rtl" ? "auto" : 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft:
      theme.direction === "rtl"
        ? theme.spacing(1)
        : `calc(1em + ${theme.spacing(4)})`,
    paddingRight:
      theme.direction === "rtl"
        ? `calc(1em + ${theme.spacing(4)})`
        : theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    textAlign: theme.direction === "rtl" ? "right" : "left",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const NavLink = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  fontWeight: 600,
  padding: "0 8px",
  "&:hover": {
    color: theme.palette.secondary.main,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
  transition: "all 0.2s ease-in-out",
  fontFamily: theme.direction === "rtl" ? "'Cairo', sans-serif" : "inherit",
}));

// --- Navbar Component ---

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();

  const { isDarkMode } = useSelector((state) => state.them);

  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notification);

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyNotifications());
      // dispatch(getUnreadCount(user.id));
    }
  }, [dispatch, user?.id]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/login");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      // Navigate to search results or perform search
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  // Navigation links with translations
  const navLinks = (
    <>
      <NavLink component={Link} to="/properties">
        {t("navbarProperties")}
      </NavLink>
      <NavLink component={Link} to="/offices">
        {t("offices")}
      </NavLink>
      {user?.role === "officeManager" && (
        <NavLink component={Link} to="/office/my-office">
          {t("myOffice")}
        </NavLink>
      )}
      <NavLink component={Link} to="/reserved-property">
        {t("reservedProperties")}
      </NavLink>
      <NavLink component={Link} to="/favorite-property">
        {t("navFavoriteProperties")}
      </NavLink>
      <NavLink component={Link} to="/favorite-office">
        {t("navFavoriteOffices")}
      </NavLink>
      <NavLink component={Link} to="/property-complaint">
        {t("navPropertyComplaint")}
      </NavLink>
      <NavLink component={Link} to="/office-complaint">
        {t("navOfficeComplaint")}
      </NavLink>
      <NavLink component={Link} to="/user-property">
        {t("navUserProperty")}
      </NavLink>
    </>
  );

  // Mobile drawer navigation items
  const drawerNavItems = [
    { path: "/properties", label: t("navbarProperties") },
    { path: "/offices", label: t("offices") },
    ...(user?.role === "officeManager"
      ? [{ path: "/office/my-office", label: t("myOffice") }]
      : []),
    { path: "/reserved-property", label: t("reservedProperties") },
    { path: "/favorite-property", label: t("navFavoriteProperties") },
    { path: "/favorite-office", label: t("navFavoriteOffices") },
    { path: "/property-complaint", label: t("navPropertyComplaint") },
    { path: "/office-complaint", label: t("navOfficeComplaint") },
    { path: "/user-property", label: t("navUserProperty") },
  ];

  const isRTL = i18n.language === "ar";

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Mobile menu button */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label={t("openMenu")}
            onClick={toggleDrawer(true)}
            sx={{
              mr: isRTL ? 0 : 2,
              ml: isRTL ? 2 : 0,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontWeight: 700,
            flexGrow: isMobile ? 1 : 0,
            fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
          }}
        >
          {t("appName", "MyRealEstate")}
        </Typography>

        {/* Desktop Navigation Links */}
        {!isMobile && (
          <Box
            sx={{
              ml: isRTL ? 0 : 4,
              mr: isRTL ? 4 : 0,
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            {navLinks}
          </Box>
        )}

        {/* Spacer to push items to the right/left based on direction */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Notifications, Profile, Language Switcher */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          {/* Language Switcher */}
          <LanguageSwitcher variant="icon" />

          <DarkModeSwitch
            checked={isDarkMode}
            onChange={() => dispatch(toggleTheme())} // Correct way to pass a function
            icon={<WbSunnyIcon />} // Sun icon
            checkedIcon={<Brightness2Icon />} // Moon icon
          />
          {/* Notifications */}
          <IconButton
            color="inherit"
            onClick={() => navigate("/notifications")}
            aria-label={t("notifications")}
          >
            <Badge badgeContent={unreadCount || "0"} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile */}
          <IconButton
            size="large"
            color="inherit"
            onClick={handleProfileMenuOpen}
            aria-label={t("profile")}
          >
            <AccountCircle />
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{
            horizontal: isRTL ? "left" : "right",
            vertical: "top",
          }}
          anchorOrigin={{
            horizontal: isRTL ? "left" : "right",
            vertical: "bottom",
          }}
        >
          <MenuItem
            onClick={handleProfileClick}
            sx={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit" }}
          >
            {t("myProfile")}
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit" }}
          >
            {t("logout")}
          </MenuItem>
        </Menu>

        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor={isRTL ? "right" : "left"}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{
              width: 250,
              p: 2,
              direction: isRTL ? "rtl" : "ltr",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t("navigation")}
            </Typography>
            <Divider />
            <List>
              {drawerNavItems.map((item, index) => (
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  key={index}
                  sx={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      textAlign: isRTL ? "right" : "left",
                      "& .MuiListItemText-primary": {
                        fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
