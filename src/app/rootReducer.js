import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import tagReducer from "./tagSlice";
import spocReducer from "./spocSlice";
import companyReducer from "./companySlice";
import jobReducer from "./jobSlice";
import applicationReducer from "./applicationSlice";
import actionReducer from "./actionSlice";
import DashboardReducer from "./dashboardSlice";

const getPersistConfig = (key) => ({
  key,
  storage,
});

export default combineReducers({
  auth: persistReducer(getPersistConfig("auth"), authReducer),
  profile: persistReducer(getPersistConfig("profile"), profileReducer),
  tag: persistReducer(getPersistConfig("tag"), tagReducer),
  spoc: persistReducer(getPersistConfig("spoc"), spocReducer),
  job: persistReducer(getPersistConfig("job"), jobReducer),
  action: persistReducer(getPersistConfig("action"), actionReducer),
  dashboard: persistReducer(getPersistConfig("dashboard"), DashboardReducer),
  company: persistReducer(getPersistConfig("company"), companyReducer),
  application: persistReducer(
    getPersistConfig("application"),
    applicationReducer
  ),
});
