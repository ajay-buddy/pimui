import { all, call } from "redux-saga/effects";
import { watchActionSaga } from "./actionSlice/saga";
import { watchApplicationSaga } from "./applicationSlice/saga";
import { watchAuthSaga } from "./authSlice/saga";
import { watchCompanySaga } from "./companySlice/saga";
import { watchDashboardSaga } from "./dashboardSlice/saga";
import { watchJobSaga } from "./jobSlice/saga";
import { watchProfileSaga } from "./profileSlice/saga";
import { watchSpocSaga } from "./spocSlice/saga";
import { watchTagSaga } from "./tagSlice/saga";

export default function* rootSaga() {
  yield all([
    call(watchAuthSaga),
    call(watchProfileSaga),
    call(watchTagSaga),
    call(watchSpocSaga),
    call(watchCompanySaga),
    call(watchJobSaga),
    call(watchActionSaga),
    call(watchApplicationSaga),
    call(watchDashboardSaga),
  ]);
}
