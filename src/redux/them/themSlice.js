// themSlice.js
import { createSlice } from "@reduxjs/toolkit";

const themSlice = createSlice({
  name: "them", // Changed from "property" for clarity
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
  extraReducers: (builder) => {},
});
export const { toggleTheme } = themSlice.actions;

export default themSlice.reducer;