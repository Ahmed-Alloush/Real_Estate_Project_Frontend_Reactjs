// // // import React, { useEffect, useState } from 'react';
// // // import { Container, Box, Typography, Divider } from '@mui/material';
// // // import PropertyList from '../components/PropertyList'; // or replace with new styled version
// // // import FilterBar from '../components/FilterBar';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { fetchPropertiesAndFilterThem } from '../redux/property/propertySlice';

// // // function PropertyPage() {

// // // const dispatch = useDispatch()

// // // const {properties,loading,error} = useSelector((state)=>state.property)

// // //   useEffect(()=>{
// // //     dispatch(fetchPropertiesAndFilterThem())
// // //   },[])

// // //   const [filteredProperties, setFilteredProperties] = useState([]);

// // //   const handleFilter = (searchText) => {
// // //     const lower = searchText.toLowerCase();
// // //     const filtered = mockProperties.filter((property) =>
// // //       property.propertyAttributes.some((attr) =>
// // //         attr.attribute.name.toLowerCase().includes(lower) ||
// // //         attr.value.toLowerCase().includes(lower)
// // //       )
// // //     );
// // //     setFilteredProperties(searchText ? filtered : mockProperties);
// // //   };

// // //   return (
// // //     <Container maxWidth="lg">
// // //       <Box py={5}>
// // //         <Typography variant="h4" fontWeight="bold" gutterBottom>
// // //           Browse Properties
// // //         </Typography>
// // //         <Typography variant="subtitle1" color="text.secondary" gutterBottom>
// // //           Use filters to narrow down your search
// // //         </Typography>

// // //         <FilterBar onSearch={handleFilter} />

// // //         <Divider sx={{ my: 4 }} />

// // //         <PropertyList
// // //           properties={filteredProperties}
// // //           canDelete={false}
// // //           isDeleteLoading={false}
// // //           onDelete={() => {}}
// // //         />
// // //       </Box>
// // //     </Container>
// // //   );
// // // }

// // // export default PropertyPage;

// // import React, { useEffect, useState } from 'react';
// // import { Container, Box, Typography, Divider, CircularProgress } from '@mui/material';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchProperties, fetchPropertiesAndFilterThem } from '../redux/property/propertySlice';
// // import PropertyList from '../components/PropertyList';
// // import FilterBar from '../components/FilterBar';

// // function PropertyPage() {
// //   const dispatch = useDispatch();
// //   const { properties, loading, error } = useSelector((state) => state.property);

// //   const [filteredProperties, setFilteredProperties] = useState(properties || []);

// //   useEffect(() => {
// //     if(!properties || properties?.length === 0){
// //       dispatch(fetchPropertiesAndFilterThem());
// //     }
// //   }, [dispatch,properties]);

// //   useEffect(() => {
// //     setFilteredProperties(properties); // Reset when Redux data loads
// //   }, [properties]);

// //   const handleFilter = async (filters) => {
// //     const {
// //       type,
// //       price,
// //       space,
// //       purpose,
// //       licenseType,
// //       location,
// //       attributeFilters,
// //     } = filters;

// //     const filtered = properties.filter((property) => {
// //       const matchType = type ? property.property_type?.name === type : true;
// //       const matchPrice = property.price >= price[0] && property.price <= price[1];
// //       const matchSpace = property.space >= space[0] && property.space <= space[1];
// //       const matchPurpose =
// //         (purpose.selling && property.purpose === 'selling') ||
// //         (purpose.renting && property.purpose === 'renting') ||
// //         (!purpose.selling && !purpose.renting); // if both unchecked => no filter

// //       const matchLicense = licenseType
// //         ? property.license_details?.license_type === licenseType
// //         : true;

// //       const matchLocation = ['governorate', 'province', 'city', 'street'].every((locKey) => {
// //         const filterVal = location[locKey];
// //         return filterVal
// //           ? property.location?.[locKey]?.toLowerCase() === filterVal.toLowerCase()
// //           : true;
// //       });

// //       const matchAttributes = attributeFilters.every((filter) => {
// //         return property.propertyAttributes.some(
// //           (attr) =>
// //             attr.attribute.name === filter.attribute &&
// //             attr.value === filter.value
// //         );
// //       });

// //       return (
// //         matchType &&
// //         matchPrice &&
// //         matchSpace &&
// //         matchPurpose &&
// //         matchLicense &&
// //         matchLocation &&
// //         matchAttributes
// //       );
// //     });

// //     setFilteredProperties(filtered);

// //     dispatch(fetchPropertiesAndFilterThem(filtered))
// //   };

// //   return (
// //     <Container maxWidth="lg">
// //       <Box py={5}>
// //         <Typography variant="h4" fontWeight="bold" gutterBottom>
// //           Browse Properties
// //         </Typography>
// //         <Typography variant="subtitle1" color="text.secondary" gutterBottom>
// //           Use filters to narrow down your search
// //         </Typography>

// //         <FilterBar onFilter={handleFilter} />

// //         <Divider sx={{ my: 4 }} />

// //         {loading ? (
// //           <Box textAlign="center">
// //             <CircularProgress />
// //           </Box>
// //         ) : (<>
// //           ({console.log("loading : ",loading,"filteredProperties : ",filteredProperties,"properties",properties)})
// //           <PropertyList
// //             properties={filteredProperties}
// //             canDelete={false}
// //             isDeleteLoading={false}
// //             onDelete={() => {}}
// //             />
// //             </>
// //         )}
// //       </Box>
// //     </Container>
// //   );
// // }

// // export default PropertyPage;

// // const [filteredProperties, setFilteredProperties] = useState([]);
// // useEffect(() => {
// //   setFilteredProperties(propertiesWithFiltering);
// // }, [propertiesWithFiltering]);
// // const {
// //   type,
// //   price,
// //   space,
// //   purpose,
// //   licenseType,
// //   location,
// //   attributeFilters,
// // } = filters;
// // const filtered = propertiesWithFiltering.filter((property) => {
// //   const matchType = type ? property.property_type?.name === type : true;
// //   const matchPrice = property.price >= price[0] && property.price <= price[1];
// //   const matchSpace = property.space >= space[0] && property.space <= space[1];
// //   const matchPurpose =
// //     (purpose.selling && property.purpose === 'selling') ||
// //     (purpose.renting && property.purpose === 'renting') ||
// //     (!purpose.selling && !purpose.renting);

// //   const matchLicense = licenseType
// //     ? property.license_details?.license_type === licenseType
// //     : true;

// //   const matchLocation = ['governorate', 'province', 'city', 'street'].every((locKey) => {
// //     const filterVal = location[locKey];
// //     return filterVal
// //       ? property.location?.[locKey]?.toLowerCase() === filterVal.toLowerCase()
// //       : true;
// //   });

// //   const matchAttributes = attributeFilters.every((filter) =>
// //     property.propertyAttributes.some(
// //       (attr) =>
// //         attr.attribute.name === filter.attribute &&
// //         attr.value === filter.value
// //     )
// //   );

// //   return (
// //     matchType &&
// //     matchPrice &&
// //     matchSpace &&
// //     matchPurpose &&
// //     matchLicense &&
// //     matchLocation &&
// //     matchAttributes
// //   );
// // }
// // );

// // setFilteredProperties(filtered);

// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPropertiesAndFilterThem } from "../redux/property/propertySlice";
// import PropertyList from "../components/PropertyList";
// import FilterBar from "../components/FilterBar";

// function PropertyPage() {
//   const dispatch = useDispatch();
//   const { propertiesWithFiltering, propertiesWithFilteringLoading:loading, propertiesWithFilteringError:error } = useSelector(
//     (state) => state.property
//   );


//   useEffect(() => {
//     if (!propertiesWithFiltering || propertiesWithFiltering.length === 0) {
//       dispatch(fetchPropertiesAndFilterThem());
//     }
//   }, [dispatch]);


//   const handleFilter = (filters) => {
    
//     dispatch(fetchPropertiesAndFilterThem(filters));
    
//   };
  
//   return (
//     <Container maxWidth="lg">
//       <Box py={5}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Browse Properties
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary" gutterBottom>
//           Use filters to narrow down your search
//         </Typography>

//         <FilterBar onFilter={handleFilter} />

//         <Divider sx={{ my: 4 }} />

//         {loading ? (
//           <Box textAlign="center">
//             <CircularProgress />
//           </Box>
//         ) : (
//           <PropertyList
//           properties={propertiesWithFiltering}
//           canDelete={false}
//           isDeleteLoading={false}
//           onDelete={() => {}}
//           />
//         )}
//       </Box>
//     </Container>
//   );
// }

// export default PropertyPage;







// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   Divider,
//   CircularProgress,
//   Pagination,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPropertiesAndFilterThem } from "../redux/property/propertySlice";
// import PropertyList from "../components/PropertyList";
// import FilterBar from "../components/FilterBar";

// function PropertyPage() {
//   const dispatch = useDispatch();

//   const {
//     propertiesWithFiltering,
//     propertiesFilteringPagination,
//     propertiesWithFilteringLoading: loading,
//     propertiesWithFilteringError: error,

//   } = useSelector((state) => state.property);

//   // Local state for page and filters
//   // const [page, setPage] = useState(1);
//   const [filters, setFilters] = useState({});

//   // Fetch properties on page or filter change
//   useEffect(() => {
//     dispatch(fetchPropertiesAndFilterThem({ ...filters, page }));
//   }, [dispatch, filters, page]);

//   const handleFilter = (newFilters) => {
//     setFilters(newFilters);
//     setPage(1); // Reset to page 1 on new filter
//   };

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   // Extract data and pagination details
//   const paginatedData = propertiesWithFiltering || [];
//   const page = propertiesFilteringPagination?.page || 1;
//   const total = propertiesFilteringPagination?.total || 0;
//   const limit = propertiesFilteringPagination?.limit || 10;
//   const pageCount = propertiesFilteringPagination?.pageCount || 1;
// console.log("propertiesFilteringPagination?.pageCount",propertiesFilteringPagination?.pageCount);

//   return (
//     <Container maxWidth="lg">
//       <Box py={5}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Browse Properties
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary" gutterBottom>
//           Use filters to narrow down your search
//         </Typography>

//         <FilterBar onFilter={handleFilter} />

//         <Divider sx={{ my: 4 }} />

//         {loading ? (
//           <Box textAlign="center">
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             <PropertyList
//               properties={paginatedData}
//               canDelete={false}
//               isDeleteLoading={false}
//               onDelete={() => {}}
//             />

//             {pageCount > 1 && (
//               <Box display="flex" justifyContent="center" mt={4}>
//                 <Pagination
//                   count={pageCount}
//                   page={page}
//                   onChange={handlePageChange}
//                   color="primary"
//                 />
//               </Box>
//             )}
//           </>
//         )}
//       </Box>
//     </Container>
//   );
// }

// export default PropertyPage;





import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPropertiesAndFilterThem,
  setPage 
} from "../redux/property/propertySlice";

import PropertyList from "../components/PropertyList";
import FilterBar from "../components/FilterBar";

function PropertyPage() {
  const dispatch = useDispatch();

  const {
    propertiesWithFiltering,
    propertiesFilteringPagination,
    propertiesWithFilteringLoading: loading,
    propertiesWithFilteringError: error,
  } = useSelector((state) => state.property);

  const [filters, setFilters] = useState({});

  const page = propertiesFilteringPagination?.page || 1;
  const total = propertiesFilteringPagination?.total || 0;
  const limit = propertiesFilteringPagination?.limit || 10;
  const pageCount = propertiesFilteringPagination?.pageCount || 1;

  // ✅ Fetch data when page or filters change
  useEffect(() => {
    dispatch(fetchPropertiesAndFilterThem({ ...filters, page }));
  }, [dispatch, filters, page]);

  // ✅ When filters change, reset page to 1
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    dispatch(setPage({ page: 1, limit })); // Reset to page 1
  };

  // ✅ Change page via Redux
  const handlePageChange = (event, value) => {
    dispatch(setPage({ page: value, limit }));
  };

  return (
    <Container maxWidth="lg">
      <Box py={5}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Browse Properties
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Use filters to narrow down your search
        </Typography>

        <FilterBar onFilter={handleFilter} />

        <Divider sx={{ my: 4 }} />

        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <PropertyList
              properties={propertiesWithFiltering || []}
              canDelete={false}
              isDeleteLoading={false}
              onDelete={() => {}}
            />

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
          </>
        )}
      </Box>
    </Container>
  );
}


export default PropertyPage;
