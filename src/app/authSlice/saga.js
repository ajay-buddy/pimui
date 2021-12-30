import { call, put, takeEvery } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailed,
  registerRequest,
  registerSuccess,
  registerFailed,
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
    yield put(registerSuccess(user?.data));
  } catch (e) {
    yield put(registerFailed(e.message));
  }
}

export function* watchAuthSaga() {
  yield takeEvery(loginRequest, loginSaga);
  yield takeEvery(registerRequest, registerSaga);
}
