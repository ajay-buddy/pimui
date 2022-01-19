import { call, put, takeEvery } from "redux-saga/effects";
import {
  dashboardError,
  getMyProfileRequest,
  getMyProfileSuccess,
} from "./index";
import history from "../../history";
import { ROUTES } from "../../routes";
import axios from "../axios";

async function getMyProfileApi() {
  const resp = await axios.get("dashboard/my/profile");
  return resp.data;
}

export function* getMyProfileSaga({ payload }) {
  try {
    const user = yield call(getMyProfileApi, payload);
    yield put(getMyProfileSuccess(user));
  } catch (e) {
    yield put(dashboardError(e.message));
  }
}

export function* watchDashboardSaga() {
  yield takeEvery(getMyProfileRequest, getMyProfileSaga);
}
