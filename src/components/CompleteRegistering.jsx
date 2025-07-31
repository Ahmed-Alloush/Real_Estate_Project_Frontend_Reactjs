import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeRegister } from "../redux/auth/authSlice";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CompleteRegistering() {
  const dispatch = useDispatch();
  const { loading, success, error, role } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    national_number: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (success && role === "user") {
      navigate("/");
    } else if (success && role === "officeManager") {
      navigate("/office-creating");
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("first_name", formData.firstName);
    data.append("last_name", formData.lastName);
    data.append("national_number", formData.national_number);
    data.append("password", formData.password);

    if (image) {
      data.append("profile_photo", image);
    }

    dispatch(completeRegister(data));
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 500,
        margin: "auto",
        mt: 5,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center" color="primary">
        Complete Registration
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              fullWidth
              required
              variant="outlined"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              fullWidth
              required
              variant="outlined"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="national_number"
              label="National Number"
              fullWidth
              required
              variant="outlined"
              value={formData.national_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type="password"
              multiline
              //   rows={3}
              fullWidth
              required
              variant="outlined"
              value={formData.bio}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ py: 1.5 }}
            >
              {image ? image.name : "Upload Profile Image (optional)"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
          {previewImage && (
            <Grid item xs={12}>
              <Box
                component="img"
                src={previewImage}
                alt="Preview"
                sx={{
                  maxHeight: 200,
                  maxWidth: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                  mt: 1,
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Complete Registration"
              )}
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          {success && (
            <Grid item xs={12}>
              <Alert severity="success">
                Registration completed successfully!
              </Alert>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  );
}
