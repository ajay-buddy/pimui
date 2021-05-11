import { createSlice } from "@reduxjs/toolkit";

const vendorSlice = createSlice({
  name: "vendorSlice",
  initialState: {
    name: null,
    sku: null,
    price: null,
    loading: false,
    error: null,
    vendors: [],
  },
  reducers: {
    addVendorRequest: (state, action) => {
      state.loading = true;
    },
    addVendorSuccess: (state, action) => {
      state.loading = false;
    },
    addVendorFailed: (state, action) => {
      state.loading = false;
    },
    getVendorRequest: (state, action) => {
      state.loading = true;
    },
    getVendorSuccess: (state, action) => {
      state.vendors = [...action.payload];
      state.loading = false;
    },
    getVendorFailed: (state, action) => {
      state.loading = false;
    },
    editVendorRequest: (state, action) => {
      state.loading = true;
    },
    editVendorSuccess: (state, action) => {
      state.loading = false;
    },
    editVendorFailed: (state, action) => {
      state.loading = false;
    },
    deleteVendorRequest: (state, action) => {
      state.loading = true;
    },
    deleteVendorSuccess: (state, action) => {
      state.loading = false;
    },
    deleteVendorFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const vendorSelector = (state) => state.vendors.vendors;

export const {
  addVendorRequest,
  addVendorSuccess,
  addVendorFailed,
  getVendorRequest,
  getVendorSuccess,
  getVendorFailed,
  editVendorRequest,
  editVendorSuccess,
  editVendorFailed,
  deleteVendorRequest,
  deleteVendorSuccess,
  deleteVendorFailed,
} = vendorSlice.actions;

export default vendorSlice.reducer;
