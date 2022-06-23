import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    username: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    uploadedProfileSuccess: [],
    bulkFailed: [],
    bulkSuccess: "",
    loading: false,
  },
  reducers: {
    getProfileUrlRequest: (state, action) => {
      state.loading = true;
    },
    getProfileUrlSuccess: (state, action) => {
      state.profileUpdateUrl = action?.payload;
      state.loading = false;
    },
    bulkRegisterRequest: (state, action) => {
      state.loading = true;
      state.bulkFailed = []
      state.bulkSuccess = []
    },
    bulkRegisterSuccess: (state, action) => {
      state.loading = false;
      state.bulkFailed = action?.payload?.failed || [];
      state.bulkSuccess = action?.payload?.success || [];
    },
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
      state.username = action.payload?.username;
      state.isAuthenticated = true;
      state.loading = false;
    },
    registerFailed: (state, action) => {
      state.loading = false;
    },
    logoutRequest: (state, action) => {
      state.isAuthenticated = false;
    },
  },
});

export const authSelector = (state) => state?.auth?.isAuthenticated;
export const registerSelector = (state) => state?.auth?.username;
export const profileUrlSelector = (state) => state.auth?.profileUpdateUrl;
export const bulkRegisterSuccessSelector = (state) => ({
  success: state?.auth?.bulkSuccess,
  failed: state?.auth?.bulkFailed,
});
export const authLoading = state => state?.auth?.loading;
export const {
  getProfileUrlRequest,
  getProfileUrlSuccess,
  loginRequest,
  loginSuccess,
  loginFailed,
  bulkRegisterRequest,
  bulkRegisterSuccess,
  registerRequest,
  registerSuccess,
  registerFailed,
} = authSlice.actions;

export default authSlice.reducer;
