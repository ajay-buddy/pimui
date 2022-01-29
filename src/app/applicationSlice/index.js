import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "applicationSlice",
  initialState: {
    applicationList: [],
    application: {},
    uploadedApplicationSuccess: [],
    uploadedApplicationFailed: [],
  },
  reducers: {
    bulkApplicationRequest: (state, action) => {
      state.loading = true;
      state.uploadedApplicationSuccess = [];
      state.uploadedApplicationFailed = [];
    },
    bulkApplicationSuccess: (state, action) => {
      state.loading = true;
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
      state.loading = true;
      state.applicationList = [...action.payload];
    },
    applicationRequestSuccess: (state, action) => {
      state.loading = true;
      state.application = { ...action.payload };
    },
    applicationError: (state, action) => {
      state.loading = false;
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
} = applicationSlice.actions;

export default applicationSlice.reducer;
