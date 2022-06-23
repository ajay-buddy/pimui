import { call, put, takeEvery } from "redux-saga/effects";
import {
  applicationCreateRequest,
  applicationDeleteRequest,
  applicationListRequest,
  applicationRequest,
  applicationListSuccess,
  applicationRequestSuccess,
  applicationError,
  bulkApplicationRequest,
  bulkApplicationSuccess,
  userApplicationListRequest,
  userApplicationListSuccess,
} from "./index";
import history from "../../history";
import { ROUTES } from "../../routes";
import axios from "../axios";

async function applicationCreateApi(data) {
  const resp = await axios.post(`application/create/`, { ...data });
  return resp.data;
}

export function* applicationCreateSaga({ payload }) {
  try {
    const user = yield call(applicationCreateApi, payload);
    yield put(applicationRequestSuccess(user))
    yield put(applicationListRequest(user));
  } catch (e) {
    yield put(applicationError(e.message));
  }
}

async function applicationListApi({ query }) {
  const resp = await axios.get(`application/all${query ? query : ""}`);
  return resp.data;
}

export function* applicationListSaga({ payload }) {
  try {
    const user = yield call(applicationListApi, payload);
    yield put(applicationListSuccess(user));
  } catch (e) {
    yield put(applicationError(e.message));
  }
}

async function userApplicationListApi({ query,id }) {
  const resp = await axios.get(`application/user/${id}`);
  return resp.data;
}

export function* userApplicationListSaga({ payload }) {
  try {
    const user = yield call(userApplicationListApi, payload);
    yield put(userApplicationListSuccess(user));
  } catch (e) {
    yield put(applicationError(e.message));
  }
}

async function applicationBulkApi(data) {
  const resp = await axios.post("application/create/bulk", data);
  return resp.data;
}

export function* applicationBulkSaga({ payload }) {
  try {
    const user = yield call(applicationBulkApi, payload);
    yield put(bulkApplicationSuccess(user));
  } catch (e) {
    yield put(applicationError(e.message));
  }
}

export function* watchApplicationSaga() {
  yield takeEvery(applicationListRequest, applicationListSaga);
  yield takeEvery(userApplicationListRequest, userApplicationListSaga);
  yield takeEvery(applicationCreateRequest, applicationCreateSaga);
  yield takeEvery(bulkApplicationRequest, applicationBulkSaga);
}
