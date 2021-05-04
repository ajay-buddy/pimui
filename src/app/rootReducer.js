import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import paReducer from "./paSlice";

const getPersistConfig = (key) => ({
  key,
  storage,
});

export default combineReducers({
  auth: persistReducer(getPersistConfig("auth"), authReducer),
  pa: persistReducer(getPersistConfig("pa"), paReducer),
});
