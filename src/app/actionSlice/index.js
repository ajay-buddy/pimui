import { createSlice } from "@reduxjs/toolkit";

const actionSlice = createSlice({
  name: "actionSlice",
  initialState: {
    actionList: [],
    action: {},
    loading: false,
  },
  reducers: {
    actionDeleteRequest: (state, action) => {
      state.loading = true;
    },
    actionCreateRequest: (state, action) => {
      state.loading = true;
    },
    actionListRequest: (state, action) => {
      state.loading = true;
    },
    actionRequest: (state, action) => {
      state.loading = true;
    },
    actionListSuccess: (state, action) => {
      state.loading = false;
      state.actionList = [...action.payload];
    },
    actionRequestSuccess: (state, action) => {
      state.loading = false;
      state.action = { ...action.payload };
    },
    actionError: (state, action) => {
      state.loading = false;
    },
  },
});

export const actionListSelector = (state) => state?.action?.actionList;
export const actionSelector = (state) => state?.action?.action;

export const actionLoading = state => state?.action?.loading;

export const {
  actionCreateRequest,
  actionDeleteRequest,
  actionListRequest,
  actionRequest,
  actionListSuccess,
  actionRequestSuccess,
  actionError,
} = actionSlice.actions;

export default actionSlice.reducer;
