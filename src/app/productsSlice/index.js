import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    name: null,
    SKU: null,
    price: null,
    loading: false,
    error: null,
    products: [],
  },
  reducers: {
    addProductRequest: (state, action) => {
      state.loading = true;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
    },
    addProductFailed: (state, action) => {
      state.loading = false;
    },
    getProductRequest: (state, action) => {
      state.loading = true;
    },
    getProductSuccess: (state, action) => {
      state.products = [...action.payload];
      state.loading = false;
    },
    getProductFailed: (state, action) => {
      state.loading = false;
    },
    editProductRequest: (state, action) => {
      state.loading = true;
    },
    editProductSuccess: (state, action) => {
      state.loading = false;
    },
    editProductFailed: (state, action) => {
      state.loading = false;
    },
    deleteProductRequest: (state, action) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
    },
    deleteProductFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const productSelector = (state) => state.products.products;

export const {
  addProductRequest,
  addProductSuccess,
  addProductFailed,
  getProductRequest,
  getProductSuccess,
  getProductFailed,
  editProductRequest,
  editProductSuccess,
  editProductFailed,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailed,
} = productSlice.actions;

export default productSlice.reducer;
