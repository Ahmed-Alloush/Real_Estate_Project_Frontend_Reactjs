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
// } from "@mui/material";
// import { styled, alpha } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/auth/authSlice";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import {
//   FavoriteOutlined,
//   NotificationImportantOutlined,
// } from "@mui/icons-material";
// import { getMyNotifications } from "../redux/notification/notificationSlice";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
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

// export default function Navbar() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.auth);
//   const { notifications } = useSelector((state) => state.notification);


//   useEffect(()=>{
    
//     if (user) {
//       dispatch(getMyNotifications())
//     }



//   },[])

//   const [anchorEl, setAnchorEl] = useState(null);

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

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         {/* Logo */}
//         <Typography
//           variant="h6"
//           component={Link}
//           to="/"
//           sx={{ color: "inherit", textDecoration: "none" }}
//         >
//           MyRealEstate
//         </Typography>

//         {/* Navigation Links */}
//         <Box sx={{ flexGrow: 1, ml: 4, display: "flex", gap: 2 }}>
//           <Typography
//             component={Link}
//             to="/properties"
//             sx={{ color: "inherit", textDecoration: "none" }}
//           >
//             Properties
//           </Typography>
//           <Typography
//             component={Link}
//             to="/offices"
//             sx={{ color: "inherit", textDecoration: "none" }}
//           >
//             Offices
//           </Typography>

//           {user?.role === "officeManager" && (
//             <Typography
//               component={Link}
//               to="/office/my-office"
//               sx={{ color: "inherit", textDecoration: "none" }}
//             >
//               My Office
//             </Typography>
//           )}

//           <Typography
//             component={Link}
//             to="reserved-property"
//             sx={{ color: "inherit", textDecoration: "none" }}
//           >
//             Reserved Properties
//           </Typography>

//           <Typography
//             component={Link}
//             to="favorite-property"
//             sx={{ color: "inherit", textDecoration: "none" }}
//           >
//             {/* <FavoriteOutlined/> */}
//             Favorite Properties
//           </Typography>

//           <Typography
//             component={Link}
//             to="favorite-office"
//             sx={{ color: "inherit", textDecoration: "none" }}
//           >
//             {/* <FavoriteOutlined/> */}
//             Favorite Offices
//           </Typography>
//         </Box>

//         <Box sx={{ ml: 2 }}>
//           <IconButton onClick={() => {}} color="inherit">
//             <Badge badgeContent={3} color="error">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>
//         </Box>

//         {/* Search Field */}
//         <Search>
//           <SearchIconWrapper>
//             <SearchIcon />
//           </SearchIconWrapper>
//           <StyledInputBase placeholder="Search…" />
//         </Search>

//         {/* Profile Icon */}
//         <Box sx={{ ml: 2 }}>
//           <IconButton
//             size="large"
//             color="inherit"
//             onClick={handleProfileMenuOpen}
//           >
//             <AccountCircle />
//           </IconButton>
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
//       </Toolbar>
//     </AppBar>
//   );
// }



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
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  getMyNotifications,
  getUnreadCount,
} from "../redux/notification/notificationSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notification);

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyNotifications());
      dispatch(getUnreadCount(user.id));
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

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          MyRealEstate
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, ml: 4, display: "flex", gap: 2 }}>
          <Typography
            component={Link}
            to="/properties"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Properties
          </Typography>
          <Typography
            component={Link}
            to="/offices"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Offices
          </Typography>

          {user?.role === "officeManager" && (
            <Typography
              component={Link}
              to="/office/my-office"
              sx={{ color: "inherit", textDecoration: "none" }}
            >
              My Office
            </Typography>
          )}

          <Typography
            component={Link}
            to="/reserved-property"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Reserved Properties
          </Typography>

          <Typography
            component={Link}
            to="/favorite-property"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Favorite Properties
          </Typography>

          <Typography
            component={Link}
            to="/favorite-office"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Favorite Offices
          </Typography>
        </Box>

        {/* 🔔 Notifications */}
        <Box sx={{ ml: 2 }}>
          <IconButton color="inherit" onClick={() => navigate("/notifications")}>
            <Badge badgeContent={unreadCount || '0'} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>

        {/* 🔍 Search */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" />
        </Search>

        {/* 👤 Profile */}
        <Box sx={{ ml: 2 }}>
          <IconButton size="large" color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircle />
          </IconButton>
        </Box>

        {/* 📋 Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
