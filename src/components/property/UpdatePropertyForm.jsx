import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPropertyAttribute,
  updateProperty,
} from "../../redux/property/propertySlice";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Grid } from "@mui/material";
import Swal from "sweetalert2";

const UpdatePropertyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { properties, loading, message } = useSelector(
    (state) => state.property
  );
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    dispatch(resetPropertyAttribute());
  }, []);

  useEffect(() => {
    const property = properties.find((property) => property.id === id);
    if (property) {
      setPropertyData(property);
    }
  }, [id, properties]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProperty({ id, updatedData: propertyData })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        Swal.fire("Property Updating Success", message, "success");
        navigate("/property");
      }
    });
  };

  if (!propertyData) return <Typography>Property not found</Typography>;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Property Number"
        name="propertyNumber"
        value={propertyData.propertyNumber}
        onChange={handleInputChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Property Type"
        name="propertyType"
        value={propertyData.propertyType}
        onChange={handleInputChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Space"
        name="space"
        value={propertyData.space}
        onChange={handleInputChange}
        type="number"
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Price"
        name="price"
        value={propertyData.price}
        onChange={handleInputChange}
        type="number"
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button variant="contained" type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Property"}
      </Button>
    </form>
  );
};

export default UpdatePropertyForm;
