// import React from 'react';
// import { Switch, styled } from '@mui/material';
// import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Sun icon
// import Brightness2Icon from '@mui/icons-material/Brightness2'; // Moon icon

// // You can create a custom styled component for clarity
// export const DarkModeSwitch = styled(Switch)(({ theme }) => ({
//   width: 62,
//   height: 34,
//   padding: 7,
//   '& .MuiSwitch-switchBase': {
//     margin: 1,
//     padding: 0,
//     transform: 'translateX(6px)',
//     '&.Mui-checked': {
//       transform: 'translateX(22px)',
//       '& .MuiSwitch-thumb': {
//         // Change thumb icon for dark mode
//         backgroundColor: '#fff',
//         '& .MuiSvgIcon-root': {
//           color: '#fff',
//         },
//       },
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     width: 32,
//     height: 32,
//     backgroundColor: '#fff', // Default thumb color
//     '&::before': {
//       content: '""',
//       position: 'absolute',
//       width: '100%',
//       height: '100%',
//       // Conditionally render the icon based on state (or a theme variable)
//       // This is a simplified example; a better approach is to manage this in state
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#000')}" d="M4.2 2.5l-.5.5v1.2l-.5.5z"/></svg>')`,
//       backgroundRepeat: 'no-repeat',
//       backgroundPosition: 'center',
//     },
//   },
//   '& .MuiSwitch-track': {
//     borderRadius: 20 / 2,
//     backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//     opacity: 1,
//     transition: theme.transitions.create(['background-color'], {
//       duration: 500,
//     }),
//   },
// }));



import React from 'react';
import { Switch, styled } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Sun icon for light mode
import Brightness2Icon from '@mui/icons-material/Brightness2'; // Moon icon for dark mode

// Create a custom styled component for clarity
export const DarkModeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb': {
        // Change thumb icon for dark mode
        backgroundColor: '#fff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 32,
    height: 32,
    backgroundColor: '#fff', // Default thumb color
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

// This is how you would use it in your component
// You pass the icon and checkedIcon props directly to the component when you use it
// as shown in the App component below.