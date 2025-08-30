// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button, TextField, Typography, Grid, Box, CircularProgress, Alert } from '@mui/material';
// import { addAdmin } from '../redux/superAdmin/superAdminSlice';
// import { useNavigate } from 'react-router-dom';

// const AddAdminForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, success, error } = useSelector((state) => state.superAdmin);

//   const [formData, setFormData] = useState({
//     email: '',
//     phone: '',
//     first_name: '',
//     last_name: '',
//     national_number: '',
//     password: '',
//     profile_photo: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, profile_photo: e.target.files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     dispatch(addAdmin(formDataToSend));
//   };

//   if (success) {
//     setTimeout(() => {
//       navigate('/superadmin'); // Redirect to admin dashboard or other page
//     }, 2000);
//   }

//   return (
//     <Box sx={{ width: '50%', margin: '0 auto', mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Add New Admin</Typography>
      
//       {error && <Alert severity="error">{error}</Alert>}
//       {success && <Alert severity="success">Admin created successfully!</Alert>}

//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="First Name"
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Last Name"
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="National Number"
//               name="national_number"
//               value={formData.national_number}
//               onChange={handleChange}
//               required
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <input
//               type="file"
//               name="profile_photo"
//               onChange={handleFileChange}
//             />
//           </Grid>

//           <Grid item xs={12} mt={2}>
//             <Button variant="contained" type="submit" fullWidth disabled={loading}>
//               {loading ? <CircularProgress size={24} /> : 'Create Admin'}
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default AddAdminForm;






import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Grid, Box, CircularProgress, Alert } from '@mui/material';
import { addAdmin } from '../redux/superAdmin/superAdminSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddAdminForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.superAdmin);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    national_number: '',
    password: '',
    profile_photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    dispatch(addAdmin(formDataToSend));
  };

  if (success) {
    setTimeout(() => {
      navigate('/superadmin');
    }, 2000);
  }

  return (
    <Box sx={{ width: '50%', margin: '0 auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t("addAdmin.title")}
      </Typography>
      
      {error && <Alert severity="error">{t("addAdmin.error")}: {error}</Alert>}
      {success && <Alert severity="success">{t("addAdmin.success")}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("addAdmin.email")}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("addAdmin.phone")}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("addAdmin.firstName")}
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("addAdmin.lastName")}
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("addAdmin.nationalNumber")}
              name="national_number"
              value={formData.national_number}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("addAdmin.password")}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <input
              type="file"
              name="profile_photo"
              onChange={handleFileChange}
            />
          </Grid>

          <Grid item xs={12} mt={2}>
            <Button variant="contained" type="submit" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : t("addAdmin.submit")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddAdminForm;
