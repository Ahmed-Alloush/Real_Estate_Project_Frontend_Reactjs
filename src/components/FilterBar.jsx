// // // // // import React, { useState } from 'react';
// // // // // import {
// // // // //   Box,
// // // // //   Paper,
// // // // //   Typography,
// // // // //   TextField,
// // // // //   MenuItem,
// // // // //   Checkbox,
// // // // //   FormControlLabel,
// // // // //   Slider,
// // // // //   Stack,
// // // // //   Divider,
// // // // //   Button,
// // // // //   IconButton,
// // // // // } from '@mui/material';
// // // // // import AddIcon from '@mui/icons-material/Add';
// // // // // import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// // // // // import Select from 'react-select';

// // // // // const propertyTypes = ['Apartment', 'Villa', 'Land', 'Commercial'];
// // // // // const licenseTypes = ['Residential', 'Commercial', 'Industrial'];
// // // // // const attributeOptions = [
// // // // //   { value: 'Bedrooms', label: 'Bedrooms' },
// // // // //   { value: 'Bathrooms', label: 'Bathrooms' },
// // // // //   { value: 'Floors', label: 'Floors' },
// // // // //   { value: 'Kitchens', label: 'Kitchens' },
// // // // // ];
// // // // // const locations = {
// // // // //   governorates: ['Damascus', 'Aleppo', 'Homs'],
// // // // //   provinces: ['Eastern', 'Western'],
// // // // //   cities: ['Damascus', 'Homs', 'Latakia'],
// // // // //   streets: ['Main Street', 'Al-Thawra', 'Abu Rummaneh'],
// // // // // };

// // // // // const FilterBar = ({ onFilter }) => {
// // // // //   const [filters, setFilters] = useState({
// // // // //     type: '',
// // // // //     purpose: { selling: false, renting: false },
// // // // //     price: [0, 1000000],
// // // // //     space: [0, 1000],
// // // // //     licenseType: '',
// // // // //     location: {
// // // // //       governorate: '',
// // // // //       province: '',
// // // // //       city: '',
// // // // //       street: '',
// // // // //     },
// // // // //   });

// // // // //   const [attributeFilters, setAttributeFilters] = useState([
// // // // //     // { attribute: '', value: '' },
// // // // //   ]);

// // // // //   const handleSliderChange = (key, newValue) => {
// // // // //     setFilters((prev) => ({ ...prev, [key]: newValue }));
// // // // //   };

// // // // //   const handleLocationChange = (key, value) => {
// // // // //     setFilters((prev) => ({
// // // // //       ...prev,
// // // // //       location: { ...prev.location, [key]: value },
// // // // //     }));
// // // // //   };

// // // // //   const handleAttributeChange = (index, key, value) => {
// // // // //     const updated = [...attributeFilters];
// // // // //     updated[index][key] = value;
// // // // //     setAttributeFilters(updated);
// // // // //   };

// // // // //   const addAttributeFilter = () => {
// // // // //     setAttributeFilters((prev) => [...prev, { attribute: '', value: '' }]);
// // // // //   };

// // // // //   const removeAttributeFilter = (index) => {
// // // // //     setAttributeFilters((prev) => prev.filter((_, i) => i !== index));
// // // // //   };

// // // // //   const handleSubmit = () => {
// // // // //     onFilter({ ...filters, attributeFilters });
// // // // //   };

// // // // //   return (
// // // // //     <Paper
// // // // //       elevation={4}
// // // // //       sx={{
// // // // //         p: 3,
// // // // //         borderRadius: 4,
// // // // //         mb: 4,
// // // // //         maxHeight: '500px',
// // // // //         overflowY: 'auto',
// // // // //         backgroundColor: '#fafafa',
// // // // //       }}
// // // // //     >
// // // // //       <Typography variant="h6" gutterBottom>
// // // // //         Filter Properties
// // // // //       </Typography>

// // // // //       <Stack spacing={2}>
// // // // //         {/* Property Type */}
// // // // //         <TextField
// // // // //           select
// // // // //           fullWidth
// // // // //           label="Property Type"
// // // // //           value={filters.type}
// // // // //           onChange={(e) => setFilters({ ...filters, type: e.target.value })}
// // // // //         >
// // // // //           {propertyTypes.map((type) => (
// // // // //             <MenuItem key={type} value={type}>
// // // // //               {type}
// // // // //             </MenuItem>
// // // // //           ))}
// // // // //         </TextField>

// // // // //         {/* Selling / Renting */}
// // // // //         <Stack direction="row" spacing={2}>
// // // // //           <FormControlLabel
// // // // //             control={
// // // // //               <Checkbox
// // // // //                 checked={filters.purpose.selling}
// // // // //                 onChange={(e) =>
// // // // //                   setFilters((prev) => ({
// // // // //                     ...prev,
// // // // //                     purpose: { ...prev.purpose, selling: e.target.checked },
// // // // //                   }))
// // // // //                 }
// // // // //               />
// // // // //             }
// // // // //             label="Selling"
// // // // //           />
// // // // //           <FormControlLabel
// // // // //             control={
// // // // //               <Checkbox
// // // // //                 checked={filters.purpose.renting}
// // // // //                 onChange={(e) =>
// // // // //                   setFilters((prev) => ({
// // // // //                     ...prev,
// // // // //                     purpose: { ...prev.purpose, renting: e.target.checked },
// // // // //                   }))
// // // // //                 }
// // // // //               />
// // // // //             }
// // // // //             label="Renting"
// // // // //           />
// // // // //         </Stack>

// // // // //         {/* Price Range */}
// // // // //         <Box>
// // // // //           <Typography gutterBottom>Price Range ($)</Typography>
// // // // //           <Slider
// // // // //             value={filters.price}
// // // // //             onChange={(e, v) => handleSliderChange('price', v)}
// // // // //             min={0}
// // // // //             max={1000000}
// // // // //             step={10000}
// // // // //             valueLabelDisplay="auto"
// // // // //           />
// // // // //         </Box>

// // // // //         {/* Space Range */}
// // // // //         <Box>
// // // // //           <Typography gutterBottom>Space (m²)</Typography>
// // // // //           <Slider
// // // // //             value={filters.space}
// // // // //             onChange={(e, v) => handleSliderChange('space', v)}
// // // // //             min={0}
// // // // //             max={1000}
// // // // //             step={10}
// // // // //             valueLabelDisplay="auto"
// // // // //           />
// // // // //         </Box>

// // // // //         {/* License Type */}
// // // // //         <TextField
// // // // //           select
// // // // //           fullWidth
// // // // //           label="License Type"
// // // // //           value={filters.licenseType}
// // // // //           onChange={(e) => setFilters({ ...filters, licenseType: e.target.value })}
// // // // //         >
// // // // //           {licenseTypes.map((type) => (
// // // // //             <MenuItem key={type} value={type}>
// // // // //               {type}
// // // // //             </MenuItem>
// // // // //           ))}
// // // // //         </TextField>

// // // // //         {/* Attribute Filters */}
// // // // //         <Divider />
// // // // //         <Typography variant="subtitle2" mt={2}>
// // // // //           Attribute Filters
// // // // //         </Typography>

// // // // //         <Stack spacing={2}>
// // // // //           {attributeFilters.map((filter, index) => (
// // // // //             <Stack key={index} direction="row" spacing={2} alignItems="center">
// // // // //               <Box sx={{ flex: 1 }}>
// // // // //                 <Select
// // // // //                   options={attributeOptions}
// // // // //                   value={attributeOptions.find((opt) => opt.value === filter.attribute)}
// // // // //                   onChange={(selected) =>
// // // // //                     handleAttributeChange(index, 'attribute', selected?.value || '')
// // // // //                   }
// // // // //                   placeholder="Select Attribute"
// // // // //                 />
// // // // //               </Box>

// // // // //               <TextField
// // // // //                 label="Value"
// // // // //                 type="number"
// // // // //                 value={filter.value}
// // // // //                 onChange={(e) =>
// // // // //                   handleAttributeChange(index, 'value', e.target.value)
// // // // //                 }
// // // // //                 sx={{ width: 100 }}
// // // // //                 inputProps={{ min: 0 }}
// // // // //               />

// // // // //               <IconButton onClick={() => removeAttributeFilter(index)} color="error">
// // // // //                 <RemoveCircleOutlineIcon />
// // // // //               </IconButton>
// // // // //             </Stack>
// // // // //           ))}

// // // // //           <Button
// // // // //             startIcon={<AddIcon />}
// // // // //             variant="outlined"
// // // // //             onClick={addAttributeFilter}
// // // // //             sx={{ width: 'fit-content', alignSelf: 'flex-start' }}
// // // // //           >
// // // // //             Add Attribute Filter
// // // // //           </Button>
// // // // //         </Stack>

// // // // //         {/* Location Filters */}
// // // // //         <Divider />
// // // // //         <Typography variant="subtitle2" mt={2}>
// // // // //           Location
// // // // //         </Typography>
// // // // //         <Select
// // // // //           placeholder="Governorate"
// // // // //           options={locations.governorates.map((g) => ({ value: g, label: g }))}
// // // // //           onChange={(s) => handleLocationChange('governorate', s?.value || '')}
// // // // //         />
// // // // //         <Select
// // // // //           placeholder="Province"
// // // // //           options={locations.provinces.map((p) => ({ value: p, label: p }))}
// // // // //           onChange={(s) => handleLocationChange('province', s?.value || '')}
// // // // //         />
// // // // //         <Select
// // // // //           placeholder="City"
// // // // //           options={locations.cities.map((c) => ({ value: c, label: c }))}
// // // // //           onChange={(s) => handleLocationChange('city', s?.value || '')}
// // // // //         />
// // // // //         <Select
// // // // //           placeholder="Street"
// // // // //           options={locations.streets.map((s) => ({ value: s, label: s }))}
// // // // //           onChange={(s) => handleLocationChange('street', s?.value || '')}
// // // // //         />

// // // // //         <Divider sx={{ my: 2 }} />

// // // // //         <Button variant="contained" onClick={handleSubmit} color="primary">
// // // // //           Apply Filters
// // // // //         </Button>
// // // // //       </Stack>
// // // // //     </Paper>
// // // // //   );
// // // // // };

// // // // // export default FilterBar;

// // // // import React, { useEffect, useState } from "react";
// // // // import {
// // // //   Box,
// // // //   Paper,
// // // //   Typography,
// // // //   TextField,
// // // //   MenuItem,
// // // //   Checkbox,
// // // //   FormControlLabel,
// // // //   Slider,
// // // //   Stack,
// // // //   Divider,
// // // //   Button,
// // // //   IconButton,
// // // // } from "@mui/material";
// // // // import AddIcon from "@mui/icons-material/Add";
// // // // import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// // // // import Select from "react-select";
// // // // import { useTranslation } from "react-i18next";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { fetchAttributes, fetchPropertyTypes } from "../redux/property type/propertyTypeSlice";
// // // // import { fetchLicenseTypes } from "../redux/license type/licenseTypeSlice";

// // // // const FilterBar = ({ onFilter }) => {
// // // //   const { t, i18n } = useTranslation();
// // // //   const dispatch = useDispatch();

// // // //   const [filters, setFilters] = useState({
// // // //     type: "",
// // // //     purpose: { selling: false, renting: false },
// // // //     price: [0, 1000000],
// // // //     space: [0, 1000],
// // // //     licenseType: "",
// // // //     location: {
// // // //       governorate: "",
// // // //       province: "",
// // // //       city: "",
// // // //       street: "",
// // // //     },
// // // //   });

// // // //   const [attributeFilters, setAttributeFilters] = useState([]);

// // // //   // const { propertyTypes } = useSelector((state) => state.propertyType);
// // // //   const { licenseTypes, loading, error } = useSelector(
// // // //     (state) => state.licenseType
// // // //   );
// // // //   const { propertyTypes, attributes } = useSelector(
// // // //     (state) => state.propertyType
// // // //   );

// // // //   useEffect(() => {
// // // //     dispatch(fetchAttributes())
// // // //     dispatch(fetchPropertyTypes())
// // // //     dispatch(fetchLicenseTypes())

// // // //   }, [dispatch]);

// // // //   const handleSliderChange = (key, newValue) => {
// // // //     setFilters((prev) => ({ ...prev, [key]: newValue }));
// // // //   };

// // // //   const handleLocationChange = (key, value) => {
// // // //     setFilters((prev) => ({
// // // //       ...prev,
// // // //       location: { ...prev.location, [key]: value },
// // // //     }));
// // // //   };

// // // //   const handleAttributeChange = (index, key, value) => {
// // // //     const updated = [...attributeFilters];
// // // //     updated[index][key] = value;
// // // //     setAttributeFilters(updated);
// // // //   };

// // // //   const addAttributeFilter = () => {
// // // //     setAttributeFilters((prev) => [...prev, { attribute: "", value: 0 }]);
// // // //   };

// // // //   const removeAttributeFilter = (index) => {
// // // //     setAttributeFilters((prev) => prev.filter((_, i) => i !== index));
// // // //   };

// // // //   const handleSubmit = () => {
// // // //     onFilter({ ...filters, attributeFilters });
// // // //   };

// // // //   const isRTL = i18n.language === "ar";

// // // //   return (
// // // //     <Paper
// // // //       elevation={4}
// // // //       sx={{
// // // //         p: 3,
// // // //         borderRadius: 4,
// // // //         mb: 4,
// // // //         maxHeight: "500px",
// // // //         overflowY: "auto",
// // // //         backgroundColor: "#fafafa",
// // // //         direction: isRTL ? "rtl" : "ltr",
// // // //       }}
// // // //     >
// // // //       <Typography variant="h6" gutterBottom>
// // // //         {t("properties.filterBar.title")}
// // // //       </Typography>

// // // //       <Stack spacing={2}>
// // // //         {/* Property Type */}
// // // //         <TextField
// // // //           select
// // // //           fullWidth
// // // //           label={t("properties.filterBar.propertyType")}
// // // //           value={filters.type}
// // // //           onChange={(e) => setFilters({ ...filters, type: e.target.value })}
// // // //         >
// // // //           {propertyTypes.map((type) => (
// // // //             <MenuItem key={type} value={type?.name}>
// // // //               {t(
// // // //                 `properties.filterBar.${type?.name.toLowerCase().replace(/\s/g, "")}`
// // // //               )}
// // // //             </MenuItem>
// // // //           ))}
// // // //         </TextField>

// // // //         {/* Selling / Renting */}
// // // //         <Stack direction="row" spacing={2}>
// // // //           <FormControlLabel
// // // //             control={
// // // //               <Checkbox
// // // //                 checked={filters.purpose.selling}
// // // //                 onChange={(e) =>
// // // //                   setFilters((prev) => ({
// // // //                     ...prev,
// // // //                     purpose: { ...prev.purpose, selling: e.target.checked },
// // // //                   }))
// // // //                 }
// // // //               />
// // // //             }
// // // //             label={t("properties.filterBar.selling")}
// // // //           />
// // // //           <FormControlLabel
// // // //             control={
// // // //               <Checkbox
// // // //                 checked={filters.purpose.renting}
// // // //                 onChange={(e) =>
// // // //                   setFilters((prev) => ({
// // // //                     ...prev,
// // // //                     purpose: { ...prev.purpose, renting: e.target.checked },
// // // //                   }))
// // // //                 }
// // // //               />
// // // //             }
// // // //             label={t("properties.filterBar.renting")}
// // // //           />
// // // //         </Stack>

// // // //         {/* Price Range */}
// // // //         <Box>
// // // //           <Typography gutterBottom>
// // // //             {t("properties.filterBar.priceRange")}
// // // //           </Typography>
// // // //           <Slider
// // // //             value={filters.price}
// // // //             onChange={(e, v) => handleSliderChange("price", v)}
// // // //             min={0}
// // // //             max={1000000}
// // // //             step={10000}
// // // //             valueLabelDisplay="auto"
// // // //           />
// // // //         </Box>

// // // //         {/* Space Range */}
// // // //         <Box>
// // // //           <Typography gutterBottom>
// // // //             {t("properties.filterBar.space")}
// // // //           </Typography>
// // // //           <Slider
// // // //             value={filters.space}
// // // //             onChange={(e, v) => handleSliderChange("space", v)}
// // // //             min={0}
// // // //             max={1000}
// // // //             step={10}
// // // //             valueLabelDisplay="auto"
// // // //           />
// // // //         </Box>

// // // //         {/* License Type */}
// // // //         <TextField
// // // //           select
// // // //           fullWidth
// // // //           label={t("properties.filterBar.licenseType")}
// // // //           value={filters.licenseType}
// // // //           onChange={(e) =>
// // // //             setFilters({ ...filters, licenseType: e.target.value })
// // // //           }
// // // //         >
// // // //           {licenseTypes.map((type) => (
// // // //             <MenuItem key={type} value={type?.name}>
// // // //               {t(
// // // //                 `properties.filterBar.${type?.name.toLowerCase().replace(/\s/g, "")}`
// // // //               )}
// // // //             </MenuItem>
// // // //           ))}
// // // //         </TextField>

// // // //         {/* Attribute Filters */}
// // // //         <Divider />
// // // //         <Typography variant="subtitle2" mt={2}>
// // // //           {t("properties.filterBar.attributeFilters")}
// // // //         </Typography>

// // // //         <Stack spacing={2}>
// // // //           {attributeFilters.map((filter, index) => (
// // // //             <Stack key={index} direction="row" spacing={2} alignItems="center">
// // // //               <Box sx={{ flex: 1 }}>
// // // //                 <Select
// // // //                   options={attributes}
// // // //                   value={attributes.find(
// // // //                     (opt) => opt.value === filter.attribute.name
// // // //                   )}
// // // //                   onChange={(selected) =>
// // // //                     handleAttributeChange(
// // // //                       index,
// // // //                       "attribute",
// // // //                       selected?.value || ""
// // // //                     )
// // // //                   }
// // // //                   placeholder={t("properties.filterBar.selectAttribute")}
// // // //                 />
// // // //               </Box>

// // // //               <TextField
// // // //                 label={t("properties.filterBar.value")}
// // // //                 type="number"
// // // //                 value={filter.value}
// // // //                 onChange={(e) =>
// // // //                   handleAttributeChange(index, "value", e.target.value)
// // // //                 }
// // // //                 sx={{ width: 100 }}
// // // //                 inputProps={{ min: 0 }}
// // // //               />

// // // //               <IconButton
// // // //                 onClick={() => removeAttributeFilter(index)}
// // // //                 color="error"
// // // //               >
// // // //                 <RemoveCircleOutlineIcon />
// // // //               </IconButton>
// // // //             </Stack>
// // // //           ))}

// // // //           <Button
// // // //             startIcon={<AddIcon />}
// // // //             variant="outlined"
// // // //             onClick={addAttributeFilter}
// // // //             sx={{ width: "fit-content", alignSelf: "flex-start" }}
// // // //           >
// // // //             {t("properties.filterBar.addAttributeFilter")}
// // // //           </Button>
// // // //         </Stack>

// // // //         {/* Location Filters */}
// // // //         <Divider />
// // // //         <Typography variant="subtitle2" mt={2}>
// // // //           {t("properties.filterBar.location")}
// // // //         </Typography>
// // // //         <Select
// // // //           placeholder={t("properties.filterBar.governorate")}
// // // //           options={locations.governorates.map((g) => ({
// // // //             value: g,
// // // //             label: g,
// // // //           }))}
// // // //           onChange={(s) => handleLocationChange("governorate", s?.value || "")}
// // // //         />
// // // //         <Select
// // // //           placeholder={t("properties.filterBar.province")}
// // // //           options={locations.provinces.map((p) => ({ value: p, label: p }))}
// // // //           onChange={(s) => handleLocationChange("province", s?.value || "")}
// // // //         />
// // // //         <Select
// // // //           placeholder={t("properties.filterBar.city")}
// // // //           options={locations.cities.map((c) => ({ value: c, label: c }))}
// // // //           onChange={(s) => handleLocationChange("city", s?.value || "")}
// // // //         />
// // // //         <Select
// // // //           placeholder={t("properties.filterBar.street")}
// // // //           options={locations.streets.map((s) => ({ value: s, label: s }))}
// // // //           onChange={(s) => handleLocationChange("street", s?.value || "")}
// // // //         />

// // // //         <Divider sx={{ my: 2 }} />

// // // //         <Button variant="contained" onClick={handleSubmit} color="primary">
// // // //           {t("properties.filterBar.applyFilters")}
// // // //         </Button>
// // // //       </Stack>
// // // //     </Paper>
// // // //   );
// // // // };

// // // // export default FilterBar;

// // // import React, { useEffect, useState } from "react";
// // // import {
// // //   Box,
// // //   Paper,
// // //   Typography,
// // //   TextField,
// // //   MenuItem,
// // //   Checkbox,
// // //   FormControlLabel,
// // //   Slider,
// // //   Stack,
// // //   Divider,
// // //   Button,
// // //   IconButton,
// // // } from "@mui/material";
// // // import AddIcon from "@mui/icons-material/Add";
// // // import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// // // import Select from "react-select";
// // // import { useTranslation } from "react-i18next";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import {
// // //   fetchAttributes,
// // //   fetchPropertyTypes,
// // // } from "../redux/property type/propertyTypeSlice";
// // // import { fetchLicenseTypes } from "../redux/license type/licenseTypeSlice";

// // // // Dummy data for location since it's not being fetched from Redux
// // // // You should replace this with a real API call if available.
// // // const LOCATIONS = {
// // //   governorates: ["Cairo", "Giza"],
// // //   provinces: ["Heliopolis", "Zamalek"],
// // //   cities: ["Nasr City", "Maadi"],
// // //   streets: ["Main St", "Side St"],
// // // };

// // // const FilterBar = ({ onFilter }) => {
// // //   const { t, i18n } = useTranslation();
// // //   const dispatch = useDispatch();

// // //   const [filters, setFilters] = useState({
// // //     type: "",
// // //     purpose: { selling: false, renting: false },
// // //     price: [0, 1000000],
// // //     space: [0, 1000],
// // //     licenseType: "",
// // //     location: {
// // //       governorate: "",
// // //       province: "",
// // //       city: "",
// // //       street: "",
// // //     },
// // //   });

// // //   const [attributeFilters, setAttributeFilters] = useState([]);

// // //   const { licenseTypes, loading, error } = useSelector(
// // //     (state) => state.licenseType
// // //   );
// // //   const { propertyTypes, attributes } = useSelector(
// // //     (state) => state.propertyType
// // //   );

// // //   // Use a single useEffect for initial data fetching
// // //   useEffect(() => {
// // //     dispatch(fetchAttributes());
// // //     dispatch(fetchPropertyTypes());
// // //     dispatch(fetchLicenseTypes());
// // //   }, [dispatch]);

// // //   const handleFilterChange = (key, value) => {
// // //     setFilters((prev) => ({
// // //       ...prev,
// // //       [key]: value,
// // //     }));
// // //   };

// // //   const handlePurposeChange = (purposeKey, checked) => {
// // //     setFilters((prev) => ({
// // //       ...prev,
// // //       purpose: {
// // //         ...prev.purpose,
// // //         [purposeKey]: checked,
// // //       },
// // //     }));
// // //   };

// // //   const handleLocationChange = (key, value) => {
// // //     setFilters((prev) => ({
// // //       ...prev,
// // //       location: {
// // //         ...prev.location,
// // //         [key]: value,
// // //       },
// // //     }));
// // //   };

// // //   const handleAttributeChange = (index, key, value) => {
// // //     const updated = [...attributeFilters];
// // //     updated[index] = {
// // //       ...updated[index],
// // //       [key]: value,
// // //     };
// // //     setAttributeFilters(updated);
// // //   };

// // //   const addAttributeFilter = () => {
// // //     setAttributeFilters((prev) => [...prev, { attribute: "", value: 0 }]);
// // //   };

// // //   const removeAttributeFilter = (index) => {
// // //     setAttributeFilters((prev) => prev.filter((_, i) => i !== index));
// // //   };

// // //   const handleSubmit = () => {
// // //     onFilter({ ...filters, attributeFilters });
// // //   };

// // //   const isRTL = i18n.language === "ar";

// // //   // Formats attributes for the react-select component
// // //   const attributeOptions = attributes.map((attr) => ({
// // //     value: attr.name,
// // //     label: attr.name,
// // //   }));

// // //   return (
// // //     <Paper
// // //       elevation={4}
// // //       sx={{
// // //         p: 3,
// // //         borderRadius: 4,
// // //         mb: 4,
// // //         maxHeight: "500px",
// // //         overflowY: "auto",
// // //         backgroundColor: "#fafafa",
// // //         direction: isRTL ? "rtl" : "ltr",
// // //       }}
// // //     >
// // //       <Typography variant="h6" gutterBottom>
// // //         {t("properties.filterBar.title")}
// // //       </Typography>

// // //       <Stack spacing={2}>
// // //         {/* Property Type */}
// // //         <TextField
// // //           select
// // //           fullWidth
// // //           label={t("properties.filterBar.propertyType")}
// // //           value={filters.type}
// // //           onChange={(e) => handleFilterChange("type", e.target.value)}
// // //         >
// // //           <MenuItem value="">
// // //             <em>{t("properties.filterBar.allTypes")}</em>
// // //           </MenuItem>
// // //           {propertyTypes.map((type) => (
// // //             <MenuItem key={type.id} value={type.name}>
// // //               {type.name}
// // //             </MenuItem>
// // //           ))}
// // //         </TextField>

// // //         {/* Selling / Renting */}
// // //         <Stack direction="row" spacing={2}>
// // //           <FormControlLabel
// // //             control={
// // //               <Checkbox
// // //                 checked={filters.purpose.selling}
// // //                 onChange={(e) => handlePurposeChange("selling", e.target.checked)}
// // //               />
// // //             }
// // //             label={t("properties.filterBar.selling")}
// // //           />
// // //           <FormControlLabel
// // //             control={
// // //               <Checkbox
// // //                 checked={filters.purpose.renting}
// // //                 onChange={(e) => handlePurposeChange("renting", e.target.checked)}
// // //               />
// // //             }
// // //             label={t("properties.filterBar.renting")}
// // //           />
// // //         </Stack>

// // //         {/* Price Range */}
// // //         <Box>
// // //           <Typography gutterBottom>
// // //             {t("properties.filterBar.priceRange")}
// // //             : {filters.price[0]} - {filters.price[1]}
// // //           </Typography>
// // //           <Slider
// // //             value={filters.price}
// // //             onChange={(e, v) => handleFilterChange("price", v)}
// // //             min={0}
// // //             max={1000000}
// // //             step={10000}
// // //             valueLabelDisplay="auto"
// // //           />
// // //         </Box>

// // //         {/* Space Range */}
// // //         <Box>
// // //           <Typography gutterBottom>
// // //             {t("properties.filterBar.space")}
// // //             : {filters.space[0]} - {filters.space[1]}
// // //           </Typography>
// // //           <Slider
// // //             value={filters.space}
// // //             onChange={(e, v) => handleFilterChange("space", v)}
// // //             min={0}
// // //             max={1000}
// // //             step={10}
// // //             valueLabelDisplay="auto"
// // //           />
// // //         </Box>

// // //         {/* License Type */}
// // //         <TextField
// // //           select
// // //           fullWidth
// // //           label={t("properties.filterBar.licenseType")}
// // //           value={filters.licenseType}
// // //           onChange={(e) => handleFilterChange("licenseType", e.target.value)}
// // //         >
// // //           <MenuItem value="">
// // //             <em>{t("properties.filterBar.allTypes")}</em>
// // //           </MenuItem>
// // //           {licenseTypes.map((type) => (
// // //             <MenuItem key={type.id} value={type.name}>
// // //               {type.name}
// // //             </MenuItem>
// // //           ))}
// // //         </TextField>

// // //         {/* Attribute Filters */}
// // //         <Divider />
// // //         <Typography variant="subtitle2" mt={2}>
// // //           {t("properties.filterBar.attributeFilters")}
// // //         </Typography>

// // //         <Stack spacing={2}>
// // //           {attributeFilters.map((filter, index) => (
// // //             <Stack key={index} direction="row" spacing={2} alignItems="center">
// // //               <Box sx={{ flex: 1 }}>
// // //                 <Select
// // //                   options={attributeOptions}
// // //                   value={attributeOptions.find(
// // //                     (opt) => opt.value === filter.attribute
// // //                   )}
// // //                   onChange={(selected) =>
// // //                     handleAttributeChange(
// // //                       index,
// // //                       "attribute",
// // //                       selected?.value || ""
// // //                     )
// // //                   }
// // //                   placeholder={t("properties.filterBar.selectAttribute")}
// // //                 />
// // //               </Box>
// // //               <TextField
// // //                 label={t("properties.filterBar.value")}
// // //                 type="number"
// // //                 value={filter.value}
// // //                 onChange={(e) =>
// // //                   handleAttributeChange(index, "value", e.target.value)
// // //                 }
// // //                 sx={{ width: 100 }}
// // //                 inputProps={{ min: 0 }}
// // //               />
// // //               <IconButton
// // //                 onClick={() => removeAttributeFilter(index)}
// // //                 color="error"
// // //               >
// // //                 <RemoveCircleOutlineIcon />
// // //               </IconButton>
// // //             </Stack>
// // //           ))}

// // //           <Button
// // //             startIcon={<AddIcon />}
// // //             variant="outlined"
// // //             onClick={addAttributeFilter}
// // //             sx={{ width: "fit-content", alignSelf: "flex-start" }}
// // //           >
// // //             {t("properties.filterBar.addAttributeFilter")}
// // //           </Button>
// // //         </Stack>

// // //         {/* Location Filters */}
// // //         <Divider />
// // //         <Typography variant="subtitle2" mt={2}>
// // //           {t("properties.filterBar.location")}
// // //         </Typography>
// // //         <Select
// // //           placeholder={t("properties.filterBar.governorate")}
// // //           options={LOCATIONS.governorates.map((g) => ({
// // //             value: g,
// // //             label: g,
// // //           }))}
// // //           onChange={(s) => handleLocationChange("governorate", s?.value || "")}
// // //         />
// // //         <Select
// // //           placeholder={t("properties.filterBar.province")}
// // //           options={LOCATIONS.provinces.map((p) => ({ value: p, label: p }))}
// // //           onChange={(s) => handleLocationChange("province", s?.value || "")}
// // //         />
// // //         <Select
// // //           placeholder={t("properties.filterBar.city")}
// // //           options={LOCATIONS.cities.map((c) => ({ value: c, label: c }))}
// // //           onChange={(s) => handleLocationChange("city", s?.value || "")}
// // //         />
// // //         <Select
// // //           placeholder={t("properties.filterBar.street")}
// // //           options={LOCATIONS.streets.map((s) => ({ value: s, label: s }))}
// // //           onChange={(s) => handleLocationChange("street", s?.value || "")}
// // //         />

// // //         <Divider sx={{ my: 2 }} />

// // //         <Button variant="contained" onClick={handleSubmit} color="primary">
// // //           {t("properties.filterBar.applyFilters")}
// // //         </Button>
// // //       </Stack>
// // //     </Paper>
// // //   );
// // // };

// // // export default FilterBar;

// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Paper,
// //   Typography,
// //   TextField,
// //   MenuItem,
// //   Checkbox,
// //   FormControlLabel,
// //   Slider,
// //   Stack,
// //   Divider,
// //   Button,
// //   IconButton,
// // } from "@mui/material";
// // import AddIcon from "@mui/icons-material/Add";
// // import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// // import Select from "react-select";
// // import { useTranslation } from "react-i18next";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchAttributes,
// //   fetchPropertyTypes,
// // } from "../redux/property type/propertyTypeSlice";
// // import { fetchLicenseTypes } from "../redux/license type/licenseTypeSlice";

// // const FilterBar = ({ onFilter }) => {
// //   const { t, i18n } = useTranslation();
// //   const dispatch = useDispatch();

// //   const [filters, setFilters] = useState({
// //     type: "",
// //     purpose: { selling: false, renting: false },
// //     price: [0, 1000000],
// //     space: [0, 1000],
// //     licenseType: "",
// //     location: {
// //       governorate: "",
// //       province: "",
// //       city: "",
// //       street: "",
// //     },
// //   });

// //   const [attributeFilters, setAttributeFilters] = useState([]);

// //   const { licenseTypes } = useSelector((state) => state.licenseType);
// //   const { propertyTypes, attributes } = useSelector(
// //     (state) => state.propertyType
// //   );

// //   useEffect(() => {
// //     dispatch(fetchAttributes());
// //     dispatch(fetchPropertyTypes());
// //     dispatch(fetchLicenseTypes());
// //   }, [dispatch]);

// //   const handleFilterChange = (key, value) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       [key]: value,
// //     }));
// //   };

// //   const handlePurposeChange = (purposeKey, checked) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       purpose: {
// //         ...prev.purpose,
// //         [purposeKey]: checked,
// //       },
// //     }));
// //   };

// //   const handleLocationChange = (key, value) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       location: {
// //         ...prev.location,
// //         [key]: value,
// //       },
// //     }));
// //   };

// //   const handleAttributeChange = (index, key, value) => {
// //     const updated = [...attributeFilters];
// //     updated[index] = {
// //       ...updated[index],
// //       [key]: value,
// //     };
// //     setAttributeFilters(updated);
// //   };

// //   const addAttributeFilter = () => {
// //     setAttributeFilters((prev) => [...prev, { attribute: "", value: 0 }]);
// //   };

// //   const removeAttributeFilter = (index) => {
// //     setAttributeFilters((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   const handleSubmit = () => {
// //     onFilter({ ...filters, attributeFilters });
// //   };

// //   const isRTL = i18n.language === "ar";

// //   const attributeOptions = attributes.map((attr) => ({
// //     value: attr.name,
// //     label: attr.name,
// //   }));

// //   return (
// //     <Paper
// //       elevation={4}
// //       sx={{
// //         p: 3,
// //         borderRadius: 4,
// //         mb: 4,
// //         maxHeight: "500px",
// //         overflowY: "auto",
// //         backgroundColor: "#fafafa",
// //         direction: isRTL ? "rtl" : "ltr",
// //       }}
// //     >
// //       <Typography variant="h6" gutterBottom>
// //         {t("properties.filterBar.title")}
// //       </Typography>

// //       <Stack spacing={2}>
// //         {/* Property Type */}
// //         <TextField
// //           select
// //           fullWidth
// //           label={t("properties.filterBar.propertyType")}
// //           value={filters.type}
// //           onChange={(e) => handleFilterChange("type", e.target.value)}
// //         >
// //           <MenuItem value="">
// //             <em>{t("properties.filterBar.allTypes")}</em>
// //           </MenuItem>
// //           {propertyTypes.map((type) => (
// //             <MenuItem key={type.id} value={type.name}>
// //               {type.name}
// //             </MenuItem>
// //           ))}
// //         </TextField>

// //         {/* Selling / Renting */}
// //         <Stack direction="row" spacing={2}>
// //           <FormControlLabel
// //             control={
// //               <Checkbox
// //                 checked={filters.purpose.selling}
// //                 onChange={(e) => handlePurposeChange("selling", e.target.checked)}
// //               />
// //             }
// //             label={t("properties.filterBar.selling")}
// //           />
// //           <FormControlLabel
// //             control={
// //               <Checkbox
// //                 checked={filters.purpose.renting}
// //                 onChange={(e) => handlePurposeChange("renting", e.target.checked)}
// //               />
// //             }
// //             label={t("properties.filterBar.renting")}
// //           />
// //         </Stack>

// //         {/* Price Range */}
// //         <Box>
// //           <Typography gutterBottom>
// //             {t("properties.filterBar.priceRange")}
// //             : {filters.price[0]} - {filters.price[1]}
// //           </Typography>
// //           <Slider
// //             value={filters.price}
// //             onChange={(e, v) => handleFilterChange("price", v)}
// //             min={0}
// //             max={1000000}
// //             step={10000}
// //             valueLabelDisplay="auto"
// //           />
// //         </Box>

// //         {/* Space Range */}
// //         <Box>
// //           <Typography gutterBottom>
// //             {t("properties.filterBar.space")}
// //             : {filters.space[0]} - {filters.space[1]}
// //           </Typography>
// //           <Slider
// //             value={filters.space}
// //             onChange={(e, v) => handleFilterChange("space", v)}
// //             min={0}
// //             max={1000}
// //             step={10}
// //             valueLabelDisplay="auto"
// //           />
// //         </Box>

// //         {/* License Type */}
// //         <TextField
// //           select
// //           fullWidth
// //           label={t("properties.filterBar.licenseType")}
// //           value={filters.licenseType}
// //           onChange={(e) => handleFilterChange("licenseType", e.target.value)}
// //         >
// //           <MenuItem value="">
// //             <em>{t("properties.filterBar.allTypes")}</em>
// //           </MenuItem>
// //           {licenseTypes.map((type) => (
// //             <MenuItem key={type.id} value={type.name}>
// //               {type.name}
// //             </MenuItem>
// //           ))}
// //         </TextField>

// //         {/* Attribute Filters */}
// //         <Divider />
// //         <Typography variant="subtitle2" mt={2}>
// //           {t("properties.filterBar.attributeFilters")}
// //         </Typography>

// //         <Stack spacing={2}>
// //           {attributeFilters.map((filter, index) => (
// //             <Stack key={index} direction="row" spacing={2} alignItems="center">
// //               <Box sx={{ flex: 1 }}>
// //                 <Select
// //                   options={attributeOptions}
// //                   value={attributeOptions.find(
// //                     (opt) => opt.value === filter.attribute
// //                   )}
// //                   onChange={(selected) =>
// //                     handleAttributeChange(
// //                       index,
// //                       "attribute",
// //                       selected?.value || ""
// //                     )
// //                   }
// //                   placeholder={t("properties.filterBar.selectAttribute")}
// //                 />
// //               </Box>
// //               <TextField
// //                 label={t("properties.filterBar.value")}
// //                 type="number"
// //                 value={filter.value}
// //                 onChange={(e) =>
// //                   handleAttributeChange(index, "value", e.target.value)
// //                 }
// //                 sx={{ width: 100 }}
// //                 inputProps={{ min: 0 }}
// //               />
// //               <IconButton
// //                 onClick={() => removeAttributeFilter(index)}
// //                 color="error"
// //               >
// //                 <RemoveCircleOutlineIcon />
// //               </IconButton>
// //             </Stack>
// //           ))}

// //           <Button
// //             startIcon={<AddIcon />}
// //             variant="outlined"
// //             onClick={addAttributeFilter}
// //             sx={{ width: "fit-content", alignSelf: "flex-start" }}
// //           >
// //             {t("properties.filterBar.addAttributeFilter")}
// //           </Button>
// //         </Stack>

// //         {/* Location Filters */}
// //         <Divider />
// //         <Typography variant="subtitle2" mt={2}>
// //           {t("properties.filterBar.location")}
// //         </Typography>
// //         <TextField
// //           fullWidth
// //           label={t("properties.filterBar.governorate")}
// //           value={filters.location.governorate}
// //           onChange={(e) => handleLocationChange("governorate", e.target.value)}
// //           variant="outlined"
// //         />
// //         <TextField
// //           fullWidth
// //           label={t("properties.filterBar.province")}
// //           value={filters.location.province}
// //           onChange={(e) => handleLocationChange("province", e.target.value)}
// //           variant="outlined"
// //         />
// //         <TextField
// //           fullWidth
// //           label={t("properties.filterBar.city")}
// //           value={filters.location.city}
// //           onChange={(e) => handleLocationChange("city", e.target.value)}
// //           variant="outlined"
// //         />
// //         <TextField
// //           fullWidth
// //           label={t("properties.filterBar.street")}
// //           value={filters.location.street}
// //           onChange={(e) => handleLocationChange("street", e.target.value)}
// //           variant="outlined"
// //         />

// //         <Divider sx={{ my: 2 }} />

// //         <Button variant="contained" onClick={handleSubmit} color="primary">
// //           {t("properties.filterBar.applyFilters")}
// //         </Button>
// //       </Stack>
// //     </Paper>
// //   );
// // };

// // export default FilterBar;

// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Paper,
// //   Typography,
// //   TextField,
// //   MenuItem,
// //   Checkbox,
// //   FormControlLabel,
// //   Slider,
// //   Stack,
// //   Divider,
// //   Button,
// //   IconButton,
// // } from "@mui/material";
// // import AddIcon from "@mui/icons-material/Add";
// // import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// // import Select from "react-select";
// // import { useTranslation } from "react-i18next";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchAttributes,
// //   fetchPropertyTypes,
// // } from "../redux/property type/propertyTypeSlice";
// // import { fetchLicenseTypes } from "../redux/license type/licenseTypeSlice";

// // const FilterBar = ({ onFilter }) => {
// //   const { t, i18n } = useTranslation();
// //   const dispatch = useDispatch();

// //   const [filters, setFilters] = useState({
// //     type: "",
// //     purpose: { selling: false, renting: false },
// //     price: [0, 1000000],
// //     space: [0, 1000],
// //     licenseType: "",
// //     location: {
// //       governorate: "",
// //       province: "",
// //       city: "",
// //       street: "",
// //     },
// //   });

// //   const [attributeFilters, setAttributeFilters] = useState([]);

// //   const { licenseTypes } = useSelector((state) => state.licenseType);
// //   const { propertyTypes, attributes } = useSelector(
// //     (state) => state.propertyType
// //   );

// //   const selectedPropertyType = propertyTypes.find(
// //     (type) => type.name === filters.type
// //   );

// //   const availableAttributes = selectedPropertyType
// //     ? selectedPropertyType.attributes.map((pta) => pta.attribute)
// //     : [];

// //   const attributeOptions = availableAttributes.map((attr) => ({
// //     value: attr.name,
// //     label: attr.name,
// //   }));

// //   useEffect(() => {
// //     dispatch(fetchAttributes());
// //     dispatch(fetchPropertyTypes());
// //     dispatch(fetchLicenseTypes());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (filters.type) {
// //       const availableAttributeNames = availableAttributes.map(
// //         (attr) => attr.name
// //       );
// //       const newAttributeFilters = attributeFilters.filter((filter) =>
// //         availableAttributeNames.includes(filter.attribute)
// //       );
// //       if (newAttributeFilters.length !== attributeFilters.length) {
// //         setAttributeFilters(newAttributeFilters);
// //       }
// //     } else {
// //       setAttributeFilters([]);
// //     }
// //   }, [filters.type]); // Removed attributeFilters from dependency array to prevent re-rendering loops

// //   const handleFilterChange = (key, value) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       [key]: value,
// //     }));
// //   };

// //   const handlePurposeChange = (purposeKey, checked) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       purpose: {
// //         ...prev.purpose,
// //         [purposeKey]: checked,
// //       },
// //     }));
// //   };

// //   const handleLocationChange = (key, value) => {
// //     setFilters((prev) => ({
// //       ...prev,
// //       location: {
// //         ...prev.location,
// //         [key]: value,
// //       },
// //     }));
// //   };

// //   const handleAttributeChange = (index, key, value) => {
// //     setAttributeFilters((prev) =>
// //       prev.map((item, i) =>
// //         i === index
// //           ? {
// //               ...item,
// //               [key]: key === 'value' ? Number(value) : value,
// //             }
// //           : item
// //       )
// //     );
// //   };

// //   const addAttributeFilter = () => {
// //     setAttributeFilters((prev) => [...prev, { attribute: "", value: "" }]);
// //   };

// //   const removeAttributeFilter = (index) => {
// //     setAttributeFilters((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   const handleSubmit = () => {
// //     onFilter({ ...filters, attributeFilters });
// //   };

// //   const isRTL = i18n.language === "ar";

// //   return (
// //     <Paper
// //       elevation={4}
// //       sx={{
// //         p: 3,
// //         borderRadius: 4,
// //         mb: 4,
// //         maxHeight: "500px",
// //         overflowY: "auto",
// //         backgroundColor: "#fafafa",
// //         direction: isRTL ? "rtl" : "ltr",
// //       }}
// //     >
// //       <Typography variant="h6" gutterBottom>
// //         {t("properties.filterBar.title")}
// //       </Typography>

// //       <Stack spacing={2}>
// //         {/* Property Type */}
// //         <TextField
// //           select
// //           fullWidth
// //           label={t("properties.filterBar.propertyType")}
// //           value={filters.type}
// //           onChange={(e) => handleFilterChange("type", e.target.value)}
// //         >
// //           <MenuItem value="">
// //             <em>{t("properties.filterBar.allTypes")}</em>
// //           </MenuItem>
// //           {propertyTypes.map((type) => (
// //             <MenuItem key={type.id} value={type.name}>
// //               {type.name}
// //             </MenuItem>
// //           ))}
// //         </TextField>

// //         {/* Selling / Renting */}
// //         <Stack direction="row" spacing={2}>
// //           <FormControlLabel
// //             control={
// //               <Checkbox
// //                 checked={filters.purpose.selling}
// //                 onChange={(e) => handlePurposeChange("selling", e.target.checked)}
// //               />
// //             }
// //             label={t("properties.filterBar.selling")}
// //           />
// //           <FormControlLabel
// //             control={
// //               <Checkbox
// //                 checked={filters.purpose.renting}
// //                 onChange={(e) => handlePurposeChange("renting", e.target.checked)}
// //               />
// //             }
// //             label={t("properties.filterBar.renting")}
// //           />
// //         </Stack>

// //         {/* Price Range */}
// //         <Box>
// //           <Typography gutterBottom>
// //             {t("properties.filterBar.priceRange")}
// //             : {filters.price[0]} - {filters.price[1]}
// //           </Typography>
// //           <Slider
// //             value={filters.price}
// //             onChange={(e, v) => handleFilterChange("price", v)}
// //             min={0}
// //             max={1000000}
// //             step={10000}
// //             valueLabelDisplay="auto"
// //           />
// //         </Box>

// //         {/* Space Range */}
// //         <Box>
// //           <Typography gutterBottom>
// //             {t("properties.filterBar.space")}
// //             : {filters.space[0]} - {filters.space[1]}
// //           </Typography>
// //           <Slider
// //             value={filters.space}
// //             onChange={(e, v) => handleFilterChange("space", v)}
// //             min={0}
// //             max={1000}
// //             step={10}
// //             valueLabelDisplay="auto"
// //           />
// //         </Box>

// //         {/* License Type */}
// //         <TextField
// //           select
// //           fullWidth
// //           label={t("properties.filterBar.licenseType")}
// //           value={filters.licenseType}
// //           onChange={(e) => handleFilterChange("licenseType", e.target.value)}
// //         >
// //           <MenuItem value="">
// //             <em>{t("properties.filterBar.allTypes")}</em>
// //           </MenuItem>
// //           {licenseTypes.map((type) => (
// //             <MenuItem key={type.id} value={type.name}>
// //               {type.name}
// //             </MenuItem>
// //           ))}
// //         </TextField>

// //         {/* Attribute Filters */}
// //         <Divider />
// //         <Typography variant="subtitle2" mt={2}>
// //           {t("properties.filterBar.attributeFilters")}
// //         </Typography>

// //         <Stack spacing={2}>
// //           {attributeFilters.map((filter, index) => (
// //             <Stack key={index} direction="row" spacing={2} alignItems="center">
// //               <Box sx={{ flex: 1 }}>
// //                 <Select
// //                   options={attributeOptions}
// //                   value={
// //                     attributeOptions.find(
// //                       (opt) => opt.value === filter.attribute
// //                     ) || null
// //                   }
// //                   onChange={(selected) =>
// //                     handleAttributeChange(
// //                       index,
// //                       "attribute",
// //                       selected?.value || ""
// //                     )
// //                   }
// //                   placeholder={t("properties.filterBar.selectAttribute")}
// //                 />
// //               </Box>
// //               <TextField
// //                 label={t("properties.filterBar.value")}
// //                 type="number"
// //                 value={filter.value}
// //                 onChange={(e) =>
// //                   handleAttributeChange(index, "value", e.target.value)
// //                 }
// //                 sx={{ width: 100 }}
// //                 inputProps={{ min: 0 }}
// //               />
// //               <IconButton
// //                 onClick={() => removeAttributeFilter(index)}
// //                 color="error"
// //               >
// //                 <RemoveCircleOutlineIcon />
// //               </IconButton>
// //             </Stack>
// //           ))}
// //           {filters.type && availableAttributes.length > 0 && (
// //             <Button
// //               startIcon={<AddIcon />}
// //               variant="outlined"
// //               onClick={addAttributeFilter}
// //               sx={{ width: "fit-content", alignSelf: "flex-start" }}
// //             >
// //               {t("properties.filterBar.addAttributeFilter")}
// //             </Button>
// //           )}
// //         </Stack>

// //         {/* Location Filters */}
// //         <Divider />
// //         <Typography variant="subtitle2" mt={2}>
// //           {t("properties.filterBar.location")}
// //         </Typography>
// //         <TextField
// //           fullWidth
// //           label={t("properties.filterBar.governorate")}
// //           value={filters.location.governorate}
// //           onChange={(e) => handleLocationChange("governorate", e.target.value)}
// //           variant="outlined"
// //         />
// //         <TextField
// //           fullWidth
// //           label={t("properties.filterBar.province")}
// //           value={filters.location.province}
// //           onChange={(e) => handleLocationChange("province", e.target.value)}
// //           variant="outlined"
// //         />
// //         <TextField
// //           fullWidth
// //           label={t("properties.filterBar.city")}
// //           value={filters.location.city}
// //           onChange={(e) => handleLocationChange("city", e.target.value)}
// //           variant="outlined"
// //         />
// //         <TextField
// //           fullWidth
// //           label={t("properties.filterBar.street")}
// //           value={filters.location.street}
// //           onChange={(e) => handleLocationChange("street", e.target.value)}
// //           variant="outlined"
// //         />

// //         <Divider sx={{ my: 2 }} />

// //         <Button variant="contained" onClick={handleSubmit} color="primary">
// //           {t("properties.filterBar.applyFilters")}
// //         </Button>
// //       </Stack>
// //     </Paper>
// //   );
// // };

// // export default FilterBar;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   MenuItem,
//   Checkbox,
//   FormControlLabel,
//   Slider,
//   Stack,
//   Divider,
//   Button,
//   IconButton,
//   useTheme,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// import Select from "react-select";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAttributes,
//   fetchPropertyTypes,
// } from "../redux/property type/propertyTypeSlice";
// import { fetchLicenseTypes } from "../redux/license type/licenseTypeSlice";

// const FilterBar = ({ onFilter }) => {
//   const { t, i18n } = useTranslation();
//   const dispatch = useDispatch();
//   const theme = useTheme(); // Call the hook here
//   const [filters, setFilters] = useState({
//     type: "",
//     purpose: { selling: false, renting: false },
//     price: [0, 1000000],
//     space: [0, 1000],
//     licenseType: "",
//     location: {
//       governorate: "",
//       province: "",
//       city: "",
//       street: "",
//     },
//   });

//   const [attributeFilters, setAttributeFilters] = useState([]);

//   const { licenseTypes } = useSelector((state) => state.licenseType);
//   const { propertyTypes, attributes } = useSelector(
//     (state) => state.propertyType
//   );

//   const selectedPropertyType = propertyTypes.find(
//     (type) => type.name === filters.type
//   );

//   const availableAttributes = selectedPropertyType
//     ? selectedPropertyType.attributes.map((pta) => pta.attribute)
//     : [];

//   const attributeOptions = availableAttributes.map((attr) => ({
//     value: attr.name,
//     label: attr.name,
//   }));

//   useEffect(() => {
//     dispatch(fetchAttributes());
//     dispatch(fetchPropertyTypes());
//     dispatch(fetchLicenseTypes());
//   }, [dispatch]);

//   useEffect(() => {
//     if (filters.type) {
//       const availableAttributeNames = availableAttributes.map(
//         (attr) => attr.name
//       );
//       const newAttributeFilters = attributeFilters.filter((filter) =>
//         availableAttributeNames.includes(filter.attribute)
//       );
//       if (newAttributeFilters.length !== attributeFilters.length) {
//         setAttributeFilters(newAttributeFilters);
//       }
//     } else {
//       setAttributeFilters([]);
//     }
//   }, [filters.type]);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handlePurposeChange = (purposeKey, checked) => {
//     setFilters((prev) => ({
//       ...prev,
//       purpose: {
//         ...prev.purpose,
//         [purposeKey]: checked,
//       },
//     }));
//   };

//   const handleLocationChange = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       location: {
//         ...prev.location,
//         [key]: value,
//       },
//     }));
//   };

//   const handleAttributeChange = (index, key, value) => {
//     setAttributeFilters((prev) =>
//       prev.map((item, i) =>
//         i === index
//           ? {
//               ...item,
//               [key]: key === "value" ? Number(value) : value,
//             }
//           : item
//       )
//     );
//   };

//   const addAttributeFilter = () => {
//     setAttributeFilters((prev) => [...prev, { attribute: "", value: "" }]);
//   };

//   const removeAttributeFilter = (index) => {
//     setAttributeFilters((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = () => {
//     const cleanedFilters = cleanFilters(filters, attributeFilters);
//     onFilter(cleanedFilters);
//   };

//   // New function to clean the filter object
//   const cleanFilters = (filters, attributeFilters) => {
//     const cleaned = { ...filters };

//     // Clean location object
//     if (
//       Object.values(cleaned.location).every(
//         (val) => !val || (typeof val === "string" && val.trim() === "")
//       )
//     ) {
//       cleaned.location = undefined;
//     } else {
//       for (const key in cleaned.location) {
//         if (cleaned.location[key] === "") {
//           cleaned.location[key] = undefined;
//         }
//       }
//     }

//     // Clean other fields
//     if (cleaned.type === "") cleaned.type = undefined;
//     if (cleaned.licenseType === "") cleaned.licenseType = undefined;

//     // Check if price and space are still at their default values
//     if (cleaned.price[0] === 0 && cleaned.price[1] === 1000000) {
//       cleaned.price = undefined;
//     }
//     if (cleaned.space[0] === 0 && cleaned.space[1] === 1000) {
//       cleaned.space = undefined;
//     }

//     // Check if purpose has any selected filters
//     if (!cleaned.purpose.selling && !cleaned.purpose.renting) {
//       cleaned.purpose = undefined;
//     }

//     // Clean attribute filters
//     const validAttributeFilters = attributeFilters.filter(
//       (filter) => filter.attribute !== "" && filter.value !== ""
//     );
//     if (validAttributeFilters.length === 0) {
//       cleaned.attributeFilters = undefined;
//     } else {
//       cleaned.attributeFilters = validAttributeFilters;
//     }

//     return cleaned;
//   };

//   const isRTL = i18n.language === "ar";

//   return (
//     <Paper
//       elevation={4}
//       sx={{
//         p: 3,
//         borderRadius: 4,
//         mb: 4,
//         maxHeight: "500px",
//         overflowY: "auto",
//         backgroundColor: "#fafafa",
//         direction: isRTL ? "rtl" : "ltr",
//         backgroundColor: theme.palette.background.paper, // Change this line
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         {t("properties.filterBar.title")}
//       </Typography>

//       <Stack spacing={2}>
//         {/* Property Type */}
//         <TextField
//           select
//           fullWidth
//           label={t("properties.filterBar.propertyType")}
//           value={filters.type}
//           onChange={(e) => handleFilterChange("type", e.target.value)}
//         >
//           <MenuItem value="">
//             <em>{t("properties.filterBar.allTypes")}</em>
//           </MenuItem>
//           {propertyTypes.map((type) => (
//             <MenuItem key={type.id} value={type.name}>
//               {type.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Selling / Renting */}
//         <Stack direction="row" spacing={2}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={filters.purpose.selling}
//                 onChange={(e) =>
//                   handlePurposeChange("selling", e.target.checked)
//                 }
//               />
//             }
//             label={t("properties.filterBar.selling")}
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={filters.purpose.renting}
//                 onChange={(e) =>
//                   handlePurposeChange("renting", e.target.checked)
//                 }
//               />
//             }
//             label={t("properties.filterBar.renting")}
//           />
//         </Stack>

//         {/* Price Range */}
//         <Box>
//           <Typography gutterBottom>
//             {t("properties.filterBar.priceRange")}: {filters.price[0]} -{" "}
//             {filters.price[1]}
//           </Typography>
//           <Slider
//             value={filters.price}
//             onChange={(e, v) => handleFilterChange("price", v)}
//             min={0}
//             max={1000000}
//             step={10000}
//             valueLabelDisplay="auto"
//           />
//         </Box>

//         {/* Space Range */}
//         <Box>
//           <Typography gutterBottom>
//             {t("properties.filterBar.space")}: {filters.space[0]} -{" "}
//             {filters.space[1]}
//           </Typography>
//           <Slider
//             value={filters.space}
//             onChange={(e, v) => handleFilterChange("space", v)}
//             min={0}
//             max={1000}
//             step={10}
//             valueLabelDisplay="auto"
//           />
//         </Box>

//         {/* License Type */}
//         <TextField
//           select
//           fullWidth
//           label={t("properties.filterBar.licenseType")}
//           value={filters.licenseType}
//           onChange={(e) => handleFilterChange("licenseType", e.target.value)}
//         >
//           <MenuItem value="">
//             <em>{t("properties.filterBar.allTypes")}</em>
//           </MenuItem>
//           {licenseTypes.map((type) => (
//             <MenuItem key={type.id} value={type.name}>
//               {type.name}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Attribute Filters */}
//         <Divider />
//         <Typography variant="subtitle2" mt={2}>
//           {t("properties.filterBar.attributeFilters")}
//         </Typography>

//         <Stack spacing={2}>
//           {attributeFilters.map((filter, index) => (
//             <Stack key={index} direction="row" spacing={2} alignItems="center">
//               <Box sx={{ flex: 1 }}>
//                 <Select
//                   options={attributeOptions}
//                   value={
//                     attributeOptions.find(
//                       (opt) => opt.value === filter.attribute
//                     ) || null
//                   }
//                   onChange={(selected) =>
//                     handleAttributeChange(
//                       index,
//                       "attribute",
//                       selected?.value || ""
//                     )
//                   }
//                   placeholder={t("properties.filterBar.selectAttribute")}
//                 />
//               </Box>
//               <TextField
//                 label={t("properties.filterBar.value")}
//                 type="number"
//                 value={filter.value}
//                 onChange={(e) =>
//                   handleAttributeChange(index, "value", e.target.value)
//                 }
//                 sx={{ width: 100 }}
//                 inputProps={{ min: 0 }}
//               />
//               <IconButton
//                 onClick={() => removeAttributeFilter(index)}
//                 color="error"
//               >
//                 <RemoveCircleOutlineIcon />
//               </IconButton>
//             </Stack>
//           ))}
//           {filters.type && availableAttributes.length > 0 && (
//             <Button
//               startIcon={<AddIcon />}
//               variant="outlined"
//               onClick={addAttributeFilter}
//               sx={{ width: "fit-content", alignSelf: "flex-start" }}
//             >
//               {t("properties.filterBar.addAttributeFilter")}
//             </Button>
//           )}
//         </Stack>

//         {/* Location Filters */}
//         <Divider />
//         <Typography variant="subtitle2" mt={2}>
//           {t("properties.filterBar.location")}
//         </Typography>
//         <TextField
//           fullWidth
//           label={t("properties.filterBar.governorate")}
//           value={filters.location.governorate}
//           onChange={(e) => handleLocationChange("governorate", e.target.value)}
//           variant="outlined"
//         />
//         <TextField
//           fullWidth
//           label={t("properties.filterBar.province")}
//           value={filters.location.province}
//           onChange={(e) => handleLocationChange("province", e.target.value)}
//           variant="outlined"
//         />
//         <TextField
//           fullWidth
//           label={t("properties.filterBar.city")}
//           value={filters.location.city}
//           onChange={(e) => handleLocationChange("city", e.target.value)}
//           variant="outlined"
//         />
//         <TextField
//           fullWidth
//           label={t("properties.filterBar.street")}
//           value={filters.location.street}
//           onChange={(e) => handleLocationChange("street", e.target.value)}
//           variant="outlined"
//         />

//         <Divider sx={{ my: 2 }} />

//         <Button variant="contained" onClick={handleSubmit} color="primary">
//           {t("properties.filterBar.applyFilters")}
//         </Button>
//       </Stack>
//     </Paper>
//   );
// };

// export default FilterBar;




import React, { useEffect, useState } from "react";
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
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttributes,
  fetchPropertyTypes,
} from "../redux/property type/propertyTypeSlice";
import { fetchLicenseTypes } from "../redux/license type/licenseTypeSlice";

const FilterBar = ({ onFilter }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [filters, setFilters] = useState({
    type: "",
    purpose: { selling: false, renting: false },
    price: [0, 1000000],
    space: [0, 1000],
    licenseType: "",
    location: {
      governorate: "",
      province: "",
      city: "",
      street: "",
    },
  });

  const [attributeFilters, setAttributeFilters] = useState([]);

  const { licenseTypes } = useSelector((state) => state.licenseType);
  const { propertyTypes, attributes } = useSelector(
    (state) => state.propertyType
  );

  const selectedPropertyType = propertyTypes.find(
    (type) => type.name === filters.type
  );

  const availableAttributes = selectedPropertyType
    ? selectedPropertyType.attributes.map((pta) => pta.attribute)
    : [];

  const attributeOptions = availableAttributes.map((attr) => ({
    value: attr.name,
    label: attr.name,
  }));

  useEffect(() => {
    dispatch(fetchAttributes());
    dispatch(fetchPropertyTypes());
    dispatch(fetchLicenseTypes());
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePropertyTypeChange = (e) => {
    const { value } = e.target;
    // Reset attribute filters when property type changes
    handleFilterChange("type", value);
    setAttributeFilters([]);
  };

  const handlePurposeChange = (purposeKey, checked) => {
    setFilters((prev) => ({
      ...prev,
      purpose: {
        ...prev.purpose,
        [purposeKey]: checked,
      },
    }));
  };

  const handleLocationChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [key]: value,
      },
    }));
  };

  const handleAttributeValueChange = (index, value) => {
    setAttributeFilters((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              value: value,
            }
          : item
      )
    );
  };

  const handleAttributeNameChange = (index, selectedOption) => {
    const selectedAttributeName = selectedOption?.value || "";
    const attributeDetails = availableAttributes.find(
      (attr) => attr.name === selectedAttributeName
    );

    let initialValue = "";
    if (attributeDetails) {
      if (attributeDetails.type === "number") {
        initialValue = "";
      }
      if (attributeDetails.type === "boolean") {
        initialValue = false;
      }
    }

    setAttributeFilters((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              attribute: selectedAttributeName,
              value: initialValue,
            }
          : item
      )
    );
  };

  const addAttributeFilter = () => {
    setAttributeFilters((prev) => [...prev, { attribute: "", value: "" }]);
  };

  const removeAttributeFilter = (index) => {
    setAttributeFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const cleanedFilters = cleanFilters(filters, attributeFilters);
    onFilter(cleanedFilters);
  };

  const cleanFilters = (filters, attributeFilters) => {
    const cleaned = { ...filters };

    // Clean location object
    if (
      Object.values(cleaned.location).every(
        (val) => !val || (typeof val === "string" && val.trim() === "")
      )
    ) {
      cleaned.location = undefined;
    } else {
      for (const key in cleaned.location) {
        if (cleaned.location[key] === "") {
          cleaned.location[key] = undefined;
        }
      }
    }

    // Clean other fields
    if (cleaned.type === "") cleaned.type = undefined;
    if (cleaned.licenseType === "") cleaned.licenseType = undefined;

    // Check if price and space are still at their default values
    if (cleaned.price[0] === 0 && cleaned.price[1] === 1000000) {
      cleaned.price = undefined;
    }
    if (cleaned.space[0] === 0 && cleaned.space[1] === 1000) {
      cleaned.space = undefined;
    }

    // Check if purpose has any selected filters
    if (!cleaned.purpose.selling && !cleaned.purpose.renting) {
      cleaned.purpose = undefined;
    }

    // Clean attribute filters
    const validAttributeFilters = attributeFilters
      .filter((filter) => {
        const attributeDetails = availableAttributes.find(
          (attr) => attr.name === filter.attribute
        );
        // Exclude empty number and unchecked boolean attributes
        if (attributeDetails?.type === "number") {
          return filter.attribute !== "" && filter.value !== "";
        }
        if (attributeDetails?.type === "boolean") {
          return filter.value === true;
        }
        return false;
      })
      .map((filter) => {
        const attributeDetails = availableAttributes.find(
          (attr) => attr.name === filter.attribute
        );
        const attributeType = attributeDetails?.type;

        // Correctly format boolean values to 1
        if (attributeType === "boolean") {
          return { ...filter, value: 1 };
        }
        return filter;
      });

    if (validAttributeFilters.length === 0) {
      cleaned.attributeFilters = undefined;
    } else {
      cleaned.attributeFilters = validAttributeFilters;
    }

    return cleaned;
  };

  const isRTL = i18n.language === "ar";

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 4,
        mb: 4,
        maxHeight: "500px",
        overflowY: "auto",
        backgroundColor: "#fafafa",
        direction: isRTL ? "rtl" : "ltr",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {t("properties.filterBar.title")}
      </Typography>

      <Stack spacing={2}>
        {/* Property Type */}
        <TextField
          select
          fullWidth
          label={t("properties.filterBar.propertyType")}
          value={filters.type}
          onChange={handlePropertyTypeChange}
        >
          <MenuItem value="">
            <em>{t("properties.filterBar.allTypes")}</em>
          </MenuItem>
          {propertyTypes.map((type) => (
            <MenuItem key={type.id} value={type.name}>
              {type.name}
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
                  handlePurposeChange("selling", e.target.checked)
                }
              />
            }
            label={t("properties.filterBar.selling")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.purpose.renting}
                onChange={(e) =>
                  handlePurposeChange("renting", e.target.checked)
                }
              />
            }
            label={t("properties.filterBar.renting")}
          />
        </Stack>

        {/* Price Range */}
        <Box>
          <Typography gutterBottom>
            {t("properties.filterBar.priceRange")}: {filters.price[0]} -{" "}
            {filters.price[1]}
          </Typography>
          <Slider
            value={filters.price}
            onChange={(e, v) => handleFilterChange("price", v)}
            min={0}
            max={1000000}
            step={10000}
            valueLabelDisplay="auto"
          />
        </Box>

        {/* Space Range */}
        <Box>
          <Typography gutterBottom>
            {t("properties.filterBar.space")}: {filters.space[0]} -{" "}
            {filters.space[1]}
          </Typography>
          <Slider
            value={filters.space}
            onChange={(e, v) => handleFilterChange("space", v)}
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
          label={t("properties.filterBar.licenseType")}
          value={filters.licenseType}
          onChange={(e) => handleFilterChange("licenseType", e.target.value)}
        >
          <MenuItem value="">
            <em>{t("properties.filterBar.allTypes")}</em>
          </MenuItem>
          {licenseTypes.map((type) => (
            <MenuItem key={type.id} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Attribute Filters */}
        <Divider />
        <Typography variant="subtitle2" mt={2}>
          {t("properties.filterBar.attributeFilters")}
        </Typography>

        <Stack spacing={2}>
          {attributeFilters.map((filter, index) => {
            const foundAttribute = availableAttributes.find(
              (attr) => attr.name === filter.attribute
            );

            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Box sx={{ flex: 1 }}>
                  <Select
                    options={attributeOptions}
                    value={
                      attributeOptions.find(
                        (opt) => opt.value === filter.attribute
                      ) || null
                    }
                    onChange={(selected) =>
                      handleAttributeNameChange(index, selected)
                    }
                    placeholder={t("properties.filterBar.selectAttribute")}
                  />
                </Box>
                {/* Conditional Rendering based on attribute type */}
                {foundAttribute?.type === "boolean" ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filter.value}
                        onChange={(e) =>
                          handleAttributeValueChange(
                            index,
                            e.target.checked
                          )
                        }
                      />
                    }
                    label={t("properties.filterBar.value")}
                  />
                ) : (
                  <TextField
                    label={t("properties.filterBar.value")}
                    type="number"
                    value={filter.value}
                    onChange={(e) =>
                      handleAttributeValueChange(
                        index,
                        e.target.value
                      )
                    }
                    sx={{ width: 100 }}
                    inputProps={{ min: 0 }}
                  />
                )}
                <IconButton
                  onClick={() => removeAttributeFilter(index)}
                  color="error"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Stack>
            );
          })}
          {filters.type && availableAttributes.length > 0 && (
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={addAttributeFilter}
              sx={{ width: "fit-content", alignSelf: "flex-start" }}
            >
              {t("properties.filterBar.addAttributeFilter")}
            </Button>
          )}
        </Stack>

        {/* Location Filters */}
        <Divider />
        <Typography variant="subtitle2" mt={2}>
          {t("properties.filterBar.location")}
        </Typography>
        <TextField
          fullWidth
          label={t("properties.filterBar.governorate")}
          value={filters.location.governorate}
          onChange={(e) => handleLocationChange("governorate", e.target.value)}
          variant="outlined"
        />
        <TextField
          fullWidth
          label={t("properties.filterBar.province")}
          value={filters.location.province}
          onChange={(e) => handleLocationChange("province", e.target.value)}
          variant="outlined"
        />
        <TextField
          fullWidth
          label={t("properties.filterBar.city")}
          value={filters.location.city}
          onChange={(e) => handleLocationChange("city", e.target.value)}
          variant="outlined"
        />
        <TextField
          fullWidth
          label={t("properties.filterBar.street")}
          value={filters.location.street}
          onChange={(e) => handleLocationChange("street", e.target.value)}
          variant="outlined"
        />

        <Divider sx={{ my: 2 }} />

        <Button variant="contained" onClick={handleSubmit} color="primary">
          {t("properties.filterBar.applyFilters")}
        </Button>
      </Stack>
    </Paper>
  );
};

export default FilterBar;