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
import { logout } from "../redux/auth/authSlice";
import {
  getMyNotifications,
  getUnreadCount,
} from "../redux/notification/notificationSlice";

// --- Styled Components (updated) ---

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
    marginLeft: theme.spacing(3),
  },
  transition: "width 0.3s ease-in-out",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
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
}));

// --- Navbar Component ---

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notification);

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);


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

  const navLinks = (
    <>
      <NavLink component={Link} to="/properties">
        Properties
      </NavLink>
      <NavLink component={Link} to="/offices">
        Offices
      </NavLink>
      {user?.role === "officeManager" && (
        <NavLink component={Link} to="/office/my-office">
          My Office
        </NavLink>
      )}
      <NavLink component={Link} to="/reserved-property">
        Reserved Properties
      </NavLink>
      <NavLink component={Link} to="/favorite-property">
        Favorite Properties
      </NavLink>
      <NavLink component={Link} to="/favorite-office">
        Favorite Offices
      </NavLink>
    </>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Mobile menu button */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
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
          }}
        >
          MyRealEstate
        </Typography>

        {/* Desktop Navigation Links */}
        {!isMobile && (
          <Box sx={{ ml: 4, display: "flex", alignItems: "center", gap: 3 }}>
            {navLinks}
          </Box>
        )}

        {/* Spacer to push items to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Search, Notifications, Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="inherit"
            onClick={() => navigate("/notifications")}
          >
            <Badge badgeContent={unreadCount || "0"} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        {/* Mobile Navigation Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250, p: 2 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Navigation
            </Typography>
            <Divider />
            <List>
              <ListItem button component={Link} to="/properties">
                <ListItemText primary="Properties" />
              </ListItem>
              <ListItem button component={Link} to="/offices">
                <ListItemText primary="Offices" />
              </ListItem>
              {user?.role === "officeManager" && (
                <ListItem button component={Link} to="/office/my-office">
                  <ListItemText primary="My Office" />
                </ListItem>
              )}
              <ListItem button component={Link} to="/reserved-property">
                <ListItemText primary="Reserved Properties" />
              </ListItem>
              <ListItem button component={Link} to="/favorite-property">
                <ListItemText primary="Favorite Properties" />
              </ListItem>
              <ListItem button component={Link} to="/favorite-office">
                <ListItemText primary="Favorite Offices" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
