import { createSlice } from "@reduxjs/toolkit";

const paSlice = createSlice({
  name: "paSlice",
  initialState: {
    clientBinding: {},
    featureBinding: {},
    matrixBinding: {},
    error: null,
  },
  reducers: {
    getClientBindingRequest: (state, action) => {
      state.loading = true;
    },
    getClientBindingSuccess: (state, action) => {
      console.log("****", action);
      state.loading = false;
    },
    getClientBindingFailed: (state, action) => {
      state.loading = false;
    },
    addClientBindingRequest: (state, action) => {
      state.loading = true;
    },
    addClientBindingSuccess: (state, action) => {
      state.loading = false;
    },
    addClientBindingFailed: (state, action) => {
      state.loading = false;
    },
    getFeatureBindingRequest: (state, action) => {
      state.loading = true;
    },
    getFeatureBindingSuccess: (state, action) => {
      state.loading = false;
    },
    getFeatureBindingFailed: (state, action) => {
      state.loading = false;
    },
    addFeatureBindingRequest: (state, action) => {
      state.loading = true;
    },
    addFeatureBindingSuccess: (state, action) => {
      state.loading = false;
    },
    addFeatureBindingFailed: (state, action) => {
      state.loading = false;
    },
    getMatrixBindingRequest: (state, action) => {
      state.loading = true;
    },
    getMatrixBindingSuccess: (state, action) => {
      state.loading = false;
    },
    getMatrixBindingFailed: (state, action) => {
      state.loading = false;
    },
    addMatrixBindingRequest: (state, action) => {
      state.loading = true;
    },
    addMmatrixBindingSuccess: (state, action) => {
      state.loading = false;
    },
    addMmatrixBindingFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const clientBindingSelector = (state) => state.pa.clientBinding;
export const featureBindingSelector = (state) => state.pa.featureBinding;
export const matrixBindingSelector = (state) => state.pa.matrixBinding;

export const {
  getClientBindingRequest,
  getClientBindingSuccess,
  getClientBindingFailed,
  addClientBindingRequest,
  addClientBindingSuccess,
  addClientBindingFailed,
  getFeatureBindingRequest,
  getFeatureBindingSuccess,
  getFeatureBindingFailed,
  addFeatureBindingRequest,
  addFeatureBindingSuccess,
  addFeatureBindingFailed,
  getMatrixBindingRequest,
  getMatrixBindingSuccess,
  getMatrixBindingFailed,
  addMatrixBindingRequest,
  addMatrixBindingSuccess,
  addMatrixBindingFailed,
} = paSlice.actions;

export default paSlice.reducer;
