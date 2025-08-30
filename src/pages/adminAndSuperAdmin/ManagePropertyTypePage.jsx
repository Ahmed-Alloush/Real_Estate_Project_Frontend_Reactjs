// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchPropertyTypes,
//   createPropertyType,
//   updatePropertyType,
//   deletePropertyType
// } from "../../redux/property type/propertyTypeSlice";
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Snackbar,
//   Alert,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// // The enum from your backend
// const TypeOfPropertyType = {
//   RESIDENTIAL: 'residential',
//   COMMERCIAL: 'commercial',
//   AGRICULTURAL: 'agricultural',
//   INDUSTRIAL: 'industrial'
// };

// export default function ManagePropertyTypePage() {
//   const dispatch = useDispatch();
//   const { propertyTypes, loading, error } = useSelector(
//     (state) => state.propertyType // Corrected to use 'propertyType' slice
//   );

//   const [openCreateDialog, setOpenCreateDialog] = useState(false);
//   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [currentPropertyType, setCurrentPropertyType] = useState(null);
//   const [newPropertyTypeName, setNewPropertyTypeName] = useState("");
//   const [newPropertyTypeType, setNewPropertyTypeType] = useState(TypeOfPropertyType.RESIDENTIAL);
//   const [updatePropertyTypeName, setUpdatePropertyTypeName] = useState("");
//   const [updatePropertyTypeType, setUpdatePropertyTypeType] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     dispatch(fetchPropertyTypes());
//   }, [dispatch]);

//   // Handlers for Dialogs
//   const handleOpenCreateDialog = () => setOpenCreateDialog(true);
//   const handleCloseCreateDialog = () => {
//     setOpenCreateDialog(false);
//     setNewPropertyTypeName("");
//     setNewPropertyTypeType(TypeOfPropertyType.RESIDENTIAL);
//   };

//   const handleOpenUpdateDialog = (propertyType) => {
//     setCurrentPropertyType(propertyType);
//     setUpdatePropertyTypeName(propertyType.name);
//     setUpdatePropertyTypeType(propertyType.type);
//     setOpenUpdateDialog(true);
//   };

//   const handleCloseUpdateDialog = () => {
//     setOpenUpdateDialog(false);
//     setCurrentPropertyType(null);
//     setUpdatePropertyTypeName("");
//     setUpdatePropertyTypeType("");
//   };

//   const handleOpenDeleteDialog = (propertyType) => {
//     setCurrentPropertyType(propertyType);
//     setOpenDeleteDialog(true);
//   };
//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//     setCurrentPropertyType(null);
//   };

//   // Handlers for CRUD Operations
//   const handleCreate = () => {
//     if (newPropertyTypeName && newPropertyTypeType) {
//       dispatch(createPropertyType({ name: newPropertyTypeName, type: newPropertyTypeType })).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "Property type created successfully!",
//             severity: "success",
//           });
//           handleCloseCreateDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to create property type.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleUpdate = () => {
//     if (currentPropertyType && updatePropertyTypeName && updatePropertyTypeType) {
//       dispatch(
//         updatePropertyType({
//           id: currentPropertyType.id,
//           updatedData: { name: updatePropertyTypeName, type: updatePropertyTypeType },
//         })
//       ).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "Property type updated successfully!",
//             severity: "success",
//           });
//           handleCloseUpdateDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to update property type.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleDelete = () => {
//     if (currentPropertyType) {
//       dispatch(deletePropertyType(currentPropertyType.id)).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "Property type deleted successfully!",
//             severity: "success",
//           });
//           handleCloseDeleteDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to delete property type.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={4}
//       >
//         <Typography variant="h4" component="h1">
//           Manage Property Types
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleOpenCreateDialog}
//         >
//           Add New Type
//         </Button>
//       </Box>

//       {loading && (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       )}

//       {!loading && propertyTypes.length === 0 && (
//         <Typography variant="h6" color="text.secondary" align="center" mt={4}>
//           No property types found.
//         </Typography>
//       )}

//       {!loading && propertyTypes.length > 0 && (
//         <List>
//           {propertyTypes.map((type) => (
//             <ListItem
//               key={type.id}
//               divider
//               secondaryAction={
//                 <>
//                   <IconButton
//                     edge="end"
//                     aria-label="edit"
//                     onClick={() => handleOpenUpdateDialog(type)}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     edge="end"
//                     aria-label="delete"
//                     onClick={() => handleOpenDeleteDialog(type)}
//                     sx={{ ml: 1 }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </>
//               }
//             >
//               <ListItemText primary={type.name} secondary={type.type} />
//             </ListItem>
//           ))}
//         </List>
//       )}

//       {/* Create Dialog */}
//       <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
//         <DialogTitle>Create New Property Type</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Property Type Name"
//             fullWidth
//             variant="outlined"
//             value={newPropertyTypeName}
//             onChange={(e) => setNewPropertyTypeName(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <FormControl fullWidth>
//             <InputLabel>Property Type</InputLabel>
//             <Select
//               value={newPropertyTypeType}
//               label="Property Type"
//               onChange={(e) => setNewPropertyTypeType(e.target.value)}
//             >
//               {Object.values(TypeOfPropertyType).map((type) => (
//                 <MenuItem key={type} value={type}>
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseCreateDialog}>Cancel</Button>
//           <Button onClick={handleCreate} disabled={!newPropertyTypeName.trim()}>
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Update Dialog */}
//       <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
//         <DialogTitle>Update Property Type</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Property Type Name"
//             fullWidth
//             variant="outlined"
//             value={updatePropertyTypeName}
//             onChange={(e) => setUpdatePropertyTypeName(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <FormControl fullWidth>
//             <InputLabel>Property Type</InputLabel>
//             <Select
//               value={updatePropertyTypeType}
//               label="Property Type"
//               onChange={(e) => setUpdatePropertyTypeType(e.target.value)}
//             >
//               {Object.values(TypeOfPropertyType).map((type) => (
//                 <MenuItem key={type} value={type}>
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
//           <Button
//             onClick={handleUpdate}
//             disabled={!updatePropertyTypeName.trim()}
//           >
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete the property type "
//             {currentPropertyType?.name}"?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
//           <Button onClick={handleDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }





import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next"; // Import useTranslation
import {
  fetchPropertyTypes,
  createPropertyType,
  updatePropertyType,
  deletePropertyType
} from "../../redux/property type/propertyTypeSlice";
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
  FormControl
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

// The enum from your backend
const TypeOfPropertyType = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
  AGRICULTURAL: 'agricultural',
  INDUSTRIAL: 'industrial'
};

export default function ManagePropertyTypePage() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(); // Use the hook
  const { propertyTypes, loading, error } = useSelector(
    (state) => state.propertyType
  );

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentPropertyType, setCurrentPropertyType] = useState(null);
  const [newPropertyTypeName, setNewPropertyTypeName] = useState("");
  const [newPropertyTypeType, setNewPropertyTypeType] = useState(TypeOfPropertyType.RESIDENTIAL);
  const [updatePropertyTypeName, setUpdatePropertyTypeName] = useState("");
  const [updatePropertyTypeType, setUpdatePropertyTypeType] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
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
    setNewPropertyTypeName("");
    setNewPropertyTypeType(TypeOfPropertyType.RESIDENTIAL);
  };

  const handleOpenUpdateDialog = (propertyType) => {
    setCurrentPropertyType(propertyType);
    setUpdatePropertyTypeName(propertyType.name);
    setUpdatePropertyTypeType(propertyType.type);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setCurrentPropertyType(null);
    setUpdatePropertyTypeName("");
    setUpdatePropertyTypeType("");
  };

  const handleOpenDeleteDialog = (propertyType) => {
    setCurrentPropertyType(propertyType);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentPropertyType(null);
  };

  // Handlers for CRUD Operations
  const handleCreate = () => {
    if (newPropertyTypeName && newPropertyTypeType) {
      dispatch(createPropertyType({ name: newPropertyTypeName, type: newPropertyTypeType })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setSnackbar({
            open: true,
            message: t("managePropertyType.createSuccess"),
            severity: "success",
          });
          handleCloseCreateDialog();
        } else {
          setSnackbar({
            open: true,
            message: res.payload?.message || t("managePropertyType.createFailure"),
            severity: "error",
          });
        }
      });
    }
  };

  const handleUpdate = () => {
    if (currentPropertyType && updatePropertyTypeName && updatePropertyTypeType) {
      dispatch(
        updatePropertyType({
          id: currentPropertyType.id,
          updatedData: { name: updatePropertyTypeName, type: updatePropertyTypeType },
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setSnackbar({
            open: true,
            message: t("managePropertyType.updateSuccess"),
            severity: "success",
          });
          handleCloseUpdateDialog();
        } else {
          setSnackbar({
            open: true,
            message: res.payload?.message || t("managePropertyType.updateFailure"),
            severity: "error",
          });
        }
      });
    }
  };

  const handleDelete = () => {
    if (currentPropertyType) {
      dispatch(deletePropertyType(currentPropertyType.id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setSnackbar({
            open: true,
            message: t("managePropertyType.deleteSuccess"),
            severity: "success",
          });
          handleCloseDeleteDialog();
        } else {
          setSnackbar({
            open: true,
            message: res.payload?.message || t("managePropertyType.deleteFailure"),
            severity: "error",
          });
        }
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Function to translate the enum values
  const translatePropertyType = (type) => {
    switch (type) {
      case TypeOfPropertyType.RESIDENTIAL:
        return t("managePropertyType.residential");
      case TypeOfPropertyType.COMMERCIAL:
        return t("managePropertyType.commercial");
      case TypeOfPropertyType.AGRICULTURAL:
        return t("managePropertyType.agricultural");
      case TypeOfPropertyType.INDUSTRIAL:
        return t("managePropertyType.industrial");
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
          {t("managePropertyType.title")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
        >
          {t("managePropertyType.addNewType")}
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {!loading && propertyTypes.length === 0 && (
        <Typography variant="h6" color="text.secondary" align="center" mt={4}>
          {t("managePropertyType.noTypesFound")}
        </Typography>
      )}

      {!loading && propertyTypes.length > 0 && (
        <List>
          {propertyTypes.map((type) => (
            <ListItem
              key={type.id}
              divider
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label={t("managePropertyType.edit")}
                    onClick={() => handleOpenUpdateDialog(type)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label={t("managePropertyType.delete")}
                    onClick={() => handleOpenDeleteDialog(type)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={type.name}
                secondary={translatePropertyType(type.type)}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
        <DialogTitle>{t("managePropertyType.createDialogTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t("managePropertyType.typeNameLabel")}
            fullWidth
            variant="outlined"
            value={newPropertyTypeName}
            onChange={(e) => setNewPropertyTypeName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>{t("managePropertyType.typeLabel")}</InputLabel>
            <Select
              value={newPropertyTypeType}
              label={t("managePropertyType.typeLabel")}
              onChange={(e) => setNewPropertyTypeType(e.target.value)}
            >
              {Object.values(TypeOfPropertyType).map((type) => (
                <MenuItem key={type} value={type}>
                  {translatePropertyType(type)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>{t("managePropertyType.cancel")}</Button>
          <Button onClick={handleCreate} disabled={!newPropertyTypeName.trim()}>
            {t("managePropertyType.create")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>{t("managePropertyType.updateDialogTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t("managePropertyType.typeNameLabel")}
            fullWidth
            variant="outlined"
            value={updatePropertyTypeName}
            onChange={(e) => setUpdatePropertyTypeName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>{t("managePropertyType.typeLabel")}</InputLabel>
            <Select
              value={updatePropertyTypeType}
              label={t("managePropertyType.typeLabel")}
              onChange={(e) => setUpdatePropertyTypeType(e.target.value)}
            >
              {Object.values(TypeOfPropertyType).map((type) => (
                <MenuItem key={type} value={type}>
                  {translatePropertyType(type)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>{t("managePropertyType.cancel")}</Button>
          <Button
            onClick={handleUpdate}
            disabled={!updatePropertyTypeName.trim()}
          >
            {t("managePropertyType.update")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{t("managePropertyType.deleteDialogTitle")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("managePropertyType.deleteConfirmation", {
              name: currentPropertyType?.name,
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>{t("managePropertyType.cancel")}</Button>
          <Button onClick={handleDelete} color="error">
            {t("managePropertyType.delete")}
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