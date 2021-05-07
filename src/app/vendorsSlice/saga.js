import { call, put, takeEvery } from "redux-saga/effects";
import {
  addVendorRequest,
  addVendorSuccess,
  addVendorFailed,
  getVendorRequest,
  getVendorSuccess,
  getVendorFailed,
  editVendorRequest,
  editVendorSuccess,
  editVendorFailed,
  deleteVendorRequest,
  deleteVendorSuccess,
  deleteVendorFailed,
} from "./index";
import axios from "../axios";

async function addVendorAPI(payload) {
  const resp = await axios.post("vendors", payload);
  return resp.data;
}

export function* addVendorSaga({ payload }) {
  try {
    const vendor = yield call(addVendorAPI, payload);
    yield put(addVendorSuccess(vendor));
    yield put(getVendorRequest());
  } catch (e) {
    yield put(addVendorFailed(e.message));
  }
}

async function editVendorAPI({ id, name }) {
  const resp = await axios.post(`vendors/${id}`, { name });
  return resp.data;
}

export function* editVendorSaga({ payload }) {
  try {
    const vendor = yield call(editVendorAPI, payload);
    yield put(editVendorSuccess(vendor));
  } catch (e) {
    yield put(editVendorFailed(e.message));
  }
}

async function deleteVendorAPI({ id }) {
  const resp = await axios.delete(`vendors/${id}`);
  return resp.data;
}

export function* deleteVendorSaga({ payload }) {
  try {
    const vendor = yield call(deleteVendorAPI, payload);
    yield put(deleteVendorSuccess(vendor));
  } catch (e) {
    yield put(deleteVendorFailed(e.message));
  }
}

async function getVendorAPI() {
  const resp = await axios.get("vendors");
  return resp.data;
}

export function* getVendorSaga() {
  try {
    const vendors = yield call(getVendorAPI);
    yield put(getVendorSuccess(vendors));
  } catch (e) {
    yield put(getVendorFailed(e.message));
  }
}

export function* watchVendorSaga() {
  yield takeEvery(addVendorRequest, addVendorSaga);
  yield takeEvery(getVendorRequest, getVendorSaga);
  yield takeEvery(editVendorRequest, editVendorSaga);
  yield takeEvery(deleteVendorRequest, deleteVendorSaga);
}
