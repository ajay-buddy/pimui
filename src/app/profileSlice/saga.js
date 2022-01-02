import { call, put, takeEvery } from "redux-saga/effects";
import {
  getProfileFailed,
  getProfileRequest,
  getProfileSuccess,
  addProfileRequest,
  addProfileSuccess,
  addProfileFailed,
  getAllProfileRequest,
  getAllProfileSuccess,
  getAllProfileFailed,
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
  addEducationRequest,
  addEducationSuccess,
  addEducationFailed,
  getEducationRequest,
  getEducationSuccess,
  getEducationFailed,
  getImageUrlRequest,
  getImageUrlSuccess,
  getImageUrlFailed,
  addTagRequest,
  addTagSuccess,
  addTagFailed,
  getTagRequest,
  getTagSuccess,
  getTagFailed,
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
  getCandidateProfileRequest,
  getCandidateProfileSuccess,
  getCandidateProfileFailed,
  getAdminProfileRequest,
  getAdminProfileSuccess,
  getAdminProfileFailed,
  getAutoCompleteSearchRequest,
  getAutoCompleteSearchSuccess,
  getAutoCompleteSearchFailed,
} from "./index";
import axios from "../axios";

async function getMyProfileAPI({ payload }) {
  if (payload) {
    const resp = await axios.get(`profile/id/${payload}`);
    return resp.data;
  } else {
    const resp = await axios.get("profile");
    return resp.data;
  }
}

export function* getMyProfileSaga(id) {
  try {
    const profile = yield call(getMyProfileAPI, id);
    yield put(getProfileSuccess(profile));
  } catch (e) {
    yield put(getProfileFailed(e.message));
  }
}

async function getAllProfileAPI({ payload }) {
  const resp = await axios.get(`profile/all${payload || "?page=1&limit=10"}`);
  return resp.data;
}

export function* getAllProfileSaga(payload) {
  try {
    const profile = yield call(getAllProfileAPI, payload);
    yield put(getAllProfileSuccess(profile));
  } catch (e) {
    yield put(getAllProfileFailed(e.message));
  }
}

async function getCandidateProfileAPI({ payload }) {
  const resp = await axios.get(
    `profile/candidate${payload || "?page=1&limit=10"}`
  );
  return resp.data;
}

export function* getCandidateProfileSaga(payload) {
  try {
    const profile = yield call(getCandidateProfileAPI, payload);
    yield put(getCandidateProfileSuccess(profile));
  } catch (e) {
    yield put(getCandidateProfileFailed(e.message));
  }
}

async function getAdminProfileAPI({ payload }) {
  const resp = await axios.get(`profile/admin${payload || "?page=1&limit=10"}`);
  return resp.data;
}

export function* getAdminProfileSaga(payload) {
  try {
    const profile = yield call(getAdminProfileAPI, payload);
    yield put(getAdminProfileSuccess(profile));
  } catch (e) {
    yield put(getAdminProfileFailed(e.message));
  }
}

async function addMyProfileAPI({ payload }) {
  const resp = await axios.post("profile/create", { ...payload });
  return resp.data;
}

export function* addMyProfileSaga(payload, id) {
  try {
    const profile = yield call(addMyProfileAPI, payload);
    yield put(addProfileSuccess(profile));
  } catch (e) {
    yield put(addProfileFailed(e.message));
  }
}

async function addExperienceAPI({ payload }) {
  const resp = await axios.post("experience", { ...payload });
  return resp.data;
}

export function* addExperienceSaga(payload) {
  try {
    const experience = yield call(addExperienceAPI, payload);
    yield put(addExperienceSuccess(experience));
  } catch (e) {
    yield put(addExperienceFailed(e.message));
  }
}

async function getExperienceAPI({ payload }) {
  if (payload) {
    const resp = await axios.get(`experience/candidate/${payload}`);
    return resp.data;
  }
  const resp = await axios.get("experience");
  return resp.data;
}

export function* getExperienceSaga(payload) {
  try {
    const experience = yield call(getExperienceAPI, payload);
    yield put(getExperienceSuccess(experience));
  } catch (e) {
    yield put(getExperienceFailed(e.message));
  }
}

async function addProjectAPI({ payload }) {
  const resp = await axios.post("project", { ...payload });
  return resp.data;
}

export function* addProjectSaga(payload) {
  try {
    const experience = yield call(addProjectAPI, payload);
    yield put(addProjectSuccess(experience));
  } catch (e) {
    yield put(addProjectFailed(e.message));
  }
}

async function getProjectAPI({ payload }) {
  if (payload) {
    const resp = await axios.get(`project/candidate/${payload}`);
    return resp.data;
  }
  const resp = await axios.get("project");
  return resp.data;
}

export function* getProjectSaga(payload) {
  try {
    const project = yield call(getProjectAPI, payload);
    yield put(getProjectSuccess(project));
  } catch (e) {
    yield put(getProjectFailed(e.message));
  }
}

async function addEducationAPI({ payload }) {
  const resp = await axios.post("education", { ...payload });
  return resp.data;
}

export function* addEducationSaga(payload) {
  try {
    const experience = yield call(addEducationAPI, payload);
    yield put(addEducationSuccess(experience));
  } catch (e) {
    yield put(addEducationFailed(e.message));
  }
}

async function getEducationAPI({ payload }) {
  if (payload) {
    const resp = await axios.get(`education/candidate/${payload}`);
    return resp.data;
  }
  const resp = await axios.get("education");
  return resp.data;
}

export function* getEducationSaga(payload) {
  try {
    const project = yield call(getEducationAPI, payload);
    yield put(getEducationSuccess(project));
  } catch (e) {
    yield put(getEducationFailed(e.message));
  }
}

async function getImageUrlAPI({ payload }) {
  const resp = await axios.post("auth/upload", { ...payload });
  return resp.data;
}

export function* getImageUrlSaga(payload) {
  try {
    const experience = yield call(getImageUrlAPI, payload);
    yield put(getImageUrlSuccess(experience));
  } catch (e) {
    yield put(getImageUrlFailed(e.message));
  }
}

async function addTagAPI({ payload }) {
  const resp = await axios.post("tag/create", { ...payload });
  return resp.data;
}

export function* addTagSaga(payload) {
  try {
    const tag = yield call(addTagAPI, payload);
    yield put(addTagSuccess(tag));
    yield put(getTagRequest());
  } catch (e) {
    yield put(addTagFailed(e.message));
  }
}

async function getTagAPI({ payload }) {
  if (payload) {
    const resp = await axios.get(`tag/find/${payload}`);
    return resp.data;
  }
  const resp = await axios.get("tag");
  return resp.data;
}

export function* getTagSaga(payload) {
  try {
    const tags = yield call(getTagAPI, payload);
    yield put(getTagSuccess(tags));
  } catch (e) {
    yield put(getTagFailed(e.message));
  }
}

async function addJobAPI({ payload }) {
  const resp = await axios.post("job/create", { ...payload });
  return resp.data;
}

export function* addJobSaga(payload) {
  try {
    const tag = yield call(addJobAPI, payload);
    yield put(addJobSuccess(tag));
    yield put(getJobRequest());
  } catch (e) {
    yield put(addJobFailed(e.message));
  }
}

async function getJobAPI({ payload }) {
  const resp = await axios.get(`job/all/${payload ? payload : ""}`);
  return resp.data;
}

export function* getJobSaga(payload) {
  try {
    const tags = yield call(getJobAPI, payload);
    yield put(getJobSuccess(tags));
  } catch (e) {
    yield put(getJobFailed(e.message));
  }
}

async function addApplicationAPI({ payload }) {
  const resp = await axios.post("application/create", { ...payload });
  return resp.data;
}

export function* addApplicationSaga(payload) {
  try {
    const tag = yield call(addApplicationAPI, payload);
    yield put(addApplicationSuccess(tag));
    yield put(getApplicationRequest());
  } catch (e) {
    yield put(addApplicationFailed(e.message));
  }
}

async function getApplicationAPI({ payload }) {
  const resp = await axios.get(
    `application/all/${payload ? payload : "?page=1&limit=10"}`
  );
  return resp.data;
}

export function* getApplicationSaga(payload) {
  try {
    const tags = yield call(getApplicationAPI, payload);
    yield put(getApplicationSuccess(tags));
  } catch (e) {
    yield put(getApplicationFailed(e.message));
  }
}

async function getAutoCompleteSearchAPI({ payload }) {
  let url = "";
  const addFilter = () => {
    let filter = "";
    const { filterData } = payload;
    for (let i = 0; i < filterData.length; i++) {
      filter += `${filterData[i].key}=${filterData[i].value}`;
      if (i < filterData.length - 1) {
        filter += "&";
      }
    }
    return filter;
  };
  switch (payload.type) {
    case "ADMIN-SEARCH": {
      url = `profile/admin?${addFilter()}`;
      const resp = await axios.get(url);
      return resp.data[0];
    }
    case "TAG-SEARCH": {
      url = `tag/find?${addFilter()}`;
      const resp = await axios.get(url);
      return resp.data;
    }
  }
}

export function* getAutoCompleteSearchSaga(payload) {
  try {
    const data = yield call(getAutoCompleteSearchAPI, payload);
    yield put(getAutoCompleteSearchSuccess(data));
  } catch (e) {
    yield put(getAutoCompleteSearchFailed(e.message));
  }
}

export function* watchProfileSaga() {
  yield takeEvery(getProfileRequest, getMyProfileSaga);
  yield takeEvery(addProfileRequest, addMyProfileSaga);
  yield takeEvery(getAllProfileRequest, getAllProfileSaga);
  yield takeEvery(getCandidateProfileRequest, getCandidateProfileSaga);
  yield takeEvery(getAdminProfileRequest, getAdminProfileSaga);
  yield takeEvery(addExperienceRequest, addExperienceSaga);
  yield takeEvery(getExperienceRequest, getExperienceSaga);
  yield takeEvery(addProjectRequest, addProjectSaga);
  yield takeEvery(getProjectRequest, getProjectSaga);
  yield takeEvery(addEducationRequest, addEducationSaga);
  yield takeEvery(getEducationRequest, getEducationSaga);
  yield takeEvery(addTagRequest, addTagSaga);
  yield takeEvery(getTagRequest, getTagSaga);
  yield takeEvery(addJobRequest, addJobSaga);
  yield takeEvery(getJobRequest, getJobSaga);

  yield takeEvery(addApplicationRequest, addApplicationSaga);
  yield takeEvery(getApplicationRequest, getApplicationSaga);
  yield takeEvery(getImageUrlRequest, getImageUrlSaga);
  yield takeEvery(getAutoCompleteSearchRequest, getAutoCompleteSearchSaga);
}
