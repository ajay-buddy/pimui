import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    myProfile: {},
    loading: false
  },
  reducers: {
    getMyProfileRequest: (state, action) => {
      state.loading = true;
    },
    getMyProfileSuccess: (state, action) => {
      state.loading = false;

      state.myProfile = { ...action?.payload };
    },
    dashboardError: (state, action) => {
      state.loading = true;
    },
  },
});
export const dashboardLoading = state => state?.dashboard?.loading;
export const myProfileSelector = (state) => state?.dashboard?.myProfile;

export const { getMyProfileRequest, getMyProfileSuccess, dashboardError } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
