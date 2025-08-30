// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   Container,
//   Grid,
//   Divider,
//   Pagination,
//   Button,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchReservedProperties } from "../redux/property/propertySlice";
// import PhoneWhatsAppLink from "../components/PhoneWhatsAppLink ";
// import EmailLink from "../components/EmailLink";
// import { useNavigate } from "react-router-dom";

// const ReservedPropertyPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     reservedProperties,
//     reservedPropertiesLoading,
//     reservedPropertiesError,
//     reservedPropertiesPagination,
//   } = useSelector((state) => state.property);

//   const [page, setPage] = useState(reservedPropertiesPagination.page || 1);
//   const limit = reservedPropertiesPagination.limit || 6;

//   useEffect(() => {
//     dispatch(fetchReservedProperties({ page, limit }));
//   }, [dispatch, page]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Reserved Properties
//       </Typography>

//       {reservedPropertiesLoading ? (
//         <Box display="flex" justifyContent="center" mt={5}>
//           <CircularProgress />
//         </Box>
//       ) : reservedPropertiesError ? (
//         <Box display="flex" justifyContent="center" mt={5}>
//           <Typography color="error">
//             Error: {reservedPropertiesError}
//           </Typography>
//         </Box>
//       ) : reservedProperties?.length === 0 ? (
//         <>
//           <Box mx={'50%'} mt={'20%'} width={'30%'}>
//             <Typography variant="body1" color="text.secondary">
//               There are no properties here.
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={() => navigate("/")}
//               sx={{ mt: 2 }}
//             >
//               Browse Properties
//             </Button>
//           </Box>
//         </>
//       ) : (
//         <>
//           <Grid container spacing={4}>
//             {reservedProperties.map((property) => (
//               <Grid item xs={12} sm={6} md={4} key={property.id}>
//                 <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
//                   {property.photos?.[0]?.url && (
//                     <CardMedia
//                       component="img"
//                       height="200"
//                       image={property.photos[0].url}
//                       alt="Property"
//                     />
//                   )}
//                   <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                       <strong>Property Number : </strong> #
//                       {property.propertyNumber}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Type:</strong> {property.type?.name}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Operation:</strong> {property.typeOperation}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Space:</strong> {property.space} m²
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Price:</strong> {property.price} $
//                     </Typography>

//                     <Divider sx={{ my: 1 }} />

//                     <Typography
//                       variant="subtitle2"
//                       color="primary"
//                       gutterBottom
//                     >
//                       Office Info
//                     </Typography>
//                     <Typography variant="body2">
//                       <EmailLink email={property.office?.office_email} />
//                     </Typography>
//                     <Typography variant="body2">
//                       <PhoneWhatsAppLink
//                         phoneNumber={property.office?.office_phone}
//                       />
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           {reservedPropertiesPagination.pageCount > 1 && (
//             <Box display="flex" justifyContent="center" mt={4}>
//               <Pagination
//                 count={reservedPropertiesPagination.pageCount}
//                 page={page}
//                 onChange={handlePageChange}
//                 color="primary"
//               />
//             </Box>
//           )}
//         </>
//       )}
//     </Container>
//   );
// };

// export default ReservedPropertyPage;



import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Divider,
  Pagination,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservedProperties } from "../redux/property/propertySlice";
import PhoneWhatsAppLink from "../components/PhoneWhatsAppLink ";
import EmailLink from "../components/EmailLink";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReservedPropertyPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    reservedProperties,
    reservedPropertiesLoading,
    reservedPropertiesError,
    reservedPropertiesPagination,
  } = useSelector((state) => state.property);

  const [page, setPage] = useState(reservedPropertiesPagination.page || 1);
  const limit = reservedPropertiesPagination.limit || 6;

  useEffect(() => {
    dispatch(fetchReservedProperties({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t("reservedPropertyPage.pageTitle")}
      </Typography>

      {reservedPropertiesLoading ? (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <CircularProgress />
          <Typography mt={2}>{t("reservedPropertyPage.loading")}</Typography>
        </Box>
      ) : reservedPropertiesError ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <Typography color="error">
            {t("reservedPropertyPage.errorPrefix")} {reservedPropertiesError}
          </Typography>
        </Box>
      ) : reservedProperties?.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="50vh"
        >
          <Typography variant="h6" color="text.secondary">
            {t("reservedPropertyPage.noProperties")}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ mt: 2 }}
          >
            {t("reservedPropertyPage.browsePropertiesButton")}
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {reservedProperties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                  {property.photos?.[0]?.url && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={property.photos[0].url}
                      alt="Property"
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <strong>{t("reservedPropertyPage.propertyNumber")}</strong> #{property.propertyNumber}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{t("reservedPropertyPage.type")}</strong> {property.type?.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{t("reservedPropertyPage.operation")}</strong> {property.typeOperation}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{t("reservedPropertyPage.space")}</strong> {property.space} m²
                    </Typography>
                    <Typography variant="body2">
                      <strong>{t("reservedPropertyPage.price")}</strong> {property.price} $
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Typography
                      variant="subtitle2"
                      color="primary"
                      gutterBottom
                    >
                      {t("reservedPropertyPage.officeInfo")}
                    </Typography>
                    <Typography variant="body2">
                      <EmailLink email={property.office?.office_email} />
                    </Typography>
                    <Typography variant="body2">
                      <PhoneWhatsAppLink
                        phoneNumber={property.office?.office_phone}
                      />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {reservedPropertiesPagination.pageCount > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={reservedPropertiesPagination.pageCount}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ReservedPropertyPage;