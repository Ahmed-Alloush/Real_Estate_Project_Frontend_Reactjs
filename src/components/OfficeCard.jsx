// // import {
// //   Card,
// //   CardContent,
// //   CardMedia,
// //   Typography,
// //   Box,
// // } from "@mui/material";
// // import { Link } from "react-router-dom";
// // import { FaPhone, FaStar } from "react-icons/fa";

// // const OfficeCard = ({ id, name, office_phone, office_photo, ratingsCount }) => {
// //   return (
// //     <Card sx={{ maxWidth: 300, borderRadius: 3 }}>
// //       <Link
// //         to={`/offices/${id}`}
// //         style={{ textDecoration: "none", color: "inherit" }}
// //       >
// //         <CardMedia
// //           component="img"
// //           height="180"
// //           image={
// //             office_photo?.url || "/office-placeholder.png"
// //           }
// //           alt={name}
// //         />
// //       </Link>
// //       <CardContent>
// //         <Typography variant="h6" gutterBottom>
// //           {name}
// //         </Typography>

// //         <Box display="flex" alignItems="center" gap={1} mt={0.5}>
// //           <FaPhone size={16} />
// //           <Typography variant="body2">{office_phone}</Typography>
// //         </Box>

// //         <Box display="flex" alignItems="center" gap={0.5} mt={1}>
// //           {[...Array(5)].map((_, index) => (
// //             <FaStar
// //               key={index}
// //               size={16}
// //               color={index < ratingsCount ? "#FFD700" : "#CCCCCC"}
// //             />
// //           ))}
// //           <Typography variant="body2" ml={0.5}>
// //             ({ratingsCount})
// //           </Typography>
// //         </Box>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default OfficeCard;






// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Box,
//   Stack,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { FaPhone, FaStar } from "react-icons/fa";

// const OfficeCard = ({ id, name, office_phone, office_photo, ratingsCount }) => {
//   return (
//     <Card
//       sx={{
//         maxWidth: 320,
//         borderRadius: 4,
//         boxShadow: 3,
//         overflow: "hidden",
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//         "&:hover": {
//           transform: "translateY(-5px)",
//           boxShadow: 6,
//         },
//       }}
//     >
//       <Link
//         to={`/offices/${id}`}
//         style={{ textDecoration: "none", color: "inherit" }}
//       >
//         <CardMedia
//           component="img"
//           height="200"
//           image={office_photo?.url || "/office-placeholder.png"}
//           alt={name}
//           sx={{ objectFit: "cover" }}
//         />
//       </Link>

//       <CardContent>
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 600,
//             color: "primary.main",
//             mb: 1,
//           }}
//         >
//           {name}
//         </Typography>

//         <Stack direction="row" alignItems="center" spacing={1} mb={1}>
//           <FaPhone size={16} color="#1976d2" />
//           <Typography variant="body2" color="text.secondary">
//             {office_phone}
//           </Typography>
//         </Stack>

//         <Stack direction="row" alignItems="center" spacing={0.5}>
//           {[...Array(5)].map((_, index) => (
//             <FaStar
//               key={index}
//               size={16}
//               color={index < ratingsCount ? "#FFD700" : "#E0E0E0"}
//             />
//           ))}
//           <Typography variant="body2" color="text.secondary" ml={0.5}>
//             ({ratingsCount})
//           </Typography>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// };

// export default OfficeCard;







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

const OfficeCard = ({ id, name, office_phone, office_photo, ratingsCount }) => {
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
                color={index < ratingsCount ? "#FFD700" : "#E0E0E0"}
              />
            ))}
            <Typography variant="body2" color="text.secondary" ml={0.5}>
              ({ratingsCount})
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OfficeCard;
