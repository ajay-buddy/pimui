import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    profile: {
      first_name: null,
      last_name: null,
      gender: null,
      f_name: null,
      m_name: null,
      pan_number: null,
      adhar_number: null,
      dob: null,
      phone: null,
      code: null,
      llPhone: null,
      alternatePhone: null,
      email: null,
      address: null,
      city: null,
      state: null,
      country: null,
      job_type: [],
      active: null,
      engaged: null,
    },
    profileCount: 0,
    userProfiles: [],
    experiences: [],
    projects: [],
    educations: [],
    imageUrl: null,
    tags: [],
    jobs: [],
    jobCount: 0,
    applications: [],
    applicationCount: 0,
  },
  reducers: {
    addProfileRequest: (state, action) => {
      state.loading = true;
    },
    addProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = [...action.payload];
    },
    addProfileFailed: (state, action) => {
      state.loading = false;
    },
    getProfileRequest: (state, action) => {
      state.loading = true;
      state.profile = {};
    },
    getProfileSuccess: (state, action) => {
      state.profile = { ...action.payload };
      state.loading = false;
    },
    getProfileFailed: (state, action) => {
      state.loading = false;
    },
    getAllProfileRequest: (state, action) => {
      state.loading = true;
    },
    getAllProfileSuccess: (state, action) => {
      state.userProfiles = [...action.payload[0]];
      state.profileCount = action.payload[1];
      state.loading = false;
    },
    getAllProfileFailed: (state, action) => {
      state.loading = false;
    },
    editProfileRequest: (state, action) => {
      state.loading = true;
    },
    editProfileSuccess: (state, action) => {
      state.loading = false;
    },
    editProfileFailed: (state, action) => {
      state.loading = false;
    },
    deleteProfileRequest: (state, action) => {
      state.loading = true;
    },
    deleteProfileSuccess: (state, action) => {
      state.loading = false;
    },
    deleteProfileFailed: (state, action) => {
      state.loading = false;
    },
    addExperienceRequest: (state, action) => {
      state.loading = true;
    },
    addExperienceSuccess: (state, action) => {
      state.loading = false;
    },
    addExperienceFailed: (state, action) => {
      state.loading = false;
    },
    getExperienceRequest: (state, action) => {
      state.loading = true;
    },
    getExperienceSuccess: (state, action) => {
      state.loading = false;
      state.experiences = [...action.payload];
    },
    getExperienceFailed: (state, action) => {
      state.loading = false;
    },

    addTagRequest: (state, action) => {
      state.loading = true;
    },
    addTagSuccess: (state, action) => {
      state.loading = false;
    },
    addTagFailed: (state, action) => {
      state.loading = false;
    },
    getTagRequest: (state, action) => {
      state.loading = true;
    },
    getTagSuccess: (state, action) => {
      state.loading = false;
      state.tags = [...action.payload];
    },
    getTagFailed: (state, action) => {
      state.loading = false;
    },

    addJobRequest: (state, action) => {
      state.loading = true;
    },
    addJobSuccess: (state, action) => {
      state.loading = false;
    },
    addJobFailed: (state, action) => {
      state.loading = false;
    },
    getJobRequest: (state, action) => {
      state.loading = true;
    },
    getJobSuccess: (state, action) => {
      state.loading = false;
      state.jobs = [...action.payload[0]];
      state.jobCount = action.payload[1];
    },
    getJobFailed: (state, action) => {
      state.loading = false;
    },

    addApplicationRequest: (state, action) => {
      state.loading = true;
    },
    addApplicationSuccess: (state, action) => {
      state.loading = false;
    },
    addApplicationFailed: (state, action) => {
      state.loading = false;
    },
    getApplicationRequest: (state, action) => {
      state.loading = true;
    },
    getApplicationSuccess: (state, action) => {
      state.loading = false;
      state.applications = [...action.payload[0]];
      state.applicationCount = action.payload[1];
    },
    getApplicationFailed: (state, action) => {
      state.loading = false;
    },

    addProjectRequest: (state, action) => {
      state.loading = true;
    },
    addProjectSuccess: (state, action) => {
      state.loading = false;
    },
    addProjectFailed: (state, action) => {
      state.loading = false;
    },
    getProjectRequest: (state, action) => {
      state.loading = true;
    },
    getProjectSuccess: (state, action) => {
      state.loading = false;
      state.projects = [...action.payload];
    },
    getProjectFailed: (state, action) => {
      state.loading = false;
    },

    addEducationRequest: (state, action) => {
      state.loading = true;
    },
    addEducationSuccess: (state, action) => {
      state.loading = false;
    },
    addEducationFailed: (state, action) => {
      state.loading = false;
    },
    getEducationRequest: (state, action) => {
      state.loading = true;
    },
    getEducationSuccess: (state, action) => {
      state.loading = false;
      state.educations = [...action.payload];
    },
    getEducationFailed: (state, action) => {
      state.loading = false;
    },

    getImageUrlRequest: (state, action) => {
      state.loading = true;
    },
    getImageUrlSuccess: (state, action) => {
      state.loading = false;
      state.imageUrl = action.payload;
    },
    getImageUrlFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const profileSelector = (state) => state.profile.profile;
export const allProfileSelector = (state) => state.profile.userProfiles;
export const profileCountSelector = (state) => state.profile.profileCount;
export const getExperienceSelector = (state) => state.profile.experiences;
export const getProjectSelector = (state) => state.profile.projects;
export const getEducationSelector = (state) => state.profile.educations;
export const getTagSelector = (state) => state.profile.tags;
export const getUploadImageSelector = (state) => state.profile.imageUrl;
export const getJobSelector = (state) => state.profile.jobs;
export const jobCountSelector = (state) => state.profile.jobCount;
export const getApplicationSelector = (state) => state.profile.applications;
export const applicationCountSelector = (state) =>
  state.profile.applicationCount;

export const {
  getImageUrlRequest,
  getImageUrlSuccess,
  getImageUrlFailed,

  addJobRequest,
  addJobSuccess,
  addJobFailed,
  getJobRequest,
  getJobSuccess,
  getJobFailed,

  addApplicationRequest,
  addApplicationSuccess,
  addApplicationFailed,
  getApplicationRequest,
  getApplicationSuccess,
  getApplicationFailed,

  addTagRequest,
  addTagSuccess,
  addTagFailed,
  getTagRequest,
  getTagSuccess,
  getTagFailed,

  addEducationRequest,
  addEducationSuccess,
  addEducationFailed,
  getEducationRequest,
  getEducationSuccess,
  getEducationFailed,

  addExperienceRequest,
  addExperienceSuccess,
  addExperienceFailed,
  getExperienceRequest,
  getExperienceSuccess,
  getExperienceFailed,
  addProjectRequest,
  addProjectSuccess,
  addProjectFailed,
  getProjectRequest,
  getProjectSuccess,
  getProjectFailed,
  addProfileRequest,
  addProfileSuccess,
  addProfileFailed,
  getProfileRequest,
  getProfileSuccess,
  getProfileFailed,
  getAllProfileRequest,
  getAllProfileSuccess,
  getAllProfileFailed,
  editProfileRequest,
  editProfileSuccess,
  editProfileFailed,
  deleteProfileRequest,
  deleteProfileSuccess,
  deleteProfileFailed,
} = profileSlice.actions;

export default profileSlice.reducer;
