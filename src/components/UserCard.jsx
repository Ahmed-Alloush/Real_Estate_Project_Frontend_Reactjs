// import React from "react";
// import { Card, CardContent, Typography, CardMedia } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const UserCard = ({ user }) => {
//   const navigate = useNavigate();

//   return (
//     <Card
//       sx={{ maxWidth: 345, cursor: "pointer" }}
//       onClick={() => navigate(`/superadmin/manage-users/${user.id}`, { state: { user } })}
//     >
//       <CardMedia
//         component="img"
//         alt="User Profile"
//         height="140"
//         image={user.profile_photo?.url || "/default-profile.png"}
//         sx={{ objectFit: "cover" }}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {user.first_name} {user.last_name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {user.email}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {user.phone}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default UserCard;


import React from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdPhone, MdPerson } from "react-icons/md";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 345,
        cursor: "pointer",
        borderRadius: 3,
        boxShadow: 4,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
      onClick={() =>
        navigate(`/superadmin/manage-users/${user.id}`, { state: { user } })
      }
    >
      <CardMedia
        component="img"
        alt="User Profile"
        height="200"
        image={user.profile_photo?.url || "/default-profile.png"}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mb={1}
        >
          <MdPerson size={24} color="#1976d2" />
          <Typography variant="h6" fontWeight="bold">
            {user.first_name} {user.last_name}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mb={0.5}
        >
          <MdEmail size={20} color="#555" />
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
        >
          <MdPhone size={20} color="#555" />
          <Typography variant="body2" color="text.secondary">
            {user.phone}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
