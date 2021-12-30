import { all, call } from "redux-saga/effects";
import { watchAuthSaga } from "./authSlice/saga";
import { watchCatagorySaga } from "./catagorySlice/saga";
import { watchCustomerSaga } from "./customerSlice/saga";
import { watchOrderSaga } from "./ordersSlice/saga";
import { watchProductSaga } from "./productsSlice/saga";
import { watchProfileSaga } from "./profileSlice/saga";
import { watchPurchaseSaga } from "./purchaseSlice/saga";
import { watchVendorSaga } from "./vendorsSlice/saga";

export default function* rootSaga() {
  yield all([
    call(watchAuthSaga),
    call(watchCatagorySaga),
    call(watchCustomerSaga),
    call(watchOrderSaga),
    call(watchProductSaga),
    call(watchPurchaseSaga),
    call(watchVendorSaga),
    call(watchProfileSaga)
  ]);
}
