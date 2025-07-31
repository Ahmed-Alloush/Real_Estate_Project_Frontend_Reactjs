// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { createOffice } from "../features/office/officeSlice";

// // const CreateOfficeForm = () => {
// //   const dispatch = useDispatch();
// //   const { loading, success, error } = useSelector((state) => state.office);

// //   const [officeName, setOfficeName] = useState("");
// //   const [licenseNumber, setLicenseNumber] = useState("");
// //   const [personalIdentityNumber, setPersonalIdentityNumber] = useState("");
// //   const [file, setFile] = useState(null);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const formData = new FormData();
// //     formData.append("office_name", officeName);
// //     formData.append("license_number", licenseNumber);
// //     formData.append("personal_identity_number", personalIdentityNumber);
// //     if (file) formData.append("file", file);

// //     dispatch(createOffice(formData));
// //   };

// //   return (
// //     <div className="p-4 max-w-md mx-auto shadow rounded">
// //       <h2 className="text-xl font-bold mb-4">Create Office</h2>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <div>
// //           <label>Office Name</label>
// //           <input
// //             type="text"
// //             value={officeName}
// //             onChange={(e) => setOfficeName(e.target.value)}
// //             required
// //             className="w-full p-2 border rounded"
// //           />
// //         </div>

// //         <div>
// //           <label>License Number</label>
// //           <input
// //             type="text"
// //             value={licenseNumber}
// //             onChange={(e) => setLicenseNumber(e.target.value)}
// //             required
// //             className="w-full p-2 border rounded"
// //           />
// //         </div>

// //         <div>
// //           <label>Personal Identity Number</label>
// //           <input
// //             type="text"
// //             value={personalIdentityNumber}
// //             onChange={(e) => setPersonalIdentityNumber(e.target.value)}
// //             required
// //             className="w-full p-2 border rounded"
// //           />
// //         </div>

// //         <div>
// //           <label>Office Image (optional)</label>
// //           <input
// //             type="file"
// //             onChange={(e) => setFile(e.target.files[0])}
// //             accept="image/*"
// //             className="w-full p-2"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="bg-blue-600 text-white px-4 py-2 rounded"
// //         >
// //           {loading ? "Submitting..." : "Create Office"}
// //         </button>
// //       </form>

// //       {success && <p className="text-green-600 mt-2">Office created successfully.</p>}
// //       {error && <p className="text-red-600 mt-2">{error.message || error}</p>}
// //     </div>
// //   );
// // };

// // export default CreateOfficeForm;

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createOffice } from "../redux/office/officeSlice";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   Alert,
// } from "@mui/material";

// const CreateOffice = () => {
//   const dispatch = useDispatch();
//   const { loading, success, error } = useSelector((state) => state.office);

//   const [officeName, setOfficeName] = useState("");
//   const [licenseNumber, setLicenseNumber] = useState("");
//   const [personalIdentityNumber, setPersonalIdentityNumber] = useState("");
//   const [file, setFile] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", officeName);
//     formData.append("license_number", licenseNumber);
//     formData.append("personal_identity_number", personalIdentityNumber);
//     formData.append("license_photo", file[0]);
//     formData.append("office_photo", file[1]);
//     // if (file) formData.append("file", file);

//     dispatch(createOffice(formData));
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
//         <Typography variant="h5" component="h1" gutterBottom>
//           Create Office
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit} noValidate>
//           <TextField
//             fullWidth
//             label="Office Name"
//             value={officeName}
//             onChange={(e) => setOfficeName(e.target.value)}
//             margin="normal"
//             required
//           />

//           <TextField
//             fullWidth
//             label="License Number"
//             value={licenseNumber}
//             onChange={(e) => setLicenseNumber(e.target.value)}
//             margin="normal"
//             required
//           />

//           <TextField
//             fullWidth
//             label="Personal Identity Number"
//             value={personalIdentityNumber}
//             onChange={(e) => setPersonalIdentityNumber(e.target.value)}
//             margin="normal"
//             required
//           />

//           <Button
//             variant="contained"
//             component="label"
//             sx={{ marginY: 2 }}
//           >
//             Upload License Photo
//             <input
//               type="file"
//               hidden
//               accept="image/*"
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//           </Button>
//           {file && (
//             <Typography variant="body2" sx={{ marginTop: 1 }}>
//               Selected: {file[0].name}
//             </Typography>
//           )}

//               <Button
//             variant="contained"
//             component="label"
//             sx={{ marginY: 2 }}
//           >
//             Upload Office Image
//             <input
//               type="file"
//               hidden
//               accept="image/*"
//               onChange={(e) => setFile(e.target.files[1])}
//             />
//           </Button>
//           {file && (
//             <Typography variant="body2" sx={{ marginTop: 1 }}>
//               Selected: {file[1].name}
//             </Typography>
//           )}

//           <Box sx={{ marginTop: 2 }}>
//             <Button
//               variant="contained"
//               type="submit"
//               disabled={loading}
//               fullWidth
//               size="large"
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : "Create Office"}
//             </Button>
//           </Box>
//         </Box>

//         {success && (
//           <Alert severity="success" sx={{ marginTop: 2 }}>
//             Office created successfully!
//           </Alert>
//         )}
//         {error && (
//           <Alert severity="error" sx={{ marginTop: 2 }}>
//             {error.message || error}
//           </Alert>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default CreateOffice;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOffice } from "../redux/office/officeSlice";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateOfficeForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.office);
 
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  const [officeName, setOfficeName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [personalIdentityNumber, setPersonalIdentityNumber] = useState("");
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [officePhoto, setOfficePhoto] = useState(null);
  const [officePhone, setOfficePhone] = useState(null);
  const [officeEmail, setOfficeEmail] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!licensePhoto || !officePhoto) {
      alert("Please upload both license photo and office photo.");
      return;
    }

    const formData = new FormData();
    formData.append("name", officeName);
    formData.append("license_number", licenseNumber);
    formData.append("personal_identity_number", personalIdentityNumber);
    formData.append("license_photo", licensePhoto);
    formData.append("office_photo", officePhoto);
    formData.append("office_phone", officePhone);
    formData.append("office_email", officeEmail);

    dispatch(createOffice(formData));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create Office
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Office Name"
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="License Number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Office Phone"
            value={officePhone}
            onChange={(e) => setOfficePhone(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Office Email"
            value={officeEmail}
            onChange={(e) => setOfficeEmail(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Personal Identity Number"
            value={personalIdentityNumber}
            onChange={(e) => setPersonalIdentityNumber(e.target.value)}
            margin="normal"
            required
          />

          <Button variant="contained" component="label" sx={{ marginY: 2 }}>
            Upload License Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setLicensePhoto(e.target.files[0])}
            />
          </Button>
          {licensePhoto && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Selected License Photo: {licensePhoto.name}
            </Typography>
          )}

          <Button variant="contained" component="label" sx={{ marginY: 2 }}>
            Upload Office Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setOfficePhoto(e.target.files[0])}
            />
          </Button>
          {officePhoto && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Selected Office Photo: {officePhoto.name}
            </Typography>
          )}

          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              fullWidth
              size="large"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Office"
              )}
            </Button>
          </Box>
        </Box>

        {success && (
          <Alert severity="success" sx={{ marginTop: 2 }}>
            Office created successfully!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {error.message || error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default CreateOfficeForm;
