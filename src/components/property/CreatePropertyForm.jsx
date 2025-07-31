import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProperty } from "../../redux/property/propertySlice";
import { getUserByNationalNumber } from "../../redux/auth/authSlice"; // <-- make sure path is correct
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { StyledInputBase } from "../../components/Navbar";

export default function CreatePropertyForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.property);
  const {
    userByNationalNumber,
    userByNationalNumberLoading: getUserLoading,
    userByNationalNumberError: getUserError,
  } = useSelector((state) => state.auth);

  const [searchNationalNumber, setSearchNationalNumber] = useState("");

  const [propertyData, setPropertyData] = useState({
    propertyNumber: "",
    propertyType: "",
    licenseNumber: "",
    licenseType: "",
    space: "",
    price: "",
    description: "",
    attributes: [{ attributeName: "", value: "" }],
    location: {
      governorate: "",
      province: "",
      city: "",
      street: "",
    },
    property_photos: [],
    ownerId: "",
  });

  useEffect(() => {
    if (userByNationalNumber && userByNationalNumber.id) {
      setPropertyData((prev) => ({
        ...prev,
        ownerId: userByNationalNumber.id,
      }));
    }
  }, [userByNationalNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAttributeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAttributes = [...propertyData.attributes];
    updatedAttributes[index][name] = value;
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
    setPropertyData((prev) => ({
      ...prev,
      property_photos: e.target.files,
    }));
  };

  const addAttribute = () => {
    setPropertyData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { attributeName: "", value: "" }],
    }));
  };

  const handleSearchChange = (e) => {
    setSearchNationalNumber(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchNationalNumber) {
      dispatch(getUserByNationalNumber(searchNationalNumber));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProperty(propertyData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
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
        Create Property
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="propertyNumber"
          label="Property Number"
          value={propertyData.propertyNumber}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="propertyType"
          label="Property Type"
          value={propertyData.propertyType}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="licenseNumber"
          label="License Number"
          value={propertyData.licenseNumber}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="licenseType"
          label="License Type"
          value={propertyData.licenseType}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="space"
              label="Space"
              type="number"
              value={propertyData.space}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="price"
              label="Price"
              type="number"
              value={propertyData.price}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <TextField
          name="description"
          label="Description"
          value={propertyData.description}
          onChange={handleInputChange}
          fullWidth
          sx={{ mt: 2 }}
          required
        />

        <Typography variant="h6" sx={{ mt: 3 }}>
          Location
        </Typography>
        <Grid container spacing={2}>
          {["governorate", "province", "city", "street"].map((field) => (
            <Grid item xs={6} key={field}>
              <TextField
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={propertyData.location[field]}
                onChange={handleLocationChange}
                fullWidth
                required
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Attributes
        </Typography>
        {propertyData.attributes.map((attr, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
            <Grid item xs={6}>
              <TextField
                name="attributeName"
                label="Attribute Name"
                value={attr.attributeName}
                onChange={(e) => handleAttributeChange(index, e)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="value"
                label="Value"
                value={attr.value}
                onChange={(e) => handleAttributeChange(index, e)}
                type="number"
                fullWidth
                required
              />
            </Grid>
          </Grid>
        ))}
        <Button onClick={addAttribute} sx={{ mb: 2 }}>
          + Add Attribute
        </Button>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Property Photos
        </Typography>
        <input
          type="file"
          name="property_photos"
          multiple
          onChange={handleFileChange}
        />

        {/* Search Field */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Search Owner by National Number
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "2px solid #1976d2",
            borderRadius: "8px",
            padding: "4px 8px",
            mb: 2,
            width: "300px",
            transition: "width 0.3s ease",
            "&:focus-within": {
              width: "100%",
              borderColor: "#1565c0",
            },
            backgroundColor: "#f9f9f9",
          }}
        >
          <StyledInputBase
            placeholder="Enter National Number…"
            value={searchNationalNumber}
            onChange={handleSearchChange}
            sx={{
              flex: 1,
              padding: "6px",
            }}
          />
          <Button
            onClick={handleSearchSubmit}
            disabled={getUserLoading}
            sx={{
              minWidth: "40px",
              padding: "6px 12px",
              ml: 1,
              backgroundColor: "#1976d2",
              color: "#fff",
              ":hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            <SearchIcon size={18} />
          </Button>
        </Box>

        {getUserLoading && <Typography>Searching...</Typography>}
        {userByNationalNumber && (
          <Typography sx={{ color: "green", mb: 1 }}>
            Owner found: <strong>{userByNationalNumber.full_name}</strong>
          </Typography>
        )}
        {getUserError && (
          <Typography color="error" sx={{ mb: 1 }}>
            {getUserError}
          </Typography>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error.message || "Something went wrong"}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Create Property"}
        </Button>
      </form>
    </Box>
  );
}
