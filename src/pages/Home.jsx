// // import React, { useEffect } from "react";
// // import {
// //   Container,
// //   Typography,
// //   Grid,
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   CardActions,
// //   Button,
// //   Box,
// //   Link,
// //   useTheme,
// //   useMediaQuery,
// // } from "@mui/material";
// // import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// // import { Footer } from "../components/Footer";
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";

// // // Dummy data
// // const properties = [
// //   {
// //     id: 1,
// //     title: "Modern Downtown Apartment",
// //     image: "https://source.unsplash.com/random/800x600/?apartment,city",
// //     location: "New York, NY",
// //     price: "$2,500/month",
// //   },
// //   {
// //     id: 2,
// //     title: "Spacious Family House",
// //     image: "https://source.unsplash.com/random/800x600/?house,suburb",
// //     location: "Houston, TX",
// //     price: "$500,000",
// //   },
// //   {
// //     id: 3,
// //     title: "Luxury Villa with Pool",
// //     image: "https://source.unsplash.com/random/800x600/?villa,pool",
// //     location: "Miami, FL",
// //     price: "$1,500,000",
// //   },
// //   {
// //     id: 4,
// //     title: "Cozy Studio for Rent",
// //     image: "https://source.unsplash.com/random/800x600/?studio,interior",
// //     location: "Los Angeles, CA",
// //     price: "$1,200/month",
// //   },
// // ];

// // const offices = [
// //   {
// //     id: 1,
// //     name: "Golden Key Realty",
// //     logo: "https://source.unsplash.com/random/400x400/?building,logo",
// //     description: "Your partner in prime real estate.",
// //   },
// //   {
// //     id: 2,
// //     name: "Urban Dwellings Inc.",
// //     logo: "https://source.unsplash.com/random/400x400/?office,logo",
// //     description: "Creating spaces for modern living.",
// //   },
// //   {
// //     id: 3,
// //     name: "Future Homes Group",
// //     logo: "https://source.unsplash.com/random/400x400/?realestate,logo",
// //     description: "Innovating real estate since 2010.",
// //   },
// // ];

// // const blogs = [
// //   {
// //     id: 1,
// //     title: "Tips for First-Time Homebuyers",
// //     author: "Jane Doe",
// //     date: "Jul 25, 2024",
// //     image: "https://source.unsplash.com/random/800x600/?homebuy",
// //     snippet:
// //       "Navigating the housing market can be tough, but these tips will help...",
// //   },
// //   {
// //     id: 2,
// //     title: "The Future of Remote Work Offices",
// //     author: "John Smith",
// //     date: "Jul 20, 2024",
// //     image: "https://source.unsplash.com/random/800x600/?remoteoffice",
// //     snippet:
// //       "Remote work is changing how we design and use office spaces. Here’s what’s next...",
// //   },
// //   {
// //     id: 3,
// //     title: "Top 5 Rental Investment Opportunities",
// //     author: "Emily White",
// //     date: "Jul 15, 2024",
// //     image: "https://source.unsplash.com/random/800x600/?investment",
// //     snippet:
// //       "Looking to invest in rental properties? We’ve compiled a list of the best markets...",
// //   },
// // ];

// // export function Home() {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// //   const { notifications, loading, error } = useSelector(
// //     (state) => state.notification
// //   );
// //   const navigate = useNavigate();
// //   const { user } = useSelector((state) => state.auth);
// //   useEffect(() => {
// //     if ("Notification" in window && Notification.permission !== "granted") {
// //       Notification.requestPermission();
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if ("Notification" in window && Notification.permission === "granted") {
// //       notifications?.forEach((notif) => {
// //         if (!notif.isRead && !notif.notified) {
// //           // if (!notif.notified) {
// //           new Notification(notif.title, {
// //             body: notif.message,
// //           });
// //         }
// //       });
// //     }
// //   }, [notifications]);

// //   return (
// //     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
// //       <Box component="main" sx={{ flexGrow: 1 }}>
// //         <Container maxWidth="lg" sx={{ py: 6 }}>
// //           {/* Hero Section */}
// //           <Box sx={{ textAlign: "center", mb: 8 }}>
// //             <Typography
// //               variant="h2"
// //               component="h1"
// //               gutterBottom
// //               fontWeight="bold"
// //               color="primary"
// //             >
// //               Find Your Perfect Space
// //             </Typography>
// //             <Typography variant="h5" color="text.secondary">
// //               Browse our curated selection of properties, trusted offices, and
// //               expert insights.
// //             </Typography>
// //           </Box>

// //           {/* --- Featured Properties Section --- */}
// //           <Box sx={{ mb: 8 }}>
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //                 mb: 4,
// //               }}
// //             >
// //               <Typography variant="h4" component="h2" fontWeight="bold">
// //                 Featured Properties
// //               </Typography>
// //               <Link
// //                 href="/properties"
// //                 underline="none"
// //                 sx={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   color: "primary.main",
// //                 }}
// //               >
// //                 View All{" "}
// //                 <ArrowForwardIosIcon fontSize="small" sx={{ ml: 0.5 }} />
// //               </Link>
// //             </Box>
// //             <Grid container spacing={4}>
// //               {properties.map((property) => (
// //                 <Grid item key={property.id} xs={12} sm={6} md={4} lg={3}>
// //                   <Card
// //                     sx={{
// //                       height: "100%",
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       transition: "transform 0.3s ease-in-out",
// //                       "&:hover": { transform: "translateY(-5px)" },
// //                     }}
// //                   >
// //                     <CardMedia
// //                       component="img"
// //                       height="200"
// //                       image={property.image}
// //                       alt={property.title}
// //                     />
// //                     <CardContent sx={{ flexGrow: 1 }}>
// //                       <Typography
// //                         gutterBottom
// //                         variant="h6"
// //                         component="h3"
// //                         fontWeight="bold"
// //                       >
// //                         {property.title}
// //                       </Typography>
// //                       <Typography variant="body2" color="text.secondary">
// //                         {property.location}
// //                       </Typography>
// //                       <Typography
// //                         variant="h5"
// //                         color="primary"
// //                         sx={{ mt: 1 }}
// //                         fontWeight="bold"
// //                       >
// //                         {property.price}
// //                       </Typography>
// //                     </CardContent>
// //                     <CardActions>
// //                       <Button size="small" variant="contained" color="primary">
// //                         View Details
// //                       </Button>
// //                     </CardActions>
// //                   </Card>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           </Box>

// //           {/* --- Explore Our Offices Section --- */}
// //           <Box sx={{ mb: 8 }}>
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //                 mb: 4,
// //               }}
// //             >
// //               <Typography variant="h4" component="h2" fontWeight="bold">
// //                 Explore Our Offices
// //               </Typography>
// //               <Link
// //                 href="/offices"
// //                 underline="none"
// //                 sx={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   color: "primary.main",
// //                 }}
// //               >
// //                 View All{" "}
// //                 <ArrowForwardIosIcon fontSize="small" sx={{ ml: 0.5 }} />
// //               </Link>
// //             </Box>
// //             <Grid container spacing={4}>
// //               {offices.map((office) => (
// //                 <Grid item key={office.id} xs={12} sm={6} md={4}>
// //                   <Card
// //                     sx={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       p: 2,
// //                       height: "100%",
// //                     }}
// //                   >
// //                     <CardMedia
// //                       component="img"
// //                       sx={{
// //                         width: 100,
// //                         height: 100,
// //                         borderRadius: "50%",
// //                         flexShrink: 0,
// //                       }}
// //                       image={office.logo}
// //                       alt={`${office.name} logo`}
// //                     />
// //                     <CardContent sx={{ flexGrow: 1, pl: 2 }}>
// //                       <Typography component="h3" variant="h6" fontWeight="bold">
// //                         {office.name}
// //                       </Typography>
// //                       <Typography variant="body2" color="text.secondary">
// //                         {office.description}
// //                       </Typography>
// //                     </CardContent>
// //                   </Card>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           </Box>

// //           {/* --- Latest Blog Posts Section --- */}
// //           <Box>
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //                 mb: 4,
// //               }}
// //             >
// //               <Typography variant="h4" component="h2" fontWeight="bold">
// //                 Latest Blog Posts
// //               </Typography>
// //               <Link
// //                 href="/blogs"
// //                 underline="none"
// //                 sx={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   color: "primary.main",
// //                 }}
// //               >
// //                 View All{" "}
// //                 <ArrowForwardIosIcon fontSize="small" sx={{ ml: 0.5 }} />
// //               </Link>
// //             </Box>
// //             <Grid container spacing={4}>
// //               {blogs.map((blog) => (
// //                 <Grid item key={blog.id} xs={12} sm={6} md={4}>
// //                   <Card
// //                     sx={{
// //                       height: "100%",
// //                       display: "flex",
// //                       flexDirection: isMobile ? "column" : "row",
// //                       "&:hover": { transform: "translateY(-5px)" },
// //                       transition: "transform 0.3s ease-in-out",
// //                     }}
// //                   >
// //                     <CardMedia
// //                       component="img"
// //                       sx={{
// //                         width: isMobile ? "100%" : 150,
// //                         height: isMobile ? 150 : "auto",
// //                         flexShrink: 0,
// //                       }}
// //                       image={blog.image}
// //                       alt={blog.title}
// //                     />
// //                     <CardContent sx={{ flexGrow: 1 }}>
// //                       <Typography
// //                         component="h3"
// //                         variant="h6"
// //                         fontWeight="bold"
// //                         gutterBottom
// //                       >
// //                         {blog.title}
// //                       </Typography>
// //                       <Typography variant="body2" color="text.secondary" noWrap>
// //                         {blog.snippet}
// //                       </Typography>
// //                       <Typography
// //                         variant="caption"
// //                         display="block"
// //                         sx={{ mt: 1 }}
// //                       >
// //                         By {blog.author} on {blog.date}
// //                       </Typography>
// //                     </CardContent>
// //                   </Card>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           </Box>
// //         </Container>
// //       </Box>
// //       <Footer />
// //     </Box>
// //   );
// // }

// import React, { useEffect } from "react";
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Button,
//   Box,
//   Link,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { Footer } from "../components/Footer";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// // Dummy data
// const properties = [
//   {
//     id: 1,
//     title: "Modern Downtown Apartment",
//     image: "https://source.unsplash.com/random/800x600/?apartment,city",
//     location: "New York, NY",
//     price: "$2,500/month",
//   },
//   {
//     id: 2,
//     title: "Spacious Family House",
//     image: "https://source.unsplash.com/random/800x600/?house,suburb",
//     location: "Houston, TX",
//     price: "$500,000",
//   },
//   {
//     id: 3,
//     title: "Luxury Villa with Pool",
//     image: "https://source.unsplash.com/random/800x600/?villa,pool",
//     location: "Miami, FL",
//     price: "$1,500,000",
//   },
//   {
//     id: 4,
//     title: "Cozy Studio for Rent",
//     image: "https://source.unsplash.com/random/800x600/?studio,interior",
//     location: "Los Angeles, CA",
//     price: "$1,200/month",
//   },
// ];

// const offices = [
//   {
//     id: 1,
//     name: "Golden Key Realty",
//     logo: "https://source.unsplash.com/random/400x400/?building,logo",
//     description: "Your partner in prime real estate.",
//   },
//   {
//     id: 2,
//     name: "Urban Dwellings Inc.",
//     logo: "https://source.unsplash.com/random/400x400/?office,logo",
//     description: "Creating spaces for modern living.",
//   },
//   {
//     id: 3,
//     name: "Future Homes Group",
//     logo: "https://source.unsplash.com/random/400x400/?realestate,logo",
//     description: "Innovating real estate since 2010.",
//   },
// ];

// const blogs = [
//   {
//     id: 1,
//     title: "Tips for First-Time Homebuyers",
//     author: "Jane Doe",
//     date: "Jul 25, 2024",
//     image: "https://source.unsplash.com/random/800x600/?homebuy",
//     snippet:
//       "Navigating the housing market can be tough, but these tips will help...",
//   },
//   {
//     id: 2,
//     title: "The Future of Remote Work Offices",
//     author: "John Smith",
//     date: "Jul 20, 2024",
//     image: "https://source.unsplash.com/random/800x600/?remoteoffice",
//     snippet:
//       "Remote work is changing how we design and use office spaces. Here's what's next...",
//   },
//   {
//     id: 3,
//     title: "Top 5 Rental Investment Opportunities",
//     author: "Emily White",
//     date: "Jul 15, 2024",
//     image: "https://source.unsplash.com/random/800x600/?investment",
//     snippet:
//       "Looking to invest in rental properties? We've compiled a list of the best markets...",
//   },
// ];

// export function Home() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const { t, i18n } = useTranslation();
//   const isRTL = i18n.language === 'ar';

//   const { notifications, loading, error } = useSelector(
//     (state) => state.notification
//   );
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   useEffect(() => {
//     if ("Notification" in window && Notification.permission === "granted") {
//       notifications?.forEach((notif) => {
//         if (!notif.isRead && !notif.notified) {
//           new Notification(notif.title, {
//             body: notif.message,
//           });
//         }
//       });
//     }
//   }, [notifications]);

//   useEffect(() => {

//   }, [])

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         direction: isRTL ? 'rtl' : 'ltr',
//       }}
//     >
//       <Box component="main" sx={{ flexGrow: 1 }}>
//         <Container maxWidth="lg" sx={{ py: 6 }}>
//           {/* Hero Section */}
//           <Box sx={{ textAlign: "center", mb: 8 }}>
//             <Typography
//               variant="h2"
//               component="h1"
//               gutterBottom
//               fontWeight="bold"
//               color="primary"
//               sx={{
//                 fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//               }}
//             >
//               {t('home.heroTitle')}
//             </Typography>
//             <Typography
//               variant="h5"
//               color="text.secondary"
//               sx={{
//                 fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//               }}
//             >
//               {t('home.heroSubtitle')}
//             </Typography>
//           </Box>

//           {/* --- Featured Properties Section --- */}
//           <Box sx={{ mb: 8 }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 4,
//                 flexDirection: isRTL ? 'row-reverse' : 'row',
//               }}
//             >
//               <Typography
//                 variant="h4"
//                 component="h2"
//                 fontWeight="bold"
//                 sx={{
//                   fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                 }}
//               >
//                 {t('home.featuredProperties')}
//               </Typography>
//               <Link
//                 href="/properties"
//                 underline="none"
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   color: "primary.main",
//                   flexDirection: isRTL ? 'row-reverse' : 'row',
//                   fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                 }}
//               >
//                 {t('home.viewAll')}
//                 <ArrowForwardIosIcon
//                   fontSize="small"
//                   sx={{
//                     ml: isRTL ? 0 : 0.5,
//                     mr: isRTL ? 0.5 : 0,
//                     transform: isRTL ? 'scaleX(-1)' : 'none',
//                   }}
//                 />
//               </Link>
//             </Box>
//             <Grid container spacing={4}>
//               {properties.map((property) => (
//                 <Grid item key={property.id} xs={12} sm={6} md={4} lg={3}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                       transition: "transform 0.3s ease-in-out",
//                       "&:hover": { transform: "translateY(-5px)" },
//                       textAlign: isRTL ? 'right' : 'left',
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       height="200"
//                       image={property.image}
//                       alt={property.title}
//                     />
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Typography
//                         gutterBottom
//                         variant="h6"
//                         component="h3"
//                         fontWeight="bold"
//                         sx={{
//                           fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                           textAlign: isRTL ? 'right' : 'left',
//                         }}
//                       >
//                         {property.title}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                           textAlign: isRTL ? 'right' : 'left',
//                         }}
//                       >
//                         {property.location}
//                       </Typography>
//                       <Typography
//                         variant="h5"
//                         color="primary"
//                         sx={{
//                           mt: 1,
//                           fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                           textAlign: isRTL ? 'right' : 'left',
//                         }}
//                         fontWeight="bold"
//                       >
//                         {property.price}
//                       </Typography>
//                     </CardContent>
//                     <CardActions
//                       sx={{
//                         justifyContent: isRTL ? 'flex-end' : 'flex-start'
//                       }}
//                     >
//                       <Button
//                         size="small"
//                         variant="contained"
//                         color="primary"
//                         sx={{
//                           fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                         }}
//                       >
//                         {t('home.viewDetails')}
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>

//           {/* --- Explore Our Offices Section --- */}
//           <Box sx={{ mb: 8 }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 4,
//                 flexDirection: isRTL ? 'row-reverse' : 'row',
//               }}
//             >
//               <Typography
//                 variant="h4"
//                 component="h2"
//                 fontWeight="bold"
//                 sx={{
//                   fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                 }}
//               >
//                 {t('home.exploreOffices')}
//               </Typography>
//               <Link
//                 href="/offices"
//                 underline="none"
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   color: "primary.main",
//                   flexDirection: isRTL ? 'row-reverse' : 'row',
//                   fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                 }}
//               >
//                 {t('home.viewAll')}
//                 <ArrowForwardIosIcon
//                   fontSize="small"
//                   sx={{
//                     ml: isRTL ? 0 : 0.5,
//                     mr: isRTL ? 0.5 : 0,
//                     transform: isRTL ? 'scaleX(-1)' : 'none',
//                   }}
//                 />
//               </Link>
//             </Box>
//             <Grid container spacing={4}>
//               {offices.map((office) => (
//                 <Grid item key={office.id} xs={12} sm={6} md={4}>
//                   <Card
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       p: 2,
//                       height: "100%",
//                       flexDirection: isRTL ? 'row-reverse' : 'row',
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       sx={{
//                         width: 100,
//                         height: 100,
//                         borderRadius: "50%",
//                         flexShrink: 0,
//                       }}
//                       image={office.logo}
//                       alt={`${office.name} logo`}
//                     />
//                     <CardContent
//                       sx={{
//                         flexGrow: 1,
//                         pl: isRTL ? 0 : 2,
//                         pr: isRTL ? 2 : 0,
//                         textAlign: isRTL ? 'right' : 'left',
//                       }}
//                     >
//                       <Typography
//                         component="h3"
//                         variant="h6"
//                         fontWeight="bold"
//                         sx={{
//                           fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                         }}
//                       >
//                         {office.name}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                         }}
//                       >
//                         {office.description}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>

//           {/* --- Latest Blog Posts Section --- */}
//           <Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 4,
//                 flexDirection: isRTL ? 'row-reverse' : 'row',
//               }}
//             >
//               <Typography
//                 variant="h4"
//                 component="h2"
//                 fontWeight="bold"
//                 sx={{
//                   fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                 }}
//               >
//                 {t('home.latestBlogs')}
//               </Typography>
//               <Link
//                 href="/blogs"
//                 underline="none"
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   color: "primary.main",
//                   flexDirection: isRTL ? 'row-reverse' : 'row',
//                   fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                 }}
//               >
//                 {t('home.viewAll')}
//                 <ArrowForwardIosIcon
//                   fontSize="small"
//                   sx={{
//                     ml: isRTL ? 0 : 0.5,
//                     mr: isRTL ? 0.5 : 0,
//                     transform: isRTL ? 'scaleX(-1)' : 'none',
//                   }}
//                 />
//               </Link>
//             </Box>
//             <Grid container spacing={4}>
//               {blogs.map((blog) => (
//                 <Grid item key={blog.id} xs={12} sm={6} md={4}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: isMobile ? "column" : (isRTL ? "row-reverse" : "row"),
//                       "&:hover": { transform: "translateY(-5px)" },
//                       transition: "transform 0.3s ease-in-out",
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       sx={{
//                         width: isMobile ? "100%" : 150,
//                         height: isMobile ? 150 : "auto",
//                         flexShrink: 0,
//                       }}
//                       image={blog.image}
//                       alt={blog.title}
//                     />
//                     <CardContent
//                       sx={{
//                         flexGrow: 1,
//                         textAlign: isRTL ? 'right' : 'left',
//                       }}
//                     >
//                       <Typography
//                         component="h3"
//                         variant="h6"
//                         fontWeight="bold"
//                         gutterBottom
//                         sx={{
//                           fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                         }}
//                       >
//                         {blog.title}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         noWrap
//                         sx={{
//                           fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                         }}
//                       >
//                         {blog.snippet}
//                       </Typography>
//                       <Typography
//                         variant="caption"
//                         display="block"
//                         sx={{
//                           mt: 1,
//                           fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
//                         }}
//                       >
//                         {t('home.blogAuthor', { author: blog.author, date: blog.date })}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         </Container>
//       </Box>
//       <Footer />
//     </Box>
//   );
// }

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
  CircularProgress,
  Alert,
  Rating,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Footer } from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchProperties } from "../redux/property/propertySlice"; // Import the property fetch thunk
import { getAllOffices } from "../redux/office/officeSlice"; // Import the office fetch thunk
import { getAllBlogs } from "../redux/blog/blogSlice"; // Import the blog fetch thunk
import { BathIcon, BedIcon, HomeIcon } from "lucide-react";

export function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors for properties
  const {
    properties,
    loading: propertiesLoading,
    error: propertiesError,
  } = useSelector((state) => state.property);

  // Selectors for offices
  const {
    offices,
    loading: officesLoading,
    error: officesError,
  } = useSelector((state) => state.office);

  // Selectors for blogs
  const {
    blogs,
    loading: blogsLoading,
    error: blogsError,
  } = useSelector((state) => state.blog);

  // Selector for notifications
  const { notifications } = useSelector((state) => state.notification);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchProperties({ page: 1, limit: 3 }));
    dispatch(getAllOffices({ page: 1, limit: 3 })); // Fetch a limited number of offices for the homepage
    dispatch(getAllBlogs());
  }, [dispatch]);

  // Notification logic remains the same
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "granted") {
      notifications?.forEach((notif) => {
        if (!notif.isRead && !notif.notified) {
          new Notification(notif.title, {
            body: notif.message,
          });
        }
      });
    }
  }, [notifications]);

  // Render helpers
  const renderLoading = () => (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <CircularProgress />
    </Box>
  );

  const renderError = (error) => (
    <Box sx={{ p: 4 }}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
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
              sx={{
                fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
              }}
            >
              {t("home.heroTitle")}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
              }}
            >
              {t("home.heroSubtitle")}
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
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                sx={{
                  fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                }}
              >
                {t("home.featuredProperties")}
              </Typography>
              <Link
                href="/properties"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                  flexDirection: isRTL ? "row-reverse" : "row",
                  fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                }}
              >
                {t("home.viewAll")}
                <ArrowForwardIosIcon
                  fontSize="small"
                  sx={{
                    ml: isRTL ? 0 : 0.5,
                    mr: isRTL ? 0.5 : 0,
                    transform: isRTL ? "scaleX(-1)" : "none",
                  }}
                />
              </Link>
            </Box>
            {propertiesLoading && renderLoading()}
            {propertiesError && renderError(propertiesError)}
            {!propertiesLoading && !propertiesError && (
              <Grid container spacing={4}>
                {properties?.length > 0 &&
                  properties?.map((property) => (
                    <Grid item key={property.id} xs={12} sm={6} md={4} lg={3}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "transform 0.3s ease-in-out",
                          "&:hover": { transform: "translateY(-5px)" },
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={
                            property.photos?.[0]?.url ||
                            "https://via.placeholder.com/400x300.png?text=No+Image"
                          }
                          alt={property.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h3"
                            fontWeight="bold"
                            sx={{
                              fontFamily: isRTL
                                ? "'Cairo', sans-serif"
                                : "inherit",
                              textAlign: isRTL ? "right" : "left",
                            }}
                          >
                            {t("property.typeOperation")}:{" "}
                            {property.typeOperation === "renting"
                              ? t("property.renting")
                              : t("property.selling")}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontFamily: isRTL
                                ? "'Cairo', sans-serif"
                                : "inherit",
                              textAlign: isRTL ? "right" : "left",
                            }}
                          >
                            {t("property.location")}: {property.location.city}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mt: 0.5,
                              fontFamily: isRTL
                                ? "'Cairo', sans-serif"
                                : "inherit",
                              textAlign: isRTL ? "right" : "left",
                            }}
                          >
                            {t("property.space")}: {property.space} m²
                          </Typography>
                          <Typography
                            variant="h5"
                            color="primary"
                            sx={{
                              mt: 1,
                              fontFamily: isRTL
                                ? "'Cairo', sans-serif"
                                : "inherit",
                              textAlign: isRTL ? "right" : "left",
                            }}
                            fontWeight="bold"
                          >
                            {t("property.price")}: {property.price} $
                          </Typography>
                        </CardContent>
                        <CardActions
                          sx={{
                            justifyContent: isRTL ? "flex-end" : "flex-start",
                          }}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            sx={{
                              fontFamily: isRTL
                                ? "'Cairo', sans-serif"
                                : "inherit",
                            }}
                            onClick={() =>
                              navigate(`/properties/${property.id}`)
                            }
                          >
                            {t("home.viewDetails")}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            )}
          </Box>

          {/* --- Explore Our Offices Section --- */}
          {/* <Box sx={{ mb: 8 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                sx={{
                  fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                }}
              >
                {t("home.exploreOffices")}
              </Typography>
              <Link
                href="/offices"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                  flexDirection: isRTL ? "row-reverse" : "row",
                  fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                }}
              >
                {t("home.viewAll")}
                <ArrowForwardIosIcon
                  fontSize="small"
                  sx={{
                    ml: isRTL ? 0 : 0.5,
                    mr: isRTL ? 0.5 : 0,
                    transform: isRTL ? "scaleX(-1)" : "none",
                  }}
                />
              </Link>
            </Box>
            {officesLoading && renderLoading()}
            {officesError && renderError(officesError)}
            {!officesLoading && !officesError && (
              <Grid container spacing={4}>
                {offices && offices?.map((office) => (
                  <Grid item key={office._id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        height: "100%",
                        flexDirection: isRTL ? "row-reverse" : "row",
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
                        image={office.office_photo.url || "https://via.placeholder.com/100"}
                        alt={`${office.name} logo`}
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          pl: isRTL ? 0 : 2,
                          pr: isRTL ? 2 : 0,
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        <Typography
                          component="h3"
                          variant="h6"
                          fontWeight="bold"
                          sx={{
                            fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                          }}
                        >
                          {office.name}
                        </Typography>
                        {office.averageRating}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                          }}
                        >
                          {office.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box> */}

          <Box sx={{ mb: 8 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                sx={{
                  fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                }}
              >
                {t("home.exploreOffices")}
              </Typography>
              <Link
                href="/offices"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                  flexDirection: isRTL ? "row-reverse" : "row",
                  fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                }}
              >
                {t("home.viewAll")}
                <ArrowForwardIosIcon
                  fontSize="small"
                  sx={{
                    ml: isRTL ? 0 : 0.5,
                    mr: isRTL ? 0.5 : 0,
                    transform: isRTL ? "scaleX(-1)" : "none",
                  }}
                />
              </Link>
            </Box>
            {officesLoading && renderLoading()}
            {officesError && renderError(officesError)}
            {!officesLoading && !officesError && (
              <Grid container spacing={4}>
                {offices &&
                  offices?.map((office) => (
                    <Link
                      href={`/offices/${office.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Grid item key={office.id} xs={12} sm={6} md={4}>
                        <Card
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 2,
                            height: "100%",
                            flexDirection: isRTL ? "row-reverse" : "row",
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
                            image={
                              office.office_photo?.url ||
                              "https://via.placeholder.com/100"
                            }
                            alt={`${office.name} logo`}
                          />
                          <CardContent
                            sx={{
                              flexGrow: 1,
                              pl: isRTL ? 0 : 2,
                              pr: isRTL ? 2 : 0,
                              textAlign: isRTL ? "right" : "left",
                            }}
                          >
                            <Typography
                              component="h3"
                              variant="h6"
                              fontWeight="bold"
                              sx={{
                                fontFamily: isRTL
                                  ? "'Cairo', sans-serif"
                                  : "inherit",
                              }}
                            >
                              {office.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                my: 1,
                                flexDirection: isRTL ? "row-reverse" : "row",
                              }}
                            >
                              <Rating
                                name={`rating-${office.id}`}
                                value={office.averageRating || 0}
                                precision={0.5}
                                readOnly
                              />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  ml: isRTL ? 0 : 1,
                                  mr: isRTL ? 1 : 0,
                                  fontFamily: isRTL
                                    ? "'Cairo', sans-serif"
                                    : "inherit",
                                }}
                              >
                                ({office.ratingsCount || 0})
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontFamily: isRTL
                                  ? "'Cairo', sans-serif"
                                  : "inherit",
                              }}
                            >
                              {office.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Link>
                  ))}
              </Grid>
            )}
          </Box>

          {/* --- Latest Blog Posts Section --- */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
                flexDirection: isRTL ? "row-reverse" : "row",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                sx={{
                  fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                }}
              >
                {t("home.latestBlogs")}
              </Typography>
              <Link
                href="/blogs"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                  flexDirection: isRTL ? "row-reverse" : "row",
                  fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                }}
              >
                {t("home.viewAll")}
                <ArrowForwardIosIcon
                  fontSize="small"
                  sx={{
                    ml: isRTL ? 0 : 0.5,
                    mr: isRTL ? 0.5 : 0,
                    transform: isRTL ? "scaleX(-1)" : "none",
                  }}
                />
              </Link>
            </Box>
            {blogsLoading && renderLoading()}
            {blogsError && renderError(blogsError)}
            {!blogsLoading && !blogsError && (
              <Grid container spacing={4}>
                {blogs.length > 0 &&
                  blogs?.map((blog) => (
                    <Grid
                        item
                        key={blog._id}
                        xs={12}
                        sm={6}
                        md={4}
                        width={"100%"}
                      >
                    <Link href={`/offices/${blog.office.id}`} underline="none">
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: isMobile
                              ? "column"
                              : isRTL
                                ? "row-reverse"
                                : "row",
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
                            image={
                              blog.blog_media.url ||
                              "https://via.placeholder.com/400x300.png?text=No+Image"
                            }
                            alt={blog.title}
                          />
                          <CardContent
                            sx={{
                              flexGrow: 1,
                              textAlign: isRTL ? "right" : "left",
                            }}
                          >
                            <Typography
                              component="h3"
                              variant="h6"
                              fontWeight="bold"
                              gutterBottom
                              sx={{
                                fontFamily: isRTL
                                  ? "'Cairo', sans-serif"
                                  : "inherit",
                              }}
                            >
                              {blog.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                              sx={{
                                fontFamily: isRTL
                                  ? "'Cairo', sans-serif"
                                  : "inherit",
                              }}
                            >
                              {blog.content}
                            </Typography>
                            <Typography
                              variant="caption"
                              display="block"
                              sx={{
                                mt: 1,
                                fontFamily: isRTL
                                  ? "'Cairo', sans-serif"
                                  : "inherit",
                              }}
                            >
                              {t("home.blogAuthor", {
                                author: blog.authorName,
                                date: new Date(
                                  blog.createdAt
                                ).toLocaleDateString(),
                              })}
                            </Typography>
                          </CardContent>
                        </Card>
                    </Link>
                      </Grid>
                  ))}
              </Grid>
            )}
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
