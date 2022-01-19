import { call, put, takeEvery } from "redux-saga/effects";
import {
  spocCreateRequest,
  spocDeleteRequest,
  spocListRequest,
  spocRequest,
  spocListSuccess,
  spocRequestSuccess,
  spocError,
  bulkSpocSuccess,
  bulkSpocRequest,
} from "./index";
import history from "../../history";
import { ROUTES } from "../../routes";
import axios from "../axios";
import { bulkRegisterRequest } from "../authSlice";

async function spocListApi({ query }) {
  const resp = await axios.get(`spoc/all${query ? query : ""}`);
  return resp.data;
}

export function* spocListSaga({ payload }) {
  try {
    const user = yield call(spocListApi, payload);
    yield put(spocListSuccess(user));
  } catch (e) {
    yield put(spocError(e.message));
  }
}

async function spocDeleteApi(data) {
  const resp = await axios.post(`spoc/delete/${data}`);
  return resp.data;
}

export function* spocDeleteSaga({ payload }) {
  try {
    const user = yield call(spocDeleteApi, payload);
    console.log(user);
    yield put(spocListRequest());
  } catch (e) {
    yield put(spocError(e.message));
  }
}

async function spocCreateApi(data) {
  const resp = await axios.post(`spoc/create/`, { ...data });
  return resp.data;
}

export function* spocCreateSaga({ payload }) {
  try {
    const user = yield call(spocCreateApi, payload);
    console.log(user);
    yield put(spocListRequest());
  } catch (e) {
    yield put(spocError(e.message));
  }
}

async function spocBulkApi(data) {
  const resp = await axios.post("spoc/create/bulk", data);
  return resp.data;
}

export function* spocBulkSaga({ payload }) {
  try {
    const user = yield call(spocBulkApi, payload);
    yield put(bulkSpocSuccess(user));
  } catch (e) {
    yield put(spocError(e.message));
  }
}

export function* watchSpocSaga() {
  yield takeEvery(spocListRequest, spocListSaga);
  yield takeEvery(spocDeleteRequest, spocDeleteSaga);
  yield takeEvery(spocCreateRequest, spocCreateSaga);
  yield takeEvery(bulkSpocRequest, spocBulkSaga);
}
