import { createSlice } from "@reduxjs/toolkit";

const purchaseSlice = createSlice({
  name: "purchaseSlice",
  initialState: {
    name: null,
    sku: null,
    price: null,
    loading: false,
    error: null,
    purchases: [],
  },
  reducers: {
    addPurchaseRequest: (state, action) => {
      state.loading = true;
    },
    addPurchaseSuccess: (state, action) => {
      state.loading = false;
    },
    addPurchaseFailed: (state, action) => {
      state.loading = false;
    },
    getPurchaseRequest: (state, action) => {
      state.loading = true;
    },
    getPurchaseSuccess: (state, action) => {
      state.purchases = [...action.payload];
      state.loading = false;
    },
    getPurchaseFailed: (state, action) => {
      state.loading = false;
    },
    editPurchaseRequest: (state, action) => {
      state.loading = true;
    },
    editPurchaseSuccess: (state, action) => {
      state.loading = false;
    },
    editPurchaseFailed: (state, action) => {
      state.loading = false;
    },
    deletePurchaseRequest: (state, action) => {
      state.loading = true;
    },
    deletePurchaseSuccess: (state, action) => {
      state.loading = false;
    },
    deletePurchaseFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const purchaseSelector = (state) => state.purchases.purchases;

export const {
  addPurchaseRequest,
  addPurchaseSuccess,
  addPurchaseFailed,
  getPurchaseRequest,
  getPurchaseSuccess,
  getPurchaseFailed,
  editPurchaseRequest,
  editPurchaseSuccess,
  editPurchaseFailed,
  deletePurchaseRequest,
  deletePurchaseSuccess,
  deletePurchaseFailed,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
