import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tagSlice",
  initialState: {
    tagList: [],
    tag: {},
  },
  reducers: {
    tagDeleteRequest: (state, action) => {
      state.loading = true;
    },
    tagCreateRequest: (state, action) => {
      state.loading = true;
    },
    tagListRequest: (state, action) => {
      state.loading = true;
    },
    tagRequest: (state, action) => {
      state.loading = true;
    },
    tagListSuccess: (state, action) => {
      state.loading = true;
      state.tagList = [...action.payload];
    },
    tagRequestSuccess: (state, action) => {
      state.loading = true;
      state.tag = { ...action.payload };
    },
    tagError: (state, action) => {
      state.loading = false;
    },
  },
});

export const tagListSelector = (state) => state?.tag?.tagList;
export const tagSelector = (state) => state?.tag?.tag;

export const {
  tagCreateRequest,
  tagDeleteRequest,
  tagListRequest,
  tagRequest,
  tagListSuccess,
  tagRequestSuccess,
  tagError,
} = tagSlice.actions;

export default tagSlice.reducer;
