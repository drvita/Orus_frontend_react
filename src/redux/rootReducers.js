import { combineReducers } from "redux";
import loggin_state from "./user/reducer";
import default_state from "./default/reducer";
import order_state from "./order/reducer";
import category_state from "./category/reducer";
import store_state from "./store/reducer";

const rootReducers = combineReducers({
  logging: loggin_state,
  default: default_state,
  order: order_state,
  category: category_state,
  storeItem: store_state,
});

export default rootReducers;
