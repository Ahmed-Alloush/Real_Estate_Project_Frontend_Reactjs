// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   getAllOffices,
// // } from "../redux/office/officeSlice";
// // import {
// //   Container,
// //   Typography,
// //   Grid,
// //   CircularProgress,
// //   Alert,
// // } from "@mui/material";
// // import OfficeCard from "../components/OfficeCard";

// // const OfficesPage = () => {
// //   const dispatch = useDispatch();
// //   const { offices, loading, error } = useSelector((state) => state.office);

// //   useEffect(() => {
// //     dispatch(getAllOffices());
// //   }, [dispatch]);

// //   const handleDelete = (id) => {
// //     if (window.confirm("Are you sure you want to delete this office?")) {
// //       dispatch(deleteOffice(id));
// //     }
// //   };

// //   const handleEdit = (id) => {
// //     // you could navigate to an edit page, for now just log
// //     console.log("Edit office", id);
// //   };

// //   return (
// //     <Container sx={{ mt: 4 }}>
// //       {/* <Typography variant="h4" gutterBottom>
// //         Offices
// //       </Typography> */}

// //       {loading && <CircularProgress />}
// //       {error && <Alert severity="error">{error.message || error}</Alert>}

// //       <Grid container spacing={3} sx={{ mt: 2 }}>
// //         {offices.map((office) => (
// //           <Grid item xs={12} sm={6} md={4} key={office.id}>
// //             <OfficeCard
// //               id={office.id}
// //               name={office.name}
// //               office_photo={office.office_photo}
// //               office_phone={office.office_phone}
// //               ratingsCount={office.ratingsCount}
// //             />
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Container>
// //   );
// // };

// // export default OfficesPage;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOffices, setPage } from "../redux/office/officeSlice";
// import {
//   Container,
//   Typography,
//   Grid,
//   CircularProgress,
//   Alert,
//   Box,
//   Pagination,
//   Button,
// } from "@mui/material";
// import OfficeCard from "../components/OfficeCard";
// import { FaPlus } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const OfficesPage = () => {
//   const dispatch = useDispatch();
//   const { offices, loading, error, officePagination } = useSelector(
//     (state) => state.office
//   );

//   const { user } = useSelector((state) => state.auth);

//   const page = officePagination?.page || 1;
//   const pageCount = officePagination?.pageCount || 1;

//   useEffect(() => {
//     dispatch(getAllOffices({ page }));
//   }, [dispatch, page]);

//   const handlePageChange = (event, value) => {
//     dispatch(setPage(value)); // Set the new page in the slice
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this office?")) {
//       dispatch(deleteOffice(id));
//     }
//   };

//   const handleEdit = (id) => {
//     // you could navigate to an edit page, for now just log
//     console.log("Edit office", id);
//   };

//   return (
//     <Container sx={{ mt: 4 }}>
//       {(user?.role !== "officeManager")&& (user?.office) && (
//         <Link to={"/create-office"}>
//           <Button variant="contained" startIcon={<FaPlus />} sx={{ mt: 2 }}>
//             Create Your own Office.
//           </Button>
//         </Link>
//       )}

//       {offices?.length === 0 && (
//         <Alert severity="info" sx={{ mt: 3 }}>
//           There aren't any offices yet.
//         </Alert>
//       )}
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error.message || error}</Alert>}

//       <Grid container spacing={3} sx={{ mt: 2 }}>
//         {offices.map((office) => {
//           return (
//             <Grid item xs={12} sm={6} md={4} key={office.id}>
//               <OfficeCard
//                 id={office.id}
//                 name={office.name}
//                 office_photo={office.office_photo}
//                 office_phone={office.office_phone}
//                 averageRating={office.averageRating}
//               />
//             </Grid>
//           );
//         })}
//       </Grid>

//       {pageCount > 1 && (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <Pagination
//             count={pageCount}
//             page={page}
//             onChange={handlePageChange}
//             color="primary"
//           />
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default OfficesPage;




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffices, setPage, deleteOffice } from "../redux/office/officeSlice";
import {
  Container,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Pagination,
  Button,
} from "@mui/material";
import OfficeCard from "../components/OfficeCard";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OfficesPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { offices, loading, error, officePagination } = useSelector(
    (state) => state.office
  );
  console.log("this is the offices : ",offices);
  console.log("this is the officePagination : ",officePagination);
  
  const { user } = useSelector((state) => state.auth);

  const page = officePagination?.page || 1;
  const pageCount = officePagination?.pageCount || 1;

  useEffect(() => {
    dispatch(getAllOffices({ page }));
  }, [dispatch, page]);

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));
  };

  const handleDelete = (id) => {
    if (window.confirm(t("officesPage.confirmDelete"))) {
      dispatch(deleteOffice(id));
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {(user?.role !== "officeManager") && !user?.office && (
        <Link to="/create-office">
          <Button variant="contained" startIcon={<FaPlus />} sx={{ mt: 2 }}>
            {t("officesPage.createOffice")}
          </Button>
        </Link>
      )}

      {offices?.length === 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          {t("officesPage.noOffices")}
        </Alert>
      )}

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error.message || error}</Alert>}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {offices.map((office) => (
          <Grid item xs={12} sm={6} md={4} key={office.id}>
            <OfficeCard
              id={office.id}
              name={office.name} // keep backend data as is
              office_photo={office.office_photo}
              // office_phone={office.office_phone}
              averageRating={office.averageRating}
              onDelete={() => handleDelete(office.id)}
            />
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default OfficesPage;

