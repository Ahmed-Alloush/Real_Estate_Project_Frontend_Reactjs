// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   fetchPropertyById,
//   updateProperty,
//   addPhotoToProperty,
//   removePhotoFromProperty,
//   addAttributeToProperty,
//   removeAttributeFromProperty,
// } from "../redux/property/propertySlice";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Paper,
//   TextField,
//   Button,
//   Grid,
//   Chip,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { FaPlus, FaTrash } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { fetchPropertyTypes } from "../redux/property type/propertyTypeSlice";

// const UpdatePropertyPage = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     currentProperty,
//     currentPropertyLoading,
//     currentPropertyError,
//     loading: updateLoading,
//     photoActionLoading,
//     attributeActionLoading,
//   } = useSelector((state) => state.property);

//   const { propertyTypes } = useSelector((state) => state.propertyType);

//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [propertyTypeOperation, setPropertyTypeOperation] = useState("");
//   const [newAttributeName, setNewAttributeName] = useState("");
//   const [newAttributeValue, setNewAttributeValue] = useState("");
//   const [newPhotoFile, setNewPhotoFile] = useState(null);

//   useEffect(() => {
//     dispatch(fetchPropertyById(id));
//     dispatch(fetchPropertyTypes());
//   }, [dispatch, id]);

//   const selectedPropertyType = propertyTypes.find(
//     (type) => type.id === currentProperty.type.id
//   );

//   const allowedAttributes = selectedPropertyType
//     ? selectedPropertyType.attributes.map((pta) => pta.attribute)
//     : [];

//   useEffect(() => {
//     if (currentProperty) {
//       setPrice(currentProperty.price || "");
//       setDescription(currentProperty.description || "");
//       setPropertyTypeOperation(currentProperty.typeOperation || "");
//     }
//   }, [currentProperty]);

//   const handleUpdate = async () => {
//     try {
//       const updatedData = {
//         price,
//         description,
//         typeOperation: propertyTypeOperation,
//       };
//       await dispatch(updateProperty({ id, updatedData })).unwrap();
//       Swal.fire("Success", "Property updated successfully!", "success");
//       navigate("/office-manager"); // Navigate back after a successful update
//     } catch (error) {
//       Swal.fire("Error", `Failed to update property: ${error}`, "error");
//     }
//   };

//   const handlePhotoAdd = async () => {
//     if (!newPhotoFile) {
//       Swal.fire("Warning", "Please select a photo to upload.", "warning");
//       return;
//     }

//     try {
//       await dispatch(
//         addPhotoToProperty({ propertyId: id, photoFile: newPhotoFile })
//       ).unwrap();
//       Swal.fire("Success", "Photo added successfully!", "success");
//       setNewPhotoFile(null); // Clear file input
//     } catch (error) {
//       Swal.fire("Error", `Failed to add photo: ${error}`, "error");
//     }
//   };

//   const handlePhotoRemove = async (photoId) => {
//     try {
//       await dispatch(removePhotoFromProperty(photoId)).unwrap();
//       Swal.fire("Success", "Photo deleted successfully!", "success");
//     } catch (error) {
//       Swal.fire("Error", `Failed to delete photo: ${error}`, "error");
//     }
//   };

//   const handleAttributeAdd = async () => {
//     if (!newAttributeName || !newAttributeValue) {
//       Swal.fire(
//         "Warning",
//         "Please fill in both attribute name and value.",
//         "warning"
//       );
//       return;
//     }

//     try {
//       await dispatch(
//         addAttributeToProperty({
//           propertyId: id,
//           attributeName: newAttributeName,
//           value: newAttributeValue,
//         })
//       ).unwrap();
//       Swal.fire("Success", "Attribute added successfully!", "success");
//       setNewAttributeName("");
//       setNewAttributeValue("");
//     } catch (error) {
//       Swal.fire("Error", `Failed to add attribute: ${error}`, "error");
//     }
//   };

//   const handleAttributeRemove = async (attributeId) => {
//     try {
//       await dispatch(removeAttributeFromProperty(attributeId)).unwrap();
//       Swal.fire("Success", "Attribute deleted successfully!", "success");
//     } catch (error) {
//       Swal.fire("Error", `Failed to delete attribute: ${error}`, "error");
//     }
//   };

//   if (currentPropertyLoading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (currentPropertyError) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography color="error">{currentPropertyError}</Typography>
//       </Box>
//     );
//   }

//   if (!currentProperty) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography>Property not found.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={4}>
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Update Property #{currentProperty.propertyNumber}
//         </Typography>

//         <Grid container spacing={3}>
//           {/* Main Attributes Section */}
//           <Grid item xs={12} md={6}>
//             <Box mb={3}>
//               <Typography variant="h6" mb={2}>
//                 Property Details
//               </Typography>
//               <TextField
//                 fullWidth
//                 label="Price"
//                 type="number"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Description"
//                 multiline
//                 rows={4}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//               <FormControl fullWidth>
//                 <InputLabel>Property Type (Selling or Renting)</InputLabel>
//                 <Select
//                   value={
//                     propertyTypeOperation === "selling" ? "Selling" : "Renting"
//                   }
//                   label="Property Type (Selling or Renting)"
//                   onChange={(e) => setPropertyTypeOperation(e.target.value)}
//                 >
//                   <MenuItem value="Selling">Selling</MenuItem>
//                   <MenuItem value="Renting">Renting</MenuItem>
//                 </Select>
//               </FormControl>
//               <Button
//                 variant="contained"
//                 onClick={handleUpdate}
//                 sx={{ mt: 3 }}
//                 disabled={updateLoading}
//               >
//                 {updateLoading ? (
//                   <CircularProgress size={24} />
//                 ) : (
//                   "Update Property"
//                 )}
//               </Button>
//             </Box>
//           </Grid>

//           {/* Photos Section */}
//           <Grid item xs={12} md={6}>
//             <Box mb={3}>
//               <Typography variant="h6" mb={2}>
//                 Photos
//               </Typography>
//               <Grid container spacing={2}>
//                 {currentProperty.photos?.map((photo) => (
//                   <Grid item key={photo.id} xs={6} sm={4} md={3}>
//                     <Box sx={{ position: "relative" }}>
//                       <Box
//                         component="img"
//                         src={photo.url}
//                         alt="Property Photo"
//                         sx={{
//                           width: "100%",
//                           height: 100,
//                           objectFit: "cover",
//                           borderRadius: 2,
//                         }}
//                       />
//                       <IconButton
//                         sx={{
//                           position: "absolute",
//                           top: 8,
//                           right: 8,
//                           bgcolor: "rgba(255, 255, 255, 0.7)",
//                           "&:hover": { bgcolor: "white" },
//                         }}
//                         onClick={() => handlePhotoRemove(photo.id)}
//                         disabled={photoActionLoading}
//                       >
//                         {photoActionLoading ? (
//                           <CircularProgress size={20} />
//                         ) : (
//                           <FaTrash color="red" />
//                         )}
//                       </IconButton>
//                     </Box>
//                   </Grid>
//                 ))}
//               </Grid>
//               <Box mt={3} display="flex" alignItems="center" gap={2}>
//                 <Button
//                   component="label"
//                   variant="contained"
//                   disabled={photoActionLoading}
//                 >
//                   Add New Photo
//                   <input
//                     type="file"
//                     hidden
//                     accept="image/*"
//                     onChange={(e) => setNewPhotoFile(e.target.files[0])}
//                   />
//                 </Button>
//                 {newPhotoFile && (
//                   <Typography variant="body2" noWrap>
//                     {newPhotoFile.name}
//                   </Typography>
//                 )}
//                 <IconButton
//                   color="primary"
//                   onClick={handlePhotoAdd}
//                   disabled={photoActionLoading || !newPhotoFile}
//                 >
//                   {photoActionLoading ? (
//                     <CircularProgress size={24} />
//                   ) : (
//                     <FaPlus />
//                   )}
//                 </IconButton>
//               </Box>
//             </Box>
//           </Grid>

//           {/* Attributes Section */}
//           <Grid item xs={12}>
//             <Box>
//               {/* <Typography variant="h6" mb={2}>
//                 Attributes
//               </Typography>
//               <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
//                 {currentProperty.propertyAttributes?.map((attr) => (
//                   <Chip
//                     key={attr.id}
//                     label={`${attr.attribute.name}: ${attr.value}`}
//                     onDelete={() => handleAttributeRemove(attr.id)}
//                     color="primary"
//                     variant="outlined"
//                     disabled={attributeActionLoading}
//                   />
//                 ))} */}

//         <Typography variant="h6" sx={{ mt: 3 }}>
//           Attributes
//         </Typography>
//         {allowedAttributes.attributes.map((attr, index) => (
//           <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
//             <Grid item xs={5}>
//               <FormControl fullWidth>
//                 <InputLabel>Attribute Name</InputLabel>
//                 <Select
//                   name="attributeName"
//                   value={attr.attributeName}
//                   onChange={(e) => setNewAttributeName(attr.attributeName)}
//                   label="Attribute Name"
//                 >
//                   {allowedAttributes.map((allowedAttr) => (
//                     <MenuItem key={allowedAttr.id} value={allowedAttr.name}>
//                       {allowedAttr.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={5}>
//               <TextField
//                 name="value"
//                 label="Value"
//                 type="number"
//                 value={attr.value}
//                 onChange={(e) => setNewAttributeValue(e.target.value)}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={2}>
//               <IconButton onClick={() => removeAttribute(index)} color="error">
//                 <DeleteIcon />
//               </IconButton>
//             </Grid>
//             {errors[`attribute-${index}`] && (
//               <Grid item xs={12}>
//                 <Typography color="error">
//                   {errors[`attribute-${index}`]}
//                 </Typography>
//               </Grid>
//             )}
//           </Grid>
//         ))}

//               {/* </Box>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12} sm={5}>
//                   <TextField
//                     fullWidth
//                     label="Attribute Name"
//                     value={newAttributeName}
//                     onChange={(e) => setNewAttributeName(e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={5}>
//                   <TextField
//                     fullWidth
//                     label="Attribute Value"
//                     value={newAttributeValue}
//                     onChange={(e) => setNewAttributeValue(e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     onClick={handleAttributeAdd}
//                     disabled={
//                       attributeActionLoading ||
//                       !newAttributeName ||
//                       !newAttributeValue
//                     }
//                   >
//                     {attributeActionLoading ? (
//                       <CircularProgress size={24} />
//                     ) : (
//                       "Add"
//                     )}
//                   </Button>
//                 </Grid>
//               </Grid> */}
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default UpdatePropertyPage;

// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useParams, useNavigate } from "react-router-dom";
// // import {
// //   fetchPropertyById,
// //   updateProperty,
// //   addPhotoToProperty,
// //   removePhotoFromProperty,
// //   addAttributeToProperty,
// //   removeAttributeFromProperty,
// // } from "../redux/property/propertySlice";
// // import { fetchPropertyTypes } from "../redux/property type/propertyTypeSlice"; // Import fetchPropertyTypes
// // import {
// //   Box,
// //   Typography,
// //   CircularProgress,
// //   Paper,
// //   TextField,
// //   Button,
// //   Grid,
// //   Chip,
// //   IconButton,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   FormHelperText,
// // } from "@mui/material";
// // import { FaPlus, FaTrash } from "react-icons/fa";
// // import Swal from "sweetalert2";

// // const UpdatePropertyPage = () => {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const {
// //     currentProperty,
// //     currentPropertyLoading,
// //     currentPropertyError,
// //     loading: updateLoading,
// //     photoActionLoading,
// //     attributeActionLoading,
// //   } = useSelector((state) => state.property);

// //   // Get property types from the Redux store
// //   const { propertyTypes } = useSelector((state) => state.propertyType);

// //   const [price, setPrice] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [propertyTypeOperation, setPropertyTypeOperaion] = useState("");
// //   const [newAttributeName, setNewAttributeName] = useState("");
// //   const [newAttributeValue, setNewAttributeValue] = useState("");
// //   const [newPhotoFile, setNewPhotoFile] = useState(null);
// //   const [selectedPropertyTypeObject, setSelectedPropertyTypeObject] =
// //     useState(null);
// //   const [allowedAttributes, setAllowedAttributes] = useState([]);
// //   const [errors, setErrors] = useState({});

// //   useEffect(() => {
// //     dispatch(fetchPropertyById(id));
// //     dispatch(fetchPropertyTypes()); // Fetch all property types
// //   }, [dispatch, id]);

// //   useEffect(() => {
// //     if (currentProperty) {
// //       setPrice(currentProperty.price || "");
// //       setDescription(currentProperty.description || "");
// //       setPropertyTypeOperaion(currentProperty.typeOperation || "");
// //       setSelectedPropertyTypeObject(
// //         propertyTypes.find(
// //           (type) => type.id === currentProperty.propertyType?.id
// //         )
// //       );
// //       setAllowedAttributes(
// //         selectedPropertyTypeObject?.attributes.map((pta) => pta.attribute) || []
// //       );
// //     }
// //   }, [currentProperty]);

// //   // Determine the allowed attributes based on the current property's type
// //   // const selectedPropertyTypeObject = propertyTypes.find(
// //   //   (type) => type.id === currentProperty?.propertyType?.id
// //   // );
// //   // const allowedAttributes = selectedPropertyTypeObject
// //   //   ? selectedPropertyTypeObject.attributes.map((pta) => pta.attribute)
// //   //   : [];

// //   const handleUpdate = async () => {
// //     try {
// //       const updatedData = {
// //         price,
// //         description,
// //         typeOperation: propertyTypeOperation,
// //       };
// //       await dispatch(updateProperty({ id, updatedData })).unwrap();
// //       Swal.fire("Success", "Property updated successfully!", "success");
// //       navigate("/office-manager");
// //     } catch (error) {
// //       Swal.fire("Error", `Failed to update property: ${error}`, "error");
// //     }
// //   };

// //   const handlePhotoAdd = async () => {
// //     if (!newPhotoFile) {
// //       Swal.fire("Warning", "Please select a photo to upload.", "warning");
// //       return;
// //     }

// //     try {
// //       await dispatch(
// //         addPhotoToProperty({ propertyId: id, photoFile: newPhotoFile })
// //       ).unwrap();
// //       Swal.fire("Success", "Photo added successfully!", "success");
// //       setNewPhotoFile(null);
// //     } catch (error) {
// //       Swal.fire("Error", `Failed to add photo: ${error}`, "error");
// //     }
// //   };

// //   const handlePhotoRemove = async (photoId) => {
// //     try {
// //       await dispatch(removePhotoFromProperty(photoId)).unwrap();
// //       Swal.fire("Success", "Photo deleted successfully!", "success");
// //     } catch (error) {
// //       Swal.fire("Error", `Failed to delete photo: ${error}`, "error");
// //     }
// //   };

// //   const validateAttribute = () => {
// //     const newErrors = {};
// //     if (!newAttributeName)
// //       newErrors.newAttributeName = "Attribute name is required";
// //     if (!newAttributeValue) newErrors.newAttributeValue = "Value is required";
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleAttributeAdd = async () => {
// //     if (!validateAttribute()) return;

// //     try {
// //       await dispatch(
// //         addAttributeToProperty({
// //           propertyId: id,
// //           attributeName: newAttributeName,
// //           value: newAttributeValue,
// //         })
// //       ).unwrap();
// //       Swal.fire("Success", "Attribute added successfully!", "success");
// //       setNewAttributeName("");
// //       setNewAttributeValue("");
// //       setErrors({});
// //     } catch (error) {
// //       Swal.fire("Error", `Failed to add attribute: ${error}`, "error");
// //     }
// //   };

// //   const handleAttributeRemove = async (attributeId) => {
// //     try {
// //       await dispatch(removeAttributeFromProperty(attributeId)).unwrap();
// //       Swal.fire("Success", "Attribute deleted successfully!", "success");
// //     } catch (error) {
// //       Swal.fire("Error", `Failed to delete attribute: ${error}`, "error");
// //     }
// //   };

// //   if (currentPropertyLoading) {
// //     return (
// //       <Box display="flex" justifyContent="center" mt={4}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (currentPropertyError) {
// //     return (
// //       <Box textAlign="center" mt={4}>
// //         <Typography color="error">{currentPropertyError}</Typography>
// //       </Box>
// //     );
// //   }

// //   if (!currentProperty) {
// //     return (
// //       <Box textAlign="center" mt={4}>
// //         <Typography>Property not found.</Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box p={4}>
// //       <Paper elevation={3} sx={{ p: 4 }}>
// //         <Typography variant="h4" gutterBottom>
// //           Update Property #{currentProperty.propertyNumber}
// //         </Typography>

// //         <Grid container spacing={3}>
// //           {/* Main Attributes Section */}
// //           <Grid item xs={12} md={6}>
// //             <Box mb={3}>
// //               <Typography variant="h6" mb={2}>
// //                 Property Details
// //               </Typography>
// //               <TextField
// //                 fullWidth
// //                 label="Price"
// //                 type="number"
// //                 value={price}
// //                 onChange={(e) => setPrice(e.target.value)}
// //                 sx={{ mb: 2 }}
// //               />
// //               <TextField
// //                 fullWidth
// //                 label="Description"
// //                 multiline
// //                 rows={4}
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 sx={{ mb: 2 }}
// //               />
// //               <FormControl fullWidth>
// //                 <InputLabel>Property Type (Selling or Renting)</InputLabel>
// //                 <Select
// //                   value={propertyTypeOperation}
// //                   label="Property Type (Selling or Renting)"
// //                   onChange={(e) => setPropertyTypeOperaion(e.target.value)}
// //                 >
// //                   <MenuItem value="Selling">Selling</MenuItem>
// //                   <MenuItem value="Renting">Renting</MenuItem>
// //                 </Select>
// //               </FormControl>
// //               <Button
// //                 variant="contained"
// //                 onClick={handleUpdate}
// //                 sx={{ mt: 3 }}
// //                 disabled={updateLoading}
// //               >
// //                 {updateLoading ? (
// //                   <CircularProgress size={24} />
// //                 ) : (
// //                   "Update Property"
// //                 )}
// //               </Button>
// //             </Box>
// //           </Grid>

// //           {/* Photos Section */}
// //           <Grid item xs={12} md={6}>
// //             <Box mb={3}>
// //               <Typography variant="h6" mb={2}>
// //                 Photos
// //               </Typography>
// //               <Grid container spacing={2}>
// //                 {currentProperty.photos?.map((photo) => (
// //                   <Grid item key={photo.id} xs={6} sm={4} md={3}>
// //                     <Box sx={{ position: "relative" }}>
// //                       <Box
// //                         component="img"
// //                         src={photo.url}
// //                         alt="Property Photo"
// //                         sx={{
// //                           width: "100%",
// //                           height: 100,
// //                           objectFit: "cover",
// //                           borderRadius: 2,
// //                         }}
// //                       />
// //                       <IconButton
// //                         sx={{
// //                           position: "absolute",
// //                           top: 8,
// //                           right: 8,
// //                           bgcolor: "rgba(255, 255, 255, 0.7)",
// //                           "&:hover": { bgcolor: "white" },
// //                         }}
// //                         onClick={() => handlePhotoRemove(photo.id)}
// //                         disabled={photoActionLoading}
// //                       >
// //                         {photoActionLoading ? (
// //                           <CircularProgress size={20} />
// //                         ) : (
// //                           <FaTrash color="red" />
// //                         )}
// //                       </IconButton>
// //                     </Box>
// //                   </Grid>
// //                 ))}
// //               </Grid>
// //               <Box mt={3} display="flex" alignItems="center" gap={2}>
// //                 <Button
// //                   component="label"
// //                   variant="contained"
// //                   disabled={photoActionLoading}
// //                 >
// //                   Add New Photo
// //                   <input
// //                     type="file"
// //                     hidden
// //                     accept="image/*"
// //                     onChange={(e) => setNewPhotoFile(e.target.files[0])}
// //                   />
// //                 </Button>
// //                 {newPhotoFile && (
// //                   <Typography variant="body2" noWrap>
// //                     {newPhotoFile.name}
// //                   </Typography>
// //                 )}
// //                 <IconButton
// //                   color="primary"
// //                   onClick={handlePhotoAdd}
// //                   disabled={photoActionLoading || !newPhotoFile}
// //                 >
// //                   {photoActionLoading ? (
// //                     <CircularProgress size={24} />
// //                   ) : (
// //                     <FaPlus />
// //                   )}
// //                 </IconButton>
// //               </Box>
// //             </Box>
// //           </Grid>

// //           {/* Attributes Section */}
// //           <Grid item xs={12}>
// //             <Box>
// //               <Typography variant="h6" mb={2}>
// //                 Attributes
// //               </Typography>
// //               <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
// //                 {currentProperty.propertyAttributes?.map((attr) => (
// //                   <Chip
// //                     key={attr.id}
// //                     label={`${attr.attribute.name}: ${attr.value}`}
// //                     onDelete={() => handleAttributeRemove(attr.id)}
// //                     color="primary"
// //                     variant="outlined"
// //                     disabled={attributeActionLoading}
// //                   />
// //                 ))}
// //               </Box>
// //               <Grid container spacing={2} alignItems="center">
// //                 <Grid item xs={12} sm={5}>
// //                   <FormControl fullWidth error={!!errors.newAttributeName}>
// //                     <InputLabel>Attribute Name</InputLabel>
// //                     <Select
// //                       value={newAttributeName}
// //                       label="Attribute Name"
// //                       // onChange={(e) => setNewAttributeName(e.target.value)}
// //                     >
// //                       {/* Filter to show only allowed attributes */}
// //                       {allowedAttributes.map((attr) => (
// //                         <MenuItem key={attr.id} value={attr.name}>
// //                           {attr.name}
// //                         </MenuItem>
// //                       ))}
// //                     </Select>
// //                     {!!errors.newAttributeName && (
// //                       <FormHelperText>{errors.newAttributeName}</FormHelperText>
// //                     )}
// //                   </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} sm={5}>
// //                   <TextField
// //                     fullWidth
// //                     label="Attribute Value"
// //                     value={newAttributeValue}
// //                     onChange={(e) => setNewAttributeValue(e.target.value)}
// //                     error={!!errors.newAttributeValue}
// //                     helperText={errors.newAttributeValue}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} sm={2}>
// //                   <Button
// //                     variant="contained"
// //                     fullWidth
// //                     onClick={handleAttributeAdd}
// //                     disabled={
// //                       attributeActionLoading ||
// //                       !newAttributeName ||
// //                       !newAttributeValue
// //                     }
// //                   >
// //                     {attributeActionLoading ? (
// //                       <CircularProgress size={24} />
// //                     ) : (
// //                       "Add"
// //                     )}
// //                   </Button>
// //                 </Grid>
// //               </Grid>
// //             </Box>
// //           </Grid>
// //         </Grid>
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default UpdatePropertyPage;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPropertyById,
  updateProperty,
  addPhotoToProperty,
  removePhotoFromProperty,
  addAttributeToProperty,
  removeAttributeFromProperty,
} from "../redux/property/propertySlice";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  TextField,
  Button,
  Grid,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { fetchPropertyTypes } from "../redux/property type/propertyTypeSlice";

const UpdatePropertyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    currentProperty,
    currentPropertyLoading,
    currentPropertyError,
    loading: updateLoading,
    photoActionLoading,
    attributeActionLoading,
  } = useSelector((state) => state.property);

  const { propertyTypes } = useSelector((state) => state.propertyType);

  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [propertyTypeOperation, setPropertyTypeOperation] = useState("");
  const [newAttributeName, setNewAttributeName] = useState("");
  const [newAttributeValue, setNewAttributeValue] = useState("");
  const [newPhotoFile, setNewPhotoFile] = useState(null);

  useEffect(() => {
    dispatch(fetchPropertyById(id));
    dispatch(fetchPropertyTypes());
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProperty) {
      setPrice(currentProperty.price || "");
      setDescription(currentProperty.description || "");
      // Correctly initialize state from currentProperty
      setPropertyTypeOperation(currentProperty.typeOperation || "");
    }
  }, [currentProperty]);

  // The 'selectedPropertyType' logic needs to be robust,
  // as currentProperty might not be available on initial render.
  const selectedPropertyType = propertyTypes.find(
    (type) => type.id === currentProperty?.type?.id
  );

  const allowedAttributes = selectedPropertyType
    ? selectedPropertyType.attributes.map((pta) => pta.attribute)
    : [];

  const handleUpdate = async () => {
    try {
      const updatedData = {
        price,
        description,
        typeOperation: propertyTypeOperation,
      };
      await dispatch(updateProperty({ id, updatedData })).unwrap();
      Swal.fire("Success", "Property updated successfully!", "success");
      navigate(-1);
    } catch (error) {
      Swal.fire("Error", `Failed to update property: ${error}`, "error");
    }
  };

  const handlePhotoAdd = async () => {
    if (!newPhotoFile) {
      Swal.fire("Warning", "Please select a photo to upload.", "warning");
      return;
    }

    try {
      await dispatch(
        addPhotoToProperty({ propertyId: id, photoFile: newPhotoFile })
      ).unwrap();
      Swal.fire("Success", "Photo added successfully!", "success");
      setNewPhotoFile(null); // Clear file input
    } catch (error) {
      Swal.fire("Error", `Failed to add photo: ${error}`, "error");
    }
  };

  const handlePhotoRemove = async (photoId) => {
    try {
      await dispatch(removePhotoFromProperty(photoId)).unwrap();
      Swal.fire("Success", "Photo deleted successfully!", "success");
    } catch (error) {
      Swal.fire("Error", `Failed to delete photo: ${error}`, "error");
    }
  };

  const handleAttributeAdd = async () => {
    if (!newAttributeName || !newAttributeValue) {
      Swal.fire(
        "Warning",
        "Please fill in both attribute name and value.",
        "warning"
      );
      return;
    }

    try {
      await dispatch(
        addAttributeToProperty({
          propertyId: id,
          name: newAttributeName,
          value: newAttributeValue,
        })
      ).unwrap();
      Swal.fire("Success", "Attribute added successfully!", "success");
      setNewAttributeName("");
      setNewAttributeValue("");
    } catch (error) {
      Swal.fire("Error", `Failed to add attribute: ${error}`, "error");
    }
  };

  const handleAttributeRemove = async (attributeId) => {
    try {
      await dispatch(removeAttributeFromProperty(attributeId)).unwrap();
      Swal.fire("Success", "Attribute deleted successfully!", "success");
    } catch (error) {
      Swal.fire("Error", `Failed to delete attribute: ${error}`, "error");
    }
  };

  if (currentPropertyLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (currentPropertyError) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{currentPropertyError}</Typography>
      </Box>
    );
  }

  if (!currentProperty) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography>Property not found.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => navigate(-1)}
            >
              Go back to Your Office
            </Button>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update Property #{currentProperty.propertyNumber}
        </Typography>

        <Grid container spacing={3}>
          {/* Main Attributes Section */}
          <Grid item xs={12} md={6}>
            <Box mb={3}>
              <Typography variant="h6" mb={2}>
                Property Details
              </Typography>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth>
                <InputLabel>Property Type (Selling or Renting)</InputLabel>
                <Select
                  value={propertyTypeOperation}
                  label="Property Type (Selling or Renting)"
                  onChange={(e) => setPropertyTypeOperation(e.target.value)}
                >
                  <MenuItem value="selling">Selling</MenuItem>
                  <MenuItem value="renting">Renting</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{ mt: 3 }}
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Update Property"
                )}
              </Button>
            </Box>
          </Grid>

          {/* Photos Section */}
          <Grid item xs={12} md={6}>
            <Box mb={3}>
              <Typography variant="h6" mb={2}>
                Photos
              </Typography>
              <Grid container spacing={2}>
                {currentProperty.photos?.map((photo) => (
                  <Grid item key={photo.id} xs={6} sm={4} md={3}>
                    <Box sx={{ position: "relative" }}>
                      <Box
                        component="img"
                        src={photo.url}
                        alt="Property Photo"
                        sx={{
                          width: "100%",
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 2,
                        }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "rgba(255, 255, 255, 0.7)",
                          "&:hover": { bgcolor: "white" },
                        }}
                        onClick={() => handlePhotoRemove(photo.id)}
                        disabled={photoActionLoading}
                      >
                        {/* {photoActionLoading ? (
                          <CircularProgress size={20} />
                        ) : ( */}
                        <FaTrash color="red" />
                        {/* )} */}
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>


              <Box mt={3} display="flex" alignItems="center" gap={2}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<FaPlus />}
                  disabled={photoActionLoading}
                  sx={{ minWidth: 200 }} // Gives the button a consistent width
                >
                  {/* {photoActionLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Add New Photo"
                  )} */}
                    Add New Photo

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      setNewPhotoFile(e.target.files[0]);
                      // Immediately add the photo when a file is selected
                      // Note: You would need to make `handlePhotoAdd` a more general function
                      // that takes the file as an argument.
                      // handlePhotoAdd(e.target.files[0]);
                    }}
                  />
                </Button>
                {newPhotoFile && <Button
                 component="label"
                  variant="contained"
                  startIcon={<FaSave />}
                onClick={handlePhotoAdd}>
                  {photoActionLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : ("Save")}
                  </Button>}
                {newPhotoFile && (
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {newPhotoFile.name}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Corrected Attributes Section */}
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6" mb={2}>
                Attributes
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                {currentProperty.propertyAttributes?.map((attr) => (
                  <Chip
                    key={attr.id}
                    label={`${attr.attribute.name}: ${attr.value}`}
                    onDelete={() => handleAttributeRemove(attr.id)}
                    color="primary"
                    variant="outlined"
                    disabled={attributeActionLoading}
                  />
                ))}
              </Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  {/* Dropdown for predefined attributes */}
                  <FormControl fullWidth>
                    <InputLabel>Attribute Name</InputLabel>
                    <Select
                      value={newAttributeName}
                      label="Attribute Name"
                      onChange={(e) => setNewAttributeName(e.target.value)}
                    >
                      {allowedAttributes.map((allowedAttr) => (
                        <MenuItem key={allowedAttr.id} value={allowedAttr.name}>
                          {allowedAttr.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Attribute Value"
                    value={newAttributeValue}
                    onChange={(e) => setNewAttributeValue(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAttributeAdd}
                    disabled={
                      attributeActionLoading ||
                      !newAttributeName ||
                      !newAttributeValue
                    }
                  >
                    {attributeActionLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UpdatePropertyPage;
