// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAttributes,
//   createAttribute,
//   updateAttribute,
//   deleteAttribute,
//   linkAttributesToPropertyType,
// } from "../../redux/attribute/attributeSlice";
// import { fetchPropertyTypes } from "../../redux/property type/propertyTypeSlice"; // Import fetchPropertyTypes
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Snackbar,
//   Alert,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Autocomplete,
//   Chip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// // Define AttributeType enum based on your backend
// const AttributeType = {
//   NUMBER: "number",
//   BOOLEAN: "boolean",
// };

// export default function ManageAttributePage() {
//   const dispatch = useDispatch();
//   const { attributes, loading, error } = useSelector(
//     (state) => state.attribute
//   );
//   const { propertyTypes } = useSelector((state) => state.propertyType); // Get property types from the store

//   // Dialog and state for basic attribute management (Create, Update, Delete)
//   const [openCreateDialog, setOpenCreateDialog] = useState(false);
//   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [currentAttribute, setCurrentAttribute] = useState(null);
//   const [newAttributeName, setNewAttributeName] = useState("");
//   const [newAttributeType, setNewAttributeType] = useState(
//     AttributeType.NUMBER
//   );
//   const [updateAttributeName, setUpdateAttributeName] = useState("");
//   const [updateAttributeType, setUpdateAttributeType] = useState("");

//   // Dialog and state for linking attributes to a property type
//   const [openLinkDialog, setOpenLinkDialog] = useState(false);
//   const [selectedPropertyType, setSelectedPropertyType] = useState(null);
//   const [selectedAttributes, setSelectedAttributes] = useState([]);

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     dispatch(fetchAttributes());
//     dispatch(fetchPropertyTypes()); // Fetch property types on load
//   }, [dispatch]);

//   // Handlers for Dialogs
//   const handleOpenCreateDialog = () => setOpenCreateDialog(true);
//   const handleCloseCreateDialog = () => {
//     setOpenCreateDialog(false);
//     setNewAttributeName("");
//     setNewAttributeType(AttributeType.NUMBER);
//   };

//   const handleOpenUpdateDialog = (attribute) => {
//     setCurrentAttribute(attribute);
//     setUpdateAttributeName(attribute.name);
//     setUpdateAttributeType(attribute.type);
//     setOpenUpdateDialog(true);
//   };
//   const handleCloseUpdateDialog = () => {
//     setOpenUpdateDialog(false);
//     setCurrentAttribute(null);
//     setUpdateAttributeName("");
//     setUpdateAttributeType("");
//   };

//   const handleOpenDeleteDialog = (attribute) => {
//     setCurrentAttribute(attribute);
//     setOpenDeleteDialog(true);
//   };
//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//     setCurrentAttribute(null);
//   };

//   const handleOpenLinkDialog = (propertyType) => {
//     setSelectedPropertyType(propertyType);
//     // Find attributes already linked to this property type
//     const linked = attributes.filter(
//       (attr) =>
//         propertyType.attributes &&
//         propertyType.attributes.some((linkedAttr) => linkedAttr.id === attr.id)
//     );
//     setSelectedAttributes(linked);
//     setOpenLinkDialog(true);
//   };

//   const handleCloseLinkDialog = () => {
//     setOpenLinkDialog(false);
//     setSelectedPropertyType(null);
//     setSelectedAttributes([]);
//   };

//   // Handlers for CRUD Operations
//   const handleCreate = () => {
//     if (newAttributeName.trim() && newAttributeType) {
//       dispatch(
//         createAttribute({ name: newAttributeName, type: newAttributeType })
//       ).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "Attribute created successfully!",
//             severity: "success",
//           });
//           handleCloseCreateDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to create attribute.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleUpdate = () => {
//     if (currentAttribute && updateAttributeName.trim() && updateAttributeType) {
//       dispatch(
//         updateAttribute({
//           id: currentAttribute.id,
//           updatedData: { name: updateAttributeName, type: updateAttributeType },
//         })
//       ).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "Attribute updated successfully!",
//             severity: "success",
//           });
//           handleCloseUpdateDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to update attribute.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleDelete = () => {
//     if (currentAttribute) {
//       dispatch(deleteAttribute(currentAttribute.id)).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "Attribute deleted successfully!",
//             severity: "success",
//           });
//           handleCloseDeleteDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to delete attribute.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleLinkAttributes = () => {
//     if (selectedPropertyType) {
//       const attributeIds = selectedAttributes.map((attr) => attr.id);
//       const data = {
//         propertyTypeId: selectedPropertyType.id,
//         attributeIds: attributeIds,
//       };

//       dispatch(linkAttributesToPropertyType({ data })).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "Attributes linked successfully!",
//             severity: "success",
//           });
//           handleCloseLinkDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message:
//               res.payload?.message || "Failed to link attributes.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={4}
//       >
//         <Typography variant="h4" component="h1">
//           Manage Attributes
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleOpenCreateDialog}
//         >
//           Add New Attribute
//         </Button>
//       </Box>

//       {loading && (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       )}

//       {!loading && attributes.length === 0 && (
//         <Typography variant="h6" color="text.secondary" align="center" mt={4}>
//           No attributes found.
//         </Typography>
//       )}

//       {!loading && attributes.length > 0 && (
//         <List>
//           {attributes.map((attribute) => (
//             <ListItem
//               key={attribute.id}
//               divider
//               secondaryAction={
//                 <>
//                   <IconButton
//                     edge="end"
//                     aria-label="edit"
//                     onClick={() => handleOpenUpdateDialog(attribute)}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     edge="end"
//                     aria-label="delete"
//                     onClick={() => handleOpenDeleteDialog(attribute)}
//                     sx={{ ml: 1 }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </>
//               }
//             >
//               <ListItemText primary={attribute.name} secondary={attribute.type} />
//             </ListItem>
//           ))}
//         </List>
//       )}

//       {/* Feature to link attributes to property types */}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h5" component="h2" mb={2}>
//           Link Attributes to Property Types
//         </Typography>
//         <List>
//           {propertyTypes.map((propertyType) => (
//             <ListItem key={propertyType.id} divider>
//               <ListItemText primary={propertyType.name} />
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={() => handleOpenLinkDialog(propertyType)}
//               >
//                 Manage Attributes
//               </Button>
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Create Dialog */}
//       <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
//         <DialogTitle>Create New Attribute</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Attribute Name"
//             fullWidth
//             variant="outlined"
//             value={newAttributeName}
//             onChange={(e) => setNewAttributeName(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <FormControl fullWidth>
//             <InputLabel>Attribute Type</InputLabel>
//             <Select
//               value={newAttributeType}
//               label="Attribute Type"
//               onChange={(e) => setNewAttributeType(e.target.value)}
//             >
//               <MenuItem value={AttributeType.NUMBER}>Number</MenuItem>
//               <MenuItem value={AttributeType.BOOLEAN}>Boolean</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseCreateDialog}>Cancel</Button>
//           <Button
//             onClick={handleCreate}
//             disabled={!newAttributeName.trim() || !newAttributeType}
//           >
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Update Dialog */}
//       <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
//         <DialogTitle>Update Attribute</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Attribute Name"
//             fullWidth
//             variant="outlined"
//             value={updateAttributeName}
//             onChange={(e) => setUpdateAttributeName(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <FormControl fullWidth>
//             <InputLabel>Attribute Type</InputLabel>
//             <Select
//               value={updateAttributeType}
//               label="Attribute Type"
//               onChange={(e) => setUpdateAttributeType(e.target.value)}
//             >
//               <MenuItem value={AttributeType.NUMBER}>Number</MenuItem>
//               <MenuItem value={AttributeType.BOOLEAN}>Boolean</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
//           <Button
//             onClick={handleUpdate}
//             disabled={!updateAttributeName.trim() || !updateAttributeType}
//           >
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete the attribute "
//             {currentAttribute?.name}"?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
//           <Button onClick={handleDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Link Attributes Dialog */}
//       <Dialog open={openLinkDialog} onClose={handleCloseLinkDialog} fullWidth>
//         <DialogTitle>
//           Link Attributes to {selectedPropertyType?.name}
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="body1" gutterBottom>
//             Select the attributes you want to link to this property type.
//           </Typography>
//           <Autocomplete
//             multiple
//             id="attributes-link-autocomplete"
//             options={attributes}
//             getOptionLabel={(option) => option.name}
//             value={selectedAttributes}
//             onChange={(event, newValue) => {
//               setSelectedAttributes(newValue);
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 variant="outlined"
//                 label="Select Attributes"
//                 placeholder="Attributes"
//               />
//             )}
//             renderTags={(value, getTagProps) =>
//               value.map((option, index) => (
//                 <Chip
//                   variant="outlined"
//                   label={option.name}
//                   {...getTagProps({ index })}
//                 />
//               ))
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseLinkDialog}>Cancel</Button>
//           <Button onClick={handleLinkAttributes} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAttributes,
//   createAttribute,
//   updateAttribute,
//   deleteAttribute,
//   linkAttributesToPropertyType,
// } from "../../redux/attribute/attributeSlice";
// import { fetchPropertyTypes } from "../../redux/property type/propertyTypeSlice";
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Snackbar,
//   Alert,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Autocomplete,
//   Chip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// // Define AttributeType enum based on your backend
// const AttributeType = {
//   NUMBER: "number",
//   BOOLEAN: "boolean",
// };

// export default function ManageAttributePage() {
//   const dispatch = useDispatch();
//   const { attributes, loading, error } = useSelector(
//     (state) => state.attribute
//   );
//   const { propertyTypes } = useSelector((state) => state.propertyType);

//   // Dialog and state for basic attribute management (Create, Update, Delete)
//   const [openCreateDialog, setOpenCreateDialog] = useState(false);
//   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [currentAttribute, setCurrentAttribute] = useState(null);
//   const [newAttributeName, setNewAttributeName] = useState("");
//   const [newAttributeType, setNewAttributeType] = useState(
//     AttributeType.NUMBER
//   );
//   const [updateAttributeName, setUpdateAttributeName] = useState("");
//   const [updateAttributeType, setUpdateAttributeType] = useState("");

//   // Dialog and state for linking attributes to a property type
//   const [openLinkDialog, setOpenLinkDialog] = useState(false);
//   const [selectedPropertyType, setSelectedPropertyType] = useState(null);
//   const [selectedAttributes, setSelectedAttributes] = useState([]);

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     dispatch(fetchAttributes());
//     dispatch(fetchPropertyTypes());
//   }, [dispatch]);

//   // Handlers for Dialogs
//   const handleOpenCreateDialog = () => setOpenCreateDialog(true);
//   const handleCloseCreateDialog = () => {
//     setOpenCreateDialog(false);
//     setNewAttributeName("");
//     setNewAttributeType(AttributeType.NUMBER);
//   };

//   const handleOpenUpdateDialog = (attribute) => {
//     setCurrentAttribute(attribute);
//     setUpdateAttributeName(attribute.name);
//     setUpdateAttributeType(attribute.type);
//     setOpenUpdateDialog(true);
//   };
//   const handleCloseUpdateDialog = () => {
//     setOpenUpdateDialog(false);
//     setCurrentAttribute(null);
//     setUpdateAttributeName("");
//     setUpdateAttributeType("");
//   };

//   const handleOpenDeleteDialog = (attribute) => {
//     setCurrentAttribute(attribute);
//     setOpenDeleteDialog(true);
//   };
//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//     setCurrentAttribute(null);
//   };

//   // 📝 UPDATED: Correctly populate the Autocomplete with existing attributes
//   const handleOpenLinkDialog = (propertyType) => {
//     setSelectedPropertyType(propertyType);
//     // Map the 'attribute' object from the propertyType.attributes array
//     const linked = propertyType.attributes.map((linkedAttr) => linkedAttr.attribute);
//     setSelectedAttributes(linked);
//     setOpenLinkDialog(true);
//   };

//   const handleCloseLinkDialog = () => {
//     setOpenLinkDialog(false);
//     setSelectedPropertyType(null);
//     setSelectedAttributes([]);
//   };

//   // 📝 NEW: Handler for removing a chip
//   const handleRemoveChip = (attributeToRemove) => () => {
//     setSelectedAttributes((currentAttributes) =>
//       currentAttributes.filter(
//         (attribute) => attribute.id !== attributeToRemove.id
//       )
//     );
//   };

//   // Handlers for CRUD Operations
//   const handleCreate = () => {
//     if (newAttributeName.trim() && newAttributeType) {
//       dispatch(
//         createAttribute({ name: newAttributeName, type: newAttributeType })
//       ).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "Attribute created successfully!",
//             severity: "success",
//           });
//           handleCloseCreateDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to create attribute.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleUpdate = () => {
//     if (currentAttribute && updateAttributeName.trim() && updateAttributeType) {
//       dispatch(
//         updateAttribute({
//           id: currentAttribute.id,
//           updatedData: { name: updateAttributeName, type: updateAttributeType },
//         })
//       ).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "Attribute updated successfully!",
//             severity: "success",
//           });
//           handleCloseUpdateDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to update attribute.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleDelete = () => {
//     if (currentAttribute) {
//       dispatch(deleteAttribute(currentAttribute.id)).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "Attribute deleted successfully!",
//             severity: "success",
//           });
//           handleCloseDeleteDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to delete attribute.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleLinkAttributes = () => {
//     if (selectedPropertyType) {
//       const attributeIds = selectedAttributes.map((attr) => attr.id);
//       const data = {
//         propertyTypeId: selectedPropertyType.id,
//         attributeIds: attributeIds,
//       };

//       dispatch(linkAttributesToPropertyType({ data })).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "Attributes linked successfully!",
//             severity: "success",
//           });
//           handleCloseLinkDialog();
//           // 📝 Refetch property types to show the updated links immediately
//           dispatch(fetchPropertyTypes());
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to link attributes.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={4}
//       >
//         <Typography variant="h4" component="h1">
//           Manage Attributes
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleOpenCreateDialog}
//         >
//           Add New Attribute
//         </Button>
//       </Box>

//       {loading && (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       )}

//       {!loading && attributes.length === 0 && (
//         <Typography variant="h6" color="text.secondary" align="center" mt={4}>
//           No attributes found.
//         </Typography>
//       )}

//       {!loading && attributes.length > 0 && (
//         <List>
//           {attributes.map((attribute) => (
//             <ListItem
//               key={attribute.id}
//               divider
//               secondaryAction={
//                 <>
//                   <IconButton
//                     edge="end"
//                     aria-label="edit"
//                     onClick={() => handleOpenUpdateDialog(attribute)}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     edge="end"
//                     aria-label="delete"
//                     onClick={() => handleOpenDeleteDialog(attribute)}
//                     sx={{ ml: 1 }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </>
//               }
//             >
//               <ListItemText primary={attribute.name} secondary={attribute.type} />
//             </ListItem>
//           ))}
//         </List>
//       )}

//       {/* Feature to link attributes to property types */}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h5" component="h2" mb={2}>
//           Link Attributes to Property Types
//         </Typography>
//         <List>
//           {propertyTypes.map((propertyType) => (
//             <ListItem key={propertyType.id} divider>
//               <ListItemText primary={propertyType.name} />
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={() => handleOpenLinkDialog(propertyType)}
//               >
//                 Manage Attributes
//               </Button>
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Create Dialog */}
//       <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
//         <DialogTitle>Create New Attribute</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Attribute Name"
//             fullWidth
//             variant="outlined"
//             value={newAttributeName}
//             onChange={(e) => setNewAttributeName(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <FormControl fullWidth>
//             <InputLabel>Attribute Type</InputLabel>
//             <Select
//               value={newAttributeType}
//               label="Attribute Type"
//               onChange={(e) => setNewAttributeType(e.target.value)}
//             >
//               <MenuItem value={AttributeType.NUMBER}>Number</MenuItem>
//               <MenuItem value={AttributeType.BOOLEAN}>Boolean</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseCreateDialog}>Cancel</Button>
//           <Button
//             onClick={handleCreate}
//             disabled={!newAttributeName.trim() || !newAttributeType}
//           >
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Update Dialog */}
//       <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
//         <DialogTitle>Update Attribute</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Attribute Name"
//             fullWidth
//             variant="outlined"
//             value={updateAttributeName}
//             onChange={(e) => setUpdateAttributeName(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <FormControl fullWidth>
//             <InputLabel>Attribute Type</InputLabel>
//             <Select
//               value={updateAttributeType}
//               label="Attribute Type"
//               onChange={(e) => setUpdateAttributeType(e.target.value)}
//             >
//               <MenuItem value={AttributeType.NUMBER}>Number</MenuItem>
//               <MenuItem value={AttributeType.BOOLEAN}>Boolean</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
//           <Button
//             onClick={handleUpdate}
//             disabled={!updateAttributeName.trim() || !updateAttributeType}
//           >
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete the attribute "
//             {currentAttribute?.name}"?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
//           <Button onClick={handleDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Link Attributes Dialog */}
//       <Dialog open={openLinkDialog} onClose={handleCloseLinkDialog} fullWidth>
//         <DialogTitle>
//           Link Attributes to {selectedPropertyType?.name}
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="body1" gutterBottom>
//             Select the attributes you want to link to this property type.
//           </Typography>
//           <Autocomplete
//             multiple
//             id="attributes-link-autocomplete"
//             options={attributes}
//             getOptionLabel={(option) => option.name}
//             value={selectedAttributes}
//             onChange={(event, newValue) => {
//               setSelectedAttributes(newValue);
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 variant="outlined"
//                 label="Select Attributes"
//                 placeholder="Attributes"
//               />
//             )}
//             // 📝 UPDATED: Added onDelete to the Chip component
//             renderTags={(value, getTagProps) =>
//               value.map((option, index) => (
//                 <Chip
//                   variant="outlined"
//                   label={option.name}
//                   {...getTagProps({ index })}
//                   onDelete={handleRemoveChip(option)}
//                 />
//               ))
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseLinkDialog}>Cancel</Button>
//           <Button onClick={handleLinkAttributes} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next"; // Import useTranslation
import {
  fetchAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  linkAttributesToPropertyType,
} from "../../redux/attribute/attributeSlice";
import { fetchPropertyTypes } from "../../redux/property type/propertyTypeSlice";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

// Define AttributeType enum based on your backend
const AttributeType = {
  NUMBER: "number",
  BOOLEAN: "boolean",
};

export default function ManageAttributePage() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(); // Use the hook
  const { attributes, loading, error } = useSelector(
    (state) => state.attribute
  );
  const { propertyTypes } = useSelector((state) => state.propertyType);

  // Dialog and state for basic attribute management (Create, Update, Delete)
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState(null);
  const [newAttributeName, setNewAttributeName] = useState("");
  const [newAttributeType, setNewAttributeType] = useState(
    AttributeType.NUMBER
  );
  const [updateAttributeName, setUpdateAttributeName] = useState("");
  const [updateAttributeType, setUpdateAttributeType] = useState("");

  // Dialog and state for linking attributes to a property type
  const [openLinkDialog, setOpenLinkDialog] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchAttributes());
    dispatch(fetchPropertyTypes());
  }, [dispatch]);

  // Adjust direction based on current language
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n, i18n.language]);

  // Handlers for Dialogs
  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
    setNewAttributeName("");
    setNewAttributeType(AttributeType.NUMBER);
  };

  const handleOpenUpdateDialog = (attribute) => {
    setCurrentAttribute(attribute);
    setUpdateAttributeName(attribute.name);
    setUpdateAttributeType(attribute.type);
    setOpenUpdateDialog(true);
  };
  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setCurrentAttribute(null);
    setUpdateAttributeName("");
    setUpdateAttributeType("");
  };

  const handleOpenDeleteDialog = (attribute) => {
    setCurrentAttribute(attribute);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentAttribute(null);
  };

  const handleOpenLinkDialog = (propertyType) => {
    setSelectedPropertyType(propertyType);
    const linked = propertyType.attributes.map((linkedAttr) => linkedAttr.attribute);
    setSelectedAttributes(linked);
    setOpenLinkDialog(true);
  };

  const handleCloseLinkDialog = () => {
    setOpenLinkDialog(false);
    setSelectedPropertyType(null);
    setSelectedAttributes([]);
  };

  const handleRemoveChip = (attributeToRemove) => () => {
    setSelectedAttributes((currentAttributes) =>
      currentAttributes.filter(
        (attribute) => attribute.id !== attributeToRemove.id
      )
    );
  };

  // Handlers for CRUD Operations
  const handleCreate = () => {
    if (newAttributeName.trim() && newAttributeType) {
      dispatch(
        createAttribute({ name: newAttributeName, type: newAttributeType })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setSnackbar({
            open: true,
            message: t("manageAttribute.createSuccess"),
            severity: "success",
          });
          handleCloseCreateDialog();
        } else {
          setSnackbar({
            open: true,
            message: res.payload?.message || t("manageAttribute.createFailure"),
            severity: "error",
          });
        }
      });
    }
  };

  const handleUpdate = () => {
    if (currentAttribute && updateAttributeName.trim() && updateAttributeType) {
      dispatch(
        updateAttribute({
          id: currentAttribute.id,
          updatedData: { name: updateAttributeName, type: updateAttributeType },
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setSnackbar({
            open: true,
            message: t("manageAttribute.updateSuccess"),
            severity: "success",
          });
          handleCloseUpdateDialog();
        } else {
          setSnackbar({
            open: true,
            message: res.payload?.message || t("manageAttribute.updateFailure"),
            severity: "error",
          });
        }
      });
    }
  };

  const handleDelete = () => {
    if (currentAttribute) {
      dispatch(deleteAttribute(currentAttribute.id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setSnackbar({
            open: true,
            message: t("manageAttribute.deleteSuccess"),
            severity: "success",
          });
          handleCloseDeleteDialog();
        } else {
          setSnackbar({
            open: true,
            message: res.payload?.message || t("manageAttribute.deleteFailure"),
            severity: "error",
          });
        }
      });
    }
  };

  const handleLinkAttributes = () => {
    if (selectedPropertyType) {
      const attributeIds = selectedAttributes.map((attr) => attr.id);
      const data = {
        propertyTypeId: selectedPropertyType.id,
        attributeIds: attributeIds,
      };

      dispatch(linkAttributesToPropertyType({ data })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setSnackbar({
            open: true,
            message: t("manageAttribute.linkSuccess"),
            severity: "success",
          });
          handleCloseLinkDialog();
          dispatch(fetchPropertyTypes());
        } else {
          setSnackbar({
            open: true,
            message: res.payload?.message || t("manageAttribute.linkFailure"),
            severity: "error",
          });
        }
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const translateAttributeType = (type) => {
    switch (type) {
      case AttributeType.NUMBER:
        return t("manageAttribute.number");
      case AttributeType.BOOLEAN:
        return t("manageAttribute.boolean");
      default:
        return type;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1">
          {t("manageAttribute.title")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
        >
          {t("manageAttribute.addNewAttribute")}
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {!loading && attributes.length === 0 && (
        <Typography variant="h6" color="text.secondary" align="center" mt={4}>
          {t("manageAttribute.noAttributesFound")}
        </Typography>
      )}

      {!loading && attributes.length > 0 && (
        <List>
          {attributes.map((attribute) => (
            <ListItem
              key={attribute.id}
              divider
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label={t("manageAttribute.edit")}
                    onClick={() => handleOpenUpdateDialog(attribute)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label={t("manageAttribute.delete")}
                    onClick={() => handleOpenDeleteDialog(attribute)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={attribute.name}
                secondary={translateAttributeType(attribute.type)}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Feature to link attributes to property types */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" mb={2}>
          {t("manageAttribute.linkTitle")}
        </Typography>
        <List>
          {propertyTypes.map((propertyType) => (
            <ListItem key={propertyType.id} divider>
              <ListItemText primary={propertyType.name} />
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleOpenLinkDialog(propertyType)}
              >
                {t("manageAttribute.manageAttributes")}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
        <DialogTitle>{t("manageAttribute.createDialogTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t("manageAttribute.attributeNameLabel")}
            fullWidth
            variant="outlined"
            value={newAttributeName}
            onChange={(e) => setNewAttributeName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>{t("manageAttribute.attributeTypeLabel")}</InputLabel>
            <Select
              value={newAttributeType}
              label={t("manageAttribute.attributeTypeLabel")}
              onChange={(e) => setNewAttributeType(e.target.value)}
            >
              <MenuItem value={AttributeType.NUMBER}>{t("manageAttribute.number")}</MenuItem>
              <MenuItem value={AttributeType.BOOLEAN}>{t("manageAttribute.boolean")}</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>{t("manageAttribute.cancel")}</Button>
          <Button
            onClick={handleCreate}
            disabled={!newAttributeName.trim() || !newAttributeType}
          >
            {t("manageAttribute.create")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>{t("manageAttribute.updateDialogTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t("manageAttribute.attributeNameLabel")}
            fullWidth
            variant="outlined"
            value={updateAttributeName}
            onChange={(e) => setUpdateAttributeName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>{t("manageAttribute.attributeTypeLabel")}</InputLabel>
            <Select
              value={updateAttributeType}
              label={t("manageAttribute.attributeTypeLabel")}
              onChange={(e) => setUpdateAttributeType(e.target.value)}
            >
              <MenuItem value={AttributeType.NUMBER}>{t("manageAttribute.number")}</MenuItem>
              <MenuItem value={AttributeType.BOOLEAN}>{t("manageAttribute.boolean")}</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>{t("manageAttribute.cancel")}</Button>
          <Button
            onClick={handleUpdate}
            disabled={!updateAttributeName.trim() || !updateAttributeType}
          >
            {t("manageAttribute.update")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{t("manageAttribute.deleteDialogTitle")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("manageAttribute.deleteConfirmation", {
              name: currentAttribute?.name,
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>{t("manageAttribute.cancel")}</Button>
          <Button onClick={handleDelete} color="error">
            {t("manageAttribute.delete")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Link Attributes Dialog */}
      <Dialog open={openLinkDialog} onClose={handleCloseLinkDialog} fullWidth>
        <DialogTitle>
          {t("manageAttribute.linkDialogTitle", {
            propertyName: selectedPropertyType?.name,
          })}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {t("manageAttribute.linkDialogDescription")}
          </Typography>
          <Autocomplete
            multiple
            id="attributes-link-autocomplete"
            options={attributes}
            getOptionLabel={(option) => option.name}
            value={selectedAttributes}
            onChange={(event, newValue) => {
              setSelectedAttributes(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={t("manageAttribute.selectAttributesPlaceholder")}
                placeholder={t("manageAttribute.selectAttributesPlaceholder")}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                  onDelete={handleRemoveChip(option)}
                />
              ))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLinkDialog}>{t("manageAttribute.cancel")}</Button>
          <Button onClick={handleLinkAttributes} variant="contained">
            {t("manageAttribute.save")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}