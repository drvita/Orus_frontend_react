import { combineReducers } from "redux";
import loggin_state from "./user/reducer";
import default_state from "./default/reducer";
import order_state from "./order/reducer";
import category_state from "./category/";
import storeReducer from "./store/";
import contactReducer from "./contact/";
import examReducer from "./exam/";

const rootReducers = combineReducers({
  logging: loggin_state,
  default: default_state,
  order: order_state,
  category: category_state,
  storeItem: storeReducer,
  contact: contactReducer,
  exam: examReducer,
});

export default rootReducers;
