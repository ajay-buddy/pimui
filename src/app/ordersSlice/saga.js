import { call, put, takeEvery } from "redux-saga/effects";
import {
  addOrderRequest,
  addOrderSuccess,
  addOrderFailed,
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  getOrderByIdRequest,
  getOrderByIdSuccess,
  getOrderByIdFailed,
  editOrderRequest,
  editOrderSuccess,
  editOrderFailed,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFailed,
} from "./index";
import axios from "../axios";
import history from "../../history";
import { ROUTES } from "../../routes";

async function addOrderAPI(payload) {
  const resp = await axios.post("order", payload);
  return resp.data;
}

export function* addOrderSaga({ payload }) {
  try {
    const order = yield call(addOrderAPI, payload);
    yield put(addOrderSuccess(order));
    yield put(getOrderRequest());
  } catch (e) {
    yield put(addOrderFailed(e.message));
  }
}

async function getOrderByIdAPI(id) {
  const resp = await axios.get(`order/${id}`);
  return resp.data;
}

export function* getOrderByIdSaga({ payload }) {
  try {
    const order = yield call(getOrderByIdAPI, payload);
    if (!order) return history.push(ROUTES.LOGIN);
    yield put(getOrderByIdSuccess([order]));
  } catch (e) {
    yield put(getOrderByIdFailed(e.message));
  }
}

async function editOrderAPI({ id, name, SKU, price }) {
  const resp = await axios.post(`order/${id}`, { name, SKU, price });
  return resp.data;
}

export function* editOrderSaga({ payload }) {
  try {
    const order = yield call(editOrderAPI, payload);
    yield put(editOrderSuccess(order));
  } catch (e) {
    yield put(editOrderFailed(e.message));
  }
}

async function deleteOrderAPI({ id }) {
  const resp = await axios.delete(`order/${id}`);
  return resp.data;
}

export function* deleteOrderSaga({ payload }) {
  try {
    const order = yield call(deleteOrderAPI, payload);
    yield put(deleteOrderSuccess(order));
  } catch (e) {
    yield put(deleteOrderFailed(e.message));
  }
}

async function getOrderAPI() {
  const resp = await axios.get("order");
  return resp.data;
}

export function* getOrderSaga() {
  try {
    const orders = yield call(getOrderAPI);
    yield put(getOrderSuccess(orders));
  } catch (e) {
    yield put(getOrderFailed(e.message));
  }
}

export function* watchOrderSaga() {
  yield takeEvery(addOrderRequest, addOrderSaga);
  yield takeEvery(getOrderRequest, getOrderSaga);
  yield takeEvery(getOrderByIdRequest, getOrderByIdSaga);
  yield takeEvery(editOrderRequest, editOrderSaga);
  yield takeEvery(deleteOrderRequest, deleteOrderSaga);
}
