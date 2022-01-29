import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "companySlice",
  initialState: {
    companyList: [],
    company: {},
  },
  reducers: {
    companyDeleteRequest: (state, action) => {
      state.loading = true;
    },
    companyCreateRequest: (state, action) => {
      state.loading = true;
    },
    companyListRequest: (state, action) => {
      state.loading = true;
    },
    companyRequest: (state, action) => {
      state.loading = true;
    },
    companyListSuccess: (state, action) => {
      state.loading = true;
      state.companyList = [...action.payload];
    },
    companyRequestSuccess: (state, action) => {
      state.loading = true;
      state.company = { ...action.payload };
    },
    companyError: (state, action) => {
      state.loading = false;
    },
  },
});

export const companyListSelector = (state) => state?.company?.companyList;
export const companySelector = (state) => state?.company?.company;

export const {
  companyCreateRequest,
  companyDeleteRequest,
  companyListRequest,
  companyRequest,
  companyListSuccess,
  companyRequestSuccess,
  companyError,
} = companySlice.actions;

export default companySlice.reducer;