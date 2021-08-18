import { combineReducers } from "redux";
//Reducers
import default_state from "./default/reducer";
import users_state from "./user/";
import order_state from "./order/";
import category_state from "./category/";
import storeReducer from "./store/";
import contactReducer from "./contact/";
import examReducer from "./exam/";
import saleReducer from "./sales/";

const rootReducers = combineReducers({
  users: users_state,
  default: default_state,
  order: order_state,
  category: category_state,
  storeItem: storeReducer,
  contact: contactReducer,
  exam: examReducer,
  sales: saleReducer,
});

export default rootReducers;
