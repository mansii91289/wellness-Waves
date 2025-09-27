import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentEmployee: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentEmployee = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateEmployeeStart: (state) => {
      state.loading = true;
    },
    updateEmployeeSuccess: (state, action) => {
      state.currentEmployee = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateEmployeeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteEmployeeStart: (state) => {
      state.loading = true;
    },
    deleteEmployeeSuccess: (state) => {
      state.currentEmployee = null;
      state.loading = false;
      state.error = null;
    },
    deleteEmployeeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutEmployeeStart: (state) => {
      state.loading = true;
    },
    signOutEmployeeSuccess: (state) => {
      state.currentEmployee = null;
      state.loading = false;
      state.error = null;
    },
    signOutEmployeeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateEmployeeStart,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  signOutEmployeeStart,
  signOutEmployeeSuccess,
  signOutEmployeeFailure,
} = authSlice.actions;

export default authSlice.reducer;