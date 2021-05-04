import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    username: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.username = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailed: (state, action) => {
      state.loading = false;
    },
    registerRequest: (state, action) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.username = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    registerFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const authSelector = (state) => state.authSlice.authenticated;

export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  registerRequest,
  registerSuccess,
  registerFailed,
} = authSlice.actions;

export default authSlice.reducer;
