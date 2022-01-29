import { call, put, takeEvery } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailed,
  bulkRegisterRequest,
  bulkRegisterSuccess,
  registerRequest,
  registerSuccess,
  registerFailed,
  getProfileUrlRequest,
  getProfileUrlSuccess,
} from "./index";
import history from "../../history";
import { ROUTES } from "../../routes";
import axios from "../axios";

async function loginApi({ username, password }) {
  const resp = await axios.post("auth/signin", {
    username,
    password,
  });
  localStorage.setItem("accessToken", resp.data.accessToken);
  localStorage.setItem("id", resp.data.id);
  return resp.data;
}

export function* loginSaga({ payload }) {
  try {
    const user = yield call(loginApi, payload);
    yield put(loginSuccess(user?.data));
    yield window.location.reload();
  } catch (e) {
    yield put(loginFailed(e.message));
  }
}

async function registerApi(data) {
  const resp = await axios.post("auth/signup", data);
  return resp.data;
}

export function* registerSaga({ payload }) {
  try {
    const user = yield call(registerApi, payload);
    yield put(registerSuccess(user));
  } catch (e) {
    yield put(registerFailed(e.message));
  }
}

async function registerBulkApi(data) {
  if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
    const resp = {
      success: [],
      failed: [],
    };
    for (let i = 0; i < data.length; i++) {
      const result = await axios.post("auth/signup/bulk", data[i]);

      resp.success.concat(result.data.success);
      resp.failed.concat(result.data.failed);
      return resp;
    }

    return resp;
  } else {
    const resp = await axios.post("auth/signup/bulk", data);
    return resp.data;
  }
}

export function* registerBulkSaga({ payload }) {
  try {
    const user = yield call(registerBulkApi, payload);
    yield put(bulkRegisterSuccess(user));
  } catch (e) {
    yield put(registerFailed(e.message));
  }
}

async function getProfileUrlApi({ payload }) {
  const resp = await axios.post("auth/upload", payload);
  return resp.data;
}

export function* getProfileUrlSaga(payload) {
  try {
    const user = yield call(getProfileUrlApi, payload);
    yield put(getProfileUrlSuccess(user));
  } catch (e) {}
}

export function* watchAuthSaga() {
  yield takeEvery(loginRequest, loginSaga);
  yield takeEvery(registerRequest, registerSaga);
  yield takeEvery(bulkRegisterRequest, registerBulkSaga);
  yield takeEvery(getProfileUrlRequest, getProfileUrlSaga);
}
