import { createSlice } from "@reduxjs/toolkit";

const paSlice = createSlice({
  name: "paSlice",
  initialState: {
    clientBinding: {
      client: "",
      study_group: "",
    },
    featureBinding: {
      client: "",
      forecast: false,
      portfolioView: false,
      reforecast: false,
    },
    matrixBinding: {
      client: "",
      cost_matrix: false,
      ctms_matrix: false,
      design_optimization_matrix: false,
    },
    clients: [],
    studyGroup: [],
    error: null,
  },
  reducers: {
    getClientsRequest: (state, action) => {
      state.loading = true;
    },
    getClientsSuccess: (state, action) => {
      state.clients = action.payload;
      state.loading = true;
    },
    getClientsFailed: (state, action) => {
      state.loading = true;
    },
    getStudyGroupRequest: (state, action) => {
      state.loading = true;
    },
    getStudyGroupSuccess: (state, action) => {
      state.studyGroup = action.payload;
      state.loading = true;
    },
    getStudyGroupFailed: (state, action) => {
      state.loading = true;
    },
    getClientBindingRequest: (state, action) => {
      state.loading = true;
    },
    getClientBindingSuccess: (state, action) => {
      state.clientBinding = action.payload;
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
      state.featureBinding = action.payload;
      state.loading = false;
    },
    getFeatureBindingFailed: (state, action) => {
      state.loading = false;
    },
    addFeatureBindingRequest: (state, action) => {
      console.log("*****");
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
      state.matrixBinding = action.payload;
      state.loading = false;
    },
    getMatrixBindingFailed: (state, action) => {
      state.loading = false;
    },
    addMatrixBindingRequest: (state, action) => {
      state.loading = true;
    },
    addMatrixBindingSuccess: (state, action) => {
      state.loading = false;
    },
    addMatrixBindingFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const clientBindingSelector = (state) => state.pa.clientBinding;
export const featureBindingSelector = (state) => state.pa.featureBinding;
export const matrixBindingSelector = (state) => state.pa.matrixBinding;
export const clientsSelector = (state) => state.pa.clients;
export const studyGroupSelector = (state) => state.pa.studyGroup;

export const {
  getClientsRequest,
  getClientsSuccess,
  getClientsFailed,
  getStudyGroupRequest,
  getStudyGroupSuccess,
  getStudyGroupFailed,
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
