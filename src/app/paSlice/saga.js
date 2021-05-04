import { call, put, takeEvery } from "redux-saga/effects";
import {
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
} from "./index";
import axios from "../axios";

async function getClientBindingApi(clientId) {
  const resp = await axios.get(`/pa/client-binding?client_id=${clientId}`);
  return resp.data;
}

export function* getClientBindingSaga({ payload }) {
  try {
    const data = yield call(getClientBindingApi, payload);
    yield put(getClientBindingSuccess(data[0]?.fields));
  } catch (e) {
    yield put(getClientBindingFailed(e.message));
  }
}

async function addClientBindingApi(data) {
  const resp = await axios.post(`/pa/client-binding`, data);
  return resp.data;
}

export function* addClientBindingSaga({ payload }) {
  try {
    const data = yield call(addClientBindingApi, payload);
    yield put(addClientBindingSuccess(data[0]?.fields));
    yield put(getClientBindingRequest(payload.client));
  } catch (e) {
    yield put(addClientBindingFailed(e.message));
  }
}

async function getFeatureBindingApi(clientId) {
  const resp = await axios.get(`/pa/feature-binding?client_id=${clientId}`);
  return resp.data;
}

export function* getFeatureBindingSaga({ payload }) {
  try {
    const data = yield call(getFeatureBindingApi, payload);
    yield put(getFeatureBindingSuccess(data[0]?.fields));
  } catch (e) {
    yield put(getFeatureBindingFailed(e.message));
  }
}

async function addFeatureBindingApi(data) {
  const resp = await axios.post(`/pa/feature-binding`, data);
  return resp.data;
}

export function* addFeatureBindingSaga({ payload }) {
  try {
    const data = yield call(addFeatureBindingApi, payload);
    yield put(addFeatureBindingSuccess(data[0]?.fields));
    yield put(getFeatureBindingRequest(payload.client));
  } catch (e) {
    yield put(addFeatureBindingFailed(e.message));
  }
}

async function getMatrixBindingApi(clientId) {
  const resp = await axios.get(`/pa/matrix-binding?client_id=${clientId}`);
  return resp.data;
}

export function* getMatrixBindingSaga({ payload }) {
  try {
    const data = yield call(getMatrixBindingApi, payload);
    yield put(getMatrixBindingSuccess(data[0]?.fields));
  } catch (e) {
    yield put(getMatrixBindingFailed(e.message));
  }
}

async function addMatrixBindingApi(data) {
  const resp = await axios.post(`/pa/matrix-binding`, data);
  return resp.data;
}

export function* addMatrixBindingSaga({ payload }) {
  try {
    const data = yield call(addMatrixBindingApi, payload);
    yield put(addMatrixBindingSuccess(data[0]?.fields));
    yield put(getMatrixBindingRequest(payload.client));
  } catch (e) {
    yield put(addMatrixBindingFailed(e.message));
  }
}

async function getClientsApi() {
  const resp = await axios.get(`/pa/client`);
  return resp.data;
}

export function* getClientsSaga() {
  try {
    const data = yield call(getClientsApi);
    yield put(getClientsSuccess(data));
  } catch (e) {
    yield put(getClientsFailed(e.message));
  }
}

async function getStudyGroupApi() {
  const resp = await axios.get(`/pa/study-group`);
  return resp.data;
}

export function* getStudyGroupSaga() {
  try {
    const data = yield call(getStudyGroupApi);
    yield put(getStudyGroupSuccess(data));
  } catch (e) {
    yield put(getStudyGroupFailed(e.message));
  }
}

export function* watchPaSaga() {
  yield takeEvery(getClientBindingRequest, getClientBindingSaga);
  yield takeEvery(addClientBindingRequest, addClientBindingSaga);
  yield takeEvery(addFeatureBindingRequest, addFeatureBindingSaga);
  yield takeEvery(getFeatureBindingRequest, getFeatureBindingSaga);
  yield takeEvery(addMatrixBindingRequest, addMatrixBindingSaga);
  yield takeEvery(getMatrixBindingRequest, getMatrixBindingSaga);
  yield takeEvery(getClientsRequest, getClientsSaga);
  yield takeEvery(getStudyGroupRequest, getStudyGroupSaga);
}
