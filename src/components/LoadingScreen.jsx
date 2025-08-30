// import React from "react";
// import { Box, CircularProgress, Typography } from "@mui/material";

// export default function LoadingScreen() {
//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: "300px",
//         padding: 4,
//         bgcolor: "rgba(37, 37, 37, 0.8)",
//         borderRadius: 2,
//         zIndex: 9999,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//         color: "white",
//       }}
//     >
//       <CircularProgress color="inherit" />
//       <Typography variant="body1" sx={{ mt: 2 }}>
//         Loading...
//       </Typography>
//     </Box>
//   );
// }





import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LoadingScreen() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "300px",
        padding: 4,
        bgcolor: "rgba(37, 37, 37, 0.8)",
        borderRadius: 2,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
      }}
    >
      
      <CircularProgress color="inherit" />
      <Typography variant="body1" sx={{ mt: 2 }}>
        {t("loadingScreen.loading")}
      </Typography>
    </Box>
  );
}