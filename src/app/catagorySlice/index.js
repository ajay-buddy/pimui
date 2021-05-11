import { createSlice } from "@reduxjs/toolkit";

const catagorySlice = createSlice({
  name: "catagorySlice",
  initialState: {
    name: null,
    sku: null,
    price: null,
    loading: false,
    error: null,
    catagories: [],
  },
  reducers: {
    addCatagoryRequest: (state, action) => {
      state.loading = true;
    },
    addCatagorySuccess: (state, action) => {
      state.loading = false;
    },
    addCatagoryFailed: (state, action) => {
      state.loading = false;
    },
    getCatagoryRequest: (state, action) => {
      state.loading = true;
    },
    getCatagorySuccess: (state, action) => {
      state.catagories = [...action.payload];
      state.loading = false;
    },
    getCatagoryFailed: (state, action) => {
      state.loading = false;
    },
    editCatagoryRequest: (state, action) => {
      state.loading = true;
    },
    editCatagorySuccess: (state, action) => {
      state.loading = false;
    },
    editCatagoryFailed: (state, action) => {
      state.loading = false;
    },
    deleteCatagoryRequest: (state, action) => {
      state.loading = true;
    },
    deleteCatagorySuccess: (state, action) => {
      state.loading = false;
    },
    deleteCatagoryFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const catagorySelector = (state) => state.catagories.catagories;

export const {
  addCatagoryRequest,
  addCatagorySuccess,
  addCatagoryFailed,
  getCatagoryRequest,
  getCatagorySuccess,
  getCatagoryFailed,
  editCatagoryRequest,
  editCatagorySuccess,
  editCatagoryFailed,
  deleteCatagoryRequest,
  deleteCatagorySuccess,
  deleteCatagoryFailed,
} = catagorySlice.actions;

export default catagorySlice.reducer;
