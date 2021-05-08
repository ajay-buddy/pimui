import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import catagoryReducer from "./catagorySlice";
import productsReducer from "./productsSlice";
import customerReducer from "./customerSlice";
import ordersReducer from "./ordersSlice";
import purchaseReducer from "./purchaseSlice";
import vendorsReducer from "./vendorsSlice";

const getPersistConfig = (key) => ({
  key,
  storage,
});

export default combineReducers({
  auth: persistReducer(getPersistConfig("auth"), authReducer),
  catagories: persistReducer(getPersistConfig("catagory"), catagoryReducer),
  products: persistReducer(getPersistConfig("products"), productsReducer),
  customers: persistReducer(getPersistConfig("customer"), customerReducer),
  orders: persistReducer(getPersistConfig("orders"), ordersReducer),
  purchases: persistReducer(getPersistConfig("purchase"), purchaseReducer),
  vendors: persistReducer(getPersistConfig("vendors"), vendorsReducer),
});
