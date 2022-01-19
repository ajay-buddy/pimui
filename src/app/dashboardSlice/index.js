import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    myProfile: {},
  },
  reducers: {
    getMyProfileRequest: (state, action) => {
      state.loading = true;
    },
    getMyProfileSuccess: (state, action) => {
      state.loading = true;

      state.myProfile = { ...action?.payload };
    },
    dashboardError: (state, action) => {
      state.loading = true;
    },
  },
});

export const myProfileSelector = (state) =>
  console.log(state) || state?.dashboard?.myProfile;

export const { getMyProfileRequest, getMyProfileSuccess, dashboardError } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
