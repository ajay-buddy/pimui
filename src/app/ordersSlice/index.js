import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    name: null,
    sku: null,
    price: null,
    loading: false,
    error: null,
    orders: [],
  },
  reducers: {
    addOrderRequest: (state, action) => {
      state.loading = true;
    },
    addOrderSuccess: (state, action) => {
      state.loading = false;
    },
    addOrderFailed: (state, action) => {
      state.loading = false;
    },
    getOrderRequest: (state, action) => {
      state.loading = true;
    },
    getOrderSuccess: (state, action) => {
      state.orders = [...action.payload];
      state.loading = false;
    },
    getOrderFailed: (state, action) => {
      state.loading = false;
    },
    getOrderByIdRequest: (state, action) => {
      state.loading = true;
    },
    getOrderByIdSuccess: (state, action) => {
      state.orders = [...action.payload];
      state.loading = false;
    },
    getOrderByIdFailed: (state, action) => {
      state.loading = false;
    },
    editOrderRequest: (state, action) => {
      state.loading = true;
    },
    editOrderSuccess: (state, action) => {
      state.loading = false;
    },
    editOrderFailed: (state, action) => {
      state.loading = false;
    },
    deleteOrderRequest: (state, action) => {
      state.loading = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false;
    },
    deleteOrderFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const orderSelector = (state) => state.orders.orders;

export const {
  addOrderRequest,
  addOrderSuccess,
  addOrderFailed,
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  getOrderByIdRequest,
  getOrderByIdSuccess,
  getOrderByIdFailed,
  editOrderRequest,
  editOrderSuccess,
  editOrderFailed,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFailed,
} = orderSlice.actions;

export default orderSlice.reducer;
