// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   Card,
// //   CardContent,
// //   Avatar,
// //   Typography,
// //   IconButton,
// //   TextField,
// //   Button,
// //   Grid,
// // } from "@mui/material";

// // import { getUser as fetchUser } from "../features/auth/getUserSlice";
// // import { useNavigate } from "react-router-dom";

// // const Profile = () => {
// //   const dispatch = useDispatch();
// //   const { user, loading, error } = useSelector((state) => state.getUser);
// //   const navigate = useNavigate();
// //   const [editFirstName, setEditFirstName] = useState(false);
// //   const [editLastName, setEditLastName] = useState(false);
// //   const [editReceiverIdentifier, setEditReceiverIdentifier] = useState(false);
// //   const [editImage, setEditImage] = useState(false);

// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName] = useState("");
// //   const [receiverIdentifier, setReceiverIdentifier] = useState("");



// //   useEffect(() => {
// //     if (error === "Unauthorized") {
// //       navigate("/login");
// //     }
// //   }, [error]);

// //   useEffect(() => {
// //     if (user) {
// //       setFirstName(user.first_name);
// //       setLastName(user.last_name);
// //       setReceiverIdentifier(user.receiver_identifier || "");
// //     }
// //   }, [user]);

// //   const handleSave = (field) => {
// //     // here you can dispatch the update request
// //     // dispatch(updateUser({ first_name, last_name, etc }))
// //     console.log(`Saving ${field}`);
// //     if (field === "firstName") setEditFirstName(false);
// //     if (field === "lastName") setEditLastName(false);
// //     if (field === "receiverIdentifier") setEditReceiverIdentifier(false);
// //     if (field === "image") setEditImage(false);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <Typography variant="h6" color="primary">
// //           Loading user data...
// //         </Typography>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <Typography color="error">{error}</Typography>
// //       </div>
// //     );
// //   }

// //   if (!user) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <Typography>No user found.</Typography>
// //       </div>
// //     );
// //   }

// //   return (
// //     <Grid
// //       container
// //       justifyContent="center"
// //       alignItems="center"
// //       style={{
// //         minHeight: "100vh",
// //         background: "linear-gradient(to bottom right, #cfe9fc, #f0f4ff)",
// //       }}
// //     >
// //       <Card
// //         sx={{
// //           width: 400,
// //           borderRadius: 4,
// //           boxShadow: 10,
// //           background:
// //             "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,255,0.95))",
// //         }}
// //       >
// //         <CardContent>
// //           <Grid container direction="column" alignItems="center" spacing={2}>
// //             <Grid item>
// //               <div style={{ position: "relative" }}>
// //                 <Avatar
// //                   src={user.profile_photo?.url}
// //                   sx={{
// //                     width: 80,
// //                     height: 80,
// //                     border: "3px solid #1976d2",
// //                     boxShadow: 3,
// //                   }}
// //                 >
// //                   {/* <AccountCircleIcon fontSize="large" /> */}
// //                 </Avatar>
// //                 <IconButton
// //                   color="primary"
// //                   size="small"
// //                   style={{ position: "absolute", bottom: 0, right: 0 }}
// //                   onClick={() => setEditImage(true)}
// //                 >
// //                   {/* <SaveIcon /> */}
// //                   save
// //                 </IconButton>
// //               </div>
// //               {editImage && (
// //                 <div style={{ marginTop: 8 }}>
// //                   <Button
// //                     variant="contained"
// //                     size="small"
// //                     onClick={() => handleSave("image")}
// //                   >
// //                     Upload New Photo
// //                   </Button>
// //                 </div>
// //               )}
// //             </Grid>

// //             {/* First Name */}
// //             <Grid
// //               item
// //               container
// //               alignItems="center"
// //               justifyContent="space-between"
// //             >
// //               {editFirstName ? (
// //                 <>
// //                   <TextField
// //                     value={firstName}
// //                     onChange={(e) => setFirstName(e.target.value)}
// //                     size="small"
// //                     variant="outlined"
// //                     label="First Name"
// //                   />
// //                   <IconButton
// //                     color="success"
// //                     onClick={() => handleSave("firstName")}
// //                   >
// //                     save
// //                   </IconButton>
// //                 </>
// //               ) : (
// //                 <>
// //                   <Typography fontWeight="bold">{user.first_name}</Typography>
// //                   <IconButton
// //                     color="primary"
// //                     onClick={() => setEditFirstName(true)}
// //                   >
// //                     edit
// //                     {/* <EditIcon /> */}
// //                   </IconButton>
// //                 </>
// //               )}
// //             </Grid>

// //             {/* Last Name */}
// //             <Grid
// //               item
// //               container
// //               alignItems="center"
// //               justifyContent="space-between"
// //             >
// //               {editLastName ? (
// //                 <>
// //                   <TextField
// //                     value={lastName}
// //                     onChange={(e) => setLastName(e.target.value)}
// //                     size="small"
// //                     variant="outlined"
// //                     label="Last Name"
// //                   />
// //                   <IconButton
// //                     color="success"
// //                     onClick={() => handleSave("lastName")}
// //                   >
// //                     save
// //                   </IconButton>
// //                 </>
// //               ) : (
// //                 <>
// //                   <Typography fontWeight="bold">{user.last_name}</Typography>
// //                   <IconButton
// //                     color="primary"
// //                     onClick={() => setEditLastName(true)}
// //                   >
// //                     edit
// //                   </IconButton>
// //                 </>
// //               )}
// //             </Grid>

// //             {/* Email */}
// //             <Grid
// //               item
// //               container
// //               alignItems="center"
// //               justifyContent="space-between"
// //             >
// //               <Typography>
// //                 {/* <EmailIcon sx={{ mr: 1 }} fontSize="small" color="primary" /> */}
// //                 {user.email}
// //               </Typography>
// //             </Grid>

// //             {/* Phone */}
// //             <Grid
// //               item
// //               container
// //               alignItems="center"
// //               justifyContent="space-between"
// //             >
// //               <Typography>
// //                 {/* <PhoneIcon sx={{ mr: 1 }} fontSize="small" color="primary" /> */}
// //                 {user.phone}
// //               </Typography>
// //             </Grid>

// //             {/* Receiver Identifier */}
// //             <Grid
// //               item
// //               container
// //               alignItems="center"
// //               justifyContent="space-between"
// //             >
// //               {editReceiverIdentifier ? (
// //                 <>
// //                   <TextField
// //                     value={receiverIdentifier}
// //                     onChange={(e) => setReceiverIdentifier(e.target.value)}
// //                     size="small"
// //                     variant="outlined"
// //                     label="Receiver Identifier"
// //                   />
// //                   <IconButton
// //                     color="success"
// //                     onClick={() => handleSave("receiverIdentifier")}
// //                   >
// //                     save{" "}
// //                   </IconButton>
// //                 </>
// //               ) : (
// //                 <>
// //                   <Typography>{user.receiver_identifier ?? "N/A"}</Typography>
// //                   <IconButton
// //                     color="primary"
// //                     onClick={() => setEditReceiverIdentifier(true)}
// //                   >
// //                     edit{" "}
// //                   </IconButton>
// //                 </>
// //               )}
// //             </Grid>
// //           </Grid>
// //         </CardContent>
// //       </Card>
// //     </Grid>
// //   );
// // };

// // export default Profile;







// //   // useEffect(() => {
// //   //   if (!user) {
// //   //     dispatch(fetchUser());
// //   //   }
// //   // }, [dispatch]);






// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Card,
//   CardContent,
//   Avatar,
//   Typography,
//   IconButton,
//   TextField,
//   Button,
//   Grid,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { Edit, Save, UploadFile } from "@mui/icons-material";
// import { getUser as fetchUser, updateUserProfile } from "../features/auth/getUserSlice";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const dispatch = useDispatch();
//   const { user, loading, error } = useSelector((state) => state.getUser);
//   const navigate = useNavigate();

//   const [editMode, setEditMode] = useState({
//     firstName: false,
//     lastName: false,
//     receiverIdentifier: false,
//     image: false,
//   });

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [receiverIdentifier, setReceiverIdentifier] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);

//   useEffect(() => {
//     if (error === "Unauthorized") {
//       navigate("/login");
//     }
//   }, [error, navigate]);

//   useEffect(() => {
//     if (user) {
//       setFirstName(user.first_name);
//       setLastName(user.last_name);
//       setReceiverIdentifier(user.receiver_identifier || "");
//     }
//   }, [user]);

//   const handleSave = async () => {
//     const formData = new FormData();
//     formData.append("first_name", firstName);
//     formData.append("last_name", lastName);
//     formData.append("receiver_identifier", receiverIdentifier);
//     if (profilePhoto) {
//       formData.append("profile_photo", profilePhoto);
//     }
//     await dispatch(updateUserProfile({ formData }));
//     setEditMode({
//       firstName: false,
//       lastName: false,
//       receiverIdentifier: false,
//       image: false,
//     });
//   };

//   if (loading && !user) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error && !user) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Grid
//       container
//       justifyContent="center"
//       alignItems="center"
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(to bottom right, #e0f7fa, #f0f4ff)",
//       }}
//     >
//       <Card
//         sx={{
//           maxWidth: 480,
//           width: "100%",
//           p: 3,
//           borderRadius: 4,
//           boxShadow: 10,
//           background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,255,0.95))",
//         }}
//       >
//         <CardContent>
//           <Grid container spacing={2} direction="column" alignItems="center">
//             {/* Profile Photo */}
//             <Grid item>
//               <div style={{ position: "relative" }}>
//                 <Avatar
//                   src={user?.profile_photo?.url}
//                   sx={{
//                     width: 100,
//                     height: 100,
//                     border: "3px solid #1976d2",
//                   }}
//                 />
//                 <IconButton
//                   color="primary"
//                   sx={{ position: "absolute", bottom: 0, right: 0 }}
//                   component="label"
//                 >
//                   <UploadFile />
//                   <input
//                     hidden
//                     type="file"
//                     onChange={(e) => {
//                       setProfilePhoto(e.target.files[0]);
//                       setEditMode((prev) => ({ ...prev, image: true }));
//                     }}
//                   />
//                 </IconButton>
//               </div>
//             </Grid>

//             {/* First Name */}
//             <Grid item container alignItems="center" justifyContent="space-between">
//               {editMode.firstName ? (
//                 <>
//                   <TextField
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     size="small"
//                     label="First Name"
//                   />
//                   <IconButton onClick={handleSave} color="success">
//                     {/* <Save /> */}
//                     Save
//                   </IconButton>
//                 </>
//               ) : (
//                 <>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {firstName}
//                   </Typography>
//                   <IconButton
//                     onClick={() =>
//                       setEditMode((prev) => ({ ...prev, firstName: true }))
//                     }
//                     color="primary"
//                   >
//                     {/* <Edit /> */}
//                     Edit
//                   </IconButton>
//                 </>
//               )}
//             </Grid>

//             {/* Last Name */}
//             <Grid item container alignItems="center" justifyContent="space-between">
//               {editMode.lastName ? (
//                 <>
//                   <TextField
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     size="small"
//                     label="Last Name"
//                   />
//                   <IconButton onClick={handleSave} color="success">
//                    Save
//                   </IconButton>
//                 </>
//               ) : (
//                 <>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {lastName}
//                   </Typography>
//                   <IconButton
//                     onClick={() =>
//                       setEditMode((prev) => ({ ...prev, lastName: true }))
//                     }
//                     color="primary"
//                   >
//                Edit
//                   </IconButton>
//                 </>
//               )}
//             </Grid>

//             {/* Receiver Identifier */}
//             <Grid item container alignItems="center" justifyContent="space-between">
//               {editMode.receiverIdentifier ? (
//                 <>
//                   <TextField
//                     value={receiverIdentifier}
//                     onChange={(e) => setReceiverIdentifier(e.target.value)}
//                     size="small"
//                     label="Receiver Identifier"
//                   />
//                   <IconButton onClick={handleSave} color="success">
//                  Save
//                   </IconButton>
//                 </>
//               ) : (
//                 <>
//                   <Typography variant="subtitle2">
//                     {receiverIdentifier || "No Identifier"}
//                   </Typography>
//                   <IconButton
//                     onClick={() =>
//                       setEditMode((prev) => ({ ...prev, receiverIdentifier: true }))
//                     }
//                     color="primary"
//                   >
//                  Edit
//                   </IconButton>
//                 </>
//               )}
//             </Grid>

//             {/* Email and Phone (readonly) */}
//             <Grid item>
//               <Typography variant="body2" color="text.secondary">
//                 {user?.email}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {user?.phone}
//               </Typography>
//             </Grid>

//             {/* Save all button if any change */}
//             {(editMode.image || editMode.firstName || editMode.lastName || editMode.receiverIdentifier) && (
//               <Grid item>
//                 <Button
//                   variant="contained"
//                   onClick={handleSave}
//                   sx={{
//                     mt: 2,
//                     px: 4,
//                     py: 1,
//                     textTransform: "capitalize",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Save Changes
//                 </Button>
//               </Grid>
//             )}
//           </Grid>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// }




import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { getUser as fetchUser, updateUserProfile } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSave, FaUpload, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    nationalNumber: false,
    image: false,
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalNumber, setNationalNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    if (error === "Unauthorized") {
      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setNationalNumber(user.national_number || "");
    }
  }, [user]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("national_number", nationalNumber);
    if (profilePhoto) {
      formData.append("profile_photo", profilePhoto);
    }
    await dispatch(updateUserProfile({ formData }));
    setEditMode({
      firstName: false,
      lastName: false,
      nationalNumber: false,
      image: false,
    });
  };

  if (loading && !user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e0f7fa, #f0f4ff)",
      }}
    >
      <Card
        sx={{
          maxWidth: 480,
          width: "100%",
          p: 3,
          borderRadius: 4,
          boxShadow: 10,
          background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,255,0.95))",
        }}
      >
        <CardContent>
          <Grid container spacing={2} direction="column" alignItems="center">
            {/* Profile Photo */}
            <Grid item>
              <Box position="relative">
                <Avatar
                  src={user?.profile_photo?.url}
                  sx={{
                    width: 100,
                    height: 100,
                    border: "3px solid #1976d2",
                  }}
                />
                <IconButton
                  color="primary"
                  sx={{ position: "absolute", bottom: 0, right: 0 }}
                  component="label"
                >
                  <FaUpload />
                  <input
                    hidden
                    type="file"
                    onChange={(e) => {
                      setProfilePhoto(e.target.files[0]);
                      setEditMode((prev) => ({ ...prev, image: true }));
                    }}
                  />
                </IconButton>
              </Box>
            </Grid>

            {/* First Name */}
            <Grid item container alignItems="center" justifyContent="space-between">
             First Name : {editMode.firstName ? (
                <>
                  <TextField
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    size="small"
                    label="First Name"
                  />
                  <IconButton onClick={handleSave} color="success">
                    <FaSave />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {firstName}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      setEditMode((prev) => ({ ...prev, firstName: true }))
                    }
                    color="primary"
                  >
                    <FaEdit />
                  </IconButton>
                </>
              )}
            </Grid>

            {/* Last Name */}
            <Grid item container alignItems="center" justifyContent="space-between">
             Last Name :   {editMode.lastName ? (
                <>
                  <TextField
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    size="small"
                    label="Last Name"
                  />
                  <IconButton onClick={handleSave} color="success">
                    <FaSave />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {lastName}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      setEditMode((prev) => ({ ...prev, lastName: true }))
                    }
                    color="primary"
                  >
                    <FaEdit />
                  </IconButton>
                </>
              )}
            </Grid>

            {/* National Number */}
            <Grid item container alignItems="center" justifyContent="space-between">
             National Number : {editMode.nationalNumber ? (
                <>
                  <TextField
                    value={receiverIdentifier}
                    onChange={(e) => setNationalNumber(e.target.value)}
                    size="small"
                    label="National Number"
                  />
                  <IconButton onClick={handleSave} color="success">
                    <FaSave />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography variant="subtitle2">
                    {nationalNumber || "No National Number"}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      setEditMode((prev) => ({ ...prev, nationalNumber: true }))
                    }
                    color="primary"
                  >
                    <FaEdit />
                  </IconButton>
                </>
              )}
            </Grid>

            {/* Email and Phone (readonly) */}
            <Grid item>
              <Box display="flex" alignItems="center" gap={1}>
                <FaEnvelope color="#1976d2" />
              Email :  <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <FaPhone color="#1976d2" />
               Phone : <Typography variant="body2" color="text.secondary">
                  {user?.phone}
                </Typography>
              </Box>
            </Grid>

            {/* Save button */}
            {(editMode.image || editMode.firstName || editMode.lastName || editMode.receiverIdentifier) && (
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    mt: 2,
                    px: 4,
                    py: 1,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}
                  startIcon={<FaSave />}
                >
                  Save Changes
                </Button>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
