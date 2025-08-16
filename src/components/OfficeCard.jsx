// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardMedia,
// // //   Typography,
// // //   Box,
// // // } from "@mui/material";
// // // import { Link } from "react-router-dom";
// // // import { FaPhone, FaStar } from "react-icons/fa";

// // // const OfficeCard = ({ id, name, office_phone, office_photo, ratingsCount }) => {
// // //   return (
// // //     <Card sx={{ maxWidth: 300, borderRadius: 3 }}>
// // //       <Link
// // //         to={`/offices/${id}`}
// // //         style={{ textDecoration: "none", color: "inherit" }}
// // //       >
// // //         <CardMedia
// // //           component="img"
// // //           height="180"
// // //           image={
// // //             office_photo?.url || "/office-placeholder.png"
// // //           }
// // //           alt={name}
// // //         />
// // //       </Link>
// // //       <CardContent>
// // //         <Typography variant="h6" gutterBottom>
// // //           {name}
// // //         </Typography>

// // //         <Box display="flex" alignItems="center" gap={1} mt={0.5}>
// // //           <FaPhone size={16} />
// // //           <Typography variant="body2">{office_phone}</Typography>
// // //         </Box>

// // //         <Box display="flex" alignItems="center" gap={0.5} mt={1}>
// // //           {[...Array(5)].map((_, index) => (
// // //             <FaStar
// // //               key={index}
// // //               size={16}
// // //               color={index < ratingsCount ? "#FFD700" : "#CCCCCC"}
// // //             />
// // //           ))}
// // //           <Typography variant="body2" ml={0.5}>
// // //             ({ratingsCount})
// // //           </Typography>
// // //         </Box>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // };

// // // export default OfficeCard;






// // import {
// //   Card,
// //   CardContent,
// //   CardMedia,
// //   Typography,
// //   Box,
// //   Stack,
// // } from "@mui/material";
// // import { Link } from "react-router-dom";
// // import { FaPhone, FaStar } from "react-icons/fa";

// // const OfficeCard = ({ id, name, office_phone, office_photo, ratingsCount }) => {
// //   return (
// //     <Card
// //       sx={{
// //         maxWidth: 320,
// //         borderRadius: 4,
// //         boxShadow: 3,
// //         overflow: "hidden",
// //         transition: "transform 0.3s ease, box-shadow 0.3s ease",
// //         "&:hover": {
// //           transform: "translateY(-5px)",
// //           boxShadow: 6,
// //         },
// //       }}
// //     >
// //       <Link
// //         to={`/offices/${id}`}
// //         style={{ textDecoration: "none", color: "inherit" }}
// //       >
// //         <CardMedia
// //           component="img"
// //           height="200"
// //           image={office_photo?.url || "/office-placeholder.png"}
// //           alt={name}
// //           sx={{ objectFit: "cover" }}
// //         />
// //       </Link>

// //       <CardContent>
// //         <Typography
// //           variant="h6"
// //           sx={{
// //             fontWeight: 600,
// //             color: "primary.main",
// //             mb: 1,
// //           }}
// //         >
// //           {name}
// //         </Typography>

// //         <Stack direction="row" alignItems="center" spacing={1} mb={1}>
// //           <FaPhone size={16} color="#1976d2" />
// //           <Typography variant="body2" color="text.secondary">
// //             {office_phone}
// //           </Typography>
// //         </Stack>

// //         <Stack direction="row" alignItems="center" spacing={0.5}>
// //           {[...Array(5)].map((_, index) => (
// //             <FaStar
// //               key={index}
// //               size={16}
// //               color={index < ratingsCount ? "#FFD700" : "#E0E0E0"}
// //             />
// //           ))}
// //           <Typography variant="body2" color="text.secondary" ml={0.5}>
// //             ({ratingsCount})
// //           </Typography>
// //         </Stack>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default OfficeCard;







import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaPhone, FaStar } from "react-icons/fa";

const OfficeCard = ({ id, name, office_phone, office_photo, averageRating }) => {
  return (
    <Link
      to={`/offices/${id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          maxWidth: 320,
          borderRadius: 4,
          boxShadow: 3,
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={office_photo?.url || "/office-placeholder.png"}
          alt={name}
          sx={{ objectFit: "cover" }}
        />

        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "primary.main",
              mb: 1,
            }}
          >
            {name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <FaPhone size={16} color="#1976d2" />
            <Typography variant="body2" color="text.secondary">
              {office_phone}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                size={16}
                color={index < averageRating ? "#FFD700" : "#E0E0E0"}
              />
            ))}
            <Typography variant="body2" color="text.secondary" ml={0.5}>
              ({averageRating})
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OfficeCard;





// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Box,
//   Stack,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Rating,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { FaPhone, FaStar } from "react-icons/fa";
// import { createOfficeRating } from "../redux/office rating/officeRatingSlice"; // Adjust path as needed

// const OfficeCard = ({ id, name, office_phone, office_photo, ratingsCount }) => {
//   const [open, setOpen] = useState(false);
//   const [ratingValue, setRatingValue] = useState(0);
//   const dispatch = useDispatch();

//   const handleOpen = (e) => {
//     e.preventDefault(); // Prevent navigating to the office details page
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setRatingValue(0); // Reset rating on close
//   };

//   const handleRate = () => {
//     if (ratingValue > 0) {
//       dispatch(createOfficeRating({ office: id, number_of_stars: ratingValue }));
//       handleClose();
//     }
//   };

//   return (
//     <>
//       <Link to={`/offices/${id}`} style={{ textDecoration: "none" }}>
//         <Card
//           sx={{
//             maxWidth: 320,
//             borderRadius: 4,
//             boxShadow: 3,
//             overflow: "hidden",
//             cursor: "pointer",
//             transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             "&:hover": {
//               transform: "translateY(-5px)",
//               boxShadow: 6,
//             },
//           }}
//         >
//           <CardMedia
//             component="img"
//             height="200"
//             image={office_photo?.url || "/office-placeholder.png"}
//             alt={name}
//             sx={{ objectFit: "cover" }}
//           />
//           <CardContent>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 600,
//                 color: "primary.main",
//                 mb: 1,
//               }}
//             >
//               {name}
//             </Typography>
//             <Stack direction="row" alignItems="center" spacing={1} mb={1}>
//               <FaPhone size={16} color="#1976d2" />
//               <Typography variant="body2" color="text.secondary">
//                 {office_phone}
//               </Typography>
//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={0.5} mb={2}>
//               {[...Array(5)].map((_, index) => (
//                 <FaStar
//                   key={index}
//                   size={16}
//                   color={index < ratingsCount ? "#FFD700" : "#E0E0E0"}
//                 />
//               ))}
//               <Typography variant="body2" color="text.secondary" ml={0.5}>
//                 ({ratingsCount})
//               </Typography>
//             </Stack>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleOpen}
//               fullWidth
//             >
//               Rate Office
//             </Button>
//           </CardContent>
//         </Card>
//       </Link>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Rate {name}</DialogTitle>
//         <DialogContent sx={{ textAlign: "center", py: 2 }}>
//           <Rating
//             name="office-rating"
//             value={ratingValue}
//             onChange={(event, newValue) => {
//               setRatingValue(newValue);
//             }}
//             size="large"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleRate} color="primary" disabled={!ratingValue}>
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default OfficeCard;