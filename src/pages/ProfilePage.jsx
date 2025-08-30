
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
// //   CircularProgress,
// //   Alert,
// //   Box,
// // } from "@mui/material";
// // import {
// //   getUser as fetchUser,
// //   updateUserProfile,
// // } from "../redux/auth/authSlice";
// // import { useNavigate } from "react-router-dom";
// // import { FaEdit, FaSave, FaUpload, FaEnvelope, FaPhone } from "react-icons/fa";
// // import { useTranslation } from "react-i18next";

// // export default function ProfilePage() {
// //   const dispatch = useDispatch();
// //   const { t } = useTranslation();
// //   const { user, loading, error } = useSelector((state) => state.auth);
// //   const navigate = useNavigate();

// //   const [editMode, setEditMode] = useState({
// //     firstName: false,
// //     lastName: false,
// //     nationalNumber: false,
// //     image: false,
// //   });

// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName] = useState("");
// //   const [nationalNumber, setNationalNumber] = useState("");
// //   const [profilePhoto, setProfilePhoto] = useState(null);

// //   useEffect(() => {
// //     if (error === "Unauthorized") {
// //       navigate("/login");
// //     }
// //   }, [error, navigate]);

// //   useEffect(() => {
// //     if (user) {
// //       setFirstName(user.first_name);
// //       setLastName(user.last_name);
// //       setNationalNumber(user.national_number || "");
// //     }
// //   }, [user]);

// //   const handleSave = async () => {
// //     const formData = new FormData();
// //     formData.append("first_name", firstName);
// //     formData.append("last_name", lastName);
// //     formData.append("national_number", nationalNumber);
// //     if (profilePhoto) {
// //       formData.append("profile_photo", profilePhoto);
// //     }
// //     await dispatch(updateUserProfile({ formData }));
// //     setEditMode({
// //       firstName: false,
// //       lastName: false,
// //       nationalNumber: false,
// //       image: false,
// //     });
// //   };

// //   if (loading && !user) {
// //     return (
// //       <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (error && !user) {
// //     return (
// //       <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
// //         <Alert severity="error">{error}</Alert>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Grid
// //       container
// //       justifyContent="center"
// //       alignItems="center"
// //       sx={{
// //         minHeight: "100vh",
// //         background: "linear-gradient(to bottom right, #e0f7fa, #f0f4ff)",
// //       }}
// //     >
// //       <Card
// //         sx={{
// //           maxWidth: 480,
// //           width: "100%",
// //           p: 3,
// //           borderRadius: 4,
// //           boxShadow: 10,
// //           background:
// //             "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,255,0.95))",
// //         }}
// //       >
// //         <CardContent>
// //           <Grid container spacing={2} direction="column" alignItems="center">
// //             {/* Profile Photo */}
// //             <Grid item>
// //               <Box position="relative">
// //                 <Avatar
// //                   src={user?.profile_photo?.url}
// //                   sx={{
// //                     width: 100,
// //                     height: 100,
// //                     border: "3px solid #1976d2",
// //                   }}
// //                 />
// //                 <IconButton
// //                   color="primary"
// //                   sx={{ position: "absolute", bottom: 0, right: 0 }}
// //                   component="label"
// //                 >
// //                   <FaUpload />
// //                   <input
// //                     hidden
// //                     type="file"
// //                     onChange={(e) => {
// //                       setProfilePhoto(e.target.files[0]);
// //                       setEditMode((prev) => ({ ...prev, image: true }));
// //                     }}
// //                   />
// //                 </IconButton>
// //               </Box>
// //             </Grid>

// //             {/* First Name */}
// //             <Grid
// //               item
// //               container
// //               alignItems="center"
// //               justifyContent="space-between"
// //             >
// //               {t("profile.firstName")} :{" "}
// //               {editMode.firstName ? (
// //                 <>
// //                   <TextField
// //                     value={firstName}
// //                     onChange={(e) => setFirstName(e.target.value)}
// //                     size="small"
// //                     label={t("profile.firstName")}
// //                   />
// //                   <IconButton onClick={handleSave} color="success">
// //                     <FaSave />
// //                   </IconButton>
// //                 </>
// //               ) : (
// //                 <>
// //                   <Typography variant="subtitle1" fontWeight="bold">
// //                     {firstName}
// //                   </Typography>
// //                   <IconButton
// //                     onClick={() =>
// //                       setEditMode((prev) => ({ ...prev, firstName: true }))
// //                     }
// //                     color="primary"
// //                   >
// //                     <FaEdit />
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
// //               {t("profile.lastName")} :{" "}
// //               {editMode.lastName ? (
// //                 <>
// //                   <TextField
// //                     value={lastName}
// //                     onChange={(e) => setLastName(e.target.value)}
// //                     size="small"
// //                     label={t("profile.lastName")}
// //                   />
// //                   <IconButton onClick={handleSave} color="success">
// //                     <FaSave />
// //                   </IconButton>
// //                 </>
// //               ) : (
// //                 <>
// //                   <Typography variant="subtitle1" fontWeight="bold">
// //                     {lastName}
// //                   </Typography>
// //                   <IconButton
// //                     onClick={() =>
// //                       setEditMode((prev) => ({ ...prev, lastName: true }))
// //                     }
// //                     color="primary"
// //                   >
// //                     <FaEdit />
// //                   </IconButton>
// //                 </>
// //               )}
// //             </Grid>

// //             {/* National Number */}
// //             <Grid
// //               item
// //               container
// //               alignItems="center"
// //               justifyContent="space-between"
// //             >
// //               {t("profile.nationalNumber")} :{" "}
// //               {editMode.nationalNumber ? (
// //                 <>
// //                   <TextField
// //                     value={nationalNumber}
// //                     onChange={(e) => setNationalNumber(e.target.value)}
// //                     size="small"
// //                     label={t("profile.nationalNumber")}
// //                   />
// //                   <IconButton onClick={handleSave} color="success">
// //                     <FaSave />
// //                   </IconButton>
// //                 </>
// //               ) : (
// //                 <>
// //                   <Typography variant="subtitle2">
// //                     {nationalNumber || t("profile.noNationalNumber")}
// //                   </Typography>
// //                   <IconButton
// //                     onClick={() =>
// //                       setEditMode((prev) => ({
// //                         ...prev,
// //                         nationalNumber: true,
// //                       }))
// //                     }
// //                     color="primary"
// //                   >
// //                     <FaEdit />
// //                   </IconButton>
// //                 </>
// //               )}
// //             </Grid>

// //             {/* Email and Phone (readonly) */}
// //             <Grid item>
// //               <Box display="flex" alignItems="center" gap={1}>
// //                 <FaEnvelope color="#1976d2" />
// //                 {t("profile.email")} :{" "}
// //                 <Typography variant="body2" color="text.secondary">
// //                   {user?.email}
// //                 </Typography>
// //               </Box>
// //               <Box display="flex" alignItems="center" gap={1} mt={1}>
// //                 <FaPhone color="#1976d2" />
// //                 {t("profile.phone")} :{" "}
// //                 <Typography variant="body2" color="text.secondary">
// //                   {user?.phone}
// //                 </Typography>
// //               </Box>
// //             </Grid>

// //             {/* Save button */}
// //             {(editMode.image ||
// //               editMode.firstName ||
// //               editMode.lastName ||
// //               editMode.nationalNumber) && (
// //               <Grid item>
// //                 <Button
// //                   variant="contained"
// //                   onClick={handleSave}
// //                   sx={{
// //                     mt: 2,
// //                     px: 4,
// //                     py: 1,
// //                     textTransform: "capitalize",
// //                     fontWeight: "bold",
// //                   }}
// //                   startIcon={<FaSave />}
// //                 >
// //                   {t("profile.saveChanges")}
// //                 </Button>
// //               </Grid>
// //             )}
// //           </Grid>
// //         </CardContent>
// //       </Card>
// //     </Grid>
// //   );
// // }




// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Card,
//   CardContent,
//   Avatar,
//   Typography,
//   IconButton,
//   TextField,
//   Button,
//   Grid,
//   CircularProgress,
//   Alert,
//   Box,
// } from "@mui/material";
// import {
//   getUser as fetchUser,
//   updateUserProfile,
// } from "../redux/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaSave, FaUpload, FaEnvelope, FaPhone } from "react-icons/fa";
// import { useTranslation } from "react-i18next";
// import { useTheme } from "@mui/material/styles";

// export default function ProfilePage() {
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const { user, loading, error } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const [editMode, setEditMode] = useState({
//     firstName: false,
//     lastName: false,
//     nationalNumber: false,
//     image: false,
//   });

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [nationalNumber, setNationalNumber] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);

//   useEffect(() => {
//     if (error === "Unauthorized") {
//       navigate("/login");
//     }
//   }, [error, navigate]);

//   useEffect(() => {
//     if (user) {
//       setFirstName(user.first_name);
//       setLastName(user.last_name);
//       setNationalNumber(user.national_number || "");
//     }
//   }, [user]);

//   const handleSave = async () => {
//     const formData = new FormData();
//     formData.append("first_name", firstName);
//     formData.append("last_name", lastName);
//     formData.append("national_number", nationalNumber);
//     if (profilePhoto) {
//       formData.append("profile_photo", profilePhoto);
//     }
//     await dispatch(updateUserProfile({ formData }));
//     setEditMode({
//       firstName: false,
//       lastName: false,
//       nationalNumber: false,
//       image: false,
//     });
//   };

// console.log("this is the user : ",(user));
// console.log("this is the loading && !user : ",(loading && !user));


//   if (loading && !user) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error && !user) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Grid
//       container
//       justifyContent="center"
//       alignItems="center"
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(to bottom right, ${theme.palette.background.default}, ${theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]})`,
//       }}
//     >
//       <Card
//         sx={{
//           maxWidth: 480,
//           width: "100%",
//           p: 3,
//           borderRadius: 4,
//           boxShadow: 10,
//           background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[800]})`,
//         }}
//       >
//         <CardContent>
//           <Grid container spacing={2} direction="column" alignItems="center">
//             {/* Profile Photo */}
//             <Grid item>
//               <Box position="relative">
//                 <Avatar
//                   src={user?.profile_photo?.url}
//                   sx={{
//                     width: 100,
//                     height: 100,
//                     border: `3px solid ${theme.palette.primary.main}`,
//                   }}
//                 />
//                 <IconButton
//                   color="primary"
//                   sx={{ position: "absolute", bottom: 0, right: 0 }}
//                   component="label"
//                 >
//                   <FaUpload />
//                   <input
//                     hidden
//                     type="file"
//                     onChange={(e) => {
//                       setProfilePhoto(e.target.files[0]);
//                       setEditMode((prev) => ({ ...prev, image: true }));
//                     }}
//                   />
//                 </IconButton>
//               </Box>
//             </Grid>

//             {/* First Name */}
//             <Grid
//               item
//               container
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               {t("profile.firstName")} :{" "}
//               {editMode.firstName ? (
//                 <>
//                   <TextField
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     size="small"
//                     label={t("profile.firstName")}
//                   />
//                   <IconButton onClick={handleSave} color="success">
//                     <FaSave />
//                   </IconButton>
//                 </>
//               ) : (
//                 <>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {firstName}
//                   </Typography>
//                   <IconButton
//                     onClick={() =>
//                       setEditMode((prev) => ({ ...prev, firstName: true }))
//                     }
//                     color="primary"
//                   >
//                     <FaEdit />
//                   </IconButton>
//                 </>
//               )}
//             </Grid>

//             {/* Last Name */}
//             <Grid
//               item
//               container
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               {t("profile.lastName")} :{" "}
//               {editMode.lastName ? (
//                 <>
//                   <TextField
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     size="small"
//                     label={t("profile.lastName")}
//                   />
//                   <IconButton onClick={handleSave} color="success">
//                     <FaSave />
//                   </IconButton>
//                 </>
//               ) : (
//                 <>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {lastName}
//                   </Typography>
//                   <IconButton
//                     onClick={() =>
//                       setEditMode((prev) => ({ ...prev, lastName: true }))
//                     }
//                     color="primary"
//                   >
//                     <FaEdit />
//                   </IconButton>
//                 </>
//               )}
//             </Grid>

//             {/* National Number */}
//             <Grid
//               item
//               container
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               {t("profile.nationalNumber")} :{" "}
//               {editMode.nationalNumber ? (
//                 <>
//                   <TextField
//                     value={nationalNumber}
//                     onChange={(e) => setNationalNumber(e.target.value)}
//                     size="small"
//                     label={t("profile.nationalNumber")}
//                   />
//                   <IconButton onClick={handleSave} color="success">
//                     <FaSave />
//                   </IconButton>
//                 </>
//               ) : (
//                 <>
//                   <Typography variant="subtitle2">
//                     {nationalNumber || t("profile.noNationalNumber")}
//                   </Typography>
//                   <IconButton
//                     onClick={() =>
//                       setEditMode((prev) => ({
//                         ...prev,
//                         nationalNumber: true,
//                       }))
//                     }
//                     color="primary"
//                   >
//                     <FaEdit />
//                   </IconButton>
//                 </>
//               )}
//             </Grid>

//             {/* Email and Phone (readonly) */}
//             <Grid item>
//               <Box display="flex" alignItems="center" gap={1}>
//                 <FaEnvelope color={theme.palette.primary.main} />
//                 {t("profile.email")} :{" "}
//                 <Typography variant="body2" color="text.secondary">
//                   {user?.email}
//                 </Typography>
//               </Box>
//               <Box display="flex" alignItems="center" gap={1} mt={1}>
//                 <FaPhone color={theme.palette.primary.main} />
//                 {t("profile.phone")} :{" "}
//                 <Typography variant="body2" color="text.secondary">
//                   {user?.phone}
//                 </Typography>
//               </Box>
//             </Grid>

//             {/* Save button */}
//             {(editMode.image ||
//               editMode.firstName ||
//               editMode.lastName ||
//               editMode.nationalNumber) && (
//               <Grid item>
//                 <Button
//                   variant="contained"
//                   onClick={handleSave}
//                   sx={{
//                     mt: 2,
//                     px: 4,
//                     py: 1,
//                     textTransform: "capitalize",
//                     fontWeight: "bold",
//                   }}
//                   startIcon={<FaSave />}
//                 >
//                   {t("profile.saveChanges")}
//                 </Button>
//               </Grid>
//             )}
//           </Grid>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
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
import {
  getUser as fetchUser,
  updateUserProfile,
} from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSave, FaUpload, FaEnvelope, FaPhone } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import LoadingScreen from "../components/LoadingScreen"; // Import the new component

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const theme = useTheme();

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    nationalNumber: false,
    image: false,
  });
  
  // New state for managing the update loading process
  const [isUpdating, setIsUpdating] = useState(false);

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
    // Start the updating process
    setIsUpdating(true);
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
    // End the updating process
    setIsUpdating(false);
  };

  console.log("this is the user : ",(user));
  console.log("this is the loading && !user : ",(loading && !user));


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
    <>
      {isUpdating && <LoadingScreen />}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(to bottom right, ${theme.palette.background.default}, ${theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]})`,
        }}
      >
        <Card
          sx={{
            maxWidth: 480,
            width: "100%",
            p: 3,
            borderRadius: 4,
            boxShadow: 10,
            background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[800]})`,
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
                      border: `3px solid ${theme.palette.primary.main}`,
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
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                {t("profile.firstName")} :{" "}
                {editMode.firstName ? (
                  <>
                    <TextField
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      size="small"
                      label={t("profile.firstName")}
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
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                {t("profile.lastName")} :{" "}
                {editMode.lastName ? (
                  <>
                    <TextField
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      size="small"
                      label={t("profile.lastName")}
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
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                {t("profile.nationalNumber")} :{" "}
                {editMode.nationalNumber ? (
                  <>
                    <TextField
                      value={nationalNumber}
                      onChange={(e) => setNationalNumber(e.target.value)}
                      size="small"
                      label={t("profile.nationalNumber")}
                    />
                    <IconButton onClick={handleSave} color="success">
                      <FaSave />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle2">
                      {nationalNumber || t("profile.noNationalNumber")}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        setEditMode((prev) => ({
                          ...prev,
                          nationalNumber: true,
                        }))
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
                  <FaEnvelope color={theme.palette.primary.main} />
                  {t("profile.email")} :{" "}
                  <Typography variant="body2" color="text.secondary">
                    {user?.email}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <FaPhone color={theme.palette.primary.main} />
                  {t("profile.phone")} :{" "}
                  <Typography variant="body2" color="text.secondary">
                    {user?.phone}
                  </Typography>
                </Box>
              </Grid>

              {/* Save button */}
              {(editMode.image ||
                editMode.firstName ||
                editMode.lastName ||
                editMode.nationalNumber) && (
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
                    {t("profile.saveChanges")}
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}