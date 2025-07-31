import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Slider,
  Stack,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Select from 'react-select';

const propertyTypes = ['Apartment', 'Villa', 'Land', 'Commercial'];
const licenseTypes = ['Residential', 'Commercial', 'Industrial'];
const attributeOptions = [
  { value: 'Bedrooms', label: 'Bedrooms' },
  { value: 'Bathrooms', label: 'Bathrooms' },
  { value: 'Floors', label: 'Floors' },
  { value: 'Kitchens', label: 'Kitchens' },
];
const locations = {
  governorates: ['Damascus', 'Aleppo', 'Homs'],
  provinces: ['Eastern', 'Western'],
  cities: ['Damascus', 'Homs', 'Latakia'],
  streets: ['Main Street', 'Al-Thawra', 'Abu Rummaneh'],
};

const FilterBar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    type: '',
    purpose: { selling: false, renting: false },
    price: [0, 1000000],
    space: [0, 1000],
    licenseType: '',
    location: {
      governorate: '',
      province: '',
      city: '',
      street: '',
    },
  });

  const [attributeFilters, setAttributeFilters] = useState([
    // { attribute: '', value: '' },
  ]);

  const handleSliderChange = (key, newValue) => {
    setFilters((prev) => ({ ...prev, [key]: newValue }));
  };

  const handleLocationChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      location: { ...prev.location, [key]: value },
    }));
  };

  const handleAttributeChange = (index, key, value) => {
    const updated = [...attributeFilters];
    updated[index][key] = value;
    setAttributeFilters(updated);
  };

  const addAttributeFilter = () => {
    setAttributeFilters((prev) => [...prev, { attribute: '', value: '' }]);
  };

  const removeAttributeFilter = (index) => {
    setAttributeFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onFilter({ ...filters, attributeFilters });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 4,
        mb: 4,
        maxHeight: '500px',
        overflowY: 'auto',
        backgroundColor: '#fafafa',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filter Properties
      </Typography>

      <Stack spacing={2}>
        {/* Property Type */}
        <TextField
          select
          fullWidth
          label="Property Type"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          {propertyTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        {/* Selling / Renting */}
        <Stack direction="row" spacing={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.purpose.selling}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    purpose: { ...prev.purpose, selling: e.target.checked },
                  }))
                }
              />
            }
            label="Selling"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.purpose.renting}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    purpose: { ...prev.purpose, renting: e.target.checked },
                  }))
                }
              />
            }
            label="Renting"
          />
        </Stack>

        {/* Price Range */}
        <Box>
          <Typography gutterBottom>Price Range ($)</Typography>
          <Slider
            value={filters.price}
            onChange={(e, v) => handleSliderChange('price', v)}
            min={0}
            max={1000000}
            step={10000}
            valueLabelDisplay="auto"
          />
        </Box>

        {/* Space Range */}
        <Box>
          <Typography gutterBottom>Space (m²)</Typography>
          <Slider
            value={filters.space}
            onChange={(e, v) => handleSliderChange('space', v)}
            min={0}
            max={1000}
            step={10}
            valueLabelDisplay="auto"
          />
        </Box>

        {/* License Type */}
        <TextField
          select
          fullWidth
          label="License Type"
          value={filters.licenseType}
          onChange={(e) => setFilters({ ...filters, licenseType: e.target.value })}
        >
          {licenseTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        {/* Attribute Filters */}
        <Divider />
        <Typography variant="subtitle2" mt={2}>
          Attribute Filters
        </Typography>

        <Stack spacing={2}>
          {attributeFilters.map((filter, index) => (
            <Stack key={index} direction="row" spacing={2} alignItems="center">
              <Box sx={{ flex: 1 }}>
                <Select
                  options={attributeOptions}
                  value={attributeOptions.find((opt) => opt.value === filter.attribute)}
                  onChange={(selected) =>
                    handleAttributeChange(index, 'attribute', selected?.value || '')
                  }
                  placeholder="Select Attribute"
                />
              </Box>

              <TextField
                label="Value"
                type="number"
                value={filter.value}
                onChange={(e) =>
                  handleAttributeChange(index, 'value', e.target.value)
                }
                sx={{ width: 100 }}
                inputProps={{ min: 0 }}
              />

              <IconButton onClick={() => removeAttributeFilter(index)} color="error">
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Stack>
          ))}

          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            onClick={addAttributeFilter}
            sx={{ width: 'fit-content', alignSelf: 'flex-start' }}
          >
            Add Attribute Filter
          </Button>
        </Stack>

        {/* Location Filters */}
        <Divider />
        <Typography variant="subtitle2" mt={2}>
          Location
        </Typography>
        <Select
          placeholder="Governorate"
          options={locations.governorates.map((g) => ({ value: g, label: g }))}
          onChange={(s) => handleLocationChange('governorate', s?.value || '')}
        />
        <Select
          placeholder="Province"
          options={locations.provinces.map((p) => ({ value: p, label: p }))}
          onChange={(s) => handleLocationChange('province', s?.value || '')}
        />
        <Select
          placeholder="City"
          options={locations.cities.map((c) => ({ value: c, label: c }))}
          onChange={(s) => handleLocationChange('city', s?.value || '')}
        />
        <Select
          placeholder="Street"
          options={locations.streets.map((s) => ({ value: s, label: s }))}
          onChange={(s) => handleLocationChange('street', s?.value || '')}
        />

        <Divider sx={{ my: 2 }} />

        <Button variant="contained" onClick={handleSubmit} color="primary">
          Apply Filters
        </Button>
      </Stack>
    </Paper>
  );
};

export default FilterBar;
