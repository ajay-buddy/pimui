import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    profileList: [],
    managerList: [],
    profile: {},
    bulkSuccess: [],
    bulkFailed: [],
  },
  reducers: {
    profileBulkCreateRequest: (state, action) => {
      state.loading = true;
    },
    profileBulkCreateSuccess: (state, action) => {
      state.loading = false;
      state.bulkFailed = state.bulkFailed.concat(action?.payload?.failed);
      state.bulkSuccess = state.bulkSuccess.concat(action?.payload?.success);
    },
    profileDeleteRequest: (state, action) => {
      state.loading = true;
    },
    profileCreateRequest: (state, action) => {
      state.loading = true;
    },
    managerProfileListRequest: (state, action) => {
      state.loading = true;
    },
    managerProfileListSuccess: (state, action) => {
      state.loading = true;
      state.managerList = [...action.payload];
    },
    profileListRequest: (state, action) => {
      state.loading = true;
    },
    profileRequest: (state, action) => {
      state.loading = true;
    },
    profileListSuccess: (state, action) => {
      state.loading = true;
      state.profileList = [...action.payload];
    },
    profileRequestSuccess: (state, action) => {
      state.loading = true;
      state.profile = { ...action.payload };
    },
    profileError: (state, action) => {
      state.loading = false;
    },
  },
});

export const profileListSelector = (state) => state?.profile?.profileList;
export const managerProfileListSelector = (state) =>
  state?.profile?.managerList;
export const profileSelector = (state) => state?.profile?.profile;
export const profileBulkUploadSelector = (state) => ({
  success: state?.profile?.bulkSuccess,
  failed: state?.profile?.bulkFailed,
});

export const {
  profileBulkCreateSuccess,
  managerProfileListRequest,
  managerProfileListSuccess,
  profileCreateRequest,
  profileDeleteRequest,
  profileListRequest,
  profileRequest,
  profileListSuccess,
  profileRequestSuccess,
  profileError,
  profileBulkCreateRequest,
} = profileSlice.actions;

export default profileSlice.reducer;
