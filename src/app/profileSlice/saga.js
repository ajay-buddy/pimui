import { call, put, takeEvery } from "redux-saga/effects";
import {
  profileCreateRequest,
  profileDeleteRequest,
  profileListRequest,
  profileRequest,
  profileListSuccess,
  profileRequestSuccess,
  profileError,
  managerProfileListRequest,
  managerProfileListSuccess,
  profileBulkCreateRequest,
  profileBulkCreateSuccess,
} from "./index";
import history from "../../history";
import { ROUTES } from "../../routes";
import axios from "../axios";

async function profileListApi({ type, query }) {
  const resp = await axios.get(
    `profile/all/${type.toLowerCase()}${query ? query : ""}`
  );
  return resp.data;
}

export function* profileListSaga({ payload }) {
  try {
    const user = yield call(profileListApi, payload);
    yield put(profileListSuccess(user));
  } catch (e) {
    yield put(profileError(e.message));
  }
}

async function managerProfileListApi({ type, value }) {
  const resp = await axios.get(
    `profile/find/${type.toLowerCase()}/?name=${value}`
  );
  return resp.data;
}

export function* managerProfileListSaga({ payload }) {
  if (!payload.type || !payload.value) return;
  try {
    const user = yield call(managerProfileListApi, payload);
    yield put(managerProfileListSuccess(user));
  } catch (e) {
    yield put(profileError(e.message));
  }
}

async function profileDeleteApi(data) {
  const resp = await axios.post(`profile/delete/${data}`);
  return resp.data;
}

export function* profileDeleteSaga({ payload }) {
  try {
    const user = yield call(profileDeleteApi, payload);
    yield put(profileListRequest());
  } catch (e) {
    yield put(profileError(e.message));
  }
}

async function profileCreateApi(data) {
  const resp = await axios.post(`profile/create/`, { ...data });
  return resp.data;
}

export function* profileCreateSaga({ payload }) {
  try {
    const user = yield call(profileCreateApi, payload);
    yield put(profileListRequest());
  } catch (e) {
    yield put(profileError(e.message));
  }
}

async function profileBulkCreateApi(data) {
  const resp = await axios.post(`profile/create/bulk`, data);
  return resp.data;
}

export function* profileBulkCreateSaga({ payload }) {
  try {
    const user = yield call(profileBulkCreateApi, payload);
    yield put(profileBulkCreateSuccess(user));
    // yield put(profileListRequest());
  } catch (e) {
    yield put(profileError(e.message));
  }
}

export function* watchProfileSaga() {
  yield takeEvery(profileListRequest, profileListSaga);
  yield takeEvery(managerProfileListRequest, managerProfileListSaga);
  yield takeEvery(profileDeleteRequest, profileDeleteSaga);
  yield takeEvery(profileCreateRequest, profileCreateSaga);
  yield takeEvery(profileBulkCreateRequest, profileBulkCreateSaga);
}
