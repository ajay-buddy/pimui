import { call, put, takeEvery } from "redux-saga/effects";
import {
  addCustomerRequest,
  addCustomerSuccess,
  addCustomerFailed,
  getCustomerRequest,
  getCustomerSuccess,
  getCustomerFailed,
  getCustomerRequestById,
  getCustomerSuccessById,
  getCustomerFailedById,
  editCustomerRequest,
  editCustomerSuccess,
  editCustomerFailed,
  deleteCustomerRequest,
  deleteCustomerSuccess,
  deleteCustomerFailed,
} from "./index";
import axios from "../axios";

async function addCustomerAPI(payload) {
  const resp = await axios.post("customer", payload);
  return resp.data;
}

export function* addCustomerSaga({ payload }) {
  try {
    const customer = yield call(addCustomerAPI, payload);
    yield put(addCustomerSuccess(customer));
    yield put(getCustomerRequest());
  } catch (e) {
    yield put(addCustomerFailed(e.message));
  }
}

async function getCustomerByIdAPI({ id }) {
  const resp = await axios.get(`customer/${id}`);
  return resp.data;
}

export function* getCustomerByIdSaga({ payload }) {
  try {
    const customer = yield call(getCustomerByIdAPI, payload);
    yield put(getCustomerSuccessById(customer));
  } catch (e) {
    yield put(getCustomerFailedById(e.message));
  }
}

async function editCustomerAPI({ id, name }) {
  const resp = await axios.post(`customer/${id}`, { name });
  return resp.data;
}

export function* editCustomerSaga({ payload }) {
  try {
    const customer = yield call(editCustomerAPI, payload);
    yield put(editCustomerSuccess(customer));
  } catch (e) {
    yield put(editCustomerFailed(e.message));
  }
}

async function deleteCustomerAPI({ id }) {
  const resp = await axios.delete(`customer/${id}`);
  return resp.data;
}

export function* deleteCustomerSaga({ payload }) {
  try {
    const customer = yield call(deleteCustomerAPI, payload);
    yield put(deleteCustomerSuccess(customer));
  } catch (e) {
    yield put(deleteCustomerFailed(e.message));
  }
}

async function getCustomerAPI() {
  const resp = await axios.get("customer");
  return resp.data;
}

export function* getCustomerSaga() {
  try {
    const customers = yield call(getCustomerAPI);
    yield put(getCustomerSuccess(customers));
  } catch (e) {
    yield put(getCustomerFailed(e.message));
  }
}

export function* watchCustomerSaga() {
  yield takeEvery(addCustomerRequest, addCustomerSaga);
  yield takeEvery(getCustomerRequest, getCustomerSaga);
  yield takeEvery(editCustomerRequest, editCustomerSaga);
  yield takeEvery(deleteCustomerRequest, deleteCustomerSaga);
  yield takeEvery(getCustomerRequestById, getCustomerByIdSaga);
}
