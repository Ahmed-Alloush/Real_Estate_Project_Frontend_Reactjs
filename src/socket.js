// // src/socket.js
// import { io } from 'socket.io-client';

// const socket = io("http://localhost:3000"); // NestJS server URL
// export default socket;


// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { autoConnect: false }); // autoConnect: false for control
export default socket;

export const registerSocketUser = (userId) => {
  if (!socket.connected) socket.connect();
  socket.emit("registerUser", userId);
};

