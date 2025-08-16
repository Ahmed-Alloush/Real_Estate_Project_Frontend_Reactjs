import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Footer } from "../components/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Dummy data
const properties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    image: "https://source.unsplash.com/random/800x600/?apartment,city",
    location: "New York, NY",
    price: "$2,500/month",
  },
  {
    id: 2,
    title: "Spacious Family House",
    image: "https://source.unsplash.com/random/800x600/?house,suburb",
    location: "Houston, TX",
    price: "$500,000",
  },
  {
    id: 3,
    title: "Luxury Villa with Pool",
    image: "https://source.unsplash.com/random/800x600/?villa,pool",
    location: "Miami, FL",
    price: "$1,500,000",
  },
  {
    id: 4,
    title: "Cozy Studio for Rent",
    image: "https://source.unsplash.com/random/800x600/?studio,interior",
    location: "Los Angeles, CA",
    price: "$1,200/month",
  },
];

const offices = [
  {
    id: 1,
    name: "Golden Key Realty",
    logo: "https://source.unsplash.com/random/400x400/?building,logo",
    description: "Your partner in prime real estate.",
  },
  {
    id: 2,
    name: "Urban Dwellings Inc.",
    logo: "https://source.unsplash.com/random/400x400/?office,logo",
    description: "Creating spaces for modern living.",
  },
  {
    id: 3,
    name: "Future Homes Group",
    logo: "https://source.unsplash.com/random/400x400/?realestate,logo",
    description: "Innovating real estate since 2010.",
  },
];

const blogs = [
  {
    id: 1,
    title: "Tips for First-Time Homebuyers",
    author: "Jane Doe",
    date: "Jul 25, 2024",
    image: "https://source.unsplash.com/random/800x600/?homebuy",
    snippet:
      "Navigating the housing market can be tough, but these tips will help...",
  },
  {
    id: 2,
    title: "The Future of Remote Work Offices",
    author: "John Smith",
    date: "Jul 20, 2024",
    image: "https://source.unsplash.com/random/800x600/?remoteoffice",
    snippet:
      "Remote work is changing how we design and use office spaces. Here’s what’s next...",
  },
  {
    id: 3,
    title: "Top 5 Rental Investment Opportunities",
    author: "Emily White",
    date: "Jul 15, 2024",
    image: "https://source.unsplash.com/random/800x600/?investment",
    snippet:
      "Looking to invest in rental properties? We’ve compiled a list of the best markets...",
  },
];

export function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { notifications, loading, error } = useSelector(
    (state) => state.notification
  );
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

 
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "granted") {
      notifications?.forEach((notif) => {
        if (!notif.isRead && !notif.notified) {
          // if (!notif.notified) {
          new Notification(notif.title, {
            body: notif.message,
          });
        }
      });
    }
  }, [notifications]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Hero Section */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              fontWeight="bold"
              color="primary"
            >
              Find Your Perfect Space
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Browse our curated selection of properties, trusted offices, and
              expert insights.
            </Typography>
          </Box>

          {/* --- Featured Properties Section --- */}
          <Box sx={{ mb: 8 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography variant="h4" component="h2" fontWeight="bold">
                Featured Properties
              </Typography>
              <Link
                href="/properties"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                }}
              >
                View All{" "}
                <ArrowForwardIosIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Link>
            </Box>
            <Grid container spacing={4}>
              {properties.map((property) => (
                <Grid item key={property.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": { transform: "translateY(-5px)" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={property.image}
                      alt={property.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                      >
                        {property.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {property.location}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="primary"
                        sx={{ mt: 1 }}
                        fontWeight="bold"
                      >
                        {property.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant="contained" color="primary">
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* --- Explore Our Offices Section --- */}
          <Box sx={{ mb: 8 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography variant="h4" component="h2" fontWeight="bold">
                Explore Our Offices
              </Typography>
              <Link
                href="/offices"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                }}
              >
                View All{" "}
                <ArrowForwardIosIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Link>
            </Box>
            <Grid container spacing={4}>
              {offices.map((office) => (
                <Grid item key={office.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                      image={office.logo}
                      alt={`${office.name} logo`}
                    />
                    <CardContent sx={{ flexGrow: 1, pl: 2 }}>
                      <Typography component="h3" variant="h6" fontWeight="bold">
                        {office.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {office.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* --- Latest Blog Posts Section --- */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography variant="h4" component="h2" fontWeight="bold">
                Latest Blog Posts
              </Typography>
              <Link
                href="/blogs"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                }}
              >
                View All{" "}
                <ArrowForwardIosIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Link>
            </Box>
            <Grid container spacing={4}>
              {blogs.map((blog) => (
                <Grid item key={blog.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      "&:hover": { transform: "translateY(-5px)" },
                      transition: "transform 0.3s ease-in-out",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: isMobile ? "100%" : 150,
                        height: isMobile ? 150 : "auto",
                        flexShrink: 0,
                      }}
                      image={blog.image}
                      alt={blog.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        component="h3"
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                      >
                        {blog.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {blog.snippet}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ mt: 1 }}
                      >
                        By {blog.author} on {blog.date}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
