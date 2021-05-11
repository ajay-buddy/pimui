import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customerSlice",
  initialState: {
    name: null,
    sku: null,
    price: null,
    loading: false,
    error: null,
    customers: [],
  },
  reducers: {
    addCustomerRequest: (state, action) => {
      state.loading = true;
    },
    addCustomerSuccess: (state, action) => {
      state.loading = false;
    },
    addCustomerFailed: (state, action) => {
      state.loading = false;
    },
    getCustomerRequest: (state, action) => {
      state.loading = true;
    },
    getCustomerSuccess: (state, action) => {
      state.customers = [...action.payload];
      state.loading = false;
    },
    getCustomerFailed: (state, action) => {
      state.loading = false;
    },
    getCustomerRequestById: (state, action) => {
      state.loading = true;
    },
    getCustomerSuccessById: (state, action) => {
      state.customers = [...action.payload];
      state.loading = false;
    },
    getCustomerFailedById: (state, action) => {
      state.loading = false;
    },
    editCustomerRequest: (state, action) => {
      state.loading = true;
    },
    editCustomerSuccess: (state, action) => {
      state.loading = false;
    },
    editCustomerFailed: (state, action) => {
      state.loading = false;
    },
    deleteCustomerRequest: (state, action) => {
      state.loading = true;
    },
    deleteCustomerSuccess: (state, action) => {
      state.loading = false;
    },
    deleteCustomerFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const customerSelector = (state) => state.customers.customers;

export const {
  addCustomerRequest,
  addCustomerSuccess,
  addCustomerFailed,
  getCustomerRequest,
  getCustomerSuccess,
  getCustomerFailed,
  getCustomerRequestById,
  getCustomerSuccessById,
  getCustomerFailedById,
  editCustomerRequest,
  editCustomerSuccess,
  editCustomerFailed,
  deleteCustomerRequest,
  deleteCustomerSuccess,
  deleteCustomerFailed,
} = customerSlice.actions;

export default customerSlice.reducer;
