import { combineReducers } from "redux";
import loggin_state from "./loggin_reducer";
import default_state from "./default_reducer";

const rootReducers = combineReducers({
  loggin_state,
  default_state,
});

export default rootReducers;
