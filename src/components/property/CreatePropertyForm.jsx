// // // // // // // // import React, { useState } from "react";
// // // // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // // // import {
// // // // // // // //   createProperty,
// // // // // // // // } from "../../redux/property/propertySlice";
// // // // // // // // import {
// // // // // // // //   TextField,
// // // // // // // //   Button,
// // // // // // // //   Box,
// // // // // // // //   Grid,
// // // // // // // //   Typography,
// // // // // // // //   CircularProgress,
// // // // // // // // } from "@mui/material";
// // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // import Swal from "sweetalert2";

// // // // // // // // export default function CreatePropertyForm() {
// // // // // // // //   const dispatch = useDispatch();
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const { loading, error } = useSelector((state) => state.property);

// // // // // // // //   const [propertyData, setPropertyData] = useState({
// // // // // // // //     propertyNumber: "",
// // // // // // // //     propertyType: "",
// // // // // // // //     licenseNumber: "",
// // // // // // // //     licenseType: "",
// // // // // // // //     space: "",
// // // // // // // //     price: "",
// // // // // // // //     description: "",
// // // // // // // //     attributes: [{ attributeName: "", value: "" }],
// // // // // // // //     location: {
// // // // // // // //       governorate: "",
// // // // // // // //       province: "",
// // // // // // // //       city: "",
// // // // // // // //       street: "",
// // // // // // // //     },
// // // // // // // //     property_photos: [],
// // // // // // // //     owner: "",
// // // // // // // //   });

// // // // // // // //   const [imagePreviews, setImagePreviews] = useState([]);
// // // // // // // //   const [errors, setErrors] = useState({});

// // // // // // // //   const validate = () => {
// // // // // // // //     const newErrors = {};

// // // // // // // //     if (!propertyData.propertyNumber) newErrors.propertyNumber = "Required";
// // // // // // // //     if (!propertyData.propertyType) newErrors.propertyType = "Required";
// // // // // // // //     if (!propertyData.licenseNumber) newErrors.licenseNumber = "Required";
// // // // // // // //     if (!propertyData.licenseType) newErrors.licenseType = "Required";
// // // // // // // //     if (!propertyData.space || Number(propertyData.space) <= 0)
// // // // // // // //       newErrors.space = "Must be a positive number";
// // // // // // // //     if (!propertyData.price || Number(propertyData.price) <= 0)
// // // // // // // //       newErrors.price = "Must be a positive number";
// // // // // // // //     if (!propertyData.description) newErrors.description = "Required";
// // // // // // // //     if (!propertyData.owner) newErrors.owner = "Required";

// // // // // // // //     Object.entries(propertyData.location).forEach(([key, value]) => {
// // // // // // // //       if (!value) newErrors[key] = "Required";
// // // // // // // //     });

// // // // // // // //     propertyData.attributes.forEach((attr, index) => {
// // // // // // // //       if (!attr.attributeName || !attr.value) {
// // // // // // // //         newErrors[`attribute-${index}`] = "Attribute name and value required";
// // // // // // // //       } else if (isNaN(attr.value) || Number(attr.value) < 0) {
// // // // // // // //         newErrors[`attribute-${index}`] = "Value must be a number ≥ 0";
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     setErrors(newErrors);
// // // // // // // //     return Object.keys(newErrors).length === 0;
// // // // // // // //   };

// // // // // // // //   const handleInputChange = (e) => {
// // // // // // // //     const { name, value } = e.target;
// // // // // // // //     setPropertyData((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       [name]: value,
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const handleAttributeChange = (index, e) => {
// // // // // // // //     const { name, value } = e.target;
// // // // // // // //     const updatedAttributes = [...propertyData.attributes];
// // // // // // // //     updatedAttributes[index][name] = value;
// // // // // // // //     setPropertyData((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       attributes: updatedAttributes,
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const handleLocationChange = (e) => {
// // // // // // // //     const { name, value } = e.target;
// // // // // // // //     setPropertyData((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       location: {
// // // // // // // //         ...prev.location,
// // // // // // // //         [name]: value,
// // // // // // // //       },
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const handleFileChange = (e) => {
// // // // // // // //     const files = Array.from(e.target.files);
// // // // // // // //     setPropertyData((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       property_photos: files,
// // // // // // // //     }));

// // // // // // // //     // Generate previews
// // // // // // // //     const previews = files.map((file) => URL.createObjectURL(file));
// // // // // // // //     setImagePreviews(previews);
// // // // // // // //   };

// // // // // // // //   const addAttribute = () => {
// // // // // // // //     setPropertyData((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       attributes: [...prev.attributes, { attributeName: "", value: "" }],
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const handleSubmit = (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     if (!validate()) return;

// // // // // // // //     dispatch(createProperty(propertyData)).then((res) => {
// // // // // // // //       if (res.meta.requestStatus === "fulfilled") {
// // // // // // // //         Swal.fire("Property Created", res.payload?.message || "Success", "success");
// // // // // // // //         navigate("/office/my-office");
// // // // // // // //       }
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <Box
// // // // // // // //       sx={{
// // // // // // // //         maxWidth: "700px",
// // // // // // // //         mx: "auto",
// // // // // // // //         p: 2,
// // // // // // // //         border: "1px solid #ddd",
// // // // // // // //         borderRadius: "12px",
// // // // // // // //       }}
// // // // // // // //     >
// // // // // // // //       <Typography variant="h5" gutterBottom>
// // // // // // // //         Create Property
// // // // // // // //       </Typography>

// // // // // // // //       <form onSubmit={handleSubmit}>
// // // // // // // //         <TextField
// // // // // // // //           name="propertyNumber"
// // // // // // // //           label="Property Number"
// // // // // // // //           value={propertyData.propertyNumber}
// // // // // // // //           onChange={handleInputChange}
// // // // // // // //           fullWidth
// // // // // // // //           sx={{ mb: 2 }}
// // // // // // // //           error={!!errors.propertyNumber}
// // // // // // // //           helperText={errors.propertyNumber}
// // // // // // // //         />
// // // // // // // //         <TextField
// // // // // // // //           name="propertyType"
// // // // // // // //           label="Property Type"
// // // // // // // //           value={propertyData.propertyType}
// // // // // // // //           onChange={handleInputChange}
// // // // // // // //           fullWidth
// // // // // // // //           sx={{ mb: 2 }}
// // // // // // // //           error={!!errors.propertyType}
// // // // // // // //           helperText={errors.propertyType}
// // // // // // // //         />
// // // // // // // //         <TextField
// // // // // // // //           name="licenseNumber"
// // // // // // // //           label="License Number"
// // // // // // // //           value={propertyData.licenseNumber}
// // // // // // // //           onChange={handleInputChange}
// // // // // // // //           fullWidth
// // // // // // // //           sx={{ mb: 2 }}
// // // // // // // //           error={!!errors.licenseNumber}
// // // // // // // //           helperText={errors.licenseNumber}
// // // // // // // //         />
// // // // // // // //         <TextField
// // // // // // // //           name="licenseType"
// // // // // // // //           label="License Type"
// // // // // // // //           value={propertyData.licenseType}
// // // // // // // //           onChange={handleInputChange}
// // // // // // // //           fullWidth
// // // // // // // //           sx={{ mb: 2 }}
// // // // // // // //           error={!!errors.licenseType}
// // // // // // // //           helperText={errors.licenseType}
// // // // // // // //         />
// // // // // // // //         <Grid container spacing={2}>
// // // // // // // //           <Grid item xs={6}>
// // // // // // // //             <TextField
// // // // // // // //               name="space"
// // // // // // // //               label="Space"
// // // // // // // //               type="number"
// // // // // // // //               value={propertyData.space}
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               fullWidth
// // // // // // // //               error={!!errors.space}
// // // // // // // //               helperText={errors.space}
// // // // // // // //             />
// // // // // // // //           </Grid>
// // // // // // // //           <Grid item xs={6}>
// // // // // // // //             <TextField
// // // // // // // //               name="price"
// // // // // // // //               label="Price"
// // // // // // // //               type="number"
// // // // // // // //               value={propertyData.price}
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               fullWidth
// // // // // // // //               error={!!errors.price}
// // // // // // // //               helperText={errors.price}
// // // // // // // //             />
// // // // // // // //           </Grid>
// // // // // // // //         </Grid>
// // // // // // // //         <TextField
// // // // // // // //           name="description"
// // // // // // // //           label="Description"
// // // // // // // //           value={propertyData.description}
// // // // // // // //           onChange={handleInputChange}
// // // // // // // //           fullWidth
// // // // // // // //           sx={{ mt: 2 }}
// // // // // // // //           error={!!errors.description}
// // // // // // // //           helperText={errors.description}
// // // // // // // //         />

// // // // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // // // //           Location
// // // // // // // //         </Typography>
// // // // // // // //         <Grid container spacing={2}>
// // // // // // // //           {["governorate", "province", "city", "street"].map((field) => (
// // // // // // // //             <Grid item xs={6} key={field}>
// // // // // // // //               <TextField
// // // // // // // //                 name={field}
// // // // // // // //                 label={field.charAt(0).toUpperCase() + field.slice(1)}
// // // // // // // //                 value={propertyData.location[field]}
// // // // // // // //                 onChange={handleLocationChange}
// // // // // // // //                 fullWidth
// // // // // // // //                 error={!!errors[field]}
// // // // // // // //                 helperText={errors[field]}
// // // // // // // //               />
// // // // // // // //             </Grid>
// // // // // // // //           ))}
// // // // // // // //         </Grid>

// // // // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // // // //           Attributes
// // // // // // // //         </Typography>
// // // // // // // //         {propertyData.attributes.map((attr, index) => (
// // // // // // // //           <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
// // // // // // // //             <Grid item xs={6}>
// // // // // // // //               <TextField
// // // // // // // //                 name="attributeName"
// // // // // // // //                 label="Attribute Name"
// // // // // // // //                 value={attr.attributeName}
// // // // // // // //                 onChange={(e) => handleAttributeChange(index, e)}
// // // // // // // //                 fullWidth
// // // // // // // //               />
// // // // // // // //             </Grid>
// // // // // // // //             <Grid item xs={6}>
// // // // // // // //               <TextField
// // // // // // // //                 name="value"
// // // // // // // //                 label="Value"
// // // // // // // //                 type="number"
// // // // // // // //                 value={attr.value}
// // // // // // // //                 onChange={(e) => handleAttributeChange(index, e)}
// // // // // // // //                 fullWidth
// // // // // // // //               />
// // // // // // // //             </Grid>
// // // // // // // //             {errors[`attribute-${index}`] && (
// // // // // // // //               <Grid item xs={12}>
// // // // // // // //                 <Typography color="error">
// // // // // // // //                   {errors[`attribute-${index}`]}
// // // // // // // //                 </Typography>
// // // // // // // //               </Grid>
// // // // // // // //             )}
// // // // // // // //           </Grid>
// // // // // // // //         ))}
// // // // // // // //         <Button onClick={addAttribute} sx={{ mb: 2 }}>
// // // // // // // //           + Add Attribute
// // // // // // // //         </Button>

// // // // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // // // //           Property Photos
// // // // // // // //         </Typography>
// // // // // // // //         <input
// // // // // // // //           type="file"
// // // // // // // //           name="property_photos"
// // // // // // // //           multiple
// // // // // // // //           accept="image/*"
// // // // // // // //           onChange={handleFileChange}
// // // // // // // //         />

// // // // // // // //         {/* Image Previews */}
// // // // // // // //         <Grid container spacing={2} sx={{ mt: 2 }}>
// // // // // // // //           {imagePreviews.map((src, idx) => (
// // // // // // // //             <Grid item xs={4} key={idx}>
// // // // // // // //               <img
// // // // // // // //                 src={src}
// // // // // // // //                 alt={`preview-${idx}`}
// // // // // // // //                 style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
// // // // // // // //               />
// // // // // // // //             </Grid>
// // // // // // // //           ))}
// // // // // // // //         </Grid>

// // // // // // // //         <Box mt={"2%"}>
// // // // // // // //           <TextField
// // // // // // // //             name="owner"
// // // // // // // //             label="Owner"
// // // // // // // //             value={propertyData.owner}
// // // // // // // //             onChange={handleInputChange}
// // // // // // // //             fullWidth
// // // // // // // //             sx={{ mb: 2 }}
// // // // // // // //             error={!!errors.owner}
// // // // // // // //             helperText={errors.owner}
// // // // // // // //           />
// // // // // // // //         </Box>

// // // // // // // //         {error && (
// // // // // // // //           <Typography color="error" sx={{ mt: 2 }}>
// // // // // // // //             {error.message || "Something went wrong"}
// // // // // // // //           </Typography>
// // // // // // // //         )}

// // // // // // // //         <Button
// // // // // // // //           type="submit"
// // // // // // // //           variant="contained"
// // // // // // // //           sx={{ mt: 3 }}
// // // // // // // //           disabled={loading}
// // // // // // // //           onClick={handleSubmit}
// // // // // // // //         >
// // // // // // // //           {loading ? <CircularProgress size={20} /> : "Create Property"}
// // // // // // // //         </Button>
// // // // // // // //       </form>
// // // // // // // //     </Box>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // // // import { createProperty } from "../../redux/property/propertySlice";
// // // // // // // // import {
// // // // // // // //   fetchPropertyTypes, // Import the new action
// // // // // // // // } from "../../redux/property type/propertyTypeSlice"; // Adjust path as needed
// // // // // // // // import {
// // // // // // // //   TextField,
// // // // // // // //   Button,
// // // // // // // //   Box,
// // // // // // // //   Grid,
// // // // // // // //   Typography,
// // // // // // // //   CircularProgress,
// // // // // // // //   Select, // Import Select
// // // // // // // //   MenuItem, // Import MenuItem
// // // // // // // //   FormControl, // Import FormControl
// // // // // // // //   InputLabel, // Import InputLabel
// // // // // // // // } from "@mui/material";
// // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // import Swal from "sweetalert2";

// // // // // // // // export default function CreatePropertyForm() {
// // // // // // // //   const dispatch = useDispatch();
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   // Access both property and propertyType slices from the store
// // // // // // // //   const { loading, error } = useSelector((state) => state.property);
// // // // // // // //   const { propertyTypes } = useSelector((state) => state.propertyType);

// // // // // // // //   const [propertyData, setPropertyData] = useState({
// // // // // // // //     propertyNumber: "",
// // // // // // // //     propertyType: "",
// // // // // // // //     licenseNumber: "",
// // // // // // // //     licenseType: "",
// // // // // // // //     space: "",
// // // // // // // //     price: "",
// // // // // // // //     description: "",
// // // // // // // //     attributes: [{ attributeName: "", value: "" }],
// // // // // // // //     location: {
// // // // // // // //       governorate: "",
// // // // // // // //       province: "",
// // // // // // // //       city: "",
// // // // // // // //       street: "",
// // // // // // // //     },
// // // // // // // //     property_photos: [],
// // // // // // // //     owner: "",
// // // // // // // //   });

// // // // // // // //   const [imagePreviews, setImagePreviews] = useState([]);
// // // // // // // //   const [errors, setErrors] = useState({});

// // // // // // // //   useEffect(() => {
// // // // // // // //     // Dispatch the new action to fetch property types when the component mounts
// // // // // // // //     dispatch(fetchPropertyTypes());
// // // // // // // //   }, [dispatch]);

// // // // // // // //   // ... (rest of the component's state and functions remain the same)
// // // // // // // //   const validate = () => {
// // // // // // // //     const newErrors = {};

// // // // // // // //     if (!propertyData.propertyNumber) newErrors.propertyNumber = "Required";
// // // // // // // //     // Check if propertyType is selected
// // // // // // // //     if (!propertyData.propertyType) newErrors.propertyType = "Required";
// // // // // // // //     if (!propertyData.licenseNumber) newErrors.licenseNumber = "Required";
// // // // // // // //     if (!propertyData.licenseType) newErrors.licenseType = "Required";
// // // // // // // //     if (!propertyData.space || Number(propertyData.space) <= 0)
// // // // // // // //       newErrors.space = "Must be a positive number";
// // // // // // // //     if (!propertyData.price || Number(propertyData.price) <= 0)
// // // // // // // //       newErrors.price = "Must be a positive number";
// // // // // // // //     if (!propertyData.description) newErrors.description = "Required";
// // // // // // // //     if (!propertyData.owner) newErrors.owner = "Required";

// // // // // // // //     Object.entries(propertyData.location).forEach(([key, value]) => {
// // // // // // // //       if (!value) newErrors[key] = "Required";
// // // // // // // //     });

// // // // // // // //     propertyData.attributes.forEach((attr, index) => {
// // // // // // // //       if (!attr.attributeName || !attr.value) {
// // // // // // // //         newErrors[`attribute-${index}`] = "Attribute name and value required";
// // // // // // // //       } else if (isNaN(attr.value) || Number(attr.value) < 0) {
// // // // // // // //         newErrors[`attribute-${index}`] = "Value must be a number ≥ 0";
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     setErrors(newErrors);
// // // // // // // //     return Object.keys(newErrors).length === 0;
// // // // // // // //   };

// // // // // // // //   const handleInputChange = (e) => {
// // // // // // // //     const { name, value } = e.target;
// // // // // // // //     setPropertyData((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       [name]: value,
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const handleAttributeChange = (index, e) => {
// // // // // // // //     const { name, value } = e.target;
// // // // // // // //     const updatedAttributes = [...propertyData.attributes];
// // // // // // // //     updatedAttributes[index][name] = value;
// // // // // // // //     setPropertyData((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       attributes: updatedAttributes,
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const handleLocationChange = (e) => {
// // // // // // // //     const { name, value } = e.target;
// // // // // // // //     setPropertyData((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       location: {
// // // // // // // //         ...prev.location,
// // // // // // // //         [name]: value,
// // // // // // // //       },
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const handleFileChange = (e) => {
// // // // // // // //     const files = Array.from(e.target.files);
// // // // // // // //     setPropertyData((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       property_photos: files,
// // // // // // // //     }));

// // // // // // // //     const previews = files.map((file) => URL.createObjectURL(file));
// // // // // // // //     setImagePreviews(previews);
// // // // // // // //   };

// // // // // // // //   const addAttribute = () => {
// // // // // // // //     setPropertyData((prev) => ({
// // // // // // // //       ...prev,
// // // // // // // //       attributes: [...prev.attributes, { attributeName: "", value: "" }],
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const handleSubmit = (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     if (!validate()) return;

// // // // // // // //     dispatch(createProperty(propertyData)).then((res) => {
// // // // // // // //       if (res.meta.requestStatus === "fulfilled") {
// // // // // // // //         Swal.fire("Property Created", res.payload?.message || "Success", "success");
// // // // // // // //         navigate("/office/my-office");
// // // // // // // //       }
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   // Replace the existing TextField for propertyType with the following:
// // // // // // // //   return (
// // // // // // // //     <Box
// // // // // // // //       sx={{
// // // // // // // //         maxWidth: "700px",
// // // // // // // //         mx: "auto",
// // // // // // // //         p: 2,
// // // // // // // //         border: "1px solid #ddd",
// // // // // // // //         borderRadius: "12px",
// // // // // // // //       }}
// // // // // // // //     >
// // // // // // // //       <Typography variant="h5" gutterBottom>
// // // // // // // //         Create Property
// // // // // // // //       </Typography>
// // // // // // // //       <form onSubmit={handleSubmit}>
// // // // // // // //         {/* ... (other TextFields remain the same) */}
// // // // // // // //         <TextField
// // // // // // // //           name="propertyNumber"
// // // // // // // //           label="Property Number"
// // // // // // // //           value={propertyData.propertyNumber}
// // // // // // // //           onChange={handleInputChange}
// // // // // // // //           fullWidth
// // // // // // // //           sx={{ mb: 2 }}
// // // // // // // //           error={!!errors.propertyNumber}
// // // // // // // //           helperText={errors.propertyNumber}
// // // // // // // //         />
// // // // // // // //         <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.propertyType}>
// // // // // // // //           <InputLabel>Property Type</InputLabel>
// // // // // // // //           <Select
// // // // // // // //             name="propertyType"
// // // // // // // //             value={propertyData.propertyType}
// // // // // // // //             onChange={handleInputChange}
// // // // // // // //             label="Property Type"
// // // // // // // //             MenuProps={{
// // // // // // // //               PaperProps: {
// // // // // // // //                 style: {
// // // // // // // //                   maxHeight: 200, // This sets the max height for the scrollbar
// // // // // // // //                 },
// // // // // // // //               },
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             {propertyTypes.map((type) => (
// // // // // // // //               <MenuItem key={type.id} value={type.name}>
// // // // // // // //                 {type.name}
// // // // // // // //               </MenuItem>
// // // // // // // //             ))}
// // // // // // // //           </Select>
// // // // // // // //           {!!errors.propertyType && (
// // // // // // // //             <Typography variant="caption" color="error">
// // // // // // // //               {errors.propertyType}
// // // // // // // //             </Typography>
// // // // // // // //           )}
// // // // // // // //         </FormControl>
// // // // // // // //         <TextField
// // // // // // // //           name="licenseNumber"
// // // // // // // //           label="License Number"
// // // // // // // //           value={propertyData.licenseNumber}
// // // // // // // //           onChange={handleInputChange}
// // // // // // // //           fullWidth
// // // // // // // //           sx={{ mb: 2 }}
// // // // // // // //           error={!!errors.licenseNumber}
// // // // // // // //           helperText={errors.licenseNumber}
// // // // // // // //         />
// // // // // // // //         <TextField
// // // // // // // //           name="licenseType"
// // // // // // // //           label="License Type"
// // // // // // // //           value={propertyData.licenseType}
// // // // // // // //           onChange={handleInputChange}
// // // // // // // //           fullWidth
// // // // // // // //           sx={{ mb: 2 }}
// // // // // // // //           error={!!errors.licenseType}
// // // // // // // //           helperText={errors.licenseType}
// // // // // // // //         />
// // // // // // // //         <Grid container spacing={2}>
// // // // // // // //           <Grid item xs={6}>
// // // // // // // //             <TextField
// // // // // // // //               name="space"
// // // // // // // //               label="Space"
// // // // // // // //               type="number"
// // // // // // // //               value={propertyData.space}
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               fullWidth
// // // // // // // //               error={!!errors.space}
// // // // // // // //               helperText={errors.space}
// // // // // // // //             />
// // // // // // // //           </Grid>
// // // // // // // //           <Grid item xs={6}>
// // // // // // // //             <TextField
// // // // // // // //               name="price"
// // // // // // // //               label="Price"
// // // // // // // //               type="number"
// // // // // // // //               value={propertyData.price}
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               fullWidth
// // // // // // // //               error={!!errors.price}
// // // // // // // //               helperText={errors.price}
// // // // // // // //             />
// // // // // // // //           </Grid>
// // // // // // // //         </Grid>
// // // // // // // //         <TextField
// // // // // // // //           name="description"
// // // // // // // //           label="Description"
// // // // // // // //           value={propertyData.description}
// // // // // // // //           onChange={handleInputChange}
// // // // // // // //           fullWidth
// // // // // // // //           sx={{ mt: 2 }}
// // // // // // // //           error={!!errors.description}
// // // // // // // //           helperText={errors.description}
// // // // // // // //         />

// // // // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // // // //           Location
// // // // // // // //         </Typography>
// // // // // // // //         <Grid container spacing={2}>
// // // // // // // //           {["governorate", "province", "city", "street"].map((field) => (
// // // // // // // //             <Grid item xs={6} key={field}>
// // // // // // // //               <TextField
// // // // // // // //                 name={field}
// // // // // // // //                 label={field.charAt(0).toUpperCase() + field.slice(1)}
// // // // // // // //                 value={propertyData.location[field]}
// // // // // // // //                 onChange={handleLocationChange}
// // // // // // // //                 fullWidth
// // // // // // // //                 error={!!errors[field]}
// // // // // // // //                 helperText={errors[field]}
// // // // // // // //               />
// // // // // // // //             </Grid>
// // // // // // // //           ))}
// // // // // // // //         </Grid>

// // // // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // // // //           Attributes
// // // // // // // //         </Typography>
// // // // // // // //         {propertyData.attributes.map((attr, index) => (
// // // // // // // //           <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
// // // // // // // //             <Grid item xs={6}>
// // // // // // // //               <TextField
// // // // // // // //                 name="attributeName"
// // // // // // // //                 label="Attribute Name"
// // // // // // // //                 value={attr.attributeName}
// // // // // // // //                 onChange={(e) => handleAttributeChange(index, e)}
// // // // // // // //                 fullWidth
// // // // // // // //               />
// // // // // // // //             </Grid>
// // // // // // // //             <Grid item xs={6}>
// // // // // // // //               <TextField
// // // // // // // //                 name="value"
// // // // // // // //                 label="Value"
// // // // // // // //                 type="number"
// // // // // // // //                 value={attr.value}
// // // // // // // //                 onChange={(e) => handleAttributeChange(index, e)}
// // // // // // // //                 fullWidth
// // // // // // // //               />
// // // // // // // //             </Grid>
// // // // // // // //             {errors[`attribute-${index}`] && (
// // // // // // // //               <Grid item xs={12}>
// // // // // // // //                 <Typography color="error">
// // // // // // // //                   {errors[`attribute-${index}`]}
// // // // // // // //                 </Typography>
// // // // // // // //               </Grid>
// // // // // // // //             )}
// // // // // // // //           </Grid>
// // // // // // // //         ))}
// // // // // // // //         <Button onClick={addAttribute} sx={{ mb: 2 }}>
// // // // // // // //           + Add Attribute
// // // // // // // //         </Button>

// // // // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // // // //           Property Photos
// // // // // // // //         </Typography>
// // // // // // // //         <input
// // // // // // // //           type="file"
// // // // // // // //           name="property_photos"
// // // // // // // //           multiple
// // // // // // // //           accept="image/*"
// // // // // // // //           onChange={handleFileChange}
// // // // // // // //         />

// // // // // // // //         <Grid container spacing={2} sx={{ mt: 2 }}>
// // // // // // // //           {imagePreviews.map((src, idx) => (
// // // // // // // //             <Grid item xs={4} key={idx}>
// // // // // // // //               <img
// // // // // // // //                 src={src}
// // // // // // // //                 alt={`preview-${idx}`}
// // // // // // // //                 style={{
// // // // // // // //                   width: "100%",
// // // // // // // //                   height: "150px",
// // // // // // // //                   objectFit: "cover",
// // // // // // // //                   borderRadius: "8px",
// // // // // // // //                 }}
// // // // // // // //               />
// // // // // // // //             </Grid>
// // // // // // // //           ))}
// // // // // // // //         </Grid>

// // // // // // // //         <Box mt={"2%"}>
// // // // // // // //           <TextField
// // // // // // // //             name="owner"
// // // // // // // //             label="Owner"
// // // // // // // //             value={propertyData.owner}
// // // // // // // //             onChange={handleInputChange}
// // // // // // // //             fullWidth
// // // // // // // //             sx={{ mb: 2 }}
// // // // // // // //             error={!!errors.owner}
// // // // // // // //             helperText={errors.owner}
// // // // // // // //           />
// // // // // // // //         </Box>

// // // // // // // //         {error && (
// // // // // // // //           <Typography color="error" sx={{ mt: 2 }}>
// // // // // // // //             {error.message || "Something went wrong"}
// // // // // // // //           </Typography>
// // // // // // // //         )}

// // // // // // // //         <Button
// // // // // // // //           type="submit"
// // // // // // // //           variant="contained"
// // // // // // // //           sx={{ mt: 3 }}
// // // // // // // //           disabled={loading}
// // // // // // // //           onClick={handleSubmit}
// // // // // // // //         >
// // // // // // // //           {loading ? <CircularProgress size={20} /> : "Create Property"}
// // // // // // // //         </Button>
// // // // // // // //       </form>
// // // // // // // //     </Box>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // // import { createProperty } from "../../redux/property/propertySlice";
// // // // // // // import { fetchPropertyTypes } from "../../redux/property type/propertyTypeSlice";
// // // // // // // import {
// // // // // // //   TextField,
// // // // // // //   Button,
// // // // // // //   Box,
// // // // // // //   Grid,
// // // // // // //   Typography,
// // // // // // //   CircularProgress,
// // // // // // //   Select,
// // // // // // //   MenuItem,
// // // // // // //   FormControl,
// // // // // // //   InputLabel,
// // // // // // //   FormHelperText,
// // // // // // //   IconButton,
// // // // // // // } from "@mui/material";
// // // // // // // import DeleteIcon from '@mui/icons-material/Delete';
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import Swal from "sweetalert2";

// // // // // // // export default function CreatePropertyForm() {
// // // // // // //   const dispatch = useDispatch();
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const { loading, error } = useSelector((state) => state.property);
// // // // // // //   const { propertyTypes } = useSelector((state) => state.propertyType);

// // // // // // //   const [propertyData, setPropertyData] = useState({
// // // // // // //     propertyNumber: "",
// // // // // // //     propertyType: "",
// // // // // // //     licenseNumber: "",
// // // // // // //     licenseType: "",
// // // // // // //     space: "",
// // // // // // //     price: "",
// // // // // // //     description: "",
// // // // // // //     attributes: [], // Start with an empty array of attributes
// // // // // // //     location: {
// // // // // // //       governorate: "",
// // // // // // //       province: "",
// // // // // // //       city: "",
// // // // // // //       street: "",
// // // // // // //     },
// // // // // // //     property_photos: [],
// // // // // // //     owner: "",
// // // // // // //   });

// // // // // // //   const [imagePreviews, setImagePreviews] = useState([]);
// // // // // // //   const [errors, setErrors] = useState({});

// // // // // // //   // Get the selected property type object to access its attributes
// // // // // // //   const selectedPropertyType = propertyTypes.find(
// // // // // // //     (type) => type.id === propertyData.propertyType
// // // // // // //   );
// // // // // // //   const allowedAttributes = selectedPropertyType
// // // // // // //     ? selectedPropertyType.attributes.map((pta) => pta.attribute)
// // // // // // //     : [];

// // // // // // //   useEffect(() => {
// // // // // // //     dispatch(fetchPropertyTypes());
// // // // // // //   }, [dispatch]);

// // // // // // //   const validate = () => {
// // // // // // //     const newErrors = {};

// // // // // // //     if (!propertyData.propertyNumber) newErrors.propertyNumber = "Required";
// // // // // // //     if (!propertyData.propertyType) newErrors.propertyType = "Required";
// // // // // // //     // ... (rest of the validation logic remains similar)
// // // // // // //     if (!propertyData.licenseNumber) newErrors.licenseNumber = "Required";
// // // // // // //     if (!propertyData.licenseType) newErrors.licenseType = "Required";
// // // // // // //     if (!propertyData.space || Number(propertyData.space) <= 0)
// // // // // // //       newErrors.space = "Must be a positive number";
// // // // // // //     if (!propertyData.price || Number(propertyData.price) <= 0)
// // // // // // //       newErrors.price = "Must be a positive number";
// // // // // // //     if (!propertyData.description) newErrors.description = "Required";
// // // // // // //     if (!propertyData.owner) newErrors.owner = "Required";

// // // // // // //     Object.entries(propertyData.location).forEach(([key, value]) => {
// // // // // // //       if (!value) newErrors[key] = "Required";
// // // // // // //     });

// // // // // // //     propertyData.attributes.forEach((attr, index) => {
// // // // // // //       if (!attr.attributeName || !attr.value) {
// // // // // // //         newErrors[`attribute-${index}`] = "Attribute name and value required";
// // // // // // //       } else if (isNaN(attr.value) || Number(attr.value) < 0) {
// // // // // // //         newErrors[`attribute-${index}`] = "Value must be a number ≥ 0";
// // // // // // //       }
// // // // // // //     });

// // // // // // //     setErrors(newErrors);
// // // // // // //     return Object.keys(newErrors).length === 0;
// // // // // // //   };

// // // // // // //   const handleInputChange = (e) => {
// // // // // // //     const { name, value } = e.target;
// // // // // // //     setPropertyData((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       [name]: value,
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const handlePropertyTypeChange = (e) => {
// // // // // // //     const { value } = e.target;
// // // // // // //     // Reset attributes when a new property type is selected
// // // // // // //     setPropertyData((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       propertyType: value,
// // // // // // //       attributes: [],
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const handleAttributeChange = (index, e) => {
// // // // // // //     const { name, value } = e.target;
// // // // // // //     const updatedAttributes = [...propertyData.attributes];
// // // // // // //     updatedAttributes[index][name] = value;
// // // // // // //     setPropertyData((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       attributes: updatedAttributes,
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const handleLocationChange = (e) => {
// // // // // // //     const { name, value } = e.target;
// // // // // // //     setPropertyData((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       location: {
// // // // // // //         ...prev.location,
// // // // // // //         [name]: value,
// // // // // // //       },
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const handleFileChange = (e) => {
// // // // // // //     const files = Array.from(e.target.files);
// // // // // // //     setPropertyData((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       property_photos: files,
// // // // // // //     }));

// // // // // // //     const previews = files.map((file) => URL.createObjectURL(file));
// // // // // // //     setImagePreviews(previews);
// // // // // // //   };

// // // // // // //   const addAttribute = () => {
// // // // // // //     setPropertyData((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       attributes: [...prev.attributes, { attributeName: "", value: "" }],
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const removeAttribute = (index) => {
// // // // // // //     setPropertyData((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       attributes: prev.attributes.filter((_, i) => i !== index),
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const handleSubmit = (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     if (!validate()) return;

// // // // // // //     dispatch(createProperty(propertyData)).then((res) => {
// // // // // // //       if (res.meta.requestStatus === "fulfilled") {
// // // // // // //         Swal.fire("Property Created", res.payload?.message || "Success", "success");
// // // // // // //         navigate("/office/my-office");
// // // // // // //       }
// // // // // // //     });
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Box
// // // // // // //       sx={{
// // // // // // //         maxWidth: "700px",
// // // // // // //         mx: "auto",
// // // // // // //         p: 2,
// // // // // // //         border: "1px solid #ddd",
// // // // // // //         borderRadius: "12px",
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       <Typography variant="h5" gutterBottom>
// // // // // // //         Create Property
// // // // // // //       </Typography>
// // // // // // //       <form onSubmit={handleSubmit}>
// // // // // // //         <TextField
// // // // // // //           name="propertyNumber"
// // // // // // //           label="Property Number"
// // // // // // //           value={propertyData.propertyNumber}
// // // // // // //           onChange={handleInputChange}
// // // // // // //           fullWidth
// // // // // // //           sx={{ mb: 2 }}
// // // // // // //           error={!!errors.propertyNumber}
// // // // // // //           helperText={errors.propertyNumber}
// // // // // // //         />
// // // // // // //         <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.propertyType}>
// // // // // // //           <InputLabel>Property Type</InputLabel>
// // // // // // //           <Select
// // // // // // //             name="propertyType"
// // // // // // //             value={propertyData.propertyType}
// // // // // // //             onChange={handlePropertyTypeChange} // Use the new handler
// // // // // // //             label="Property Type"
// // // // // // //             MenuProps={{
// // // // // // //               PaperProps: {
// // // // // // //                 style: {
// // // // // // //                   maxHeight: 200,
// // // // // // //                 },
// // // // // // //               },
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             {propertyTypes.map((type) => (
// // // // // // //               <MenuItem key={type.id} value={type.id}>
// // // // // // //                 {type.name}
// // // // // // //               </MenuItem>
// // // // // // //             ))}
// // // // // // //           </Select>
// // // // // // //           {!!errors.propertyType && <FormHelperText>{errors.propertyType}</FormHelperText>}
// // // // // // //         </FormControl>

// // // // // // //         <TextField
// // // // // // //           name="licenseNumber"
// // // // // // //           label="License Number"
// // // // // // //           value={propertyData.licenseNumber}
// // // // // // //           onChange={handleInputChange}
// // // // // // //           fullWidth
// // // // // // //           sx={{ mb: 2 }}
// // // // // // //           error={!!errors.licenseNumber}
// // // // // // //           helperText={errors.licenseNumber}
// // // // // // //         />
// // // // // // //         <TextField
// // // // // // //           name="licenseType"
// // // // // // //           label="License Type"
// // // // // // //           value={propertyData.licenseType}
// // // // // // //           onChange={handleInputChange}
// // // // // // //           fullWidth
// // // // // // //           sx={{ mb: 2 }}
// // // // // // //           error={!!errors.licenseType}
// // // // // // //           helperText={errors.licenseType}
// // // // // // //         />
// // // // // // //         <Grid container spacing={2}>
// // // // // // //           <Grid item xs={6}>
// // // // // // //             <TextField
// // // // // // //               name="space"
// // // // // // //               label="Space"
// // // // // // //               type="number"
// // // // // // //               value={propertyData.space}
// // // // // // //               onChange={handleInputChange}
// // // // // // //               fullWidth
// // // // // // //               error={!!errors.space}
// // // // // // //               helperText={errors.space}
// // // // // // //             />
// // // // // // //           </Grid>
// // // // // // //           <Grid item xs={6}>
// // // // // // //             <TextField
// // // // // // //               name="price"
// // // // // // //               label="Price"
// // // // // // //               type="number"
// // // // // // //               value={propertyData.price}
// // // // // // //               onChange={handleInputChange}
// // // // // // //               fullWidth
// // // // // // //               error={!!errors.price}
// // // // // // //               helperText={errors.price}
// // // // // // //             />
// // // // // // //           </Grid>
// // // // // // //         </Grid>
// // // // // // //         <TextField
// // // // // // //           name="description"
// // // // // // //           label="Description"
// // // // // // //           value={propertyData.description}
// // // // // // //           onChange={handleInputChange}
// // // // // // //           fullWidth
// // // // // // //           sx={{ mt: 2 }}
// // // // // // //           error={!!errors.description}
// // // // // // //           helperText={errors.description}
// // // // // // //         />

// // // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // // //           Location
// // // // // // //         </Typography>
// // // // // // //         <Grid container spacing={2}>
// // // // // // //           {["governorate", "province", "city", "street"].map((field) => (
// // // // // // //             <Grid item xs={6} key={field}>
// // // // // // //               <TextField
// // // // // // //                 name={field}
// // // // // // //                 label={field.charAt(0).toUpperCase() + field.slice(1)}
// // // // // // //                 value={propertyData.location[field]}
// // // // // // //                 onChange={handleLocationChange}
// // // // // // //                 fullWidth
// // // // // // //                 error={!!errors[field]}
// // // // // // //                 helperText={errors[field]}
// // // // // // //               />
// // // // // // //             </Grid>
// // // // // // //           ))}
// // // // // // //         </Grid>

// // // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // // //           Attributes
// // // // // // //         </Typography>
// // // // // // //         {propertyData.attributes.map((attr, index) => (
// // // // // // //           <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
// // // // // // //             <Grid item xs={5}>
// // // // // // //               <FormControl fullWidth>
// // // // // // //                 <InputLabel>Attribute Name</InputLabel>
// // // // // // //                 <Select
// // // // // // //                   name="attributeName"
// // // // // // //                   value={attr.attributeName}
// // // // // // //                   onChange={(e) => handleAttributeChange(index, e)}
// // // // // // //                   label="Attribute Name"
// // // // // // //                 >
// // // // // // //                   {allowedAttributes.map((allowedAttr) => (
// // // // // // //                     <MenuItem key={allowedAttr.id} value={allowedAttr.name}>
// // // // // // //                       {allowedAttr.name}
// // // // // // //                     </MenuItem>
// // // // // // //                   ))}
// // // // // // //                 </Select>
// // // // // // //               </FormControl>
// // // // // // //             </Grid>
// // // // // // //             <Grid item xs={5}>
// // // // // // //               <TextField
// // // // // // //                 name="value"
// // // // // // //                 label="Value"
// // // // // // //                 type="number"
// // // // // // //                 value={attr.value}
// // // // // // //                 onChange={(e) => handleAttributeChange(index, e)}
// // // // // // //                 fullWidth
// // // // // // //               />
// // // // // // //             </Grid>
// // // // // // //             <Grid item xs={2}>
// // // // // // //               <IconButton onClick={() => removeAttribute(index)} color="error">
// // // // // // //                 <DeleteIcon />
// // // // // // //               </IconButton>
// // // // // // //             </Grid>
// // // // // // //             {errors[`attribute-${index}`] && (
// // // // // // //               <Grid item xs={12}>
// // // // // // //                 <Typography color="error">
// // // // // // //                   {errors[`attribute-${index}`]}
// // // // // // //                 </Typography>
// // // // // // //               </Grid>
// // // // // // //             )}
// // // // // // //           </Grid>
// // // // // // //         ))}
// // // // // // //         {propertyData.propertyType && (
// // // // // // //           <Button onClick={addAttribute} sx={{ mb: 2 }}>
// // // // // // //             + Add Attribute
// // // // // // //           </Button>
// // // // // // //         )}

// // // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // // //           Property Photos
// // // // // // //         </Typography>
// // // // // // //         <input
// // // // // // //           type="file"
// // // // // // //           name="property_photos"
// // // // // // //           multiple
// // // // // // //           accept="image/*"
// // // // // // //           onChange={handleFileChange}
// // // // // // //         />

// // // // // // //         <Grid container spacing={2} sx={{ mt: 2 }}>
// // // // // // //           {imagePreviews.map((src, idx) => (
// // // // // // //             <Grid item xs={4} key={idx}>
// // // // // // //               <img
// // // // // // //                 src={src}
// // // // // // //                 alt={`preview-${idx}`}
// // // // // // //                 style={{
// // // // // // //                   width: "100%",
// // // // // // //                   height: "150px",
// // // // // // //                   objectFit: "cover",
// // // // // // //                   borderRadius: "8px",
// // // // // // //                 }}
// // // // // // //               />
// // // // // // //             </Grid>
// // // // // // //           ))}
// // // // // // //         </Grid>

// // // // // // //         <Box mt={"2%"}>
// // // // // // //           <TextField
// // // // // // //             name="owner"
// // // // // // //             label="Owner"
// // // // // // //             value={propertyData.owner}
// // // // // // //             onChange={handleInputChange}
// // // // // // //             fullWidth
// // // // // // //             sx={{ mb: 2 }}
// // // // // // //             error={!!errors.owner}
// // // // // // //             helperText={errors.owner}
// // // // // // //           />
// // // // // // //         </Box>

// // // // // // //         {error && (
// // // // // // //           <Typography color="error" sx={{ mt: 2 }}>
// // // // // // //             {error.message || "Something went wrong"}
// // // // // // //           </Typography>
// // // // // // //         )}

// // // // // // //         <Button
// // // // // // //           type="submit"
// // // // // // //           variant="contained"
// // // // // // //           sx={{ mt: 3 }}
// // // // // // //           disabled={loading}
// // // // // // //           onClick={handleSubmit}
// // // // // // //         >
// // // // // // //           {loading ? <CircularProgress size={20} /> : "Create Property"}
// // // // // // //         </Button>
// // // // // // //       </form>
// // // // // // //     </Box>
// // // // // // //   );
// // // // // // // }

// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // import { createProperty } from "../../redux/property/propertySlice";
// // // // // // import { fetchPropertyTypes } from "../../redux/property type/propertyTypeSlice";
// // // // // // import { fetchLicenseTypes } from "../../redux/license type/licenseTypeSlice"; // Import the new action
// // // // // // import {
// // // // // //   TextField,
// // // // // //   Button,
// // // // // //   Box,
// // // // // //   Grid,
// // // // // //   Typography,
// // // // // //   CircularProgress,
// // // // // //   Select,
// // // // // //   MenuItem,
// // // // // //   FormControl,
// // // // // //   InputLabel,
// // // // // //   FormHelperText,
// // // // // //   IconButton,
// // // // // // } from "@mui/material";
// // // // // // import DeleteIcon from "@mui/icons-material/Delete";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import Swal from "sweetalert2";

// // // // // // export default function CreatePropertyForm() {
// // // // // //   const dispatch = useDispatch();
// // // // // //   const navigate = useNavigate();

// // // // // //   const { loading, error } = useSelector((state) => state.property);
// // // // // //   const { propertyTypes } = useSelector((state) => state.propertyType);
// // // // // //   const { licenseTypes } = useSelector((state) => state.licenseType); // Select license types from the store

// // // // // //   const [propertyData, setPropertyData] = useState({
// // // // // //     propertyNumber: "",
// // // // // //     propertyType: "",
// // // // // //     licenseNumber: "",
// // // // // //     licenseType: "", // This will now hold the ID of the selected license type
// // // // // //     space: "",
// // // // // //     price: "",
// // // // // //     description: "",
// // // // // //     attributes: [],
// // // // // //     location: {
// // // // // //       governorate: "",
// // // // // //       province: "",
// // // // // //       city: "",
// // // // // //       street: "",
// // // // // //     },
// // // // // //     property_photos: [],
// // // // // //     owner: "",
// // // // // //   });

// // // // // //   const [imagePreviews, setImagePreviews] = useState([]);
// // // // // //   const [errors, setErrors] = useState({});

// // // // // //   const selectedPropertyType = propertyTypes.find(
// // // // // //     (type) => type.id === propertyData.propertyType
// // // // // //   );
// // // // // //   const allowedAttributes = selectedPropertyType
// // // // // //     ? selectedPropertyType.attributes.map((pta) => pta.attribute)
// // // // // //     : [];

// // // // // //   useEffect(() => {
// // // // // //     dispatch(fetchPropertyTypes());
// // // // // //     dispatch(fetchLicenseTypes()); // Dispatch the new action to fetch license types
// // // // // //   }, [dispatch]);

// // // // // //   const validate = () => {
// // // // // //     const newErrors = {};

// // // // // //     if (!propertyData.propertyNumber) newErrors.propertyNumber = "Required";
// // // // // //     if (!propertyData.propertyType) newErrors.propertyType = "Required";
// // // // // //     if (!propertyData.licenseNumber) newErrors.licenseNumber = "Required";
// // // // // //     if (!propertyData.licenseType) newErrors.licenseType = "Required"; // Validation for the new select field
// // // // // //     if (!propertyData.space || Number(propertyData.space) <= 0)
// // // // // //       newErrors.space = "Must be a positive number";
// // // // // //     if (!propertyData.price || Number(propertyData.price) <= 0)
// // // // // //       newErrors.price = "Must be a positive number";
// // // // // //     if (!propertyData.description) newErrors.description = "Required";
// // // // // //     if (!propertyData.owner) newErrors.owner = "Required";

// // // // // //     Object.entries(propertyData.location).forEach(([key, value]) => {
// // // // // //       if (!value) newErrors[key] = "Required";
// // // // // //     });

// // // // // //     propertyData.attributes.forEach((attr, index) => {
// // // // // //       if (!attr.attributeName || !attr.value) {
// // // // // //         newErrors[`attribute-${index}`] = "Attribute name and value required";
// // // // // //       } else if (isNaN(attr.value) || Number(attr.value) < 0) {
// // // // // //         newErrors[`attribute-${index}`] = "Value must be a number ≥ 0";
// // // // // //       }
// // // // // //     });

// // // // // //     setErrors(newErrors);
// // // // // //     return Object.keys(newErrors).length === 0;
// // // // // //   };

// // // // // //   const handleInputChange = (e) => {
// // // // // //     const { name, value } = e.target;
// // // // // //     setPropertyData((prev) => ({
// // // // // //       ...prev,
// // // // // //       [name]: value,
// // // // // //     }));
// // // // // //   };

// // // // // //   const handlePropertyTypeChange = (e) => {
// // // // // //     const { value } = e.target;
// // // // // //     setPropertyData((prev) => ({
// // // // // //       ...prev,
// // // // // //       propertyType: value,
// // // // // //       attributes: [],
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleAttributeChange = (index, e) => {
// // // // // //     const { name, value } = e.target;
// // // // // //     const updatedAttributes = [...propertyData.attributes];
// // // // // //     updatedAttributes[index][name] = value;
// // // // // //     setPropertyData((prev) => ({
// // // // // //       ...prev,
// // // // // //       attributes: updatedAttributes,
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleLocationChange = (e) => {
// // // // // //     const { name, value } = e.target;
// // // // // //     setPropertyData((prev) => ({
// // // // // //       ...prev,
// // // // // //       location: {
// // // // // //         ...prev.location,
// // // // // //         [name]: value,
// // // // // //       },
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleFileChange = (e) => {
// // // // // //     const files = Array.from(e.target.files);
// // // // // //     setPropertyData((prev) => ({
// // // // // //       ...prev,
// // // // // //       property_photos: files,
// // // // // //     }));

// // // // // //     const previews = files.map((file) => URL.createObjectURL(file));
// // // // // //     setImagePreviews(previews);
// // // // // //   };

// // // // // //   const addAttribute = () => {
// // // // // //     setPropertyData((prev) => ({
// // // // // //       ...prev,
// // // // // //       attributes: [...prev.attributes, { attributeName: "", value: "" }],
// // // // // //     }));
// // // // // //   };

// // // // // //   const removeAttribute = (index) => {
// // // // // //     setPropertyData((prev) => ({
// // // // // //       ...prev,
// // // // // //       attributes: prev.attributes.filter((_, i) => i !== index),
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleSubmit = (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (!validate()) return;

// // // // // //     dispatch(createProperty(propertyData)).then((res) => {
// // // // // //       if (res.meta.requestStatus === "fulfilled") {
// // // // // //         Swal.fire("Property Created", res.payload?.message || "Success", "success");
// // // // // //         navigate("/office/my-office");
// // // // // //       }
// // // // // //     });
// // // // // //   };

// // // // // //   return (
// // // // // //     <Box
// // // // // //       sx={{
// // // // // //         maxWidth: "700px",
// // // // // //         mx: "auto",
// // // // // //         p: 2,
// // // // // //         border: "1px solid #ddd",
// // // // // //         borderRadius: "12px",
// // // // // //       }}
// // // // // //     >
// // // // // //       <Typography variant="h5" gutterBottom>
// // // // // //         Create Property
// // // // // //       </Typography>
// // // // // //       <form onSubmit={handleSubmit}>
// // // // // //         <TextField
// // // // // //           name="propertyNumber"
// // // // // //           label="Property Number"
// // // // // //           value={propertyData.propertyNumber}
// // // // // //           onChange={handleInputChange}
// // // // // //           fullWidth
// // // // // //           sx={{ mb: 2 }}
// // // // // //           error={!!errors.propertyNumber}
// // // // // //           helperText={errors.propertyNumber}
// // // // // //         />
// // // // // //         <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.propertyType}>
// // // // // //           <InputLabel>Property Type</InputLabel>
// // // // // //           <Select
// // // // // //             name="propertyType"
// // // // // //             value={propertyData.propertyType}
// // // // // //             onChange={handlePropertyTypeChange}
// // // // // //             label="Property Type"
// // // // // //             MenuProps={{
// // // // // //               PaperProps: {
// // // // // //                 style: {
// // // // // //                   maxHeight: 200,
// // // // // //                 },
// // // // // //               },
// // // // // //             }}
// // // // // //           >
// // // // // //             {propertyTypes.map((type) => (
// // // // // //               <MenuItem key={type.id} value={type.id}>
// // // // // //                 {type.name}
// // // // // //               </MenuItem>
// // // // // //             ))}
// // // // // //           </Select>
// // // // // //           {!!errors.propertyType && <FormHelperText>{errors.propertyType}</FormHelperText>}
// // // // // //         </FormControl>

// // // // // //         <TextField
// // // // // //           name="licenseNumber"
// // // // // //           label="License Number"
// // // // // //           value={propertyData.licenseNumber}
// // // // // //           onChange={handleInputChange}
// // // // // //           fullWidth
// // // // // //           sx={{ mb: 2 }}
// // // // // //           error={!!errors.licenseNumber}
// // // // // //           helperText={errors.licenseNumber}
// // // // // //         />

// // // // // //         {/* Updated License Type Field with Select */}
// // // // // //         <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.licenseType}>
// // // // // //           <InputLabel>License Type</InputLabel>
// // // // // //           <Select
// // // // // //             name="licenseType"
// // // // // //             value={propertyData.licenseType}
// // // // // //             onChange={handleInputChange}
// // // // // //             label="License Type"
// // // // // //             MenuProps={{
// // // // // //               PaperProps: {
// // // // // //                 style: {
// // // // // //                   maxHeight: 200,
// // // // // //                 },
// // // // // //               },
// // // // // //             }}
// // // // // //           >
// // // // // //             {licenseTypes.map((type) => (
// // // // // //               <MenuItem key={type.id} value={type.id}>
// // // // // //                 {type.name}
// // // // // //               </MenuItem>
// // // // // //             ))}
// // // // // //           </Select>
// // // // // //           {!!errors.licenseType && <FormHelperText>{errors.licenseType}</FormHelperText>}
// // // // // //         </FormControl>

// // // // // //         <Grid container spacing={2}>
// // // // // //           <Grid item xs={6}>
// // // // // //             <TextField
// // // // // //               name="space"
// // // // // //               label="Space"
// // // // // //               type="number"
// // // // // //               value={propertyData.space}
// // // // // //               onChange={handleInputChange}
// // // // // //               fullWidth
// // // // // //               error={!!errors.space}
// // // // // //               helperText={errors.space}
// // // // // //             />
// // // // // //           </Grid>
// // // // // //           <Grid item xs={6}>
// // // // // //             <TextField
// // // // // //               name="price"
// // // // // //               label="Price"
// // // // // //               type="number"
// // // // // //               value={propertyData.price}
// // // // // //               onChange={handleInputChange}
// // // // // //               fullWidth
// // // // // //               error={!!errors.price}
// // // // // //               helperText={errors.price}
// // // // // //             />
// // // // // //           </Grid>
// // // // // //         </Grid>
// // // // // //         <TextField
// // // // // //           name="description"
// // // // // //           label="Description"
// // // // // //           value={propertyData.description}
// // // // // //           onChange={handleInputChange}
// // // // // //           fullWidth
// // // // // //           sx={{ mt: 2 }}
// // // // // //           error={!!errors.description}
// // // // // //           helperText={errors.description}
// // // // // //         />

// // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // //           Location
// // // // // //         </Typography>
// // // // // //         <Grid container spacing={2}>
// // // // // //           {["governorate", "province", "city", "street"].map((field) => (
// // // // // //             <Grid item xs={6} key={field}>
// // // // // //               <TextField
// // // // // //                 name={field}
// // // // // //                 label={field.charAt(0).toUpperCase() + field.slice(1)}
// // // // // //                 value={propertyData.location[field]}
// // // // // //                 onChange={handleLocationChange}
// // // // // //                 fullWidth
// // // // // //                 error={!!errors[field]}
// // // // // //                 helperText={errors[field]}
// // // // // //               />
// // // // // //             </Grid>
// // // // // //           ))}
// // // // // //         </Grid>

// // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // //           Attributes
// // // // // //         </Typography>
// // // // // //         {propertyData.attributes.map((attr, index) => (
// // // // // //           <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
// // // // // //             <Grid item xs={5}>
// // // // // //               <FormControl fullWidth>
// // // // // //                 <InputLabel>Attribute Name</InputLabel>
// // // // // //                 <Select
// // // // // //                   name="attributeName"
// // // // // //                   value={attr.attributeName}
// // // // // //                   onChange={(e) => handleAttributeChange(index, e)}
// // // // // //                   label="Attribute Name"
// // // // // //                 >
// // // // // //                   {allowedAttributes.map((allowedAttr) => (
// // // // // //                     <MenuItem key={allowedAttr.id} value={allowedAttr.name}>
// // // // // //                       {allowedAttr.name}
// // // // // //                     </MenuItem>
// // // // // //                   ))}
// // // // // //                 </Select>
// // // // // //               </FormControl>
// // // // // //             </Grid>
// // // // // //             <Grid item xs={5}>
// // // // // //               <TextField
// // // // // //                 name="value"
// // // // // //                 label="Value"
// // // // // //                 type="number"
// // // // // //                 value={attr.value}
// // // // // //                 onChange={(e) => handleAttributeChange(index, e)}
// // // // // //                 fullWidth
// // // // // //               />
// // // // // //             </Grid>
// // // // // //             <Grid item xs={2}>
// // // // // //               <IconButton onClick={() => removeAttribute(index)} color="error">
// // // // // //                 <DeleteIcon />
// // // // // //               </IconButton>
// // // // // //             </Grid>
// // // // // //             {errors[`attribute-${index}`] && (
// // // // // //               <Grid item xs={12}>
// // // // // //                 <Typography color="error">
// // // // // //                   {errors[`attribute-${index}`]}
// // // // // //                 </Typography>
// // // // // //               </Grid>
// // // // // //             )}
// // // // // //           </Grid>
// // // // // //         ))}
// // // // // //         {propertyData.propertyType && (
// // // // // //           <Button onClick={addAttribute} sx={{ mb: 2 }}>
// // // // // //             + Add Attribute
// // // // // //           </Button>
// // // // // //         )}

// // // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // // //           Property Photos
// // // // // //         </Typography>
// // // // // //         <input
// // // // // //           type="file"
// // // // // //           name="property_photos"
// // // // // //           multiple
// // // // // //           accept="image/*"
// // // // // //           onChange={handleFileChange}
// // // // // //         />

// // // // // //         <Grid container spacing={2} sx={{ mt: 2 }}>
// // // // // //           {imagePreviews.map((src, idx) => (
// // // // // //             <Grid item xs={4} key={idx}>
// // // // // //               <img
// // // // // //                 src={src}
// // // // // //                 alt={`preview-${idx}`}
// // // // // //                 style={{
// // // // // //                   width: "100%",
// // // // // //                   height: "150px",
// // // // // //                   objectFit: "cover",
// // // // // //                   borderRadius: "8px",
// // // // // //                 }}
// // // // // //               />
// // // // // //             </Grid>
// // // // // //           ))}
// // // // // //         </Grid>

// // // // // //         <Box mt={"2%"}>
// // // // // //           <TextField
// // // // // //             name="owner"
// // // // // //             label="Owner"
// // // // // //             value={propertyData.owner}
// // // // // //             onChange={handleInputChange}
// // // // // //             fullWidth
// // // // // //             sx={{ mb: 2 }}
// // // // // //             error={!!errors.owner}
// // // // // //             helperText={errors.owner}
// // // // // //           />
// // // // // //         </Box>

// // // // // //         {error && (
// // // // // //           <Typography color="error" sx={{ mt: 2 }}>
// // // // // //             {error.message || "Something went wrong"}
// // // // // //           </Typography>
// // // // // //         )}

// // // // // //         <Button
// // // // // //           type="submit"
// // // // // //           variant="contained"
// // // // // //           sx={{ mt: 3 }}
// // // // // //           disabled={loading}
// // // // // //           onClick={handleSubmit}
// // // // // //         >
// // // // // //           {loading ? <CircularProgress size={20} /> : "Create Property"}
// // // // // //         </Button>
// // // // // //       </form>
// // // // // //     </Box>
// // // // // //   );
// // // // // // }

// // // // // import React, { useState, useEffect } from "react";
// // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // import { createProperty } from "../../redux/property/propertySlice";
// // // // // import { fetchPropertyTypes } from "../../redux/property type/propertyTypeSlice";
// // // // // import { fetchLicenseTypes } from "../../redux/license type/licenseTypeSlice";
// // // // // import {
// // // // //   TextField,
// // // // //   Button,
// // // // //   Box,
// // // // //   Grid,
// // // // //   Typography,
// // // // //   CircularProgress,
// // // // //   Select,
// // // // //   MenuItem,
// // // // //   FormControl,
// // // // //   InputLabel,
// // // // //   FormHelperText,
// // // // //   IconButton,
// // // // //   Alert,
// // // // // } from "@mui/material";
// // // // // import DeleteIcon from "@mui/icons-material/Delete";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import Swal from "sweetalert2";

// // // // // // Define the PropertyTypeOperation enum
// // // // // const PropertyTypeOperation = {
// // // // //   Selling: "selling",
// // // // //   Renting: "renting",
// // // // // };

// // // // // export default function CreatePropertyForm() {
// // // // //   const dispatch = useDispatch();
// // // // //   const navigate = useNavigate();

// // // // //   const { loading, error } = useSelector((state) => state.property);
// // // // //   const { propertyTypes } = useSelector((state) => state.propertyType);
// // // // //   const { licenseTypes } = useSelector((state) => state.licenseType);

// // // // //   const [propertyData, setPropertyData] = useState({
// // // // //     propertyNumber: "",
// // // // //     propertyType: "",
// // // // //     typeOperation: PropertyTypeOperation.Selling, // Added new state field with a default value
// // // // //     licenseNumber: "",
// // // // //     licenseType: "",
// // // // //     space: "",
// // // // //     price: "",
// // // // //     description: "",
// // // // //     attributes: [],
// // // // //     location: {
// // // // //       governorate: "",
// // // // //       province: "",
// // // // //       city: "",
// // // // //       street: "",
// // // // //     },
// // // // //     property_photos: [],
// // // // //     owner: "",
// // // // //   });

// // // // //   const [imagePreviews, setImagePreviews] = useState([]);
// // // // //   const [errors, setErrors] = useState({});

// // // // //   const selectedPropertyType = propertyTypes.find(
// // // // //     (type) => type.id === propertyData.propertyType
// // // // //   );
// // // // //   const allowedAttributes = selectedPropertyType
// // // // //     ? selectedPropertyType.attributes.map((pta) => pta.attribute)
// // // // //     : [];

// // // // //   useEffect(() => {
// // // // //     dispatch(fetchPropertyTypes());
// // // // //     dispatch(fetchLicenseTypes());
// // // // //   }, [dispatch]);

// // // // //   const validate = () => {
// // // // //     const newErrors = {};

// // // // //     if (!propertyData.propertyNumber) newErrors.propertyNumber = "Required";
// // // // //     if (!propertyData.propertyType) newErrors.propertyType = "Required";
// // // // //     if (!propertyData.typeOperation) newErrors.typeOperation = "Required"; // Added validation for new field
// // // // //     if (!propertyData.licenseNumber) newErrors.licenseNumber = "Required";
// // // // //     if (!propertyData.licenseType) newErrors.licenseType = "Required";
// // // // //     if (!propertyData.space || Number(propertyData.space) <= 0)
// // // // //       newErrors.space = "Must be a positive number";
// // // // //     if (!propertyData.price || Number(propertyData.price) <= 0)
// // // // //       newErrors.price = "Must be a positive number";
// // // // //     if (!propertyData.description) newErrors.description = "Required";
// // // // //     if (!propertyData.owner) newErrors.owner = "Required";

// // // // //     Object.entries(propertyData.location).forEach(([key, value]) => {
// // // // //       if (!value) newErrors[key] = "Required";
// // // // //     });

// // // // //     propertyData.attributes.forEach((attr, index) => {
// // // // //       if (!attr.attributeName || !attr.value) {
// // // // //         newErrors[`attribute-${index}`] = "Attribute name and value required";
// // // // //       } else if (isNaN(attr.value) || Number(attr.value) < 0) {
// // // // //         newErrors[`attribute-${index}`] = "Value must be a number ≥ 0";
// // // // //       }
// // // // //     });

// // // // //     setErrors(newErrors);
// // // // //     return Object.keys(newErrors).length === 0;
// // // // //   };

// // // // //   const handleInputChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setPropertyData((prev) => ({
// // // // //       ...prev,
// // // // //       [name]: value,
// // // // //     }));
// // // // //   };

// // // // //   const handlePropertyTypeChange = (e) => {
// // // // //     const { value } = e.target;
// // // // //     setPropertyData((prev) => ({
// // // // //       ...prev,
// // // // //       propertyType: value,
// // // // //       attributes: [],
// // // // //     }));
// // // // //   };

// // // // //   const handleAttributeChange = (index, e) => {
// // // // //     const { name, value } = e.target;
// // // // //     const updatedAttributes = [...propertyData.attributes];
// // // // //     updatedAttributes[index][name] = value;
// // // // //     setPropertyData((prev) => ({
// // // // //       ...prev,
// // // // //       attributes: updatedAttributes,
// // // // //     }));
// // // // //   };

// // // // //   const handleLocationChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setPropertyData((prev) => ({
// // // // //       ...prev,
// // // // //       location: {
// // // // //         ...prev.location,
// // // // //         [name]: value,
// // // // //       },
// // // // //     }));
// // // // //   };

// // // // //   const handleFileChange = (e) => {
// // // // //     const files = Array.from(e.target.files);
// // // // //     setPropertyData((prev) => ({
// // // // //       ...prev,
// // // // //       property_photos: files,
// // // // //     }));

// // // // //     const previews = files.map((file) => URL.createObjectURL(file));
// // // // //     setImagePreviews(previews);
// // // // //   };

// // // // //   const addAttribute = () => {
// // // // //     setPropertyData((prev) => ({
// // // // //       ...prev,
// // // // //       attributes: [...prev.attributes, { attributeName: "", value: "" }],
// // // // //     }));
// // // // //   };

// // // // //   const removeAttribute = (index) => {
// // // // //     setPropertyData((prev) => ({
// // // // //       ...prev,
// // // // //       attributes: prev.attributes.filter((_, i) => i !== index),
// // // // //     }));
// // // // //   };

// // // // //   const handleSubmit = (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!validate()) return;

// // // // //     dispatch(createProperty(propertyData)).then((res) => {
// // // // //       if (res.meta.requestStatus === "fulfilled") {
// // // // //         Swal.fire(
// // // // //           "Property Created",
// // // // //           res.payload?.message || "Success",
// // // // //           "success"
// // // // //         );
// // // // //         navigate("/office/my-office");
// // // // //       }
// // // // //     });
// // // // //   };

// // // // //   return (
// // // // //     <Box
// // // // //       sx={{
// // // // //         maxWidth: "700px",
// // // // //         mx: "auto",
// // // // //         p: 2,
// // // // //         border: "1px solid #ddd",
// // // // //         borderRadius: "12px",
// // // // //       }}
// // // // //     >
// // // // //       <Typography variant="h5" gutterBottom>
// // // // //         Create Property
// // // // //       </Typography>
// // // // //       <form onSubmit={handleSubmit}>
// // // // //         <TextField
// // // // //           name="propertyNumber"
// // // // //           label="Property Number"
// // // // //           value={propertyData.propertyNumber}
// // // // //           onChange={handleInputChange}
// // // // //           fullWidth
// // // // //           sx={{ mb: 2 }}
// // // // //           error={!!errors.propertyNumber}
// // // // //           helperText={errors.propertyNumber}
// // // // //         />

// // // // //         {/* Property Type and Operation on the same line */}
// // // // //         <Grid container spacing={2} sx={{ mb: 2 }}>
// // // // //           <Grid item xs={6}>
// // // // //             <FormControl fullWidth error={!!errors.propertyType}>
// // // // //               <InputLabel>Property Type</InputLabel>
// // // // //               <Select
// // // // //                 name="propertyType"
// // // // //                 value={propertyData.propertyType}
// // // // //                 onChange={handlePropertyTypeChange}
// // // // //                 label="Property Type"
// // // // //                 MenuProps={{
// // // // //                   PaperProps: {
// // // // //                     style: {
// // // // //                       maxHeight: 200,
// // // // //                     },
// // // // //                   },
// // // // //                 }}
// // // // //               >
// // // // //                 {propertyTypes.map((type) => (
// // // // //                   <MenuItem key={type.id} value={type.id}>
// // // // //                     {type.name}
// // // // //                   </MenuItem>
// // // // //                 ))}
// // // // //               </Select>
// // // // //               {!!errors.propertyType && (
// // // // //                 <FormHelperText>{errors.propertyType}</FormHelperText>
// // // // //               )}
// // // // //             </FormControl>
// // // // //           </Grid>

// // // // //           <Grid item xs={6}>
// // // // //             <FormControl fullWidth error={!!errors.typeOperation}>
// // // // //               <InputLabel>Type Operation</InputLabel>
// // // // //               <Select
// // // // //                 name="typeOperation"
// // // // //                 value={propertyData.typeOperation}
// // // // //                 onChange={handleInputChange}
// // // // //                 label="Type Operation"
// // // // //               >
// // // // //                 <MenuItem value={PropertyTypeOperation.Selling}>
// // // // //                   {PropertyTypeOperation.Selling}
// // // // //                 </MenuItem>
// // // // //                 <MenuItem value={PropertyTypeOperation.Renting}>
// // // // //                   {PropertyTypeOperation.Renting}
// // // // //                 </MenuItem>
// // // // //               </Select>
// // // // //               {!!errors.typeOperation && (
// // // // //                 <FormHelperText>{errors.typeOperation}</FormHelperText>
// // // // //               )}
// // // // //             </FormControl>
// // // // //           </Grid>
// // // // //         </Grid>

// // // // //         <TextField
// // // // //           name="licenseNumber"
// // // // //           label="License Number"
// // // // //           value={propertyData.licenseNumber}
// // // // //           onChange={handleInputChange}
// // // // //           fullWidth
// // // // //           sx={{ mb: 2 }}
// // // // //           error={!!errors.licenseNumber}
// // // // //           helperText={errors.licenseNumber}
// // // // //         />

// // // // //         <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.licenseType}>
// // // // //           <InputLabel>License Type</InputLabel>
// // // // //           <Select
// // // // //             name="licenseType"
// // // // //             value={propertyData.licenseType}
// // // // //             onChange={handleInputChange}
// // // // //             label="License Type"
// // // // //             MenuProps={{
// // // // //               PaperProps: {
// // // // //                 style: {
// // // // //                   maxHeight: 200,
// // // // //                 },
// // // // //               },
// // // // //             }}
// // // // //           >
// // // // //             {licenseTypes.map((type) => (
// // // // //               <MenuItem key={type.id} value={type.id}>
// // // // //                 {type.name}
// // // // //               </MenuItem>
// // // // //             ))}
// // // // //           </Select>
// // // // //           {!!errors.licenseType && (
// // // // //             <FormHelperText>{errors.licenseType}</FormHelperText>
// // // // //           )}
// // // // //         </FormControl>

// // // // //         <Grid container spacing={2}>
// // // // //           <Grid item xs={6}>
// // // // //             <TextField
// // // // //               name="space"
// // // // //               label="Space"
// // // // //               type="number"
// // // // //               value={propertyData.space}
// // // // //               onChange={handleInputChange}
// // // // //               fullWidth
// // // // //               error={!!errors.space}
// // // // //               helperText={errors.space}
// // // // //             />
// // // // //           </Grid>
// // // // //           <Grid item xs={6}>
// // // // //             <TextField
// // // // //               name="price"
// // // // //               label="Price"
// // // // //               type="number"
// // // // //               value={propertyData.price}
// // // // //               onChange={handleInputChange}
// // // // //               fullWidth
// // // // //               error={!!errors.price}
// // // // //               helperText={errors.price}
// // // // //             />
// // // // //           </Grid>
// // // // //         </Grid>
// // // // //         <TextField
// // // // //           name="description"
// // // // //           label="Description"
// // // // //           value={propertyData.description}
// // // // //           onChange={handleInputChange}
// // // // //           fullWidth
// // // // //           sx={{ mt: 2 }}
// // // // //           error={!!errors.description}
// // // // //           helperText={errors.description}
// // // // //         />

// // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // //           Location
// // // // //         </Typography>
// // // // //         <Grid container spacing={2}>
// // // // //           {["governorate", "province", "city", "street"].map((field) => (
// // // // //             <Grid item xs={6} key={field}>
// // // // //               <TextField
// // // // //                 name={field}
// // // // //                 label={field.charAt(0).toUpperCase() + field.slice(1)}
// // // // //                 value={propertyData.location[field]}
// // // // //                 onChange={handleLocationChange}
// // // // //                 fullWidth
// // // // //                 error={!!errors[field]}
// // // // //                 helperText={errors[field]}
// // // // //               />
// // // // //             </Grid>
// // // // //           ))}
// // // // //         </Grid>

// // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // //           Attributes
// // // // //         </Typography>
// // // // //         {propertyData.attributes.map((attr, index) => (
// // // // //           <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
// // // // //             <Grid item xs={5}>
// // // // //               <FormControl fullWidth>
// // // // //                 <InputLabel>Attribute Name</InputLabel>
// // // // //                 <Select
// // // // //                   name="attributeName"
// // // // //                   value={attr.attributeName}
// // // // //                   onChange={(e) => handleAttributeChange(index, e)}
// // // // //                   label="Attribute Name"
// // // // //                 >
// // // // //                   {allowedAttributes.map((allowedAttr) => (
// // // // //                     <MenuItem key={allowedAttr.id} value={allowedAttr.name}>
// // // // //                       {allowedAttr.name}
// // // // //                     </MenuItem>
// // // // //                   ))}
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //             </Grid>
// // // // //             <Grid item xs={5}>
// // // // //               <TextField
// // // // //                 name="value"
// // // // //                 label="Value"
// // // // //                 type="number"
// // // // //                 value={attr.value}
// // // // //                 onChange={(e) => handleAttributeChange(index, e)}
// // // // //                 fullWidth
// // // // //               />
// // // // //             </Grid>
// // // // //             <Grid item xs={2}>
// // // // //               <IconButton onClick={() => removeAttribute(index)} color="error">
// // // // //                 <DeleteIcon />
// // // // //               </IconButton>
// // // // //             </Grid>
// // // // //             {errors[`attribute-${index}`] && (
// // // // //               <Grid item xs={12}>
// // // // //                 <Typography color="error">
// // // // //                   {errors[`attribute-${index}`]}
// // // // //                 </Typography>
// // // // //               </Grid>
// // // // //             )}
// // // // //           </Grid>
// // // // //         ))}
// // // // //         {propertyData.propertyType && (
// // // // //           <Button onClick={addAttribute} sx={{ mb: 2 }}>
// // // // //             + Add Attribute
// // // // //           </Button>
// // // // //         )}

// // // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // // //           Property Photos
// // // // //         </Typography>
// // // // //         <input
// // // // //           type="file"
// // // // //           name="property_photos"
// // // // //           multiple
// // // // //           accept="image/*"
// // // // //           onChange={handleFileChange}
// // // // //         />

// // // // //         <Grid container spacing={2} sx={{ mt: 2 }}>
// // // // //           {imagePreviews.map((src, idx) => (
// // // // //             <Grid item xs={4} key={idx}>
// // // // //               <img
// // // // //                 src={src}
// // // // //                 alt={`preview-${idx}`}
// // // // //                 style={{
// // // // //                   width: "100%",
// // // // //                   height: "150px",
// // // // //                   objectFit: "cover",
// // // // //                   borderRadius: "8px",
// // // // //                 }}
// // // // //               />
// // // // //             </Grid>
// // // // //           ))}
// // // // //         </Grid>

// // // // //         <Box mt={"2%"}>
// // // // //           <TextField
// // // // //             name="owner"
// // // // //             label="Owner"
// // // // //             value={propertyData.owner}
// // // // //             onChange={handleInputChange}
// // // // //             fullWidth
// // // // //             sx={{ mb: 2 }}
// // // // //             error={!!errors.owner}
// // // // //             helperText={errors.owner}
// // // // //           />
// // // // //         </Box>

// // // // //         {error && (
// // // // //           <Alert severity="error" sx={{ mt: 3 }} color="error">
// // // // //             {"Something went wrong, Please try again later."}
// // // // //           </Alert>
// // // // //         )}

// // // // //         <Button
// // // // //           type="submit"
// // // // //           variant="contained"
// // // // //           sx={{ mt: 3 }}
// // // // //           disabled={loading}
// // // // //           onClick={handleSubmit}
// // // // //         >
// // // // //           {loading ? <CircularProgress size={20} /> : "Create Property"}
// // // // //         </Button>
// // // // //       </form>
// // // // //     </Box>
// // // // //   );
// // // // // }


// // // // import React, { useState, useEffect } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { createProperty } from "../../redux/property/propertySlice";
// // // // import { fetchPropertyTypes } from "../../redux/property type/propertyTypeSlice";
// // // // import { fetchLicenseTypes } from "../../redux/license type/licenseTypeSlice";
// // // // import {
// // // //   TextField,
// // // //   Button,
// // // //   Box,
// // // //   Grid,
// // // //   Typography,
// // // //   CircularProgress,
// // // //   Select,
// // // //   MenuItem,
// // // //   FormControl,
// // // //   InputLabel,
// // // //   FormHelperText,
// // // //   IconButton,
// // // //   Alert,
// // // // } from "@mui/material";
// // // // import DeleteIcon from "@mui/icons-material/Delete";
// // // // import { useNavigate } from "react-router-dom";
// // // // import Swal from "sweetalert2";
// // // // import { useTranslation } from "react-i18next";

// // // // const PropertyTypeOperation = {
// // // //   Selling: "selling",
// // // //   Renting: "renting",
// // // // };

// // // // export default function CreatePropertyForm() {
// // // //   const { t } = useTranslation();
// // // //   const dispatch = useDispatch();
// // // //   const navigate = useNavigate();

// // // //   const { loading, error } = useSelector((state) => state.property);
// // // //   const { propertyTypes } = useSelector((state) => state.propertyType);
// // // //   const { licenseTypes } = useSelector((state) => state.licenseType);

// // // //   const [propertyData, setPropertyData] = useState({
// // // //     propertyNumber: "",
// // // //     propertyType: "",
// // // //     typeOperation: PropertyTypeOperation.Selling,
// // // //     licenseNumber: "",
// // // //     licenseType: "",
// // // //     space: "",
// // // //     price: "",
// // // //     description: "",
// // // //     attributes: [],
// // // //     location: {
// // // //       governorate: "",
// // // //       province: "",
// // // //       city: "",
// // // //       street: "",
// // // //     },
// // // //     property_photos: [],
// // // //     owner: "",
// // // //   });

// // // //   const [imagePreviews, setImagePreviews] = useState([]);
// // // //   const [errors, setErrors] = useState({});

// // // //   const selectedPropertyType = propertyTypes.find(
// // // //     (type) => type.id === propertyData.propertyType
// // // //   );
// // // //   const allowedAttributes = selectedPropertyType
// // // //     ? selectedPropertyType.attributes.map((pta) => pta.attribute)
// // // //     : [];

// // // //   useEffect(() => {
// // // //     dispatch(fetchPropertyTypes());
// // // //     dispatch(fetchLicenseTypes());
// // // //   }, [dispatch]);

// // // //   const validate = () => {
// // // //     const newErrors = {};
// // // //     const errorPath = "createProperty.errors";

// // // //     if (!propertyData.propertyNumber) newErrors.propertyNumber = t(`${errorPath}.required`);
// // // //     if (!propertyData.propertyType) newErrors.propertyType = t(`${errorPath}.required`);
// // // //     if (!propertyData.typeOperation) newErrors.typeOperation = t(`${errorPath}.required`);
// // // //     if (!propertyData.licenseNumber) newErrors.licenseNumber = t(`${errorPath}.required`);
// // // //     if (!propertyData.licenseType) newErrors.licenseType = t(`${errorPath}.required`);
// // // //     if (!propertyData.space || Number(propertyData.space) <= 0)
// // // //       newErrors.space = t(`${errorPath}.positiveNumber`);
// // // //     if (!propertyData.price || Number(propertyData.price) <= 0)
// // // //       newErrors.price = t(`${errorPath}.positiveNumber`);
// // // //     if (!propertyData.description) newErrors.description = t(`${errorPath}.required`);
// // // //     if (!propertyData.owner) newErrors.owner = t(`${errorPath}.required`);

// // // //     Object.entries(propertyData.location).forEach(([key, value]) => {
// // // //       if (!value) newErrors[key] = t(`${errorPath}.required`);
// // // //     });

// // // //     propertyData.attributes.forEach((attr, index) => {
// // // //       if (!attr.attributeName || !attr.value) {
// // // //         newErrors[`attribute-${index}`] = t(`${errorPath}.attributeNameAndValueRequired`);
// // // //       } else if (isNaN(attr.value) || Number(attr.value) < 0) {
// // // //         newErrors[`attribute-${index}`] = t(`${errorPath}.valueMustBeNonNegative`);
// // // //       }
// // // //     });

// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   const handleInputChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setPropertyData((prev) => ({
// // // //       ...prev,
// // // //       [name]: value,
// // // //     }));
// // // //   };

// // // //   const handlePropertyTypeChange = (e) => {
// // // //     const { value } = e.target;
// // // //     setPropertyData((prev) => ({
// // // //       ...prev,
// // // //       propertyType: value,
// // // //       attributes: [],
// // // //     }));
// // // //   };

// // // //   const handleAttributeChange = (index, e) => {
// // // //     const { name, value } = e.target;
// // // //     const updatedAttributes = [...propertyData.attributes];
// // // //     updatedAttributes[index][name] = value;
// // // //     setPropertyData((prev) => ({
// // // //       ...prev,
// // // //       attributes: updatedAttributes,
// // // //     }));
// // // //   };

// // // //   const handleLocationChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setPropertyData((prev) => ({
// // // //       ...prev,
// // // //       location: {
// // // //         ...prev.location,
// // // //         [name]: value,
// // // //       },
// // // //     }));
// // // //   };

// // // //   const handleFileChange = (e) => {
// // // //     const files = Array.from(e.target.files);
// // // //     setPropertyData((prev) => ({
// // // //       ...prev,
// // // //       property_photos: files,
// // // //     }));

// // // //     const previews = files.map((file) => URL.createObjectURL(file));
// // // //     setImagePreviews(previews);
// // // //   };

// // // //   const addAttribute = () => {
// // // //     setPropertyData((prev) => ({
// // // //       ...prev,
// // // //       attributes: [...prev.attributes, { attributeName: "", value: "" }],
// // // //     }));
// // // //   };

// // // //   const removeAttribute = (index) => {
// // // //     setPropertyData((prev) => ({
// // // //       ...prev,
// // // //       attributes: prev.attributes.filter((_, i) => i !== index),
// // // //     }));
// // // //   };

// // // //   const handleSubmit = (e) => {
// // // //     e.preventDefault();
// // // //     if (!validate()) return;

// // // //     dispatch(createProperty(propertyData)).then((res) => {
// // // //       if (res.meta.requestStatus === "fulfilled") {
// // // //         Swal.fire(
// // // //           t("createProperty.messages.propertyCreatedTitle"),
// // // //           res.payload?.message || t("createProperty.messages.success"),
// // // //           "success"
// // // //         );
// // // //         navigate("/office/my-office");
// // // //       }
// // // //     });
// // // //   };

// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         maxWidth: "700px",
// // // //         mx: "auto",
// // // //         p: 2,
// // // //         border: "1px solid #ddd",
// // // //         borderRadius: "12px",
// // // //       }}
// // // //     >
// // // //       <Typography variant="h5" gutterBottom>
// // // //         {t("createProperty.form.title")}
// // // //       </Typography>
// // // //       <form onSubmit={handleSubmit}>
// // // //         <TextField
// // // //           name="propertyNumber"
// // // //           label={t("createProperty.form.propertyNumber")}
// // // //           value={propertyData.propertyNumber}
// // // //           onChange={handleInputChange}
// // // //           fullWidth
// // // //           sx={{ mb: 2 }}
// // // //           error={!!errors.propertyNumber}
// // // //           helperText={errors.propertyNumber}
// // // //         />

// // // //         <Grid container spacing={2} sx={{ mb: 2 }}>
// // // //           <Grid item xs={6}>
// // // //             <FormControl fullWidth error={!!errors.propertyType}>
// // // //               <InputLabel>{t("createProperty.form.propertyType")}</InputLabel>
// // // //               <Select
// // // //                 name="propertyType"
// // // //                 value={propertyData.propertyType}
// // // //                 onChange={handlePropertyTypeChange}
// // // //                 label={t("createProperty.form.propertyType")}
// // // //                 MenuProps={{
// // // //                   PaperProps: {
// // // //                     style: {
// // // //                       maxHeight: 200,
// // // //                     },
// // // //                   },
// // // //                 }}
// // // //               >
// // // //                 {propertyTypes.map((type) => (
// // // //                   <MenuItem key={type.id} value={type.id}>
// // // //                     {type.name}
// // // //                   </MenuItem>
// // // //                 ))}
// // // //               </Select>
// // // //               {!!errors.propertyType && (
// // // //                 <FormHelperText>{errors.propertyType}</FormHelperText>
// // // //               )}
// // // //             </FormControl>
// // // //           </Grid>

// // // //           <Grid item xs={6}>
// // // //             <FormControl fullWidth error={!!errors.typeOperation}>
// // // //               <InputLabel>{t("createProperty.form.typeOperation")}</InputLabel>
// // // //               <Select
// // // //                 name="typeOperation"
// // // //                 value={propertyData.typeOperation}
// // // //                 onChange={handleInputChange}
// // // //                 label={t("createProperty.form.typeOperation")}
// // // //               >
// // // //                 <MenuItem value={PropertyTypeOperation.Selling}>
// // // //                   {t("createProperty.form.selling")}
// // // //                 </MenuItem>
// // // //                 <MenuItem value={PropertyTypeOperation.Renting}>
// // // //                   {t("createProperty.form.renting")}
// // // //                 </MenuItem>
// // // //               </Select>
// // // //               {!!errors.typeOperation && (
// // // //                 <FormHelperText>{errors.typeOperation}</FormHelperText>
// // // //               )}
// // // //             </FormControl>
// // // //           </Grid>
// // // //         </Grid>

// // // //         <TextField
// // // //           name="licenseNumber"
// // // //           label={t("createProperty.form.licenseNumber")}
// // // //           value={propertyData.licenseNumber}
// // // //           onChange={handleInputChange}
// // // //           fullWidth
// // // //           sx={{ mb: 2 }}
// // // //           error={!!errors.licenseNumber}
// // // //           helperText={errors.licenseNumber}
// // // //         />

// // // //         <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.licenseType}>
// // // //           <InputLabel>{t("createProperty.form.licenseType")}</InputLabel>
// // // //           <Select
// // // //             name="licenseType"
// // // //             value={propertyData.licenseType}
// // // //             onChange={handleInputChange}
// // // //             label={t("createProperty.form.licenseType")}
// // // //             MenuProps={{
// // // //               PaperProps: {
// // // //                 style: {
// // // //                   maxHeight: 200,
// // // //                 },
// // // //               },
// // // //             }}
// // // //           >
// // // //             {licenseTypes.map((type) => (
// // // //               <MenuItem key={type.id} value={type.id}>
// // // //                 {type.name}
// // // //               </MenuItem>
// // // //             ))}
// // // //           </Select>
// // // //           {!!errors.licenseType && (
// // // //             <FormHelperText>{errors.licenseType}</FormHelperText>
// // // //           )}
// // // //         </FormControl>

// // // //         <Grid container spacing={2}>
// // // //           <Grid item xs={6}>
// // // //             <TextField
// // // //               name="space"
// // // //               label={t("createProperty.form.space")}
// // // //               type="number"
// // // //               value={propertyData.space}
// // // //               onChange={handleInputChange}
// // // //               fullWidth
// // // //               error={!!errors.space}
// // // //               helperText={errors.space}
// // // //             />
// // // //           </Grid>
// // // //           <Grid item xs={6}>
// // // //             <TextField
// // // //               name="price"
// // // //               label={t("createProperty.form.price")}
// // // //               type="number"
// // // //               value={propertyData.price}
// // // //               onChange={handleInputChange}
// // // //               fullWidth
// // // //               error={!!errors.price}
// // // //               helperText={errors.price}
// // // //             />
// // // //           </Grid>
// // // //         </Grid>
// // // //         <TextField
// // // //           name="description"
// // // //           label={t("createProperty.form.description")}
// // // //           value={propertyData.description}
// // // //           onChange={handleInputChange}
// // // //           fullWidth
// // // //           sx={{ mt: 2 }}
// // // //           error={!!errors.description}
// // // //           helperText={errors.description}
// // // //         />

// // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // //           {t("createProperty.form.location")}
// // // //         </Typography>
// // // //         <Grid container spacing={2}>
// // // //           {["governorate", "province", "city", "street"].map((field) => (
// // // //             <Grid item xs={6} key={field}>
// // // //               <TextField
// // // //                 name={field}
// // // //                 label={t(`createProperty.form.${field}`)}
// // // //                 value={propertyData.location[field]}
// // // //                 onChange={handleLocationChange}
// // // //                 fullWidth
// // // //                 error={!!errors[field]}
// // // //                 helperText={errors[field]}
// // // //               />
// // // //             </Grid>
// // // //           ))}
// // // //         </Grid>

// // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // //           {t("createProperty.form.attributes")}
// // // //         </Typography>
// // // //         {propertyData.attributes.map((attr, index) => (
// // // //           <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
// // // //             <Grid item xs={5}>
// // // //               <FormControl fullWidth>
// // // //                 <InputLabel>{t("createProperty.form.attributeName")}</InputLabel>
// // // //                 <Select
// // // //                   name="attributeName"
// // // //                   value={attr.attributeName}
// // // //                   onChange={(e) => handleAttributeChange(index, e)}
// // // //                   label={t("createProperty.form.attributeName")}
// // // //                 >
// // // //                   {allowedAttributes.map((allowedAttr) => (
// // // //                     <MenuItem key={allowedAttr.id} value={allowedAttr.name}>
// // // //                       {allowedAttr.name}
// // // //                     </MenuItem>
// // // //                   ))}
// // // //                 </Select>
// // // //               </FormControl>
// // // //             </Grid>
// // // //             <Grid item xs={5}>
// // // //               {
// // // //               console.log("this is the allowedAttributes : ",allowedAttributes)
// // // //               }
// // // //               <TextField
// // // //                 name="value"
// // // //                 label={t("createProperty.form.value")}
// // // //                 type="number"
// // // //                 value={attr.value}
// // // //                 onChange={(e) => handleAttributeChange(index, e)}
// // // //                 fullWidth
// // // //               />
// // // //             </Grid>
// // // //             <Grid item xs={2}>
// // // //               <IconButton onClick={() => removeAttribute(index)} color="error">
// // // //                 <DeleteIcon />
// // // //               </IconButton>
// // // //             </Grid>
// // // //             {errors[`attribute-${index}`] && (
// // // //               <Grid item xs={12}>
// // // //                 <Typography color="error">
// // // //                   {errors[`attribute-${index}`]}
// // // //                 </Typography>
// // // //               </Grid>
// // // //             )}
// // // //           </Grid>
// // // //         ))}
// // // //         {propertyData.propertyType && (
// // // //           <Button onClick={addAttribute} sx={{ mb: 2 }}>
// // // //             {t("createProperty.form.addAttribute")}
// // // //           </Button>
// // // //         )}

// // // //         <Typography variant="h6" sx={{ mt: 3 }}>
// // // //           {t("createProperty.form.propertyPhotos")}
// // // //         </Typography>
// // // //         <input
// // // //           type="file"
// // // //           name="property_photos"
// // // //           multiple
// // // //           accept="image/*"
// // // //           onChange={handleFileChange}
// // // //         />

// // // //         <Grid container spacing={2} sx={{ mt: 2 }}>
// // // //           {imagePreviews.map((src, idx) => (
// // // //             <Grid item xs={4} key={idx}>
// // // //               <img
// // // //                 src={src}
// // // //                 alt={`preview-${idx}`}
// // // //                 style={{
// // // //                   width: "100%",
// // // //                   height: "150px",
// // // //                   objectFit: "cover",
// // // //                   borderRadius: "8px",
// // // //                 }}
// // // //               />
// // // //             </Grid>
// // // //           ))}
// // // //         </Grid>

// // // //         <Box mt={"2%"}>
// // // //           <TextField
// // // //             name="owner"
// // // //             label={t("createProperty.form.owner")}
// // // //             value={propertyData.owner}
// // // //             onChange={handleInputChange}
// // // //             fullWidth
// // // //             sx={{ mb: 2 }}
// // // //             error={!!errors.owner}
// // // //             helperText={errors.owner}
// // // //           />
// // // //         </Box>

// // // //         {error && (
// // // //           <Alert severity="error" sx={{ mt: 3 }} color="error">
// // // //             {t("createProperty.errors.somethingWentWrong")}
// // // //           </Alert>
// // // //         )}

// // // //         <Button
// // // //           type="submit"
// // // //           variant="contained"
// // // //           sx={{ mt: 3 }}
// // // //           disabled={loading}
// // // //           onClick={handleSubmit}
// // // //         >
// // // //           {loading ? <CircularProgress size={20} /> : t("createProperty.form.submitButton")}
// // // //         </Button>
// // // //       </form>
// // // //     </Box>
// // // //   );
// // // // }




import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProperty } from "../../redux/property/propertySlice";
import { fetchPropertyTypes } from "../../redux/property type/propertyTypeSlice";
import { fetchLicenseTypes } from "../../redux/license type/licenseTypeSlice";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  IconButton,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const PropertyTypeOperation = {
  Selling: "selling",
  Renting: "renting",
};

export default function CreatePropertyForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.property);
  const { propertyTypes } = useSelector((state) => state.propertyType);
  const { licenseTypes } = useSelector((state) => state.licenseType);

  const [propertyData, setPropertyData] = useState({
    propertyNumber: "",
    propertyType: "",
    typeOperation: PropertyTypeOperation.Selling,
    licenseNumber: "",
    licenseType: "",
    space: "",
    price: "",
    description: "",
    attributes: [],
    location: {
      governorate: "",
      province: "",
      city: "",
      street: "",
    },
    property_photos: [],
    owner: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  const selectedPropertyType = propertyTypes.find(
    (type) => type.id === propertyData.propertyType
  );
  // Flatten the attributes from the linked property type
  const allowedAttributes = selectedPropertyType
    ? selectedPropertyType.attributes.map((pta) => pta.attribute)
    : [];

  useEffect(() => {
    dispatch(fetchPropertyTypes());
    dispatch(fetchLicenseTypes());
  }, [dispatch]);

  const validate = () => {
    const newErrors = {};
    const errorPath = "createProperty.errors";

    if (!propertyData.propertyNumber) newErrors.propertyNumber = t(`${errorPath}.required`);
    if (!propertyData.propertyType) newErrors.propertyType = t(`${errorPath}.required`);
    if (!propertyData.typeOperation) newErrors.typeOperation = t(`${errorPath}.required`);
    if (!propertyData.licenseNumber) newErrors.licenseNumber = t(`${errorPath}.required`);
    if (!propertyData.licenseType) newErrors.licenseType = t(`${errorPath}.required`);
    if (!propertyData.space || Number(propertyData.space) <= 0)
      newErrors.space = t(`${errorPath}.positiveNumber`);
    if (!propertyData.price || Number(propertyData.price) <= 0)
      newErrors.price = t(`${errorPath}.positiveNumber`);
    if (!propertyData.description) newErrors.description = t(`${errorPath}.required`);
    if (!propertyData.owner) newErrors.owner = t(`${errorPath}.required`);

    Object.entries(propertyData.location).forEach(([key, value]) => {
      if (!value) newErrors[key] = t(`${errorPath}.required`);
    });

    propertyData.attributes.forEach((attr, index) => {
      const selectedAttr = allowedAttributes.find(
        (allowedAttr) => allowedAttr.name === attr.attributeName
      );
      if (!attr.attributeName || attr.value === undefined || attr.value === null || (selectedAttr?.type === 'number' && isNaN(attr.value)) || (selectedAttr?.type === 'number' && Number(attr.value) < 0)) {
        newErrors[`attribute-${index}`] = t(`${errorPath}.attributeNameAndValueRequired`);
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePropertyTypeChange = (e) => {
    const { value } = e.target;
    // Reset attributes when property type changes
    setPropertyData((prev) => ({
      ...prev,
      propertyType: value,
      attributes: [],
    }));
  };

  const handleAttributeNameChange = (index, e) => {
    const attributeName = e.target.value;
    const selectedAttr = allowedAttributes.find(
      (attr) => attr.name === attributeName
    );

    const updatedAttributes = [...propertyData.attributes];
    // Keep the id and name, but reset the value based on the new type
    updatedAttributes[index] = {
      ...updatedAttributes[index],
      attributeId: selectedAttr.id,
      attributeName: selectedAttr.name,
      value: selectedAttr.type === 'boolean' ? false : '', // Initialize value based on type
    };
    setPropertyData((prev) => ({
      ...prev,
      attributes: updatedAttributes,
    }));
  };
  
  const handleAttributeValueChange = (index, value) => {
    const updatedAttributes = [...propertyData.attributes];
    updatedAttributes[index].value = value;
    setPropertyData((prev) => ({
      ...prev,
      attributes: updatedAttributes,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPropertyData((prev) => ({
      ...prev,
      property_photos: files,
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const addAttribute = () => {
    setPropertyData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { attributeId: "", attributeName: "", value: "" }],
    }));
  };

  const removeAttribute = (index) => {
    setPropertyData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(createProperty(propertyData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        Swal.fire(
          t("createProperty.messages.propertyCreatedTitle"),
          res.payload?.message || t("createProperty.messages.success"),
          "success"
        );
        navigate("/office/my-office");
      }
    });
  };

  return (
    <Box
      sx={{
        maxWidth: "700px",
        mx: "auto",
        p: 2,
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {t("createProperty.form.title")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="propertyNumber"
          label={t("createProperty.form.propertyNumber")}
          value={propertyData.propertyNumber}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.propertyNumber}
          helperText={errors.propertyNumber}
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth error={!!errors.propertyType}>
              <InputLabel>{t("createProperty.form.propertyType")}</InputLabel>
              <Select
                name="propertyType"
                value={propertyData.propertyType}
                onChange={handlePropertyTypeChange}
                label={t("createProperty.form.propertyType")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {propertyTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
              {!!errors.propertyType && (
                <FormHelperText>{errors.propertyType}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={!!errors.typeOperation}>
              <InputLabel>{t("createProperty.form.typeOperation")}</InputLabel>
              <Select
                name="typeOperation"
                value={propertyData.typeOperation}
                onChange={handleInputChange}
                label={t("createProperty.form.typeOperation")}
              >
                <MenuItem value={PropertyTypeOperation.Selling}>
                  {t("createProperty.form.selling")}
                </MenuItem>
                <MenuItem value={PropertyTypeOperation.Renting}>
                  {t("createProperty.form.renting")}
                </MenuItem>
              </Select>
              {!!errors.typeOperation && (
                <FormHelperText>{errors.typeOperation}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <TextField
          name="licenseNumber"
          label={t("createProperty.form.licenseNumber")}
          value={propertyData.licenseNumber}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.licenseNumber}
          helperText={errors.licenseNumber}
        />

        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.licenseType}>
          <InputLabel>{t("createProperty.form.licenseType")}</InputLabel>
          <Select
            name="licenseType"
            value={propertyData.licenseType}
            onChange={handleInputChange}
            label={t("createProperty.form.licenseType")}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            {licenseTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
          {!!errors.licenseType && (
            <FormHelperText>{errors.licenseType}</FormHelperText>
          )}
        </FormControl>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="space"
              label={t("createProperty.form.space")}
              type="number"
              value={propertyData.space}
              onChange={handleInputChange}
              fullWidth
              error={!!errors.space}
              helperText={errors.space}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="price"
              label={t("createProperty.form.price")}
              type="number"
              value={propertyData.price}
              onChange={handleInputChange}
              fullWidth
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
        </Grid>
        <TextField
          name="description"
          label={t("createProperty.form.description")}
          value={propertyData.description}
          onChange={handleInputChange}
          fullWidth
          sx={{ mt: 2 }}
          error={!!errors.description}
          helperText={errors.description}
        />

        <Typography variant="h6" sx={{ mt: 3 }}>
          {t("createProperty.form.location")}
        </Typography>
        <Grid container spacing={2}>
          {["governorate", "province", "city", "street"].map((field) => (
            <Grid item xs={6} key={field}>
              <TextField
                name={field}
                label={t(`createProperty.form.${field}`)}
                value={propertyData.location[field]}
                onChange={handleLocationChange}
                fullWidth
                error={!!errors[field]}
                helperText={errors[field]}
              />
            </Grid>
          ))}
        </Grid>

        {/* Dynamic Attributes Section */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          {t("createProperty.form.attributes")}
        </Typography>
        {propertyData.attributes.map((attr, index) => {
          const linkedAttribute = allowedAttributes.find(
            (allowedAttr) => allowedAttr.name === attr.attributeName
          );

          return (
            <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel>{t("createProperty.form.attributeName")}</InputLabel>
                  <Select
                    name="attributeName"
                    value={attr.attributeName}
                    onChange={(e) => handleAttributeNameChange(index, e)}
                    label={t("createProperty.form.attributeName")}
                  >
                    {allowedAttributes.map((allowedAttr) => (
                      <MenuItem key={allowedAttr.id} value={allowedAttr.name}>
                        {allowedAttr.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={5}>
                {linkedAttribute?.type === "boolean" ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!attr.value}
                        onChange={(e) => handleAttributeValueChange(index, e.target.checked)}
                      />
                    }
                    label={t("createProperty.form.value")}
                  />
                ) : (
                  <TextField
                    name="value"
                    label={t("createProperty.form.value")}
                    type="number"
                    value={attr.value}
                    onChange={(e) => handleAttributeValueChange(index, e.target.value)}
                    fullWidth
                    error={!!errors[`attribute-${index}`]}
                    helperText={errors[`attribute-${index}`]}
                  />
                )}
              </Grid>

              <Grid item xs={2}>
                <IconButton onClick={() => removeAttribute(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
              {errors[`attribute-${index}`] && (
                <Grid item xs={12}>
                  <Typography color="error">
                    {errors[`attribute-${index}`]}
                  </Typography>
                </Grid>
              )}
            </Grid>
          );
        })}

        {propertyData.propertyType && (
          <Button onClick={addAttribute} sx={{ mb: 2 }}>
            {t("createProperty.form.addAttribute")}
          </Button>
        )}

        <Typography variant="h6" sx={{ mt: 3 }}>
          {t("createProperty.form.propertyPhotos")}
        </Typography>
        <input
          type="file"
          name="property_photos"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {imagePreviews.map((src, idx) => (
            <Grid item xs={4} key={idx}>
              <img
                src={src}
                alt={`preview-${idx}`}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Box mt={"2%"}>
          <TextField
            name="owner"
            label={t("createProperty.form.owner")}
            value={propertyData.owner}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.owner}
            helperText={errors.owner}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 3 }} color="error">
            {t("createProperty.errors.somethingWentWrong")}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={20} /> : t("createProperty.form.submitButton")}
        </Button>
      </form>
    </Box>
  );
}


