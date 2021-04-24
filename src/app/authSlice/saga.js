import { call, put, takeEvery } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailed,
  registerRequest,
  registerSuccess,
  registerFailed,
} from "./index";
import axios from "../axios";

async function loginApi({ username, password }) {
  const resp = await axios.post("auth/signin", {
    username,
    password,
  });
  localStorage.setItem("accessToken", resp.data.accessToken);
  return resp.data;
}

export function* loginSaga({ payload }) {
  try {
    const user = yield call(loginApi, payload);
    yield put(loginSuccess(user?.data));
  } catch (e) {
    yield put(loginFailed(e.message));
  }
}

async function registerApi({ username, password }) {
  const resp = await axios.post("auth/signup", {
    username,
    password,
  });
  localStorage.setItem("accessToken", resp.data.accessToken);
  return resp.data;
}

export function* registerSaga({ payload }) {
  try {
    const user = yield call(registerApi, payload);
    yield put(registerSuccess(user?.data));
  } catch (e) {
    yield put(registerFailed(e.message));
  }
}

export function* watchAuthSaga() {
  yield takeEvery(loginRequest, loginSaga);
  yield takeEvery(registerRequest, registerSaga);
}
