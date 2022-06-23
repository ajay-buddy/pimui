import { createSlice } from "@reduxjs/toolkit";

const spocSlice = createSlice({
  name: "spocSlice",
  initialState: {
    spocList: [],
    spocSearchList: [],
    spoc: {},
    uploadedSpocSuccess: [],
    uploadedSpocFailed: [],
    loading: false,
  },
  reducers: {
    spocListSearchRequest: (state, action) => {
      state.loading = true;
    },
    spocListSearchSuccess: (state, action) => {
      state.loading = false;
      state.spocSearchList = [action.payload];
    },
    bulkSpocRequest: (state, action) => {
      state.loading = true;
    },
    bulkSpocSuccess: (state, action) => {
      state.loading = false;
      state.uploadedSpocFailed = state.uploadedSpocFailed.concat(
        action?.payload?.failed
      );
      state.uploadedSpocSuccess = state.uploadedSpocSuccess.concat(
        action?.payload?.success
      );
    },
    spocDeleteRequest: (state, action) => {
      state.loading = true;
    },
    spocCreateRequest: (state, action) => {
      state.loading = true;
    },
    spocListRequest: (state, action) => {
      state.loading = true;
    },
    spocRequest: (state, action) => {
      state.loading = true;
    },
    spocListSuccess: (state, action) => {
      state.loading = false;
      state.spocList = [...action.payload];
    },
    spocRequestSuccess: (state, action) => {
      state.loading = false;
      state.spoc = { ...action.payload };
    },
    spocError: (state, action) => {
      state.loading = false;
    },
  },
});

export const spocListSelector = (state) => state?.spoc?.spocList;
export const spocListSearchSelector = (state) => state?.spoc?.spocListSearch;
export const spocSelector = (state) => state?.spoc?.spoc;
export const spocBulkUploadSelector = (state) => ({
  success: state?.spoc?.uploadedSpocSuccess,
  failed: state?.spoc?.uploadedSpocFailed,
});

export const spocRequestSuccessSelector = (state) => state?.spoc?.spoc;
export const spocLoading = state => state?.spoc?.loading;
export const {
  bulkSpocRequest,
  bulkSpocSuccess,
  spocCreateRequest,
  spocDeleteRequest,
  spocListRequest,
  spocListSuccess,
  spocListSearchRequest,
  spocListSearchSuccess,
  spocRequest,
  spocRequestSuccess,
  spocError,
} = spocSlice.actions;

export default spocSlice.reducer;
