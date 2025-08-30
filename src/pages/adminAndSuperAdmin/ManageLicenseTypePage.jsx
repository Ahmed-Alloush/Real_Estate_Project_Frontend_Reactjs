// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchLicenseTypes,
//   createLicenseType,
//   updateLicenseType,
//   deleteLicenseType,
// } from "../../redux/license type/licenseTypeSlice";
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
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// export default function ManageLicenseTypePage() {
//   const dispatch = useDispatch();
//   const { licenseTypes, loading, error } = useSelector(
//     (state) => state.licenseType
//   );

//   const [openCreateDialog, setOpenCreateDialog] = useState(false);
//   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [currentLicenseType, setCurrentLicenseType] = useState(null);
//   const [newLicenseTypeName, setNewLicenseTypeName] = useState("");
//   const [updateLicenseTypeName, setUpdateLicenseTypeName] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     dispatch(fetchLicenseTypes());
//   }, [dispatch]);

//   // Handlers for Dialogs
//   const handleOpenCreateDialog = () => setOpenCreateDialog(true);
//   const handleCloseCreateDialog = () => {
//     setOpenCreateDialog(false);
//     setNewLicenseTypeName("");
//   };

//   const handleOpenUpdateDialog = (licenseType) => {
//     setCurrentLicenseType(licenseType);
//     setUpdateLicenseTypeName(licenseType.name);
//     setOpenUpdateDialog(true);
//   };
//   const handleCloseUpdateDialog = () => {
//     setOpenUpdateDialog(false);
//     setCurrentLicenseType(null);
//     setUpdateLicenseTypeName("");
//   };

//   const handleOpenDeleteDialog = (licenseType) => {
//     setCurrentLicenseType(licenseType);
//     setOpenDeleteDialog(true);
//   };
//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//     setCurrentLicenseType(null);
//   };

//   // Handlers for CRUD Operations
//   const handleCreate = () => {
//     if (newLicenseTypeName) {
//       dispatch(createLicenseType({ name: newLicenseTypeName })).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "License type created successfully!",
//             severity: "success",
//           });
//           handleCloseCreateDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to create license type.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleUpdate = () => {
//     if (currentLicenseType && updateLicenseTypeName) {
//       dispatch(
//         updateLicenseType({
//           id: currentLicenseType.id,
//           updatedData: { name: updateLicenseTypeName },
//         })
//       ).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "License type updated successfully!",
//             severity: "success",
//           });
//           handleCloseUpdateDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to update license type.",
//             severity: "error",
//           });
//         }
//       });
//     }
//   };

//   const handleDelete = () => {
//     if (currentLicenseType) {
//       dispatch(deleteLicenseType(currentLicenseType.id)).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           setSnackbar({
//             open: true,
//             message: "License type deleted successfully!",
//             severity: "success",
//           });
//           handleCloseDeleteDialog();
//         } else {
//           setSnackbar({
//             open: true,
//             message: res.payload?.message || "Failed to delete license type.",
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
//           Manage License Types
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleOpenCreateDialog}
//         >
//           Add New Type
//         </Button>
//       </Box>

//       {loading && (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       )}

//       {!loading && licenseTypes.length === 0 && (
//         <Typography variant="h6" color="text.secondary" align="center" mt={4}>
//           No license types found.
//         </Typography>
//       )}

//       {!loading && licenseTypes.length > 0 && (
//         <List>
//           {licenseTypes.map((type) => (
//             <ListItem
//               key={type.id}
//               divider
//               secondaryAction={
//                 <>
//                   <IconButton
//                     edge="end"
//                     aria-label="edit"
//                     onClick={() => handleOpenUpdateDialog(type)}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     edge="end"
//                     aria-label="delete"
//                     onClick={() => handleOpenDeleteDialog(type)}
//                     sx={{ ml: 1 }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </>
//               }
//             >
//               <ListItemText primary={type.name} />
//             </ListItem>
//           ))}
//         </List>
//       )}

//       {/* Create Dialog */}
//       <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
//         <DialogTitle>Create New License Type</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="License Type Name"
//             fullWidth
//             variant="outlined"
//             value={newLicenseTypeName}
//             onChange={(e) => setNewLicenseTypeName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseCreateDialog}>Cancel</Button>
//           <Button onClick={handleCreate} disabled={!newLicenseTypeName.trim()}>
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Update Dialog */}
//       <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
//         <DialogTitle>Update License Type</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="License Type Name"
//             fullWidth
//             variant="outlined"
//             value={updateLicenseTypeName}
//             onChange={(e) => setUpdateLicenseTypeName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
//           <Button
//             onClick={handleUpdate}
//             disabled={!updateLicenseTypeName.trim()}
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
//             Are you sure you want to delete the license type "
//             {currentLicenseType?.name}"?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
//           <Button onClick={handleDelete} color="error">
//             Delete
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
  fetchLicenseTypes,
  createLicenseType,
  updateLicenseType,
  deleteLicenseType,
} from "../../redux/license type/licenseTypeSlice";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function ManageLicenseTypePage() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(); // Use the hook
  const { licenseTypes, loading, error } = useSelector(
    (state) => state.licenseType
  );

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentLicenseType, setCurrentLicenseType] = useState(null);
  const [newLicenseTypeName, setNewLicenseTypeName] = useState("");
  const [updateLicenseTypeName, setUpdateLicenseTypeName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchLicenseTypes());
  }, [dispatch]);

  // Adjust direction based on current language
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n, i18n.language]);

  // Handlers for Dialogs
  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
    setNewLicenseTypeName("");
  };

  const handleOpenUpdateDialog = (licenseType) => {
    setCurrentLicenseType(licenseType);
    setUpdateLicenseTypeName(licenseType.name);
    setOpenUpdateDialog(true);
  };
  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setCurrentLicenseType(null);
    setUpdateLicenseTypeName("");
  };

  const handleOpenDeleteDialog = (licenseType) => {
    setCurrentLicenseType(licenseType);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentLicenseType(null);
  };

  // Handlers for CRUD Operations
  const handleCreate = () => {
    if (newLicenseTypeName) {
      dispatch(createLicenseType({ name: newLicenseTypeName })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setSnackbar({
            open: true,
            message: t("manageLicenseType.createSuccess"),
            severity: "success",
          });
          handleCloseCreateDialog();
        } else {
          setSnackbar({
            open: true,
            message: res.payload?.message || t("manageLicenseType.createFailure"),
            severity: "error",
          });
        }
      });
    }
  };

  const handleUpdate = () => {
    if (currentLicenseType && updateLicenseTypeName) {
      dispatch(
        updateLicenseType({
          id: currentLicenseType.id,
          updatedData: { name: updateLicenseTypeName },
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setSnackbar({
            open: true,
            message: t("manageLicenseType.updateSuccess"),
            severity: "success",
          });
          handleCloseUpdateDialog();
        } else {
          setSnackbar({
            open: true,
            message: res.payload?.message || t("manageLicenseType.updateFailure"),
            severity: "error",
          });
        }
      });
    }
  };

  const handleDelete = () => {
    if (currentLicenseType) {
      dispatch(deleteLicenseType(currentLicenseType.id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setSnackbar({
            open: true,
            message: t("manageLicenseType.deleteSuccess"),
            severity: "success",
          });
          handleCloseDeleteDialog();
        } else {
          setSnackbar({
            open: true,
            message: res.payload?.message || t("manageLicenseType.deleteFailure"),
            severity: "error",
          });
        }
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
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
          {t("manageLicenseType.title")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
        >
          {t("manageLicenseType.addNewType")}
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {!loading && licenseTypes.length === 0 && (
        <Typography variant="h6" color="text.secondary" align="center" mt={4}>
          {t("manageLicenseType.noTypesFound")}
        </Typography>
      )}

      {!loading && licenseTypes.length > 0 && (
        <List>
          {licenseTypes.map((type) => (
            <ListItem
              key={type.id}
              divider
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label={t("manageLicenseType.edit")}
                    onClick={() => handleOpenUpdateDialog(type)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label={t("manageLicenseType.delete")}
                    onClick={() => handleOpenDeleteDialog(type)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={type.name} />
            </ListItem>
          ))}
        </List>
      )}

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
        <DialogTitle>{t("manageLicenseType.createDialogTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t("manageLicenseType.typeNameLabel")}
            fullWidth
            variant="outlined"
            value={newLicenseTypeName}
            onChange={(e) => setNewLicenseTypeName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>{t("manageLicenseType.cancel")}</Button>
          <Button onClick={handleCreate} disabled={!newLicenseTypeName.trim()}>
            {t("manageLicenseType.create")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>{t("manageLicenseType.updateDialogTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t("manageLicenseType.typeNameLabel")}
            fullWidth
            variant="outlined"
            value={updateLicenseTypeName}
            onChange={(e) => setUpdateLicenseTypeName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>{t("manageLicenseType.cancel")}</Button>
          <Button
            onClick={handleUpdate}
            disabled={!updateLicenseTypeName.trim()}
          >
            {t("manageLicenseType.update")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{t("manageLicenseType.deleteDialogTitle")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("manageLicenseType.deleteConfirmation", {
              name: currentLicenseType?.name,
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>{t("manageLicenseType.cancel")}</Button>
          <Button onClick={handleDelete} color="error">
            {t("manageLicenseType.delete")}
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