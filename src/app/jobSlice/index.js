import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobSlice",
  initialState: {
    jobList: [],
    job: {},
    uploadedJobSuccess: [],
    uploadedJobFailed: [],
    jobListSearch: [],
  },
  reducers: {
    bulkJobRequest: (state, action) => {
      state.loading = true;
    },
    bulkJobSuccess: (state, action) => {
      state.loading = true;
      state.uploadedJobSuccess = state.uploadedJobSuccess.concat(
        action?.payload?.success
      );
      state.uploadedJobFailed = state.uploadedJobFailed.concat(
        action?.payload?.failed
      );
    },
    jobDeleteRequest: (state, action) => {
      state.loading = true;
    },
    jobCreateRequest: (state, action) => {
      state.loading = true;
    },
    jobSearchListRequest: (state, action) => {
      state.loading = true;
    },
    jobSearchListSuccess: (state, action) => {
      state.loading = true;
      state.jobListSearch = [...action.payload];
    },
    jobListRequest: (state, action) => {
      state.loading = true;
    },
    jobRequest: (state, action) => {
      state.loading = true;
    },
    jobListSuccess: (state, action) => {
      state.loading = true;
      state.jobList = [...action.payload];
    },
    jobRequestSuccess: (state, action) => {
      state.loading = true;
      state.job = { ...action.payload };
    },
    jobError: (state, action) => {
      state.loading = false;
    },
  },
});

export const jobListSelector = (state) => state?.job?.jobList;
export const jobSearchListSelector = (state) => state?.job?.jobListSearch;
export const jobSelector = (state) => state?.job?.job;
export const jobBulkUploadSelector = (state) => ({
  success: state?.job?.uploadedJobSuccess,
  failed: state?.job?.uploadedJobFailed,
});

export const {
  bulkJobRequest,
  bulkJobSuccess,
  jobCreateRequest,
  jobDeleteRequest,
  jobListRequest,
  jobRequest,
  jobListSuccess,
  jobRequestSuccess,
  jobError,
  jobSearchListRequest,
  jobSearchListSuccess,
} = jobSlice.actions;

export default jobSlice.reducer;
