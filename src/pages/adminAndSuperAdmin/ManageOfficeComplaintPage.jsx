import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CardMedia,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import Carousel from "react-material-ui-carousel";
import {
  getAllOfficeComplaints,
  deleteOfficeComplaint,
} from "../../redux/superAdmin/manageOfficeComplaintSlice"; // Assume this new slice exists
import {
  warnUser, // From your provided code
} from "../../redux/superAdmin/superAdminSlice"; // Or wherever your warning thunks are located

function ManageOfficeComplaintPage() {
  const dispatch = useDispatch();
  // Changed state selector to officeComplaint
  const { complaints, loading, error } = useSelector(
    (state) => state.officeComplaint // Assumed state slice name
  );

  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openWarningDialog, setOpenWarningDialog] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [warningRecipient, setWarningRecipient] = useState(null); // 'user' or 'office'

  useEffect(() => {
    // Changed API call to fetch office complaints
    dispatch(getAllOfficeComplaints());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      // Changed delete dispatch action
      dispatch(deleteOfficeComplaint(id));
    }
  };

  const handleCardClick = (complaint) => {
    setSelectedComplaint(complaint);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedComplaint(null);
  };

  const handleOpenWarningDialog = (recipient) => {
    setWarningRecipient(recipient);
    setOpenWarningDialog(true);
  };

  const handleCloseWarningDialog = () => {
    setOpenWarningDialog(false);
    setWarningMessage("");
    setWarningRecipient(null);
  };

  const handleSendWarning = () => {
    if (!selectedComplaint) return;

    if (warningRecipient === "user") {
      dispatch(
        warnUser({
          userId: selectedComplaint.user?.id, // Assumed structure
          reason: warningMessage,
        })
      );
    } else if (warningRecipient === "office") {
      dispatch(
        warnUser({
          userId: selectedComplaint.office?.user?.id, // Assumed structure
          reason: warningMessage,
        })
      );
    }
    handleCloseWarningDialog();
  };

  const formattedDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading === "pending") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Office Complaints 📝
        </Typography>
      </Box>
      {console.log("this is the length : ", complaints)}
      {complaints?.length === 0 ? (
        <Alert severity="info">
          There are no office complaints to display.
        </Alert>
      ) : (
        <Grid container spacing={4}>
          {complaints?.map((complaint) => (
            <Grid item xs={12} sm={6} md={4} key={complaint.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)", cursor: "pointer" },
                }}
                onClick={() => handleCardClick(complaint)}
              >
                {complaint.officeComplaintPhotos &&
                complaint.officeComplaintPhotos.length > 0 ? (
                  <CardMedia
                    component="img"
                    height="194"
                    image={complaint.officeComplaintPhotos[0].url}
                    alt={complaint.title}
                    sx={{ objectFit: "cover" }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://via.placeholder.com/300x194?text=No+Image"
                    alt="No Image Available"
                    sx={{ objectFit: "cover" }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Title: {complaint.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Date: {formattedDate(complaint.date)}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Office Name: {complaint.office?.name || "N/A"}
                  </Typography>
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Content: {complaint.content}
                  </Typography>
                </CardContent>
                <CardActions sx={{ mt: "auto", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedComplaint(complaint);
                      handleOpenWarningDialog("user");
                    }}
                  >
                    Warn User
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedComplaint(complaint);
                      handleOpenWarningDialog("office");
                    }}
                  >
                    Warn Office
                  </Button>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(complaint.id);
                    }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Complaint Detail Dialog */}
      {selectedComplaint && (
        <Dialog
          open={openDetailDialog}
          onClose={handleCloseDetailDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Complaint Details: {selectedComplaint.title}
            <IconButton
              aria-label="close"
              onClick={handleCloseDetailDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" component="h4" gutterBottom>
                  Title: {selectedComplaint.title || "N/A"}
                </Typography>
                <Typography variant="subtitle1" component="h4" gutterBottom>
                  Office Name: {selectedComplaint.office?.name || "N/A"}
                </Typography>
                <Typography variant="subtitle1" component="h4" gutterBottom>
                  Date: {formattedDate(selectedComplaint.date)}
                </Typography>
                <Typography variant="body1" paragraph>
                  Content: {selectedComplaint.content}
                </Typography>
                <Typography variant="body1" paragraph>
                  **Complainant:** {selectedComplaint.user?.first_name || "N/A"}{" "}
                  {selectedComplaint.user?.last_name || ""}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} width={"100%"}>
                <Box sx={{ width: "100%", height: 300 }}>
                  {selectedComplaint.officeComplaintPhotos &&
                  selectedComplaint.officeComplaintPhotos.length > 0 ? (
                    <Carousel
                      autoPlay={false}
                      animation="slide"
                      navButtonsAlwaysVisible
                      height={300}
                      sx={{ backgroundColor: "#f0f0f0", borderRadius: 2 }}
                    >
                      {selectedComplaint.officeComplaintPhotos.map(
                        (photo, i) => (
                          <Box
                            key={i}
                            component="img"
                            src={photo?.url}
                            alt={`Complaint Photo ${i + 1}`}
                            sx={{
                              width: "100%",
                              height: 300,
                              objectFit: "contain",
                              borderRadius: 2,
                            }}
                          />
                        )
                      )}
                    </Carousel>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: 300,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f0f0f0",
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        No photos available for this complaint. 🖼️
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetailDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Warning Dialog */}
      <Dialog
        open={openWarningDialog}
        onClose={handleCloseWarningDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Warn {warningRecipient === "user" ? "User" : "Office"}
          <IconButton
            aria-label="close"
            onClick={handleCloseWarningDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Warning Message"
            multiline
            rows={4}
            fullWidth
            value={warningMessage}
            onChange={(e) => setWarningMessage(e.target.value)}
            variant="outlined"
            helperText={`Send a warning to the ${
              warningRecipient === "user" ? "complainant" : "property office"
            }.`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWarningDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSendWarning}
            color="warning"
            variant="contained"
            disabled={!warningMessage.trim()}
          >
            Send Warning
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManageOfficeComplaintPage;
