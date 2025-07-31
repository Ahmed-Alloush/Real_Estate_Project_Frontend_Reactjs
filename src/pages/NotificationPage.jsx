// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   CircularProgress,
//   Paper,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getMyNotifications,
//   markNotificationAsRead,
//   selectNotification,
// } from "../redux/notification/notificationSlice";

// function NotificationPage() {
//   const dispatch = useDispatch();
//   const {
//     notifications,
//     isLoading,
//     error,
//     selectedNotification,
//   } = useSelector((state) => state.notification);

//   const [clickedId, setClickedId] = useState(null);

//   useEffect(() => {
//     dispatch(getMyNotifications());
//   }, [dispatch]);

//   const handleClickNotification = (notification) => {
//     setClickedId(notification.id);
//     if (!notification.isRead) {
//       dispatch(markNotificationAsRead(notification.id));
//     }
//     dispatch(selectNotification(notification));
//   };

//   return (
//     <Box sx={{ display: "flex", gap: 4, p: 4 }}>
//       <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
//         <Typography variant="h5" gutterBottom>
//           Notifications
//         </Typography>
//         {isLoading ? (
//           <CircularProgress />
//         ) : error ? (
//           <Typography color="error">{error}</Typography>
//         ) : (
//           <List>
//             {notifications.map((notif) => (
//               <React.Fragment key={notif.id}>
//                 <ListItem
//                   button
//                   onClick={() => handleClickNotification(notif)}
//                   sx={{
//                     backgroundColor:
//                       clickedId === notif.id ? "#f5f5f5" : "inherit",
//                   }}
//                 >
//                   <ListItemText
//                     primary={notif.title || "Notification"}
//                     secondary={notif.message}
//                     sx={{
//                       fontWeight: notif.isRead ? "normal" : "bold",
//                     }}
//                   />
//                 </ListItem>
//                 <Divider />
//               </React.Fragment>
//             ))}
//           </List>
//         )}
//       </Paper>

//       {selectedNotification && (
//         <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
//           <Typography variant="h6">Notification Details</Typography>
//           <Typography variant="subtitle1" mt={2}>
//             {selectedNotification.title || "No Title"}
//           </Typography>
//           <Typography variant="body2" mt={1}>
//             {selectedNotification.message}
//           </Typography>
//           <Typography variant="caption" color="text.secondary">
//             Created at:{" "}
//             {new Date(selectedNotification.createdAt).toLocaleString()}
//           </Typography>
//         </Paper>
//       )}
//     </Box>
//   );
// }

// export default NotificationPage;



import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "../redux/notification/notificationSlice";

function NotificationPage() {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notification
  );

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [clickedId, setClickedId] = useState(null);

  useEffect(() => {
    dispatch(getMyNotifications());
  }, [dispatch]);

  const handleClickNotification = (notification) => {
    setClickedId(notification.id);
    setSelectedNotification(notification);

    if (!notification.isRead) {
      dispatch(markNotificationAsRead(notification.id));
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 4, p: 4 }}>
      <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Notifications
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <List>
            {notifications.map((notif) => (
              <React.Fragment key={notif.id}>
                <ListItem
                  button
                  onClick={() => handleClickNotification(notif)}
                  sx={{
                    backgroundColor:
                      clickedId === notif.id ? "#f0f0f0" : "inherit",
                  }}
                >
                  <ListItemText
                    primary={notif.title || "Notification"}
                    secondary={notif.message}
                    primaryTypographyProps={{
                      fontWeight: notif.isRead ? "normal" : "bold",
                    }}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      {selectedNotification && (
        <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6">Notification Details</Typography>
          <Typography variant="subtitle1" mt={2}>
            {selectedNotification.title || "No Title"}
          </Typography>
          <Typography variant="body2" mt={1}>
            {selectedNotification.message}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Created at:{" "}
            {new Date(selectedNotification.createdAt).toLocaleString()}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default NotificationPage;
