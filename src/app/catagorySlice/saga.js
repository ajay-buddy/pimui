import { call, put, takeEvery } from "redux-saga/effects";
import {
  addCatagoryRequest,
  addCatagorySuccess,
  addCatagoryFailed,
  getCatagoryRequest,
  getCatagorySuccess,
  getCatagoryFailed,
  editCatagoryRequest,
  editCatagorySuccess,
  editCatagoryFailed,
  deleteCatagoryRequest,
  deleteCatagorySuccess,
  deleteCatagoryFailed,
} from "./index";
import axios from "../axios";

async function addCatagoryAPI(payload) {
  const resp = await axios.post("catagory", payload);
  return resp.data;
}

export function* addCatagorySaga({ payload }) {
  try {
    const catagory = yield call(addCatagoryAPI, payload);
    yield put(addCatagorySuccess(catagory));
    yield put(getCatagoryRequest());
  } catch (e) {
    yield put(addCatagoryFailed(e.message));
  }
}

async function editCatagoryAPI({ id, name }) {
  const resp = await axios.post(`catagory/${id}`, { name });
  return resp.data;
}

export function* editCatagorySaga({ payload }) {
  try {
    const catagory = yield call(editCatagoryAPI, payload);
    yield put(editCatagorySuccess(catagory));
  } catch (e) {
    yield put(editCatagoryFailed(e.message));
  }
}

async function deleteCatagoryAPI({ id }) {
  const resp = await axios.delete(`catagory/${id}`);
  return resp.data;
}

export function* deleteCatagorySaga({ payload }) {
  try {
    const catagory = yield call(deleteCatagoryAPI, payload);
    yield put(deleteCatagorySuccess(catagory));
  } catch (e) {
    yield put(deleteCatagoryFailed(e.message));
  }
}

async function getCatagoryAPI() {
  const resp = await axios.get("catagory");
  return resp.data;
}

export function* getCatagorySaga() {
  try {
    const catagories = yield call(getCatagoryAPI);
    yield put(getCatagorySuccess(catagories));
  } catch (e) {
    yield put(getCatagoryFailed(e.message));
  }
}

export function* watchCatagorySaga() {
  yield takeEvery(addCatagoryRequest, addCatagorySaga);
  yield takeEvery(getCatagoryRequest, getCatagorySaga);
  yield takeEvery(editCatagoryRequest, editCatagorySaga);
  yield takeEvery(deleteCatagoryRequest, deleteCatagorySaga);
}
