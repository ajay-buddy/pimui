import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "applicationSlice",
  initialState: {
    applicationList: [],
    application: {},
    uploadedApplicationSuccess: [],
    uploadedApplicationFailed: [],
    userApplications: [],
    loading: false,
  },
  reducers: {
    bulkApplicationRequest: (state, action) => {
      state.loading = true;
      state.uploadedApplicationSuccess = [];
      state.uploadedApplicationFailed = [];
    },
    bulkApplicationSuccess: (state, action) => {
      state.loading = false;
      state.uploadedApplicationSuccess =
        state.uploadedApplicationSuccess.concat(action?.payload?.success);
      state.uploadedApplicationFailed = state.uploadedApplicationFailed.concat(
        action?.payload?.failed
      );
    },
    applicationDeleteRequest: (state, action) => {
      state.loading = true;
    },
    applicationCreateRequest: (state, action) => {
      state.loading = true;
    },
    applicationListRequest: (state, action) => {
      state.loading = true;
    },
    applicationRequest: (state, action) => {
      state.loading = true;
    },
    applicationListSuccess: (state, action) => {
      state.loading = false;
      state.applicationList = [...action.payload];
    },
    applicationRequestSuccess: (state, action) => {
      state.loading = false;
      state.application = { ...action.payload };
    },
    applicationError: (state, action) => {
      state.loading = false;
    },
    userApplicationListRequest: (state, action) => {
      state.loading = true;
    },
    userApplicationListSuccess: (state, action) => {
      state.loading = false;
      state.userApplications = [...action.payload];
    },
  },
});

export const applicationListSelector = (state) =>
  state?.application?.applicationList;
export const applicationSelector = (state) => state?.application?.application;
export const applicationBulkUploadSelector = (state) => ({
  success: state?.application?.uploadedApplicationSuccess,
  failed: state?.application?.uploadedApplicationFailed,
});
export const applicationRequestSuccessSelector = (state) =>
state?.application?.application;
export const userApplicationRequestSuccessSelector = (state) =>
state?.application?.userApplications;
export const applicationLoading = state => state?.application?.loading;

export const {
  bulkApplicationRequest,
  bulkApplicationSuccess,
  applicationCreateRequest,
  applicationDeleteRequest,
  applicationListRequest,
  applicationRequest,
  applicationListSuccess,
  applicationRequestSuccess,
  applicationError,
  userApplicationListRequest,
  userApplicationListSuccess,
} = applicationSlice.actions;

export default applicationSlice.reducer;
